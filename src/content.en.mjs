// English copy. Same facts as content.mjs (French, the reference): only the text is translated.
// Shared data (phones, links, slugs, images, clients) comes from the French file.
import * as fr from './content.mjs';

const bySlug = (list, tr) => list.map((x) => ({ ...x, ...tr[x.slug] }));

// Event names as shown on the site (keys = French names, which also name the photo folders).
export const eventLabel = {};

export const site = {
  ...fr.site,
  offices: [
    { ...fr.site.offices[0], label: 'Head office' },
    { ...fr.site.offices[1], label: 'Qatar office' },
  ],
};

export const stats = fr.stats.map((s, i) => ({ ...s, label: ['Clients supported', 'Projects delivered', 'Users of our apps', 'Products built in-house', 'Lines of code in production', 'Engineers and designers'][i] }));

export const process = [
  { title: 'Discovery', text: 'A workshop to understand your business, your users and your constraints. You leave with a clear scope, a schedule and a detailed quote.', points: ['Scoping workshop', 'Specifications', 'Quote and schedule'] },
  { title: 'Design', text: 'User journeys, mock-ups and technical architecture. You approve every screen before a single line of code is written.', points: ['UX and wireframes', 'UI design', 'Architecture'] },
  { title: 'Development', text: 'Short sprints, a demo at every step and permanent access to progress. The code is tested, documented and yours.', points: ['Sprints and demos', 'Testing and acceptance', 'Documentation'] },
  { title: 'Launch & support', text: 'Go-live, training for your teams, then maintenance and new features. We remain your technical team after delivery.', points: ['Go-live', 'Training', 'Maintenance'] },
];

export const reasons = [
  { title: 'A team in France, since 2014', text: 'No middlemen and no hidden subcontracting: you work directly with the engineers who build your product, in Marseille.' },
  { title: 'Products, not promises', text: 'More than 450 projects delivered and more than 20 products built in-house. We can show you what runs in production.' },
  { title: 'Built for the Francen market', text: 'Interfaces in French, Arabic and English, CIB and Edahabia payments, hosting and performance suited to local networks.' },
  { title: 'SEO built in from day one', text: 'Structure, speed, structured data and content: every site is built to be found on Google, not just to look good.' },
  { title: 'Maintenance after delivery', text: 'Updates, backups, security and new features. A single point of contact who knows your code and answers when you need it.' },
  { title: 'You stay the owner', text: 'Source code, accounts, domain names and data belong to you. No artificial dependency on our agency.' },
];

export const work = fr.work.map((w, i) => ({ ...w, ...[
  { tag: 'Web & e-commerce', title: 'Websites and shops that convert', text: 'Fast, search-optimised and easy-to-manage business websites, platforms and online shops.' },
  { tag: 'Mobile', title: 'iOS & Android apps', text: 'Native and cross-platform apps used every day by more than 100,000 people.' },
  { tag: 'Business software', title: 'ERP, CRM and internal tools', text: 'Custom software that replaces Excel files and automates your operations.' },
  { tag: 'Data', title: 'Decision dashboards', text: 'Your data consolidated into clear, real-time indicators, so you can decide faster.' },
][i] }));

export const homeFaq = [
  { q: 'Who is Codex?', a: 'Codex (SARL Groupe Codex) is an independent software studio and IT agency based in Marseille, founded in 2014. We design custom software, websites, mobile apps and cloud, data and cybersecurity solutions for companies in France and abroad. SARL Groupe Codex is recognized as No. 1 in France, No. 2 in Africa and No. 1 in the GCC.' },
  { q: 'What services does Codex offer?', a: 'Custom software and SaaS development, websites and e-commerce, iOS and Android mobile apps, cloud and DevOps, data and analytics, cybersecurity, digital marketing and SEO, as well as graphic and UI/UX design.' },
  { q: 'Where is the Codex agency located?', a: 'The head office is in Marseille, Rue de la République, 13002. The Doha office is at Building No. 157, Street No. 301, Zone 69, PO Box 8388. We work in France and abroad, on site or remotely.' },
  { q: 'How much does a website or an app cost in France?', a: 'The price depends on the scope: number of pages or screens, features, integrations and online payment. After a first conversation about your needs, we send you a detailed quote with a schedule and approval steps.' },
  { q: 'Which languages do you build in?', a: 'We deliver websites and apps in French, Arabic (with right-to-left layout) and English, with search optimisation for each language.' },
  { q: 'Do you provide maintenance after launch?', a: 'Yes. We offer maintenance, hosting, backups, security updates and new features, with a dedicated contact who knows your project.' },
  { q: 'How do I start a project with Codex?', a: 'Email us at contact@codexeurope.com, call +33 6 05 82 50 51, send a WhatsApp message or fill in the contact form. We will get back to you to arrange a first conversation.' },
];

