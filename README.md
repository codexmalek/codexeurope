# Codex — codexeurope.com

Static, framework-free site. Fast (Lighthouse 92–98 performance, 100 SEO), self-hosted fonts and libraries.

## Commands
```
npm install
npm run build      # → dist/
npm run dev        # preview at http://localhost:4321/fr
node scripts/make-images.mjs   # regenerate logo PNG, favicon, og.jpg
node scripts/optimize-assets.mjs <folder>   # turn the raw project PNGs into web-ready WebP
```

## Where things live
- `src/content.mjs` — all copy, figures, contacts, services, FAQ. Edit here, rebuild.
- `build.mjs` — page templates + SEO (meta, JSON-LD, sitemap, llms.txt).
- `src/assets/css/main.css`, `src/assets/js/main.js` — design system and motion (GSAP + Lenis).
- `src/public/` — robots.txt, redirects (`_redirects` for Netlify/Cloudflare, `.htaccess` for cPanel), favicons.

## Adding event photos (salons)
1. Put the photos in one folder. Start each file name with the event:
   `web-expo-1.jpg`, `web-summit-2.jpg`, `france-export-fair-1.jpg`, `afes-3.jpg` (any other name goes under "Événements").
2. `node scripts/optimize-events.mjs <folder>` (creates WebP files + `src/events.json`), then `npm run build`.
The events section on the home and agency pages then shows the hover photo trail, the pinned photo deck
and the photo filmstrip automatically, and the photos are added to the image sitemap.

## Adding a project
1. Put the cover (landscape) and the cut-out device mockup (transparent PNG) in a folder.
2. Add both file names to the `map` in `scripts/optimize-assets.mjs`, run it.
3. Add an entry to `projects` in `src/content.mjs` (name, type, category, description, card colour), then `npm run build`.

## Features
Light / dark mode (toggle in the nav, remembered per visitor), page transitions, smooth scroll, interactive hero dot field,
rotating headline, letter-by-letter reveals, scroll-scrubbed reel and text, pinned project carousel, 3D tilt cards,
portfolio filters + lightbox. Everything respects `prefers-reduced-motion`.

## Deploy
- **Vercel**: double-click `deploy-vercel.bat` (Windows) or run `npx vercel deploy --prod` in this folder.
  Log in when the browser opens, accept the defaults: `vercel.json` already sets the build (`node build.mjs`),
  the output (`dist`), clean URLs, the 301 redirects and cache headers. Add `codexeurope.com` under
  Project → Settings → Domains. Vercel has no built-in form handling, so on Vercel the contact form opens the
  visitor's mail client (wire it to Formspree/Resend later if you want submissions stored).
- **Netlify** (recommended — contact form works out of the box): connect the repo, `netlify.toml` is ready.
- **cPanel / Apache**: upload the contents of `dist/` (including `.htaccess`) to `public_html`.
  The form then falls back to opening the visitor's mail client; wire it to a PHP mailer or Formspree if needed.

## SEO / GEO launch checklist
1. Add real social profiles in `site.socials` (feeds `sameAs` — key for Google and AI assistants).
2. Map every old URL that still gets traffic (Search Console → Pages) in `_redirects` / `.htaccess` with a 301.
3. Submit `https://codexeurope.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
4. Google Business Profile: same name, address and phone as the site (NAP), category "Société de développement de logiciels", collect reviews.
5. Same NAP on Sortlist, LaFabriqueDuNet, Clutch, LinkedIn, local directories.
6. Add real case studies (client, problem, result, screenshots) — the strongest ranking and trust signal.
7. Next: Arabic (`/ar`, RTL) and English (`/en`) versions; keep the existing blog posts under `/fr/blog/...`.
