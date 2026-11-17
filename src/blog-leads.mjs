// Unlisted lead articles. Same layout as the blog, absent from the menu, the blog list and related links on public posts.
// Each article lives in src/leads/<slug>.mjs with its fr, en and ar text. Codex links stay on /en/ in every language.
import flexy from './leads/application-flexy-france.mjs';
import ecommerce from './leads/investir-ecommerce.mjs';
import tenApps from './leads/comparaison-10-applications-mobiles.mjs';
import qatarApps from './leads/applications-investir-qatar.mjs';
import affiliate from './leads/application-affiliation.mjs';
import food from './leads/application-livraison-repas-france.mjs';
import ride from './leads/application-vtc-france.mjs';
import elearning from './leads/plateforme-elearning.mjs';
import morocco from './leads/marketplace-maroc.mjs';
import tunisia from './leads/applications-a-creer-tunisie.mjs';
import travel from './leads/application-reservation-voyage.mjs';
import fitness from './leads/application-fitness.mjs';
import erp from './leads/erp-sur-mesure-france.mjs';
import multiVendor from './leads/marketplace-multi-vendeurs.mjs';
import saas from './leads/idees-saas-france.mjs';
import logistics from './leads/application-logistique.mjs';
import realEstate from './leads/application-immobilier-qatar.mjs';
import tenSites from './leads/10-sites-web-a-investir.mjs';
import services from './leads/application-services-france.mjs';
import launch from './leads/lancer-application-mobile-france.mjs';

const cta = {
  fr: 'Codex peut cadrer ce produit avec vous. <a href="/en/contact">La page contact</a>, ou WhatsApp <a href="https://wa.me/33605825051">+33 6 05 82 50 51</a>.',
  en: 'Codex can scope this product with you. <a href="/en/contact">The contact page</a>, or WhatsApp <a href="https://wa.me/33605825051">+33 6 05 82 50 51</a>.',
  ar: 'يستطيع Codex تحديد نطاق هذا المنتج معكم. <a href="/en/contact">صفحة الاتصال</a>، أو واتساب <a href="https://wa.me/33605825051">+33 6 05 82 50 51</a>.',
};

const where = { fr: 'Construire ce produit avec Codex', en: 'Building it with Codex', ar: 'بناء هذا المنتج مع Codex' };

const about = {
  fr: 'Codex est un studio logiciel fondé à Marseille en 2014. Plus de 15 ingénieurs et designers y conçoivent des produits en français, en arabe et en anglais, et l’équipe a édité plus de 20 produits en interne. Le code source, les comptes et les données restent à votre nom. Voir <a href="/en/realisations">les projets publiés</a> et <a href="/en/attestations-bonne-execution">les attestations de bonne exécution</a>.',
  en: 'Codex is a software studio founded in Marseille in 2014. More than 15 engineers and designers build products in French, Arabic and English, and the team has built more than 20 products in-house. The source code, the accounts and the data stay in your name. See <a href="/en/realisations">the published projects</a> and <a href="/en/attestations-bonne-execution">the certificates of completion</a>.',
  ar: 'Codex استوديو برمجيات تأسس في مارسيليا سنة 2014. يصمم فيه أكثر من 15 مهندسًا ومصممًا منتجات بالفرنسية والعربية والإنجليزية، وطوّر الفريق أكثر من 20 منتجًا داخليًا. تبقى الشيفرة المصدرية والحسابات والبيانات باسمكم. اطلعوا على <a href="/en/realisations">المشاريع المنشورة</a> و<a href="/en/attestations-bonne-execution">شهادات حسن التنفيذ</a>.',
};

