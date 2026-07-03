# cultivation marketing site

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
