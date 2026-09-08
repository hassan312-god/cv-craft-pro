import { useNavigate } from "react-router-dom";
import { ArrowRight, LayoutTemplate } from "lucide-react";
import { CanvasRenderer } from "@/components/canvas/CanvasRenderer";
import { PAGE_WIDTH } from "@/lib/canvasDocument";
import { getPreset } from "@/lib/canvasPresets";
import { demoResumes } from "@/lib/demoResumes";

const FOOTER_COLUMNS = [
  {
    title: "CV",
    links: [
      { label: "Créer un CV", to: "/create" },
      { label: "Éditeur canvas", to: "/editeur" },
      { label: "Modèles de CV", to: "/modeles" },
      { label: "Exemples de CV", to: "/exemples" },
    ],
  },
  {
    title: "Modèles",
    links: [
      { label: "Modèles ATS", to: "/modeles" },
      { label: "Modèles simples", to: "/modeles" },
      { label: "Modèles professionnels", to: "/modeles" },
      { label: "Modèles créatifs", to: "/modeles" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Exemples par métier", to: "/exemples" },
      { label: "Galerie par catégorie", to: "/gallery" },
      { label: "Formulaire détaillé", to: "/formulaire" },
    ],
  },
  {
    title: "Compte",
    links: [
      { label: "Connexion", to: "/auth" },
      { label: "Créer un compte", to: "/auth" },
      { label: "Mes CV", to: "/mes-cv" },
    ],
  },
];

const BANNER_SHEETS = [
  { presetId: "classic", data: demoResumes.developpeur },
  { presetId: "traditional", data: demoResumes.marketing },
  { presetId: "specialist", data: demoResumes.designer },
];

/**
 * Bandeau d'appel à l'action suivi du pied de page sombre.
 * Partagé par la page d'accueil, la galerie et les exemples.
 */
export const SiteFooter = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Bandeau modèles */}
      <section className="bg-[#25286b] px-5 py-16 text-white sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-[-0.02em] sm:text-[2.5rem]">
              Des modèles prêts à l'emploi
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-7 text-slate-300">
              Convainquez les recruteurs avec l'un de nos modèles élégants, conçus pour être lus
              aussi bien par un humain que par un logiciel de tri. Export PDF gratuit.
            </p>
            <button
              onClick={() => navigate("/modeles")}
              className="mt-8 rounded-lg bg-emerald-500 px-6 py-3 text-[15px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-emerald-400"
            >
              Choisir un modèle
            </button>
          </div>

          <div className="flex justify-center gap-4 sm:gap-6">
            {BANNER_SHEETS.map((sheet, index) => {
              const preset = getPreset(sheet.presetId);
              const doc = preset.build(preset.accent);
              const width = 150;
              return (
                <button
                  key={sheet.presetId}
                  onClick={() => navigate("/editeur", { state: { presetId: sheet.presetId } })}
                  aria-label={`Ouvrir le modèle ${preset.name}`}
                  className={`overflow-hidden rounded bg-white shadow-2xl transition duration-500 hover:-translate-y-2 ${
                    index === 1 ? "hidden sm:block" : index === 2 ? "hidden lg:block" : ""
                  }`}
                  style={{ width, height: width * 1.414 }}
                >
                  <div style={{ transform: `scale(${width / PAGE_WIDTH})`, transformOrigin: "top left" }}>
                    <CanvasRenderer doc={doc} cvData={sheet.data} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pied de page */}
      <footer className="bg-[#0b1120] px-5 py-14 text-slate-300 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <button
              onClick={() => navigate("/create")}
              className="inline-flex items-center gap-2 font-display text-lg font-bold text-white transition-colors hover:text-emerald-400"
            >
              Créer un CV <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-10 border-t border-white/10 pt-10 md:grid-cols-2 lg:grid-cols-5">
            <div>
              <div className="flex items-center gap-2 font-display text-lg font-extrabold text-white">
                <LayoutTemplate className="h-5 w-5 text-emerald-500" /> CVCraft
              </div>
              <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
                Créez un CV qui vous ressemble et ouvrez la porte à de nouvelles opportunités.
              </p>
            </div>

            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => navigate(link.to)}
                        className="text-sm text-slate-400 transition-colors hover:text-emerald-400"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} CV Craft Pro. Tous droits réservés.
          </p>
        </div>
      </footer>
    </>
  );
};
