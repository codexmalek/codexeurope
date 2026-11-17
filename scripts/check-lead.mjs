// Checks one or more lead articles in src/leads/: structure, length, links and forbidden content.
// Usage: node scripts/check-lead.mjs <slug> [<slug> ...]   (no slug = every file in src/leads)
import { readdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';

const dir = join(import.meta.dirname, '..', 'src', 'leads');
const slugs = process.argv.slice(2).length ? process.argv.slice(2) : readdirSync(dir).filter((f) => f.endsWith('.mjs')).map((f) => f.slice(0, -4));

const leads = ['application-flexy-france', 'investir-ecommerce', 'comparaison-10-applications-mobiles', 'applications-investir-qatar', 'application-affiliation', 'application-livraison-repas-france', 'application-vtc-france', 'plateforme-elearning', 'marketplace-maroc', 'applications-a-creer-tunisie', 'application-reservation-voyage', 'application-fitness', 'erp-sur-mesure-france', 'marketplace-multi-vendeurs', 'idees-saas-france', 'application-logistique', 'application-immobilier-qatar', '10-sites-web-a-investir', 'application-services-france', 'lancer-application-mobile-france'];
const blog = ['meilleure-agence-developpement-france', 'agence-developpement-application-mobile-france', 'agence-web-marseille-oran-constantine', 'prix-site-web-france', 'logiciel-sur-mesure-ou-solution-du-marche', 'application-mobile-native-ou-multiplateforme', 'referencement-seo-france', 'cahier-des-charges-projet-digital', 'top-agences-developpement-france', 'top-agences-developpement-qatar', 'top-agences-developpement-france', 'top-agences-developpement-tunisie', 'top-agences-developpement-maroc', ...leads];
const services = ['logiciel-sur-mesure-france', 'creation-site-web-marseille', 'developpement-application-mobile-france', 'cloud-devops-france', 'data-analytics-france', 'cybersecurite-france', 'marketing-digital-seo-france', 'design-ui-ux-france'];
const projects = ['erp-bz-telecom', 'skoda-imdes', 'ondefoc', 'valuetherm', 'az-fulfillment', 'rihla-travel', 'levva-gym'];
const hrefs = new Set(['/en/contact', '/en/agence', '/en/realisations', '/en/attestations-bonne-execution', '/en/evenements', '/en/blog', 'https://wa.me/33605825051',
  ...blog.map((s) => '/en/blog/' + s), ...services.map((s) => '/en/services/' + s), ...projects.map((s) => '/en/realisations/' + s)]);

const FRENCH = /(?:^|[\s'’(])(?:le|les|des|du|une|est|pour|avec|vous|votre|vos|nos|notre|sur|dans|nous|projet|projets|voir|découvrir|demander|envoyer|accueil|réalisations|à propos|équipe|mentions)(?=[\s,.;:!?)’']|$)|[éèêàùçœ]/i;
const ARABIC = /[\u0600-\u06FF]/;
const MONEY = /\b(?:DA|DZD|QAR|MAD|TND|EUR|USD|HT|TTC)\b|[€$£%٪]|\b(?:dinars?|euros?|riyals?|dirhams?|dollars?|centimes?)\b|دينار|دنانير|ريال|درهم|دراهم|يورو|دولار|سنتيم/i;
const BANNED = /hydra|حيدرة|\b(?:yassir|heetch|uber|careem|bolt|indrive|talabat|jumia|glovo|deliveroo|snoonu|airbnb|booking\.com|expedia|ouedkniss|temu|aliexpress|amazon|udemy|coursera|shopify|woocommerce|avito|mubawab|bayut|property finder|fiverr|upwork|stripe|paypal|cmi|tayara)\b/i;
const numbers = (slug) => new Set(['2014', '15', '20', '300', '450', '100', '000', ...(/(^|-)10-/.test(slug) ? ['10'] : [])]);

const plain = (s) => s.replace(/href="[^"]*"/g, '').replace(/<[^>]+>/g, ' ');
const nodes = (s) => s.split(/<[^>]+>/).map((t) => t.trim()).filter(Boolean);
const words = (s) => plain(s).split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
const strings = (t) => [t.title, t.metaTitle, t.desc, t.excerpt, ...t.takeaways, ...t.body.flatMap(([, v]) => (Array.isArray(v) ? v : [v])), ...t.faq.flat()];

let failed = 0;
for (const slug of slugs) {
  const errors = [];
  const err = (m) => errors.push(m);
  let mod;
  try { mod = (await import(pathToFileURL(join(dir, slug + '.mjs')).href)).default; } catch (e) { console.log(`✗ ${slug}\n  cannot load: ${e.message}`); failed++; continue; }
  const shape = {};
  for (const lang of ['fr', 'en', 'ar']) {
    const t = mod?.[lang];
    if (!t) { err(`${lang}: missing`); continue; }
    for (const k of ['title', 'metaTitle', 'desc', 'excerpt']) if (typeof t[k] !== 'string' || !t[k].trim()) err(`${lang}.${k}: missing`);
    if (!Array.isArray(t.takeaways) || t.takeaways.length !== 4) err(`${lang}.takeaways: need exactly 4`);
    if (!Array.isArray(t.faq) || t.faq.length < 5 || t.faq.some((f) => !Array.isArray(f) || f.length !== 2)) err(`${lang}.faq: need 5 or more [question, answer] pairs`);
    if (!Array.isArray(t.body)) { err(`${lang}.body: missing`); continue; }
    if (errors.length) continue;
    if (t.metaTitle.length > 65) err(`${lang}.metaTitle: ${t.metaTitle.length} chars (max 65)`);
    if (t.desc.length < 100 || t.desc.length > 170) err(`${lang}.desc: ${t.desc.length} chars (100 to 170)`);
    for (const [type, v] of t.body) {
      if (!['h2', 'p', 'ul', 'ol'].includes(type)) err(`${lang}: block type "${type}" not allowed (the contact tip is appended automatically)`);
      if (['ul', 'ol'].includes(type) ? !Array.isArray(v) || !v.length : typeof v !== 'string') err(`${lang}: bad ${type} block`);
    }
    const h2 = t.body.filter(([type]) => type === 'h2').map(([, v]) => v);
    if (h2.length < 7) err(`${lang}: ${h2.length} h2 (min 7)`);
    if (new Set(h2.map((h) => h.toLowerCase())).size !== h2.length) err(`${lang}: duplicate h2`);
    if (t.body[0]?.[0] !== 'p') err(`${lang}: body must open with a paragraph`);
    const text = strings(t);
    const total = words([...t.body.flatMap(([, v]) => (Array.isArray(v) ? v : [v])), ...t.faq.flat()].join(' '));
    const min = { fr: 1000, en: 950, ar: 800 }[lang];
    if (total < min) err(`${lang}: ${total} words (min ${min})`);
    const all = text.join('\n');
    const prose = plain(all).replace(/\bB2[BC]\b/g, '');
    for (const n of prose.match(/\d+/g) || []) if (!numbers(slug).has(n)) err(`${lang}: number "${n}" (only published Codex figures are allowed)`);
    if (/[\u0660-\u0669\u06F0-\u06F9]/.test(prose)) err(`${lang}: Arabic-Indic digits`);
    const money = prose.match(MONEY); if (money) err(`${lang}: price or currency "${money[0]}"`);
    const banned = prose.match(BANNED); if (banned) err(`${lang}: banned name "${banned[0]}"`);
    if (/'/.test(prose)) err(`${lang}: straight apostrophe, use ’`);
    if (/Logements|Ain Malha|Zone 69|République, 13002|wa\.me|\+213|\+974|\+33/.test(all.replace(/href="https:\/\/wa\.me\/33605825051"/g, ''))) err(`${lang}: addresses and phones are appended automatically, remove them`);
    for (const m of all.matchAll(/<[^>]*>/g)) if (!/^<(?:\/?strong|\/a|a href="[^"]+")>$/.test(m[0])) err(`${lang}: tag not allowed ${m[0]}`);
    for (const m of all.matchAll(/href="([^"]*)"/g)) if (!hrefs.has(m[1])) err(`${lang}: link not allowed "${m[1]}"`);
    if (!/href="\/en\/blog\//.test(all)) err(`${lang}: no link to another article`);
    if (!/href="\/en\/(services|realisations)\//.test(all)) err(`${lang}: no link to a service or a project`);
    if (lang === 'en') for (const n of text.flatMap(nodes)) if (FRENCH.test(n)) err(`en: French-looking text "${n.slice(0, 70)}"`);
    if (lang === 'ar') for (const n of text.flatMap(nodes)) if (!ARABIC.test(n) && FRENCH.test(n)) err(`ar: French-looking text "${n.slice(0, 70)}"`);
    if (lang === 'ar' && t.body.some(([type, v]) => type === 'p' && !ARABIC.test(plain(v)))) err('ar: paragraph without Arabic');
    shape[lang] = { blocks: t.body.map(([type, v]) => type + (Array.isArray(v) ? v.length : '')).join(','), faq: t.faq.length, links: [...all.matchAll(/href="([^"]*)"/g)].map((m) => m[1]).sort().join(' '), words: total, h2: h2.length };
  }
  if (shape.fr && shape.en && shape.ar) {
    for (const lang of ['en', 'ar']) {
      if (shape[lang].blocks !== shape.fr.blocks) err(`${lang}: blocks differ from fr\n    fr: ${shape.fr.blocks}\n    ${lang}: ${shape[lang].blocks}`);
      if (shape[lang].faq !== shape.fr.faq) err(`${lang}: faq count differs from fr`);
      if (shape[lang].links !== shape.fr.links) err(`${lang}: links differ from fr`);
    }
  }
  if (errors.length) { failed++; console.log(`✗ ${slug}\n${errors.map((e) => '  ' + e).join('\n')}`); }
  else console.log(`✓ ${slug}  words fr ${shape.fr.words} · en ${shape.en.words} · ar ${shape.ar.words}  h2 ${shape.fr.h2}  faq ${shape.fr.faq}`);
}
process.exit(failed ? 1 : 0);
