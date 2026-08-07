import http from "node:http";
import { createReadStream } from "node:fs";
import { access, copyFile, mkdir, readFile, readdir, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";
import sharp from "sharp";
import { Codex } from "@openai/codex-sdk";
import {
  buildLinkGraph,
  createEmptyArticle,
  routeFromPageFile,
  validateArticle,
} from "./core.mjs";

const CMS_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(CMS_DIR, "..");
const STATIC_DIR = path.join(CMS_DIR, "public");
const BLOG_DIR = path.join(ROOT, "content", "blog");
const FILES = {
  published: path.join(BLOG_DIR, "published", "articles.json"),
  draft: path.join(BLOG_DIR, "drafts", "articles.json"),
  archived: path.join(BLOG_DIR, "archived", "articles.json"),
  trash: path.join(BLOG_DIR, ".trash", "articles.json"),
  revisions: path.join(BLOG_DIR, ".revisions"),
  knowledge: path.join(BLOG_DIR, "knowledge", "records.json"),
  snapshot: path.join(BLOG_DIR, "knowledge", "website-snapshot.json"),
  voice: path.join(BLOG_DIR, "voice.json"),
  media: path.join(BLOG_DIR, "media", "manifest.json"),
  originals: path.join(BLOG_DIR, "media", "originals"),
  jobs: path.join(BLOG_DIR, "studio", "jobs.json"),
  settings: path.join(CMS_DIR, "settings.json"),
  runtime: path.join(CMS_DIR, ".runtime"),
};

const MUTATION_TOKEN = crypto.randomBytes(32).toString("hex");
const allowedOrigins = new Set();

async function readJson(file, fallback) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT") return fallback;
    throw error;
  }
}

async function atomicWriteJson(file, value, { revision = true } = {}) {
  await mkdir(path.dirname(file), { recursive: true });
  if (revision) {
    try {
      await access(file);
      await mkdir(FILES.revisions, { recursive: true });
      const stamp = new Date().toISOString().replaceAll(":", "-");
      await copyFile(file, path.join(FILES.revisions, `${path.basename(path.dirname(file))}-${path.basename(file, ".json")}-${stamp}.json`));
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
  }
  const temporary = `${file}.${process.pid}.${crypto.randomUUID()}.tmp`;
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, { mode: 0o600 });
  await rename(temporary, file);
}

async function listFiles(directory, predicate, output = []) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (["node_modules", ".git", ".next", ".vinext", "dist", ".wrangler"].includes(entry.name)) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) await listFiles(full, predicate, output);
    else if (predicate(full)) output.push(full);
  }
  return output;
}

async function knownSitePaths() {
  const pages = await listFiles(path.join(ROOT, "app"), (file) => /\/page\.(tsx|ts|jsx|js)$/.test(file));
  return pages.map((file) => routeFromPageFile(ROOT, file)).filter(Boolean);
}

async function loadCollections() {
  const [published, drafts, archived, trash] = await Promise.all([
    readJson(FILES.published, []),
    readJson(FILES.draft, []),
    readJson(FILES.archived, []),
    readJson(FILES.trash, []),
  ]);
  return { published, drafts, archived, trash, all: [...published, ...drafts, ...archived, ...trash] };
}

async function buildState() {
  const [collections, voice, knowledge, snapshot, media, jobs, settings, paths] = await Promise.all([
    loadCollections(),
    readJson(FILES.voice, {}),
    readJson(FILES.knowledge, []),
    readJson(FILES.snapshot, { schemaVersion: 1, generatedAt: null, records: [] }),
    readJson(FILES.media, []),
    readJson(FILES.jobs, []),
    readJson(FILES.settings, {}),
    knownSitePaths(),
  ]);
  const graph = buildLinkGraph(collections.all, paths);
  const issues = Object.fromEntries(collections.all.map((article) => [
    article.slug,
    validateArticle(article, collections.all, { voice, knownPaths: paths, graph }),
  ]));
  return { ...collections, voice, knowledge, snapshot, media, jobs, settings, knownPaths: paths, graph, issues };
}

function json(res, status, value) {
  const body = JSON.stringify(value);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body),
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
  });
  res.end(body);
}

function errorResponse(res, status, message, details) {
  json(res, status, { error: message, ...(details ? { details } : {}) });
}

