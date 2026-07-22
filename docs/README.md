# cultivation marketing site

## Editing
- Page content/layout: edit `index.html` directly.
- Journal posts: edit `entries.js` (or use `journal-editor.html`), then run
  `node scripts/build-journal.mjs` to regenerate the static pages in `journal/`
  (journal.html renders client-side, so those static pages are what search
  crawlers actually see — add any new one to `sitemap.xml` too).

## Structure
    index.html              marketing site (entry point)
    journal.html            dev journal (reads entries.js)
    journal-editor.html     private authoring tool (keep undeployed for real privacy)
    entries.js              journal post content
    journal/                generated static pages, one per entry (crawlable — see scripts/build-journal.mjs)
    scripts/build-journal.mjs  regenerates journal/ from entries.js
    styles.css              design-system entry (imports tokens/)
    tokens/                 color, font, type, spacing variables
    assets/                 concept art, doodles, icons, favicon
    robots.txt / sitemap.xml   SEO basics — bump sitemap lastmod/add <url> entries as pages are added
    Cultivation-offline.html  self-contained single file (Option B)
