import { CVData } from "@/pages/CVCreate";

export const exampleCVs: Record<string, CVData> = {
  'minimalist-black': {
    firstName: "Sophie",
    lastName: "Martin",
    email: "sophie.martin@email.com",
    phone: "+33 6 12 34 56 78",
    address: "Paris, France",
    photo: "",
    about: "Designer UX/UI passionnée avec 5 ans d'expérience dans la création d'interfaces utilisateur intuitives et esthétiques. Spécialisée dans le design thinking et l'accessibilité web.",
    experiences: [
      {
        id: "1",
        company: "Studio Créatif",
        position: "Senior UX Designer",
        startDate: "2021-03",
        endDate: "",
        description: "Direction de projets UX pour des clients internationaux. Conception d'interfaces web et mobile centrées utilisateur."
      },
      {
        id: "2",
        company: "Agence Digital",
        position: "UX Designer",
        startDate: "2019-06",
        endDate: "2021-02",
        description: "Création de wireframes, prototypes et tests utilisateurs. Collaboration avec développeurs et product managers."
      }
    ],
    education: [
      {
        id: "1",
        school: "École Supérieure de Design",
        degree: "Master Design d'Interface",
        startDate: "2017-09",
        endDate: "2019-06",
        description: "Spécialisation en design numérique et expérience utilisateur"
      }
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
    theme: "minimalist-black",
    template: "minimal"
  },
  
  'modern-gray': {
    firstName: "Thomas",
    lastName: "Dubois",
    email: "thomas.dubois@email.com",
    phone: "+33 6 98 76 54 32",
    address: "Lyon, France",
    photo: "",
    about: "Développeur Full Stack avec expertise en React, Node.js et architecture cloud. Passionné par les technologies modernes et les bonnes pratiques de développement.",
    experiences: [
      {
        id: "1",
        company: "Tech Solutions",
        position: "Lead Developer",
        startDate: "2020-01",
        endDate: "",
        description: "Architecture et développement d'applications web scalables. Mentoring d'équipe de 5 développeurs."
      },
      {
        id: "2",
        company: "StartUp Innovation",
        position: "Full Stack Developer",
        startDate: "2018-03",
        endDate: "2019-12",
        description: "Développement de features front-end et back-end. Stack: React, Node.js, PostgreSQL, Docker."
      }
    ],
    education: [
      {
        id: "1",
        school: "École d'Ingénieurs",
        degree: "Diplôme d'Ingénieur Informatique",
        startDate: "2015-09",
        endDate: "2018-06",
        description: "Spécialisation développement logiciel et systèmes distribués"
      }
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
    theme: "modern-gray",
    template: "modern"
  },
  
  'creative-gradient': {
    firstName: "Emma",
    lastName: "Laurent",
    email: "emma.laurent@email.com",
    phone: "+33 7 11 22 33 44",
    address: "Bordeaux, France",
    photo: "",
    about: "Chef de projet digital créative avec un œil pour le design et une passion pour l'innovation. 6 ans d'expérience dans le management de projets web et mobile.",
    experiences: [
      {
        id: "1",
        company: "Agence Créative Plus",
        position: "Chef de Projet Senior",
        startDate: "2021-09",
        endDate: "",
        description: "Pilotage de projets digitaux de A à Z. Gestion d'équipes pluridisciplinaires et relation client."
      },
      {
        id: "2",
        company: "Digital Factory",
        position: "Chef de Projet",
        startDate: "2018-01",
        endDate: "2021-08",
        description: "Coordination de projets web et mobile. Méthodologie Agile Scrum."
      }
    ],
    education: [
      {
        id: "1",
        school: "Business School",
        degree: "Master Marketing Digital",
        startDate: "2016-09",
        endDate: "2018-06",
        description: "Spécialisation transformation digitale et gestion de projet"
      }
    ],
    skills: [
      { id: "1", name: "Gestion de projet", level: 93 },
      { id: "2", name: "Scrum", level: 88 },
      { id: "3", name: "Marketing Digital", level: 85 },
      { id: "4", name: "Analytics", level: 80 }
    ],
    linkedin: "linkedin.com/in/emmalaurent",
    github: "",
    twitter: "twitter.com/emmalaurent",
    portfolio: "emmalaurent.pro",
    theme: "creative-gradient",
    template: "creative"
  },
  
  'elegant-dark': {
    firstName: "Lucas",
    lastName: "Bernard",
    email: "lucas.bernard@email.com",
    phone: "+33 6 55 44 33 22",
    address: "Marseille, France",
    photo: "",
    about: "Data Scientist spécialisé en Machine Learning et Intelligence Artificielle. Expertise en analyse prédictive et visualisation de données complexes.",
    experiences: [
      {
        id: "1",
        company: "AI Research Lab",
        position: "Senior Data Scientist",
        startDate: "2020-06",
        endDate: "",
        description: "Développement de modèles ML/AI pour l'analyse prédictive. Python, TensorFlow, PyTorch."
      },
      {
        id: "2",
        company: "Analytics Corp",
        position: "Data Scientist",
        startDate: "2018-09",
        endDate: "2020-05",
        description: "Analyse de données massives et création de tableaux de bord interactifs."
      }
    ],
    education: [
      {
        id: "1",
        school: "Université de Sciences",
        degree: "PhD en Intelligence Artificielle",
        startDate: "2015-09",
        endDate: "2018-06",
        description: "Recherche en deep learning et traitement du langage naturel"
      }
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
    theme: "elegant-dark",
    template: "elegant"
  },
  
  'professional-blue': {
    firstName: "Marie",
    lastName: "Lefevre",
    email: "marie.lefevre@email.com",
    phone: "+33 6 77 88 99 00",
    address: "Toulouse, France",
    photo: "",
    about: "Responsable Marketing et Communication avec 8 ans d'expérience dans le secteur B2B. Expertise en stratégie de contenu, SEO et social media management.",
    experiences: [
      {
        id: "1",
        company: "Groupe Marketing Pro",
        position: "Directrice Marketing",
        startDate: "2019-01",
        endDate: "",
        description: "Définition de la stratégie marketing globale. Management d'équipe de 8 personnes."
      },
      {
        id: "2",
        company: "Communication Plus",
        position: "Responsable Communication",
        startDate: "2016-06",
        endDate: "2018-12",
        description: "Gestion de la communication corporate et des campagnes digitales."
      }
    ],
    education: [
      {
        id: "1",
        school: "Sciences Po",
        degree: "Master Communication",
        startDate: "2014-09",
        endDate: "2016-06",
        description: "Spécialisation marketing et stratégie digitale"
      }
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
};
