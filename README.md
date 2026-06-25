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

## Editing later
1. Edit `site.jsx` (the readable source).
2. Recompile it to `app.js` with Babel's React preset (any "JSX → JS" transpile).
3. If you use Option B, re-inline `index.html` into the single file.

## Structure
    index.html             entry point (Option A)
    app.js                 compiled page code (no Babel needed)
    site.jsx               readable source for app.js
    styles.css             design-system entry (imports tokens/)
    tokens/                color, font, type, spacing variables
    assets/                doodles, social icons, suspicion-meter image
    Cultivation-offline.html   self-contained single file (Option B)