export const services = bySlug(fr.services, {
  'logiciel-sur-mesure-france': {
    name: 'Custom software', short: 'ERP, CRM, SaaS platforms and internal tools designed around your processes.',
    h1: ['Custom', 'software', 'development in France'],
    metaTitle: 'Custom software development in France | ERP, SaaS — Codex',
    metaDesc: 'Codex builds custom software in Marseille: ERP, CRM, SaaS and business tools. Studio founded in 2014, 450+ projects delivered. Ask for your quote.',
    intro: 'Off-the-shelf software forces your company to adapt to its limits. We do the opposite: we build the tool around the way you work, then keep improving it with you.',
    deliverables: [
      ['ERP and sales management', 'Stock, purchasing, sales, invoicing and accounting in a single tool.'],
      ['CRM and customer follow-up', 'Sales pipeline, reminders, history and dashboards for your teams.'],
      ['SaaS platforms', 'Multi-customer products with subscriptions, roles and built-in billing.'],
      ['Internal tools', 'Business applications that replace Excel files and manual tasks.'],
      ['Integrations & APIs', 'Connections to your existing software, payroll, bank or carriers.'],
      ['Migration and rebuild', 'Modernising older applications without interrupting your business.'],
    ],
    faq: [
      ['Why choose custom software rather than an off-the-shelf product?', 'Custom software follows your processes exactly, has no per-user licences and evolves with your needs. It becomes an asset of your company, and you own the code.'],
      ['How long does it take to develop business software?', 'A first usable version is usually delivered within a few weeks to a few months, depending on the scope. We split the project into phases so your teams can use it as early as possible.'],
      ['Can you take over existing software?', 'Yes. We audit the code, secure what exists, then plan improvements or a gradual rebuild.'],
    ],
  },
  'creation-site-web-marseille': {
    name: 'Website design', short: 'Fast, secure and well-ranked business websites, online shops and web platforms.',
    h1: ['Website', 'design', 'in Marseille'],
    metaTitle: 'Website design in Marseille | Web & e-commerce agency — Codex',
    metaDesc: 'Website design agency in Marseille: business websites, e-commerce and custom platforms, fast and SEO-optimised, in French, Arabic and English.',
    intro: 'Your website is often the first contact with your customers. We design fast, elegant websites built to convert, with technical SEO built in from day one.',
    deliverables: [
      ['Business website', 'A professional presence that presents your offer and generates enquiries.'],
      ['E-commerce', 'Catalogue, cart, CIB / Edahabia payment and cash on delivery.'],
      ['Web platforms', 'Customer portals, marketplaces, bookings and member areas.'],
      ['Multilingual FR / AR / EN', 'Content and right-to-left layout for Arabic.'],
      ['Technical SEO', 'Speed, structure, Schema.org markup and Google Search Console monitoring.'],
      ['Simple back office', 'You edit your pages, products and articles without touching the code.'],
    ],
    faq: [
      ['How long does it take to build a website?', 'A business website is usually delivered within a few weeks; an online shop or a platform takes longer depending on the features. The schedule is set in the quote.'],
      ['Will my website rank well on Google?', 'Every site is delivered with a solid SEO foundation: loading time, heading structure, tags, sitemap, structured data and Search Console setup.'],
      ['Can I add online payment in France?', 'Yes, we integrate CIB and Edahabia card payments, as well as cash on delivery and connections to delivery companies.'],
    ],
  },
  'developpement-application-mobile-france': {
    name: 'Mobile app', short: 'Native or cross-platform iOS and Android apps, from idea to store release.',
    h1: ['Mobile', 'app development', 'in France'],
    metaTitle: 'Mobile app development in France | iOS & Android — Codex',
    metaDesc: 'Codex develops iOS and Android mobile apps in Marseille: native and Flutter apps, from design to store release. 100k+ users.',
    intro: 'More than 100,000 people use the apps we have built. We design smooth, reliable and easy-to-use apps, then keep supporting them after release.',
    deliverables: [
      ['iOS & Android apps', 'A single Flutter or React Native codebase, or native code when needed.'],
      ['Interface design', 'User journeys and screens designed for your users and tested before development.'],
      ['Back end & API', 'Server, database, push notifications and admin dashboard.'],
      ['Payments & location', 'Online payment, maps, delivery tracking and offline features.'],
      ['Store release', 'Preparation and release on the App Store and Google Play.'],
      ['Monitoring & updates', 'Usage statistics, fixes, updates and new versions.'],
    ],
    faq: [
      ['Should I build a native or a cross-platform app?', 'For most projects, Flutter or React Native deliver iOS and Android from a single codebase, faster and at lower cost. We recommend native only if your product requires it.'],
      ['Do you handle publishing on the App Store and Google Play?', 'Yes, we prepare the listings and screenshots and handle the review process with Apple and Google.'],
      ['How much does a mobile app cost in France?', 'The cost depends on the number of screens, the features and the back end required. We send you a detailed quote after a first conversation.'],
    ],
  },
  'cloud-devops-france': {
    name: 'Cloud & DevOps', short: 'Hosting, automated deployments and infrastructure that handles the load.',
    h1: ['Cloud &', 'DevOps', 'for Francen companies'],
    metaTitle: 'Cloud & DevOps in France | Hosting, CI/CD — Codex',
    metaDesc: 'Cloud migration, hosting, CI/CD and monitoring for companies in France. Codex keeps your applications available, fast and easy to deploy.',
    intro: 'An application is only valuable if it stays available. We design, migrate and run reliable infrastructure, with automated deployments and continuous monitoring.',
    deliverables: [
      ['Cloud migration', 'Moving from physical servers to a local or international cloud, without downtime.'],
      ['CI/CD', 'Automated tests and deployments on every code change.'],
      ['Containers', 'Docker and orchestration for identical environments from laptop to production.'],
      ['Monitoring & alerts', 'Availability, performance and logs monitored continuously.'],
      ['Backups & disaster recovery', 'Tested automatic backups and a business continuity plan.'],
      ['Cost optimisation', 'Infrastructure sized to your real usage.'],
    ],
    faq: [
      ['Can you host our data in France?', 'Yes. Depending on your regulatory constraints, we deploy with Francen or international hosting providers and advise you on the best trade-off.'],
      ['What does DevOps bring to an SME?', 'More frequent, stress-free releases, fewer outages, and the ability to roll back in minutes if something goes wrong.'],
      ['Do you offer managed services?', 'Yes, we can run your infrastructure day to day: updates, security, backups and monitoring.'],
    ],
  },
  'data-analytics-france': {
    name: 'Data & Analytics', short: 'Dashboards, data consolidation and indicators to decide quickly.',
    h1: ['Data &', 'analytics', 'to steer your business'],
    metaTitle: 'Data & Analytics in France | Dashboards, BI — Codex',
    metaDesc: 'Codex consolidates your data and builds decision dashboards in Marseille: BI, automated reporting and real-time indicators.',
    intro: 'Your data is scattered across software, files and apps. We bring it together, make it reliable and turn it into indicators your teams check every day.',
    deliverables: [
      ['Dashboards', 'Sales, stock, finance and operations visible at a glance.'],
      ['Data warehouse', 'A single, reliable source fed automatically.'],
      ['Automated reporting', 'No more Excel reports prepared by hand every week.'],
      ['Connectors', 'ERP, CRM, e-commerce, advertising and files in one place.'],
      ['Advanced analysis', 'Forecasts, customer segmentation and anomaly detection.'],
      ['Team training', 'Your staff able to run their own analyses.'],
    ],
    faq: [
      ['Where should a data project start?', 'With your decisions: we identify the indicators you need, then the data sources required. A first dashboard can be delivered quickly.'],
      ['Does our data need to be clean to get started?', 'No. Cleaning and making the data reliable is part of our work, and we set up checks so the quality holds over time.'],
      ['Which tools do you use?', 'We work with Power BI, Metabase or custom dashboards, depending on your budget and your teams.'],
    ],
  },
  'cybersecurite-france': {
    name: 'Cybersecurity', short: 'Audits, penetration tests and hardening of your applications and infrastructure.',
    h1: ['Cybersecurity', 'in France', 'for SMEs'],
    metaTitle: 'Cybersecurity in France | Audits & penetration tests — Codex',
    metaDesc: 'Security audits, penetration tests and hardening of applications and infrastructure for SMEs in France. Codex fixes the priority vulnerabilities.',
    intro: 'A vulnerability found by an attacker always costs more than an audit. We assess your applications and infrastructure, fix the priority vulnerabilities and set up pragmatic monitoring.',
    deliverables: [
      ['Security audit', 'Applications, servers, network and cloud configuration examined in detail.'],
      ['Penetration tests', 'Simulated, authorised attacks to measure your real exposure.'],
      ['Vulnerability fixing', 'A prioritised action plan and the fixing of critical vulnerabilities.'],
      ['Hardening', 'Secure configuration of servers, access, passwords and backups.'],
      ['Monitoring', 'Detection of suspicious behaviour and real-time alerts.'],
      ['Awareness training', 'Training your teams on phishing and good practices.'],
    ],
    faq: [
      ['Does an SME really need a security audit?', 'Yes: SMEs are frequent targets because they are less protected. An audit quickly identifies the riskiest vulnerabilities and the fixes to make first.'],
      ['Can a penetration test disrupt our business?', 'Tests are planned with you, governed by a written scope and carried out so as not to interrupt your services.'],
      ['What does the audit report contain?', 'A readable summary for management, the technical detail of each vulnerability, its risk level and the recommended fix.'],
    ],
  },
  'marketing-digital-seo-france': {
    name: 'Digital marketing & SEO', short: 'Google rankings, content and campaigns to attract qualified customers.',
    h1: ['Digital marketing &', 'SEO', 'in France'],
    metaTitle: 'SEO & digital marketing agency in France — Codex',
    metaDesc: 'Search engine optimisation (SEO), local SEO in Marseille, content and advertising campaigns. Codex makes you visible on Google and AI engines.',
    intro: 'Reaching the first page of Google in France is not a matter of luck. We combine technical SEO, useful content and targeted campaigns to bring qualified customers to your business.',
    deliverables: [
      ['SEO audit', 'Technical, keyword and competitor analysis of your website.'],
      ['Local SEO', 'Google Business profile, reviews and visibility on “near me” searches in Marseille and across France.'],
      ['Content', 'Pages and articles in French and Arabic that answer your customers’ searches.'],
      ['AI visibility (GEO)', 'Structured content so ChatGPT, Gemini and Perplexity cite you.'],
      ['Online advertising', 'Google Ads, Meta and TikTok campaigns managed by cost per customer.'],
      ['Monitoring & reporting', 'Rankings, traffic and conversions tracked every month.'],
    ],
    faq: [
      ['How long does it take to see SEO results?', 'The first gains often appear within a few weeks on local searches; competitive rankings are built over several months. We measure progress every month.'],
      ['What is GEO?', 'Generative Engine Optimization means structuring your content so AI assistants such as ChatGPT or Gemini cite your company in their answers.'],
      ['Do you do SEO in Arabic?', 'Yes, we optimise content in French and Arabic, because your customers search in both languages.'],
    ],
  },
  'design-ui-ux-france': {
    name: 'Graphic & UI/UX design', short: 'Visual identity, interfaces and experiences that build trust at first glance.',
    h1: ['UI/UX', 'design', '& visual identity'],
    metaTitle: 'UI/UX design & visual identity in France — Codex',
    metaDesc: 'Codex creates visual identities, web and mobile interfaces and prototypes in Marseille. Design that builds trust and makes things easy to use.',
    intro: 'Good design goes unnoticed: it makes things obvious. We create consistent identities and interfaces, tested with real users and ready to be developed.',
    deliverables: [
      ['Visual identity', 'Logo, colours, typefaces and complete brand guidelines.'],
      ['Interface design', 'Consistent, accessible and modern web and mobile screens.'],
      ['User research', 'Interviews and tests to validate user journeys before development.'],
      ['Prototypes', 'Interactive mock-ups to test and present your product.'],
      ['Design system', 'A component library that keeps your product consistent.'],
      ['Print & digital materials', 'Brochures, presentations, social media and signage.'],
    ],
    faq: [
      ['Why invest in UX?', 'A clear interface reduces errors, support requests and user drop-off. It is often the most profitable lever of a digital product.'],
      ['Do you deliver the source files?', 'Yes, you receive the Figma files, the logos in every format and the brand guidelines.'],
      ['Can you redesign only the interface of an existing app?', 'Yes, we can rethink the interface and then implement it with your developers or with our team.'],
    ],
  },
});

