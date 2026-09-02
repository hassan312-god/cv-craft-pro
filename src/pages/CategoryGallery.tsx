import { ArrowLeft, ArrowRight, Eye, Sparkles } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CVPreview } from "@/components/CVPreview";
import { CVCategory, cvCategories, exampleCVs } from "@/lib/exampleCVData";

const CategoryGallery = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const categoryKey = (category as CVCategory | undefined) ?? "all";

  if (!category || !(categoryKey in cvCategories)) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 text-center">
          <h1 className="text-2xl font-bold">Catégorie introuvable</h1>
          <p className="mt-3 text-muted-foreground">Cette page n’existe pas.</p>
          <Button className="mt-6" onClick={() => navigate("/gallery")}>Retour à la galerie</Button>
        </div>
      </div>
    );
  }

  const templates = Object.entries(exampleCVs).filter(([, item]) => item.category === categoryKey);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Button variant="ghost" size="sm" onClick={() => navigate("/gallery")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Catégorie</p>
            <h1 className="text-lg font-bold sm:text-2xl">{cvCategories[categoryKey]}</h1>
          </div>
          <Button variant="default" size="sm" onClick={() => navigate("/create")}>Créer mon CV</Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-border bg-gradient-to-br from-muted/30 via-background to-background p-5 sm:p-6">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">Modèles premium</span>
          </div>
          <h2 className="text-2xl font-bold sm:text-3xl">{cvCategories[categoryKey]}</h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Explorez les modèles les plus adaptés à cette catégorie. Chaque design est prêt à personnaliser et à exporter.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {templates.map(([templateId, cvExample]) => (
            <Card key={templateId} className="overflow-hidden border-border">
              <div className="border-b border-border bg-muted/20 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold">{cvExample.colorTheme}</h3>
                  <span className="rounded-full border border-border bg-background px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {cvCategories[cvExample.category]}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
                  <div className="relative bg-gradient-to-b from-slate-50 to-white p-2" style={{ aspectRatio: "210/297" }}>
                    <div
                      style={{
                        transform: "scale(0.34)",
                        transformOrigin: "center center",
                        width: "794px",
                        minHeight: "1123px",
                        backgroundColor: "white",
                      }}
                    >
                      <CVPreview cvData={cvExample.data} />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => navigate(`/gallery/${categoryKey}/${templateId}`)}
                  >
                    Voir le détail
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/create", { state: { cvData: cvExample.data } })}
                  >
                    Utiliser
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {templates.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
            Aucun modèle disponible dans cette catégorie pour le moment.
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Button variant="outline" onClick={() => navigate("/gallery")} className="gap-2">
            Voir toute la galerie <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CategoryGallery;
