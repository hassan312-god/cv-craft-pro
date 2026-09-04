import { ReactNode, useEffect, useState, useRef, useCallback } from "react";
import { FileText } from "lucide-react";

interface CVPreviewWrapperProps {
  children: ReactNode;
}

export const CVPreviewWrapper = ({ children }: CVPreviewWrapperProps) => {
  // Dimensions A4 standard : 210mm x 297mm
  // À 96 DPI : 794px x 1123px (8.27" x 11.69")
  const a4Width = 794; // pixels (210mm)
  const a4Height = 1123; // pixels (297mm)
  const [screenScale, setScreenScale] = useState(0.7); // Échelle responsive
  const outerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(1);

  // Adapter l'échelle à la largeur disponible (mobile inclus)
  const updateScale = useCallback(() => {
    const available = outerRef.current?.clientWidth ?? window.innerWidth;
    const next = Math.min(0.7, Math.max(0.2, (available - 8) / a4Width));
    setScreenScale(Number.isFinite(next) && next > 0 ? next : 0.7);
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    const ro = new ResizeObserver(updateScale);
    if (outerRef.current) ro.observe(outerRef.current);
    return () => {
      window.removeEventListener("resize", updateScale);
      ro.disconnect();
    };
  }, [updateScale]);


  useEffect(() => {
    const calculatePages = () => {
      if (contentRef.current) {
        // Attendre que le contenu soit complètement rendu
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (contentRef.current) {
              // Mesurer la hauteur réelle du contenu
              const scrollHeight = contentRef.current.scrollHeight;
              
              setPageCount(Math.max(1, Math.ceil(scrollHeight / a4Height)));
            }
          });
        });
      }
    };

    // Calculer après le rendu initial avec un délai pour s'assurer que tout est rendu
    const timer = setTimeout(calculatePages, 500);
    
    // Observer les changements de taille du contenu
    const resizeObserver = new ResizeObserver(() => {
      calculatePages();
    });
    
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }
    
    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [children, a4Height]);

  return (
    <div className="flex w-full flex-col items-center gap-2">
      {/* Indicateur de nombre de pages */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium">
        <FileText className="w-4 h-4" />
        <span>{pageCount} {pageCount > 1 ? 'pages' : 'page'}</span>
      </div>

      <div ref={outerRef} className="flex w-full max-w-full justify-center items-start p-1 sm:p-4 bg-muted/30 overflow-hidden rounded-lg">
        <div
          className="bg-white shadow-lift relative overflow-hidden"
          style={{
            width: `${a4Width * screenScale}px`,
            height: `${a4Height * pageCount * screenScale}px`,
          }}
        >

          <div
            className="origin-top-left"
            style={{
              width: `${a4Width * screenScale}px`,
              height: `${a4Height * pageCount * screenScale}px`,
              transform: `scale(${screenScale})`,
              transformOrigin: 'top left',
            }}
          >
            {/* Conteneur avec dimensions A4 exactes pour le contenu */}
            <div
              ref={contentRef}
              className="cv-page-a4"
              style={{
                width: `${a4Width}px`,
                minHeight: `${a4Height * pageCount}px`,
                height: `${a4Height * pageCount}px`,
                backgroundColor: 'white',
                backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent ${a4Height - 1}px, hsl(var(--border)) ${a4Height - 1}px, hsl(var(--border)) ${a4Height}px)`,
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

