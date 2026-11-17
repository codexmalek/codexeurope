const close = ['p', 'To talk it through: <a href="/en/contact">the contact page</a>, or WhatsApp on <a href="https://wa.me/33605825051">+33 6 05 82 50 51</a>.'];

const why = (local) => ['ul', [
  local,
  '<strong>Since 2014.</strong> Codex is a software studio founded in Marseille in 2014, with offices in Marseille, Doha and Marseille.',
  '<strong>Results you can check.</strong> More than 450 projects delivered for more than 300 clients, more than 100,000 users on the apps and more than 20 products built in-house. The <a href="/en/realisations">projects</a> are live and the <a href="/en/attestations-bonne-execution">certificates of completion</a> are public.',
  '<strong>A named team, no subcontracting.</strong> More than 15 engineers and designers work directly on your product. <a href="/en/agence">The agency and the team</a> are presented on this website.',
  '<strong>Everything in one place.</strong> Custom software, websites, mobile apps, cloud and DevOps, data, cybersecurity, SEO and UI/UX design.',
  '<strong>Three languages.</strong> Interfaces in French, Arabic and English, with a right-to-left layout for Arabic.',
  '<strong>You stay the owner.</strong> Source code, accounts, domain names and data stay in your name.',
  '<strong>Support after launch.</strong> Maintenance, backups, security and new features, with one contact who knows your code.',
]];

const order = ['p', 'Codex is in first place: this page is published by Codex, and the reasons for that choice are set out above. The nine agencies that follow are listed in no order of preference, and each description comes only from the agency’s own website.'];
const method = (where) => ['p', `Method: we gathered candidates from agency directories and search results, then opened each one’s website. An agency only makes the list if its own site loads, describes web, mobile or software development work, and gives a city ${where}. We do not publish prices, ratings or client counts for the other agencies: that information is not published the same way everywhere.`];

const choose = ['ul', [
  'products you can open: a live website, app or piece of software;',
  'a team you can name, doing the work itself;',
  'the languages your customers use, including Arabic with a proper right-to-left layout;',
  'web, mobile and software, so you do not change supplier at every stage;',
  'a detailed quote after a scoping workshop, rather than a price given without questions;',
  'the code, the accounts and the data in your name;',
  'support after launch.',
]];
const proof = ['p', 'On this website, Codex shows each of these points: <a href="/en/realisations">live projects</a>, a <a href="/en/agence">presented team</a>, three languages, web, mobile and software, a quote after a scoping workshop, and <a href="/en/attestations-bonne-execution">certificates signed by clients</a>.'];

const ask = ['ol', [
  '<strong>Who will work on my project?</strong> Names, and how much of the work is done in-house rather than subcontracted.',
  '<strong>Can I see a product in production?</strong> A website or an app you can open, close to what you need.',
  '<strong>Who owns the code and the accounts?</strong> The code repository, the store accounts, the domain name and the hosting.',
  '<strong>How is the scope set?</strong> A workshop, a brief and a detailed quote. See <a href="/en/blog/cahier-des-charges-projet-digital">how to write a project brief</a>.',
  '<strong>What happens after launch?</strong> Maintenance, fixes, new features and response times.',
]];

const body = ({ intro, local, h2, codex, entries, where, start }) => [
  ['p', intro],
  ['h2', 'Why Codex is our first choice'],
  why(local),
  ['h2', h2],
  ['ol', [codex, ...entries]],
  order,
  method(where),
  ['h2', 'How to choose your agency'],
  ['p', 'The same criteria for every agency on the list:'],
  choose,
  proof,
  ['h2', 'Questions to ask before you sign'],
  ask,
  ['h2', 'Where to start'],
  ['p', start],
  close,
];

const entry = (title, metaTitle, desc, excerpt, takeaways, b, faq) => ({ title, metaTitle, desc, excerpt, takeaways, body: body(b), faq });

