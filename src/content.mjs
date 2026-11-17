// Every piece of copy on the site lives here. Facts (figures, contacts, events)
// come from codexeurope.com; keep them in sync with the company.

export const site = {
  url: 'https://codexeurope.com',
  name: 'Codex',
  legalName: 'SARL Groupe Codex',
  founded: '2014',
  email: 'contact@codexeurope.com',
  phones: ['+33 6 05 82 50 51'],
  whatsapp: '33605825051',
  address: {
    street: 'Rue de la République',
    locality: 'Marseille',
    region: 'France',
    postal: '13002',
    country: 'FR',
    lat: 43.2964,
    lng: 5.374,
  },
  // Head office is the published Marseille address. Doha stays as the other published office.
  offices: [
    { city: 'Marseille', country: 'France', code: 'FR', label: 'Siège', lines: ['Rue de la République', '13002 Marseille'], street: 'Rue de la République', postal: '13002', lat: 43.2964, lng: 5.374 },
    { city: 'Doha', country: 'Qatar', code: 'QA', label: 'Bureau Qatar', lines: ['Building No. 157, Street No. 301, Zone 69', 'PO Box 8388, Doha'], street: 'Building No. 157, Street No. 301, Zone 69', po: 'PO Box 8388', phone: '+974 5066 5151' },
  ],
  // Profiles as printed on the Codex stand banner. They feed the footer, the social rail and the
  // Organization schema (sameAs), which matters a lot for AI/GEO visibility. Add LinkedIn etc. here.
  socials: [
    { label: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/CodexEurope' },
    { label: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/codex_europe/' },
  ],
  // Salons where Codex exhibited, newest first (names as shown on the event banners/badges).
  events: ['Web Summit 2026', 'France Export Services Fair 2026', 'Fintech & E-commerce Summit 2024', 'Webexpo France 2024', 'ACF 2023', 'Webexpo 2023'],
};

export const stats = [
  { value: 300, suffix: '+', label: 'Clients accompagnés' },
  { value: 450, suffix: '+', label: 'Projets livrés' },
  { value: 100, suffix: 'k+', label: 'Utilisateurs sur nos apps' },
  { value: 20, suffix: '+', label: 'Produits édités' },
  { value: 2, suffix: 'M', label: 'Lignes de code en production' },
  { value: 15, suffix: '+', label: 'Ingénieurs et designers' },
];

export const process = [
  {
    title: 'Découverte',
    text: 'Un atelier pour comprendre votre métier, vos utilisateurs et vos contraintes. Vous repartez avec un périmètre clair, un planning et un devis détaillé.',
    points: ['Atelier de cadrage', 'Cahier des charges', 'Devis et planning'],
  },
  {
    title: 'Conception',
    text: 'Parcours, maquettes et architecture technique. Vous validez chaque écran avant qu’une seule ligne de code ne soit écrite.',
    points: ['UX et wireframes', 'Design UI', 'Architecture'],
  },
  {
    title: 'Développement',
    text: 'Des sprints courts, une démo à chaque étape et un accès permanent à l’avancement. Le code est testé, documenté et vous appartient.',
    points: ['Sprints et démos', 'Tests et recette', 'Documentation'],
  },
  {
    title: 'Lancement & suivi',
    text: 'Mise en production, formation de vos équipes, puis maintenance et évolutions. Nous restons votre équipe technique après la livraison.',
    points: ['Mise en ligne', 'Formation', 'Maintenance'],
  },
];

export const reasons = [
  { title: 'Une équipe en France, depuis 2014', text: 'Pas d’intermédiaire ni de sous-traitance cachée : vous travaillez directement avec les ingénieurs qui construisent votre produit, à Marseille.' },
  { title: 'Du produit, pas des promesses', text: 'Plus de 450 projets livrés et plus de 20 produits édités par nos soins. Nous pouvons vous montrer ce qui tourne en production.' },
  { title: 'Pensé pour le marché français', text: 'Interfaces en français, arabe et anglais, paiement CIB et Edahabia, hébergement et performances adaptés aux réseaux locaux.' },
  { title: 'SEO intégré dès le premier jour', text: 'Structure, vitesse, données structurées et contenus : chaque site est construit pour être trouvé sur Google, pas seulement pour être beau.' },
  { title: 'Maintenance après livraison', text: 'Mises à jour, sauvegardes, sécurité et évolutions. Un interlocuteur unique qui connaît votre code et répond quand vous en avez besoin.' },
  { title: 'Vous restez propriétaire', text: 'Code source, comptes, noms de domaine et données vous appartiennent. Aucune dépendance artificielle à notre agence.' },
];

export const work = [
  { tag: 'Web & e-commerce', title: 'Sites et boutiques qui convertissent', text: 'Sites vitrines, plateformes et e-commerce rapides, référencés et administrables.', mock: 'shop', href: '/fr/services/creation-site-web-marseille' },
  { tag: 'Mobile', title: 'Applications iOS & Android', text: 'Des apps natives et multiplateformes utilisées chaque jour par plus de 100 000 personnes.', mock: 'app', href: '/fr/services/developpement-application-mobile-france' },
  { tag: 'Logiciel métier', title: 'ERP, CRM et outils internes', text: 'Des logiciels sur mesure qui remplacent les fichiers Excel et automatisent vos opérations.', mock: 'erp', href: '/fr/services/logiciel-sur-mesure-france' },
  { tag: 'Data', title: 'Tableaux de bord décisionnels', text: 'Vos données consolidées en indicateurs clairs, en temps réel, pour décider plus vite.', mock: 'data', href: '/fr/services/data-analytics-france' },
];

export const homeFaq = [
  { q: 'Qui est Codex ?', a: 'Codex (SARL Groupe Codex) est un studio logiciel et une agence IT indépendante basée à Marseille, fondée en 2014. Nous concevons des logiciels sur mesure, des sites web, des applications mobiles et des solutions cloud, data et cybersécurité pour des entreprises en France et à l’international. SARL Groupe Codex est reconnue n° 1 en France, n° 2 en Afrique et n° 1 dans le CCG.' },
  { q: 'Quels services propose Codex ?', a: 'Développement de logiciels sur mesure et SaaS, création de sites web et e-commerce, applications mobiles iOS et Android, cloud et DevOps, data et analytics, cybersécurité, marketing digital et SEO, ainsi que design graphique et UI/UX.' },
  { q: 'Où se trouve l’agence Codex ?', a: 'Le siège est à Marseille, Rue de la République, 13002. Le bureau de Doha est au Building No. 157, Street No. 301, Zone 69, PO Box 8388. Nous travaillons en France et à l’international, sur place ou à distance.' },
  { q: 'Combien coûte un site web ou une application en France ?', a: 'Le prix dépend du périmètre : nombre de pages ou d’écrans, fonctionnalités, intégrations et paiement en ligne. Après un premier échange sur vos besoins, nous vous remettons un devis détaillé, avec un planning et des étapes de validation.' },
  { q: 'Dans quelles langues développez-vous ?', a: 'Nous livrons des sites et des applications en français, en arabe (avec mise en page de droite à gauche) et en anglais, avec un référencement optimisé pour chaque langue.' },
  { q: 'Assurez-vous la maintenance après la mise en ligne ?', a: 'Oui. Nous proposons la maintenance, l’hébergement, les sauvegardes, les mises à jour de sécurité et les évolutions fonctionnelles, avec un interlocuteur dédié qui connaît votre projet.' },
  { q: 'Comment démarrer un projet avec Codex ?', a: 'Écrivez-nous à contact@codexeurope.com, appelez le +33 6 05 82 50 51, envoyez un message WhatsApp ou remplissez le formulaire de contact. Nous revenons vers vous pour organiser un premier échange.' },
];

export const services = [
  {
    slug: 'logiciel-sur-mesure-france',
    name: 'Logiciel sur mesure',
    short: 'ERP, CRM, plateformes SaaS et outils internes conçus autour de vos processus.',
    h1: ['Développement de', 'logiciel', 'sur mesure en France'],
    metaTitle: 'Développement logiciel sur mesure en France | ERP, SaaS — Codex',
    metaDesc: 'Codex conçoit des logiciels sur mesure à Marseille : ERP, CRM, SaaS et outils métiers. Studio fondé en 2014, 450+ projets livrés. Demandez votre devis.',
    intro: 'Les logiciels du marché vous obligent à adapter votre entreprise à leurs limites. Nous faisons l’inverse : nous construisons l’outil autour de votre façon de travailler, puis nous le faisons évoluer avec vous.',
    icon: 'software',
    deliverables: [
      ['ERP et gestion commerciale', 'Stocks, achats, ventes, facturation et comptabilité réunis dans un seul outil.'],
      ['CRM et suivi client', 'Pipeline commercial, relances, historique et tableaux de bord pour vos équipes.'],
      ['Plateformes SaaS', 'Produits multi-clients avec abonnements, rôles et facturation intégrée.'],
      ['Outils internes', 'Applications métier qui remplacent les fichiers Excel et les tâches manuelles.'],
      ['Intégrations & API', 'Connexion à vos logiciels existants, à la paie, à la banque ou aux transporteurs.'],
      ['Migration et refonte', 'Modernisation d’applications anciennes sans interrompre votre activité.'],
    ],
    stack: ['Laravel', 'Node.js', 'React', 'Vue.js', 'PostgreSQL', 'MySQL', 'Docker', 'REST & GraphQL'],
    faq: [
      ['Pourquoi choisir un logiciel sur mesure plutôt qu’une solution du marché ?', 'Un logiciel sur mesure suit exactement vos processus, n’impose pas de licences par utilisateur et évolue selon vos besoins. Il devient un actif de votre entreprise, dont vous possédez le code.'],
      ['Combien de temps faut-il pour développer un logiciel métier ?', 'Une première version utilisable est généralement livrée en quelques semaines à quelques mois selon le périmètre. Nous découpons le projet en lots pour que vos équipes l’utilisent le plus tôt possible.'],
      ['Pouvez-vous reprendre un logiciel existant ?', 'Oui. Nous auditons le code, sécurisons l’existant puis planifions les évolutions ou une refonte progressive.'],
    ],
  },
  {
    slug: 'creation-site-web-marseille',
    name: 'Création de site web',
    short: 'Sites vitrines, e-commerce et plateformes web rapides, sécurisés et bien référencés.',
    h1: ['Création de', 'site web', 'à Marseille'],
    metaTitle: 'Création de site web à Marseille | Agence web & e-commerce — Codex',
    metaDesc: 'Agence de création de site web à Marseille : sites vitrines, e-commerce et plateformes sur mesure, rapides et optimisés SEO, en français, arabe et anglais.',
    intro: 'Votre site est souvent le premier contact avec vos clients. Nous concevons des sites rapides, élégants et pensés pour convertir, avec un référencement technique intégré dès le premier jour.',
    icon: 'web',
    deliverables: [
      ['Site vitrine', 'Une présence professionnelle qui présente votre offre et génère des demandes.'],
      ['E-commerce', 'Catalogue, panier, paiement CIB / Edahabia et paiement à la livraison.'],
      ['Plateformes web', 'Portails clients, marketplaces, réservations et espaces membres.'],
      ['Multilingue FR / AR / EN', 'Contenus et mise en page de droite à gauche pour l’arabe.'],
      ['SEO technique', 'Vitesse, structure, balisage Schema.org et suivi Google Search Console.'],
      ['Back-office simple', 'Vous modifiez vos pages, produits et articles sans toucher au code.'],
    ],
    stack: ['Next.js', 'React', 'Laravel', 'WordPress', 'WooCommerce', 'Tailwind CSS', 'Cloudflare'],
    faq: [
      ['Quel est le délai pour créer un site web ?', 'Un site vitrine est généralement livré en quelques semaines ; un e-commerce ou une plateforme demande davantage selon les fonctionnalités. Le planning est fixé dès le devis.'],
      ['Mon site sera-t-il bien référencé sur Google ?', 'Chaque site est livré avec une base SEO solide : temps de chargement, structure des titres, balises, sitemap, données structurées et configuration de la Search Console.'],
      ['Puis-je intégrer le paiement en ligne en France ?', 'Oui, nous intégrons le paiement par carte CIB et Edahabia, ainsi que le paiement à la livraison et la connexion à des sociétés de livraison.'],
    ],
  },
  {
    slug: 'developpement-application-mobile-france',
    name: 'Application mobile',
    short: 'Applications iOS et Android natives ou multiplateformes, de l’idée à la publication.',
    h1: ['Développement', 'd’application mobile', 'en France'],
    metaTitle: 'Application mobile en France | iOS & Android — Codex',
    metaDesc: 'Codex développe des applications mobiles iOS et Android à Marseille : apps natives et Flutter, de la conception à la publication sur les stores. 100k+ utilisateurs.',
    intro: 'Plus de 100 000 personnes utilisent les applications que nous avons construites. Nous concevons des apps fluides, fiables et simples à utiliser, puis nous les accompagnons après leur publication.',
    icon: 'mobile',
    deliverables: [
      ['Apps iOS & Android', 'Une seule base de code Flutter ou React Native, ou du natif quand c’est nécessaire.'],
      ['Design d’interface', 'Parcours et écrans pensés pour vos utilisateurs et testés avant le développement.'],
      ['Back-end & API', 'Serveur, base de données, notifications push et tableau d’administration.'],
      ['Paiement & géolocalisation', 'Paiement en ligne, cartes, suivi de livraison et fonctions hors ligne.'],
      ['Publication sur les stores', 'Préparation et publication sur l’App Store et Google Play.'],
      ['Suivi & évolutions', 'Statistiques d’usage, correctifs, mises à jour et nouvelles versions.'],
    ],
    stack: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'Node.js', 'Laravel'],
    faq: [
      ['Faut-il développer une app native ou multiplateforme ?', 'Pour la plupart des projets, Flutter ou React Native permettent de livrer iOS et Android avec une seule base de code, plus vite et à moindre coût. Nous recommandons le natif uniquement si votre produit l’exige.'],
      ['Vous occupez-vous de la publication sur l’App Store et Google Play ?', 'Oui, nous préparons les fiches, les captures et gérons la validation auprès d’Apple et de Google.'],
      ['Combien coûte une application mobile en France ?', 'Le coût dépend du nombre d’écrans, des fonctionnalités et du back-end nécessaire. Nous vous remettons un devis détaillé après un premier échange.'],
    ],
  },
  {
    slug: 'cloud-devops-france',
    name: 'Cloud & DevOps',
    short: 'Hébergement, déploiements automatisés et infrastructures qui tiennent la charge.',
    h1: ['Cloud &', 'DevOps', 'pour les entreprises françaises'],
    metaTitle: 'Cloud & DevOps en France | Hébergement, CI/CD — Codex',
    metaDesc: 'Migration cloud, hébergement, CI/CD et supervision pour entreprises en France. Codex rend vos applications disponibles, rapides et faciles à déployer.',
    intro: 'Une application n’a de valeur que si elle reste disponible. Nous concevons, migrons et opérons des infrastructures fiables, avec des déploiements automatisés et une supervision continue.',
    icon: 'cloud',
    deliverables: [
      ['Migration vers le cloud', 'Passage de serveurs physiques vers un cloud local ou international, sans interruption.'],
      ['CI/CD', 'Tests et déploiements automatisés à chaque modification du code.'],
      ['Conteneurs', 'Docker et orchestration pour des environnements identiques du poste à la production.'],
      ['Supervision & alertes', 'Disponibilité, performances et journaux surveillés en continu.'],
      ['Sauvegardes & PRA', 'Sauvegardes automatiques testées et plan de reprise d’activité.'],
      ['Optimisation des coûts', 'Une infrastructure dimensionnée à votre usage réel.'],
    ],
    stack: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'GitHub Actions', 'GitLab CI', 'Nginx', 'Linux'],
    faq: [
      ['Pouvez-vous héberger nos données en France ?', 'Oui. Selon vos contraintes réglementaires, nous déployons sur des hébergeurs français ou internationaux et vous conseillons sur le meilleur compromis.'],
      ['Qu’apporte le DevOps à une PME ?', 'Des mises en production plus fréquentes et sans stress, moins de pannes, et la capacité de revenir en arrière en quelques minutes en cas de problème.'],
      ['Proposez-vous l’infogérance ?', 'Oui, nous pouvons opérer votre infrastructure au quotidien : mises à jour, sécurité, sauvegardes et supervision.'],
    ],
  },
  {
    slug: 'data-analytics-france',
    name: 'Data & Analytics',
    short: 'Tableaux de bord, consolidation de données et indicateurs pour décider vite.',
    h1: ['Data &', 'analytics', 'pour piloter votre activité'],
    metaTitle: 'Data & Analytics en France | Tableaux de bord, BI — Codex',
    metaDesc: 'Codex consolide vos données et construit des tableaux de bord décisionnels à Marseille : BI, reporting automatisé et indicateurs en temps réel.',
    intro: 'Vos données sont dispersées entre logiciels, fichiers et applications. Nous les réunissons, les fiabilisons et les transformons en indicateurs que vos équipes consultent chaque jour.',
    icon: 'data',
    deliverables: [
      ['Tableaux de bord', 'Ventes, stocks, finances et opérations visibles en un coup d’œil.'],
      ['Entrepôt de données', 'Une source unique et fiable alimentée automatiquement.'],
      ['Reporting automatisé', 'Fini les rapports Excel préparés à la main chaque semaine.'],
      ['Connecteurs', 'ERP, CRM, e-commerce, publicité et fichiers réunis au même endroit.'],
      ['Analyses avancées', 'Prévisions, segmentation client et détection d’anomalies.'],
      ['Formation des équipes', 'Vos collaborateurs autonomes sur leurs propres analyses.'],
    ],
    stack: ['Power BI', 'Metabase', 'Python', 'PostgreSQL', 'BigQuery', 'dbt', 'Apache Airflow'],
    faq: [
      ['Par où commencer un projet data ?', 'Par vos décisions : nous identifions les indicateurs dont vous avez besoin, puis les sources de données nécessaires. Un premier tableau de bord peut être livré rapidement.'],
      ['Nos données doivent-elles être propres pour commencer ?', 'Non. Le nettoyage et la fiabilisation font partie de notre travail, et nous mettons en place des contrôles pour que la qualité se maintienne.'],
      ['Quels outils utilisez-vous ?', 'Nous travaillons avec Power BI, Metabase ou des tableaux de bord sur mesure, selon votre budget et vos équipes.'],
    ],
  },
  {
    slug: 'cybersecurite-france',
    name: 'Cybersécurité',
    short: 'Audit, tests d’intrusion et sécurisation de vos applications et infrastructures.',
    h1: ['Cybersécurité', 'en France', 'pour les PME'],
    metaTitle: 'Cybersécurité en France | Audit & tests d’intrusion — Codex',
    metaDesc: 'Audit de sécurité, tests d’intrusion et sécurisation des applications et infrastructures pour PME en France. Codex corrige les failles prioritaires.',
    intro: 'Une faille découverte par un attaquant coûte toujours plus cher qu’un audit. Nous évaluons vos applications et votre infrastructure, corrigeons les failles prioritaires et mettons en place une surveillance pragmatique.',
    icon: 'security',
    deliverables: [
      ['Audit de sécurité', 'Applications, serveurs, réseau et configuration cloud passés au crible.'],
      ['Tests d’intrusion', 'Attaques simulées et autorisées pour mesurer votre exposition réelle.'],
      ['Correction des failles', 'Un plan d’action priorisé et la correction des vulnérabilités critiques.'],
      ['Durcissement', 'Configuration sécurisée des serveurs, accès, mots de passe et sauvegardes.'],
      ['Surveillance', 'Détection des comportements suspects et alertes en temps réel.'],
      ['Sensibilisation', 'Formation de vos équipes au phishing et aux bonnes pratiques.'],
    ],
    stack: ['OWASP', 'Burp Suite', 'Nmap', 'Wazuh', 'Cloudflare WAF', 'Let’s Encrypt', 'Vault'],
    faq: [
      ['Une PME a-t-elle vraiment besoin d’un audit de sécurité ?', 'Oui : les PME sont des cibles fréquentes car moins protégées. Un audit identifie rapidement les failles les plus risquées et les corrections à faire en priorité.'],
      ['Un test d’intrusion peut-il perturber notre activité ?', 'Les tests sont planifiés avec vous, encadrés par un périmètre écrit et réalisés de façon à ne pas interrompre vos services.'],
      ['Que contient le rapport d’audit ?', 'Une synthèse lisible pour la direction, le détail technique de chaque faille, son niveau de risque et la correction recommandée.'],
    ],
  },
  {
    slug: 'marketing-digital-seo-france',
    name: 'Marketing digital & SEO',
    short: 'Référencement Google, contenus et campagnes pour attirer des clients qualifiés.',
    h1: ['Marketing digital &', 'SEO', 'en France'],
    metaTitle: 'Agence SEO & marketing digital en France — Codex',
    metaDesc: 'Référencement naturel (SEO), SEO local à Marseille, contenus et campagnes publicitaires. Codex vous rend visible sur Google et les moteurs IA.',
    intro: 'Être en première page de Google en France ne relève pas du hasard. Nous combinons SEO technique, contenus utiles et campagnes ciblées pour amener des clients qualifiés vers votre entreprise.',
    icon: 'seo',
    deliverables: [
      ['Audit SEO', 'Analyse technique, sémantique et concurrentielle de votre site.'],
      ['SEO local', 'Fiche Google Business, avis et visibilité sur « près de moi » à Marseille et en France.'],
      ['Contenus', 'Pages et articles en français et en arabe qui répondent aux recherches de vos clients.'],
      ['Visibilité IA (GEO)', 'Contenus structurés pour être cités par ChatGPT, Gemini et Perplexity.'],
      ['Publicité en ligne', 'Campagnes Google Ads, Meta et TikTok pilotées au coût par client.'],
      ['Suivi & reporting', 'Positions, trafic et conversions suivis chaque mois.'],
    ],
    stack: ['Google Search Console', 'Google Analytics 4', 'Google Ads', 'Meta Ads', 'Semrush', 'Ahrefs'],
    faq: [
      ['Combien de temps pour voir des résultats en SEO ?', 'Les premiers gains apparaissent souvent en quelques semaines sur les recherches locales ; les positions concurrentielles se construisent sur plusieurs mois. Nous mesurons les progrès chaque mois.'],
      ['Qu’est-ce que le GEO ?', 'Le Generative Engine Optimization consiste à structurer vos contenus pour que les assistants IA comme ChatGPT ou Gemini citent votre entreprise dans leurs réponses.'],
      ['Faites-vous du SEO en arabe ?', 'Oui, nous optimisons les contenus en français et en arabe, car vos clients cherchent dans les deux langues.'],
    ],
  },
  {
    slug: 'design-ui-ux-france',
    name: 'Design graphique & UI/UX',
    short: 'Identité visuelle, interfaces et expériences qui donnent confiance au premier regard.',
    h1: ['Design', 'UI/UX', '& identité visuelle'],
    metaTitle: 'Design UI/UX & identité visuelle en France — Codex',
    metaDesc: 'Codex crée des identités visuelles, des interfaces web et mobiles et des prototypes à Marseille. Un design qui inspire confiance et facilite l’usage.',
    intro: 'Un bon design ne se remarque pas : il rend les choses évidentes. Nous créons des identités et des interfaces cohérentes, testées auprès de vrais utilisateurs et prêtes à être développées.',
    icon: 'design',
    deliverables: [
      ['Identité visuelle', 'Logo, couleurs, typographies et charte graphique complète.'],
      ['Design d’interface', 'Écrans web et mobiles cohérents, accessibles et modernes.'],
      ['Recherche utilisateur', 'Entretiens et tests pour valider les parcours avant le développement.'],
      ['Prototypes', 'Maquettes interactives pour tester et présenter votre produit.'],
      ['Design system', 'Une bibliothèque de composants qui garde votre produit cohérent.'],
      ['Supports print & digital', 'Brochures, présentations, réseaux sociaux et signalétique.'],
    ],
    stack: ['Figma', 'Adobe Illustrator', 'Photoshop', 'After Effects', 'Design tokens'],
    faq: [
      ['Pourquoi investir dans l’UX ?', 'Une interface claire réduit les erreurs, les demandes au support et l’abandon des utilisateurs. C’est souvent le levier le plus rentable d’un produit numérique.'],
      ['Livrez-vous les fichiers sources ?', 'Oui, vous recevez les fichiers Figma, les logos dans tous les formats et la charte graphique.'],
      ['Pouvez-vous refaire uniquement le design d’une application existante ?', 'Oui, nous pouvons repenser l’interface puis l’intégrer avec vos développeurs ou avec notre équipe.'],
    ],
  },
];

