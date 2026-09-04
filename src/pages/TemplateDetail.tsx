import { ArrowLeft, ArrowRight, Download, Palette, Sparkles } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CVPreview } from "@/components/CVPreview";
import { CVCategory, cvCategories, exampleCVs } from "@/lib/exampleCVData";

const TemplateDetail = () => {
  const navigate = useNavigate();
  const { category, templateId } = useParams();

  const categoryKey = (category as CVCategory | undefined) ?? "all";
  const item = templateId ? exampleCVs[templateId] : undefined;

  if (!item || !(categoryKey in cvCategories)) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 text-center">
          <h1 className="text-2xl font-bold">Modèle introuvable</h1>
          <p className="mt-3 text-muted-foreground">Ce modèle n’existe pas ou n’est plus disponible.</p>
          <Button className="mt-6" onClick={() => navigate("/gallery")}>Retour à la galerie</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Button variant="ghost" size="sm" onClick={() => navigate(`/gallery/${categoryKey}`)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Détail</p>
            <h1 className="text-lg font-bold sm:text-2xl">{item.colorTheme}</h1>
          </div>
          <Button variant="default" size="sm" onClick={() => navigate("/create", { state: { cvData: item.data } })}>Utiliser ce modèle</Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8 rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-background to-background p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2 text-primary">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">Template premium</span>
          </div>
          <h2 className="mt-3 text-2xl font-bold sm:text-4xl">{item.colorTheme}</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Profil {item.data.firstName} {item.data.lastName} • {cvCategories[item.category]} • design orienté {item.category}
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="overflow-hidden border-border">
            <div className="bg-muted/20 p-3">
              <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
                <div className="relative bg-gradient-to-b from-slate-50 to-white p-2">
                  <CVPreview cvData={item.data} />
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-5">
            <Card className="border-border p-5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Palette className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">Attributs</span>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-foreground">
                <li>• Style : {item.colorTheme}</li>
                <li>• Catégorie : {cvCategories[item.category]}</li>
                <li>• Position : {item.data.experiences[0]?.position || "Professionnel"}</li>
                <li>• Usage : idéal pour une candidature premium</li>
              </ul>
            </Card>

            <Card className="border-border p-5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Download className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">Actions</span>
              </div>
              <div className="mt-4 space-y-3">
                <Button className="w-full" onClick={() => navigate("/create", { state: { cvData: item.data } })}>
                  Utiliser ce modèle
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate(`/gallery/${categoryKey}`)}>
                  Voir d’autres modèles
                </Button>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Button variant="outline" onClick={() => navigate(`/gallery/${categoryKey}`)} className="gap-2">
            Explorer la catégorie <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default TemplateDetail;