async function readBody(req, limit = 5_000_000) {
  const chunks = [];
  let length = 0;
  for await (const chunk of req) {
    length += chunk.length;
    if (length > limit) throw Object.assign(new Error("Request is too large."), { status: 413 });
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

async function readJsonBody(req) {
  const body = await readBody(req);
  if (!body.length) return {};
  try {
    return JSON.parse(body.toString("utf8"));
  } catch {
    throw Object.assign(new Error("Request body must be valid JSON."), { status: 400 });
  }
}

function isLoopback(req) {
  const address = req.socket.remoteAddress || "";
  const host = String(req.headers.host || "").split(":")[0];
  return ["127.0.0.1", "::1", "::ffff:127.0.0.1"].includes(address) && ["127.0.0.1", "localhost"].includes(host);
}

function requireMutationToken(req) {
  return crypto.timingSafeEqual(
    Buffer.from(String(req.headers["x-cms-token"] || "").padEnd(64).slice(0, 64)),
    Buffer.from(MUTATION_TOKEN),
  );
}

async function writeCollections(collections) {
  await Promise.all([
    atomicWriteJson(FILES.published, collections.published),
    atomicWriteJson(FILES.draft, collections.drafts),
    atomicWriteJson(FILES.archived, collections.archived),
    atomicWriteJson(FILES.trash, collections.trash),
  ]);
}

function removeArticle(collections, slug) {
  for (const key of ["published", "drafts", "archived", "trash"]) {
    collections[key] = collections[key].filter((article) => article.slug !== slug);
  }
}

async function saveArticle(article) {
  const collections = await loadCollections();
  const previous = collections.all.find((candidate) => candidate.slug === article.originalSlug || candidate.slug === article.slug);
  if (previous && !article.originalSlug && previous.status !== article.status) {
    throw Object.assign(new Error(`The slug “${article.slug}” is already used by a ${previous.status} article.`), { status: 409 });
  }
  removeArticle(collections, article.originalSlug || article.slug);
  const clean = { ...article, schemaVersion: 1, originalSlug: undefined, modifiedDate: new Date().toISOString() };
  delete clean.originalSlug;
  const key = clean.status === "published" ? "published" : clean.status === "archived" ? "archived" : clean.status === "trash" ? "trash" : "drafts";
  collections[key].push(clean);
  const all = [...collections.published, ...collections.drafts, ...collections.archived, ...collections.trash];
  const state = await buildState();
  const issues = validateArticle(clean, all, { voice: state.voice, knownPaths: state.knownPaths, graph: buildLinkGraph(all, state.knownPaths) });
  if (clean.status === "published" && issues.some((entry) => entry.severity === "error")) {
    throw Object.assign(new Error("Publishing is blocked by validation errors."), { status: 422, details: issues });
  }
  await writeCollections(collections);
  return { article: clean, previousStatus: previous?.status || null, issues };
}

async function lifecycle(slug, action, options = {}) {
  const collections = await loadCollections();
  const article = collections.all.find((candidate) => candidate.slug === slug);
  if (!article) throw Object.assign(new Error("Article not found."), { status: 404 });
  if (action === "publish") return saveArticle({ ...article, originalSlug: article.slug, status: "published" });
  if (action === "archive") {
    const disposition = options.archiveDisposition;
    if (!["retain-noindex", "redirect"].includes(disposition)) throw Object.assign(new Error("Choose an archive URL disposition."), { status: 422 });
    if (disposition === "redirect" && options.redirectTo === `/blog/${article.slug}`) throw Object.assign(new Error("An archived article cannot redirect to itself."), { status: 422 });
    return saveArticle({ ...article, originalSlug: article.slug, status: "archived", archiveDisposition: disposition, redirectTo: disposition === "redirect" ? options.redirectTo : undefined });
  }
  if (action === "trash") {
    if (article.status === "published") throw Object.assign(new Error("Archive a published article before moving it to Trash."), { status: 409 });
    if (article.status === "archived" && article.archiveDisposition === "retain-noindex") throw Object.assign(new Error("Assign a redirect before trashing an archived retained URL."), { status: 409 });
    return saveArticle({ ...article, originalSlug: article.slug, status: "trash" });
  }
  if (action === "restore") return saveArticle({ ...article, originalSlug: article.slug, status: "draft", archiveDisposition: undefined, redirectTo: undefined });
  throw Object.assign(new Error("Unknown lifecycle action."), { status: 400 });
}

function extractWebsiteStrings(source, sourcePath) {
  const records = [];
  const pattern = /["'`]([^"'`\n]{40,600})["'`]/g;
  for (const match of source.matchAll(pattern)) {
    const text = match[1].replace(/\\n/g, " ").replace(/\s+/g, " ").trim();
    if (!text.includes(" ") || /^(https?:|[.#/]|[a-z-]+:)/i.test(text)) continue;
    const id = crypto.createHash("sha256").update(`${sourcePath}:${text}`).digest("hex").slice(0, 16);
    records.push({
      id: `site-${id}`,
      topic: path.basename(sourcePath).replace(/\.[^.]+$/, ""),
      category: "Website content",
      text,
      applicablePages: [],
      applicableServices: [],
      source: sourcePath,
      sourceUrl: null,
      verificationStatus: "verified",
      effectiveDate: null,
      reviewDate: null,
      usage: "publishable",
      supersedes: [],
      conflictsWith: [],
    });
  }
  return records;
}

async function scanKnowledge() {
  const files = await listFiles(path.join(ROOT, "app"), (file) => /\.(tsx|ts)$/.test(file) && !file.includes("aeo-query-research"));
  const records = [];
  for (const file of files) {
    const relative = path.relative(ROOT, file).replaceAll(path.sep, "/");
    records.push(...extractWebsiteStrings(await readFile(file, "utf8"), relative));
  }
  const unique = [...new Map(records.map((record) => [record.text.toLowerCase(), record])).values()];
  const prior = await readJson(FILES.snapshot, { records: [] });
  const oldById = new Map((prior.records || []).map((record) => [record.id, record]));
  const newById = new Map(unique.map((record) => [record.id, record]));
  const diff = {
    added: unique.filter((record) => !oldById.has(record.id)),
    removed: (prior.records || []).filter((record) => !newById.has(record.id)),
    unchanged: unique.filter((record) => oldById.has(record.id)).length,
    stale: [...unique, ...(await readJson(FILES.knowledge, []))].filter((record) => record.reviewDate && Date.parse(record.reviewDate) < Date.now()),
    conflicts: (await readJson(FILES.knowledge, [])).filter((record) => (record.conflictsWith || []).length),
  };
  await mkdir(FILES.runtime, { recursive: true });
  await atomicWriteJson(path.join(FILES.runtime, "knowledge-scan.json"), { schemaVersion: 1, generatedAt: new Date().toISOString(), records: unique }, { revision: false });
  return diff;
}

async function approveKnowledgeScan() {
  const candidate = await readJson(path.join(FILES.runtime, "knowledge-scan.json"), null);
  if (!candidate) throw Object.assign(new Error("Run a knowledge scan first."), { status: 409 });
  await atomicWriteJson(FILES.snapshot, candidate);
  return candidate;
}

function safeFilename(value) {
  return String(value || "image").toLowerCase().replace(/\.[^.]+$/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "image";
}

async function ingestMedia(req, url) {
  const filename = url.searchParams.get("filename") || "image";
  const articleSlug = safeFilename(url.searchParams.get("article") || "library");
  const alt = url.searchParams.get("alt") || "";
  const decorative = url.searchParams.get("decorative") === "true";
  const focalX = Math.min(1, Math.max(0, Number(url.searchParams.get("focalX") || 0.5)));
  const focalY = Math.min(1, Math.max(0, Number(url.searchParams.get("focalY") || 0.5)));
  if (!decorative && !alt.trim()) throw Object.assign(new Error("Alt text is required unless the image is decorative."), { status: 422 });
  const buffer = await readBody(req, 35_000_000);
  const image = sharp(buffer, { failOn: "warning" }).rotate();
  const metadata = await image.metadata();
  if (!metadata.width || !metadata.height) throw Object.assign(new Error("The uploaded file is not a supported image."), { status: 415 });
  const id = `${articleSlug}-${safeFilename(filename)}-${crypto.randomBytes(4).toString("hex")}`;
  await mkdir(FILES.originals, { recursive: true });
  await writeFile(path.join(FILES.originals, `${id}.${metadata.format || "bin"}`), buffer, { mode: 0o600 });
  const publicDirectory = path.join(ROOT, "public", "images", "blog", articleSlug);
  await mkdir(publicDirectory, { recursive: true });
  const widths = [480, 768, 1200, 1600].filter((width) => width <= metadata.width);
  if (!widths.length) widths.push(metadata.width);
  const derivatives = [];
  for (const width of widths) {
    const output = `${id}-${width}.webp`;
    await sharp(buffer).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(publicDirectory, output));
    const derivativeMetadata = await sharp(path.join(publicDirectory, output)).metadata();
    derivatives.push({ src: `/images/blog/${articleSlug}/${output}`, width: derivativeMetadata.width, height: derivativeMetadata.height, format: "webp" });
  }
  const socialOutput = `${id}-social.webp`;
  const horizontal = focalX < 0.34 ? "west" : focalX > 0.66 ? "east" : "centre";
  const vertical = focalY < 0.34 ? "north" : focalY > 0.66 ? "south" : "centre";
  const gravity = vertical === "centre" ? horizontal : horizontal === "centre" ? vertical : `${vertical}${horizontal}`;
  await sharp(buffer).rotate().resize({ width: 1200, height: 630, fit: "cover", position: gravity, withoutEnlargement: true }).webp({ quality: 84 }).toFile(path.join(publicDirectory, socialOutput));
  const socialMetadata = await sharp(path.join(publicDirectory, socialOutput)).metadata();
  const largest = derivatives.at(-1);
  const record = {
    id,
    originalFilename: filename,
    sourceWidth: metadata.width,
    sourceHeight: metadata.height,
    alt: decorative ? "" : alt.trim(),
    decorative,
    focalPoint: { x: focalX, y: focalY },
    derivatives,
    hero: { id, src: largest.src, alt: decorative ? "" : alt.trim(), width: largest.width, height: largest.height, sizes: "(max-width: 700px) 100vw, 100vw", status: "approved", format: "webp" },
    social: { id: `${id}-social`, src: `/images/blog/${articleSlug}/${socialOutput}`, alt: decorative ? "" : alt.trim(), width: socialMetadata.width, height: socialMetadata.height, sizes: "1200px", status: "approved", format: "webp" },
    createdAt: new Date().toISOString(),
  };
  const manifest = await readJson(FILES.media, []);
  manifest.push(record);
  await atomicWriteJson(FILES.media, manifest);
  return record;
}

async function publicSiteIsAvailable(url) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(650) });
    if (!response.ok) return false;
    return /Luxe Event Co\.|Luxe Event Co</i.test(await response.text());
  } catch {
    return false;
  }
}

async function resolvePublicSiteUrl(settings) {
  const configured = String(settings.publicSiteUrl || "").replace(/\/$/, "");
  const candidates = [...new Set([
    configured,
    ...[3000, 3001, 3002, 3003, 3004, 3005].map((port) => `http://127.0.0.1:${port}`),
    ...[3000, 3001, 3002, 3003, 3004, 3005].map((port) => `http://localhost:${port}`),
  ].filter(Boolean))];
  for (const candidate of candidates) {
    if (await publicSiteIsAvailable(candidate)) return candidate;
  }
  throw Object.assign(new Error("Start the Luxe website development server before opening an exact article preview, or update the Public site URL in Settings."), { status: 409 });
}

