import { resolveCanvasDocument } from "@/lib/canvasPresets";
import { exportCanvasToPDF } from "@/lib/canvasExport";
import type { CVData } from "@/pages/CVCreate";

/**
 * Export PDF d'un CV. Tous les CV passent par le rendu canvas : la mise en
 * page composée dans l'éditeur, ou le modèle canvas associé au CV.
 * Retourne le nom du fichier produit.
 */
export const exportCVToPDF = async (cvData: CVData): Promise<string> => {
  await exportCanvasToPDF(resolveCanvasDocument(cvData), cvData);
  const base = `${cvData.firstName || "CV"}_${cvData.lastName || "Pro"}`.replace(/\s+/g, "_");
  return `CV_${base}.pdf`;
};
