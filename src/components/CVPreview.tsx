import { CVData } from "@/pages/CVCreate";
import { CVPreviewWrapper } from "./CVPreviewWrapper";
import { CanvasRenderer } from "@/components/canvas/CanvasRenderer";
import { resolveCanvasDocument } from "@/lib/canvasPresets";

interface CVPreviewProps {
  cvData: CVData;
}

/**
 * Aperçu d'un CV. Tous les CV de l'application sont rendus par l'éditeur
 * canvas : soit la mise en page composée par l'utilisateur, soit le modèle
 * canvas associé au CV.
 */
export const CVPreview = ({ cvData }: CVPreviewProps) => (
  <CVPreviewWrapper>
    <CanvasRenderer doc={resolveCanvasDocument(cvData)} cvData={cvData} />
  </CVPreviewWrapper>
);