export const marquee = ['Logiciels sur mesure', 'Sites web', 'Applications mobiles', 'Cloud & DevOps', 'Data', 'Cybersécurité', 'SEO', 'UI/UX'];

// Sectors shown on the home page (hover list).
export const sectors = [
  { name: 'Commerce & e-commerce', text: 'Boutiques en ligne, paiement local, gestion des stocks et des livraisons, programmes de fidélité.' },
  { name: 'Industrie & production', text: 'Suivi de production, maintenance, traçabilité et tableaux de bord pour les usines et ateliers.' },
  { name: 'Santé', text: 'Prise de rendez-vous, dossiers patients, gestion de cliniques et de laboratoires, en toute confidentialité.' },
  { name: 'Éducation & formation', text: 'Plateformes e-learning, gestion scolaire, inscriptions en ligne et applications pour élèves et parents.' },
  { name: 'Logistique & transport', text: 'Suivi de flotte, gestion d’entrepôt, applications chauffeurs et portails clients en temps réel.' },
  { name: 'Services & institutions', text: 'Portails citoyens et clients, dématérialisation des démarches, CRM et outils internes.' },
];

// Technology marquee on the home page.
export const techs = ['React', 'Next.js', 'Vue.js', 'Laravel', 'Node.js', 'Flutter', 'React Native', 'Swift', 'Kotlin', 'PostgreSQL', 'MySQL', 'Docker', 'Kubernetes', 'AWS', 'Google Cloud', 'Firebase', 'Figma', 'Power BI'];

