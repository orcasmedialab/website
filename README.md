# Orcas Media Lab

Static site for [orcasmedialab.com](https://orcasmedialab.com), the parent company behind
[RainierRack](https://rainierrack.com/), [Bussy Botanicals](https://bussybotanicals.com/) and the OML photography studio.
Hosted on GitHub Pages (see `CNAME`). No build step.

The design language is adapted from the Modulify "Oriel" template: warm cream and ink surfaces,
Instrument Serif headlines with ember/copper italics, Instrument Sans body copy and IBM Plex Mono eyebrows.

## Structure
- `index.html`: **Home**. Hero, about us (how we work) with links to Brands and Projects, contact
- `brands.html`: **Brands**. One expandable row per brand (RainierRack, Bussy Botanicals), each with the same panel layout
- `projects.html`: **Projects & Research**. Expandable rows for eclipse photography (with a lightbox) and a short
  "workbench" list of hobby code from github.com/orcasmedialab
- `products.html`, `media.html`: redirects from the old pages (to `brands.html` and `projects.html#photography`)
- `assets/css/site.css`: shared styles; design tokens live in `:root` at the top
- `assets/js/boot.js`: loaded in `<head>`; turns on motion only when JS runs and "reduce motion" is off
- `assets/js/site.js`: header state, mobile menu, scroll reveals, home hero entrance, opening the row a link
  points to, photo lightbox
- `assets/img/`: web-sized images used by the pages
- `media/`: original, full-size source files (not referenced by the pages)

The header and footer are repeated in each page (there is no build step), so change all three when editing them.

## Editing content
- **Expandable rows** are native `<details>` elements. Rows sharing a `name` close each other when one opens.
  A link to a row's `id` (for example `projects.html#workbench`) opens it.
- **Adding a brand:** copy a `<details class="acc-item">` block in `brands.html`; the panel layout is shared.
- **Bussy Botanicals:** the Amazon link (ASIN `B0HJV56RDN`) is in its panel in `brands.html`.
- **Workbench:** add or remove `<li>` rows in the `.bench` list in `projects.html`.

## Preview locally
```bash
python3 -m http.server 8010
```
Then open http://localhost:8010.

## TODO
- Replace the `products.html` → `brands.html` and `media.html` → `projects.html#photography` meta-refresh
  redirects with proper HTTP redirects (301/308 as appropriate) if/when the hosting setup allows it, for a
  cleaner long-term SEO migration. GitHub Pages can't send server-side redirects, so this likely means moving
  to a host or CDN that can (for example Cloudflare, Netlify, or Vercel).

## Security
A Content-Security-Policy `<meta>` tag allows only same-origin scripts/images plus Google Fonts.
Avoid inline `<script>` and `style=""` attributes, or update the policy.
