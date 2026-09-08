import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import type { CanvasDocument } from "@/lib/canvasDocument";
import { PAGE_HEIGHT, PAGE_WIDTH } from "@/lib/canvasDocument";
import type { CVData } from "@/pages/CVCreate";

/**
 * Rend le document canvas hors écran (taille réelle, sans zoom ni poignées)
 * puis le capture. On ne capture jamais le DOM de l'éditeur directement : les
 * repères, contours de sélection et l'échelle d'affichage pollueraient l'image.
 */
const captureDocument = async (doc: CanvasDocument, cvData: CVData): Promise<HTMLCanvasElement> => {
  const [React, ReactDOM, { CanvasRenderer }] = await Promise.all([
    import("react"),
    import("react-dom/client"),
    import("@/components/canvas/CanvasRenderer"),
  ]);

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-10000px";
  container.style.top = "0";
  container.style.width = `${doc.width || PAGE_WIDTH}px`;
  container.style.height = `${doc.height || PAGE_HEIGHT}px`;
  container.style.background = doc.background;
  document.body.appendChild(container);

  const root = ReactDOM.createRoot(container);
  try {
    root.render(React.createElement(CanvasRenderer, { doc, cvData }));
    // Laisser React peindre et les images se charger avant la capture.
    await new Promise((resolve) => setTimeout(resolve, 350));
    await Promise.all(
      Array.from(container.querySelectorAll("img")).map(
        (image) =>
          new Promise<void>((resolve) => {
            if (image.complete) return resolve();
            image.addEventListener("load", () => resolve(), { once: true });
            image.addEventListener("error", () => resolve(), { once: true });
            setTimeout(resolve, 3000);
          }),
      ),
    );

    return await html2canvas(container, {
      scale: 2,
      useCORS: true,
      backgroundColor: doc.background || "#ffffff",
      logging: false,
      width: doc.width || PAGE_WIDTH,
      height: doc.height || PAGE_HEIGHT,
    });
  } finally {
    root.unmount();
    container.remove();
  }
};

const fileName = (cvData: CVData, extension: string): string => {
  const base = `${cvData.firstName ?? ""}_${cvData.lastName ?? ""}`.trim().replace(/\s+/g, "_");
  return `CV_${base || "sans_nom"}.${extension}`;
};

/** Export PDF A4 (une page, aux dimensions exactes du document). */
export const exportCanvasToPDF = async (doc: CanvasDocument, cvData: CVData): Promise<void> => {
  const canvas = await captureDocument(doc, cvData);
  const pdf = new jsPDF("p", "mm", "a4");
  pdf.addImage(canvas.toDataURL("image/png", 1), "PNG", 0, 0, 210, 297, undefined, "FAST");
  pdf.save(fileName(cvData, "pdf"));
};

/** Export PNG haute résolution. */
export const exportCanvasToPNG = async (doc: CanvasDocument, cvData: CVData): Promise<void> => {
  const canvas = await captureDocument(doc, cvData);
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png", 1);
  link.download = fileName(cvData, "png");
  link.click();
};
