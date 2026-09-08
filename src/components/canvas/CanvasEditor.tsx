import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import {
  CanvasDocument,
  CanvasElement,
  clampElement,
  createElement,
  createElementId,
  topZ,
} from "@/lib/canvasDocument";
import { CanvasElementContent, elementBoxStyle } from "@/components/canvas/CanvasRenderer";
import type { CVData } from "@/pages/CVCreate";

const GRID = 4;
const SNAP_TOLERANCE = 6;

type Handle = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w";

const HANDLES: { id: Handle; style: CSSProperties }[] = [
  { id: "nw", style: { left: -5, top: -5, cursor: "nwse-resize" } },
  { id: "n", style: { left: "calc(50% - 5px)", top: -5, cursor: "ns-resize" } },
  { id: "ne", style: { right: -5, top: -5, cursor: "nesw-resize" } },
  { id: "e", style: { right: -5, top: "calc(50% - 5px)", cursor: "ew-resize" } },
  { id: "se", style: { right: -5, bottom: -5, cursor: "nwse-resize" } },
  { id: "s", style: { left: "calc(50% - 5px)", bottom: -5, cursor: "ns-resize" } },
  { id: "sw", style: { left: -5, bottom: -5, cursor: "nesw-resize" } },
  { id: "w", style: { left: -5, top: "calc(50% - 5px)", cursor: "ew-resize" } },
];

interface DragState {
  mode: "move" | "resize";
  handle?: Handle;
  pointerId: number;
  startX: number;
  startY: number;
  origin: CanvasElement;
  /** Désactive l'aimantation (touche Alt maintenue au début du geste). */
  freeform: boolean;
}

export interface CanvasEditorProps {
  doc: CanvasDocument;
  cvData: CVData;
  onChange: (doc: CanvasDocument) => void;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  zoom: number;
  /** Exposé pour la capture PDF/PNG. */
  pageRef?: React.RefObject<HTMLDivElement>;
}

