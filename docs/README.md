# cultivation — marketing site

Static single-page site. **Plain HTML/CSS, no build step, no React, no Babel.**

## Option A — host the folder (GitHub Pages / Netlify / Vercel)
Push this folder and serve it. `index.html` is the entry point. It also works by double-clicking `index.html` locally (no server needed).
- Fonts load from Google Fonts (needs internet for the exact typefaces; falls back gracefully offline).
- All other assets (CSS, concept art, doodles, icons) are local in this folder.

## Option B — the fully-offline single file
`Cultivation-offline.html` has everything inlined (CSS, fonts, images). No internet, no server. Note: the in-page "dev journal" links to `journal.html`, which only works in the folder version (Option A), not the single file.

## Day / night toggle
The header has a day/night switch (cottagecore ⇄ vale-night). The choice is saved per visitor in localStorage.

## Editing
- Page content/layout: edit `index.html` directly.
- Journal posts: edit `entries.js` (or use `journal-editor.html`).

## Structure
    index.html              marketing site (entry point)
    journal.html            dev journal (reads entries.js)
    journal-editor.html     private authoring tool (keep undeployed for real privacy)
    entries.js              journal post content
    styles.css              design-system entry (imports tokens/)
    tokens/                 color, font, type, spacing variables
    assets/                 concept art, doodles, icons, favicon
    Cultivation-offline.html  self-contained single file (Option B)