export const marquee = ['Custom software', 'Websites', 'Mobile apps', 'Cloud & DevOps', 'Data', 'Cybersecurity', 'SEO', 'UI/UX'];

export const sectors = [
  { name: 'Retail & e-commerce', text: 'Online shops, local payment, stock and delivery management, loyalty programmes.' },
  { name: 'Industry & manufacturing', text: 'Production tracking, maintenance, traceability and dashboards for factories and workshops.' },
  { name: 'Healthcare', text: 'Appointment booking, patient records, clinic and laboratory management, in full confidentiality.' },
  { name: 'Education & training', text: 'E-learning platforms, school management, online enrolment and apps for students and parents.' },
  { name: 'Logistics & transport', text: 'Fleet tracking, warehouse management, driver apps and real-time customer portals.' },
  { name: 'Services & institutions', text: 'Citizen and customer portals, paperless procedures, CRM and internal tools.' },
];

export const techs = fr.techs;
export const heroWords = ['digital', 'mobile', 'connected', 'secure', 'intelligent'];

export const serviceExtras = {
  'logiciel-sur-mesure-france': {
    useCases: ['Your teams juggle Excel, WhatsApp and several pieces of software', 'Your current ERP can no longer keep up with your growth', 'You want to launch your own SaaS product', 'You need to connect your tools together'],
    guide: { title: 'How to succeed with a custom software project in France', paras: [
      'Successful business software starts with your processes, not with technology. Before writing any code, we map with your teams how information flows: who enters it, who approves it, who looks it up. This work avoids useless features and reveals the real time savings.',
      'We then deliver in phases. A first version covers the core of your business and can be used quickly; the next modules are added based on feedback from the field. This approach reduces risk and lets you measure the return on investment from the very first weeks.',
      'Finally, custom software must stay in your hands. The source code, documentation and access belong to you, and the application is hosted according to your constraints, in France or abroad.',
    ] },
  },
  'creation-site-web-marseille': {
    useCases: ['You do not have a website yet, or it generates no enquiries', 'Your website is slow, outdated or poorly ranked', 'You want to sell online everywhere in France', 'You target customers in French, Arabic and English'],
    guide: { title: 'What makes a good professional website in France', paras: [
      'Most visitors in France browse on mobile, often on 4G. A good website is therefore fast first of all: optimised images, light code, suitable hosting. Every second of loading time saved translates directly into more enquiries and sales.',
      'A website then needs to be found. We structure each page around your customers’ real searches, for example “website design Marseille” or “online shop France”, with headings, content and structured data that Google and AI assistants understand.',
      'Finally, a website must convert: clear messages, trust signals, visible calls to action, WhatsApp and phone in one tap, and for e-commerce, CIB, Edahabia or cash-on-delivery payment.',
    ] },
  },
  'developpement-application-mobile-france': {
    useCases: ['You want to build customer loyalty with a branded app', 'Your field teams need a mobile tool', 'You are launching a startup or a new service', 'Your current app is slow or poorly rated'],
    guide: { title: 'The steps to building a successful mobile app', paras: [
      'A successful app solves a precise problem better than what already exists. We start by defining your users’ main journey and the few features that will bring them back every day, before thinking about the rest.',
      'We then design the screens and test them on real phones before development. With Flutter or React Native, a single codebase powers iOS and Android, which shortens timelines and reduces maintenance costs.',
      'Release is only the beginning. Usage statistics, user feedback and store ratings guide the next versions. We stay at your side to evolve the app and keep it compatible with new system versions.',
    ] },
  },
  'cloud-devops-france': {
    useCases: ['Your website or app goes down during traffic peaks', 'Releases are long and risky', 'You have no tested backup', 'You want to reduce your hosting costs'],
    guide: { title: 'Why cloud and DevOps are a game-changer for an SME', paras: [
      'DevOps means automating everything between writing code and putting it online: tests, builds, deployment and monitoring. The result: frequent updates without downtime, and the ability to roll back in minutes.',
      'The cloud lets resources follow real usage. Rather than paying for an oversized server all year round, the infrastructure adjusts to activity peaks, for example during Ramadan or the sales.',
      'We choose with you between hosting in France and an international cloud according to your data, latency and budget constraints, and we document every element so your team stays in control.',
    ] },
  },
  'data-analytics-france': {
    useCases: ['Your reports are prepared by hand every week', 'Nobody has the same version of the figures', 'You want to follow your sales and stock in real time', 'You have data but few decisions based on it'],
    guide: { title: 'Turning your data into decisions', paras: [
      'A useful data project starts from the decisions to be made: which indicators does management look at every Monday? Which figures are the sales teams missing? We start from these questions to define the priority dashboards.',
      'We then connect your sources, ERP, CRM, e-commerce and Excel files, in a single data warehouse, cleaned and updated automatically. No more conflicting figures between departments.',
      'Dashboards are designed to be read in seconds, on desktop as on mobile, and your teams are trained to create their own analyses.',
    ] },
  },
  'cybersecurite-france': {
    useCases: ['You have never had your website or servers audited', 'You handle customer or financial data', 'You have suffered an intrusion or phishing attempt', 'A customer or partner requires security guarantees'],
    guide: { title: 'Cybersecurity basics for an Francen company', paras: [
      'Most incidents come from simple weaknesses: weak passwords, outdated software, missing backups, overly broad access. An audit quickly identifies these points and ranks them by risk level.',
      'Penetration tests go further by simulating a real attack, within a written and authorised framework, to measure what an attacker could actually reach. The report explains each vulnerability in plain language and proposes a fix.',
      'Security is a continuous process: monitoring, updates, tested backups and phishing awareness for your teams. We set up these routines pragmatically, suited to the size of your company.',
    ] },
  },
  'marketing-digital-seo-france': {
    useCases: ['Your competitors appear before you on Google', 'Your website gets visits but few enquiries', 'You spend on advertising without measuring the results', 'You want to be recommended by ChatGPT and Gemini'],
    guide: { title: 'Ranking first on Google in France: our method', paras: [
      'Search engine optimisation rests on three pillars: a healthy technical base (speed, structure, indexing), content that precisely answers your customers’ searches, and a reputation built through links, citations and reviews.',
      'In France, local SEO is often the fastest lever: a complete Google Business profile, regular customer reviews and identical information across all directories let you appear in “near me” searches and on Google Maps.',
      'AI assistants are becoming a new way in. GEO means publishing clear, structured and verifiable information about your company so that ChatGPT, Gemini or Perplexity cite it in their answers.',
    ] },
  },
  'design-ui-ux-france': {
    useCases: ['Your image no longer reflects the quality of your offer', 'Your users get lost in your app', 'You are launching a product and want to test it before developing it', 'Your materials lack consistency'],
    guide: { title: 'Design that builds trust and makes things easy to use', paras: [
      'A strong identity is recognised at a glance: a simple logo, a consistent palette, readable typography and clear rules to apply them everywhere, from the website to social media and printed documents.',
      'On the product side, interface design starts with research: understanding users, their goals and their frustrations. Mock-ups are tested and refined before development, which avoids costly corrections.',
      'We deliver a complete design system, components, colours and spacing, which keeps your product consistent as it evolves and speeds up the developers’ work.',
    ] },
  },
};

