import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildLinkGraph, routeFromPageFile, validateArticle } from "../cms/core.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = async (file, fallback = []) => {
  try { return JSON.parse(await readFile(file, "utf8")); }
  catch (error) { if (error.code === "ENOENT") return fallback; throw error; }
};
const collect = async (directory, output = []) => {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) await collect(full, output);
    else if (/\/page\.(tsx|ts|jsx|js)$/.test(full)) output.push(full);
  }
  return output;
};

const base = path.join(ROOT, "content", "blog");
const [published, drafts, archived, voice, pageFiles] = await Promise.all([
  readJson(path.join(base, "published", "articles.json")),
  readJson(path.join(base, "drafts", "articles.json")),
  readJson(path.join(base, "archived", "articles.json")),
  readJson(path.join(base, "voice.json"), {}),
  collect(path.join(ROOT, "app")),
]);
const all = [...published, ...drafts, ...archived];
const knownPaths = pageFiles.map((file) => routeFromPageFile(ROOT, file)).filter(Boolean);
const graph = buildLinkGraph(all, knownPaths);
const results = all.map((article) => ({ article, issues: validateArticle(article, all, { voice, knownPaths, graph }) }));
const blockers = results.flatMap(({ article, issues }) => article.status === "published" ? issues.filter((entry) => entry.severity === "error").map((entry) => `${article.slug}: ${entry.message}`) : []);
const warnings = results.reduce((sum, result) => sum + result.issues.filter((entry) => entry.severity === "warning").length, 0);

if (blockers.length) {
  process.stderr.write(`Blog content validation failed:\n${blockers.map((entry) => `- ${entry}`).join("\n")}\n`);
  process.exit(1);
}
process.stdout.write(`Blog content valid: ${published.length} published, ${drafts.length} drafts, ${archived.length} archived, ${warnings} editorial warnings.\n`);