function selectKnowledge(prompt, records, snapshot) {
  const terms = new Set(String(prompt).toLowerCase().match(/[a-z]{4,}/g) || []);
  const candidates = [...records, ...(snapshot.records || [])].filter((record) => record.usage !== "prohibited");
  return candidates
    .map((record) => ({ record, score: [...terms].filter((term) => `${record.topic} ${record.category} ${record.text}`.toLowerCase().includes(term)).length }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 40)
    .map(({ record }) => record);
}

const briefSchema = {
  type: "object",
  properties: {
    angle: { type: "string" }, audience: { type: "string" }, searchIntent: { type: "string" }, category: { type: "string" },
    workingTitle: { type: "string" }, sourceIds: { type: "array", items: { type: "string" } },
    proposedInternalLinks: { type: "array", items: { type: "string" } }, conflicts: { type: "array", items: { type: "string" } },
    missingInformation: { type: "array", items: { type: "string" } },
  },
  required: ["angle", "audience", "searchIntent", "category", "workingTitle", "sourceIds", "proposedInternalLinks", "conflicts", "missingInformation"], additionalProperties: false,
};

const outlineSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    sections: { type: "array", items: { type: "object", properties: { heading: { type: "string" }, purpose: { type: "string" }, sourceIds: { type: "array", items: { type: "string" } } }, required: ["heading", "purpose", "sourceIds"], additionalProperties: false } },
    quickAnswerPurpose: { type: "string" }, takeawaysPurpose: { type: "string" },
  },
  required: ["title", "sections", "quickAnswerPurpose", "takeawaysPurpose"], additionalProperties: false,
};

