import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Eye, PencilRuler, Search, Sparkles } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Reveal } from "@/components/Reveal";
import { CanvasRenderer } from "@/components/canvas/CanvasRenderer";
import { PAGE_HEIGHT, PAGE_WIDTH } from "@/lib/canvasDocument";
import {
  ACCENT_CHOICES,
  PRESET_CATEGORIES,
  canvasPresets,
  type PresetCategory,
} from "@/lib/canvasPresets";
import { exampleCVs } from "@/lib/exampleCVData";
import type { CVData } from "@/pages/CVCreate";

/** CV de démonstration : les vignettes montrent un CV rempli, jamais une page vide. */
const demoCV: CVData = exampleCVs["dev-fullstack"].data;

type Filter = PresetCategory | "all";

interface PreviewProps {
  presetId: string;
  accent: string;
  /** Largeur d'affichage en px ; la page A4 est mise à l'échelle dedans. */
  width: number;
}

const PresetPreview = ({ presetId, accent, width }: PreviewProps) => {
  const scale = width / PAGE_WIDTH;
  const preset = canvasPresets.find((item) => item.id === presetId) ?? canvasPresets[0];
  const doc = useMemo(() => preset.build(accent), [preset, accent]);

  return (
    <div
      className="relative overflow-hidden bg-white"
      style={{ width, height: PAGE_HEIGHT * scale }}
    >
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
        <CanvasRenderer doc={doc} cvData={demoCV} />
      </div>
    </div>
  );
};

