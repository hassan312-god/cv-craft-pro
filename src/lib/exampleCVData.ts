import { CVData } from "@/pages/CVCreate";

export type CVCategory = 
  | "tech"
  | "design"
  | "marketing"
  | "management"
  | "finance"
  | "sales"
  | "education"
  | "medical"
  | "jsonresume";

export interface CVExample {
  data: CVData;
  category: CVCategory;
  colorTheme: string;
}

export const cvCategories: Record<CVCategory, string> = {
  tech: "Tech & IT",
  design: "Design & Créatif",
  marketing: "Marketing & Communication",
  management: "Management",
  finance: "Finance & Comptabilité",
  sales: "Commerce & Vente",
  education: "Éducation",
  medical: "Médical & Santé",
  jsonresume: "JSON Resume"
};

export const exampleCVs: Record<string, CVExample> = {
  // TECH & IT
  'dev-fullstack': {
    category: "tech",
    colorTheme: "Noir Professionnel",
    data: {
      firstName: "Thomas",
      lastName: "Dubois",
      email: "thomas.dubois@email.com",
      phone: "+33 6 98 76 54 32",
      address: "Lyon, France",
      photo: "",
      about: "Développeur Full Stack avec 6 ans d'expérience en React, Node.js et architecture cloud. Passionné par les technologies modernes et les bonnes pratiques de développement.",
      experiences: [
        { id: "1", company: "Tech Solutions", position: "Lead Developer", startDate: "2020-01", endDate: "", description: "Architecture et développement d'applications web scalables. Mentoring d'équipe de 5 développeurs." },
        { id: "2", company: "StartUp Innovation", position: "Full Stack Developer", startDate: "2018-03", endDate: "2019-12", description: "Développement de features front-end et back-end. Stack: React, Node.js, PostgreSQL, Docker." }
      ],
      education: [
        { id: "1", school: "École d'Ingénieurs", degree: "Diplôme d'Ingénieur Informatique", startDate: "2015-09", endDate: "2018-06", description: "Spécialisation développement logiciel et systèmes distribués" }
      ],
      skills: [
        { id: "1", name: "React", level: 92 },
        { id: "2", name: "Node.js", level: 88 },
        { id: "3", name: "TypeScript", level: 90 },
        { id: "4", name: "AWS", level: 75 }
      ],
      linkedin: "linkedin.com/in/thomasdubois",
      github: "github.com/thomasdubois",
      twitter: "",
      portfolio: "thomasdubois.dev",
      theme: "minimalist-black",
      template: "modern"
    }
  },
  
  'data-scientist': {
    category: "tech",
    colorTheme: "Gris Élégant",
    data: {
      firstName: "Lucas",
      lastName: "Bernard",
      email: "lucas.bernard@email.com",
      phone: "+33 6 55 44 33 22",
      address: "Marseille, France",
      photo: "",
      about: "Data Scientist spécialisé en Machine Learning et Intelligence Artificielle avec 5 ans d'expérience. Expertise en analyse prédictive et visualisation de données complexes.",
      experiences: [
        { id: "1", company: "AI Research Lab", position: "Senior Data Scientist", startDate: "2020-06", endDate: "", description: "Développement de modèles ML/AI pour l'analyse prédictive. Python, TensorFlow, PyTorch." },
        { id: "2", company: "Analytics Corp", position: "Data Scientist", startDate: "2018-09", endDate: "2020-05", description: "Analyse de données massives et création de tableaux de bord interactifs." }
      ],
      education: [
        { id: "1", school: "Université de Sciences", degree: "PhD en Intelligence Artificielle", startDate: "2015-09", endDate: "2018-06", description: "Recherche en deep learning et traitement du langage naturel" }
      ],
      skills: [
        { id: "1", name: "Python", level: 95 },
        { id: "2", name: "Machine Learning", level: 92 },
        { id: "3", name: "TensorFlow", level: 88 },
        { id: "4", name: "SQL", level: 85 }
      ],
      linkedin: "linkedin.com/in/lucasbernard",
      github: "github.com/lucasbernard",
      twitter: "",
      portfolio: "lucasbernard.ai",
      theme: "modern-gray",
      template: "elegant"
    }
  },
  
  'devops-engineer': {
    category: "tech",
    colorTheme: "Bleu Technique",
    data: {
      firstName: "Alexandre",
      lastName: "Rousseau",
      email: "alex.rousseau@email.com",
      phone: "+33 6 44 55 66 77",
      address: "Toulouse, France",
      photo: "",
      about: "Ingénieur DevOps avec 7 ans d'expérience en automatisation, CI/CD et infrastructure cloud. Expert en Kubernetes, Docker et outils d'orchestration.",
      experiences: [
        { id: "1", company: "CloudTech Inc", position: "Senior DevOps Engineer", startDate: "2019-03", endDate: "", description: "Mise en place de pipelines CI/CD, gestion infrastructure Kubernetes sur AWS et GCP." },
        { id: "2", company: "Digital Factory", position: "DevOps Engineer", startDate: "2017-01", endDate: "2019-02", description: "Automatisation des déploiements, monitoring avec Prometheus et Grafana." }
      ],
      education: [
        { id: "1", school: "École d'Ingénieurs", degree: "Master Systèmes et Réseaux", startDate: "2015-09", endDate: "2017-06", description: "Spécialisation architecture cloud et sécurité" }
      ],
      skills: [
        { id: "1", name: "Kubernetes", level: 90 },
        { id: "2", name: "Docker", level: 95 },
        { id: "3", name: "AWS", level: 88 },
        { id: "4", name: "Terraform", level: 85 }
      ],
      linkedin: "linkedin.com/in/alexrousseau",
      github: "github.com/alexrousseau",
      twitter: "",
      portfolio: "",
      theme: "professional-blue",
      template: "tech"
    }
  },
  
  'cybersecurity': {
    category: "tech",
    colorTheme: "Noir Sécurité",
    data: {
      firstName: "Julien",
      lastName: "Moreau",
      email: "julien.moreau@email.com",
      phone: "+33 7 22 33 44 55",
      address: "Paris, France",
      photo: "",
      about: "Expert en cybersécurité avec 8 ans d'expérience en tests d'intrusion, audit de sécurité et gestion des risques. Certifié CEH et OSCP.",
      experiences: [
        { id: "1", company: "SecureIT Consulting", position: "Lead Security Engineer", startDate: "2018-06", endDate: "", description: "Audit de sécurité, tests d'intrusion et conseil en sécurité informatique pour grands comptes." },
        { id: "2", company: "CyberDefense Corp", position: "Security Analyst", startDate: "2016-01", endDate: "2018-05", description: "Analyse de vulnérabilités, réponse aux incidents et formation des équipes." }
      ],
      education: [
        { id: "1", school: "Université Paris Tech", degree: "Master Cybersécurité", startDate: "2014-09", endDate: "2016-06", description: "Spécialisation sécurité des systèmes d'information" }
      ],
      skills: [
        { id: "1", name: "Penetration Testing", level: 93 },
        { id: "2", name: "Network Security", level: 90 },
        { id: "3", name: "Linux", level: 88 },
        { id: "4", name: "Python", level: 85 }
      ],
      linkedin: "linkedin.com/in/julienmoreau",
      github: "github.com/julienmoreau",
      twitter: "",
      portfolio: "",
      theme: "elegant-dark",
      template: "minimal"
    }
  },

  // DESIGN & CRÉATIF
  'ux-designer': {
    category: "design",
    colorTheme: "Rose Créatif",
    data: {
      firstName: "Sophie",
      lastName: "Martin",
      email: "sophie.martin@email.com",
      phone: "+33 6 12 34 56 78",
      address: "Paris, France",
      photo: "",
      about: "Designer UX/UI passionnée avec 5 ans d'expérience dans la création d'interfaces utilisateur intuitives et esthétiques. Spécialisée dans le design thinking et l'accessibilité web.",
      experiences: [
        { id: "1", company: "Studio Créatif", position: "Senior UX Designer", startDate: "2021-03", endDate: "", description: "Direction de projets UX pour des clients internationaux. Conception d'interfaces web et mobile centrées utilisateur." },
        { id: "2", company: "Agence Digital", position: "UX Designer", startDate: "2019-06", endDate: "2021-02", description: "Création de wireframes, prototypes et tests utilisateurs. Collaboration avec développeurs et product managers." }
      ],
      education: [
        { id: "1", school: "École Supérieure de Design", degree: "Master Design d'Interface", startDate: "2017-09", endDate: "2019-06", description: "Spécialisation en design numérique et expérience utilisateur" }
      ],
      skills: [
        { id: "1", name: "Figma", level: 95 },
        { id: "2", name: "Adobe XD", level: 90 },
        { id: "3", name: "Prototypage", level: 85 },
        { id: "4", name: "Design System", level: 88 }
      ],
      linkedin: "linkedin.com/in/sophiemartin",
      github: "",
      twitter: "",
      portfolio: "sophiemartin.design",
      theme: "creative-gradient",
      template: "creative"
    }
  },

  'graphic-designer': {
    category: "design",
    colorTheme: "Violet Artistique",
    data: {
      firstName: "Camille",
      lastName: "Dupont",
      email: "camille.dupont@email.com",
      phone: "+33 6 88 99 00 11",
      address: "Lyon, France",
      photo: "",
      about: "Graphiste créatif avec 6 ans d'expérience en identité visuelle, branding et design print/digital. Passionnée par la typographie et les compositions audacieuses.",
      experiences: [
        { id: "1", company: "Agence Créative Plus", position: "Directrice Artistique", startDate: "2020-09", endDate: "", description: "Direction artistique de campagnes publicitaires. Création d'identités visuelles pour startups et PME." },
        { id: "2", company: "Studio Graphique", position: "Graphic Designer", startDate: "2018-01", endDate: "2020-08", description: "Design de supports print et digital, logos, packaging et affiches." }
      ],
      education: [
        { id: "1", school: "École des Beaux-Arts", degree: "Master Design Graphique", startDate: "2016-09", endDate: "2018-06", description: "Spécialisation identité visuelle et communication" }
      ],
      skills: [
        { id: "1", name: "Photoshop", level: 95 },
        { id: "2", name: "Illustrator", level: 93 },
        { id: "3", name: "InDesign", level: 88 },
        { id: "4", name: "Branding", level: 90 }
      ],
      linkedin: "linkedin.com/in/camilledupont",
      github: "",
      twitter: "twitter.com/camilledesign",
      portfolio: "camilledupont.portfolio.com",
      theme: "creative-gradient",
      template: "bold"
    }
  },

  'motion-designer': {
    category: "design",
    colorTheme: "Orange Dynamique",
    data: {
      firstName: "Maxime",
      lastName: "Petit",
      email: "maxime.petit@email.com",
      phone: "+33 7 33 44 55 66",
      address: "Bordeaux, France",
      photo: "",
      about: "Motion Designer spécialisé en animation 2D/3D et effets visuels. 4 ans d'expérience en production vidéo, publicité et contenus digitaux.",
      experiences: [
        { id: "1", company: "Motion Studio", position: "Senior Motion Designer", startDate: "2021-02", endDate: "", description: "Création d'animations pour publicités TV, réseaux sociaux et sites web. After Effects, Cinema 4D." },
        { id: "2", company: "Vidéo Production", position: "Motion Designer", startDate: "2019-06", endDate: "2021-01", description: "Animation de logos, explainer videos et motion graphics pour clients variés." }
      ],
      education: [
        { id: "1", school: "École Multimédia", degree: "Master Motion Design", startDate: "2017-09", endDate: "2019-06", description: "Animation 2D/3D et effets spéciaux" }
      ],
      skills: [
        { id: "1", name: "After Effects", level: 95 },
        { id: "2", name: "Cinema 4D", level: 85 },
        { id: "3", name: "Premiere Pro", level: 88 },
        { id: "4", name: "Animation 2D/3D", level: 90 }
      ],
      linkedin: "linkedin.com/in/maximepetit",
      github: "",
      twitter: "",
      portfolio: "maximepetit.motion",
      theme: "creative-gradient",
      template: "modern"
    }
  },

  // MARKETING & COMMUNICATION
  'marketing-manager': {
    category: "marketing",
    colorTheme: "Bleu Marketing",
    data: {
      firstName: "Marie",
      lastName: "Lefevre",
      email: "marie.lefevre@email.com",
      phone: "+33 6 77 88 99 00",
      address: "Toulouse, France",
      photo: "",
      about: "Responsable Marketing et Communication avec 8 ans d'expérience dans le secteur B2B. Expertise en stratégie de contenu, SEO et social media management.",
      experiences: [
        { id: "1", company: "Groupe Marketing Pro", position: "Directrice Marketing", startDate: "2019-01", endDate: "", description: "Définition de la stratégie marketing globale. Management d'équipe de 8 personnes." },
        { id: "2", company: "Communication Plus", position: "Responsable Communication", startDate: "2016-06", endDate: "2018-12", description: "Gestion de la communication corporate et des campagnes digitales." }
      ],
      education: [
        { id: "1", school: "Sciences Po", degree: "Master Communication", startDate: "2014-09", endDate: "2016-06", description: "Spécialisation marketing et stratégie digitale" }
      ],
      skills: [
        { id: "1", name: "Stratégie Marketing", level: 90 },
        { id: "2", name: "SEO/SEA", level: 85 },
        { id: "3", name: "Content Marketing", level: 88 },
        { id: "4", name: "Social Media", level: 82 }
      ],
      linkedin: "linkedin.com/in/marielefevre",
      github: "",
      twitter: "twitter.com/marielefevre",
      portfolio: "marielefevre.com",
      theme: "professional-blue",
      template: "professional"
    }
  },

  'digital-marketing': {
    category: "marketing",
    colorTheme: "Vert Digital",
    data: {
      firstName: "Antoine",
      lastName: "Girard",
      email: "antoine.girard@email.com",
      phone: "+33 6 11 22 33 44",
      address: "Nantes, France",
      photo: "",
      about: "Spécialiste Marketing Digital avec 5 ans d'expérience en acquisition, conversion et fidélisation. Expert en Google Ads, Facebook Ads et Analytics.",
      experiences: [
        { id: "1", company: "E-commerce Leader", position: "Digital Marketing Manager", startDate: "2020-03", endDate: "", description: "Gestion des campagnes d'acquisition payantes. Budget annuel de 500K€. ROI +150%." },
        { id: "2", company: "Startup Tech", position: "Growth Hacker", startDate: "2018-09", endDate: "2020-02", description: "Optimisation des tunnels de conversion. A/B testing et marketing automation." }
      ],
      education: [
        { id: "1", school: "Business School", degree: "Master Marketing Digital", startDate: "2016-09", endDate: "2018-06", description: "E-commerce et stratégies digitales" }
      ],
      skills: [
        { id: "1", name: "Google Ads", level: 92 },
        { id: "2", name: "Facebook Ads", level: 88 },
        { id: "3", name: "Google Analytics", level: 90 },
        { id: "4", name: "SEO", level: 85 }
      ],
      linkedin: "linkedin.com/in/antoinegirard",
      github: "",
      twitter: "twitter.com/antoinegrowth",
      portfolio: "",
      theme: "modern-gray",
      template: "clean"
    }
  },

  'community-manager': {
    category: "marketing",
    colorTheme: "Rose Social",
    data: {
      firstName: "Laura",
      lastName: "Simon",
      email: "laura.simon@email.com",
      phone: "+33 7 55 66 77 88",
      address: "Lille, France",
      photo: "",
      about: "Community Manager créative avec 4 ans d'expérience en gestion de communautés et création de contenus engageants. Spécialisée en Instagram et TikTok.",
      experiences: [
        { id: "1", company: "Agence Social Media", position: "Senior Community Manager", startDate: "2021-06", endDate: "", description: "Gestion de 10+ comptes clients. Croissance moyenne de 300% en 12 mois." },
        { id: "2", company: "Brand Fashion", position: "Community Manager", startDate: "2019-09", endDate: "2021-05", description: "Animation des réseaux sociaux. Création de contenus photo/vidéo quotidiens." }
      ],
      education: [
        { id: "1", school: "Université Communication", degree: "Master Communication Digitale", startDate: "2017-09", endDate: "2019-06", description: "Social media et stratégies d'influence" }
      ],
      skills: [
        { id: "1", name: "Instagram", level: 95 },
        { id: "2", name: "TikTok", level: 90 },
        { id: "3", name: "Canva", level: 88 },
        { id: "4", name: "Copywriting", level: 85 }
      ],
      linkedin: "linkedin.com/in/laurasimon",
      github: "",
      twitter: "twitter.com/laurasimon",
      portfolio: "",
      theme: "creative-gradient",
      template: "creative"
    }
  },

  // MANAGEMENT
  'project-manager': {
    category: "management",
    colorTheme: "Gris Professionnel",
    data: {
      firstName: "Emma",
      lastName: "Laurent",
      email: "emma.laurent@email.com",
      phone: "+33 7 11 22 33 44",
      address: "Bordeaux, France",
      photo: "",
      about: "Chef de projet digital avec 6 ans d'expérience dans le management de projets web et mobile. Certifiée PMP et Scrum Master.",
      experiences: [
        { id: "1", company: "Agence Créative Plus", position: "Chef de Projet Senior", startDate: "2021-09", endDate: "", description: "Pilotage de projets digitaux de A à Z. Gestion d'équipes pluridisciplinaires et relation client." },
        { id: "2", company: "Digital Factory", position: "Chef de Projet", startDate: "2018-01", endDate: "2021-08", description: "Coordination de projets web et mobile. Méthodologie Agile Scrum." }
      ],
      education: [
        { id: "1", school: "Business School", degree: "Master Management de Projet", startDate: "2016-09", endDate: "2018-06", description: "Spécialisation transformation digitale et gestion de projet" }
      ],
      skills: [
        { id: "1", name: "Gestion de projet", level: 93 },
        { id: "2", name: "Scrum", level: 88 },
        { id: "3", name: "Leadership", level: 85 },
        { id: "4", name: "Jira", level: 90 }
      ],
      linkedin: "linkedin.com/in/emmalaurent",
      github: "",
      twitter: "twitter.com/emmalaurent",
      portfolio: "emmalaurent.pro",
      theme: "modern-gray",
      template: "executive"
    }
  },

  'product-manager': {
    category: "management",
    colorTheme: "Bleu Product",
    data: {
      firstName: "Nicolas",
      lastName: "Roux",
      email: "nicolas.roux@email.com",
      phone: "+33 6 99 88 77 66",
      address: "Paris, France",
      photo: "",
      about: "Product Manager avec 7 ans d'expérience en produits SaaS B2B. Expert en roadmap produit, analyse de données et stratégie go-to-market.",
      experiences: [
        { id: "1", company: "SaaS Startup", position: "Senior Product Manager", startDate: "2019-05", endDate: "", description: "Définition de la vision produit. Lancement de 3 fonctionnalités majeures générant +2M€ ARR." },
        { id: "2", company: "Tech Corp", position: "Product Manager", startDate: "2017-03", endDate: "2019-04", description: "Gestion du backlog, priorisation des features et collaboration avec engineering." }
      ],
      education: [
        { id: "1", school: "École de Commerce", degree: "MBA Product Management", startDate: "2015-09", endDate: "2017-02", description: "Stratégie produit et innovation" }
      ],
      skills: [
        { id: "1", name: "Product Strategy", level: 92 },
        { id: "2", name: "Data Analysis", level: 88 },
        { id: "3", name: "User Research", level: 85 },
        { id: "4", name: "Roadmapping", level: 90 }
      ],
      linkedin: "linkedin.com/in/nicolasroux",
      github: "",
      twitter: "",
      portfolio: "",
      theme: "professional-blue",
      template: "professional"
    }
  },

  'hr-manager': {
    category: "management",
    colorTheme: "Violet RH",
    data: {
      firstName: "Claire",
      lastName: "Blanc",
      email: "claire.blanc@email.com",
      phone: "+33 6 44 55 66 77",
      address: "Lyon, France",
      photo: "",
      about: "Responsable Ressources Humaines avec 9 ans d'expérience en recrutement, formation et gestion des talents. Experte en transformation culturelle et GPEC.",
      experiences: [
        { id: "1", company: "Groupe International", position: "DRH", startDate: "2018-01", endDate: "", description: "Direction des RH pour 200+ collaborateurs. Mise en place de programmes de formation et mobilité." },
        { id: "2", company: "PME Tech", position: "Responsable RH", startDate: "2015-06", endDate: "2017-12", description: "Recrutement, onboarding et développement des compétences." }
      ],
      education: [
        { id: "1", school: "Université RH", degree: "Master Ressources Humaines", startDate: "2013-09", endDate: "2015-06", description: "GRH et relations sociales" }
      ],
      skills: [
        { id: "1", name: "Recrutement", level: 90 },
        { id: "2", name: "Formation", level: 88 },
        { id: "3", name: "GPEC", level: 85 },
        { id: "4", name: "Management", level: 87 }
      ],
      linkedin: "linkedin.com/in/claireblanc",
      github: "",
      twitter: "",
      portfolio: "",
      theme: "elegant-dark",
      template: "elegant"
    }
  },

  // FINANCE
  'financial-analyst': {
    category: "finance",
    colorTheme: "Vert Finance",
    data: {
      firstName: "Pierre",
      lastName: "Mercier",
      email: "pierre.mercier@email.com",
      phone: "+33 6 33 44 55 66",
      address: "Paris, France",
      photo: "",
      about: "Analyste Financier avec 6 ans d'expérience en analyse d'investissement, modélisation financière et conseil en M&A. Spécialisé dans le secteur tech.",
      experiences: [
        { id: "1", company: "Cabinet Conseil", position: "Senior Financial Analyst", startDate: "2020-03", endDate: "", description: "Analyse d'investissement et due diligence pour opérations de M&A. Valorisation d'entreprises." },
        { id: "2", company: "Banque d'Investissement", position: "Financial Analyst", startDate: "2018-09", endDate: "2020-02", description: "Modélisation financière, business plans et analyses sectorielles." }
      ],
      education: [
        { id: "1", school: "Grande École de Commerce", degree: "Master Finance", startDate: "2016-09", endDate: "2018-06", description: "Finance de marché et corporate finance" }
      ],
      skills: [
        { id: "1", name: "Excel", level: 95 },
        { id: "2", name: "Modélisation Financière", level: 92 },
        { id: "3", name: "Valorisation", level: 88 },
        { id: "4", name: "Bloomberg", level: 85 }
      ],
      linkedin: "linkedin.com/in/pierremercier",
      github: "",
      twitter: "",
      portfolio: "",
      theme: "professional-blue",
      template: "classic"
    }
  },

  'accountant': {
    category: "finance",
    colorTheme: "Bleu Comptable",
    data: {
      firstName: "Isabelle",
      lastName: "Durand",
      email: "isabelle.durand@email.com",
      phone: "+33 6 22 33 44 55",
      address: "Lille, France",
      photo: "",
      about: "Expert-Comptable avec 10 ans d'expérience en comptabilité générale, fiscalité et audit. Diplômée DEC et certifiée DSCG.",
      experiences: [
        { id: "1", company: "Cabinet d'Expertise Comptable", position: "Expert-Comptable", startDate: "2017-01", endDate: "", description: "Supervision de la comptabilité de 50+ clients PME. Conseil fiscal et optimisation." },
        { id: "2", company: "Entreprise Manufacturing", position: "Comptable", startDate: "2014-06", endDate: "2016-12", description: "Tenue de la comptabilité, déclarations fiscales et reporting financier." }
      ],
      education: [
        { id: "1", school: "École de Comptabilité", degree: "DEC Expert-Comptable", startDate: "2011-09", endDate: "2014-06", description: "Comptabilité, audit et fiscalité" }
      ],
      skills: [
        { id: "1", name: "Comptabilité Générale", level: 95 },
        { id: "2", name: "Fiscalité", level: 90 },
        { id: "3", name: "Audit", level: 85 },
        { id: "4", name: "SAP", level: 80 }
      ],
      linkedin: "linkedin.com/in/isabelledurand",
      github: "",
      twitter: "",
      portfolio: "",
      theme: "minimalist-black",
      template: "professional"
    }
  },

  'controller': {
    category: "finance",
    colorTheme: "Gris Contrôle",
    data: {
      firstName: "Marc",
      lastName: "Fontaine",
      email: "marc.fontaine@email.com",
      phone: "+33 7 88 99 00 11",
      address: "Marseille, France",
      photo: "",
      about: "Contrôleur de Gestion avec 8 ans d'expérience en analyse de performance, budgets et tableaux de bord. Expert en pilotage financier et aide à la décision.",
      experiences: [
        { id: "1", company: "Groupe Industriel", position: "Contrôleur de Gestion Senior", startDate: "2018-09", endDate: "", description: "Pilotage financier des BU. Élaboration des budgets et analyses des écarts." },
        { id: "2", company: "PME Services", position: "Contrôleur de Gestion", startDate: "2016-01", endDate: "2018-08", description: "Reporting mensuel, suivi des KPIs et conseils opérationnels." }
      ],
      education: [
        { id: "1", school: "École de Commerce", degree: "Master Contrôle de Gestion", startDate: "2014-09", endDate: "2016-06", description: "Finance et contrôle" }
      ],
      skills: [
        { id: "1", name: "Budgétisation", level: 90 },
        { id: "2", name: "Tableaux de Bord", level: 92 },
        { id: "3", name: "Excel Avancé", level: 95 },
        { id: "4", name: "Power BI", level: 85 }
      ],
      linkedin: "linkedin.com/in/marcfontaine",
      github: "",
      twitter: "",
      portfolio: "",
      theme: "modern-gray",
      template: "professional"
    }
  },

  // SALES
  'sales-manager': {
    category: "sales",
    colorTheme: "Rouge Vente",
    data: {
      firstName: "Vincent",
      lastName: "Moreau",
      email: "vincent.moreau@email.com",
      phone: "+33 6 55 66 77 88",
      address: "Paris, France",
      photo: "",
      about: "Responsable Commercial avec 9 ans d'expérience en vente B2B. Expert en développement commercial, négociation et management d'équipe commerciale.",
      experiences: [
        { id: "1", company: "SaaS Enterprise", position: "Directeur Commercial", startDate: "2019-01", endDate: "", description: "Management d'équipe de 12 commerciaux. Croissance du CA de 150% en 3 ans." },
        { id: "2", company: "Tech Solutions", position: "Responsable Commercial", startDate: "2015-06", endDate: "2018-12", description: "Développement du portefeuille grands comptes. Signature de contrats majeurs." }
      ],
      education: [
        { id: "1", school: "École de Commerce", degree: "Master Commerce International", startDate: "2013-09", endDate: "2015-06", description: "Vente et négociation commerciale" }
      ],
      skills: [
        { id: "1", name: "Négociation", level: 93 },
        { id: "2", name: "Prospection", level: 90 },
        { id: "3", name: "Management", level: 88 },
        { id: "4", name: "CRM Salesforce", level: 85 }
      ],
      linkedin: "linkedin.com/in/vincentmoreau",
      github: "",
      twitter: "",
      portfolio: "",
      theme: "professional-blue",
      template: "bold"
    }
  },

  'account-executive': {
    category: "sales",
    colorTheme: "Orange Commercial",
    data: {
      firstName: "Amélie",
      lastName: "Garnier",
      email: "amelie.garnier@email.com",
      phone: "+33 7 66 77 88 99",
      address: "Lyon, France",
      photo: "",
      about: "Account Executive avec 5 ans d'expérience en vente de solutions SaaS B2B. Spécialisée en closing de deals enterprise et upselling.",
      experiences: [
        { id: "1", company: "SaaS Startup", position: "Senior Account Executive", startDate: "2020-03", endDate: "", description: "Vente de solutions enterprise. Quota dépassé de 180% en 2024. Top performer." },
        { id: "2", company: "Tech Company", position: "Account Executive", startDate: "2018-09", endDate: "2020-02", description: "Prospection et closing de PME/ETI. Cycle de vente de 3-6 mois." }
      ],
      education: [
        { id: "1", school: "Business School", degree: "Master Sales & Business Development", startDate: "2016-09", endDate: "2018-06", description: "Vente consultative et stratégies commerciales" }
      ],
      skills: [
        { id: "1", name: "Closing", level: 92 },
        { id: "2", name: "Prospection", level: 88 },
        { id: "3", name: "Présentation", level: 90 },
        { id: "4", name: "Salesforce", level: 85 }
      ],
      linkedin: "linkedin.com/in/ameliegarnier",
      github: "",
      twitter: "",
      portfolio: "",
      theme: "creative-gradient",
      template: "modern"
    }
  },

  'business-developer': {
    category: "sales",
    colorTheme: "Bleu Business",
    data: {
      firstName: "Julien",
      lastName: "Leroy",
      email: "julien.leroy@email.com",
      phone: "+33 6 77 88 99 00",
      address: "Bordeaux, France",
      photo: "",
      about: "Business Developer avec 6 ans d'expérience en développement commercial et partenariats stratégiques. Expert en identification d'opportunités et expansion de marché.",
      experiences: [
        { id: "1", company: "Scale-up Tech", position: "Senior Business Developer", startDate: "2020-06", endDate: "", description: "Développement de nouveaux marchés européens. Signature de 15+ partenariats stratégiques." },
        { id: "2", company: "Startup Innovation", position: "Business Developer", startDate: "2018-01", endDate: "2020-05", description: "Prospection et qualification de leads. Génération de 1M€ de pipeline." }
      ],
      education: [
        { id: "1", school: "École de Commerce", degree: "Master Entrepreneuriat", startDate: "2016-09", endDate: "2018-06", description: "Business development et stratégie" }
      ],
      skills: [
        { id: "1", name: "Business Development", level: 90 },
        { id: "2", name: "Partenariats", level: 88 },
        { id: "3", name: "Stratégie", level: 85 },
        { id: "4", name: "Prospection", level: 87 }
      ],
      linkedin: "linkedin.com/in/julienleroy",
      github: "",
      twitter: "",
      portfolio: "",
      theme: "modern-gray",
      template: "professional"
    }
  },

  // EDUCATION
  'teacher': {
    category: "education",
    colorTheme: "Vert Éducation",
    data: {
      firstName: "Sophie",
      lastName: "Bertrand",
      email: "sophie.bertrand@email.com",
      phone: "+33 6 11 22 33 44",
      address: "Nantes, France",
      photo: "",
      about: "Professeure de Mathématiques avec 12 ans d'expérience en collège et lycée. Passionnée par la pédagogie innovante et l'accompagnement des élèves.",
      experiences: [
        { id: "1", company: "Lycée Victor Hugo", position: "Professeure Agrégée", startDate: "2012-09", endDate: "", description: "Enseignement des mathématiques en classes de Seconde, Première et Terminale S." },
        { id: "2", company: "Collège Jean Moulin", position: "Professeure Certifiée", startDate: "2010-09", endDate: "2012-08", description: "Enseignement des mathématiques de la 6ème à la 3ème." }
      ],
      education: [
        { id: "1", school: "École Normale Supérieure", degree: "Agrégation de Mathématiques", startDate: "2008-09", endDate: "2010-06", description: "Formation à l'enseignement supérieur" }
      ],
      skills: [
        { id: "1", name: "Pédagogie", level: 95 },
        { id: "2", name: "Mathématiques", level: 98 },
        { id: "3", name: "Évaluation", level: 90 },
        { id: "4", name: "Numérique Éducatif", level: 85 }
      ],
      linkedin: "linkedin.com/in/sophiebertrand",
      github: "",
      twitter: "",
      portfolio: "",
      theme: "minimalist-black",
      template: "clean"
    }
  },

  'trainer': {
    category: "education",
    colorTheme: "Bleu Formation",
    data: {
      firstName: "David",
      lastName: "Legrand",
      email: "david.legrand@email.com",
      phone: "+33 7 22 33 44 55",
      address: "Toulouse, France",
      photo: "",
      about: "Formateur professionnel avec 8 ans d'expérience en formation d'adultes. Spécialisé en soft skills, management et transformation digitale.",
      experiences: [
        { id: "1", company: "Organisme de Formation", position: "Formateur Senior", startDate: "2017-01", endDate: "", description: "Animation de formations inter et intra-entreprise. Certification Qualiopi." },
        { id: "2", company: "Cabinet Conseil", position: "Consultant Formateur", startDate: "2015-09", endDate: "2016-12", description: "Formation management et développement personnel. Taux de satisfaction 95%." }
      ],
      education: [
        { id: "1", school: "Université de Formation", degree: "Master Ingénierie de Formation", startDate: "2013-09", endDate: "2015-06", description: "Pédagogie et formation d'adultes" }
      ],
      skills: [
        { id: "1", name: "Animation", level: 93 },
        { id: "2", name: "Ingénierie Pédagogique", level: 90 },
        { id: "3", name: "Management", level: 85 },
        { id: "4", name: "E-learning", level: 82 }
      ],
      linkedin: "linkedin.com/in/davidlegrand",
      github: "",
      twitter: "",
      portfolio: "",
      theme: "professional-blue",
      template: "professional"
    }
  },

  // MEDICAL
  'nurse': {
    category: "medical",
    colorTheme: "Bleu Médical",
    data: {
      firstName: "Julie",
      lastName: "Roussel",
      email: "julie.roussel@email.com",
      phone: "+33 6 88 99 00 11",
      address: "Paris, France",
      photo: "",
      about: "Infirmière Diplômée d'État avec 7 ans d'expérience en service de réanimation. Dévouée aux soins patients et au travail d'équipe pluridisciplinaire.",
      experiences: [
        { id: "1", company: "CHU Paris", position: "Infirmière en Réanimation", startDate: "2017-09", endDate: "", description: "Soins intensifs, surveillance de patients critiques, collaboration avec médecins." },
        { id: "2", company: "Clinique Saint-Antoine", position: "Infirmière", startDate: "2016-01", endDate: "2017-08", description: "Soins généraux, administration de traitements et éducation thérapeutique." }
      ],
      education: [
        { id: "1", school: "IFSI Paris", degree: "Diplôme d'État Infirmier", startDate: "2013-09", endDate: "2016-06", description: "Formation en soins infirmiers" }
      ],
      skills: [
        { id: "1", name: "Soins Intensifs", level: 92 },
        { id: "2", name: "Urgences", level: 88 },
        { id: "3", name: "Relation Patient", level: 95 },
        { id: "4", name: "Travail d'Équipe", level: 93 }
      ],
      linkedin: "linkedin.com/in/julieeroussel",
      github: "",
      twitter: "",
      portfolio: "",
      theme: "minimalist-black",
      template: "clean"
    }
  },

  'pharmacist': {
    category: "medical",
    colorTheme: "Vert Pharmacie",
    data: {
      firstName: "Thomas",
      lastName: "Perrin",
      email: "thomas.perrin@email.com",
      phone: "+33 6 33 44 55 66",
      address: "Lyon, France",
      photo: "",
      about: "Pharmacien d'Officine avec 6 ans d'expérience en conseil pharmaceutique, dispensation et gestion d'officine. Diplômé de la Faculté de Pharmacie de Lyon.",
      experiences: [
        { id: "1", company: "Pharmacie Centrale", position: "Pharmacien Titulaire", startDate: "2019-09", endDate: "", description: "Gestion complète de l'officine, conseil patients et préparations magistrales." },
        { id: "2", company: "Pharmacie du Parc", position: "Pharmacien Adjoint", startDate: "2017-01", endDate: "2019-08", description: "Dispensation, conseils pharmaceutiques et gestion des stocks." }
      ],
      education: [
        { id: "1", school: "Faculté de Pharmacie Lyon", degree: "Diplôme d'État de Docteur en Pharmacie", startDate: "2011-09", endDate: "2017-06", description: "Formation en pharmacie d'officine" }
      ],
      skills: [
        { id: "1", name: "Conseil Pharmaceutique", level: 95 },
        { id: "2", name: "Dispensation", level: 93 },
        { id: "3", name: "Gestion d'Officine", level: 88 },
        { id: "4", name: "Réglementation", level: 90 }
      ],
      linkedin: "linkedin.com/in/thomasperrin",
      github: "",
      twitter: "",
      portfolio: "",
      theme: "professional-blue",
      template: "classic"
    }
  }
};

