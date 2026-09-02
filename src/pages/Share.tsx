import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { getSharedCV, formatExpiryDate } from "@/lib/shareStorage";
import { CVPreview } from "@/components/CVPreview";
import { CVData } from "./CVCreate";
import { toast } from "sonner";
import { exportCVToPDF } from "@/lib/pdfExport";

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
      const fileName = await exportCVToPDF(cvData);
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

