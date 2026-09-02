import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, FileText, Loader2, LogOut, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { listSavedCVs, deleteSavedCV, SavedCV } from "@/lib/cloudCvs";

const MyCVs = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const [cvs, setCvs] = useState<SavedCV[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth", { replace: true });
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    listSavedCVs()
      .then(setCvs)
      .catch(() => toast.error("Impossible de charger vos CV"))
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = async (id: string) => {
    try {
      await deleteSavedCV(id);
      setCvs((prev) => prev.filter((cv) => cv.id !== id));
      toast.success("CV supprimé");
    } catch {
      toast.error("Suppression impossible");
    }
  };

  const handleOpen = (cv: SavedCV) => {
    navigate("/create", { state: { cvData: cv.cv_data, savedCvId: cv.id, savedCvTitle: cv.title } });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="container mx-auto safe-x py-3 sm:py-5 flex items-center justify-between gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="px-2 sm:px-3 shrink-0">
            <ArrowLeft className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Accueil</span>
          </Button>
          <h1 className="text-base sm:text-xl font-bold tracking-tight truncate">Mes CV</h1>
          <div className="flex items-center gap-1.5 shrink-0">
            <Button size="sm" onClick={() => navigate("/create")} className="bg-primary hover:bg-primary/90 px-2 sm:px-3">
              <Plus className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Nouveau</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => signOut()} className="px-2 sm:px-3">
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Déconnexion</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto safe-x py-8 safe-bottom">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : cvs.length === 0 ? (
          <Card className="p-10 text-center border-border">
            <FileText className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
            <h2 className="text-lg font-bold mb-1">Aucun CV sauvegardé</h2>
            <p className="text-sm text-muted-foreground mb-5">
              Créez un CV puis utilisez « Sauvegarder dans le cloud » pour le retrouver ici.
            </p>
            <Button onClick={() => navigate("/create")} className="bg-primary hover:bg-primary/90">
              Créer un CV
            </Button>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cvs.map((cv) => (
              <Card key={cv.id} className="p-5 border-border flex flex-col gap-3">
                <div className="min-w-0">
                  <h3 className="font-bold truncate">{cv.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Modifié le {new Date(cv.updated_at).toLocaleDateString("fr-FR")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Modèle : {cv.template || "minimal"}
                  </p>
                </div>
                <div className="flex gap-2 mt-auto">
                  <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90" onClick={() => handleOpen(cv)}>
                    Ouvrir
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(cv.id)}
                    aria-label="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyCVs;