const jsonResumeGalleryData = exampleCVs["dev-fullstack"].data;

Object.assign(exampleCVs, {
  "jsonresume-even": {
    category: "jsonresume" as const,
    colorTheme: "JSON Resume Even",
    data: { ...jsonResumeGalleryData, template: "jsonresume-even" },
  },
  "jsonresume-onepage-plus": {
    category: "jsonresume" as const,
    colorTheme: "JSON Resume One Page Plus",
    data: { ...jsonResumeGalleryData, template: "jsonresume-onepage-plus" },
  },
  "jsonresume-spartan": {
    category: "jsonresume" as const,
    colorTheme: "JSON Resume Spartan",
    data: { ...jsonResumeGalleryData, template: "jsonresume-spartan" },
  },
  "ilove-resume": {
    category: "jsonresume" as const,
    colorTheme: "I Love Resume",
    data: { ...jsonResumeGalleryData, template: "ilove-resume" },
  },
  "open-cv-template": {
    category: "jsonresume" as const,
    colorTheme: "Open CV Template",
    data: { ...jsonResumeGalleryData, template: "open-cv-template" },
  },
  "html-css-cv-demo": {
    category: "jsonresume" as const,
    colorTheme: "HTML-CSS-CV-demo",
    data: { ...jsonResumeGalleryData, template: "html-css-cv-demo" },
  },
  "html-resume": {
    category: "jsonresume" as const,
    colorTheme: "HTML Resume",
    data: { ...jsonResumeGalleryData, template: "html-resume" },
  },
} satisfies Record<string, CVExample>);