// Rotating words in the home hero (the first one is the real, indexed text).
export const heroWords = ['numérique', 'mobile', 'connecté', 'sécurisé', 'intelligent'];

// Extra long-form content per service page: who it is for + a short guide (SEO / GEO).
export const serviceExtras = {
  'logiciel-sur-mesure-france': {
    useCases: ['Vos équipes jonglent entre Excel, WhatsApp et plusieurs logiciels', 'Votre ERP actuel ne suit plus votre croissance', 'Vous voulez lancer votre propre produit SaaS', 'Vous devez connecter vos outils entre eux'],
    guide: { title: 'Comment réussir un projet de logiciel sur mesure en France', paras: [
      'Un logiciel métier réussi commence par vos processus, pas par la technologie. Avant d’écrire du code, nous cartographions avec vos équipes la façon dont l’information circule : qui saisit, qui valide, qui consulte. Ce travail évite les fonctionnalités inutiles et révèle les vrais gains de temps.',
      'Nous livrons ensuite par lots. Une première version couvre le cœur de votre activité et peut être utilisée rapidement ; les modules suivants s’ajoutent en fonction des retours du terrain. Cette approche réduit les risques et permet de mesurer le retour sur investissement dès les premières semaines.',
      'Enfin, un logiciel sur mesure doit rester entre vos mains. Le code source, la documentation et les accès vous appartiennent, et l’application est hébergée selon vos contraintes, en France ou à l’international.',
    ] },
  },
  'creation-site-web-marseille': {
    useCases: ['Vous n’avez pas encore de site, ou il ne génère aucune demande', 'Votre site est lent, daté ou mal référencé', 'Vous voulez vendre en ligne partout en France', 'Vous ciblez des clients en français, en arabe et en anglais'],
    guide: { title: 'Ce qui fait un bon site web professionnel en France', paras: [
      'La plupart des visiteurs en France naviguent sur mobile, souvent en 4G. Un bon site est donc d’abord rapide : images optimisées, code léger, hébergement adapté. Chaque seconde de chargement en moins se traduit directement en contacts et en ventes supplémentaires.',
      'Un site doit ensuite être trouvé. Nous structurons chaque page autour des recherches réelles de vos clients, par exemple « création site web Marseille » ou « boutique en ligne France », avec des titres, des contenus et des données structurées que Google et les assistants IA comprennent.',
      'Enfin, un site doit convertir : des messages clairs, des preuves de confiance, des appels à l’action visibles, WhatsApp et téléphone en un clic, et pour l’e-commerce, le paiement CIB, Edahabia ou à la livraison.',
    ] },
  },
  'developpement-application-mobile-france': {
    useCases: ['Vous voulez fidéliser vos clients avec une app à votre marque', 'Vos équipes terrain ont besoin d’un outil mobile', 'Vous lancez une startup ou un nouveau service', 'Votre application actuelle est lente ou mal notée'],
    guide: { title: 'Les étapes pour créer une application mobile qui réussit', paras: [
      'Une application réussie résout un problème précis, mieux que ce qui existe déjà. Nous commençons par définir le parcours principal de vos utilisateurs et les quelques fonctionnalités qui feront revenir chaque jour, avant de penser au reste.',
      'Nous concevons ensuite les écrans et les testons sur de vrais téléphones avant le développement. Avec Flutter ou React Native, une seule base de code alimente iOS et Android, ce qui réduit les délais et le coût de maintenance.',
      'La publication n’est qu’un début. Statistiques d’usage, retours des utilisateurs et notes sur les stores guident les versions suivantes. Nous restons à vos côtés pour faire évoluer l’application et maintenir sa compatibilité avec les nouvelles versions des systèmes.',
    ] },
  },
  'cloud-devops-france': {
    useCases: ['Votre site ou application tombe lors des pics de trafic', 'Les mises en production sont longues et risquées', 'Vous n’avez aucune sauvegarde testée', 'Vous voulez réduire vos coûts d’hébergement'],
    guide: { title: 'Pourquoi le cloud et le DevOps changent la donne pour une PME', paras: [
      'Le DevOps consiste à automatiser tout ce qui se passe entre l’écriture du code et sa mise en ligne : tests, construction, déploiement et supervision. Résultat : des mises à jour fréquentes, sans coupure, et la possibilité de revenir en arrière en quelques minutes.',
      'Le cloud permet d’adapter les ressources à l’usage réel. Plutôt que de payer un serveur surdimensionné toute l’année, l’infrastructure s’ajuste aux pics d’activité, par exemple pendant le Ramadan ou les soldes.',
      'Nous choisissons avec vous entre hébergement en France et cloud international selon vos contraintes de données, de latence et de budget, et nous documentons chaque élément pour que votre équipe garde la main.',
    ] },
  },
  'data-analytics-france': {
    useCases: ['Vos rapports sont préparés à la main chaque semaine', 'Personne n’a la même version des chiffres', 'Vous voulez suivre vos ventes et vos stocks en temps réel', 'Vous avez des données mais peu de décisions basées dessus'],
    guide: { title: 'Transformer vos données en décisions', paras: [
      'Un projet data utile part des décisions à prendre : quels indicateurs la direction regarde-t-elle chaque lundi ? Quels chiffres manquent aux équipes commerciales ? Nous partons de ces questions pour définir les tableaux de bord prioritaires.',
      'Nous connectons ensuite vos sources, ERP, CRM, e-commerce, fichiers Excel, dans un entrepôt de données unique, nettoyé et mis à jour automatiquement. Fini les chiffres contradictoires entre services.',
      'Les tableaux de bord sont conçus pour être lus en quelques secondes, sur ordinateur comme sur mobile, et vos équipes sont formées pour créer leurs propres analyses.',
    ] },
  },
  'cybersecurite-france': {
    useCases: ['Vous n’avez jamais fait auditer votre site ou vos serveurs', 'Vous traitez des données clients ou financières', 'Vous avez subi une tentative d’intrusion ou de phishing', 'Un client ou partenaire exige des garanties de sécurité'],
    guide: { title: 'Les bases de la cybersécurité pour une entreprise française', paras: [
      'La majorité des incidents viennent de failles simples : mots de passe faibles, logiciels non mis à jour, sauvegardes absentes, accès trop larges. Un audit identifie rapidement ces points et les classe par niveau de risque.',
      'Les tests d’intrusion vont plus loin en simulant une attaque réelle, dans un cadre écrit et autorisé, pour mesurer ce qu’un attaquant pourrait réellement atteindre. Le rapport explique chaque faille en langage clair et propose une correction.',
      'La sécurité est un processus continu : surveillance, mises à jour, sauvegardes testées et sensibilisation des équipes au phishing. Nous mettons en place ces routines de façon pragmatique, adaptée à la taille de votre entreprise.',
    ] },
  },
  'marketing-digital-seo-france': {
    useCases: ['Vos concurrents apparaissent avant vous sur Google', 'Votre site reçoit des visites mais peu de demandes', 'Vous dépensez en publicité sans mesurer les résultats', 'Vous voulez être recommandé par ChatGPT et Gemini'],
    guide: { title: 'Être premier sur Google en France : notre méthode', paras: [
      'Le référencement repose sur trois piliers : une base technique saine (vitesse, structure, indexation), des contenus qui répondent précisément aux recherches de vos clients, et une réputation construite par des liens, des citations et des avis.',
      'En France, le SEO local est souvent le levier le plus rapide : une fiche Google Business complète, des avis clients réguliers et des informations identiques sur tous les annuaires permettent d’apparaître sur les recherches « près de moi » et sur Google Maps.',
      'Les assistants IA deviennent une nouvelle porte d’entrée. Le GEO consiste à publier des informations claires, structurées et vérifiables sur votre entreprise pour que ChatGPT, Gemini ou Perplexity la citent dans leurs réponses.',
    ] },
  },
  'design-ui-ux-france': {
    useCases: ['Votre image ne reflète plus la qualité de votre offre', 'Vos utilisateurs se perdent dans votre application', 'Vous lancez un produit et voulez le tester avant de développer', 'Vos supports manquent de cohérence'],
    guide: { title: 'Un design qui inspire confiance et facilite l’usage', paras: [
      'Une identité forte se reconnaît en un coup d’œil : un logo simple, une palette cohérente, une typographie lisible et des règles claires pour les appliquer partout, du site web aux réseaux sociaux et aux documents imprimés.',
      'Côté produit, le design d’interface commence par la recherche : comprendre les utilisateurs, leurs objectifs et leurs frustrations. Les maquettes sont testées puis affinées avant le développement, ce qui évite des corrections coûteuses.',
      'Nous livrons un design system complet, composants, couleurs et espacements, qui garde votre produit cohérent au fil des évolutions et accélère le travail des développeurs.',
    ] },
  },
};