const draftSchema = {
  type: "object",
  properties: {
    slug: { type: "string" }, title: { type: "string" }, seoTitle: { type: "string" }, description: { type: "string" }, excerpt: { type: "string" }, category: { type: "string" },
    blocks: { type: "array", items: { type: "object", properties: {
      kind: { type: "string", enum: ["paragraph", "heading-2", "heading-3", "unordered-list", "ordered-list", "quote", "callout", "quick-answer", "key-takeaways"] },
      id: { type: "string" }, title: { type: "string" }, text: { type: "string" }, items: { type: "array", items: { type: "string" } }, sourceIds: { type: "array", items: { type: "string" } },
    }, required: ["kind", "id", "title", "text", "items", "sourceIds"], additionalProperties: false } },
    relatedArticleSlugs: { type: "array", items: { type: "string" } },
    claims: { type: "array", items: { type: "object", properties: { id: { type: "string" }, text: { type: "string" }, status: { type: "string", enum: ["grounded", "editorial", "inferred", "unverified"] }, sourceIds: { type: "array", items: { type: "string" } }, note: { type: "string" } }, required: ["id", "text", "status", "sourceIds", "note"], additionalProperties: false } },
  },
  required: ["slug", "title", "seoTitle", "description", "excerpt", "category", "blocks", "relatedArticleSlugs", "claims"], additionalProperties: false,
};

