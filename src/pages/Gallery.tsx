import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Eye } from "lucide-react";
import { exampleCVs } from "@/lib/exampleCVData";
import { CVPreview } from "@/components/CVPreview";

const Gallery = () => {
  const navigate = useNavigate();

  const themeInfo = {
    'minimalist-black': {
      name: 'Minimaliste Noir',
      description: 'Design épuré et professionnel',
      color: 'bg-gradient-to-br from-gray-900 to-gray-800'
    },
    'modern-gray': {
      name: 'Moderne Gris',
      description: 'Style contemporain et élégant',
      color: 'bg-gradient-to-br from-gray-700 to-gray-600'
    },
    'creative-gradient': {
      name: 'Créatif Gradient',
      description: 'Design coloré et dynamique',
      color: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400'
    },
    'elegant-dark': {
      name: 'Élégant Sombre',
      description: 'Raffiné et sophistiqué',
      color: 'bg-gradient-to-br from-slate-900 to-slate-700'
    },
    'professional-blue': {
      name: 'Professionnel Bleu',
      description: 'Classique et sérieux',
      color: 'bg-gradient-to-br from-blue-900 to-blue-700'
    }
  };

  const handleUseTemplate = (templateId: string) => {
    navigate('/create', { state: { cvData: exampleCVs[templateId] } });
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
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez nos modèles professionnels et personnalisez-les selon vos besoins. 
            Cliquez sur un exemple pour le modifier.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(exampleCVs).map(([templateId, cvData]) => {
            const theme = themeInfo[templateId as keyof typeof themeInfo];
            
            return (
              <Card key={templateId} className="overflow-hidden border-border">
                {/* Theme Header */}
                <div className={`${theme.color} p-6 text-white`}>
                  <h3 className="text-2xl font-bold mb-2">{theme.name}</h3>
                  <p className="text-white/90">{theme.description}</p>
                </div>

                {/* CV Preview */}
                <div className="p-6 bg-muted/30">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform scale-[0.85] origin-top">
                    <div className="h-[600px] overflow-hidden">
                      <CVPreview cvData={cvData} />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6 border-t border-border flex gap-3">
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={() => handleUseTemplate(templateId)}
                  >
                    Utiliser ce modèle
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      // Open preview in modal or new tab if needed
                      window.open(`/create?preview=${templateId}`, '_blank');
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>

                {/* Profile Info */}
                <div className="px-6 pb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {cvData.firstName} {cvData.lastName}
                    </span>
                    <span>•</span>
                    <span>{cvData.experiences[0]?.position}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

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