// Real Codex projects (images in src/assets/img/work, generated by scripts/optimize-assets.mjs).
// cat: mobile | web | logiciel — used by the filters on /fr/realisations.
// Recent projects (a selection; Codex has delivered 450+ since 2014). `features` only restates `text`: no invented facts.
// `links` (optional) points to the live project: { web, ios, android } (website, App Store, Google Play). Real URLs only.
export const projects = [
  { slug: 'erp-bz-telecom', name: 'ERP BZ Telecom', type: 'Logiciel ERP', cat: 'logiciel', service: 'logiciel-sur-mesure-france', tint: '#0f1a36',
    text: 'ERP sur mesure pour piloter l’activité : tableau de bord des ventes, suivi financier, indicateurs et graphiques en temps réel.',
    more: 'Le pilotage se fait dans un tableau de bord web. L’application publiée liée à ce projet s’appelle Meryouma, sur Google Play et l’App Store.',
    tags: ['ERP', 'Tableau de bord', 'Web'],
    features: [
      { title: 'Tableau de bord des ventes', text: 'Les ventes se lisent dans un tableau de bord, au même endroit que le reste de l’activité.' },
      { title: 'Suivi financier', text: 'Le suivi financier fait partie du même outil de pilotage.' },
      { title: 'Indicateurs de pilotage', text: 'Des indicateurs résument l’activité pour la suivre sans ouvrir chaque dossier.' },
      { title: 'Graphiques en temps réel', text: 'Les graphiques du tableau de bord se mettent à jour en temps réel.' },
    ],
    links: { android: 'https://play.google.com/store/apps/details?id=com.bzshop.app', ios: 'https://apps.apple.com/app/meryouma/id6795881904' }, linksApp: 'Meryouma' },
  { slug: 'skoda-imdes', name: 'Skoda IMDES', type: 'Application mobile', cat: 'mobile', service: 'developpement-application-mobile-france', tint: '#0d3a2b',
    text: 'Application mobile de gestion des demandes de mesure de pièces : fiches problème, suivi des demandes et connexion par certificat mobile.',
    more: 'C’est un outil interne pour l’industrie. Codex ne publie pas de lien de téléchargement public pour ce projet.',
    tags: ['iOS', 'Android', 'Industrie'],
    features: [
      { title: 'Demandes de mesure de pièces', text: 'L’application sert à déposer et à suivre des demandes de mesure de pièces.' },
      { title: 'Fiches problème', text: 'Chaque demande peut s’accompagner d’une fiche problème.' },
      { title: 'Suivi des demandes', text: 'L’avancement des demandes se suit dans l’application.' },
      { title: 'Connexion par certificat mobile', text: 'L’accès se fait par un certificat mobile.' },
    ],
    confidential: true },
  { slug: 'ondefoc', name: 'ONDEFOC', type: 'Site web', cat: 'web', service: 'creation-site-web-marseille', tint: '#5a1220',
    text: 'Site web institutionnel de l’ONDEFOC (ondefoc.dz) : une vitrine moderne pour présenter son offre et faciliter l’accès à l’information.',
    more: 'Le site est en ligne sur ondefoc.dz. Il présente l’offre de l’ONDEFOC et rend l’information plus simple à trouver.',
    tags: ['Site institutionnel', 'Responsive'],
    features: [
      { title: 'Vitrine institutionnelle moderne', text: 'Le site est une vitrine institutionnelle, conçue pour présenter l’ONDEFOC.' },
      { title: 'Présentation de l’offre', text: 'L’offre de l’organisme y est présentée au visiteur.' },
      { title: 'Accès facilité à l’information', text: 'Les pages sont organisées pour rendre l’information plus facile à trouver.' },
      { title: 'Affichage adapté à tous les écrans', text: 'L’affichage s’adapte au téléphone, à la tablette et à l’ordinateur.' },
    ],
    links: { web: 'https://ondefoc.dz' } },
  { slug: 'valuetherm', name: 'Valuetherm Distribution', type: 'Application mobile', cat: 'mobile', service: 'developpement-application-mobile-france', tint: '#24101b',
    text: 'Application de distribution : catalogue produits, promotions et prise de commande depuis le mobile pour les clients et revendeurs.',
    more: 'Elle s’adresse aux clients et aux revendeurs. Le site de Valuetherm est en ligne sur valuetherm.com.',
    tags: ['iOS', 'Android', 'Distribution'],
    features: [
      { title: 'Catalogue produits', text: 'Les produits se consultent dans un catalogue, depuis le téléphone.' },
      { title: 'Promotions', text: 'Les promotions en cours sont visibles dans l’application.' },
      { title: 'Prise de commande sur mobile', text: 'La commande se passe depuis le mobile, sans repasser par un autre canal.' },
      { title: 'Accès clients et revendeurs', text: 'Le même outil sert les clients et les revendeurs.' },
    ],
    links: { web: 'https://valuetherm.com/' } },
  { slug: 'az-fulfillment', name: 'AZ fulfillment', type: 'Plateforme de gestion', cat: 'logiciel', service: 'logiciel-sur-mesure-france', tint: '#c2410c',
    text: 'Plateforme de gestion pour l’e-commerce « de A à Z » : commandes, stocks et statistiques réunis dans un tableau de bord unique.',
    more: 'La plateforme est en ligne sur az-fulfillment.app. Commandes, stocks et statistiques y sont réunis.',
    tags: ['Logistique', 'E-commerce', 'Data'],
    features: [
      { title: 'Gestion des commandes', text: 'Les commandes se suivent dans la plateforme, avec le reste de l’activité.' },
      { title: 'Gestion des stocks', text: 'Les stocks sont gérés au même endroit que les commandes.' },
      { title: 'Statistiques', text: 'Des statistiques résument l’activité e-commerce.' },
      { title: 'Tableau de bord unique', text: 'Commandes, stocks et statistiques tiennent dans un seul tableau de bord.' },
    ],
    links: { web: 'https://az-fulfillment.app/' } },
  { slug: 'rihla-travel', name: 'Rihla Travel', type: 'Application mobile', cat: 'mobile', service: 'developpement-application-mobile-france', tint: '#123056',
    text: 'Application d’agence de voyage : services, promotions et offres populaires accessibles et réservables depuis le téléphone.',
    more: 'L’application Android est publiée sur Google Play. Les services, les promotions et les offres s’y consultent et s’y réservent.',
    tags: ['iOS', 'Android', 'Tourisme'],
    features: [
      { title: 'Services de l’agence', text: 'Les services de l’agence de voyage sont accessibles depuis le téléphone.' },
      { title: 'Promotions', text: 'Les promotions en cours sont affichées dans l’application.' },
      { title: 'Offres populaires', text: 'Les offres les plus demandées sont mises en avant.' },
      { title: 'Réservation depuis le téléphone', text: 'La réservation se fait dans l’application, sans quitter le téléphone.' },
    ],
    links: { android: 'https://play.google.com/store/apps/details?id=dz.rihla.mobile' } },
  { slug: 'levva-gym', name: 'LEVVA GYM', type: 'Application mobile', cat: 'mobile', service: 'developpement-application-mobile-france', tint: '#e8710f',
    text: 'Application LEVVA GYM avec boutique intégrée : collections, mises en avant produits et achat en quelques gestes.',
    more: 'L’application Android est publiée sur Google Play. La boutique, les collections et l’achat tiennent dans la même application.',
    tags: ['iOS', 'Android', 'Sport & retail'],
    features: [
      { title: 'Boutique intégrée', text: 'La boutique est dans l’application, pas sur un site à part.' },
      { title: 'Collections', text: 'Les produits sont rangés en collections.' },
      { title: 'Mises en avant produits', text: 'Certains produits sont mis en avant dans la boutique.' },
      { title: 'Achat en quelques gestes', text: 'L’achat se termine en quelques gestes, depuis le téléphone.' },
    ],
    links: { android: 'https://play.google.com/store/apps/details?id=com.levva.app' } },
  { slug: 'sijour-shop', name: 'Sijour Shop', type: 'Application mobile', cat: 'mobile', service: 'developpement-application-mobile-france', tint: '#f5a400',
    text: 'Application e-commerce et affiliation Sijour Shop : catalogue, produits tendance et commande depuis le téléphone.',
    more: 'Sijour Shop a attesté la livraison de cette application mobile.',
    tags: ['E-commerce', 'Affiliation'],
    features: [
      { title: 'Catalogue produits', text: 'Les produits se consultent dans un catalogue, depuis le téléphone.' },
      { title: 'Produits tendance', text: 'Les produits tendance sont mis en avant dans l’application.' },
      { title: 'E-commerce et affiliation', text: 'L’application sert l’e-commerce et l’affiliation.' },
    ] },
  { slug: 'the-doctor', name: 'The Doctor', type: 'Application mobile', cat: 'mobile', service: 'developpement-application-mobile-france', tint: '#f0a31a',
    text: 'Application de santé The Doctor, réalisée pour BITA Equipement : un annuaire de spécialités médicales, avec recherche.',
    more: 'BITA Equipement a attesté la livraison de The Doctor V10.0.',
    tags: ['Santé', 'Annuaire'],
    features: [
      { title: 'Spécialités médicales', text: 'Les spécialités se parcourent dans un annuaire.' },
      { title: 'Recherche', text: 'Une recherche permet de trouver une spécialité.' },
    ] },
  { slug: 'mazad', name: 'Mazad', type: 'Application mobile', cat: 'mobile', service: 'developpement-application-mobile-france', tint: '#e10600',
    text: 'Application immobilière Mazad : critères de recherche (localisation, types de bien) et suivi des biens sélectionnés.',
    tags: ['Immobilier', 'Recherche'],
    features: [
      { title: 'Critères de recherche', text: 'La recherche se filtre par localisation et par type de bien.' },
      { title: 'Suggestions', text: 'Les suggestions proposent des biens qui correspondent aux critères.' },
      { title: 'Agenda des biens sélectionnés', text: 'L’agenda suit les biens sélectionnés : dates de visite, résultats d’adjudication et commentaires.' },
    ] },
  { slug: 'akhbar-dzair', name: 'Akhbar Dzair', type: 'Site web', cat: 'web', service: 'creation-site-web-marseille', tint: '#1c8c3a',
    text: 'Site d’information Akhbar Dzair, en ligne sur akhbardzair.dz.',
    tags: ['Média', 'Actualité'],
    features: [
      { title: 'Site d’actualité', text: 'Le site présente l’actualité d’Akhbar Dzair.' },
      { title: 'Adresse publique', text: 'Le site est annoncé à l’adresse akhbardzair.dz.' },
    ],
    links: { web: 'https://www.akhbardzair.dz' } },
  { slug: 'bladi-plus', name: 'Bladi Plus', type: 'Application mobile', cat: 'mobile', service: 'developpement-application-mobile-france', tint: '#111111',
    text: 'Application Bladi Plus : actualité, sport et vidéo. Le site est annoncé sur bladi.plus.',
    tags: ['Média', 'Sport', 'Vidéo'],
    features: [
      { title: 'Actualité et sport', text: 'L’application rassemble l’actualité et le sport.' },
      { title: 'Vidéo', text: 'Les contenus se regardent en vidéo dans l’application.' },
    ],
    links: { web: 'https://www.bladi.plus' } },
];

