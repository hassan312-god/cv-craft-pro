import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Download,
  FileText,
  LayoutTemplate,
  Menu,
  MousePointerClick,
  PencilRuler,
  ShieldCheck,
  Sparkles,
  Star,
  WandSparkles,
  X,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { CanvasRenderer } from "@/components/canvas/CanvasRenderer";
import { PAGE_WIDTH } from "@/lib/canvasDocument";
import { ACCENT_CHOICES, canvasPresets, getPreset } from "@/lib/canvasPresets";
import { demoResume, demoResumes } from "@/lib/demoResumes";
import type { CVData } from "@/pages/CVCreate";

/* ------------------------------------------------------------------ */
/* Données de la page                                                  */
/* ------------------------------------------------------------------ */

const heroSheets = [
  { presetId: "classic", data: demoResumes.developpeur },
  { presetId: "sidebar", data: demoResumes.designer },
  { presetId: "corporate", data: demoResumes.marketing },
];

/** Bénéfices affichés en petites cartes sous le compteur. */
const PERKS = [
  { icon: WandSparkles, title: "Un CV en 10 minutes", text: "L'éditeur fait le travail de mise en page à votre place." },
  { icon: ShieldCheck, title: "Zéro erreur de format", text: "Marges, alignements et césures gérés automatiquement." },
  { icon: LayoutTemplate, title: "Modèles testés ATS", text: "Structures lisibles par les logiciels de tri." },
  { icon: Download, title: "Export PDF illimité", text: "Téléchargez autant de versions que nécessaire." },
];

const NAV_LINKS = [
  { label: "Modèles", to: "/modeles" },
  { label: "Exemples", to: "/exemples" },
  { label: "Fonctionnalités", to: "#fonctionnalites" },
  { label: "Tarifs", to: "#tarifs" },
  { label: "FAQ", to: "#faq" },
];

const STEPS = [
  {
    icon: LayoutTemplate,
    title: "Choisissez un modèle",
    text: "Six mises en page professionnelles, huit couleurs d'accent. Chaque aperçu montre un CV réellement rempli.",
  },
  {
    icon: WandSparkles,
    title: "Remplissez votre parcours",
    text: "Un formulaire guidé étape par étape, avec l'assistant IA pour transformer vos missions en résultats.",
  },
  {
    icon: Download,
    title: "Exportez et postulez",
    text: "Téléchargez un PDF prêt à envoyer, ou repassez dans l'éditeur pour ajuster chaque bloc au pixel.",
  },
];

const FEATURES = [
  {
    tag: "Éditeur libre",
    title: "Déplacez chaque bloc, comme sur une planche de design.",
    text: "Glissez, redimensionnez, changez la police et les couleurs. Vos sections restent connectées à vos données : modifier votre CV ne casse jamais la mise en page.",
    points: ["Glisser-déposer au pixel", "Aimantation et repères d'alignement", "Annuler / rétablir illimité"],
    cta: { label: "Ouvrir l'éditeur", to: "/editeur" },
    icon: PencilRuler,
  },
  {
    tag: "Compatible ATS",
    title: "Un CV lisible par les robots de recrutement.",
    text: "Structure claire, titres explicites, pas de colonnes illisibles pour les logiciels de tri. Vos candidatures passent le premier filtre.",
    points: ["Modèles marqués ATS", "Export PDF texte sélectionnable", "Sections standardisées"],
    cta: { label: "Voir les modèles ATS", to: "/modeles" },
    icon: ShieldCheck,
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Cheffe de projet",
    text: "J'ai enfin pu déplacer les blocs comme je le voulais. En vingt minutes mon CV était prêt et vraiment à mon image.",
  },
  {
    name: "Karim B.",
    role: "Développeur back-end",
    text: "L'aperçu en direct pendant que je remplis le formulaire change tout. Plus besoin de retoucher un document Word pendant des heures.",
  },
  {
    name: "Léa D.",
    role: "Designer UX",
    text: "Les modèles ne font pas « template gratuit ». J'ai changé la couleur d'accent et c'était exactement ce que je cherchais.",
  },
];

