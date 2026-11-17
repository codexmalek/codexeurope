# 03 · Content and assets: how to change texts, projects, logos, photos and certificates

All texts are in French. Edit the files below, then run `node build.mjs`.

## `src/content.mjs` exports
| Export | Used for |
|---|---|
| `site` | Name, legal name, `founded`, email, 3 Marseille phones (+33 6 05 82 50 51 / 38 / 39, shown under the Marseille office), WhatsApp, HQ address with lat/lng, `offices` (Marseille HQ, Doha +974 5066 5151, Marseille Rue de la République 13002 +33 6 05 82 50 51; France always first), `socials` (Facebook https://www.facebook.com/CodexEurope, Instagram https://www.instagram.com/codex_europe/), `events`. Feeds the schema, footer, contact page and llms.txt. |
| `stats` | Numbers shown with odometers. |
| `heroWords`, `marquee` | Rotating hero words and the marquee lines. |
| `services` | The 8 services: slug, name, short text, details. Each gets a page at `/fr/services/<slug>`. Slugs: `logiciel-sur-mesure-france`, `creation-site-web-marseille`, `developpement-application-mobile-france`, `cloud-devops-france`, `data-analytics-france`, `cybersecurite-france`, `marketing-digital-seo-france`, `design-ui-ux-france`. **Do not change slugs**: they are the SEO URLs. |
| `serviceExtras` | Per-service "fit" lists, the guide, FAQs. |
| `projects` | The 7 real projects. |
| `clients` | 22 `[id, name]` pairs for the logo band. `id` = file name in `img/clients`. |
| `testimonials` | 12 entries, described below. |
| `eventInfo` | Text per event: dates and facts read from the stand banners. |
| `process`, `reasons`, `sectors`, `techs`, `work`, `homeFaq` | Section content. `homeFaq` also feeds the FAQPage schema and llms.txt. |

### Projects (`projects`)
These are **recent projects only**, a selection, not the full portfolio (450+ projects since 2014). The site says so everywhere. Each project has its own page at `/fr/realisations/<slug>`, and `/fr/realisations` also lists the 12 attested projects from `testimonials` under "Et bien d’autres".

Each entry has `slug`, `name`, `type`, `tags`, `service` (it appears on that service page), `text`, `tint` (card colour, also the background of the mockup band on the project page), `features` (the "Ce que nous avons livré" list; it only restates `text`, so add real details from the owner rather than inventing), and optional `links: { web, ios, android }`: real URLs of the live project, shown as "Visiter le site" / "App Store" / "Google Play" buttons on the project page and the projects list. Only ONDEFOC has one so far (https://ondefoc.dz).

**Images are never cropped.** `optimize-assets.mjs` only resizes (no trim), `pic()` writes each image's real width/height, and the CSS shows project images at their own ratio (no `object-fit: cover`, no zoom inside the frame). Keep it that way when adding projects.

**Fast image display.** The build inlines a ~20px blurred WebP preview as the background of every project cover, event photo and certificate (cached in `src/placeholders.json`, regenerated automatically for new or changed images; needs `sharp`). Project pages preload their cover. The images are `src/assets/img/work/<slug>-cover-800/1600.webp` and `<slug>-mock-600/1100.webp`. Current projects:

| Slug | Name | Service |
|---|---|---|
| `erp-bz-telecom` | ERP BZ Telecom | software |
| `skoda-imdes` | Skoda IMDES | mobile |
| `ondefoc` | ONDEFOC | website |
| `valuetherm` | Valuetherm Distribution | mobile |
| `az-fulfillment` | AZ fulfillment | software |
| `rihla-travel` | Rihla Travel | mobile |
| `levva-gym` | LEVVA GYM | mobile |

To add a project:
1. Put the cover and mockup PNGs in a folder.
2. Add them to the `map` in `scripts/optimize-assets.mjs`.
3. Run `node scripts/optimize-assets.mjs <folder>`.
4. Add the entry to `projects`.

### Testimonials (`testimonials`)
Each entry looks like this:
```js
{ cert, tag, hl, client, person, role, project, date, quote, lang? }
```
- `cert`: the certificate image `img/certificates/<cert>-480/1400.webp` and the anchor `#cert-<cert>`. It is also the logo id when that client is in `clients`. Otherwise, add an alias in `logoAlias` in build.mjs; for example, `hak-el-bac` uses the `prof-billal` logo.
- `tag`: the short chip text. Written by Claude and editable.
- `hl`: a phrase that **must appear exactly** in `quote`. It gets the animated orange highlight.
- `quote`:
  - French and English quotes are copied word for word from the signed certificates.
  - `lang: 'ar'` marks quotes translated from Arabic; the page shows "Traduit de l'arabe".
- The 12 certificates: chocran, heronys (Doha), bita-equipement, huissiers-de-justice (ar), sijour-shop, farben-malakoot, kmondi-shop (ar), khabar-press (ar, original is a PDF), hak-el-bac, mpi, youth-idea, axxam-business-hub. The last three were signed by the same manager and carry the same text.

## Team (`team` in `src/content.mjs`)
- 23 people from hirodots.com/about-us (the owner said it is the same team). Roles and bios are translated to French.
- `group`: `lead` (Direction), `senior` (Experts), `team`. Only `lead` and `senior` have a `bio` (shown on hover, or under the photo on touch screens).
- Photos: originals in `../source-assets/team/<id>.*` (untouched originals of edited photos in `../source-assets/team-originals/`); run `node scripts/optimize-team.mjs ../source-assets/team` to make `img/team/<id>-400/800.webp`. Layout: rows of 5 expanding cards (like hirodots.com/about-us, as the owner asked). Hovering (with a real mouse: `.has-mouse`, because touchscreen laptops report no hover) or focusing a card widens it; the photo stays visible on the left (`--split`) and a panel shows name, role, bio in quotes (or "<role> au sein de l’équipe Codex." when there is no bio) and a "03 — 25" counter. On phones (≤700px) the cards are a 2-column grid and a tap opens the panel (main.js). Photos fill the card (`object-fit: cover`, anchored 15% from the top; `focus` per member overrides it).
- Outdoor photos: Ouala's background was removed with @imgly/background-removal-node (installed only in a scratch folder, not a site dependency), placed on a studio-grey gradient and framed from the waist up; original in `../source-assets/team-originals/`.
- Photo fixes: `scripts/neutral-background.mjs` turns a coloured wall grey and upscales small photos (used for Mourad: orange wall, 398px original → 1254px); `scripts/grey-white-background.mjs` turns a white backdrop grey without touching a white shirt (was used on an older photo of Zakarya; his current photo is already grey).

## Blog (`src/blog.mjs`)
- `posts`: one entry per article, published at `/fr/blog/<slug>`. The first entry is the featured article on `/fr/blog`.
- Fields: `slug`, `cat` (a key of `blogCats`), `icon` (an illustration from `src/icons.mjs`, used for the generated cover), `service` (linked at the end of the article), `date` (YYYY-MM-DD; `updated` optional), `title`, `metaTitle`, `desc`, `excerpt`, `takeaways` (the "En bref" box), `body`, `faq` (shown at the end and in the FAQPage schema).
- `body` is a list of blocks: `['h2', text]`, `['p', html]`, `['ul', [html…]]`, `['ol', [html…]]`, `['quote', text]`, `['tip', html]`. Each `h2` becomes a table-of-contents entry.
- 8 articles, all written by Claude as practical guides. The 3 "Choisir son agence" guides (24 Oct 2026) target agency searches ("meilleure agence de développement en France", mobile app agency, agence web by city) in an AEO/GEO-friendly format (question headings, direct answers, lists, FAQ). They deliberately name no competitor agencies (no unverified claims) and describe Codex only with facts already on the site.
- The original 5 articles are practical guides written by Claude. They contain no prices, figures, clients or results; keep it that way unless the owner supplies them.

## Asset pipelines (`scripts/`)
The original files are in the handoff bundle under `../source-assets/`. If the project folder is somewhere else, adjust the paths.

| Script | Input | Output |
|---|---|---|
| `optimize-assets.mjs <folder>` | `source-assets/projects/` (the owner's assets.zip; file names mapped inside the script) | `img/work/*` |
| `optimize-events.mjs <folder>` | `source-assets/events/`: one sub-folder per event; the folder name is the event name shown on the site | `img/events/*` + `src/events.json` (640/1280 webp) |
| `optimize-clients.mjs <folder>` | `source-assets/clients/`: one image per logo; file name = logo id | `img/clients/<id>.webp` (colour) + `<id>-m.webp` (silhouette) + `src/clients.json` |
| `optimize-certificates.mjs <folder>` | `source-assets/certificates/`: file name = cert id (PNG/JPG/PDF; PDFs need `pdftoppm` from poppler) | `img/certificates/*` + `src/certificates.json` |
| `make-images.mjs` | the mark | logo PNG, favicon.ico, og.jpg |

How the logo silhouettes are made:
- Alpha is the distance of each pixel from the background colour (the top-left pixel). Any logo on a plain background works.
- Logos whose colour areas overlap go in the `TONAL` list, which bases alpha on darkness instead. `k-diesel` is in it.

To add a client logo:
1. Put `<id>.png` in the clients folder.
2. Add `['<id>', 'Name']` to `clients`.
3. Run the clients script, then build.

The 7 testimonials without a logo show initials. Adding a logo with the same id as the `cert` makes it appear automatically.

## Events
These are the event folders and the names shown on the site. They were identified from the banners in the owner's photos.

| Folder / name on site | Notes |
|---|---|
| Web Summit 2026 | Shown on the Heronys stand; the owner sent extra photos. |
| Fintech & E-commerce Summit 2024 | 5–7 March 2024, ESHRA, Guiddini. |
| Webexpo France 2024 | |
| ACF 2023 | 3rd edition, 15–17 June 2023. |
| Webexpo 2023 | 25–27 May 2023. Separate from Webexpo France 2024. |
| France Export Services Fair | |

On the site, the events list links to `/fr/evenements#<slug>`. The home page deck shows the first 2 photos of each event. Page body text per event is in `eventInfo`.
