import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  Download,
  FileText,
  LayoutTemplate,
  MousePointerSquareDashed,
  PencilRuler,
  Save,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ResumeThumb } from "@/components/canvas/ResumeThumb";
import { canvasPresets, getPreset } from "@/lib/canvasPresets";
import { demoResumes } from "@/lib/demoResumes";

const HIGHLIGHTS = [
  {
    icon: PencilRuler,
    title: "Éditeur libre",
    text: "Chaque bloc se déplace, se redimensionne et se restylise. Aimantation sur grille et repères d'alignement inclus.",
  },
  {
    icon: WandSparkles,
    title: "Rédaction assistée",
    text: "Une accroche rédigée à partir de votre parcours, à retoucher ensuite comme bon vous semble.",
  },
  {
    icon: ShieldCheck,
    title: "Compatible ATS",
    text: "Des modèles à structure linéaire et titres standards, lisibles par les logiciels de tri des recruteurs.",
  },
  {
    icon: Download,
    title: "Export PDF et PNG",
    text: "Un PDF A4 prêt à envoyer, ou une image haute résolution pour partager votre CV en ligne.",
  },
  {
    icon: Save,
    title: "Brouillons automatiques",
    text: "Votre travail est conservé dans le navigateur : revenez quand vous voulez, rien n'est perdu.",
  },
  {
    icon: MousePointerSquareDashed,
    title: "Aperçu en direct",
    text: "Le CV se met à jour pendant la saisie : plus de va-et-vient entre un formulaire et un document.",
  },
];

const BLOCKS = [
  {
    tag: "Mise en page",
    title: "Un éditeur, pas un gabarit figé.",
    text: "Les modèles classiques imposent leur structure. Ici, chaque bloc est un objet que vous déplacez librement sur la page, tout en restant relié à vos données.",
    points: [
      "Glisser-déposer au pixel près",
      "Poignées de redimensionnement sur huit points",
      "Annuler et rétablir sans limite",
      "Verrouillage des blocs terminés",
    ],
    presetId: "aurora",
    data: demoResumes.designer,
  },
  {
    tag: "Contenu",
    title: "Vos données pilotent la mise en page.",
    text: "Les sections Expériences, Formation ou Compétences affichent en direct ce que vous avez saisi. Modifier votre parcours ne casse jamais le design.",
    points: [
      "Sections reliées au formulaire",
      "Blocs de texte libres pour le reste",
      "Changement de modèle sans ressaisie",
      "Seize mises en page interchangeables",
    ],
    presetId: "prestige",
    data: demoResumes.marketing,
  },
];

const Sheet = ({ presetId, data }: { presetId: string; data: typeof demoResumes.designer }) => {
  const preset = getPreset(presetId);
  return (
    <ResumeThumb
      doc={preset.build(preset.accent)}
      cvData={data}
      className="rounded-lg border border-slate-200 shadow-xl"
    />
  );
};

/** Page « Fonctionnalités » : ce que fait l'outil, section par section. */
const Features = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <SiteHeader />

      <section className="bg-[#eef3fb]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-14 pt-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <div>
            <nav className="flex items-center gap-1 text-xs text-slate-500">
              <button onClick={() => navigate("/")} className="transition-colors hover:text-slate-900">
                Accueil
              </button>
              <ChevronRight className="h-3 w-3" />
              <span className="font-semibold text-slate-700">Fonctionnalités</span>
            </nav>

            <Reveal>
              <h1 className="mt-8 font-display text-3xl font-extrabold leading-tight tracking-[-0.025em] sm:text-[2.75rem]">
                Tout ce qu'il faut pour un CV <span className="text-emerald-600">qui passe le tri</span>
              </h1>
            </Reveal>
            <Reveal delay={90}>
              <p className="mt-4 max-w-lg text-[15px] leading-7 text-slate-600">
                Un tunnel de création guidé, un éditeur libre, {canvasPresets.length} mises en page
                et un export PDF prêt à envoyer. Sans abonnement.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <button
                onClick={() => navigate("/create")}
                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-[15px] font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700"
              >
                Créer mon CV <ArrowRight className="h-4 w-4" />
              </button>
            </Reveal>
          </div>

          <div className="hidden justify-center lg:flex">
            <div className="w-full max-w-[280px] -rotate-3">
              <Sheet presetId="monaco" data={demoResumes.developpeur} />
            </div>
          </div>
        </div>
      </section>

      {/* Grille de fonctionnalités */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <div className="h-full rounded-2xl border border-slate-200 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <item.icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-display text-lg font-bold">{item.title}</h2>
                <p className="mt-2 text-[14px] leading-7 text-slate-600">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Blocs détaillés */}
      <section className="bg-[#f7f8fa]">
        <div className="mx-auto max-w-7xl space-y-20 px-5 py-16 sm:px-8 sm:py-24">
          {BLOCKS.map((block, index) => (
            <div
              key={block.title}
              className={`grid items-center gap-12 lg:grid-cols-2 ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal from={index % 2 === 1 ? "bottom" : "left"}>
                <div>
                  <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
                    <Sparkles className="h-3.5 w-3.5" /> {block.tag}
                  </p>
                  <h2 className="mt-5 max-w-md font-display text-3xl font-extrabold leading-tight tracking-[-0.02em]">
                    {block.title}
                  </h2>
                  <p className="mt-5 max-w-md text-[15px] leading-7 text-slate-600">{block.text}</p>
                  <ul className="mt-6 space-y-3">
                    {block.points.map((point) => (
                      <li key={point} className="flex items-center gap-3 text-[15px] text-slate-700">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal from="scale" delay={120}>
                <div className="flex justify-center">
                  <div className="w-full max-w-[300px]">
                    <Sheet presetId={block.presetId} data={block.data} />
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* Renvois */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: LayoutTemplate, label: "Voir les modèles", to: "/modeles" },
            { icon: FileText, label: "Exemples par métier", to: "/exemples" },
            { icon: PencilRuler, label: "Ouvrir l'éditeur", to: "/editeur" },
          ].map((item, index) => (
            <Reveal key={item.label} delay={index * 80}>
              <button
                onClick={() => navigate(item.to)}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-5 text-left transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
              >
                <span className="flex items-center gap-3 font-display font-bold">
                  <item.icon className="h-5 w-5 text-emerald-600" /> {item.label}
                </span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
};

export default Features;
