import type { CVData } from "@/pages/CVCreate";

/**
 * CV de démonstration utilisés par les aperçus (accueil, galerie, sélecteur).
 *
 * Ils sont volontairement denses : chaque section est remplie afin qu'aucune
 * vignette ne laisse de zone blanche, comme sur les galeries des builders de
 * CV du marché.
 */

const base = {
  photo: "",
  theme: "minimalist-black",
  template: "canvas",
} as const;

export const demoResumes: Record<string, CVData> = {
  developpeur: {
    ...base,
    firstName: "Thomas",
    lastName: "Dubois",
    email: "thomas.dubois@email.com",
    phone: "+33 6 98 76 54 32",
    address: "Lyon, France",
    about:
      "Développeur full stack avec 8 ans d'expérience sur des produits web à forte audience. Spécialisé en React, Node.js et architecture cloud, j'accompagne les équipes de la conception à la mise en production.",
    experiences: [
      {
        id: "1",
        company: "Tech Solutions",
        position: "Lead Developer",
        startDate: "2021-01",
        endDate: "",
        description:
          "Refonte de la plateforme SaaS servant 120 000 utilisateurs mensuels.\nEncadrement d'une équipe de 5 développeurs et mise en place des revues de code.\nRéduction de 40 % du temps de chargement grâce au découpage du bundle.",
      },
      {
        id: "2",
        company: "StartUp Innovation",
        position: "Développeur Full Stack",
        startDate: "2018-03",
        endDate: "2020-12",
        description:
          "Conception des API REST et du front-end React de l'application principale.\nAutomatisation du déploiement avec Docker et GitLab CI.",
      },
      {
        id: "3",
        company: "Agence Web Lumen",
        position: "Développeur Front-End",
        startDate: "2016-09",
        endDate: "2018-02",
        description:
          "Intégration de 30 sites clients responsives et accessibles.\nMise en place d'une bibliothèque de composants réutilisables.",
      },
    ],
    education: [
      {
        id: "1",
        school: "École d'Ingénieurs de Lyon",
        degree: "Diplôme d'Ingénieur Informatique",
        startDate: "2013-09",
        endDate: "2016-06",
        description: "Spécialisation systèmes distribués et génie logiciel",
      },
      {
        id: "2",
        school: "Université Lyon 1",
        degree: "Licence Informatique",
        startDate: "2010-09",
        endDate: "2013-06",
        description: "Mention bien",
      },
    ],
    skills: [
      { id: "1", name: "React / Next.js", level: 94 },
      { id: "2", name: "TypeScript", level: 90 },
      { id: "3", name: "Node.js", level: 88 },
      { id: "4", name: "PostgreSQL", level: 82 },
      { id: "5", name: "AWS", level: 76 },
      { id: "6", name: "Docker", level: 74 },
    ],
    linkedin: "linkedin.com/in/thomasdubois",
    github: "github.com/thomasdubois",
    twitter: "",
    portfolio: "thomasdubois.dev",
  },

  marketing: {
    ...base,
    firstName: "Camille",
    lastName: "Rousseau",
    email: "camille.rousseau@email.com",
    phone: "+33 6 45 12 88 03",
    address: "Paris, France",
    about:
      "Responsable marketing digital, 7 ans d'expérience en acquisition et content marketing. J'aime transformer une audience en clients fidèles à partir de données concrètes.",
    experiences: [
      {
        id: "1",
        company: "Groupe Meridian",
        position: "Responsable Marketing Digital",
        startDate: "2021-04",
        endDate: "",
        description:
          "Pilotage d'un budget média annuel de 800 k€ sur SEA, social et display.\nCroissance de 65 % du trafic organique en dix-huit mois.\nManagement d'une équipe de 4 personnes et de trois agences.",
      },
      {
        id: "2",
        company: "Studio Nova",
        position: "Chargée d'acquisition",
        startDate: "2018-06",
        endDate: "2021-03",
        description:
          "Création et suivi des campagnes d'acquisition payante multi-canal.\nMise en place du tracking analytics et des tableaux de bord hebdomadaires.",
      },
      {
        id: "3",
        company: "Agence Kaléo",
        position: "Assistante marketing",
        startDate: "2017-01",
        endDate: "2018-05",
        description:
          "Rédaction du contenu éditorial et animation des réseaux sociaux clients.",
      },
    ],
    education: [
      {
        id: "1",
        school: "Skema Business School",
        degree: "Master Marketing Digital",
        startDate: "2014-09",
        endDate: "2016-06",
        description: "Majeure stratégie de marque et data marketing",
      },
      {
        id: "2",
        school: "Université Paris-Dauphine",
        degree: "Licence Économie-Gestion",
        startDate: "2011-09",
        endDate: "2014-06",
        description: "",
      },
    ],
    skills: [
      { id: "1", name: "SEO / SEA", level: 92 },
      { id: "2", name: "Google Analytics", level: 88 },
      { id: "3", name: "Content marketing", level: 90 },
      { id: "4", name: "HubSpot", level: 80 },
      { id: "5", name: "Gestion de budget", level: 85 },
      { id: "6", name: "Anglais courant", level: 87 },
    ],
    linkedin: "linkedin.com/in/camillerousseau",
    github: "",
    twitter: "",
    portfolio: "camille-rousseau.fr",
  },

  designer: {
    ...base,
    firstName: "Sophie",
    lastName: "Martin",
    email: "sophie.martin@email.com",
    phone: "+33 7 22 41 60 19",
    address: "Bordeaux, France",
    about:
      "Designer produit avec 6 ans d'expérience sur des applications mobiles et SaaS. Je conçois des interfaces claires, testées auprès des utilisateurs et livrées avec un design system solide.",
    experiences: [
      {
        id: "1",
        company: "Fintech Aurore",
        position: "Product Designer Senior",
        startDate: "2022-02",
        endDate: "",
        description:
          "Refonte du parcours d'ouverture de compte : conversion passée de 38 % à 61 %.\nConstruction et maintenance du design system utilisé par trois équipes.\nAnimation des tests utilisateurs mensuels.",
      },
      {
        id: "2",
        company: "Studio Pixel",
        position: "UI/UX Designer",
        startDate: "2019-09",
        endDate: "2022-01",
        description:
          "Conception d'applications mobiles pour huit clients grands comptes.\nPrototypage interactif et passation détaillée aux équipes de développement.",
      },
      {
        id: "3",
        company: "Freelance",
        position: "Designer graphique",
        startDate: "2018-01",
        endDate: "2019-08",
        description: "Identités visuelles et supports web pour startups et associations.",
      },
    ],
    education: [
      {
        id: "1",
        school: "Strate École de Design",
        degree: "Master Design Interactif",
        startDate: "2015-09",
        endDate: "2017-06",
        description: "Projet de fin d'études primé au concours national",
      },
      {
        id: "2",
        school: "MJM Graphic Design",
        degree: "BTS Design Graphique",
        startDate: "2013-09",
        endDate: "2015-06",
        description: "",
      },
    ],
    skills: [
      { id: "1", name: "Figma", level: 96 },
      { id: "2", name: "Design system", level: 90 },
      { id: "3", name: "Recherche utilisateur", level: 84 },
      { id: "4", name: "Prototypage", level: 92 },
      { id: "5", name: "Accessibilité", level: 78 },
      { id: "6", name: "Motion design", level: 70 },
    ],
    linkedin: "linkedin.com/in/sophiemartin",
    github: "",
    twitter: "",
    portfolio: "sophiemartin.design",
  },
};

/** CV de référence des vignettes de modèles. */
export const demoResume = demoResumes.developpeur;

export const demoResumeList = Object.values(demoResumes);
