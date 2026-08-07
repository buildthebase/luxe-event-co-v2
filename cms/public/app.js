const workspace = document.querySelector("#workspace");
const toast = document.querySelector("#toast");
let token = "";
let state = null;
let selectedSlug = null;
let activeView = "articles";
let statusFilter = "all";
let activeJobId = null;
let studioBusy = false;
let studioBusyStartedAt = 0;
let studioBusyTimer = null;

const studioActions = new Set(["studio-brief", "approve-brief", "studio-outline", "approve-outline", "studio-draft"]);
const studioActivity = {
  "studio-brief": ["Grounding", "Building the grounded brief", "Reviewing approved knowledge, voice rules, source evidence, and proposed links."],
  "approve-brief": ["Checkpoint", "Approving the brief", "Saving your approval before the outline can begin."],
  "studio-outline": ["Structuring", "Developing the article outline", "Turning the approved brief into a clear search-focused editorial structure."],
  "approve-outline": ["Checkpoint", "Approving the outline", "Saving the approved structure before drafting begins."],
  "studio-draft": ["Drafting", "Writing the grounded article draft", "Creating the article, metadata, summary blocks, links, and claim provenance."],
};

const escapeHtml = (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const formatDate = (value) => value ? new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "short", day: "numeric" }).format(new Date(value)) : "—";

function showToast(message, error = false) {
  toast.textContent = message;
  toast.className = `show${error ? " error" : ""}`;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => { toast.className = ""; }, 3800);
}

