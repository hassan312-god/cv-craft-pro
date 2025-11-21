import { ReactNode } from "react";

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

  return (
    <div className="flex justify-center items-start p-4 bg-muted/30">
      <div
        className="bg-white shadow-2xl relative"
        style={{
          width: `${a4Width * screenScale}px`,
          minHeight: `${a4Height * screenScale}px`,
        }}
      >
        <div
          className="origin-top-left"
          style={{
            width: `${a4Width}px`,
            minHeight: `${a4Height}px`,
            transform: `scale(${screenScale})`,
            transformOrigin: 'top left',
            paddingBottom: `${a4Height * (1 - screenScale)}px`,
          }}
        >
          {/* Conteneur avec dimensions A4 exactes pour le contenu */}
          <div
            className="cv-page-a4"
            style={{
              width: `${a4Width}px`,
              minHeight: `${a4Height}px`,
              backgroundColor: 'white',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