function sanitizedCodexEnv() {
  return Object.fromEntries(Object.entries(process.env).filter(([key, value]) => value !== undefined && !["OPENAI_API_KEY", "CODEX_API_KEY"].includes(key)));
}

function mapUsage(usage) {
  return {
    inputTokens: usage?.input_tokens || 0,
    cachedInputTokens: usage?.cached_input_tokens || 0,
    outputTokens: usage?.output_tokens || 0,
    reasoningOutputTokens: usage?.reasoning_output_tokens || 0,
  };
}

function addUsage(left = {}, right = {}) {
  return {
    inputTokens: (left.inputTokens || 0) + (right.inputTokens || 0), cachedInputTokens: (left.cachedInputTokens || 0) + (right.cachedInputTokens || 0),
    outputTokens: (left.outputTokens || 0) + (right.outputTokens || 0), reasoningOutputTokens: (left.reasoningOutputTokens || 0) + (right.reasoningOutputTokens || 0),
  };
}

function codexOptions(settings) {
  return {
    workingDirectory: ROOT,
    sandboxMode: "read-only",
    approvalPolicy: "never",
    networkAccessEnabled: false,
    webSearchMode: "disabled",
    modelReasoningEffort: settings.reasoningEffort || "medium",
    ...(settings.model ? { model: settings.model } : {}),
  };
}

function isUsageError(error) {
  return /usage|limit|credit|quota|allowance|rate.?limit/i.test(String(error?.message || error));
}