// Short text per salon for the gallery page (edit freely; keep it factual).
// Links per salon (official site, or press coverage when the event has none). Only verified URLs.
export const eventLinks = {
  'Web Summit 2026': [{ url: 'https://qatar.websummit.com/', label: 'Site officiel', kind: 'site' }],
  'Fintech & E-commerce Summit 2024': [{ url: 'https://news.radioalgerie.dz/fr/node/41717', label: 'Radio Algérienne', kind: 'press' }],
};

export const eventInfo = {
  'Web Summit 2026': 'Exposition au Web Summit Qatar 2026 à Doha, l’un des plus grands rendez-vous tech au monde, avec un passage sur la scène Startup Showcase.',
  'Fintech & E-commerce Summit 2024': 'Stand Codex au Fintech & E-commerce Summit organisé par Guiddini, du 5 au 7 mars 2024 à l’ESHRA (École supérieure d’hôtellerie et de restauration de Marseille).',
  'Webexpo France 2024': 'Toute l’équipe Codex présente sur son stand au Webexpo France 2024 : démonstrations de nos applications et rencontres avec les entreprises.',
  'ACF 2023': 'Codex exposant à la 3e édition de l’ACF, du 15 au 17 juin 2023 : présentation de nos services de développement et de nos réalisations.',
  'Webexpo 2023': 'Stand Codex au Webexpo 2023, du 25 au 27 mai 2023 : rencontres avec des porteurs de projets, des partenaires et des visiteurs professionnels.',
  'France Export Services Fair 2026': 'Codex à la France Export Services Fair 2026, organisée sous l’égide du ministère du Commerce extérieur : nos solutions logicielles présentées aux entreprises tournées vers l’export.',
};

