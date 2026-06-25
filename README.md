# Cultivation — marketing site

Static single-page site. **No build step, no Babel** — the JSX is already compiled to plain JS in `app.js`.

You have two ways to use this:

## Option A — host the folder (recommended for GitHub Pages / Netlify / Vercel)
Push this whole folder to a repo and serve it. `index.html` is the entry point.
- Loads React from a CDN and fonts from Google Fonts (needs internet).
- All other assets (CSS, doodles, icons, suspicion-meter image) are local.

Local preview:

    python3 -m http.server 8000   # then open http://localhost:8000

## Option B — the fully-offline single file
`Cultivation-offline.html` has **everything inlined** — React, CSS, fonts, and every image.
- No CDN, no internet, no server required.
- Open it by double-clicking, email it, or drop it on any host as-is.
- Note: this single file is the **landing page only**. The Journal (a separate page) needs the folder — use Option A if you want the journal live.

## The Dev Journal
`journal.html` is a table-of-contents page; clicking an entry opens it over a dimmed backdrop.
- **To publish a post:** edit `entries.js` (newest first). Each post is one object; block types are `p`, `h`, `quote`, `list`, `img`, and inline you can use `**bold**`, `*italic*`, `[text](url)`.
- Post images go in `assets/cultivation/journal/` and are referenced as `assets/cultivation/journal/your-image.png`.
- The `journal-editor.html` authoring tool is **intentionally not included** in this deploy folder — keep it private (see the project, not the public site).

## Editing later
1. Edit `site.jsx` (the readable source).
2. Recompile it to `app.js` with Babel's React preset (any "JSX → JS" transpile).
3. If you use Option B, re-inline `index.html` into the single file.

## Structure
    index.html             entry point (Option A)
    app.js                 compiled landing page (no Babel needed)
    site.jsx               readable source for app.js
    journal.html           the dev journal (contents + entry popups)
    entries.js             journal posts — edit THIS to publish
    styles.css             design-system entry (imports tokens/)
    tokens/                color, font, type, spacing variables
    assets/                doodles, icons, parchment + suspicion images
    Cultivation-offline.html   self-contained landing page (Option B)