export const CanvasEditor = ({
  doc,
  cvData,
  onChange,
  selectedId,
  onSelect,
  zoom,
  pageRef,
}: CanvasEditorProps) => {
  const [drag, setDrag] = useState<DragState | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [guides, setGuides] = useState<{ v: number[]; h: number[] }>({ v: [], h: [] });
  const dragRef = useRef<DragState | null>(null);
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;

  const elements = useMemo(() => [...doc.elements].sort((a, b) => a.z - b.z), [doc.elements]);
  const selected = doc.elements.find((element) => element.id === selectedId) ?? null;

  const updateElement = useCallback(
    (id: string, patch: Partial<CanvasElement>) => {
      onChange({
        ...doc,
        elements: doc.elements.map((element) =>
          element.id === id ? clampElement({ ...element, ...patch }, doc) : element,
        ),
      });
    },
    [doc, onChange],
  );

  /* ---------------------------------------------------------------- */
  /* Déplacement & redimensionnement                                   */
  /* ---------------------------------------------------------------- */

  const beginDrag = (
    event: ReactPointerEvent,
    element: CanvasElement,
    mode: DragState["mode"],
    handle?: Handle,
  ) => {
    if (element.locked) return;
    event.stopPropagation();
    event.preventDefault();
    (event.target as HTMLElement).setPointerCapture?.(event.pointerId);
    const state: DragState = {
      mode,
      handle,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin: { ...element },
      freeform: event.altKey,
    };
    dragRef.current = state;
    setDrag(state);
    onSelect(element.id);
  };

  useEffect(() => {
    if (!drag) return;

    const snap = (value: number, freeform: boolean) =>
      freeform ? Math.round(value) : Math.round(value / GRID) * GRID;

    const handleMove = (event: PointerEvent) => {
      const state = dragRef.current;
      if (!state) return;
      const scale = zoomRef.current || 1;
      const dx = (event.clientX - state.startX) / scale;
      const dy = (event.clientY - state.startY) / scale;
      const origin = state.origin;
      const freeform = state.freeform || event.altKey;

      let next: CanvasElement;
      if (state.mode === "move") {
        next = { ...origin, x: snap(origin.x + dx, freeform), y: snap(origin.y + dy, freeform) };
      } else {
        const handle = state.handle ?? "se";
        let { x, y, width, height } = origin;
        if (handle.includes("e")) width = origin.width + dx;
        if (handle.includes("s")) height = origin.height + dy;
        if (handle.includes("w")) {
          width = origin.width - dx;
          x = origin.x + dx;
        }
        if (handle.includes("n")) {
          height = origin.height - dy;
          y = origin.y + dy;
        }
        next = {
          ...origin,
          x: snap(x, freeform),
          y: snap(y, freeform),
          width: snap(Math.max(16, width), freeform),
          height: snap(Math.max(8, height), freeform),
        };
      }

      // Repères d'alignement : centres de page et bords des autres blocs.
      if (!freeform) {
        const centerX = next.x + next.width / 2;
        const centerY = next.y + next.height / 2;
        const activeV: number[] = [];
        const activeH: number[] = [];

        if (Math.abs(centerX - doc.width / 2) < SNAP_TOLERANCE) {
          next.x = Math.round(doc.width / 2 - next.width / 2);
          activeV.push(doc.width / 2);
        }
        if (Math.abs(centerY - doc.height / 2) < SNAP_TOLERANCE) {
          next.y = Math.round(doc.height / 2 - next.height / 2);
          activeH.push(doc.height / 2);
        }
        doc.elements
          .filter((other) => other.id !== origin.id)
          .forEach((other) => {
            if (Math.abs(next.x - other.x) < SNAP_TOLERANCE) {
              next.x = other.x;
              activeV.push(other.x);
            }
            if (Math.abs(next.y - other.y) < SNAP_TOLERANCE) {
              next.y = other.y;
              activeH.push(other.y);
            }
          });
        setGuides({ v: activeV, h: activeH });
      } else {
        setGuides({ v: [], h: [] });
      }

      updateElement(origin.id, next);
    };

    const handleUp = () => {
      dragRef.current = null;
      setDrag(null);
      setGuides({ v: [], h: [] });
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
    };
  }, [drag, doc, updateElement]);

  /* ---------------------------------------------------------------- */
  /* Raccourcis clavier                                                */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
      if (isTyping || !selected) return;

      const step = event.shiftKey ? 10 : 1;
      const moves: Record<string, [number, number]> = {
        ArrowLeft: [-step, 0],
        ArrowRight: [step, 0],
        ArrowUp: [0, -step],
        ArrowDown: [0, step],
      };

      if (moves[event.key]) {
        event.preventDefault();
        const [dx, dy] = moves[event.key];
        updateElement(selected.id, { x: selected.x + dx, y: selected.y + dy });
        return;
      }

      if (event.key === "Delete" || event.key === "Backspace") {
        event.preventDefault();
        onChange({ ...doc, elements: doc.elements.filter((element) => element.id !== selected.id) });
        onSelect(null);
        return;
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "d") {
        event.preventDefault();
        const copy: CanvasElement = {
          ...selected,
          id: createElementId(),
          x: selected.x + 16,
          y: selected.y + 16,
          z: topZ(doc) + 1,
        };
        onChange({ ...doc, elements: [...doc.elements, copy] });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected, doc, updateElement, onChange, onSelect]);

  /* ---------------------------------------------------------------- */

  const commitText = (element: CanvasElement, text: string) => {
    setEditingId(null);
    if (text !== element.content) updateElement(element.id, { content: text });
  };

  return (
    <div
      className="relative"
      style={{
        width: doc.width * zoom,
        height: doc.height * zoom,
      }}
      onPointerDown={() => onSelect(null)}
    >
      <div
        ref={pageRef}
        className="absolute left-0 top-0 origin-top-left shadow-xl"
        style={{
          width: doc.width,
          height: doc.height,
          transform: `scale(${zoom})`,
          background: doc.background,
          fontFamily: doc.fontFamily,
          overflow: "hidden",
        }}
      >
        {elements.map((element) => {
          const isSelected = element.id === selectedId;
          const isEditing = element.id === editingId;
          const editable = element.type === "text" || element.type === "heading";

          return (
            <div
              key={element.id}
              style={{
                ...elementBoxStyle(element),
                cursor: element.locked ? "default" : isEditing ? "text" : "move",
                outline: isSelected ? "1.5px solid #2563eb" : undefined,
                outlineOffset: 1,
              }}
              onPointerDown={(event) => {
                if (isEditing) return;
                beginDrag(event, element, "move");
              }}
              onDoubleClick={(event) => {
                if (!editable || element.locked) return;
                event.stopPropagation();
                setEditingId(element.id);
              }}
            >
              {isEditing && editable ? (
                <div
                  contentEditable
                  suppressContentEditableWarning
                  autoFocus
                  onBlur={(event) => commitText(element, event.currentTarget.innerText)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") event.currentTarget.blur();
                  }}
                  style={{
                    outline: "none",
                    fontFamily: element.style.fontFamily,
                    fontSize: element.style.fontSize,
                    fontWeight: element.style.fontWeight,
                    lineHeight: element.style.lineHeight,
                    letterSpacing: element.style.letterSpacing,
                    color: element.style.color,
                    textAlign: element.style.align,
                    textTransform: element.style.uppercase ? "uppercase" : "none",
                    whiteSpace: "pre-wrap",
                    minHeight: "100%",
                  }}
                >
                  {element.content}
                </div>
              ) : (
                <CanvasElementContent element={element} cvData={cvData} accent={doc.accent} showPlaceholders />
              )}
            </div>
          );
        })}

        {/* Repères d'alignement */}
        {guides.v.map((position) => (
          <div
            key={`v-${position}`}
            style={{ position: "absolute", left: position, top: 0, width: 1, height: doc.height, background: "#f43f5e", zIndex: 9998 }}
          />
        ))}
        {guides.h.map((position) => (
          <div
            key={`h-${position}`}
            style={{ position: "absolute", top: position, left: 0, height: 1, width: doc.width, background: "#f43f5e", zIndex: 9998 }}
          />
        ))}

        {/* Poignées de redimensionnement */}
        {selected && !selected.locked ? (
          <div
            style={{
              position: "absolute",
              left: selected.x,
              top: selected.y,
              width: selected.width,
              height: selected.height,
              zIndex: 9999,
              pointerEvents: "none",
            }}
          >
            {HANDLES.map((handle) => (
              <div
                key={handle.id}
                onPointerDown={(event) => beginDrag(event, selected, "resize", handle.id)}
                style={{
                  position: "absolute",
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: "#ffffff",
                  border: "1.5px solid #2563eb",
                  pointerEvents: "auto",
                  ...handle.style,
                }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