// Client logos (files in src/assets/img/clients, made by scripts/optimize-clients.mjs). Two marquee rows.
export const clients = [
  ['skoda', 'Škoda'], ['huissiers-de-justice', 'Chambre nationale des huissiers de justice'], ['ondefoc', 'ONDEFOC'],
  ['valuetherm', 'Valuetherm'], ['az-fulfillment', 'AZ fulfillment'], ['bita-equipement', 'BITA Equipement'], ['khabar-press', 'Khabar Press'],
  ['labo-ibn-sina', 'Laboratoire Ibn Sina'], ['sijour-shop', 'Sijour Shop'], ['prof-billal', 'Prof Billal'],
  ['k-diesel', 'K Diesel'], ['meteor-dash', 'Meteor Dash'], ['sofac', 'SOFAC'], ['laboratoire-dr-maout', 'Laboratoire Dr Maout'],
  ['groupe-rahmani-kechichi', 'Groupe Rahmani Kechichi'], ['el-assli-hi-tech', 'El Assli Hi-Tech'], ['est-star', 'EST Star'],
  ['chark-cos', 'Chark Cos'], ['vixtouch', 'Vixtouch'], ['levva', 'LEVVA'], ['koulchy-auto', 'Koulchy Auto'], ['naqle-pro', 'Naqle Pro'],
  ['renault-escale-auto', 'Renault Escale Auto'], ['al-gharafa', 'Al Gharafa Bakery'],
  ['youth-idea', 'Youth Idea (Un Jeune Une Idée)'], ['axxam-business-hub', 'Axxam Business Hub'], ['mpi', 'MPI — Management Projets Innovation'],
];

