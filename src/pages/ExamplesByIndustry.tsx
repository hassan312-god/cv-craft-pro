import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Search } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { avatarFor } from "@/lib/avatarPlaceholder";
import { demoResumes } from "@/lib/demoResumes";
import { CanvasRenderer } from "@/components/canvas/CanvasRenderer";
import { PAGE_WIDTH } from "@/lib/canvasDocument";
import { canvasPresets, getPreset } from "@/lib/canvasPresets";
import { cvCategories, exampleCVs, type CVCategory } from "@/lib/exampleCVData";

/** Modèle de départ de chaque secteur ; les vignettes suivantes tournent à
 *  partir de lui, pour qu'une même section ne montre pas six fois la même
 *  mise en page. */
const PRESET_BY_CATEGORY: Record<string, string> = {
  tech: "sidebar",
  design: "creative",
  marketing: "two-columns",
  management: "executive",
  finance: "classic",
  sales: "corporate",
  education: "traditional",
  medical: "prime-ats",
  jsonresume: "pure-ats",
};

interface CardProps {
  id: string;
  label: string;
  category: string;
}

const ExampleCard = ({ id, label, category, index }: CardProps & { index: number }) => {
  const navigate = useNavigate();
  const example = exampleCVs[id];
  const width = 200;

  const doc = useMemo(() => {
    const startId = PRESET_BY_CATEGORY[category] ?? canvasPresets[0].id;
    const start = Math.max(0, canvasPresets.findIndex((preset) => preset.id === startId));
    const preset = canvasPresets[(start + index) % canvasPresets.length];
    return preset.build(preset.accent);
  }, [category, index]);

  return (
    <button
      onClick={() => navigate("/create", { state: { cvData: example.data } })}
      className="group w-full text-left"
    >
      <div className="overflow-hidden rounded-md bg-[#f2f4f7] p-3 transition-colors duration-300 group-hover:bg-[#e8ecf2]">
        <div
          className="mx-auto overflow-hidden bg-white shadow-[0_2px_8px_rgba(15,23,42,0.10)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_10px_24px_rgba(15,23,42,0.16)]"
          style={{ width, height: width * 1.414 }}
        >
          <div style={{ transform: `scale(${width / PAGE_WIDTH})`, transformOrigin: "top left" }}>
            <CanvasRenderer
              doc={doc}
              cvData={{ ...example.data, photo: example.data.photo || avatarFor(id) }}
            />
          </div>
        </div>
      </div>
      <p className="mt-2.5 text-[13px] font-semibold text-slate-700 transition-colors group-hover:text-emerald-700">
        {label}
      </p>
    </button>
  );
};

/**
 * Exemples de CV classés par secteur d'activité.
 *
 * Chaque vignette est un CV réellement rempli : la cliquer démarre le tunnel
 * de création avec ces données déjà en place.
 */
const ExamplesByIndustry = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  /** Exemples regroupés par secteur, filtrés par la recherche. */
  const grouped = useMemo(() => {
    const search = query.trim().toLowerCase();
    const groups = new Map<string, CardProps[]>();

    Object.entries(exampleCVs).forEach(([id, example]) => {
      // « jsonresume » est un reliquat technique des anciens thèmes, pas un
      // secteur d'activité : il n'a pas sa place dans les exemples métier.
      if (example.category === "jsonresume") return;
      const label = `${example.data.experiences?.[0]?.position ?? id}`;
      if (search && !label.toLowerCase().includes(search) && !id.includes(search)) return;
      const list = groups.get(example.category) ?? [];
      list.push({ id, label, category: example.category });
      groups.set(example.category, list);
    });

    return [...groups.entries()];
  }, [query]);

  const total = Object.values(exampleCVs).filter(
    (example) => example.category !== "jsonresume",
  ).length;

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <SiteHeader />

      {/* Bandeau d'introduction */}
      <section className="bg-[#eef3fb]">
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-6 sm:px-8">
          <nav className="flex items-center gap-1 text-xs text-slate-500">
            <button onClick={() => navigate("/")} className="transition-colors hover:text-slate-900">
              Accueil
            </button>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-slate-700">Exemples de CV</span>
          </nav>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
            <div className="max-w-xl">
            <Reveal>
              <h1 className="font-display text-3xl font-extrabold leading-tight tracking-[-0.025em] sm:text-[2.75rem]">
                {total} exemples de CV <span className="text-emerald-600">par métier</span>
              </h1>
            </Reveal>
            <Reveal delay={90}>
              <p className="mt-4 text-[15px] leading-7 text-slate-600">
                Inspirez-vous d'un CV complet écrit pour votre secteur. Cliquez sur un exemple pour
                démarrer avec son contenu déjà en place, puis remplacez-le par le vôtre.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <button
                onClick={() => navigate("/create")}
                className="mt-7 rounded-lg bg-emerald-600 px-6 py-3 text-[15px] font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700"
              >
                Créer mon CV
              </button>
            </Reveal>
            </div>

            {/* Composition de CV : la colonne de droite n'est plus vide */}
            <div className="relative hidden justify-center lg:flex">
              <div className="absolute h-56 w-56 rounded-full bg-emerald-200/50 blur-3xl" />
              {[
                { presetId: "monaco", data: demoResumes.designer, className: "-rotate-6" },
                { presetId: "prestige", data: demoResumes.marketing, className: "-mt-8 rotate-3" },
              ].map((sheet) => {
                const preset = getPreset(sheet.presetId);
                const doc = preset.build(preset.accent);
                const width = 168;
                return (
                  <div
                    key={sheet.presetId}
                    className={`relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl transition duration-500 hover:-translate-y-2 ${sheet.className}`}
                    style={{ width, height: width * 1.414 }}
                  >
                    <div style={{ transform: `scale(${width / PAGE_WIDTH})`, transformOrigin: "top left" }}>
                      <CanvasRenderer doc={doc} cvData={sheet.data} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Recherche */}
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="flex items-center gap-2 rounded-lg border-2 border-emerald-500 bg-white px-4 py-3 shadow-sm">
          <Search className="h-4 w-4 shrink-0 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Saisissez votre métier…"
            className="w-full bg-transparent text-[15px] outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Accès rapide aux secteurs */}
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {(Object.keys(cvCategories) as CVCategory[])
            .filter((key) => key !== "jsonresume")
            .map((key) => (
            <a
              key={key}
              href={`#secteur-${key}`}
              className="text-emerald-700 transition-colors hover:text-emerald-900 hover:underline"
            >
              {cvCategories[key]}
              </a>
            ))}
        </div>
      </div>

      {/* Sections par secteur */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        {grouped.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 py-16 text-center text-sm text-slate-500">
            Aucun exemple ne correspond à cette recherche.
          </p>
        ) : (
          grouped.map(([category, items]) => (
            <div
              key={category}
              id={`secteur-${category}`}
              className="scroll-mt-24 border-t border-slate-200 py-10 first:border-t-0"
            >
              <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
                <div>
                  <h2 className="font-display text-2xl font-extrabold">
                    {cvCategories[category as CVCategory] ?? category}
                    <span className="ml-2 align-super text-xs font-bold text-slate-400">
                      {items.length}
                    </span>
                  </h2>
                </div>
                <p className="text-[13px] leading-6 text-slate-500">
                  Des exemples rédigés pour ce secteur : intitulés de postes, réalisations chiffrées
                  et compétences attendues par les recruteurs du domaine.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
                {items.map((item, index) => (
                  <Reveal key={item.id} delay={(index % 4) * 70} from="scale">
                    <ExampleCard {...item} index={index} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      <SiteFooter />
    </main>
  );
};

export default ExamplesByIndustry;