async function runCodexStage(stage, payload) {
  const state = await buildState();
  if (!state.settings.includedUsageOnly) throw Object.assign(new Error("This CMS is configured for included Codex usage only."), { status: 412 });
  if (!state.settings.paidCreditsDisabledAcknowledged) throw Object.assign(new Error("Confirm in Settings that account-level paid credits and auto top-up are disabled before using Article Studio."), { status: 412 });

  const codex = new Codex({ env: sanitizedCodexEnv() });
  const now = new Date().toISOString();
  const jobs = state.jobs;
  let job;
  let thread;
  let schema;
  let prompt;

  if (stage === "brief") {
    const sources = selectKnowledge(payload.prompt, state.knowledge, state.snapshot);
    job = {
      id: crypto.randomUUID(), status: "running", stage: "brief", prompt: payload.prompt,
      inputs: payload.inputs || {}, sources, threadId: null, model: state.settings.model || "Codex account default",
      createdAt: now, updatedAt: now, usage: mapUsage(null), brief: null, outline: null, articleSlug: null,
    };
    jobs.push(job);
    thread = codex.startThread(codexOptions(state.settings));
    schema = briefSchema;
    prompt = `You are the grounded editorial planner for Luxe Event Co. Use only the supplied approved sources and voice rules. Do not invent facts. Identify missing or conflicting information explicitly. Return the requested structured brief.\n\nARTICLE REQUEST:\n${payload.prompt}\n\nOPTIONAL INPUTS:\n${JSON.stringify(payload.inputs || {})}\n\nBRAND VOICE:\n${JSON.stringify(state.voice)}\n\nAPPROVED SOURCES:\n${JSON.stringify(sources)}\n\nKNOWN SITE PATHS:\n${JSON.stringify(state.knownPaths)}`;
  } else {
    job = jobs.find((candidate) => candidate.id === payload.jobId);
    if (!job) throw Object.assign(new Error("Studio job not found."), { status: 404 });
    if (stage === "outline" && !job.briefApprovedAt) throw Object.assign(new Error("Approve the brief before generating an outline."), { status: 409 });
    if (stage === "draft" && !job.outlineApprovedAt) throw Object.assign(new Error("Approve the outline before generating a draft."), { status: 409 });
    thread = codex.resumeThread(job.threadId, codexOptions(state.settings));
    if (stage === "outline") {
      schema = outlineSchema;
      prompt = `Create a grounded article outline from the approved brief below. Use only its cited source IDs. Include a clear purpose for every section, a Quick Answer, and Key Takeaways. Do not draft the article yet.\n\nAPPROVED BRIEF:\n${JSON.stringify(job.brief)}\n\nSOURCES:\n${JSON.stringify(job.sources)}\n\nVOICE:\n${JSON.stringify(state.voice)}`;
    } else {
      schema = draftSchema;
      prompt = `Draft the complete Luxe Journal article from the approved brief and outline. Use only supplied sources. Every material factual claim must appear in claims with source IDs; unsupported material must be marked unverified, never disguised as fact. Use measured Canadian English and obey excluded language. Internal links must use only known paths. Return structured blocks.\n\nBRIEF:\n${JSON.stringify(job.brief)}\n\nOUTLINE:\n${JSON.stringify(job.outline)}\n\nSOURCES:\n${JSON.stringify(job.sources)}\n\nVOICE:\n${JSON.stringify(state.voice)}\n\nKNOWN PATHS:\n${JSON.stringify(state.knownPaths)}`;
    }
  }

  try {
    const result = await thread.run(prompt, { outputSchema: schema });
    const parsed = JSON.parse(result.finalResponse);
    job.threadId = thread.id;
    job.status = "awaiting-approval";
    job.stage = stage;
    job.updatedAt = new Date().toISOString();
    job.usage = addUsage(job.usage, mapUsage(result.usage));
    if (stage === "brief") job.brief = parsed;
    if (stage === "outline") job.outline = parsed;
    if (stage === "draft") {
      const article = generatedDraftToArticle(parsed, job, state.voice);
      const saved = await saveArticle(article);
      job.articleSlug = saved.article.slug;
      job.status = "draft-created";
    }
    await atomicWriteJson(FILES.jobs, jobs);
    return job;
  } catch (error) {
    job.status = isUsageError(error) ? "paused-usage-unavailable" : "failed";
    job.error = String(error?.message || error);
    job.updatedAt = new Date().toISOString();
    await atomicWriteJson(FILES.jobs, jobs);
    throw Object.assign(new Error(job.status === "paused-usage-unavailable" ? "Codex included usage is unavailable. The job has been paused without losing progress." : `Codex generation failed: ${job.error}`), { status: job.status === "paused-usage-unavailable" ? 429 : 502 });
  }
}