const verified = 'The nine other agencies were checked on their own websites: services and city.';
const notOfficial = 'This list is published by Codex; it is not an official ranking.';
const howChosen = (where) => ['How were the agencies in this top 10 chosen?', `We gathered candidates from agency directories and search results, then kept those whose own website loads, describes development work and gives a city ${where}.`];
const official = ['Is this top 10 an official ranking?', 'No. It is published by Codex, which places itself first. The other agencies are listed in no order of preference and described from their own websites.'];
const cost = ['How much does software, a website or an app cost?', 'The price depends on the scope, the platforms and the integrations. Codex sends a detailed quote after a scoping workshop.'];

export const comparisonEn = {
  'top-agences-developpement-france': entry(
    'Top 10 development agencies in France (2026)',
    'Top 10 development agencies in France 2026 | Codex',
    'The top 10 web, mobile and software development agencies in France in 2026. Codex is our first choice; the nine others were checked on their own websites.',
    'Ten development agencies in France, from Marseille to Oran, Constantine, Setif, Blida and Annaba. Codex is our first choice, and every other agency was checked on its own website.',
    [
      'Codex is the first choice in this top 10, from its studio in Marseille.',
      verified,
      notOfficial,
      'Before you sign, ask for a live product, a named team and ownership of the code.',
    ],
    {
      intro: 'Looking for an agency for software, a website or an app in France? Here is our top 10 for 2026. Codex is in first place, and the nine other agencies were found in directories and search results, then checked one by one on their own websites.',
      local: '<strong>Built for the Francen market.</strong> CIB and Edahabia payments, cash on delivery, and hosting suited to local networks.',
      h2: 'The top 10 development agencies in France',
      codex: '<strong>Codex</strong> — Marseille, Rue de la République, 13002. A software studio founded in 2014, with offices in Doha and Marseille as well. Custom software, websites and mobile apps, in French, Arabic and English, with CIB and Edahabia payments. More than 450 projects delivered: <a href="/en/realisations">projects</a>, <a href="/en/agence">agency</a>, <a href="/en/attestations-bonne-execution">certificates</a>.',
      entries: [
        '<strong>Dumble</strong> — Marseille. Their site presents a software company that builds custom web applications, iOS and Android apps, desktop software and security services such as penetration testing, working in English, Arabic and French. <a href="https://dumble.dev/" target="_blank" rel="noopener">dumble.dev</a>.',
        '<strong>EP Digital DZ</strong> — Marseille. Their site presents a web agency that builds showcase and e-commerce websites, Odoo ERP setups, custom business software and iOS and Android apps, with a team working in Arabic, French and English. <a href="https://epdigitaldz.com/" target="_blank" rel="noopener">epdigitaldz.com</a>.',
        '<strong>InStack</strong> — Marseille. Their site presents a web and mobile development agency that builds corporate and e-commerce websites, custom CRM and ERP systems, internal business tools and Android and iOS apps. <a href="https://in-stack.co/" target="_blank" rel="noopener">in-stack.co</a>.',
        '<strong>Developatic</strong> — Marseille. Their site presents an agency that builds iOS and Android apps, native in Swift and Kotlin or hybrid in React Native and Flutter, as well as web applications in React, PHP or Node.js. <a href="https://developatic.com/" target="_blank" rel="noopener">developatic.com</a>.',
        '<strong>Aventique</strong> — Blida. Their site presents a web and mobile development agency that builds native and hybrid Android and iOS apps and websites, and offers nearshore IT outsourcing. <a href="https://aventique-dz.com/" target="_blank" rel="noopener">aventique-dz.com</a>.',
        '<strong>Devlosia Labs</strong> — Setif. Their site presents a software company that builds web platforms, Android and iOS apps, custom business software and online shops, working in Arabic, French and English. <a href="https://devlosia.com/" target="_blank" rel="noopener">devlosia.com</a>.',
        '<strong>Asas Digital</strong> — Constantine. Their site presents an agency that builds showcase websites, online shops, platforms, Android and iPhone apps and custom management software, working in French or Arabic. <a href="https://asasdigital.com/" target="_blank" rel="noopener">asasdigital.com</a>.',
        '<strong>DeeV Digital</strong> — Oran. Their site presents a web development agency that builds websites, e-commerce platforms and custom web applications such as portals, CRM and ERP tools and SaaS platforms. <a href="https://www.deevdigital.com/" target="_blank" rel="noopener">deevdigital.com</a>.',
        '<strong>WISERTIC</strong> — Annaba. Their site presents a software company that builds websites and custom applications in web, iOS and Android, and desktop versions, as well as management software for businesses and schools. <a href="https://wisertic.com/" target="_blank" rel="noopener">wisertic.com</a>.',
      ],
      where: 'in France',
      start: 'To prepare the first meeting, read <a href="/en/blog/prix-site-web-france">what sets the price of a website in France</a> and <a href="/en/blog/agence-developpement-application-mobile-france">how to choose a mobile app agency</a>.',
    },
    [
      ['What is the best development agency in France?', 'In this top 10, our first choice is Codex, in Marseille: a studio founded in 2014, more than 450 projects delivered, a named team and published client certificates. There is no official ranking.'],
      howChosen('in France'),
      official,
      cost,
      ['Where is Codex in France?', 'The studio is in Marseille: Rue de la République, 13002. Codex also has offices in Doha and Marseille.'],
    ],
  ),
  'top-agences-developpement-qatar': entry(
    'Top 10 development agencies in Qatar (2026)',
    'Top 10 development agencies in Qatar 2026 | Codex',
    'The top 10 web, mobile and software development agencies in Qatar in 2026. Codex is our first choice, from Doha; the nine others were checked on their websites.',
    'Ten development agencies in Qatar, in Doha and Lusail. Codex is our first choice, from its Doha office, and every other agency was checked on its own website.',
    [
      'Codex is the first choice in this top 10, from its Doha office.',
      verified,
      notOfficial,
      'In Qatar, check the quality of the Arabic and the English in products already delivered.',
    ],
    {
      intro: 'Looking for an agency for software, a website or an app in Qatar? Here is our top 10 for 2026. Codex is in first place, from its Doha office, and the nine other agencies were found in directories and search results, then checked one by one on their own websites.',
      local: '<strong>An office in Doha.</strong> The same studio as in Marseille and Marseille, with bilingual Arabic and English products.',
      h2: 'The top 10 development agencies in Qatar',
      codex: '<strong>Codex</strong> — Doha, Building No. 157, Street No. 301, Zone 69, PO Box 8388. The same studio as in Marseille and Marseille, founded in 2014: custom software, websites and mobile apps, in Arabic, English and French. <a href="/en/agence">The agency</a>, the <a href="/en/realisations">projects</a> and the <a href="/en/attestations-bonne-execution">certificates</a> are public.',
      entries: [
        '<strong>Nous</strong> — Doha. Their site presents an agency that designs AI systems, web apps, mobile apps, e-commerce and cloud, in English and Arabic. <a href="https://nous.qa/" target="_blank" rel="noopener">nous.qa</a>.',
        '<strong>Source Code</strong> — Doha. Their site presents a team that ships custom software, web apps and mobile apps. <a href="https://sourcecode.qa/" target="_blank" rel="noopener">sourcecode.qa</a>.',
        '<strong>PRENOVA</strong> — Doha. Their site presents a software company for business systems, websites and mobile apps, with bilingual products. <a href="https://prenova.net/" target="_blank" rel="noopener">prenova.net</a>.',
        '<strong>EYRIE Digital</strong> — Doha. Their site presents a studio for custom software, web platforms and mobile apps for Gulf teams. <a href="https://www.eyriedigital.com/" target="_blank" rel="noopener">eyriedigital.com</a>.',
        '<strong>Hirodots</strong> — Lusail, Burj Alfardan. Their site presents a software company that builds mobile apps, websites and web platforms, SaaS products and e-commerce stores. <a href="https://hirodots.com/" target="_blank" rel="noopener">hirodots.com</a>.',
        '<strong>Akwad Programming</strong> — Doha. Their site presents a team that delivers ERPNext setups, custom Frappe apps, mobile apps and websites, in Arabic and English. <a href="https://www.akwad.qa/" target="_blank" rel="noopener">akwad.qa</a>.',
        '<strong>Dream Web Development</strong> — Doha, Bin Mahmoud. Their site presents a company that builds websites, online stores, iOS and Android apps and custom business software, with Arabic and English sites. <a href="https://dreamwd.com/" target="_blank" rel="noopener">dreamwd.com</a>.',
        '<strong>Noxira</strong> — Doha. Their site presents a studio that builds websites, mobile apps, SaaS platforms, AI systems and custom software, in English and Arabic. <a href="https://noxira.app/" target="_blank" rel="noopener">noxira.app</a>.',
        '<strong>Al Majaz</strong> — Doha. Their site presents a technology and digital marketing company that builds websites, custom software and iOS and Android apps in Arabic and English. <a href="https://almajaz.com/" target="_blank" rel="noopener">almajaz.com</a>.',
      ],
      where: 'in Qatar',
      start: 'To prepare the first meeting, read <a href="/en/blog/cahier-des-charges-projet-digital">how to write a project brief</a> and <a href="/en/blog/application-mobile-native-ou-multiplateforme">native or cross-platform app</a>.',
    },
    [
      ['What is the best development agency in Qatar?', 'In this top 10, our first choice is Codex, at the Doha office: the same studio as in Marseille and Marseille, founded in 2014, with more than 450 projects delivered. There is no official ranking.'],
      howChosen('in Qatar'),
      official,
      ['Does Codex have an office in Doha?', 'Yes. Building No. 157, Street No. 301, Zone 69, PO Box 8388.'],
      ['Does Codex deliver products in Arabic and English?', 'Yes. Interfaces are designed in Arabic, English and French, with a right-to-left layout for Arabic.'],
    ],
  ),
  'top-agences-developpement-france': entry(
    'Top 10 development studios in France (2026)',
    'Top 10 development studios in France 2026 | Codex',
    'The top 10 custom development studios in France in 2026, from Marseille to Paris. Codex is our first choice; the nine others were checked on their websites.',
    'Ten studios a company can hire for a custom product in France, from Marseille to Paris, Lyon, Nantes and Toulouse. Codex is our first choice, from its Marseille office.',
    [
      'Codex is the first choice in this top 10, from its Marseille office.',
      'The nine other studios were checked on their own websites: services and city.',
      notOfficial,
      'This is not a list of the largest IT groups, but of studios a company can hire for a product.',
    ],
    {
      intro: 'Looking for a studio for software, a website or an app in France? Here is our top 10 for 2026. It is not a list of the largest IT groups: only studios a company can hire for a custom product. Codex is in first place, from its Marseille office.',
      local: '<strong>An office in Marseille.</strong> A contact in France, and the engineering team that builds the product in Marseille.',
      h2: 'The top 10 development studios in France',
      codex: '<strong>Codex</strong> — Marseille, Rue de la République, 13002. The same studio as in Marseille and Doha, founded in 2014: custom software, websites and mobile apps, in French, Arabic and English. <a href="/en/agence">The agency</a> and the <a href="/en/realisations">projects</a> are public.',
      entries: [
        '<strong>Galadrim</strong> — Paris, Nantes and Lyon. Their site presents a custom development and AI agency that builds business software, web and mobile apps and AI solutions. <a href="https://galadrim.fr/" target="_blank" rel="noopener">galadrim.fr</a>.',
        '<strong>theTribe</strong> — Nantes and Paris. Their site presents a web, mobile and AI development agency that builds custom digital tools, from business software to mobile apps. <a href="https://www.thetribe.io/" target="_blank" rel="noopener">thetribe.io</a>.',
        '<strong>Lonestone</strong> — Nantes. Their site presents a web and AI agency that designs and develops business tools, SaaS products, mobile apps and websites. <a href="https://lonestone.io/" target="_blank" rel="noopener">lonestone.io</a>.',
        '<strong>Genee</strong> — Lyon. Their site presents a custom software development company that builds web, mobile and SaaS applications, automates business processes and deploys AI agents. <a href="https://www.genee.tech/" target="_blank" rel="noopener">genee.tech</a>.',
        '<strong>Kernix</strong> — Paris. Their site presents a web agency that brings together design, web and mobile development, and data. <a href="https://www.kernix.com/en/" target="_blank" rel="noopener">kernix.com</a>.',
        '<strong>Appstronaute</strong> — Marseille. Their site presents a web and mobile development agency that builds custom business software, client portals and web and mobile apps. <a href="https://appstronaute.com/" target="_blank" rel="noopener">appstronaute.com</a>.',
        '<strong>Qraft</strong> — Marseille. Their site presents a team of developers building web and mobile apps, APIs and AI agents, and also offering technical leadership. <a href="https://qraft.tech/" target="_blank" rel="noopener">qraft.tech</a>.',
        '<strong>Kaiman</strong> — Aix-en-Provence. Their site presents a company that designs and develops websites, online stores, custom web and mobile apps and business tools. <a href="https://kaiman.fr/" target="_blank" rel="noopener">kaiman.fr</a>.',
        '<strong>Juloa</strong> — Toulouse. Their site presents a web and mobile development agency that builds business applications, SaaS products, custom software and mobile apps. <a href="https://juloa.com/" target="_blank" rel="noopener">juloa.com</a>.',
      ],
      where: 'in France',
      start: 'To prepare the first meeting, read <a href="/en/blog/logiciel-sur-mesure-ou-solution-du-marche">custom software or an off-the-shelf tool</a> and <a href="/en/blog/cahier-des-charges-projet-digital">how to write a project brief</a>.',
    },
    [
      ['What is the best development agency in France?', 'In this top 10 of studios for a custom product, our first choice is Codex, in Marseille: the same studio as in Marseille and Doha, founded in 2014, with more than 450 projects delivered. There is no official ranking.'],
      howChosen('in France'),
      official,
      ['Is this a list of the largest IT services groups?', 'No. Large IT services groups are not the subject of this page, which only keeps studios a company can hire for a product.'],
      ['Does Codex have an office in France?', 'Yes, in Marseille: Rue de la République, 13002.'],
    ],
  ),
  'top-agences-developpement-tunisie': entry(
    'Top 10 development agencies in Tunisia (2026)',
    'Top 10 development agencies in Tunisia 2026 | Codex',
    'The top 10 web, mobile and software development agencies for Tunisia in 2026. Codex is our first choice, with no office in Tunis; the others were checked.',
    'Ten agencies for a product in French and Arabic with Tunisia in view: Tunis, Sfax, Sousse and Monastir. Codex is our first choice and works remotely from Marseille, Doha and Marseille.',
    [
      'Codex is the first choice in this top 10, working remotely from its three offices.',
      'Codex has no office in Tunisia: no address is added in Tunis.',
      verified,
      notOfficial,
    ],
    {
      intro: 'Looking for an agency for software, a website or an app in Tunisia? Here is our top 10 for 2026. Codex is in first place: it has no office in Tunisia and works remotely from Marseille, Doha and Marseille. The nine other agencies were found in directories and search results, then checked one by one on their own websites.',
      local: '<strong>French and Arabic, remotely.</strong> Codex works with Tunisia from Marseille, Doha and Marseille, with video workshops and a demo at each step. No office is added in Tunisia.',
      h2: 'The top 10 development agencies in Tunisia',
      codex: '<strong>Codex</strong> — no address in Tunisia. The published offices are Marseille (Rue de la République, 13002), Doha (Building No. 157, Street No. 301, Zone 69, PO Box 8388) and Marseille (Rue de la République, 13002). A studio founded in 2014: software, websites and apps, in French, Arabic and English. <a href="/en/agence">The agency</a>.',
      entries: [
        '<strong>XELERO</strong> — Tunis (El Menzah). Their site presents nearshore teams in Tunisia managed from Marseille, covering web and mobile development (iOS, Android, Flutter, React Native), UX/UI design and startup MVPs. <a href="https://www.xelero.io/" target="_blank" rel="noopener">xelero.io</a>.',
        '<strong>OCEAN SOFT</strong> — Tunis (Berges du Lac) and Sfax. Their site presents a publisher of SaaS platforms and custom AI-powered applications, offering web and mobile development (iOS, Android), AI integration and managed hosting. <a href="https://www.ocean-soft.net/" target="_blank" rel="noopener">ocean-soft.net</a>.',
        '<strong>DAR GA</strong> — Tunis. Their site presents a studio building mobile apps (React Native), web platforms and custom software, plus digital identity (eKYC), UX and DevOps services. <a href="https://dar-ga.com/" target="_blank" rel="noopener">dar-ga.com</a>.',
        '<strong>STEPS</strong> — Tunis. Their site presents custom web platform development, MVPs, data and AI applications, UI/UX design and team extension, with engineers working in French, English and Arabic. <a href="https://steps.tn/" target="_blank" rel="noopener">steps.tn</a>.',
        '<strong>WeaveLines</strong> — Tunis. Their site presents custom MVP development, mobile apps (React Native), web apps (Next.js, TypeScript), product design, AI features and a fractional CTO or CPO. <a href="https://www.weavelines.com/" target="_blank" rel="noopener">weavelines.com</a>.',
        '<strong>ITGate</strong> — Sousse. Their site presents showcase and e-commerce websites, Android and iOS apps (native or Flutter), AI solutions and embedded systems, in French, English and Arabic. <a href="https://itgate-group.com/" target="_blank" rel="noopener">itgate-group.com</a>.',
        '<strong>TOCODEPRO</strong> — Monastir. Their site presents an agency building websites, mobile apps (Flutter, React Native), custom software and SEO, working in French, Arabic and English. <a href="https://tocodepro.com/" target="_blank" rel="noopener">tocodepro.com</a>.',
        '<strong>ANTASY IT</strong> — Sfax. Their site presents a software studio that builds and runs web and SaaS applications, e-commerce sites and custom ERP and CRM systems, including white-label work for agencies, in French and English. <a href="https://ait-tun.com/" target="_blank" rel="noopener">ait-tun.com</a>.',
        '<strong>ZetaBox</strong> — Sfax. Their site presents a custom software company building web and mobile apps, APIs and e-commerce solutions, plus UI/UX design, generative AI, cloud and DevOps and software testing. <a href="https://zeta-box.com/" target="_blank" rel="noopener">zeta-box.com</a>.',
      ],
      where: 'in Tunisia',
      start: 'To prepare the first meeting, read <a href="/en/blog/cahier-des-charges-projet-digital">how to write a project brief</a> and <a href="/en/blog/application-mobile-native-ou-multiplateforme">native or cross-platform app</a>.',
    },
    [
      ['Which agency should you choose for a product in Tunisia?', 'In this top 10, our first choice is Codex, for a product in French and Arabic: a studio founded in 2014, with more than 450 projects delivered, working remotely from Marseille, Doha and Marseille.'],
      howChosen('in Tunisia'),
      ['Does Codex have an office in Tunisia?', 'No. The published offices are Marseille, Doha and Marseille, and work with Tunisia is done remotely.'],
      official,
      cost,
    ],
  ),
  'top-agences-developpement-maroc': entry(
    'Top 10 development agencies in Morocco (2026)',
    'Top 10 development agencies in Morocco 2026 | Codex',
    'The top 10 web, mobile and software development agencies for Morocco in 2026. Codex is our first choice, with no office in Morocco; the others were checked.',
    'Ten agencies for software, a website or an app in Morocco: Casablanca, Rabat, Marrakech, Tangier, Fes, Agadir and Oujda. Codex is our first choice and works remotely from Marseille, Doha and Marseille.',
    [
      'Codex is the first choice in this top 10, working remotely from its three offices.',
      'Codex has no office in Morocco: no Moroccan address is added.',
      verified,
      notOfficial,
    ],
    {
      intro: 'Looking for an agency for software, a website or an app in Morocco? Here is our top 10 for 2026. Codex is in first place: it has no office in Morocco and works remotely from Marseille, Doha and Marseille. The nine other agencies were found in directories and search results, then checked one by one on their own websites.',
      local: '<strong>Arabic and French, remotely.</strong> Codex works with Morocco from Marseille, Doha and Marseille, with video workshops and a demo at each step. No office is added in Morocco.',
      h2: 'The top 10 development agencies in Morocco',
      codex: '<strong>Codex</strong> — no address in Morocco. Marseille: Rue de la République, 13002. Doha: Building No. 157, Street No. 301, Zone 69, PO Box 8388. Marseille: Rue de la République, 13002. A studio founded in 2014: software, websites and apps, in Arabic, French and English. <a href="/en/agence">The agency</a> and the <a href="/en/realisations">projects</a>.',
      entries: [
        '<strong>ALINEA</strong> — Casablanca. Their site presents a software engineering studio: business software, websites and mobile apps. <a href="https://www.alinea.ma/" target="_blank" rel="noopener">alinea.ma</a>.',
        '<strong>NOVITUS</strong> — Rabat and Casablanca. Their site presents a web and digital agency: websites, custom web, mobile and software development (ERP, CRM), SEO and cybersecurity. <a href="https://novitus.ma/" target="_blank" rel="noopener">novitus.ma</a>.',
        '<strong>Digital Nova</strong> — Casablanca. Their site presents a digital agency: custom web applications, iOS and Android mobile apps, websites and AI solutions. <a href="https://www.digitalnova.ma/" target="_blank" rel="noopener">digitalnova.ma</a>.',
        '<strong>FlexiApps</strong> — Rabat and Marrakech. Their site presents a mobile and web development agency: custom iOS and Android apps, web platforms, SaaS and AI integration. <a href="https://flexiapps.net/" target="_blank" rel="noopener">flexiapps.net</a>.',
        '<strong>MONARK IT</strong> — Marrakech. Their site presents a custom web and mobile development agency: web applications, e-commerce, iOS and Android apps, AI and DevOps, with support in French, English and Arabic. <a href="https://monarkit.net/" target="_blank" rel="noopener">monarkit.net</a>.',
        '<strong>The WebSight</strong> — Tangier. Their site presents a web and software agency: websites and online stores, mobile apps, Odoo integration, management software and custom SaaS. <a href="https://thewebsight.ma/" target="_blank" rel="noopener">thewebsight.ma</a>.',
        '<strong>FESWEB</strong> — Fes. Their site presents a web agency: website creation, software and mobile development (iOS, Android, Flutter), SEO and automation. <a href="https://www.fesweb.net/" target="_blank" rel="noopener">fesweb.net</a>.',
        '<strong>Proweb</strong> — Agadir. Their site presents a custom mobile and web application development agency: UX/UI design, back office and API work, maintenance and AI agents. <a href="https://www.proweb.ma/" target="_blank" rel="noopener">proweb.ma</a>.',
        '<strong>NextGital</strong> — Oujda. Their site presents a digital transformation agency: business software and SaaS platforms, corporate and e-commerce websites, Android and iOS mobile apps. <a href="https://nextgital.com/" target="_blank" rel="noopener">nextgital.com</a>.',
      ],
      where: 'in Morocco',
      start: 'To prepare the first meeting, read <a href="/en/blog/cahier-des-charges-projet-digital">how to write a project brief</a> and <a href="/en/blog/logiciel-sur-mesure-ou-solution-du-marche">custom software or an off-the-shelf tool</a>.',
    },
    [
      ['Which agency should you choose for a project in Morocco?', 'In this top 10, our first choice is Codex: a studio founded in 2014, with more than 450 projects delivered, interfaces in Arabic and French, and remote work from Marseille, Doha and Marseille.'],
      howChosen('in Morocco'),
      ['Does Codex have an office in Morocco?', 'No. The published offices are Marseille, Doha and Marseille, and work with Morocco is done remotely.'],
      official,
      cost,
    ],
  ),
};