// Feedback quoted from the clients' certificates of good execution (images in src/assets/img/certificates).
// French/English quotes are verbatim; Arabic ones are translated (lang: 'ar').
export const testimonials = [
  { cert: 'chocran', tag: 'Expérience exceptionnelle', hl: 'une expertise remarquable', client: 'Chocran (SARL Chocochic)', person: 'Ryma Bouslama', role: 'Gérante', project: 'ERP de gestion commerciale, production et distribution + site chocran.com', date: '10 juillet 2024',
    quote: 'Notre collaboration avec Codex s’est avérée être une expérience exceptionnellement positive. Leur équipe a démontré une expertise remarquable et un dévouement sans faille tout au long de nos projets communs.' },
  { cert: 'heronys', tag: 'Livré dans les délais', hl: 'on schedule, and to our full satisfaction', client: 'Heronys WLL — Doha', person: 'Fahad Al Hamdan', role: 'General Manager', project: 'Application Heronys', date: '7 septembre 2025',
    quote: 'The project was executed professionally, on schedule, and to our full satisfaction. All deliverables were provided in compliance with the required standards of quality and performance.' },
  { cert: 'bita-equipement', tag: 'Professionnalisme', hl: 'un professionnalisme exceptionnel', client: 'BITA Equipement', person: 'Mustapha Benchaa', role: 'Responsable', project: 'The Doctor V10.0', date: '',
    quote: 'La société Codex a démontré un professionnalisme exceptionnel tout au long de notre partenariat. Leurs équipes ont fait preuve d’un engagement constant envers l’excellence, de compétences techniques avérées et d’une grande réactivité face à nos besoins.' },
  { cert: 'huissiers-de-justice', tag: 'Engagements tenus', hl: 'conformément aux standards requis', client: 'Chambre nationale des huissiers de justice', person: 'Mohamed Reda Dahmri', role: 'Président de la Chambre nationale', project: 'Site web, plateforme numérique et application mobile', date: '16 février 2025', lang: 'ar',
    quote: 'SARL GROUPE CODEX a rempli tous ses engagements liés à la conception et au développement d’un site web, d’une plateforme numérique et d’une application mobile pour la Chambre, conformément aux standards requis.' },
  { cert: 'sijour-shop', tag: 'Qualité & délais', hl: 'terminé dans les bons délais', client: 'Sijour Shop', person: 'Othman Houdjadj', role: 'Directeur général', project: 'Application mobile Sijour Shop', date: '8 mars 2024',
    quote: 'L’entreprise Codex a fait un travail de qualité, avec professionnalisme et ils ont terminé dans les bons délais.' },
  { cert: 'farben-malakoot', tag: 'Recommandé', hl: 'Nous recommandons chaleureusement les services de CODEX', client: 'SARL Farben Malakoot', person: 'Billel Fares Bentebbiche', role: 'Gérant', project: 'Application Pharmazone', date: '10 mars 2024',
    quote: 'CODEX a pleinement respecté les engagements pris et a satisfait à toutes les obligations contractuelles. Nous recommandons chaleureusement les services de CODEX.' },
  { cert: 'kmondi-shop', tag: 'Collaboration remarquable', hl: 'un grand professionnalisme', client: 'Kmondi Shop', person: 'Kmondi Shop', role: 'Propriétaire de l’application', project: 'Application e-commerce Kmondi Shop', date: '11 novembre 2025', lang: 'ar',
    quote: 'Codex a fait preuve d’un grand professionnalisme à toutes les étapes du projet, que ce soit dans la communication, le design ou les aspects techniques de l’application. Travailler avec eux a été remarquable et flexible.' },
  { cert: 'khabar-press', tag: 'Accompagnement technique', hl: 'support et d’accompagnement technique', client: 'Alaa Media — Khabar Press', person: 'Alaeddine Megoura', role: 'Agence Alaa Media', project: 'Site web du journal électronique Khabar Press', date: '6 octobre 2026', lang: 'ar',
    quote: 'Le projet a été réalisé de manière satisfaisante, dans le respect des engagements de développement, de programmation, d’installation, de support et d’accompagnement technique.' },
  { cert: 'hak-el-bac', tag: 'Développement & hébergement', hl: 'professionnels avec bon support', client: 'Hak El Bac', person: 'Billal Yahiaoui', role: 'Hak El Bac', project: 'Application mobile Prof Billal (Android / iOS)', date: 'depuis juillet 2023',
    quote: 'Codex a développé et hébergé notre application mobile Prof Billal Android/iOS ; les services étaient professionnels avec bon support.' },
  { cert: 'mpi', tag: 'Client satisfait', hl: 'satisfaits du travail réalisé', client: 'SARL Management Projets Innovation (MPI)', person: 'Kamel Hendel', role: 'Gérant', project: 'Création et développement du site web', date: '20 octobre 2026',
    quote: 'Nous attestons que les prestations ont été exécutées conformément aux besoins exprimés et nous déclarons être satisfaits du travail réalisé.' },
  { cert: 'youth-idea', tag: 'Client satisfait', hl: 'satisfaits du travail réalisé', client: 'SARL Youth Idea', person: 'Kamel Hendel', role: 'Gérant', project: 'Création et développement du site web', date: '20 octobre 2026',
    quote: 'Nous attestons que les prestations ont été exécutées conformément aux besoins exprimés et nous déclarons être satisfaits du travail réalisé.' },
  { cert: 'axxam-business-hub', tag: 'Client satisfait', hl: 'satisfaits du travail réalisé', client: 'SPA Axxam Business Hub', person: 'Kamel Hendel', role: 'Gérant', project: 'Création et développement du site web', date: '20 octobre 2026',
    quote: 'Nous attestons que les prestations ont été exécutées conformément aux besoins exprimés et nous déclarons être satisfaits du travail réalisé.' },
];

