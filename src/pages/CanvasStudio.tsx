import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Download,
  FileImage,
  Heading1,
  Image as ImageIcon,
  Minus,
  Redo2,
  Save,
  Square,
  Type,
  Undo2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { CanvasEditor } from "@/components/canvas/CanvasEditor";
import { CanvasProperties } from "@/components/canvas/CanvasProperties";
import {
  CanvasDocument,
  CanvasElementType,
  CanvasSectionKind,
  SECTION_LABELS,
  createElement,
  defaultStyle,
  isCanvasDocument,
  topZ,
} from "@/lib/canvasDocument";
import { buildPresetDocument, canvasPresets } from "@/lib/canvasPresets";
import { exportCanvasToPDF, exportCanvasToPNG } from "@/lib/canvasExport";
import { getAllDrafts, saveDraft } from "@/lib/draftStorage";
import type { CVData } from "@/pages/CVCreate";

const BLOCKS: { type: CanvasElementType; label: string; icon: typeof Type }[] = [
  { type: "text", label: "Texte", icon: Type },
  { type: "heading", label: "Titre", icon: Heading1 },
  { type: "image", label: "Image", icon: ImageIcon },
  { type: "shape", label: "Forme", icon: Square },
  { type: "divider", label: "Trait", icon: Minus },
];

const SECTIONS = Object.keys(SECTION_LABELS) as CanvasSectionKind[];

const emptyCV = (): CVData => ({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  photo: "",
  about: "",
  experiences: [],
  education: [],
  skills: [],
  linkedin: "",
  github: "",
  twitter: "",
  portfolio: "",
  theme: "minimalist-black",
  template: "canvas",
});

/**
 * Studio d'édition canvas : la page A4 est composée de blocs librement
 * déplaçables. Les blocs « section » restent connectés aux données saisies
 * dans le formulaire de création, les autres sont du contenu libre.
 */