const FAQ = [
  {
    q: "L'outil est-il vraiment gratuit ?",
    a: "Oui. Créer un CV, le personnaliser dans l'éditeur et l'exporter en PDF ne coûte rien et ne demande aucune carte bancaire.",
  },
  {
    q: "Dois-je créer un compte ?",
    a: "Non. Vos brouillons sont enregistrés dans votre navigateur. Créer un compte sert uniquement à retrouver vos CV depuis un autre appareil.",
  },
  {
    q: "Mes CV passent-ils les filtres ATS ?",
    a: "Les modèles marqués ATS utilisent une structure linéaire, des titres de sections standards et un PDF dont le texte reste sélectionnable, ce qu'attendent les logiciels de tri.",
  },
  {
    q: "Puis-je modifier la mise en page après coup ?",
    a: "Oui, à tout moment. L'éditeur laisse déplacer, redimensionner et restyliser chaque bloc, et vos données restent liées aux sections.",
  },
  {
    q: "Dans quels formats puis-je exporter ?",
    a: "PDF au format A4 pour vos candidatures, et PNG haute résolution si vous voulez partager une image de votre CV.",
  },
];


/* ------------------------------------------------------------------ */
/* Composants                                                          */
/* ------------------------------------------------------------------ */

interface SheetProps {
  presetId: string;
  data: CVData;
  width?: number;
}

/** Vignette A4 d'un modèle, rendue avec un CV d'exemple rempli. */
const Sheet = ({ presetId, data, width = 220 }: SheetProps) => {
  const preset = getPreset(presetId);
  const doc = preset.build(preset.accent);
  const scale = width / PAGE_WIDTH;

  return (
    <div
      className="relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl"
      style={{ width, height: width * 1.414 }}
    >
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
        <CanvasRenderer doc={doc} cvData={data} />
      </div>
    </div>
  );
};

const Stars = () => (
  <span className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, index) => (
      <Star key={index} className="h-4 w-4 fill-amber-400 text-amber-400" />
    ))}
  </span>
);

