import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, PencilRuler } from "lucide-react";
import { CanvasRenderer } from "@/components/canvas/CanvasRenderer";
import { ACCENT_CHOICES, canvasPresets } from "@/lib/canvasPresets";
import { PAGE_HEIGHT, PAGE_WIDTH } from "@/lib/canvasDocument";
import type { CVData } from "@/pages/CVCreate";

interface Props {
  cvData: CVData;
  /** Applique le modèle choisi et ouvre (ou non) l'éditeur. */
  onApply: (presetId: string, accent: string, openEditor: boolean) => void;
}

const PREVIEW_SCALE = 0.28;

/**
 * Choix de la mise en page canvas. Chaque vignette est un vrai rendu du
 * document, alimenté par les données déjà saisies : ce que l'on voit ici est
 * exactement ce que l'on retrouve dans l'éditeur.
 */
export const CanvasPresetPicker = ({ cvData, onApply }: Props) => {
  const currentPreset = cvData.canvas?.presetId;
  // Couleur du modèle actuellement retenu ; les autres vignettes gardent
  // toujours la couleur d'origine de leur modèle.
  const selected = canvasPresets.find((preset) => preset.id === currentPreset);
  const accent = cvData.canvas?.accent ?? selected?.accent;

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="font-semibold">Mises en page modifiables</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Chaque modèle s'ouvre dans l'éditeur : déplacez, redimensionnez et restylisez chaque
              bloc librement, comme sur un canvas.
            </p>
          </div>
          {currentPreset ? (
            <Button size="sm" onClick={() => onApply(currentPreset, accent ?? "", true)}>
              <PencilRuler className="mr-1 h-4 w-4" /> Ouvrir l'éditeur
            </Button>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {selected ? `Accent de « ${selected.name} » :` : "Accent :"}
          </span>
          {ACCENT_CHOICES.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={`Accent ${color}`}
              onClick={() => onApply(currentPreset ?? canvasPresets[0].id, color, false)}
              disabled={!currentPreset}
              className={`h-6 w-6 rounded-full border-2 transition ${
                accent === color ? "border-foreground scale-110" : "border-transparent"
              }`}
              style={{ background: color }}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {canvasPresets.map((preset) => {
          // Un modèle sélectionné peut avoir été recoloré ; les autres restent
          // dans les couleurs d'origine du modèle.
          const isSelected = currentPreset === preset.id;
          const presetAccent = isSelected ? (accent ?? preset.accent) : preset.accent;
          const doc = preset.build(presetAccent);

          return (
            <Card
              key={preset.id}
              onClick={() => onApply(preset.id, presetAccent, false)}
              className={`cursor-pointer overflow-hidden border transition ${
                isSelected ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center justify-between border-b border-border bg-muted/20 px-3 py-2">
                <span className="text-sm font-semibold">{preset.name}</span>
                {isSelected ? (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                ) : null}
              </div>

              <div
                className="relative mx-auto my-3 overflow-hidden bg-white shadow-sm"
                style={{ width: PAGE_WIDTH * PREVIEW_SCALE, height: PAGE_HEIGHT * PREVIEW_SCALE }}
              >
                <div style={{ transform: `scale(${PREVIEW_SCALE})`, transformOrigin: "top left" }}>
                  <CanvasRenderer doc={doc} cvData={cvData} />
                </div>
              </div>

              <div className="px-3 pb-3">
                <p className="text-xs text-muted-foreground">{preset.description}</p>
                <Button
                  size="sm"
                  variant={isSelected ? "default" : "outline"}
                  className="mt-3 w-full"
                  onClick={(event) => {
                    event.stopPropagation();
                    onApply(preset.id, presetAccent, true);
                  }}
                >
                  <PencilRuler className="mr-1 h-4 w-4" /> Personnaliser
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