export const projects = bySlug(fr.projects, {
  'erp-bz-telecom': { type: 'ERP software', text: 'Custom ERP to steer the business: sales dashboard, financial tracking, indicators and real-time charts.', more: 'Steering happens in a web dashboard. The published app linked to this project is called Meryouma, on Google Play and the App Store.', tags: ['ERP', 'Dashboard', 'Web'], features: [
    { title: 'Sales dashboard', text: 'Sales are read in a dashboard, in the same place as the rest of the business.' },
    { title: 'Financial tracking', text: 'Financial tracking is part of the same steering tool.' },
    { title: 'Management indicators', text: 'Indicators summarise the business so it can be followed without opening every file.' },
    { title: 'Real-time charts', text: 'The dashboard charts update in real time.' },
  ] },
  'skoda-imdes': { type: 'Mobile app', text: 'Mobile app for managing part measurement requests: issue sheets, request tracking and login with a mobile certificate.', more: 'It is an internal industry tool. Codex does not publish a public download link for this project.', tags: ['iOS', 'Android', 'Industry'], features: [
    { title: 'Part measurement requests', text: 'The app is used to submit and follow part measurement requests.' },
    { title: 'Issue sheets', text: 'Each request can include an issue sheet.' },
    { title: 'Request tracking', text: 'The progress of requests is followed in the app.' },
    { title: 'Login with a mobile certificate', text: 'Access is through a mobile certificate.' },
  ] },
  'ondefoc': { type: 'Website', text: 'Institutional website for ONDEFOC (ondefoc.dz): a modern showcase to present its offer and make information easier to access.', more: 'The website is live at ondefoc.dz. It presents ONDEFOC’s offer and makes information easier to find.', tags: ['Institutional website', 'Responsive'], features: [
    { title: 'Modern institutional showcase', text: 'The site is an institutional showcase, designed to present ONDEFOC.' },
    { title: 'Presentation of the offer', text: 'The organisation’s offer is presented to the visitor.' },
    { title: 'Easier access to information', text: 'The pages are organised so information is easier to find.' },
    { title: 'Display adapted to every screen', text: 'The layout adapts to the phone, the tablet and the computer.' },
  ] },
  'valuetherm': { type: 'Mobile app', text: 'Distribution app: product catalogue, promotions and ordering from mobile for customers and resellers.', more: 'It is for customers and resellers. The Valuetherm website is live at valuetherm.com.', tags: ['iOS', 'Android', 'Distribution'], features: [
    { title: 'Product catalogue', text: 'Products are browsed in a catalogue, from the phone.' },
    { title: 'Promotions', text: 'Current promotions are visible in the app.' },
    { title: 'Mobile ordering', text: 'Orders are placed from the phone, without another channel.' },
    { title: 'Access for customers and resellers', text: 'The same tool serves customers and resellers.' },
  ] },
  'az-fulfillment': { type: 'Management platform', text: 'Management platform for e-commerce “from A to Z”: orders, stock and statistics brought together in a single dashboard.', more: 'The platform is live at az-fulfillment.app. Orders, stock and statistics are brought together there.', tags: ['Logistics', 'E-commerce', 'Data'], features: [
    { title: 'Order management', text: 'Orders are followed in the platform, with the rest of the activity.' },
    { title: 'Stock management', text: 'Stock is managed in the same place as orders.' },
    { title: 'Statistics', text: 'Statistics summarise the e-commerce activity.' },
    { title: 'Single dashboard', text: 'Orders, stock and statistics sit in one dashboard.' },
  ] },
  'rihla-travel': { type: 'Mobile app', text: 'Travel agency app: services, promotions and popular offers that can be browsed and booked from the phone.', more: 'The Android app is published on Google Play. Services, promotions and offers can be browsed and booked there.', tags: ['iOS', 'Android', 'Tourism'], features: [
    { title: 'Agency services', text: 'The travel agency’s services are available from the phone.' },
    { title: 'Promotions', text: 'Current promotions are shown in the app.' },
    { title: 'Popular offers', text: 'The most requested offers are highlighted.' },
    { title: 'Booking from the phone', text: 'Booking happens in the app, without leaving the phone.' },
  ] },
  'levva-gym': { type: 'Mobile app', text: 'LEVVA GYM app with a built-in shop: collections, featured products and purchase in a few taps.', more: 'The Android app is published on Google Play. The shop, the collections and the purchase sit in the same app.', tags: ['iOS', 'Android', 'Sport & retail'], features: [
    { title: 'Built-in shop', text: 'The shop is inside the app, not on a separate website.' },
    { title: 'Collections', text: 'Products are organised into collections.' },
    { title: 'Featured products', text: 'Some products are featured in the shop.' },
    { title: 'Purchase in a few taps', text: 'The purchase is completed in a few taps, from the phone.' },
  ] },
  'sijour-shop': { type: 'Mobile app', text: 'Sijour Shop e-commerce and affiliate app: catalogue, trending products and ordering from the phone.', more: 'Sijour Shop certified the delivery of this mobile app.', tags: ['E-commerce', 'Affiliate'], features: [
    { title: 'Product catalogue', text: 'Products are browsed in a catalogue, from the phone.' },
    { title: 'Trending products', text: 'Trending products are highlighted in the app.' },
    { title: 'E-commerce and affiliate', text: 'The app serves e-commerce and affiliation.' },
  ] },
  'the-doctor': { type: 'Mobile app', text: 'The Doctor health app, built for BITA Equipement: a directory of medical specialties, with search.', more: 'BITA Equipement certified the delivery of The Doctor V10.0.', tags: ['Health', 'Directory'], features: [
    { title: 'Medical specialties', text: 'Specialties are browsed in a directory.' },
    { title: 'Search', text: 'A search finds a specialty.' },
  ] },
  'mazad': { type: 'Mobile app', text: 'Mazad property app: search criteria (location, property types) and follow-up of selected properties.', tags: ['Property', 'Search'], features: [
    { title: 'Search criteria', text: 'Search is filtered by location and by property type.' },
    { title: 'Suggestions', text: 'Suggestions propose properties that match the criteria.' },
    { title: 'Agenda of selected properties', text: 'The agenda follows selected properties: visit dates, auction results and comments.' },
  ] },
  'akhbar-dzair': { type: 'Website', text: 'Akhbar Dzair news website, live at akhbardzair.dz.', tags: ['Media', 'News'], features: [
    { title: 'News website', text: 'The website presents Akhbar Dzair news.' },
    { title: 'Public address', text: 'The website is announced at akhbardzair.dz.' },
  ] },
  'bladi-plus': { type: 'Mobile app', text: 'Bladi Plus app: news, sport and video. The website is announced at bladi.plus.', tags: ['Media', 'Sport', 'Video'], features: [
    { title: 'News and sport', text: 'The app brings together news and sport.' },
    { title: 'Video', text: 'Content is watched as video in the app.' },
  ] },
});