function formatElapsed(milliseconds) {
  const seconds = Math.max(0, Math.floor(milliseconds / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function startStudioActivity(action) {
  const [eyebrow, title, detail] = studioActivity[action];
  const activity = document.querySelector("#studio-activity");
  studioBusy = true;
  studioBusyStartedAt = Date.now();
  document.body.classList.add("studio-is-busy");
  workspace.setAttribute("aria-busy", "true");
  document.querySelectorAll("[data-action]").forEach((button) => {
    if (studioActions.has(button.dataset.action)) button.disabled = true;
  });
  document.querySelector("#studio-activity-eyebrow").textContent = eyebrow;
  document.querySelector("#studio-activity-title").textContent = title;
  document.querySelector("#studio-activity-detail").textContent = detail;
  document.querySelector("#studio-activity-time").textContent = "0:00";
  activity.hidden = false;
  clearInterval(studioBusyTimer);
  studioBusyTimer = setInterval(() => {
    document.querySelector("#studio-activity-time").textContent = formatElapsed(Date.now() - studioBusyStartedAt);
  }, 1000);
}

function stopStudioActivity() {
  clearInterval(studioBusyTimer);
  studioBusyTimer = null;
  studioBusy = false;
  document.body.classList.remove("studio-is-busy");
  workspace.setAttribute("aria-busy", "false");
  document.querySelectorAll("[data-action]").forEach((button) => {
    if (studioActions.has(button.dataset.action)) button.disabled = false;
  });
  document.querySelector("#studio-activity").hidden = true;
}

async function runStudioAction(action, task) {
  if (studioBusy) {
    showToast("Article Studio is already working on the current step.");
    return;
  }
  startStudioActivity(action);
  const minimumVisibleTime = new Promise((resolve) => setTimeout(resolve, 500));
  try {
    const result = await task();
    await minimumVisibleTime;
    return result;
  } finally {
    stopStudioActivity();
  }
}

async function api(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (options.body && !(options.body instanceof ArrayBuffer)) headers["content-type"] = "application/json";
  if (options.method && options.method !== "GET") headers["x-cms-token"] = token;
  const response = await fetch(path, { ...options, headers });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(result.error || `Request failed (${response.status})`);
    error.details = result.details;
    throw error;
  }
  return result;
}

async function refresh() {
  state = await api("/api/state");
}

function allArticles() {
  return [...state.published, ...state.drafts, ...state.archived, ...state.trash];
}

function selectedArticle() {
  return allArticles().find((article) => article.slug === selectedSlug) || null;
}

function setView(view) {
  activeView = view;
  document.querySelectorAll(".nav-button").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  render();
  workspace.focus({ preventScroll: true });
  window.scrollTo(0, 0);
}

function renderHeader(eyebrow, title, actions = "") {
  return `<header class="view-header"><div><p class="eyebrow">${escapeHtml(eyebrow)}</p><h1>${escapeHtml(title)}</h1></div>${actions ? `<div class="toolbar">${actions}</div>` : ""}</header>`;
}

function issueSummary(slug) {
  const issues = state.issues[slug] || [];
  const errors = issues.filter((entry) => entry.severity === "error").length;
  const warnings = issues.filter((entry) => entry.severity === "warning").length;
  if (errors) return `<span class="issue-count error">${errors} error${errors === 1 ? "" : "s"}</span>`;
  if (warnings) return `<span class="issue-count warning">${warnings} warning${warnings === 1 ? "" : "s"}</span>`;
  return `<span class="issue-count">Ready</span>`;
}

function renderArticles() {
  const articles = allArticles();
  workspace.innerHTML = `${renderHeader("Luxe Journal", "Articles", '<button class="button primary" data-action="new-article">New article</button>')}
    <input class="search" id="article-search" type="search" placeholder="Search title, slug, category, excerpt, or body" aria-label="Search articles">
    <div class="filters">${["all", "draft", "published", "archived", "trash"].map((status) => `<button class="filter${statusFilter === status ? " active" : ""}" data-status-filter="${status}">${status[0].toUpperCase() + status.slice(1)}</button>`).join("")}</div>
    <div class="article-list" id="article-list">${renderArticleRows(articles)}</div>`;
  document.querySelector("#article-search").addEventListener("input", (event) => {
    document.querySelector("#article-list").innerHTML = renderArticleRows(articles, event.target.value);
  });
}

function renderArticleRows(articles, query = "") {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const filtered = articles.filter((article) => {
    if (statusFilter !== "all" && article.status !== statusFilter) return false;
    if (!terms.length) return true;
    const body = JSON.stringify(article).toLowerCase();
    return terms.every((term) => body.includes(term));
  });
  if (!filtered.length) return `<p class="empty">No articles match this view.</p>`;
  return filtered.map((article) => `<button class="article-row" data-open-article="${escapeHtml(article.slug)}">
    <strong>${escapeHtml(article.title)}</strong><span class="secondary">${escapeHtml(article.category)}</span><time>${formatDate(article.modifiedDate)}</time><span class="status">${escapeHtml(article.status)}</span>${issueSummary(article.slug)}
  </button>`).join("");
}

function field(label, name, value, { type = "text", full = false, maxlength, rows, readonly = false } = {}) {
  const attrs = `${maxlength ? ` maxlength="${maxlength}"` : ""}${readonly ? " readonly" : ""}`;
  const control = type === "textarea"
    ? `<textarea name="${name}" rows="${rows || 4}"${attrs}>${escapeHtml(value)}</textarea>`
    : `<input name="${name}" type="${type}" value="${escapeHtml(value)}"${attrs}>`;
  return `<div class="field${full ? " full" : ""}"><label for="${name}">${escapeHtml(label)}</label>${control}${maxlength ? `<span class="counter">${String(value || "").length}/${maxlength}</span>` : ""}</div>`;
}

function renderIssues(article) {
  const issues = state.issues[article.slug] || [];
  if (!issues.length) return `<p class="subtle">No validation issues.</p>`;
  return `<ul class="issue-list">${issues.map((entry) => `<li class="${entry.severity}"><strong>${entry.severity === "error" ? "Blocker" : "Guidance"}</strong><br>${escapeHtml(entry.message)}</li>`).join("")}</ul>`;
}

function renderEditor() {
  const article = selectedArticle();
  if (!article) {
    workspace.innerHTML = `${renderHeader("Luxe Journal", "Editor")}<div class="panel empty">Choose an article from Articles or create a new draft.</div>`;
    return;
  }
  workspace.innerHTML = `${renderHeader("Article editor", article.title, '<button class="button" data-action="preview">Preview</button><button class="button primary" data-action="save-article">Save</button>')}
    <div class="editor-layout"><form id="article-form">
      <section class="panel"><h2>Core content</h2><div class="field-grid">
        ${field("Title", "title", article.title, { full: true })}
        ${field("Slug", "slug", article.slug)}${field("Category", "category", article.category)}
        ${field("SEO title", "seoTitle", article.seoTitle, { full: true, maxlength: 70 })}
        ${field("Meta description", "description", article.description, { type: "textarea", full: true, maxlength: 170 })}
        ${field("Excerpt", "excerpt", article.excerpt, { type: "textarea", full: true })}
        ${field("Publish date", "publishDate", article.publishDate)}${field("Modified date", "modifiedDate", article.modifiedDate, { readonly: true })}
      </div></section>
      <section class="panel"><h2>Structured content</h2><p class="subtle">Edit content blocks as structured JSON. Supported blocks include paragraphs, H2/H3 headings, lists, quotes, tables, callouts, images, Quick Answer, and Key Takeaways.</p>
        <div class="field"><label for="content">Content blocks</label><textarea class="code" name="content" id="content">${escapeHtml(JSON.stringify(article.content, null, 2))}</textarea></div>
      </section>
      <section class="panel"><h2>Relationships and grounding</h2>
        ${field("Related article slugs (one per line)", "related", (article.relatedArticleSlugs || []).join("\n"), { type: "textarea", full: true })}
        <div class="field"><label for="claims">Claims and source provenance</label><textarea class="code" name="claims" id="claims">${escapeHtml(JSON.stringify(article.claims || [], null, 2))}</textarea></div>
      </section>
      <input type="hidden" name="originalSlug" value="${escapeHtml(article.slug)}">
    </form><aside>
      <section class="panel"><p class="eyebrow">Publication</p><span class="status">${escapeHtml(article.status)}</span><div class="toolbar" style="margin-top:18px">
        ${article.status !== "published" ? '<button class="button gold" data-action="publish">Publish</button>' : '<button class="button" data-action="archive">Archive</button>'}
        ${article.status !== "trash" ? '<button class="button danger" data-action="trash">Trash</button>' : '<button class="button" data-action="restore">Restore draft</button>'}
      </div></section>
      <section class="panel"><p class="eyebrow">SEO preview</p><div class="snippet"><a>luxeeventco.ca › blog › ${escapeHtml(article.slug)}</a><strong>${escapeHtml(article.seoTitle)}</strong><span>${escapeHtml(article.description)}</span></div></section>
      <section class="panel"><p class="eyebrow">Validation</p>${renderIssues(article)}</section>
    </aside></div>`;
}

function collectEditorArticle() {
  const form = new FormData(document.querySelector("#article-form"));
  const current = selectedArticle();
  let content, claims;
  try { content = JSON.parse(form.get("content")); } catch { throw new Error("Content blocks must be valid JSON."); }
  try { claims = JSON.parse(form.get("claims")); } catch { throw new Error("Claims must be valid JSON."); }
  return {
    ...current,
    originalSlug: form.get("originalSlug"),
    title: form.get("title").trim(), slug: form.get("slug").trim(), category: form.get("category").trim(),
    seoTitle: form.get("seoTitle").trim(), description: form.get("description").trim(), excerpt: form.get("excerpt").trim(),
    publishDate: form.get("publishDate"), content, claims,
    relatedArticleSlugs: form.get("related").split("\n").map((value) => value.trim()).filter(Boolean),
  };
}

function renderLinks() {
  const article = selectedArticle();
  if (!article) {
    workspace.innerHTML = `${renderHeader("SEO architecture", "Internal links")}<div class="panel empty">Choose an article to inspect its link graph.</div>`;
    return;
  }
  const graph = state.graph[article.slug] || { outgoing: [], incoming: { published: [], drafts: [] }, related: [], orphan: false };
  workspace.innerHTML = `${renderHeader("SEO architecture", "Internal links")}
    <div class="metric-grid"><div class="metric"><strong>${graph.outgoing.length}</strong><span>Links from article</span></div><div class="metric"><strong>${graph.incoming.published.length}</strong><span>Published inbound</span></div><div class="metric"><strong>${graph.incoming.drafts.length}</strong><span>Planned inbound</span></div><div class="metric"><strong class="${graph.orphan ? "orphan" : ""}">${graph.orphan ? "Yes" : "No"}</strong><span>Orphan status</span></div></div>
    <div class="two-column"><div>
      <section class="panel"><h2>From this article</h2>${listLinks(graph.outgoing.map((link) => `${link.valid ? "✓" : "×"} ${link.label} — ${link.href} · ${link.location}`))}</section>
      <section class="panel"><h2>Published articles linking here</h2>${listLinks(graph.incoming.published.map((link) => `${link.title} · ${link.location}`))}</section>
    </div><aside>
      <section class="panel"><h2>Draft links</h2><p class="subtle">Draft links are visible but do not clear orphan status.</p>${listLinks(graph.incoming.drafts.map((link) => `${link.title} · ${link.location}`))}</section>
      <section class="panel"><h2>Related articles</h2>${listLinks(graph.related.map((link) => `${link.exists ? "✓" : "×"} ${link.slug}`))}</section>
    </aside></div>`;
}

function listLinks(items) {
  return items.length ? `<ul class="link-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : `<p class="subtle">None recorded.</p>`;
}

function renderMedia() {
  const article = selectedArticle();
  workspace.innerHTML = `${renderHeader("Asset library", "Media")}
    <div class="two-column"><form id="media-form" class="panel"><h2>Upload and optimize</h2>
      <div class="field"><label for="media-file">Original image</label><input id="media-file" type="file" accept="image/jpeg,image/png,image/webp,image/avif" required></div>
      ${field("Article slug", "media-article", article?.slug || "library")}${field("Alt text", "media-alt", "", { full: true })}
      <label class="checkbox"><input id="media-decorative" type="checkbox"> This image is decorative and should use empty alt text.</label>
      <div class="field-grid" style="margin-top:18px">${field("Focal X (0–1)", "focal-x", "0.5")}${field("Focal Y (0–1)", "focal-y", "0.5")}</div>
      <button class="button primary" data-action="upload-media">Create derivatives</button>
    </form><section class="panel"><h2>Approved assets</h2>${state.media.length ? state.media.slice().reverse().map((asset) => `<article style="margin-bottom:24px"><img class="media-preview" src="${escapeHtml(asset.hero.src)}" alt="${escapeHtml(asset.alt)}"><h3>${escapeHtml(asset.originalFilename)}</h3><p class="subtle">${asset.sourceWidth} × ${asset.sourceHeight} · ${asset.derivatives.length} responsive derivatives · social crop ${asset.social.width} × ${asset.social.height}</p>${article ? `<div class="toolbar"><button class="button" data-use-media="hero" data-media-id="${asset.id}">Use as hero</button><button class="button" data-use-media="social" data-media-id="${asset.id}">Use as social</button></div>` : ""}</article>`).join("") : '<p class="subtle">No media uploaded yet.</p>'}</section></div>`;
}

function renderKnowledge() {
  workspace.innerHTML = `${renderHeader("Grounded source library", "Knowledge", '<button class="button" data-action="scan-knowledge">Scan website</button><button class="button primary" data-action="approve-knowledge">Approve scan</button>')}
    <div class="metric-grid"><div class="metric"><strong>${state.snapshot.records?.length || 0}</strong><span>Website records</span></div><div class="metric"><strong>${state.knowledge.length}</strong><span>Supplemental records</span></div><div class="metric"><strong>${state.knowledge.filter((record) => record.usage === "prohibited").length}</strong><span>Prohibited sources</span></div><div class="metric"><strong>${state.knowledge.filter((record) => (record.conflictsWith || []).length).length}</strong><span>Conflicts</span></div></div>
    <section class="panel"><h2>Supplemental knowledge</h2><p class="subtle">Store additional verified information as structured records. Usage may be publishable, paraphrase-only, internal-background, or prohibited.</p>
      <textarea class="code" id="knowledge-json">${escapeHtml(JSON.stringify(state.knowledge, null, 2))}</textarea><div class="toolbar" style="margin-top:18px"><button class="button primary" data-action="save-knowledge">Save supplemental records</button></div>
    </section><section class="panel" id="knowledge-diff"><h2>Synchronization review</h2><p class="subtle">Run a scan to compare the current website with the approved knowledge snapshot. Nothing is replaced until you approve it.</p></section>`;
}

function renderVoice() {
  workspace.innerHTML = `${renderHeader("Editorial governance", "Brand voice")}
    <section class="panel"><h2>Luxe language rules</h2><p class="subtle">Prohibited claims and excluded language block publication. Tone guidance remains advisory.</p>
      <textarea class="code" id="voice-json">${escapeHtml(JSON.stringify(state.voice, null, 2))}</textarea><div class="toolbar" style="margin-top:18px"><button class="button primary" data-action="save-voice">Save voice rules</button></div>
    </section>`;
}

function renderStudio() {
  const job = state.jobs.find((candidate) => candidate.id === activeJobId) || state.jobs.at(-1) || null;
  if (job) activeJobId = job.id;
  workspace.innerHTML = `${renderHeader("Codex-powered, human-approved", "Article Studio")}
    <div class="studio-steps"><div class="studio-step ${job?.briefApprovedAt ? "done" : ""}"><strong>1 · Brief</strong><p class="subtle">Ground sources and define the angle.</p></div><div class="studio-step ${job?.outlineApprovedAt ? "done" : ""}"><strong>2 · Outline</strong><p class="subtle">Approve the article structure.</p></div><div class="studio-step ${job?.articleSlug ? "done" : ""}"><strong>3 · Draft</strong><p class="subtle">Create a review-only CMS draft.</p></div></div>
    <div class="two-column"><div>
      <section class="panel"><h2>Article request</h2><div class="field"><label for="studio-prompt">What article should Luxe create?</label><textarea id="studio-prompt" rows="7" placeholder="Create a grounded planning article about…">${escapeHtml(job?.prompt || "")}</textarea></div>
        <div class="field-grid">${field("Audience", "studio-audience", job?.inputs?.audience || "")}${field("Search intent", "studio-intent", job?.inputs?.searchIntent || "")}${field("Category", "studio-category", job?.inputs?.category || "")}${field("Geography", "studio-geography", job?.inputs?.geography || "Toronto and the GTA")}</div>
        <button class="button primary" data-action="studio-brief">Generate grounded brief</button>
      </section>
      ${job ? `<section class="panel"><div class="toolbar" style="justify-content:space-between"><h2>Current job</h2><span class="status">${escapeHtml(job.status)}</span></div><p class="subtle">Thread ${escapeHtml(job.threadId || "starting")} · ${escapeHtml(job.model)} · ${job.usage?.inputTokens || 0} input / ${job.usage?.outputTokens || 0} output tokens</p>
        ${job.stage === "brief" ? `<h3>Brief</h3><pre class="json-output">${escapeHtml(JSON.stringify(job.brief, null, 2))}</pre><div class="toolbar" style="margin-top:18px">${job.briefApprovedAt ? '<button class="button primary" data-action="studio-outline">Generate outline</button>' : '<button class="button gold" data-action="approve-brief">Approve brief</button>'}</div>` : ""}
        ${job.outline ? `<h3 style="margin-top:28px">Outline</h3><pre class="json-output">${escapeHtml(JSON.stringify(job.outline, null, 2))}</pre><div class="toolbar" style="margin-top:18px">${job.outlineApprovedAt ? '<button class="button primary" data-action="studio-draft">Generate draft</button>' : '<button class="button gold" data-action="approve-outline">Approve outline</button>'}</div>` : ""}
        ${job.articleSlug ? `<p style="margin-top:22px"><strong>Draft created:</strong> ${escapeHtml(job.articleSlug)}</p><button class="button" data-open-article="${escapeHtml(job.articleSlug)}">Review draft</button>` : ""}
      </section>` : ""}
    </div><aside><section class="panel"><p class="eyebrow">Grounding policy</p><p>Codex runs read-only, without web access or API-key fallback. It receives only relevant approved sources and cannot publish.</p></section><section class="panel"><p class="eyebrow">Usage policy</p><p>${state.settings.paidCreditsDisabledAcknowledged ? "Account-level paid credits are confirmed disabled." : "Article Studio is locked until paid credits and auto top-up are confirmed disabled in Settings."}</p></section></aside></div>`;
}

function renderSettings() {
  workspace.innerHTML = `${renderHeader("Local controls", "Settings")}
    <div class="two-column"><section class="panel"><h2>Codex usage safeguard</h2><p class="subtle">The SDK uses your saved local Codex sign-in. The CMS strips API-key variables and never configures paid fallback. Codex does not expose an API for this CMS to inspect your account’s credit balance, so generation remains locked until you confirm account-level auto top-up is off.</p>
      <label class="checkbox"><input id="credits-confirmed" type="checkbox" ${state.settings.paidCreditsDisabledAcknowledged ? "checked" : ""}> I confirmed in Codex Settings → Usage that paid credits and auto top-up are disabled.</label>
      <div class="toolbar" style="margin-top:22px"><button class="button primary" data-action="save-settings">Save safeguard</button></div>
    </section><aside><section class="panel"><h2>Local access</h2><p><strong>Host:</strong> 127.0.0.1</p><p><strong>Port:</strong> ${state.settings.port}</p><p><strong>Persistence:</strong> versioned JSON files</p><p><strong>Deployment:</strong> disabled</p>${field("Public site URL", "public-site-url", state.settings.publicSiteUrl || "http://127.0.0.1:3000", { full: true })}<p class="subtle">Exact draft previews open through the real Luxe website development server. The CMS will also detect ports 3000–3005 automatically.</p></section></aside></div>`;
}

function render() {
  if (!state) return;
  if (activeView === "articles") renderArticles();
  else if (activeView === "editor") renderEditor();
  else if (activeView === "links") renderLinks();
  else if (activeView === "media") renderMedia();
  else if (activeView === "knowledge") renderKnowledge();
  else if (activeView === "voice") renderVoice();
  else if (activeView === "studio") renderStudio();
  else renderSettings();
}

async function withAction(action) {
  try {
    await action();
  } catch (error) {
    showToast(error.message, true);
    if (error.details) console.error(error.details);
  }
}

document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-view]");
  if (nav) return setView(nav.dataset.view);
  const filter = event.target.closest("[data-status-filter]");
  if (filter) { statusFilter = filter.dataset.statusFilter; return renderArticles(); }
  const open = event.target.closest("[data-open-article]");
  if (open) { selectedSlug = open.dataset.openArticle; return setView("editor"); }
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;
  event.preventDefault();
  if (studioActions.has(action) && studioBusy) {
    showToast("Article Studio is already working on the current step.");
    return;
  }
  withAction(async () => {
    if (action === "new-article") {
      const article = await api("/api/articles/new", { method: "POST", body: "{}" });
      selectedSlug = article.slug;
      state.drafts.push(article);
      setView("editor");
      return;
    }
    if (action === "save-article") {
      const article = collectEditorArticle();
      const result = await api("/api/articles/save", { method: "POST", body: JSON.stringify({ article }) });
      selectedSlug = result.article.slug;
      await refresh(); renderEditor(); showToast("Draft saved with a recoverable revision."); return;
    }
    if (action === "preview") {
      const article = collectEditorArticle();
      const result = await api("/api/preview", { method: "POST", body: JSON.stringify({ article }) });
      window.open(result.url, "_blank", "noopener,noreferrer"); return;
    }
    if (["publish", "trash", "restore"].includes(action)) {
      const result = await api("/api/articles/lifecycle", { method: "POST", body: JSON.stringify({ slug: selectedSlug, action }) });
      selectedSlug = result.article.slug; await refresh(); renderEditor(); showToast(`Article moved to ${result.article.status}.`); return;
    }
    if (action === "archive") {
      const disposition = window.prompt("Type retain-noindex to preserve this URL, or redirect to choose a permanent destination.", "retain-noindex");
      if (!disposition) return;
      const redirectTo = disposition === "redirect" ? window.prompt("Enter a same-site redirect path beginning with /.", "/blog") : undefined;
      const result = await api("/api/articles/lifecycle", { method: "POST", body: JSON.stringify({ slug: selectedSlug, action, archiveDisposition: disposition, redirectTo }) });
      selectedSlug = result.article.slug; await refresh(); renderEditor(); showToast("Article archived safely."); return;
    }
    if (action === "upload-media") {
      const file = document.querySelector("#media-file").files[0];
      if (!file) throw new Error("Choose an image first.");
      const params = new URLSearchParams({ filename: file.name, article: document.querySelector('[name="media-article"]').value, alt: document.querySelector('[name="media-alt"]').value, decorative: String(document.querySelector("#media-decorative").checked), focalX: document.querySelector('[name="focal-x"]').value, focalY: document.querySelector('[name="focal-y"]').value });
      const result = await api(`/api/media?${params}`, { method: "POST", body: await file.arrayBuffer(), headers: { "content-type": file.type } });
      await refresh(); renderMedia(); showToast(`Created ${result.derivatives.length} responsive derivatives and a social crop.`); return;
    }
    if (action === "scan-knowledge") {
      const result = await api("/api/knowledge/scan", { method: "POST", body: "{}" });
      document.querySelector("#knowledge-diff").innerHTML = `<h2>Synchronization review</h2><p><strong>${result.added.length}</strong> added · <strong>${result.removed.length}</strong> removed · <strong>${result.unchanged}</strong> unchanged · <strong>${result.stale.length}</strong> stale · <strong>${result.conflicts.length}</strong> conflicts</p><details><summary>Review additions</summary><pre class="json-output">${escapeHtml(JSON.stringify(result.added.slice(0, 100), null, 2))}</pre></details><details><summary>Review removals</summary><pre class="json-output">${escapeHtml(JSON.stringify(result.removed.slice(0, 100), null, 2))}</pre></details>${result.stale.length ? `<details><summary>Review stale records</summary><pre class="json-output">${escapeHtml(JSON.stringify(result.stale, null, 2))}</pre></details>` : ""}${result.conflicts.length ? `<details><summary>Resolve conflicts</summary><pre class="json-output">${escapeHtml(JSON.stringify(result.conflicts, null, 2))}</pre></details>` : ""}`;
      showToast("Website scan ready for review."); return;
    }
    if (action === "approve-knowledge") { await api("/api/knowledge/approve", { method: "POST", body: "{}" }); await refresh(); renderKnowledge(); showToast("Website knowledge snapshot approved."); return; }
    if (action === "save-knowledge") { const records = JSON.parse(document.querySelector("#knowledge-json").value); await api("/api/knowledge/save", { method: "POST", body: JSON.stringify({ records }) }); await refresh(); renderKnowledge(); showToast("Supplemental knowledge saved."); return; }
    if (action === "save-voice") { const voice = JSON.parse(document.querySelector("#voice-json").value); await api("/api/voice/save", { method: "POST", body: JSON.stringify({ voice }) }); await refresh(); renderVoice(); showToast("Brand voice rules saved."); return; }
    if (action === "save-settings") { await api("/api/settings/save", { method: "POST", body: JSON.stringify({ settings: { paidCreditsDisabledAcknowledged: document.querySelector("#credits-confirmed").checked, publicSiteUrl: document.querySelector('[name="public-site-url"]').value.trim() } }) }); await refresh(); renderSettings(); showToast("Local settings saved."); return; }
    if (action === "studio-brief") {
      const prompt = document.querySelector("#studio-prompt").value.trim();
      if (!prompt) throw new Error("Describe the article you want to create.");
      const inputs = { audience: document.querySelector('[name="studio-audience"]').value, searchIntent: document.querySelector('[name="studio-intent"]').value, category: document.querySelector('[name="studio-category"]').value, geography: document.querySelector('[name="studio-geography"]').value };
      await runStudioAction(action, async () => { const job = await api("/api/studio/brief", { method: "POST", body: JSON.stringify({ prompt, inputs }) }); activeJobId = job.id; await refresh(); renderStudio(); }); showToast("Grounded brief is ready for review."); return;
    }
    if (action === "approve-brief" || action === "approve-outline") { const stage = action === "approve-brief" ? "brief" : "outline"; await runStudioAction(action, async () => { await api("/api/studio/approve", { method: "POST", body: JSON.stringify({ jobId: activeJobId, stage }) }); await refresh(); renderStudio(); }); showToast(`${stage} approved.`); return; }
    if (action === "studio-outline" || action === "studio-draft") { const stage = action === "studio-outline" ? "outline" : "draft"; await runStudioAction(action, async () => { await api(`/api/studio/${stage}`, { method: "POST", body: JSON.stringify({ jobId: activeJobId }) }); await refresh(); renderStudio(); }); showToast(stage === "outline" ? "Outline is ready for approval." : "Review-only draft created."); return; }
  });
});

document.addEventListener("click", (event) => {
  const mediaButton = event.target.closest("[data-use-media]");
  if (!mediaButton) return;
  withAction(async () => {
    const article = selectedArticle();
    const asset = state.media.find((candidate) => candidate.id === mediaButton.dataset.mediaId);
    if (!article || !asset) throw new Error("Select an article and media asset.");
    const next = { ...article };
    if (mediaButton.dataset.useMedia === "hero") { next.heroImage = asset.hero; next.heroAlt = asset.alt; }
    else next.socialImage = asset.social;
    await api("/api/articles/save", { method: "POST", body: JSON.stringify({ article: next }) });
    await refresh(); renderMedia(); showToast(`Assigned ${mediaButton.dataset.useMedia} image.`);
  });
});

async function initialize() {
  try {
    token = (await api("/api/session")).token;
    await refresh();
    selectedSlug = state.drafts[0]?.slug || state.published[0]?.slug || null;
    render();
  } catch (error) {
    workspace.innerHTML = `<section class="panel"><h1>CMS unavailable</h1><p>${escapeHtml(error.message)}</p></section>`;
  }
}

initialize();