function generatedDraftToArticle(result, job, voice) {
  const now = new Date().toISOString();
  const toParts = (text) => [{ text }];
  const content = result.blocks.map((block) => {
    if (block.kind === "paragraph") return { type: "paragraph", content: toParts(block.text) };
    if (block.kind === "heading-2" || block.kind === "heading-3") return { type: "heading", id: block.id || safeFilename(block.title || block.text), level: block.kind === "heading-2" ? 2 : 3, text: block.title || block.text };
    if (block.kind === "unordered-list" || block.kind === "ordered-list") return { type: "list", style: block.kind === "ordered-list" ? "ordered" : "unordered", items: block.items.map(toParts) };
    if (block.kind === "quote") return { type: "quote", quote: block.text, ...(block.title ? { attribution: block.title } : {}) };
    if (block.kind === "quick-answer") return { type: "quick-answer", title: block.title || "Quick answer", content: toParts(block.text) };
    if (block.kind === "key-takeaways") return { type: "key-takeaways", title: block.title || "Key takeaways", items: block.items.map(toParts) };
    return { type: "callout", ...(block.title ? { title: block.title } : {}), content: toParts(block.text) };
  });
  return {
    schemaVersion: 1, slug: result.slug, title: result.title, seoTitle: result.seoTitle, description: result.description, excerpt: result.excerpt, category: result.category,
    publishDate: now, modifiedDate: now, author: { name: "Luxe Event Co.", type: "Organization", url: "https://luxeeventco.ca" },
    heroImage: null, heroAlt: "", socialImage: null, content, relatedArticleSlugs: result.relatedArticleSlugs, status: "draft", claims: result.claims,
    generation: { threadId: job.threadId, stage: "draft", model: job.model, createdAt: job.createdAt, updatedAt: now, knowledgeSnapshot: job.sources.map((source) => source.id).join(","), voiceVersion: voice.version || "unknown", usage: job.usage, briefApprovedAt: job.briefApprovedAt, outlineApprovedAt: job.outlineApprovedAt },
  };
}

async function approveStudioStage(jobId, stage) {
  const jobs = await readJson(FILES.jobs, []);
  const job = jobs.find((candidate) => candidate.id === jobId);
  if (!job) throw Object.assign(new Error("Studio job not found."), { status: 404 });
  const now = new Date().toISOString();
  if (stage === "brief") job.briefApprovedAt = now;
  else if (stage === "outline") job.outlineApprovedAt = now;
  else throw Object.assign(new Error("Only brief and outline stages can be approved."), { status: 400 });
  job.updatedAt = now;
  await atomicWriteJson(FILES.jobs, jobs);
  return job;
}