export const eventLinks = {
  'Web Summit 2026': [{ url: 'https://qatar.websummit.com/', label: 'Official website', kind: 'site' }],
  'Fintech & E-commerce Summit 2024': [{ url: 'https://news.radioalgerie.dz/fr/node/41717', label: 'Radio Algérienne (in French)', kind: 'press' }],
};

export const eventInfo = {
  'Web Summit 2026': 'Exhibiting at Web Summit Qatar 2026 in Doha, one of the biggest tech events in the world, including a slot on the Startup Showcase stage.',
  'Fintech & E-commerce Summit 2024': 'Codex stand at the Fintech & E-commerce Summit organised by Guiddini, from 5 to 7 March 2024 at ESHRA (the Marseille higher school of hospitality and catering).',
  'Webexpo France 2024': 'The whole Codex team on its stand at Webexpo France 2024: demos of our apps and meetings with companies.',
  'ACF 2023': 'Codex exhibiting at the 3rd edition of ACF, from 15 to 17 June 2023: presentation of our development services and our projects.',
  'Webexpo 2023': 'Codex stand at Webexpo 2023, from 25 to 27 May 2023: meetings with project owners, partners and professional visitors.',
  'France Export Services Fair 2026': 'Codex at the France Export Services Fair 2026, held under the aegis of the Ministry of Foreign Trade: our software solutions presented to export-oriented companies.',
};

