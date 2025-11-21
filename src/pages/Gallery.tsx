import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Eye } from "lucide-react";
import { exampleCVs, cvCategories, CVCategory } from "@/lib/exampleCVData";
import { CVPreview } from "@/components/CVPreview";

const Gallery = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<CVCategory | "all">("all");

  const filteredCVs = Object.entries(exampleCVs).filter(([_, cvExample]) => 
    selectedCategory === "all" || cvExample.category === selectedCategory
  );

  const handleUseTemplate = (templateId: string) => {
    navigate('/create', { state: { cvData: exampleCVs[templateId].data } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Galerie de CV</h1>
            <Button
              variant="default"
              onClick={() => navigate('/create')}
            >
              Créer un CV vierge
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Choisissez votre modèle
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Plus de 20 modèles professionnels organisés par secteur d'activité. 
            Cliquez sur un exemple pour le personnaliser.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              size="sm"
            >
              Tous ({Object.keys(exampleCVs).length})
            </Button>
            {Object.entries(cvCategories).map(([key, label]) => {
              const count = Object.values(exampleCVs).filter(cv => cv.category === key).length;
              return (
                <Button
                  key={key}
                  variant={selectedCategory === key ? "default" : "outline"}
                  onClick={() => setSelectedCategory(key as CVCategory)}
                  size="sm"
                >
                  {label} ({count})
                </Button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCVs.map(([templateId, cvExample]) => {
            const cvData = cvExample.data;
            
            return (
              <Card key={templateId} className="overflow-hidden border-border flex flex-col">
                {/* Theme Header */}
                <div className="p-4 border-b border-border bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-foreground">{cvExample.colorTheme}</h3>
                    <span className="text-xs px-2 py-1 bg-background border border-border rounded-full">
                      {cvCategories[cvExample.category]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {cvData.firstName} {cvData.lastName}
                    </span>
                    <span>•</span>
                    <span className="truncate">{cvData.experiences[0]?.position}</span>
                  </div>
                </div>

                {/* CV Preview */}
                <div className="p-4 bg-muted/10 flex-1">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="h-[400px] overflow-hidden">
                      <div className="scale-[0.5] origin-top-left w-[200%]">
                        <CVPreview cvData={cvData} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 border-t border-border flex gap-2">
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={() => handleUseTemplate(templateId)}
                  >
                    Utiliser
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      window.open(`/create?preview=${templateId}`, '_blank');
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredCVs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun modèle trouvé dans cette catégorie.</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="p-8 border-border">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Aucun modèle ne vous convient ?
            </h3>
            <p className="text-muted-foreground mb-6">
              Créez votre CV à partir de zéro et choisissez votre propre design
            </p>
            <Button
              variant="default"
              size="lg"
              onClick={() => navigate('/create')}
            >
              Créer un CV personnalisé
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Gallery;
