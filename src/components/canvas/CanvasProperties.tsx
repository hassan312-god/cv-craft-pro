import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  ChevronUp,
  Copy,
  Italic,
  Lock,
  Trash2,
  Underline,
  Unlock,
} from "lucide-react";
import {
  CanvasDocument,
  CanvasElement,
  FONT_CHOICES,
  SECTION_LABELS,
  createElementId,
  topZ,
} from "@/lib/canvasDocument";
import { ACCENT_CHOICES } from "@/lib/canvasPresets";

interface Props {
  doc: CanvasDocument;
  selected: CanvasElement | null;
  onChange: (doc: CanvasDocument) => void;
  onSelect: (id: string | null) => void;
}

const LABELS: Record<CanvasElement["type"], string> = {
  text: "Texte",
  heading: "Titre",
  image: "Image",
  shape: "Forme",
  divider: "Trait",
  section: "Section du CV",
};

export const CanvasProperties = ({ doc, selected, onChange, onSelect }: Props) => {
  const patchElement = (patch: Partial<CanvasElement>) => {
    if (!selected) return;
    onChange({
      ...doc,
      elements: doc.elements.map((element) =>
        element.id === selected.id ? { ...element, ...patch } : element,
      ),
    });
  };

  const patchStyle = (patch: Partial<CanvasElement["style"]>) => {
    if (!selected) return;
    patchElement({ style: { ...selected.style, ...patch } });
  };

  const removeElement = () => {
    if (!selected) return;
    onChange({ ...doc, elements: doc.elements.filter((element) => element.id !== selected.id) });
    onSelect(null);
  };

  const duplicateElement = () => {
    if (!selected) return;
    const copy: CanvasElement = {
      ...selected,
      id: createElementId(),
      x: selected.x + 16,
      y: selected.y + 16,
      z: topZ(doc) + 1,
    };
    onChange({ ...doc, elements: [...doc.elements, copy] });
    onSelect(copy.id);
  };

  const changeLayer = (direction: 1 | -1) => {
    if (!selected) return;
    patchElement({ z: Math.max(0, selected.z + direction * 2) });
  };

  if (!selected) {
    return (
      <div className="space-y-5">
        <div>
          <h3 className="text-sm font-semibold">Document</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Sélectionnez un bloc sur la page pour modifier son style, ou ajustez ici les réglages
            globaux.
          </p>
        </div>

        <div className="space-y-2">
          <Label className="text-xs">Couleur d'accent</Label>
          <div className="flex flex-wrap gap-2">
            {ACCENT_CHOICES.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={`Accent ${color}`}
                onClick={() => onChange({ ...doc, accent: color })}
                className={`h-7 w-7 rounded-full border-2 transition ${
                  doc.accent === color ? "border-foreground scale-110" : "border-transparent"
                }`}
                style={{ background: color }}
              />
            ))}
          </div>
          <Input
            type="color"
            value={doc.accent}
            onChange={(event) => onChange({ ...doc, accent: event.target.value })}
            className="h-9 w-full"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs">Fond de page</Label>
          <Input
            type="color"
            value={doc.background}
            onChange={(event) => onChange({ ...doc, background: event.target.value })}
            className="h-9 w-full"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs">Police par défaut</Label>
          <select
            value={doc.fontFamily}
            onChange={(event) => onChange({ ...doc, fontFamily: event.target.value })}
            className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
          >
            {FONT_CHOICES.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  const isTextual = selected.type === "text" || selected.type === "heading" || selected.type === "section";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">{LABELS[selected.type]}</h3>
          {selected.type === "section" && selected.section ? (
            <p className="text-xs text-muted-foreground">{SECTION_LABELS[selected.section]}</p>
          ) : null}
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={duplicateElement} title="Dupliquer (Ctrl+D)">
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => patchElement({ locked: !selected.locked })}
            title={selected.locked ? "Déverrouiller" : "Verrouiller"}
          >
            {selected.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={removeElement} title="Supprimer (Suppr)">
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>

      {selected.type === "text" || selected.type === "heading" ? (
        <div className="space-y-2">
          <Label className="text-xs">Contenu</Label>
          <Textarea
            value={selected.content}
            rows={3}
            onChange={(event) => patchElement({ content: event.target.value })}
          />
        </div>
      ) : null}

      {selected.type === "image" ? (
        <div className="space-y-2">
          <Label className="text-xs">URL de l'image</Label>
          <Input
            value={selected.content}
            placeholder="Vide = photo du CV"
            onChange={(event) => patchElement({ content: event.target.value })}
          />
        </div>
      ) : null}

      <div className="grid grid-cols-4 gap-2">
        {(["x", "y", "width", "height"] as const).map((field) => (
          <div key={field} className="space-y-1">
            <Label className="text-[10px] uppercase text-muted-foreground">
              {field === "width" ? "L" : field === "height" ? "H" : field.toUpperCase()}
            </Label>
            <Input
              type="number"
              value={Math.round(selected[field])}
              onChange={(event) => patchElement({ [field]: Number(event.target.value) })}
              className="h-8 px-2 text-xs"
            />
          </div>
        ))}
      </div>

      {isTextual ? (
        <>
          <div className="space-y-2">
            <Label className="text-xs">Police</Label>
            <select
              value={selected.style.fontFamily}
              onChange={(event) => patchStyle({ fontFamily: event.target.value })}
              className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
            >
              {FONT_CHOICES.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Taille : {selected.style.fontSize} px</Label>
            <Slider
              min={7}
              max={64}
              step={1}
              value={[selected.style.fontSize]}
              onValueChange={([value]) => patchStyle({ fontSize: value })}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Interligne : {selected.style.lineHeight.toFixed(2)}</Label>
            <Slider
              min={0.9}
              max={2.4}
              step={0.05}
              value={[selected.style.lineHeight]}
              onValueChange={([value]) => patchStyle({ lineHeight: value })}
            />
          </div>

          <div className="flex flex-wrap gap-1">
            <Button
              variant={selected.style.fontWeight >= 700 ? "default" : "outline"}
              size="icon"
              onClick={() => patchStyle({ fontWeight: selected.style.fontWeight >= 700 ? 400 : 700 })}
              title="Gras"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant={selected.style.italic ? "default" : "outline"}
              size="icon"
              onClick={() => patchStyle({ italic: !selected.style.italic })}
              title="Italique"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant={selected.style.underline ? "default" : "outline"}
              size="icon"
              onClick={() => patchStyle({ underline: !selected.style.underline })}
              title="Souligné"
            >
              <Underline className="h-4 w-4" />
            </Button>
            {(["left", "center", "right"] as const).map((align) => {
              const Icon = align === "left" ? AlignLeft : align === "center" ? AlignCenter : AlignRight;
              return (
                <Button
                  key={align}
                  variant={selected.style.align === align ? "default" : "outline"}
                  size="icon"
                  onClick={() => patchStyle({ align })}
                  title={`Aligner à ${align}`}
                >
                  <Icon className="h-4 w-4" />
                </Button>
              );
            })}
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Couleur du texte</Label>
            <Input
              type="color"
              value={selected.style.color}
              onChange={(event) => patchStyle({ color: event.target.value })}
              className="h-9 w-full"
            />
          </div>
        </>
      ) : null}

      <div className="space-y-2">
        <Label className="text-xs">Fond du bloc</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={selected.style.background === "transparent" ? "#ffffff" : selected.style.background}
            onChange={(event) => patchStyle({ background: event.target.value })}
            className="h-9 flex-1"
          />
          <Button variant="outline" size="sm" onClick={() => patchStyle({ background: "transparent" })}>
            Aucun
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Arrondi : {selected.style.radius} px</Label>
        <Slider
          min={0}
          max={999}
          step={1}
          value={[selected.style.radius]}
          onValueChange={([value]) => patchStyle({ radius: value })}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Opacité : {Math.round(selected.style.opacity * 100)} %</Label>
        <Slider
          min={0.1}
          max={1}
          step={0.05}
          value={[selected.style.opacity]}
          onValueChange={([value]) => patchStyle({ opacity: value })}
        />
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={() => changeLayer(1)}>
          <ChevronUp className="mr-1 h-4 w-4" /> Avancer
        </Button>
        <Button variant="outline" size="sm" className="flex-1" onClick={() => changeLayer(-1)}>
          <ChevronDown className="mr-1 h-4 w-4" /> Reculer
        </Button>
      </div>
    </div>
  );
};