const TemplatesGallery = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  /** Accent choisi carte par carte : chaque modèle garde sa propre couleur. */
  const [accents, setAccents] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<{ presetId: string; accent: string } | null>(null);

  const accentOf = (presetId: string) =>
    accents[presetId] ?? canvasPresets.find((preset) => preset.id === presetId)?.accent ?? ACCENT_CHOICES[0];

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: canvasPresets.length };
    canvasPresets.forEach((preset) => {
      result[preset.category] = (result[preset.category] ?? 0) + 1;
    });
    return result;
  }, []);

  const visible = canvasPresets.filter((preset) => {
    const matchesCategory = filter === "all" || preset.category === filter;
    const search = query.trim().toLowerCase();
    const matchesQuery =
      !search ||
      preset.name.toLowerCase().includes(search) ||
      preset.description.toLowerCase().includes(search) ||
      preset.tags.some((tag) => tag.toLowerCase().includes(search));
    return matchesCategory && matchesQuery;
  });

  const openEditor = (presetId: string) =>
    navigate("/editeur", { state: { presetId, accent: accentOf(presetId) } });

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-[#fbfaf7]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" /> Accueil
          </button>
          <span className="text-lg font-bold tracking-tight">
            CV<span className="text-emerald-600">Craft</span>
          </span>
          <button
            onClick={() => navigate("/create")}
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md"
          >
            Créer mon CV
          </button>
        </div>
      </header>

      {/* En-tête de section */}
      <section className="border-b border-slate-200 bg-[#f2f1ed]">
        <div className="mx-auto max-w-6xl px-5 py-12 text-center sm:px-8 sm:py-16">
          <Reveal>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
              <Sparkles className="h-3.5 w-3.5" /> {canvasPresets.length} modèles · {ACCENT_CHOICES.length} couleurs
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              Modèles de CV <span className="text-emerald-600">entièrement modifiables</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              Cliquez sur un modèle pour l'ouvrir dans l'éditeur : chaque bloc se déplace, se
              redimensionne et se restylise librement.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 shadow-sm transition focus-within:border-emerald-500 focus-within:shadow-md">
              <Search className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Rechercher un modèle…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Filtres */}
      <div className="sticky top-[57px] z-30 border-b border-slate-200 bg-[#fbfaf7]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-2 px-5 py-3 sm:px-8">
          {(["all", ...Object.keys(PRESET_CATEGORIES)] as Filter[]).map((key) => {
            const label = key === "all" ? "Tous" : PRESET_CATEGORIES[key as PresetCategory];
            const active = filter === key;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "scale-105 border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                    : "border-slate-300 bg-white text-slate-600 hover:-translate-y-0.5 hover:border-slate-500"
                }`}
              >
                {label} ({counts[key] ?? 0})
              </button>
            );
          })}
        </div>
      </div>

      {/* Grille de modèles */}
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        {visible.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 py-16 text-center text-sm text-slate-500">
            Aucun modèle ne correspond à cette recherche.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((preset, index) => {
              const accent = accentOf(preset.id);
              return (
                <Reveal key={preset.id} delay={index * 70} from="scale">
                  <article className="group">
                    {/* Vignette cliquable avec surcouche au survol */}
                    <div
                      onClick={() => openEditor(preset.id)}
                      className="relative cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-2xl"
                    >
                      <div className="overflow-hidden transition-transform duration-500 group-hover:scale-[1.03]">
                        <PresetPreview presetId={preset.id} accent={accent} width={340} />
                      </div>

                      {preset.tags.length > 0 ? (
                        <div className="pointer-events-none absolute bottom-3 left-3 flex gap-1.5">
                          {preset.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-700 shadow-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-900/70 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none">
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            openEditor(preset.id);
                          }}
                          className="inline-flex translate-y-2 items-center gap-2 rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-transform duration-300 group-hover:translate-y-0 hover:bg-emerald-700"
                        >
                          <PencilRuler className="h-4 w-4" /> Utiliser ce modèle
                        </button>
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            setPreview({ presetId: preset.id, accent });
                          }}
                          className="inline-flex translate-y-2 items-center gap-2 rounded-md border border-white/70 px-5 py-2.5 text-sm font-bold text-white transition-transform delay-75 duration-300 group-hover:translate-y-0 hover:bg-white/15"
                        >
                          <Eye className="h-4 w-4" /> Aperçu
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold">{preset.name}</h3>
                        <p className="mt-0.5 text-xs leading-5 text-slate-500">{preset.description}</p>
                      </div>
                      <span className="shrink-0 rounded border border-slate-200 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-500">
                        {PRESET_CATEGORIES[preset.category]}
                      </span>
                    </div>

                    {/* Nuancier : change la couleur de la vignette en direct */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {ACCENT_CHOICES.map((color) => (
                        <button
                          key={color}
                          aria-label={`Couleur ${color} pour ${preset.name}`}
                          onClick={() => setAccents((current) => ({ ...current, [preset.id]: color }))}
                          className={`h-5 w-5 rounded-full transition-transform duration-200 hover:scale-125 ${
                            accent === color ? "ring-2 ring-slate-900 ring-offset-2" : ""
                          }`}
                          style={{ background: color }}
                        />
                      ))}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}

        <Reveal delay={120}>
          <div className="mt-16 rounded-2xl bg-[#0d2a50] px-6 py-12 text-center text-white">
            <h2 className="text-2xl font-bold sm:text-3xl">Prêt à composer votre CV ?</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-slate-300">
              Saisissez votre parcours une fois, puis testez toutes les mises en page sans jamais
              retaper une ligne.
            </p>
            <button
              onClick={() => navigate("/create")}
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              Commencer gratuitement <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </section>

      {/* Aperçu plein écran */}
      <Dialog open={preview !== null} onOpenChange={(open) => !open && setPreview(null)}>
        <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto p-0">
          {preview ? (
            <div className="flex flex-col items-center gap-4 p-6">
              <div className="flex w-full items-center justify-between">
                <h2 className="text-lg font-bold">
                  {canvasPresets.find((preset) => preset.id === preview.presetId)?.name}
                </h2>
                <div className="flex gap-1.5">
                  {ACCENT_CHOICES.map((color) => (
                    <button
                      key={color}
                      aria-label={`Couleur ${color}`}
                      onClick={() => setPreview({ ...preview, accent: color })}
                      className={`h-5 w-5 rounded-full transition-transform hover:scale-125 ${
                        preview.accent === color ? "ring-2 ring-slate-900 ring-offset-2" : ""
                      }`}
                      style={{ background: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="animate-scale-in overflow-hidden rounded-lg border border-slate-200 shadow-xl">
                <PresetPreview presetId={preview.presetId} accent={preview.accent} width={560} />
              </div>

              <button
                onClick={() => {
                  setAccents((current) => ({ ...current, [preview.presetId]: preview.accent }));
                  navigate("/editeur", { state: { presetId: preview.presetId, accent: preview.accent } });
                }}
                className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-md bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
              >
                <Check className="h-4 w-4" /> Utiliser ce modèle
              </button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default TemplatesGallery;
