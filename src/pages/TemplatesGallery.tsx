import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Eye, Maximize2, PencilRuler } from "lucide-react";
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
import { demoResume } from "@/lib/demoResumes";

type Filter = PresetCategory | "all";

interface PreviewProps {
  presetId: string;
  accent: string;
  /** Largeur d'affichage en px ; la page A4 est mise à l'échelle dedans. */
  width: number;
}

/** Feuille A4 d'un modèle, remplie d'un CV de démonstration complet. */
const PresetPreview = ({ presetId, accent, width }: PreviewProps) => {
  const preset = canvasPresets.find((item) => item.id === presetId) ?? canvasPresets[0];
  const doc = useMemo(() => preset.build(accent), [preset, accent]);
  const scale = width / PAGE_WIDTH;

  return (
    <div className="overflow-hidden bg-white" style={{ width, height: PAGE_HEIGHT * scale }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
        <CanvasRenderer doc={doc} cvData={demoResume} />
      </div>
    </div>
  );
};

const TemplatesGallery = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>("all");
  /** Couleur retenue modèle par modèle : chacun garde sinon sa teinte d'origine. */
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

  const visible = canvasPresets.filter(
    (preset) => filter === "all" || preset.category === filter,
  );

  const openEditor = (presetId: string) =>
    navigate("/editeur", { state: { presetId, accent: accentOf(presetId) } });

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      {/* En-tête de site */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
          <button
            onClick={() => navigate("/")}
            className="font-display text-xl font-extrabold tracking-tight"
          >
            CV<span className="text-emerald-600">Craft</span>
          </button>
          <button
            onClick={() => navigate("/create")}
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-[15px] font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700"
          >
            Créer mon CV
          </button>
        </div>
      </header>

      {/* Fil d'Ariane */}
      <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
        <nav className="flex items-center gap-1 text-xs text-slate-500">
          <button onClick={() => navigate("/")} className="transition-colors hover:text-slate-900">
            Accueil
          </button>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-slate-700">Modèles de CV</span>
        </nav>
      </div>

      {/* Titre et actions */}
      <section className="mx-auto max-w-3xl px-5 pb-10 pt-8 text-center sm:px-8">
        <Reveal>
          <h1 className="font-display text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl">
            Modèles de CV
          </h1>
        </Reveal>
        <Reveal delay={80}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-slate-600">
            Chaque modèle suit les règles attendues par les recruteurs. Tous les aperçus montrent un
            CV réellement rempli, et chaque bloc reste modifiable dans l'éditeur.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate("/create")}
              className="rounded-lg bg-emerald-600 px-6 py-3 text-[15px] font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              Créer mon CV
            </button>
            <button
              onClick={() => navigate("/gallery")}
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-[15px] font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-900"
            >
              Partir d'un exemple
            </button>
          </div>
        </Reveal>
      </section>

      {/* Onglets de filtre */}
      <div className="sticky top-[61px] z-30 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-2 px-5 py-3 sm:px-8">
          {(["all", ...Object.keys(PRESET_CATEGORIES)] as Filter[]).map((key) => {
            const label = key === "all" ? "Tous les modèles" : PRESET_CATEGORIES[key as PresetCategory];
            const active = filter === key;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {label}
                <span className="ml-1.5 text-xs opacity-60">{counts[key] ?? 0}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grille de modèles */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((preset, index) => {
            const accent = accentOf(preset.id);
            return (
              <Reveal key={preset.id} delay={(index % 3) * 80} from="scale">
                <article className="group">
                  {/* Cellule grise contenant la feuille, comme sur les galeries du marché */}
                  <div
                    onClick={() => openEditor(preset.id)}
                    className="relative flex cursor-pointer justify-center rounded-md bg-[#f2f4f7] p-5 transition-all duration-300 group-hover:bg-[#e8ecf2]"
                  >
                    <div className="shadow-[0_2px_10px_rgba(15,23,42,0.10)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_10px_28px_rgba(15,23,42,0.18)]">
                      <PresetPreview presetId={preset.id} accent={accent} width={300} />
                    </div>

                    {preset.tags.length > 0 ? (
                      <div className="pointer-events-none absolute left-3 top-3 flex gap-1.5">
                        {preset.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-600 shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div className="absolute inset-0 flex items-center justify-center rounded-md bg-slate-900/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          openEditor(preset.id);
                        }}
                        className="inline-flex translate-y-2 items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-transform duration-300 group-hover:translate-y-0 hover:bg-emerald-700"
                      >
                        <PencilRuler className="h-4 w-4" /> Utiliser ce modèle
                      </button>
                    </div>
                  </div>

                  {/* Nom, description, nuancier et loupe d'aperçu */}
                  <h3 className="mt-4 font-display text-lg font-bold">{preset.name}</h3>
                  <p className="mt-1 text-[13px] leading-6 text-slate-500">{preset.description}</p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      {ACCENT_CHOICES.slice(0, 6).map((color) => (
                        <button
                          key={color}
                          aria-label={`Couleur ${color} pour ${preset.name}`}
                          onClick={() => setAccents((current) => ({ ...current, [preset.id]: color }))}
                          className={`h-4 w-4 rounded-full transition-transform duration-200 hover:scale-125 ${
                            accent === color ? "ring-2 ring-slate-900 ring-offset-2" : ""
                          }`}
                          style={{ background: color }}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setPreview({ presetId: preset.id, accent })}
                      aria-label={`Agrandir l'aperçu de ${preset.name}`}
                      className="rounded p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Appel à l'action */}
      <section className="bg-[#0d2a50] px-5 py-16 text-center text-white sm:px-8 sm:py-20">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
            Prêt à composer votre CV ?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-slate-300">
            Saisissez votre parcours une fois, puis testez toutes les mises en page sans jamais
            retaper une ligne.
          </p>
          <button
            onClick={() => navigate("/create")}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-7 py-3.5 text-[15px] font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-700"
          >
            Créer mon CV gratuitement
          </button>
        </Reveal>
      </section>

      {/* Aperçu agrandi */}
      <Dialog open={preview !== null} onOpenChange={(open) => !open && setPreview(null)}>
        <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto p-0">
          {preview ? (
            <div className="flex flex-col items-center gap-4 p-6">
              <div className="flex w-full items-center justify-between">
                <h2 className="font-display text-lg font-bold">
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

              <div className="animate-scale-in overflow-hidden rounded border border-slate-200 shadow-xl">
                <PresetPreview presetId={preview.presetId} accent={preview.accent} width={560} />
              </div>

              <button
                onClick={() => {
                  setAccents((current) => ({ ...current, [preview.presetId]: preview.accent }));
                  navigate("/editeur", { state: { presetId: preview.presetId, accent: preview.accent } });
                }}
                className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-[15px] font-bold text-white transition hover:bg-emerald-700"
              >
                <Eye className="h-4 w-4" /> Utiliser ce modèle
              </button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default TemplatesGallery;
