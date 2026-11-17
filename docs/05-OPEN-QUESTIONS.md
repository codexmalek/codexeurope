# 05 · Open questions and next steps

## Waiting on the owner (ask; don't guess)
1. **Missing client logos.** These testimonials show initials: Chocran, Heronys, Farben Malakoot (Pharmazone), Kmondi Shop, MPI, Youth Idea, Axxam Business Hub. A cleaner **K-Diesel** logo is also wanted.
2. **Webexpo 2023.** The 25–27 May 2023 stand is Webexpo 2023, kept separate from Webexpo France 2024.
3. **Logo identities:**
   - The "L" logo is labelled LEVVA.
   - The seal is labelled "Chambre nationale des huissiers de justice".
   - Confirm both are correct.
4. **Arabic translations.** The owner should review the French translations of the 3 Arabic certificates: huissiers-de-justice, kmondi-shop, khabar-press.
5. **Certificate numbers.** Is it OK to publish the RC/NIF numbers visible on the certificate scans? If not, blur them in the source images and rerun the certificates script.
6. **Social links.** The LinkedIn URL is missing. Instagram is https://www.instagram.com/codex_europe/.
7. **Address.** Headquarters is "Rue de la République, 13002". Draria also appeared in some sources; confirm which is correct.
8. **Payment and tech claims.** CIB/Edahabia payments and the tech stacks are mentioned on service pages; confirm them.
9. **Tags and highlights.** The testimonial tags and highlighted phrases were chosen by Claude; the owner may reword them.
10. **Live project links.** Done (23 Oct 2026). Skoda IMDES is confidential (badge, no link). The BZ Telecom links are the Meryouma app (`linksApp`). Missing: an App Store link for LEVVA and Rihla, if they exist.
10a. **Event links** (`eventLinks` in content.mjs, shown on `/fr/evenements`). Verified: Web Summit 2026 = Web Summit Qatar (qatar.websummit.com; confirmed from the stand photos), Fintech & E-commerce Summit 2024 (Radio Algérienne article; no official site found). Missing: Webexpo France 2024, ACF 2023, Webexpo 2023, and which edition of the France Export Services Fair (Constantine Jan 2026, Oran or Tindouf?). The pinned photo deck was removed from the events section at the owner’s request.
10b. **Team photos.** The team is on `/fr/agence#equipe`. Fahad Al Hamdan was removed at the owner’s request; Zakarya Djaalab (Gérant), Mourad Hamdaoui (BDM) and Selma Chergue (Chargée commerciale) were added, all with photos. Mourad’s original is small (398×602, upscaled to 1254px); a larger one would be sharper.
11. **Project details.** Each project page only says what its short description says. For richer pages, ask for: client name, year, the problem, platforms, extra screenshots, and results the client agrees to publish.
12. **Old blog URLs.** The old site may have had blog posts. Get their URLs (Search Console → Pages) and 301 them to `/fr/blog/...` in the three redirect files.
13. **Blog articles.** The 5 articles were written by Claude; the owner should review them, and can change the dates (all set to 23 October 2026).

## Next steps
- [x] Deployed to Vercel (Codex account): https://codex-site-ten.vercel.app (24 Oct 2026).
- [ ] Connect the domain when the owner is ready (DNS at their registrar).
- [ ] Optional: a GitHub repo plus Vercel Git integration, for automatic deploys.
- [ ] Contact form backend on Vercel (Formspree/Resend/serverless), if the owner wants stored submissions.
- [ ] Search Console, Bing and Google Business Profile setup (see 04).
- [x] English (`/en`) and Arabic (`/ar`, RTL) versions, live since 25 Oct 2026. A native reader should review the translations.
- [ ] Future: detailed case studies.

## Owner's working style
- They want to *see* results: send screenshots or a short screen recording after visual changes. `node scripts/shoot.mjs` and Playwright `recordVideo` were used for this.
- They react to "basic" design by asking for more motion. Keep raising the craft level, with varied and smooth animations, never generic ones.
- They upload assets as zips. Extract each zip into its own folder, then run the matching script in `scripts/`.