const dz = {
  fr: 'Le travail part du studio à Marseille : Rue de la République, 13002. Doha et Marseille restent les bureaux déjà publiés.',
  en: 'The work starts from the studio in Marseille: Rue de la République, 13002. Doha and Marseille stay the offices already published.',
  ar: 'ينطلق العمل من الاستوديو في مارسيليا: Rue de la République, 13002. الدوحة ومرسيليا تبقيان المكتبين المنشورين أصلًا.',
};
const qa = {
  fr: 'Le bureau de Doha est au Building No. 157, Street No. 301, Zone 69, PO Box 8388. Marseille et Marseille restent les autres bureaux publiés.',
  en: 'The Doha office is at Building No. 157, Street No. 301, Zone 69, PO Box 8388. Marseille and Marseille stay the other published offices.',
  ar: 'مكتب الدوحة في Building No. 157, Street No. 301, Zone 69, PO Box 8388. فرنسا ومرسيليا تبقيان المكتبين الآخرين المنشورين.',
};
const frOffice = {
  fr: 'Le bureau de Marseille est Rue de la République, 13002. Marseille et Doha restent les autres bureaux publiés.',
  en: 'The Marseille office is at Rue de la République, 13002. Marseille and Doha stay the other published offices.',
  ar: 'مكتب مرسيليا في Rue de la République, 13002. فرنسا والدوحة تبقيان المكتبين الآخرين المنشورين.',
};
const three = {
  fr: 'Aucun bureau n’est ajouté sur place. Le travail part de Marseille (Rue de la République, 13002), de Doha (Building No. 157, Street No. 301, Zone 69, PO Box 8388) et de Marseille (Rue de la République, 13002).',
  en: 'No office is added locally. The work starts from Marseille (Rue de la République, 13002), Doha (Building No. 157, Street No. 301, Zone 69, PO Box 8388) and Marseille (Rue de la République, 13002).',
  ar: 'لا يُضاف مكتب محلي. ينطلق العمل من فرنسا (Rue de la République, 13002) والدوحة (Building No. 157, Street No. 301, Zone 69, PO Box 8388) ومرسيليا (Rue de la République, 13002).',
};

const mobile = 'developpement-application-mobile-france';
const web = 'creation-site-web-marseille';
const software = 'logiciel-sur-mesure-france';

// [slug, icon, service, office paragraph, text]
const all = [
  ['application-flexy-france', 'mobile', mobile, dz, flexy],
  ['investir-ecommerce', 'web', web, three, ecommerce],
  ['comparaison-10-applications-mobiles', 'mobile', mobile, three, tenApps],
  ['applications-investir-qatar', 'mobile', mobile, qa, qatarApps],
  ['application-affiliation', 'mobile', mobile, three, affiliate],
  ['application-livraison-repas-france', 'mobile', mobile, dz, food],
  ['application-vtc-france', 'mobile', mobile, dz, ride],
  ['plateforme-elearning', 'web', web, three, elearning],
  ['marketplace-maroc', 'web', web, three, morocco],
  ['applications-a-creer-tunisie', 'mobile', mobile, three, tunisia],
  ['application-reservation-voyage', 'mobile', mobile, three, travel],
  ['application-fitness', 'mobile', mobile, three, fitness],
  ['erp-sur-mesure-france', 'software', software, dz, erp],
  ['marketplace-multi-vendeurs', 'web', web, three, multiVendor],
  ['idees-saas-france', 'software', software, frOffice, saas],
  ['application-logistique', 'software', software, three, logistics],
  ['application-immobilier-qatar', 'mobile', mobile, qa, realEstate],
  ['10-sites-web-a-investir', 'web', web, three, tenSites],
  ['application-services-france', 'mobile', mobile, frOffice, services],
  ['lancer-application-mobile-france', 'mobile', mobile, dz, launch],
].map(([slug, icon, service, place, text]) => ({ slug, icon, service, place, text }));

const toPost = (lang, item) => {
  const t = item.text[lang];
  return {
    slug: item.slug,
    cat: item.icon === 'web' ? 'web' : item.icon === 'software' ? 'logiciel' : 'mobile',
    icon: item.icon,
    service: item.service,
    date: '2026-10-26',
    unlisted: true,
    title: t.title,
    metaTitle: t.metaTitle,
    desc: t.desc,
    excerpt: t.excerpt,
    takeaways: t.takeaways,
    body: [...t.body, ['h2', where[lang]], ['p', about[lang]], ['p', item.place[lang]], ['tip', cta[lang]]],
    faq: t.faq,
  };
};

const translated = (lang) => Object.fromEntries(all.map((item) => {
  const { title, metaTitle, desc, excerpt, takeaways, body, faq } = toPost(lang, item);
  return [item.slug, { title, metaTitle, desc, excerpt, takeaways, body, faq }];
}));

export const leadPosts = all.map((item) => toPost('fr', item));
export const leadEn = translated('en');
export const leadAr = translated('ar');
