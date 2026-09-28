# Orcas Media Lab

Static site for [orcasmedialab.com](https://orcasmedialab.com), the parent company behind
[RainierRack](https://rainierrack.com/), [Bussy Botanicals](https://bussybotanicals.com/) and the OML photography studio.
Hosted on GitHub Pages (see `CNAME`). No build step.

The design language is adapted from the Modulify "Oriel" template: warm cream and ink surfaces,
Instrument Serif headlines with ember/copper italics, Instrument Sans body copy and IBM Plex Mono eyebrows.

## Structure
- `index.html`: the whole site, one page with anchored sections
  (`#ventures`, `#rainierrack`, `#bussy-botanicals`, `#studio`, `#lab`, `#about`, `#contact`)
- `products.html`, `media.html`, `projects.html`: redirects from the old pages to the matching section
- `assets/css/site.css`: design tokens live in `:root` at the top
- `assets/js/boot.js`: loaded in `<head>`; turns on motion only when JS runs and "reduce motion" is off
- `assets/js/site.js`: header state, mobile menu, scroll reveals, the ventures scroller, RainierRack feature tabs, photo lightbox
- `assets/img/`: web-sized images used by the page
- `media/`: original, full-size source files (not referenced by the page)

## Editing content
- **Ventures scroller:** each `<article class="chapter">` has a matching `<figure class="stage-slide">` (same order).
  Add or remove them in pairs, and keep the number of `.stage-dots` spans in sync.
- **RainierRack features:** each tab button carries its copy in `data-title` / `data-body`.
- **Bussy Botanicals:** the Amazon link (ASIN `B0HJV56RDN`) appears in the ventures scroller and the bento CTA.

## Preview locally
```bash
python3 -m http.server 8010
```
Then open http://localhost:8010.

## Security
A Content-Security-Policy `<meta>` tag allows only same-origin scripts/images plus Google Fonts.
Avoid inline `<script>` and `style=""` attributes, or update the policy.
