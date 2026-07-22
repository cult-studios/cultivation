#!/usr/bin/env node
// generates one real, crawlable HTML page per dev journal entry from entries.js.
// run after editing entries.js (by hand or via journal-editor.html):
//   node scripts/build-journal.mjs
//
// why: journal.html renders everything client-side from entries.js, so search
// crawlers only ever see empty template placeholders. these static pages are
// the actual indexable content — journal.html still owns the pretty modal UX
// for real visitors, and links to these as its <a href> targets.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS = join(__dirname, "..");
const SITE = "https://www.cultivation.site";
const OG_IMAGE = `${SITE}/assets/cultivation/site/farm.jpg`; // TODO: swap for real key art

function loadEntries() {
  const src = readFileSync(join(DOCS, "entries.js"), "utf8");
  const match = src.match(/window\.JOURNAL_ENTRIES\s*=\s*(\[[\s\S]*?\]);/);
  if (!match) throw new Error("couldn't find window.JOURNAL_ENTRIES in entries.js");
  return JSON.parse(match[1]);
}

// keep in sync with the slugify() in journal.html
function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(s) {
  s = esc(s);
  s = s.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return s;
}

function block(b, isFirst) {
  switch (b.type) {
    case "h": return `<h3 class="bh">${inline(b.text)}</h3>`;
    case "quote": return `<blockquote class="bq">${inline(b.text)}</blockquote>`;
    case "list": return `<ul class="bl">${(b.items || []).map((it) => `<li>${inline(it)}</li>`).join("")}</ul>`;
    case "img": return `<figure class="bf"><img src="../${b.src}" alt="${esc(b.caption || "")}">${b.caption ? `<figcaption>${inline(b.caption)}</figcaption>` : ""}</figure>`;
    case "p":
    default: return `<p class="body${isFirst ? " drop" : ""}">${inline(b.text)}</p>`;
  }
}

function plainSummary(entry) {
  const firstP = entry.body.find((b) => b.type === "p") || { text: entry.sub };
  const plain = firstP.text
    .replace(/\*\*|\*/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  return plain.length > 200 ? plain.slice(0, 197).trim() + "…" : plain;
}

function pageHtml(entry, slug) {
  const url = `${SITE}/journal/${slug}.html`;
  const description = esc(plainSummary(entry));
  const title = esc(entry.title);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} — cultivation dev journal</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${url}">

<meta property="og:type" content="article">
<meta property="og:site_name" content="cultivation">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${OG_IMAGE}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${OG_IMAGE}">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": ${JSON.stringify(entry.title)},
  "datePublished": ${JSON.stringify(entry.date)},
  "author": { "@type": "Organization", "name": "Cult Studios" },
  "publisher": { "@type": "Organization", "name": "Cult Studios" },
  "mainEntityOfPage": ${JSON.stringify(url)}
}
</script>

<link rel="icon" type="image/png" href="../assets/brand/cult-favicon-simple.png">
<link rel="stylesheet" href="../styles.css">
<style>
  html, body { margin: 0; }
  body {
    background: var(--vale-night); color: var(--vale-body); font-family: var(--font-sans-cv);
    min-height: 100vh; padding: 40px 22px 64px; box-sizing: border-box;
  }
  .wrap { max-width: 720px; margin: 0 auto; }
  .back {
    display: inline-flex; align-items: center; gap: 7px; text-decoration: none;
    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--vale-lumen); margin-bottom: 22px; opacity: 0.85;
  }
  .back:hover { opacity: 1; }
  .entry {
    color: var(--parch-ink, #4a3a26);
    background: linear-gradient(160deg, rgba(239,227,196,0.55), rgba(220,198,148,0.5) 60%, rgba(206,184,134,0.6));
    border: 3px solid #4a5b34; border-radius: 16px; padding: 36px 40px 40px;
    box-shadow: inset 0 0 0 2px rgba(156,123,70,0.4), inset 0 0 46px rgba(120,92,52,0.3), 0 18px 34px rgba(0,0,0,0.5);
  }
  .m-no { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.1em; text-transform: uppercase; color: #6b573c; }
  .m-dt { font-family: var(--font-mono); font-size: 10.5px; color: #6b573c; opacity: 0.8; margin-top: 2px; }
  .entry h1 { font-family: var(--font-display); font-weight: 600; font-size: 30px; color: #4a3a26; margin: 10px 0 4px; }
  .entry .sub { font-family: var(--font-hand); font-size: 20px; color: #33401f; margin: 0 0 16px; }
  .rule { height: 0; border: none; border-top: 2px solid rgba(74,58,38,0.35); margin: 14px 0 18px; }
  .body { font-family: var(--font-sans-cv); font-size: 15.5px; line-height: 1.72; color: #4a3a26; margin: 0 0 14px; }
  .body strong { color: #3a2c1a; }
  .drop::first-letter { font-family: var(--font-display); font-weight: 600; font-size: 52px; float: left; line-height: 0.8; padding: 4px 10px 2px 0; color: #33401f; }
  .bq { margin: 18px 0; padding: 6px 0 6px 18px; border-left: 3px solid #4a5b34; font-family: var(--font-display); font-style: italic; font-size: 19px; line-height: 1.5; color: #33401f; }
  .bl { margin: 0 0 14px; padding-left: 4px; list-style: none; }
  .bl li { font-family: var(--font-sans-cv); font-size: 15.5px; line-height: 1.6; color: #4a3a26; padding-left: 22px; position: relative; margin-bottom: 7px; }
  .bl li::before { content: ""; position: absolute; left: 4px; top: 9px; width: 6px; height: 6px; border-radius: 50%; background: #4a5b34; }
  .bf { margin: 18px 0; }
  .bf img { width: 100%; border-radius: 8px; border: 2px solid rgba(74,58,38,0.3); }
  .bf figcaption { font-family: var(--font-hand); font-size: 16px; color: #33401f; text-align: center; margin-top: 7px; }
  .stamps { display: flex; gap: 9px; flex-wrap: wrap; margin-top: 20px; }
  .stamp { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.06em; text-transform: uppercase; color: #6b573c; padding: 4px 11px; border-radius: 3px; border: 1.5px solid rgba(74,58,38,0.4); background: rgba(120,92,52,0.1); }
  .entry a { color: #8b4fc4; }
</style>
</head>
<body data-theme="vale-night">
  <div class="wrap">
    <a class="back" href="../journal.html"><span class="arr">&larr;</span> back to the journal</a>
    <article class="entry">
      <div class="m-no">Entry No. ${esc(entry.no)}</div>
      <div class="m-dt">${esc(entry.date)}</div>
      <h1>${title}</h1>
      <p class="sub">${esc(entry.sub)}</p>
      <hr class="rule">
      ${entry.body.map((b, idx) => block(b, idx === 0)).join("\n      ")}
      <div class="stamps">${entry.tags.map((t) => `<span class="stamp">${esc(t)}</span>`).join("")}</div>
    </article>
  </div>
</body>
</html>
`;
}

const entries = loadEntries();
const journalDir = join(DOCS, "journal");
if (!existsSync(journalDir)) mkdirSync(journalDir, { recursive: true });

for (const entry of entries) {
  const slug = `${entry.no}-${slugify(entry.title)}`;
  writeFileSync(join(journalDir, `${slug}.html`), pageHtml(entry, slug));
  console.log(`wrote journal/${slug}.html`);
}

console.log(`done: ${entries.length} entr${entries.length === 1 ? "y" : "ies"}. remember to add new URLs to sitemap.xml.`);
