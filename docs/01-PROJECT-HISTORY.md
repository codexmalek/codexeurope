# 01 · Project history: what the owner asked for and what was decided

The Codex website was built in a Claude Code cloud session from 20 to 23 October 2026. This file records every request from the owner, in order, with what was delivered. Read it before changing anything, so the owner's preferences are kept.

## The owner and the brief
- **Client:** Codex / SARL Groupe Codex, a software studio founded in 2014. Headquarters in Marseille, with offices in Doha (Qatar) and Europe. Domain: codexeurope.com.
- **Owner's style:** short, informal messages, often in a mix of English and French. When they say "baaad" or "so basic", they want a bolder, more designed and more animated result.
- **Original brief:**
  - Rebuild codexeurope.com in the style of aedrea.com, corexdigital.netlify.app and kadr.works.
  - It must look professional and hand-crafted, "not like AI generated". The owner repeated this several times.
  - Smooth, modern and full of animation.
  - Strong SEO and GEO so Codex ranks first in France. Competitors rank higher, but Codex has more credibility.
  - Keep the structure and URLs of the old site for SEO.
- **Network limits:** the cloud container could not reach codexeurope.com, the three reference sites, Facebook/Instagram or Vercel. Content came from search-engine snippets of the old site, plus files the owner uploaded.

## Requests, in order
1. **First build.** A custom static generator with a dark design, GSAP animation, full SEO/GEO setup, 8 service pages, and the contact, agency and project pages.
2. **"Run it locally."** The owner could not reach the container's localhost. Added `serve.mjs` and `start.bat` (Windows double-click) and sent screen-recorded videos instead.
3. **"So basic, add lots of animation, light mode, detailed content, use my assets."**
   - Added the light/dark mode switch.
   - Added the 7 real projects from `assets.zip` (see `03-CONTENT-AND-ASSETS.md`).
   - Added much more motion and longer texts.
4. **"More and more animations in every section, item and typography."**
   - Added the v3/v4 motion layers: odometers, letter splits, scramble, velocity skew, pinned horizontal projects, 3D tilt and more.
   - The owner later asked for *different* animation styles, not the same reveal everywhere. Each kind of element now has its own entrance.
5. **Event photos.** Codex exhibited at trade shows; the owner sent Facebook/Instagram links, which were blocked, so they uploaded zips instead.
   - The events section has a pinned photo "deck" and a hover image trail.
   - A new gallery page, `/fr/evenements`, has filters and a full-screen viewer.
6. **"The pictures don't appear and the mouse isn't animated."**
   - The pictures had been test placeholders and were removed.
   - The owner's laptop is a touchscreen laptop, and Windows reduced-motion was on. Mouse effects now start on the first real mouse movement (`whenMouse()`).
7. **"The events CTA doesn't work."** Pinned sections were refreshing in the wrong order, so one pin covered the event list and blocked clicks. Fixed with `refreshPriority`.
8. **Project cards.** Use the full project cover images instead of cut-out mockups.
9. **Locations and new page.**
   - Added the Doha office: Building No. 157, Street No. 301, Zone 69, PO Box 8388, Doha, Qatar.
   - Three regions are listed, always with France first: Marseille (headquarters), Doha, Europe.
   - Added the page "Attestations de bonne exécution" (certificates of good completion).
   - Added fixed controls modelled on the owner's screenshot of the hirodots.com footer. Only the *layout* was copied, never that company's contact details:
     - a WhatsApp button
     - a "Parlons de votre projet" CTA
     - social icons on a side rail
     - a modern light/dark switch on the other rail
10. **Logos, photos and certificates.**
    - Replaced the ERP reel with two rows of client logos moving in opposite directions.
    - Removed the event photo filmstrip; the deck shows 2 photos per event.
    - Added the extra Web Summit photos.
    - Turned the certificates into named testimonials and added them to the attestations page.
11. **Deploy to Vercel.** The container was blocked from Vercel. The owner connected the Vercel MCP connector, but uploading 12 MB of assets through it was not practical.
    - Prepared `vercel.json`, `.vercelignore` and `deploy-vercel.bat`.
    - Vercel has no form backend, so the contact form falls back to the visitor's mail client on Vercel.
    - **Still not deployed.**
12. **"The style of our clients is so bad", plus a screenshot of a testimonial card.** The owner wanted a pro, modern section built from the certificate content, and said explicitly "not to do like it" (don't copy the screenshot). Current design:
    - **Clients:** a monochrome logo band with a spotlight that paints the logos in the accent colour, viewfinder corners and a name label on hover, rows that slow down under the cursor, and a "300+" odometer.
    - **Testimonials:** a "proof on paper" stage.
      - A stack of the real certificate scans and a rotating "Attestation · Vérifiée" stamp.
      - A tag chip and the signing date.
      - The quote, with its key phrase highlighted.
      - An avatar (client logo or initials), and thumbnails with progress rings.
13. **Move to desktop.** The owner wants to keep working in a desktop Claude session. That is why this documentation exists.
14. **Project pages and blog** (23 October 2026, desktop session). The owner said the projects shown are *recent* projects, not all of them, and asked for project pages and a "modern and pro" blog.
    - Everything that listed projects now says "Projets récents"; `/fr/realisations` adds the 12 attested projects as further references.
    - One page per project at `/fr/realisations/<slug>`: big title, cover with parallax, features list, mockup on the project's colour with an outlined name scrolling behind, the related service, previous/next project.
    - Blog at `/fr/blog` (featured article, theme filters, generated covers) and 5 articles at `/fr/blog/<slug>`: sticky table of contents with reading progress, "En bref" box, pull quotes, tips, FAQ, share buttons, related articles. "Blog" was added to the nav and footer.

15. **Team, contacts, leaders** (23–24 October 2026). Team from hirodots.com (same team) on the agency page, as expanding cards like that site; Doha (+974 5066 5151) and Marseille (Rue de la République, 13002, +33 6 05 82 50 51) offices; the "La confiance des leaders" image revealed with the old reel animation; logos added for Renault Escale Auto, Al Gharafa Bakery, Youth Idea, Axxam Business Hub and MPI.

16. **Live, then polish** (24 October 2026). Deployed to Vercel (Codex account). Then: the "La confiance des leaders" image was removed again; image loader (shimmer + spinner) on every photo; "France Export Services Fair 2026"; footer reorganised to fit one laptop screen; big titles made smaller so they never wrap (the footer title's hover weight wave made it wrap); team panel without the Codex mark; 3 agency-guide blog articles for SEO/GEO/AEO.

17. **Three languages** (24–25 October 2026). English and Arabic versions of every page, IBM Plex Sans Arabic, right-to-left layout; the light-mode accent button hover fixed (dark text on a dark fill). Product count changed to "more than 20 products".

18. **Arabic review** (25 October 2026). The owner sent a screen recording: English words and numbers were reversed on Arabic pages. A full page-by-page review fixed reversed phones, years, "450+" and fractions, unmirrored arrows, scrambled marquees, the projects scroller sliding into empty space, odometer glitches and cut-off team names (details in AGENT-HANDOFF.md §6).

## Lasting preferences
- More motion, with *varied* styles, always smooth. Never make the site plainer.
- Professional and premium, never template-like or "AI-looking".
- Keep URLs, structure and SEO intact whenever something is redesigned.
- The owner likes recorded videos and screenshots to see the result.
- Never crop the owner's images (project covers, mockups, the leaders image). Team photos may fill their frames, but heads must never be cut.
- Ask the owner when a fact is unknown. Never invent client names, numbers or quotes. Testimonial quotes are taken verbatim from the signed certificates; the Arabic ones are translated and labelled as such.