const CanvasStudio = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cvData] = useState<CVData>(() => {
    const fromState = location.state?.cvData as CVData | undefined;
    if (fromState) return fromState;
    const [latestDraft] = getAllDrafts();
    return latestDraft?.data ?? emptyCV();
  });

  const [doc, setDoc] = useState<CanvasDocument>(() => {
    const fromState = location.state?.canvas;
    if (isCanvasDocument(fromState)) return fromState;
    // Arrivée depuis la galerie : un modèle et une couleur sont demandés.
    const presetId = location.state?.presetId as string | undefined;
    if (presetId) return buildPresetDocument(presetId, location.state?.accent as string | undefined);
    const stored = (location.state?.cvData as CVData | undefined)?.canvas;
    if (isCanvasDocument(stored)) return stored;
    return buildPresetDocument(canvasPresets[0].id);
  });

  const [past, setPast] = useState<CanvasDocument[]>([]);
  const [future, setFuture] = useState<CanvasDocument[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(0.72);
  const [isExporting, setIsExporting] = useState<"pdf" | "png" | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  /** Toute modification passe par ici pour alimenter l'historique. */
  const commit = useCallback(
    (next: CanvasDocument) => {
      setPast((stack) => [...stack.slice(-49), doc]);
      setFuture([]);
      setDoc(next);
    },
    [doc],
  );

  const undo = useCallback(() => {
    setPast((stack) => {
      if (stack.length === 0) return stack;
      const previous = stack[stack.length - 1];
      setFuture((forward) => [doc, ...forward]);
      setDoc(previous);
      return stack.slice(0, -1);
    });
  }, [doc]);

  const redo = useCallback(() => {
    setFuture((stack) => {
      if (stack.length === 0) return stack;
      const [next, ...rest] = stack;
      setPast((backward) => [...backward, doc]);
      setDoc(next);
      return rest;
    });
  }, [doc]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey)) return;
      const key = event.key.toLowerCase();
      if (key === "z" && !event.shiftKey) {
        event.preventDefault();
        undo();
      } else if (key === "y" || (key === "z" && event.shiftKey)) {
        event.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [undo, redo]);

  const selected = useMemo(
    () => doc.elements.find((element) => element.id === selectedId) ?? null,
    [doc.elements, selectedId],
  );

  const addBlock = (type: CanvasElementType) => {
    const element = createElement(type, { z: topZ(doc) + 1, x: 140, y: 140 });
    commit({ ...doc, elements: [...doc.elements, element] });
    setSelectedId(element.id);
  };

  const addSection = (kind: CanvasSectionKind) => {
    const element = createElement("section", {
      section: kind,
      x: 140,
      y: 140,
      width: 380,
      height: 160,
      z: topZ(doc) + 1,
      style: defaultStyle({ fontSize: 11 }),
    });
    commit({ ...doc, elements: [...doc.elements, element] });
    setSelectedId(element.id);
  };

  /** Charger un modèle restaure ses couleurs d'origine. */
  const applyPreset = (presetId: string) => {
    commit(buildPresetDocument(presetId));
    setSelectedId(null);
  };

  const handleSave = () => {
    saveDraft({ ...cvData, template: "canvas", canvas: doc });
    toast({
      title: "Mise en page enregistrée",
      description: "Votre CV canvas est sauvegardé dans vos brouillons.",
    });
  };

  const handleExport = async (format: "pdf" | "png") => {
    setIsExporting(format);
    try {
      if (format === "pdf") await exportCanvasToPDF(doc, cvData);
      else await exportCanvasToPNG(doc, cvData);
      toast({ title: `Export ${format.toUpperCase()} terminé` });
    } catch (error) {
      toast({
        title: "Export impossible",
        description: error instanceof Error ? error.message : "Erreur inconnue",
        variant: "destructive",
      });
    } finally {
      setIsExporting(null);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-muted/40">
      {/* Barre supérieure */}
      <header className="flex flex-wrap items-center gap-2 border-b border-border bg-background px-4 py-2">
        <Button variant="ghost" size="sm" onClick={() => navigate("/create", { state: { cvData } })}>
          <ArrowLeft className="mr-1 h-4 w-4" /> Contenu du CV
        </Button>
        <span className="mx-2 hidden text-sm font-semibold md:inline">Éditeur canvas</span>

        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" onClick={undo} disabled={past.length === 0} title="Annuler (Ctrl+Z)">
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={redo} disabled={future.length === 0} title="Rétablir (Ctrl+Y)">
            <Redo2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" onClick={() => setZoom((value) => Math.max(0.25, value - 0.1))}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center text-xs tabular-nums">{Math.round(zoom * 100)}%</span>
          <Button variant="outline" size="icon" onClick={() => setZoom((value) => Math.min(1.6, value + 0.1))}>
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="mr-1 h-4 w-4" /> Enregistrer
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleExport("png")} disabled={isExporting !== null}>
            <FileImage className="mr-1 h-4 w-4" /> PNG
          </Button>
          <Button size="sm" onClick={() => handleExport("pdf")} disabled={isExporting !== null}>
            <Download className="mr-1 h-4 w-4" />
            {isExporting === "pdf" ? "Export…" : "PDF"}
          </Button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Rail gauche : modèles et blocs */}
        <aside className="hidden w-56 shrink-0 overflow-y-auto border-r border-border bg-background p-3 lg:block">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Modèles</h3>
          <div className="space-y-2">
            {canvasPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.id)}
                className={`w-full rounded-lg border p-2 text-left transition hover:border-primary ${
                  doc.presetId === preset.id ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 overflow-hidden rounded">
                    {preset.swatch.map((color) => (
                      <span key={color} className="h-full flex-1" style={{ background: color }} />
                    ))}
                  </span>
                  <span className="text-xs font-medium">{preset.name}</span>
                </div>
                <p className="mt-1 text-[10px] leading-tight text-muted-foreground">{preset.description}</p>
              </button>
            ))}
          </div>

          <h3 className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Ajouter un bloc
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {BLOCKS.map(({ type, label, icon: Icon }) => (
              <Button key={type} variant="outline" size="sm" className="justify-start" onClick={() => addBlock(type)}>
                <Icon className="mr-1 h-3.5 w-3.5" /> {label}
              </Button>
            ))}
          </div>

          <h3 className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Sections du CV
          </h3>
          <div className="space-y-1">
            {SECTIONS.map((kind) => (
              <Button
                key={kind}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs"
                onClick={() => addSection(kind)}
              >
                + {SECTION_LABELS[kind]}
              </Button>
            ))}
          </div>
        </aside>

        {/* Plan de travail */}
        <main className="min-w-0 flex-1 overflow-auto p-6">
          <div className="mx-auto w-fit">
            <CanvasEditor
              doc={doc}
              cvData={cvData}
              onChange={commit}
              selectedId={selectedId}
              onSelect={setSelectedId}
              zoom={zoom}
              pageRef={pageRef}
            />
          </div>
          <p className="mx-auto mt-4 max-w-md text-center text-xs text-muted-foreground">
            Glissez les blocs pour les déplacer, tirez les poignées pour les redimensionner,
            double-cliquez un texte pour l'éditer. Maintenez Alt pour désactiver l'aimantation.
          </p>
        </main>

        {/* Panneau de propriétés */}
        <aside className="hidden w-72 shrink-0 overflow-y-auto border-l border-border bg-background p-4 xl:block">
          <CanvasProperties doc={doc} selected={selected} onChange={commit} onSelect={setSelectedId} />
        </aside>
      </div>

      {/* Propriétés en bas d'écran sur petits écrans */}
      <Card className="mx-3 mb-3 max-h-64 overflow-y-auto p-4 xl:hidden">
        <CanvasProperties doc={doc} selected={selected} onChange={commit} onSelect={setSelectedId} />
      </Card>
    </div>
  );
};

export default CanvasStudio;
