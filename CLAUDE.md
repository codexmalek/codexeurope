# Codex website: context for Claude

Website for **Codex** (SARL Groupe Codex), a software studio founded in 2014, based in Marseille, with offices in Doha (Qatar) and Marseille (France). Domain: codexeurope.com. Languages: French (`/fr`, the reference), English (`/en`) and Arabic (`/ar`, right-to-left, IBM Plex Sans Arabic). See "Languages" in `docs/02-ARCHITECTURE.md`. The goal is a premium, hand-crafted look (not "AI generated"), lots of smooth and varied animation, and strong SEO and GEO so it ranks first in France.

**Start with `../AGENT-HANDOFF.md`** (status, rules, RTL fixes, QA tools, deploy). Then read these (in `docs/`):
1. `01-PROJECT-HISTORY.md`: every request from the owner, what was decided, and their preferences
2. `02-ARCHITECTURE.md`: build system, file map, JS/CSS structure, bugs not to reintroduce, QA routine
3. `03-CONTENT-AND-ASSETS.md`: where texts live; how to add projects, logos, event photos and certificates
4. `04-SEO-GEO-DEPLOY.md`: the SEO/GEO setup to preserve; Vercel deployment (not done yet)
5. `05-OPEN-QUESTIONS.md`: what to ask the owner, and next steps

## Quick facts
- `node build.mjs` builds `dist/`. `node serve.mjs` (or `start.bat`) serves http://localhost:4321. Run `npm install` once.
- Content: `src/content.mjs`. Markup: `build.mjs`. Styles: `src/assets/css/main.css`. Motion: `src/assets/js/main.js` (GSAP + ScrollTrigger + Lenis, self-hosted).
- Dark mode is the default; light mode is `html[data-mode=light]`. Accent colour is `#FEA41E`.
- In `main.js`:
  - Respect `prefers-reduced-motion`.
  - Mouse effects go through `whenMouse()`.
  - One-shot reveals use `onView()`.
- The original assets (logos, event photos, certificates, project images) are in `../source-assets/` if this folder came from the handoff bundle.

## Rules
- Never change service slugs or URLs. Keep the redirects in `vercel.json`, `src/public/_redirects` and `src/public/.htaccess` in sync.
- Never invent facts, client names or quotes. Ask the owner.
- After visual changes:
  1. Build.
  2. Check every page at 1440px and 390px wide: no console errors, no horizontal scroll.
  3. Check dark and light mode.
  4. Show the owner screenshots or a short video.
