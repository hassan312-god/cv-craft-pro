import type { CSSProperties } from "react";
import type { CVData } from "@/pages/CVCreate";
import {
  CanvasDocument,
  CanvasElement,
  PAGE_HEIGHT,
  PAGE_WIDTH,
  sectionLines,
} from "@/lib/canvasDocument";

/** Style CSS commun à tous les blocs, dérivé du style du document. */
export const elementBoxStyle = (element: CanvasElement): CSSProperties => ({
  position: "absolute",
  left: element.x,
  top: element.y,
  width: element.width,
  height: element.height,
  zIndex: element.z,
  opacity: element.style.opacity,
  background: element.style.background,
  borderRadius: element.style.radius,
  border: element.style.borderWidth
    ? `${element.style.borderWidth}px solid ${element.style.borderColor}`
    : undefined,
  padding: element.style.padding,
  boxSizing: "border-box",
  overflow: "hidden",
});

const textStyle = (element: CanvasElement): CSSProperties => ({
  fontFamily: element.style.fontFamily,
  fontSize: element.style.fontSize,
  fontWeight: element.style.fontWeight,
  lineHeight: element.style.lineHeight,
  letterSpacing: element.style.letterSpacing,
  color: element.style.color,
  textAlign: element.style.align,
  fontStyle: element.style.italic ? "italic" : "normal",
  textDecoration: element.style.underline ? "underline" : "none",
  textTransform: element.style.uppercase ? "uppercase" : "none",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  margin: 0,
});

interface SectionProps {
  element: CanvasElement;
  cvData: CVData;
  accent: string;
  /** Affiche un rappel pour les sections vides (éditeur uniquement). */
  showPlaceholders?: boolean;
}

/**
 * Couleur d'emphase d'un bloc : l'accent du document par défaut, mais la
 * couleur du texte dès que le bloc est posé sur un fond coloré (sinon
 * l'accent devient illisible, par exemple sur une colonne latérale).
 */
const emphasisColor = (element: CanvasElement, accent: string): string => {
  const color = element.style.color.toLowerCase();
  const isDefaultDark = ["#1f2937", "#111827", "#0f172a"].includes(color);
  return isDefaultDark ? accent : element.style.color;
};

/** Rendu d'un bloc lié aux données du formulaire. */
const SectionContent = ({ element, cvData, accent, showPlaceholders }: SectionProps) => {
  const kind = element.section ?? "about";
  const lines = sectionLines(kind, cvData);
  const base = textStyle(element);

  if (lines.length === 0) {
    // Rappel visible seulement dans l'éditeur : la zone reste vide à l'export.
    if (!showPlaceholders) return null;
    return (
      <p style={{ ...base, opacity: 0.45, fontStyle: "italic" }}>
        Aucune donnée saisie pour cette section.
      </p>
    );
  }

  if (kind === "identity") {
    const [line] = lines;
    return (
      <div style={{ ...base }}>
        <div style={{ fontSize: element.style.fontSize, fontWeight: element.style.fontWeight, lineHeight: 1.1 }}>
          {line.primary}
        </div>
        {line.secondary ? (
          <div
            style={{
              fontSize: Math.max(11, Math.round(element.style.fontSize * 0.42)),
              fontWeight: 500,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              marginTop: 6,
              color: emphasisColor(element, accent),
            }}
          >
            {line.secondary}
          </div>
        ) : null}
      </div>
    );
  }

  if (kind === "skills") {
    return (
      <div style={{ ...base, display: "flex", flexDirection: "column", gap: 8 }}>
        {lines.map((line, index) => (
          <div key={`${line.primary}-${index}`}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: element.style.fontSize }}>
              <span>{line.primary}</span>
            </div>
            {/* La barre reprend la couleur du texte : lisible sur fond clair
                comme sur une colonne latérale colorée. */}
            <div
              style={{
                height: 5,
                borderRadius: 999,
                background: element.style.color,
                opacity: 0.22,
                marginTop: 4,
                position: "relative",
              }}
            />
            <div
              style={{
                width: `${line.level ?? 0}%`,
                height: 5,
                borderRadius: 999,
                background: emphasisColor(element, accent),
                marginTop: -5,
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  if (kind === "contact" || kind === "socials" || kind === "about") {
    return (
      <div style={{ ...base, display: "flex", flexDirection: "column", gap: 4 }}>
        {lines.map((line, index) => (
          <p key={index} style={{ margin: 0 }}>
            {line.body}
          </p>
        ))}
      </div>
    );
  }

  // Expériences & formation : intitulé, méta alignée à droite, puis description.
  return (
    <div style={{ ...base, display: "flex", flexDirection: "column", gap: 12 }}>
      {lines.map((line, index) => (
        <div key={index}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
            <span style={{ fontWeight: 700 }}>{line.primary}</span>
            {line.meta ? (
              <span style={{ fontSize: Math.max(9, element.style.fontSize - 2), opacity: 0.7, whiteSpace: "nowrap" }}>
                {line.meta}
              </span>
            ) : null}
          </div>
          {line.secondary ? (
            <div style={{ color: emphasisColor(element, accent), fontWeight: 600, fontSize: Math.max(9, element.style.fontSize - 1) }}>
              {line.secondary}
            </div>
          ) : null}
          {line.body ? <p style={{ margin: "4px 0 0", opacity: 0.85 }}>{line.body}</p> : null}
        </div>
      ))}
    </div>
  );
};

interface ElementProps {
  element: CanvasElement;
  cvData: CVData;
  accent: string;
  showPlaceholders?: boolean;
}

/** Contenu interne d'un bloc, sans la boîte de positionnement. */
export const CanvasElementContent = ({ element, cvData, accent, showPlaceholders }: ElementProps) => {
  if (element.type === "image") {
    const src = element.content || cvData.photo;
    if (!src) {
      if (!showPlaceholders) return null;
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            color: "#9ca3af",
            textAlign: "center",
            padding: 8,
          }}
        >
          Photo
        </div>
      );
    }
    return (
      <img
        src={src}
        alt=""
        crossOrigin="anonymous"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    );
  }

  if (element.type === "shape" || element.type === "divider") {
    return null; // La couleur de fond de la boîte suffit.
  }

  if (element.type === "section") {
    return (
      <SectionContent
        element={element}
        cvData={cvData}
        accent={accent}
        showPlaceholders={showPlaceholders}
      />
    );
  }

  return <p style={textStyle(element)}>{element.content}</p>;
};

interface CanvasRendererProps {
  doc: CanvasDocument;
  cvData: CVData;
  /** Rendu statique pour l'aperçu et l'export PDF. */
  className?: string;
}

/**
 * Rendu figé d'un document canvas : utilisé pour l'aperçu du CV et pour
 * l'export PDF (aucune interaction, donc aucun artefact à la capture).
 */
export const CanvasRenderer = ({ doc, cvData, className }: CanvasRendererProps) => (
  <div
    className={className}
    style={{
      position: "relative",
      width: doc.width || PAGE_WIDTH,
      height: doc.height || PAGE_HEIGHT,
      background: doc.background,
      fontFamily: doc.fontFamily,
      overflow: "hidden",
    }}
  >
    {[...doc.elements]
      .sort((a, b) => a.z - b.z)
      .map((element) => (
        <div key={element.id} style={elementBoxStyle(element)}>
          <CanvasElementContent element={element} cvData={cvData} accent={doc.accent} />
        </div>
      ))}
  </div>
);