export const clients = fr.clients.map(([id, n]) => [id, { 'huissiers-de-justice': 'National Chamber of Bailiffs', 'labo-ibn-sina': 'Ibn Sina Laboratory', 'laboratoire-dr-maout': 'Dr Maout Laboratory', 'youth-idea': 'Youth Idea (Un Jeune Une Idée)' }[id] || n]);

// tr = language the quote was translated from (the French site shows the English quote as is).
const dates = { '10 juillet 2024': '10 July 2024', '7 septembre 2025': '7 September 2025', '16 février 2025': '16 February 2025', '8 mars 2024': '8 March 2024', '10 mars 2024': '10 March 2024', '11 novembre 2025': '11 November 2025', '6 octobre 2026': '6 October 2026', 'depuis juillet 2023': 'since July 2023', '20 octobre 2026': '20 October 2026' };
const tEn = {
  chocran: { tag: 'Exceptional experience', hl: 'remarkable expertise', role: 'Manager', project: 'Sales, production and distribution ERP + chocran.com website', quote: 'Our collaboration with Codex proved to be an exceptionally positive experience. Their team demonstrated remarkable expertise and unwavering dedication throughout our joint projects.' },
  heronys: { tag: 'Delivered on schedule' },
  'bita-equipement': { tag: 'Professionalism', hl: 'exceptional professionalism', role: 'Manager', quote: 'Codex demonstrated exceptional professionalism throughout our partnership. Their teams showed constant commitment to excellence, proven technical skills and great responsiveness to our needs.' },
  'huissiers-de-justice': { tag: 'Commitments honoured', hl: 'in line with the required standards', client: 'National Chamber of Bailiffs', role: 'President of the National Chamber', project: 'Website, digital platform and mobile app', quote: 'SARL GROUPE CODEX fulfilled all its commitments relating to the design and development of a website, a digital platform and a mobile app for the Chamber, in line with the required standards.' },
  'sijour-shop': { tag: 'Quality & deadlines', hl: 'finished on time', role: 'General Manager', project: 'Sijour Shop mobile app', quote: 'Codex did quality work, with professionalism, and they finished on time.' },
  'farben-malakoot': { tag: 'Recommended', hl: 'We warmly recommend the services of CODEX', role: 'Manager', project: 'Pharmazone app', quote: 'CODEX fully honoured the commitments made and met all contractual obligations. We warmly recommend the services of CODEX.' },
  'kmondi-shop': { tag: 'Remarkable collaboration', hl: 'great professionalism', role: 'App owner', project: 'Kmondi Shop e-commerce app', quote: 'Codex showed great professionalism at every stage of the project, whether in communication, design or the technical aspects of the app. Working with them was remarkable and flexible.' },
  'khabar-press': { tag: 'Technical support', hl: 'support and technical assistance', role: 'Alaa Media agency', project: 'Website of the Khabar Press online newspaper', quote: 'The project was carried out satisfactorily, honouring the commitments for development, programming, installation, support and technical assistance.' },
  'hak-el-bac': { tag: 'Development & hosting', hl: 'professional with good support', project: 'Prof Billal mobile app (Android / iOS)', quote: 'Codex developed and hosted our Prof Billal Android/iOS mobile app; the services were professional with good support.' },
  mpi: { tag: 'Satisfied client', hl: 'satisfied with the work carried out', role: 'Manager', project: 'Website design and development', quote: 'We certify that the services were performed in line with the stated needs and we declare ourselves satisfied with the work carried out.' },
  'youth-idea': { tag: 'Satisfied client', hl: 'satisfied with the work carried out', role: 'Manager', project: 'Website design and development', quote: 'We certify that the services were performed in line with the stated needs and we declare ourselves satisfied with the work carried out.' },
  'axxam-business-hub': { tag: 'Satisfied client', hl: 'satisfied with the work carried out', role: 'Manager', project: 'Website design and development', quote: 'We certify that the services were performed in line with the stated needs and we declare ourselves satisfied with the work carried out.' },
};
export const testimonials = fr.testimonials.map((t) => ({ ...t, ...tEn[t.cert], date: dates[t.date] ?? t.date, tr: t.cert === 'heronys' ? undefined : (t.lang === 'ar' ? 'ar' : 'fr') }));

