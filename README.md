# Cultivation marketing site

Static single-page site.  JSX is already compiled to plain JS in `app.js`.

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
