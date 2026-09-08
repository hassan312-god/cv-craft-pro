import { useEffect, useRef, useState } from "react";
import { CanvasRenderer } from "@/components/canvas/CanvasRenderer";
import { PAGE_HEIGHT, PAGE_WIDTH, type CanvasDocument } from "@/lib/canvasDocument";
import type { CVData } from "@/pages/CVCreate";

interface ResumeThumbProps {
  doc: CanvasDocument;
  cvData: CVData;
  className?: string;
}

/**
 * Vignette A4 fluide.
 *
 * La page est rendue à sa taille réelle puis mise à l'échelle selon la largeur
 * réellement disponible : la vignette suit son conteneur au lieu d'imposer une
 * largeur fixe, ce qui faisait déborder les grilles sur petit écran.
 */
export const ResumeThumb = ({ doc, cvData, className = "" }: ResumeThumbProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    setWidth(node.clientWidth);
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative w-full min-w-0 overflow-hidden bg-white ${className}`}
      style={{ aspectRatio: `${PAGE_WIDTH} / ${PAGE_HEIGHT}` }}
    >
      {width > 0 ? (
        // Positionné en absolu à dessein : `transform` ne réduit pas la boîte de
        // mise en page, si bien qu'une page de 794 px de large ferait gonfler la
        // piste de grille qui la contient (le minimum d'une piste `1fr` est
        // `min-content`). Un enfant absolu ne contribue pas à ce calcul.
        <div
          className="absolute left-0 top-0"
          style={{
            width: PAGE_WIDTH,
            height: PAGE_HEIGHT,
            transform: `scale(${width / PAGE_WIDTH})`,
            transformOrigin: "top left",
          }}
        >
          <CanvasRenderer doc={doc} cvData={cvData} />
        </div>
      ) : null}
    </div>
  );
};