async function serveStatic(req, res, pathname) {
  const relative = pathname === "/" ? "index.html" : pathname.replace(/^\//, "");
  const file = path.resolve(STATIC_DIR, relative);
  if (!file.startsWith(STATIC_DIR)) return false;
  try {
    const info = await stat(file);
    if (!info.isFile()) return false;
    const extension = path.extname(file);
    const contentType = extension === ".html" ? "text/html; charset=utf-8" : extension === ".css" ? "text/css; charset=utf-8" : extension === ".js" ? "text/javascript; charset=utf-8" : "application/octet-stream";
    res.writeHead(200, { "content-type": contentType, "cache-control": "no-store", "x-content-type-options": "nosniff" });
    createReadStream(file).pipe(res);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

async function handler(req, res) {
  if (!isLoopback(req)) return errorResponse(res, 403, "The Luxe CMS accepts loopback connections only.");
  const settings = await readJson(FILES.settings, { host: "127.0.0.1", port: 4317 });
  const origin = `http://${req.headers.host}`;
  allowedOrigins.add(origin);
  res.setHeader("content-security-policy", "default-src 'self'; img-src 'self' data: http://127.0.0.1:* http://localhost:*; style-src 'self' 'unsafe-inline'; script-src 'self'; frame-src 'self'; base-uri 'none'; form-action 'self'");
  res.setHeader("referrer-policy", "no-referrer");
  res.setHeader("x-frame-options", "SAMEORIGIN");
  const requestOrigin = req.headers.origin;
  if (requestOrigin && !allowedOrigins.has(requestOrigin)) return errorResponse(res, 403, "Origin is not allowed.");
  const url = new URL(req.url, origin);

  if (url.pathname === "/api/session" && req.method === "GET") return json(res, 200, { token: MUTATION_TOKEN, loopback: true });
  if (url.pathname === "/api/state" && req.method === "GET") return json(res, 200, await buildState());
  if (url.pathname.startsWith("/api/preview/") && req.method === "GET") {
    const token = url.pathname.split("/").at(-1);
    if (!/^[a-f0-9]{48}$/.test(token || "")) return errorResponse(res, 404, "Preview not found.");
    const preview = await readJson(path.join(FILES.runtime, "previews", `${token}.json`), null);
    if (!preview || preview.token !== token || preview.expiresAt < Date.now()) return errorResponse(res, 404, "Preview expired or unavailable.");
    res.setHeader("cache-control", "no-store");
    res.setHeader("x-robots-tag", "noindex, nofollow");
    return json(res, 200, preview);
  }
  if (url.pathname.startsWith("/api/") && req.method !== "GET" && !requireMutationToken(req)) return errorResponse(res, 403, "Invalid CMS mutation token.");

  try {
    if (url.pathname === "/api/articles/new" && req.method === "POST") return json(res, 200, createEmptyArticle());
    if (url.pathname === "/api/articles/save" && req.method === "POST") return json(res, 200, await saveArticle((await readJsonBody(req)).article));
    if (url.pathname === "/api/articles/lifecycle" && req.method === "POST") {
      const body = await readJsonBody(req);
      return json(res, 200, await lifecycle(body.slug, body.action, body));
    }
    if (url.pathname === "/api/preview" && req.method === "POST") {
      const { article } = await readJsonBody(req);
      const token = crypto.randomBytes(24).toString("hex");
      const expiresAt = Date.now() + 30 * 60 * 1000;
      const publicSiteUrl = await resolvePublicSiteUrl(settings);
      await atomicWriteJson(path.join(FILES.runtime, "previews", `${token}.json`), { token, expiresAt, article }, { revision: false });
      return json(res, 200, { url: `${publicSiteUrl}/preview/${runtimePort}/${token}/${encodeURIComponent(article.slug)}`, expiresInMinutes: 30 });
    }
    if (url.pathname === "/api/media" && req.method === "POST") return json(res, 200, await ingestMedia(req, url));
    if (url.pathname === "/api/knowledge/scan" && req.method === "POST") return json(res, 200, await scanKnowledge());
    if (url.pathname === "/api/knowledge/approve" && req.method === "POST") return json(res, 200, await approveKnowledgeScan());
    if (url.pathname === "/api/knowledge/save" && req.method === "POST") {
      const { records } = await readJsonBody(req);
      await atomicWriteJson(FILES.knowledge, records);
      return json(res, 200, { saved: records.length });
    }
    if (url.pathname === "/api/voice/save" && req.method === "POST") {
      const { voice } = await readJsonBody(req);
      await atomicWriteJson(FILES.voice, voice);
      return json(res, 200, voice);
    }
    if (url.pathname === "/api/settings/save" && req.method === "POST") {
      const body = await readJsonBody(req);
      const next = { ...settings, ...body.settings, host: "127.0.0.1", includedUsageOnly: true };
      await atomicWriteJson(FILES.settings, next);
      return json(res, 200, next);
    }
    if (url.pathname === "/api/studio/brief" && req.method === "POST") return json(res, 200, await runCodexStage("brief", await readJsonBody(req)));
    if (url.pathname === "/api/studio/outline" && req.method === "POST") return json(res, 200, await runCodexStage("outline", await readJsonBody(req)));
    if (url.pathname === "/api/studio/draft" && req.method === "POST") return json(res, 200, await runCodexStage("draft", await readJsonBody(req)));
    if (url.pathname === "/api/studio/approve" && req.method === "POST") {
      const body = await readJsonBody(req);
      return json(res, 200, await approveStudioStage(body.jobId, body.stage));
    }
    if (url.pathname.startsWith("/api/")) return errorResponse(res, 404, "API route not found.");
    if (await serveStatic(req, res, url.pathname)) return;
    errorResponse(res, 404, "Not found.");
  } catch (error) {
    errorResponse(res, error.status || 500, error.message || "Unexpected CMS error.", error.details);
  }
}

const initialSettings = await readJson(FILES.settings, { host: "127.0.0.1", port: 4317 });
const runtimePort = Number(process.env.LUXE_CMS_PORT) || initialSettings.port || 4317;
const server = http.createServer((req, res) => void handler(req, res));
server.listen(runtimePort, "127.0.0.1", () => {
  process.stdout.write(`Luxe Blog CMS: http://127.0.0.1:${runtimePort}\n`);
  if (!initialSettings.paidCreditsDisabledAcknowledged) {
    process.stdout.write("Article Studio is locked until paid-credit auto top-up is confirmed disabled in Settings.\n");
  }
});