const Index = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  /** Les entrées de navigation mêlent routes et ancres de la page. */
  const go = (to: string) => {
    setMenuOpen(false);
    if (to.startsWith("#")) {
      document.querySelector(to)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    navigate(to);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-900">
      {/* ---------------------------------------------------------- */}
      {/* En-tête                                                     */}
      {/* ---------------------------------------------------------- */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-8 px-5 py-3.5 sm:px-8">
          <button
            onClick={() => go("/")}
            className="font-display text-xl font-extrabold tracking-tight"
          >
            CV<span className="text-emerald-600">Craft</span>
          </button>

          <nav className="hidden flex-1 items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => go(link.to)}
                className="relative text-[15px] font-semibold text-slate-600 transition-colors hover:text-slate-900 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <button
              onClick={() => go("/auth")}
              className="hidden px-3 py-2 text-[15px] font-semibold text-slate-600 transition-colors hover:text-slate-900 sm:block"
            >
              Connexion
            </button>
            <button
              onClick={() => go("/create")}
              className="rounded-lg bg-emerald-600 px-4 py-2.5 text-[15px] font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md sm:px-5"
            >
              Créer mon CV
            </button>
            <button
              onClick={() => setMenuOpen((open) => !open)}
              className="rounded-lg p-2 text-slate-600 lg:hidden"
              aria-label="Menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav className="animate-fade-in border-t border-slate-200 bg-white px-5 py-3 lg:hidden">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => go(link.to)}
                className="block w-full py-2.5 text-left text-[15px] font-semibold text-slate-700"
              >
                {link.label}
              </button>
            ))}
          </nav>
        ) : null}
      </header>

      {/* ---------------------------------------------------------- */}
      {/* Héros                                                       */}
      {/* ---------------------------------------------------------- */}
      <section className="bg-white px-3 pt-4 sm:px-6">
        <div className="mx-auto grid max-w-7xl items-center gap-12 rounded-2xl bg-[#f4f7fb] px-6 py-14 sm:px-12 sm:py-20 lg:grid-cols-[1fr_1.05fr]">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
              <Sparkles className="h-3.5 w-3.5" /> Gratuit, sans inscription
            </div>

            <h1 className="font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-[-0.025em] sm:text-6xl lg:text-[4.1rem]">
              Décrochez l'entretien avec un <span className="text-emerald-600">CV percutant</span>.
            </h1>

            <p className="mt-6 max-w-lg text-[17px] leading-8 text-slate-600">
              Des modèles conçus par des designers, un éditeur où chaque bloc se déplace librement,
              et un export PDF prêt à envoyer. Votre prochaine opportunité commence ici.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => go("/create")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-7 py-4 text-[15px] font-bold text-white shadow-lg shadow-emerald-600/25 transition hover:-translate-y-0.5 hover:bg-emerald-700"
              >
                Créer mon CV maintenant <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => go("/modeles")}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-7 py-4 text-[15px] font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-900"
              >
                <MousePointerClick className="h-4 w-4" /> Voir les modèles
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
                <Check className="h-4 w-4 text-emerald-600" /> {canvasPresets.length} modèles modifiables
              </span>
              <span className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
                <Check className="h-4 w-4 text-emerald-600" /> Export PDF gratuit
              </span>
            </div>
          </div>

          {/* Pile de CV animée */}
          <div className="relative flex min-h-[360px] items-center justify-center lg:min-h-[480px]">
            <div className="absolute h-72 w-72 rounded-full bg-sky-300/40 blur-3xl" />
            <div className="relative flex w-full max-w-[560px] items-end justify-center gap-3 sm:gap-6">
              {heroSheets.map((sheet, index) => (
                // Deux niveaux : l'animation d'entrée pilote le `transform` du
                // parent, l'inclinaison et le survol restent sur l'enfant.
                <div
                  key={sheet.presetId}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 140}ms` }}
                >
                  <button
                    onClick={() => navigate("/editeur", { state: { presetId: sheet.presetId } })}
                    aria-label={`Ouvrir le modèle ${getPreset(sheet.presetId).name}`}
                    className={`block transition duration-500 hover:z-10 hover:-translate-y-3 hover:rotate-0 hover:scale-[1.06] ${
                      index === 1 ? "-translate-y-10" : index === 0 ? "-rotate-[7deg]" : "rotate-[7deg]"
                    }`}
                  >
                    <Sheet presetId={sheet.presetId} data={sheet.data} width={196} />
                  </button>
                </div>
              ))}
            </div>

            <div className="absolute bottom-4 left-2 hidden animate-fade-in items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg lg:flex" style={{ animationDelay: "500ms" }}>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Check className="h-4 w-4" />
              </span>
              <span className="text-xs font-bold">CV compatible ATS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Compteur et bénéfices */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <Reveal>
            {/* Chiffre calculé depuis les modèles réellement disponibles :
                aucune statistique d'usage n'est inventée ici. */}
            <p className="text-center font-display text-3xl font-extrabold tracking-[-0.02em] sm:text-[2.75rem]">
              <span className="text-emerald-600">
                {(canvasPresets.length * ACCENT_CHOICES.length).toLocaleString("fr-FR")}
              </span>{" "}
              mises en page prêtes à l'emploi
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PERKS.map((perk, index) => (
              <Reveal key={perk.title} delay={index * 70}>
                <div className="h-full rounded-xl bg-[#f4f7fb] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                  <perk.icon className="h-5 w-5 text-emerald-600" />
                  <h3 className="mt-3 font-display text-[15px] font-bold">{perk.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-6 text-slate-500">{perk.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Modèles                                                     */}
      {/* ---------------------------------------------------------- */}
      <section id="modeles" className="bg-[#f4f7fb]"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
              Modèles de CV
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-[-0.02em] sm:text-5xl">
              Des modèles qui donnent envie de vous rencontrer
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[17px] leading-8 text-slate-600">
              Chaque modèle s'ouvre dans l'éditeur : déplacez, redimensionnez et recolorez
              exactement comme vous le souhaitez.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {canvasPresets.slice(0, 6).map((preset, index) => (
            <Reveal key={preset.id} delay={index * 80} from="scale">
              <button
                onClick={() => navigate("/editeur", { state: { presetId: preset.id } })}
                className="group w-full text-left"
              >
                <div className="relative mx-auto overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-2xl">
                  <div className="transition-transform duration-500 group-hover:scale-[1.03]">
                    <Sheet presetId={preset.id} data={demoResume} width={340} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/65 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-flex translate-y-2 items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-transform duration-300 group-hover:translate-y-0">
                      <PencilRuler className="h-4 w-4" /> Utiliser ce modèle
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold">{preset.name}</h3>
                    <p className="mt-0.5 text-xs text-slate-500">{preset.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-emerald-600 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-14 text-center">
            <button
              onClick={() => go("/modeles")}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-7 py-3.5 text-[15px] font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-900"
            >
              Explorer tous les modèles <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </div></section>

      {/* ---------------------------------------------------------- */}
      {/* Comment ça marche                                           */}
      {/* ---------------------------------------------------------- */}
      <section id="etapes" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                En trois étapes
              </p>
              <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-[-0.02em] sm:text-5xl">
                Votre CV prêt en moins de dix minutes
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <Reveal key={step.title} delay={index * 120}>
                <div className="relative h-full rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <span className="absolute right-6 top-5 font-display text-5xl font-extrabold text-slate-100">
                    {index + 1}
                  </span>
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white">
                    <step.icon className="h-5 w-5" />
                  </span>
                  <h3 className="relative mt-5 font-display text-xl font-bold">{step.title}</h3>
                  <p className="relative mt-3 text-[15px] leading-7 text-slate-600">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Fonctionnalités (blocs alternés)                            */}
      {/* ---------------------------------------------------------- */}
      <section id="fonctionnalites" className="mx-auto max-w-7xl space-y-24 px-5 py-20 sm:px-8 sm:py-28">
        {FEATURES.map((feature, index) => (
          <div
            key={feature.title}
            className={`grid items-center gap-12 lg:grid-cols-2 ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
          >
            <Reveal from={index % 2 === 1 ? "bottom" : "left"}>
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
                  <feature.icon className="h-3.5 w-3.5" /> {feature.tag}
                </p>
                <h2 className="mt-5 max-w-md font-display text-3xl font-extrabold leading-tight tracking-[-0.02em] sm:text-[2.6rem]">
                  {feature.title}
                </h2>
                <p className="mt-5 max-w-md text-[17px] leading-8 text-slate-600">{feature.text}</p>
                <ul className="mt-6 space-y-3">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-[15px] font-medium text-slate-700">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <Check className="h-3 w-3" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => go(feature.cta.to)}
                  className="mt-8 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3.5 text-[15px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  {feature.cta.label} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </Reveal>

            <Reveal from="scale" delay={120}>
              <div className="flex justify-center rounded-2xl bg-[#f4f6f9] p-8">
                <Sheet
                  presetId={index === 0 ? "creative" : "executive"}
                  data={index === 0 ? demoResumes.designer : demoResumes.marketing}
                  width={280}
                />
              </div>
            </Reveal>
          </div>
        ))}
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Témoignages                                                 */}
      {/* ---------------------------------------------------------- */}
      <section className="border-y border-slate-200 bg-[#e8f5ef]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-extrabold tracking-[-0.02em] sm:text-5xl">
              Ils ont décroché leur entretien
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 110}>
                <figure className="h-full rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <Stars />
                  <blockquote className="mt-4 text-[15px] leading-7 text-slate-700">
                    « {testimonial.text} »
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-display font-bold text-emerald-700">
                      {testimonial.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-sm font-bold">{testimonial.name}</span>
                      <span className="block text-xs text-slate-500">{testimonial.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Tarifs                                                      */}
      {/* ---------------------------------------------------------- */}
      <section id="tarifs" className="bg-[#fdf5ea]"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Tarifs</p>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-[-0.02em] sm:text-5xl">
              Un CV professionnel, sans abonnement
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[17px] leading-8 text-slate-600">
              Créez, personnalisez et exportez gratuitement. Aucun paiement caché pour démarrer.
            </p>
          </div>
        </Reveal>

        <Reveal delay={140} from="scale">
          <div className="mx-auto mt-12 max-w-sm rounded-2xl border-2 border-emerald-600 bg-white p-8 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-bold">Accès gratuit</span>
              <FileText className="h-5 w-5 text-emerald-600" />
            </div>
            <p className="mt-4 font-display text-5xl font-extrabold">0 €</p>
            <p className="mt-1 text-sm text-slate-500">Pour toujours</p>
            <div className="mt-6 space-y-3 text-[15px] text-slate-600">
              {[
                "6 mises en page modifiables",
                "Éditeur canvas complet",
                "Export PDF et PNG",
                "Assistant de rédaction IA",
                "Aucune carte bancaire",
              ].map((item) => (
                <p key={item} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check className="h-3 w-3" />
                  </span>
                  {item}
                </p>
              ))}
            </div>
            <button
              onClick={() => go("/create")}
              className="mt-8 w-full rounded-lg bg-emerald-600 py-3.5 text-[15px] font-bold text-white transition hover:bg-emerald-700"
            >
              Commencer maintenant
            </button>
          </div>
        </Reveal>
      </div></section>

      {/* ---------------------------------------------------------- */}
      {/* FAQ                                                         */}
      {/* ---------------------------------------------------------- */}
      <section id="faq" className="border-y border-slate-200 bg-[#f4f6f9]">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-extrabold tracking-[-0.02em] sm:text-5xl">
              Questions fréquentes
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <Accordion type="single" collapsible className="mt-12">
              {FAQ.map((item) => (
                <AccordionItem key={item.q} value={item.q} className="border-slate-200">
                  <AccordionTrigger className="text-left font-display text-[17px] font-bold hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] leading-7 text-slate-600">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
};

export default Index;