const roles = {
  'malek-hemmak': ['General Manager', 'Master’s degree in computer science, with more than ten years of experience in full-stack and mobile development. He builds and leads high-performing development teams and scalable software solutions.'],
  'mourad-hamdaoui': ['Business Development Manager'],
  'zakarya-djaalab': ['Manager, Codex Europe', 'Manager of Codex Europe. He runs the studio’s activity in Marseille and makes sure every client in France is supported with high standards, from the first conversation to delivery.'],
  'hocine-belgacem': ['Manager, Codex Qatar', 'IT entrepreneur with a master’s degree and more than ten years of management experience in hospitality. He brings leadership, operational excellence and customer focus, and leads development teams that deliver scalable digital solutions.'],
  'billel-souane': ['Chief AI Officer (CAIO)', 'Master’s degree in algebra and cryptography, specialist in artificial intelligence, advanced algorithms and secure systems design. He aligns emerging technologies with strategy and growth.'],
  'derradji-kermiche': ['Senior full-stack developer', 'Master’s degree in computer science. Builds software products end to end, from modern web and mobile technologies to system architecture.'],
  'mohamed-haoud': ['Senior mobile developer', 'Bachelor’s degree in computer science. Has developed and launched many mobile apps, from design to deployment.'],
  'younes-achour': ['Project manager', 'Master’s degree in human resources management. Planning, team coordination and running projects from design to delivery.'],
  'amina-remini': ['Project manager', 'Project manager passionate about leading teams and coordinating projects. She excels at communication and makes sure every project is delivered on time and to the highest standards.'],
  'ziad-hemmak': ['Senior web developer', 'Web developer and architect combining design and technical expertise, for scalable web solutions and smooth experiences.'],
  'selma-chergue': ['Sales representative'],
  'imene-souag': ['UI/UX designer'],
  'dhikra-slimani': ['Graphic designer'],
  'islam-kermiche': ['Back-end developer'],
  'walid-larachi': ['SOC analyst (cybersecurity)'],
  'aourassi-sahraoui': ['DevOps engineer'],
  'ouala-eddine-ali': ['Mobile developer'],
  'kaddour-djakkam': ['Front-end developer'],
  'fella-hellal': ['Quality assurance specialist'],
  'mina-sehili': ['Senior UI/UX designer', 'UI/UX designer and production engineer. Creates user-centred experiences and interfaces that turn ideas into engaging products.'],
  'taha-benlala': ['UI/UX designer'],
  'ibrahim-el-zayni': ['AI architect (trainee)'],
  'yasmine-ayach': ['Marketing specialist'],
  'hamid-shiraz': ['SOC analyst (trainee)'],
  'meriem-amirat': ['Accountant'],
  'abdesamie-selama': ['Videographer (part-time)'],
};
export const team = fr.team.map((m) => ({ ...m, role: roles[m.id][0], ...(roles[m.id][1] ? { bio: roles[m.id][1] } : {}) }));
