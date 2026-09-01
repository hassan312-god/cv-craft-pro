import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { getSharedCV, formatExpiryDate } from "@/lib/shareStorage";
import { CVPreview } from "@/components/CVPreview";
import { CVData } from "./CVCreate";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { getTemplateComponent } from "@/lib/templateConfig";

const Share = () => {
  const { shareId } = useParams<{ shareId: string }>();
  const navigate = useNavigate();
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!shareId) {
      toast.error("Lien de partage invalide");
      navigate('/');
      return;
    }

    const sharedCV = getSharedCV(shareId);
    
    if (!sharedCV) {
      toast.error("Ce lien de partage a expiré ou n'existe pas");
      navigate('/');
      return;
    }

    setCvData(sharedCV.cvData);
    setIsLoading(false);
  }, [shareId, navigate]);

  const handleDownloadPDF = async () => {
    if (!cvData) return;

    setIsDownloading(true);
    toast.loading("Génération du PDF en cours...", {
      id: "pdf-download"
    });

    try {
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'fixed';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = '794px';
      tempContainer.style.backgroundColor = 'white';
      tempContainer.style.zIndex = '-1';
      document.body.appendChild(tempContainer);

      const template = cvData.template || 'minimal';
      const TemplateComponent = getTemplateComponent(template);
      
      const React = await import('react');
      const ReactDOM = await import('react-dom/client');
      const root = ReactDOM.createRoot(tempContainer);
      
      root.render(React.createElement(TemplateComponent, { cvData }));
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const cvElement = tempContainer.querySelector('div[style*="794px"]') || 
                       tempContainer.firstElementChild as HTMLElement;
      
      if (!cvElement) {
        throw new Error("Impossible de trouver le contenu du CV");
      }

      (cvElement as HTMLElement).style.display = 'block';
      (cvElement as HTMLElement).style.visibility = 'visible';
      (cvElement as HTMLElement).style.position = 'relative';

      const canvas = await html2canvas(cvElement as HTMLElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: true,
        width: 794,
        height: (cvElement as HTMLElement).scrollHeight || 1123,
        scrollX: 0,
        scrollY: 0
      });

      root.unmount();
      document.body.removeChild(tempContainer);

      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        throw new Error("Canvas vide");
      }

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgScaledWidth = imgWidth * ratio;
      const imgScaledHeight = imgHeight * ratio;

      const numPages = Math.ceil(imgScaledHeight / pdfHeight);

      for (let i = 0; i < numPages; i++) {
        if (i > 0) {
          pdf.addPage();
        }
        pdf.addImage(
          imgData,
          'PNG',
          0,
          -(i * pdfHeight),
          imgScaledWidth,
          imgScaledHeight
        );
      }

      const fileName = `${cvData.firstName}_${cvData.lastName}_CV.pdf`;
      pdf.save(fileName);
      
      toast.success(`CV téléchargé : ${fileName}`);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      toast.error("Erreur lors de la génération du PDF");
    } finally {
      setIsDownloading(false);
      toast.dismiss("pdf-download");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!cvData) {
    return null;
  }

  const sharedCV = shareId ? getSharedCV(shareId) : null;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto safe-x py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="shrink-0 px-2 sm:px-3"
            >
              <ArrowLeft className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Retour</span>
            </Button>
            <h1 className="text-base sm:text-xl font-bold text-foreground truncate">CV Partagé</h1>
            <Button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              size="sm"
              className="shrink-0 px-2 sm:px-3"
            >
              {isDownloading ? (
                <Loader2 className="w-4 h-4 animate-spin sm:mr-2" />
              ) : (
                <Download className="w-4 h-4 sm:mr-2" />
              )}
              <span className="hidden sm:inline">
                {isDownloading ? "Génération..." : "Télécharger PDF"}
              </span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto safe-x py-6 sm:py-8">
        {sharedCV && (
          <Card className="p-3 sm:p-4 mb-4 sm:mb-6 bg-muted/30">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Expire le : {formatExpiryDate(sharedCV.expiresAt)}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Vues : {sharedCV.viewCount}
              </p>
            </div>
          </Card>
        )}

        <div className="flex justify-center w-full max-w-full overflow-x-hidden">
          <CVPreview cvData={cvData} />
        </div>
      </main>
    </div>

  );
};

export default Share;