// The team (owner: "same team as hirodots.com/about-us"). Roles and bios translated from that page.
// Photos: src/assets/img/team/<id>-400/800.webp, made by scripts/optimize-team.mjs from ../source-assets/team.
// No photo yet → the card shows the person's initials until one is added.
// Photos fill a 4:5 frame (object-fit: cover) anchored near the top; `focus` overrides the anchor if a head gets cut.
// group: 'lead' (direction), 'senior' (experts), 'team'.
export const team = [
  { id: 'malek-hemmak', group: 'lead', name: 'Malek Hemmak', role: 'Directeur général', bio: 'Titulaire d’un master en informatique, plus de dix ans d’expérience en développement full-stack et mobile. Il construit et dirige des équipes de développement performantes et des solutions logicielles évolutives.' },
  { id: 'mourad-hamdaoui', group: 'lead', name: 'Mourad Hamdaoui', role: 'Business Development Manager' },
  { id: 'zakarya-djaalab', group: 'lead', name: 'Zakarya Djaalab', role: 'Manager, Codex Europe', bio: 'Manager de Codex Europe. Il pilote l’activité du studio à Marseille et veille à ce que chaque client en France soit accompagné avec exigence, du premier échange à la livraison.' },
  { id: 'hocine-belgacem', group: 'lead', name: 'Hocine Belgacem', role: 'Manager, Codex Qatar', bio: 'Entrepreneur IT titulaire d’un master, avec plus de dix ans d’expérience en management dans l’hôtellerie. Il apporte leadership, excellence opérationnelle et sens du client, et pilote des équipes de développement qui livrent des solutions numériques évolutives.' },
  { id: 'billel-souane', group: 'lead', name: 'Billel Souane', role: 'Directeur de l’IA (CAIO)', bio: 'Titulaire d’un master en algèbre et cryptographie, spécialiste de l’intelligence artificielle, des algorithmes avancés et de la conception de systèmes sécurisés. Il aligne les technologies émergentes sur la stratégie et la croissance.' },
  { id: 'derradji-kermiche', group: 'senior', name: 'Derradji Kermiche', role: 'Développeur full-stack senior', bio: 'Master en informatique. Conçoit des produits logiciels de bout en bout, des technologies web et mobiles modernes à l’architecture système.' },
  { id: 'mohamed-haoud', group: 'senior', name: 'Mohamed Haoud', role: 'Développeur mobile senior', bio: 'Licence en informatique. A développé et lancé de nombreuses applications mobiles, de la conception au déploiement.' },
  { id: 'younes-achour', group: 'senior', name: 'Younes Achour', role: 'Chef de projet', bio: 'Master en gestion des ressources humaines. Planification, coordination des équipes et pilotage des projets de la conception à la livraison.' },
  { id: 'amina-remini', group: 'senior', name: 'Amina Remini', role: 'Cheffe de projet', bio: 'Cheffe de projet passionnée par la conduite d’équipes et la coordination des projets. Elle excelle dans la communication et veille à ce que chaque projet soit livré dans les délais et au plus haut niveau d’exigence.' },
  { id: 'ziad-hemmak', group: 'senior', name: 'Ziad Hemmak', role: 'Développeur web senior', bio: 'Développeur et architecte web alliant design et expertise technique, pour des solutions web évolutives et des expériences fluides.' },
  { id: 'selma-chergue', group: 'team', name: 'Selma Chergue', role: 'Chargée commerciale', focus: '50% 6%' },
  { id: 'imene-souag', group: 'team', name: 'Imene Souag', role: 'Designer UI/UX' },
  { id: 'dhikra-slimani', group: 'team', name: 'Dhikra Slimani', role: 'Graphiste' },
  { id: 'islam-kermiche', group: 'team', name: 'Islam Kermiche', role: 'Développeur back-end' },
  { id: 'walid-larachi', group: 'team', name: 'Walid Larachi', role: 'Analyste SOC (cybersécurité)' },
  { id: 'aourassi-sahraoui', group: 'team', name: 'Aourassi Sahraoui', role: 'Ingénieur DevOps' },
  { id: 'ouala-eddine-ali', group: 'team', name: 'Ouala Eddine Ali', role: 'Développeur mobile' },
  { id: 'kaddour-djakkam', group: 'team', name: 'Kaddour Djakkam', role: 'Développeur front-end' },
  { id: 'fella-hellal', group: 'team', name: 'Fella Hellal', role: 'Spécialiste assurance qualité' },
  { id: 'mina-sehili', group: 'team', name: 'Mina Sehili', role: 'Designer UI/UX senior', bio: 'Designer UI/UX et ingénieure de production. Crée des expériences centrées utilisateur et des interfaces qui transforment les idées en produits engageants.' },
  { id: 'taha-benlala', group: 'team', name: 'Taha Benlala', role: 'Designer UI/UX' },
  { id: 'ibrahim-el-zayni', group: 'team', name: 'Ibrahim El Zayni', role: 'Architecte IA (stagiaire)' },
  { id: 'yasmine-ayach', group: 'team', name: 'Yasmine Ayach', role: 'Spécialiste marketing' },
  { id: 'hamid-shiraz', group: 'team', name: 'Hamid Shiraz', role: 'Analyste SOC (stagiaire)' },
  { id: 'meriem-amirat', group: 'team', name: 'Meriem Amirat', role: 'Comptable' },
  { id: 'abdesamie-selama', group: 'team', name: 'Abdesamie Selama', role: 'Vidéaste (temps partiel)' },
];
