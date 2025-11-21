import { ReactNode, useEffect, useState, useRef } from "react";
import { FileText } from "lucide-react";

interface CVPreviewWrapperProps {
  children: ReactNode;
}

export const CVPreviewWrapper = ({ children }: CVPreviewWrapperProps) => {
  // Dimensions A4 standard : 210mm x 297mm
  // À 96 DPI : 794px x 1123px (8.27" x 11.69")
  // Pour l'affichage à l'écran, on utilise 70% pour que ça rentre bien
  const a4Width = 794; // pixels (210mm)
  const a4Height = 1123; // pixels (297mm)
  const screenScale = 0.7; // Échelle pour l'affichage à l'écran
  const contentRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    const calculatePages = () => {
      if (contentRef.current) {
        // Attendre que le contenu soit complètement rendu
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (contentRef.current) {
              // Mesurer la hauteur réelle du contenu
              const scrollHeight = contentRef.current.scrollHeight;
              
              // Calculer le nombre de pages A4 nécessaires
              // Seulement compter une nouvelle page si le contenu dépasse vraiment la limite
              // Avec une marge de tolérance de 150px pour éviter les pages presque vides
              let pages = 1;
              
              if (scrollHeight <= a4Height) {
                // Le contenu tient sur une page
                pages = 1;
              } else if (scrollHeight > a4Height + 150) {
                // Le contenu dépasse vraiment, calculer le nombre de pages
                pages = Math.ceil(scrollHeight / a4Height);
              } else {
                // Entre a4Height et a4Height + 150px, on garde 1 page
                // (le contenu peut être légèrement compressé ou ajusté)
                pages = 1;
              }
              
              setPageCount(pages);
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
    <div className="flex flex-col items-center gap-2">
      {/* Indicateur de nombre de pages */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
        <FileText className="w-4 h-4" />
        <span>{pageCount} {pageCount > 1 ? 'pages' : 'page'}</span>
      </div>

      <div className="flex justify-center items-start p-4 bg-muted/30">
        <div
          className="bg-white shadow-2xl relative"
          style={{
            width: `${a4Width * screenScale}px`,
          }}
        >
          <div
            className="origin-top-left"
            style={{
              width: `${a4Width}px`,
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
                minHeight: 'auto',
                height: 'auto',
                backgroundColor: 'white',
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

