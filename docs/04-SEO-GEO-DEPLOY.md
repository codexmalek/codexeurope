# 04 · SEO, GEO and deployment

## What is already in place (keep it when editing)
- **URLs:**
  - Clean French URLs under `/fr`. The service slugs carry keywords plus a city or country (`creation-site-web-marseille`, `…-france`).
  - The old site's URLs redirect with 301:
    - `/index.php` → `/fr`
    - `/contact_us.php` → `/fr/contact`
    - `/en/services/:slug` → `/fr/services/:slug`
    - `/en/*` → `/fr`
  - The redirects are defined in three files, which must stay in sync: `src/public/_redirects` (Netlify), `src/public/.htaccess` (Apache/cPanel) and `vercel.json` (Vercel).
- **Every page has:**
  - a unique `<title>` and meta description
  - a canonical URL
  - `hreflang="fr-DZ"` plus `x-default`
  - geo meta (`geo.region` DZ-16, `geo.placename` Marseille, `geo.position`)
  - Open Graph and Twitter tags, and `og.jpg`
- **JSON-LD:**
  - The Organization/ProfessionalService record includes:
    - the founding date and legal name
    - two locations: the Marseille headquarters (with coordinates) and the Doha office
    - areaServed: France, Qatar, Europe
    - sameAs: Facebook and Instagram
    - the services catalogue
  - Per page: WebSite, WebPage, BreadcrumbList, FAQPage, Service, CollectionPage, ImageGallery, and an ItemList of DigitalDocument for the certificates.
- **Sitemap and robots:**
  - `sitemap.xml` includes image entries for project covers, event photos and certificates.
  - `robots.txt` explicitly allows the AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended).
- **GEO:**
  - `llms.txt` is generated from content.mjs. It holds key facts, services, projects, pages and FAQ in plain French for AI assistants.
  - FAQ blocks give direct answers to questions like "where is Codex located".
- **Accessibility and performance:**
  - Self-hosted fonts and scripts; lazy-loaded WebP in several sizes.
  - Accessible text splitting; `prefers-reduced-motion` is respected.
  - Lighthouse Accessibility, Best Practices and SEO were 100 on the tested pages.

## Launch checklist (owner actions; help them with these)
1. Deploy (see below), then point codexeurope.com to the new host.
2. Submit `https://codexeurope.com/sitemap.xml` to Google Search Console and Bing Webmaster Tools.
3. In Search Console, check the old site's indexed URLs. Add any still getting traffic to the three redirect files.
4. Google Business Profile:
   - Use exactly the same name, address and phone (NAP) as the site.
   - Category: "Société de développement de logiciels".
   - Add photos (the event photos work well) and ask clients for reviews (the certificate signers are good candidates).
5. Use the same NAP on LinkedIn (add its URL to `site.socials` once known), Clutch, Sortlist, La Fabrique du Net and local directories.
6. Later:
   - an Arabic version (`/ar`, right-to-left) and an English version (`/en`), with hreflang between them
   - a blog under `/fr/blog/...`
   - full case studies

## Deployment
**Status: deployed on 24 October 2026** to the Codex Vercel account (`codexitdz-5858`, codexitdz@gmail.com), project `codex-site`: https://codex-site-ten.vercel.app. codexeurope.com is **not** connected yet (DNS unchanged, the owner decides when).
- **Redeploy** (from this folder): `npx vercel deploy --prod --yes --global-config 'C:\Users\lenovo\.vercel-codex'`. The `--global-config` folder holds the Codex login; without it the CLI uses the owner's personal account (`zakydjaa-5523`). In PowerShell use `npx.cmd` (script execution is disabled on this PC).

Previous status: not deployed. The site is fully static: deploy the `dist/` folder, or let the host run `node build.mjs`.

### Vercel (chosen by the owner)
- **Account:** codexitdz-5858 (team id `team_C3pc45YRFByzQsst1XOu7X9G`, Hobby plan). No project created yet.
- **`vercel.json`** sets:
  - `framework: null`, `installCommand: npm install`, `buildCommand: node build.mjs`, `outputDirectory: dist`
  - `cleanUrls: true`, `trailingSlash: false`
  - the 301 redirects
  - security headers, and a 1-year immutable cache on `/assets/*`
- **To deploy from the PC:**
  - Double-click `deploy-vercel.bat`, or run `npx vercel deploy --prod` in the project folder.
  - The first time, log in and accept the prompts: project name `codex-site`; keep the settings from vercel.json.
- **Contact form:**
  - When `process.env.VERCEL` is set at build time, the form gets `data-form-mode="mail"` and opens the visitor's email client.
  - To store submissions on Vercel, add a serverless function or a service such as Formspree/Resend; this needs the owner's account.
- **Domain:**
  - In the Vercel project → Settings → Domains, add `codexeurope.com` and `www.codexeurope.com`.
  - The owner then changes the DNS records at their registrar, as Vercel shows (A record for the apex, CNAME for www).
  - That DNS change switches the live site, so the owner decides when.
- **Better long-term:** put the project on GitHub and import the repo in Vercel, so every push redeploys.

### Alternatives
- **Netlify:** `netlify.toml` is ready, and the contact form works through Netlify Forms. Or drag `dist/` onto app.netlify.com/drop.
- **cPanel/Apache:** upload the contents of `dist/` to `public_html`, including `.htaccess`. The form falls back to the mail client.
