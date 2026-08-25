import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowLeft, Eye, Search, X, Star, TrendingUp } from "lucide-react";
import { exampleCVs, cvCategories, CVCategory } from "@/lib/exampleCVData";
import { CVPreview } from "@/components/CVPreview";
import { CVData } from "@/pages/CVCreate";
import { StarRating } from "@/components/StarRating";
import { getAverageRating, addRating, getAllAverageRatings } from "@/lib/ratingStorage";
import { toast } from "sonner";

type SortOption = "default" | "rating" | "popularity";

const Gallery = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<CVCategory | "all">("all");
  const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [ratingTemplateId, setRatingTemplateId] = useState<string | null>(null);
  const [userRating, setUserRating] = useState<number>(0);
  const [ratings, setRatings] = useState<Record<string, { average: number; count: number }>>({});

  // Fonction de recherche
  const matchesSearch = (templateId: string, cvExample: typeof exampleCVs[string]): boolean => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase().trim();
    const cvData = cvExample.data;
    
    // Recherche dans le nom complet
    const fullName = `${cvData.firstName} ${cvData.lastName}`.toLowerCase();
    if (fullName.includes(query)) return true;
    
    // Recherche dans le prénom ou nom séparément
    if (cvData.firstName.toLowerCase().includes(query) || 
        cvData.lastName.toLowerCase().includes(query)) return true;
    
    // Recherche dans le thème
    if (cvExample.colorTheme.toLowerCase().includes(query)) return true;
    
    // Recherche dans la position
    const position = cvData.experiences[0]?.position?.toLowerCase() || "";
    if (position.includes(query)) return true;
    
    // Recherche dans l'entreprise
    const company = cvData.experiences[0]?.company?.toLowerCase() || "";
    if (company.includes(query)) return true;
    
    // Recherche dans les compétences
    const skills = cvData.skills.map(s => s.name.toLowerCase()).join(" ");
    if (skills.includes(query)) return true;
    
    // Recherche dans la description
    const about = cvData.about?.toLowerCase() || "";
    if (about.includes(query)) return true;
    
    // Recherche dans la formation
    const education = cvData.education.map(e => 
      `${e.degree} ${e.school}`.toLowerCase()
    ).join(" ");
    if (education.includes(query)) return true;
    
    return false;
  };

  // Charger les notes au montage
  useEffect(() => {
    setRatings(getAllAverageRatings());
  }, []);

  const filteredCVs = Object.entries(exampleCVs).filter(([templateId, cvExample]) => {
    // Filtre par catégorie
    const categoryMatch = selectedCategory === "all" || cvExample.category === selectedCategory;
    
    // Filtre par recherche
    const searchMatch = matchesSearch(templateId, cvExample);
    
    return categoryMatch && searchMatch;
  });

  // Trier les CVs
  const sortedCVs = [...filteredCVs].sort(([idA], [idB]) => {
    if (sortBy === "rating") {
      const ratingA = ratings[idA]?.average || 0;
      const ratingB = ratings[idB]?.average || 0;
      return ratingB - ratingA;
    } else if (sortBy === "popularity") {
      const countA = ratings[idA]?.count || 0;
      const countB = ratings[idB]?.count || 0;
      return countB - countA;
    }
    return 0; // Ordre par défaut
  });

  const handleOpenRatingModal = (templateId: string) => {
    setRatingTemplateId(templateId);
    setUserRating(0);
    setRatingModalOpen(true);
  };

  const handleSubmitRating = () => {
    if (!ratingTemplateId || userRating === 0) {
      toast.error("Veuillez sélectionner une note");
      return;
    }

    if (addRating(ratingTemplateId, userRating)) {
      toast.success("Merci pour votre note !");
      setRatings(getAllAverageRatings());
      setRatingModalOpen(false);
      setRatingTemplateId(null);
      setUserRating(0);
    } else {
      toast.error("Erreur lors de l'ajout de la note");
    }
  };

  const handleUseTemplate = (templateId: string) => {
    navigate('/create', { state: { cvData: exampleCVs[templateId].data } });
  };

  const handlePreview = (templateId: string) => {
    setPreviewTemplateId(templateId);
  };

  const previewCVData = previewTemplateId ? exampleCVs[previewTemplateId]?.data : null;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 safe-top">
        <div className="max-w-7xl mx-auto safe-x py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="gap-2 shrink-0 press"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden xs:inline sm:inline">Retour</span>
            </Button>
            <h1 className="text-base sm:text-2xl font-bold text-foreground truncate">Galerie de CV</h1>
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate('/create')}
              className="shrink-0 press"
            >
              <span className="hidden sm:inline">Créer un CV vierge</span>
              <span className="sm:hidden">Créer</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto safe-x py-6 sm:py-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
            Choisissez votre modèle
          </h2>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
            Plus de 20 modèles professionnels organisés par secteur d'activité. 
            Cliquez sur un exemple pour le personnaliser.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
              <Input
                type="text"
                placeholder="Rechercher un modèle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 sm:pl-10 pr-10 h-11 sm:h-12 text-sm sm:text-base"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            {searchQuery && (
              <p className="text-sm text-muted-foreground mt-2">
                {filteredCVs.length} résultat{filteredCVs.length > 1 ? 's' : ''} trouvé{filteredCVs.length > 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Category Filters */}
          <div className="-mx-4 px-4 mb-3 overflow-x-auto sm:mx-0 sm:px-0 sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-2 w-max sm:w-auto sm:flex-wrap sm:justify-center pb-1">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
                size="sm"
                className="shrink-0 press"
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
                    className="shrink-0 press"
                  >
                    {label} ({count})
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Sort Options */}
          <div className="-mx-4 px-4 overflow-x-auto sm:mx-0 sm:px-0 sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-2 w-max sm:w-auto sm:flex-wrap sm:justify-center items-center pb-1">
              <span className="text-xs sm:text-sm text-muted-foreground shrink-0">Trier par:</span>
              <Button
                variant={sortBy === "default" ? "default" : "outline"}
                onClick={() => setSortBy("default")}
                size="sm"
                className="shrink-0 press"
              >
                Par défaut
              </Button>
              <Button
                variant={sortBy === "rating" ? "default" : "outline"}
                onClick={() => setSortBy("rating")}
                size="sm"
                className="gap-1 shrink-0 press"
              >
                <Star className="w-3 h-3" />
                Note
              </Button>
              <Button
                variant={sortBy === "popularity" ? "default" : "outline"}
                onClick={() => setSortBy("popularity")}
                size="sm"
                className="gap-1 shrink-0 press"
              >
                <TrendingUp className="w-3 h-3" />
                Popularité
              </Button>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">

          {sortedCVs.map(([templateId, cvExample]) => {
            const cvData = cvExample.data;
            const templateRating = ratings[templateId] || { average: 0, count: 0 };
            
            return (
              <Card key={templateId} className="overflow-hidden border-border flex flex-col">
                {/* Theme Header */}
                <div className="p-3 sm:p-4 border-b border-border bg-muted/30">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-foreground truncate">{cvExample.colorTheme}</h3>
                    <span className="text-[10px] sm:text-xs px-2 py-1 bg-background border border-border rounded-full shrink-0">
                      {cvCategories[cvExample.category]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-2 min-w-0">
                    <span className="font-medium text-foreground truncate">
                      {cvData.firstName} {cvData.lastName}
                    </span>
                    <span className="shrink-0">•</span>
                    <span className="truncate">{cvData.experiences[0]?.position}</span>
                  </div>
                  {/* Rating Display */}
                  <div className="flex items-center justify-between gap-2 mt-2">
                    <StarRating 
                      rating={templateRating.average} 
                      showValue={true}
                      count={templateRating.count}
                      size="sm"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenRatingModal(templateId)}
                      className="h-6 px-2 text-xs shrink-0"
                    >
                      Noter
                    </Button>
                  </div>
                </div>

                {/* CV Preview */}
                <div className="p-3 sm:p-4 bg-muted/10 flex-1 min-w-0">
                  <div
                    className="bg-white rounded-lg shadow-soft overflow-hidden max-h-[320px] sm:max-h-[400px] cursor-pointer"
                    onClick={() => handlePreview(templateId)}
                  >
                    <CVPreview cvData={cvData} />
                  </div>
                </div>


                {/* Actions */}
                <div className="p-3 sm:p-4 border-t border-border flex gap-2">
                  <Button
                    variant="default"
                    className="flex-1 press"
                    onClick={() => handleUseTemplate(templateId)}
                  >
                    Utiliser
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 press"
                    aria-label="Aperçu du modèle"
                    onClick={() => handlePreview(templateId)}
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
            <p className="text-muted-foreground">
              {searchQuery 
                ? `Aucun modèle trouvé pour "${searchQuery}"${selectedCategory !== "all" ? ` dans la catégorie ${cvCategories[selectedCategory]}` : ""}.`
                : `Aucun modèle trouvé dans la catégorie ${selectedCategory !== "all" ? cvCategories[selectedCategory] : ""}.`
              }
            </p>
            {searchQuery && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4"
              >
                Réinitialiser les filtres
              </Button>
            )}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 text-center safe-bottom">
          <Card className="p-5 sm:p-8 border-border">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
              Aucun modèle ne vous convient ?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-5 sm:mb-6">
              Créez votre CV à partir de zéro et choisissez votre propre design
            </p>
            <Button
              variant="default"
              size="lg"
              className="w-full sm:w-auto press"
              onClick={() => navigate('/create')}
            >
              Créer un CV personnalisé
            </Button>
          </Card>
        </div>
      </main>

      {/* Preview Modal */}
      <Dialog open={previewTemplateId !== null} onOpenChange={(open) => !open && setPreviewTemplateId(null)}>
        <DialogContent className="w-[calc(100vw-1.5rem)] max-w-6xl max-h-[92vh] overflow-y-auto p-0 sm:w-full">
          <DialogHeader className="px-4 sm:px-6 pt-5 sm:pt-6 pb-3 sm:pb-4 border-b border-border">
            <DialogTitle className="text-base sm:text-xl pr-8 text-left truncate">
              Aperçu - {previewTemplateId && exampleCVs[previewTemplateId]?.colorTheme}
            </DialogTitle>
          </DialogHeader>
          {previewCVData && (
            <div className="flex justify-center items-start p-2 sm:p-6 bg-muted/30 overflow-x-hidden">
              <CVPreview cvData={previewCVData} />
            </div>
          )}
        </DialogContent>
      </Dialog>



      {/* Rating Modal */}
      <Dialog open={ratingModalOpen} onOpenChange={setRatingModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Noter ce modèle</DialogTitle>
            <DialogDescription>
              {ratingTemplateId && exampleCVs[ratingTemplateId]?.colorTheme}
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <div className="flex justify-center mb-4">
              <StarRating
                rating={userRating}
                onRatingChange={setUserRating}
                interactive={true}
                size="lg"
                showValue={true}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setRatingModalOpen(false);
                  setUserRating(0);
                }}
              >
                Annuler
              </Button>
              <Button
                onClick={handleSubmitRating}
                disabled={userRating === 0}
              >
                Envoyer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
