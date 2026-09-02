import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader2, LogIn, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingEmail, setPendingEmail] = useState(false);

  useEffect(() => {
    if (user) navigate("/mes-cv", { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        if (!data.session) {
          setPendingEmail(true);
          toast.success("Vérifiez votre boîte mail pour confirmer votre compte.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Connexion réussie");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Une erreur est survenue";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) throw error;
    } catch {
      toast.error("Connexion Google impossible");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto safe-x py-3 sm:py-5 flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="px-2 sm:px-3">
            <ArrowLeft className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Retour</span>
          </Button>
          <h1 className="text-base sm:text-xl font-bold tracking-tight">Mon compte</h1>
        </div>
      </header>

      <main className="container mx-auto safe-x py-10 flex justify-center">
        <Card className="w-full max-w-md p-6 border-border">
          {pendingEmail ? (
            <div className="space-y-3 text-center">
              <h2 className="text-xl font-bold">Confirmez votre email</h2>
              <p className="text-sm text-muted-foreground">
                Un lien de confirmation a été envoyé à {email}. Cliquez dessus pour activer votre compte.
              </p>
              <Button variant="outline" className="w-full" onClick={() => setPendingEmail(false)}>
                Retour
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-1">
                {mode === "signin" ? "Connexion" : "Créer un compte"}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Sauvegardez vos CV dans le cloud et retrouvez-les partout.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <div>
                    <Label htmlFor="fullName">Nom complet</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Votre nom"
                      className="mt-1.5"
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@exemple.com"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="mt-1.5"
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 font-medium">
                  {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : mode === "signin" ? (
                    <LogIn className="w-4 h-4 mr-2" />
                  ) : (
                    <UserPlus className="w-4 h-4 mr-2" />
                  )}
                  {mode === "signin" ? "Se connecter" : "S'inscrire"}
                </Button>
              </form>

              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">ou</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <Button variant="outline" className="w-full font-medium" onClick={handleGoogle} disabled={loading}>
                Continuer avec Google
              </Button>

              <button
                type="button"
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="mt-6 w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {mode === "signin"
                  ? "Pas encore de compte ? Créer un compte"
                  : "Déjà un compte ? Se connecter"}
              </button>
            </>
          )}
        </Card>
      </main>
    </div>
  );
};

export default Auth;
