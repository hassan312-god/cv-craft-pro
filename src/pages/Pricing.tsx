import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, ChevronRight, Lock } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { templateConfig } from "@/lib/templateConfig";
import { isPremiumTemplate } from "@/lib/templateTiers";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";

const freeCount = templateConfig.filter((template) => !isPremiumTemplate(template.id)).length;
const premiumCount = templateConfig.length - freeCount;

const FREE_FEATURES = [
  `${freeCount} modèles de CV gratuits`,
  "Création guidée, une étape après l'autre",
  "Aperçu A4 en temps réel",
  "Export PDF sans filigrane",
  "Brouillons enregistrés dans le navigateur",
];

const PREMIUM_FEATURES = [
  `Les ${templateConfig.length} modèles, dont ${premiumCount} modèles premium`,
  "Génération complète du CV par l'IA",
  "Sauvegarde de vos CV dans votre compte",
  "Nouveaux modèles ajoutés chaque mois",
  "Export PDF illimité, sans filigrane",
  "Résiliable à tout moment",
];

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPremium } = useSubscription();

  const handleSubscribe = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (isPremium) {
      navigate("/create");
      return;
    }
    toast.info("Paiement en cours d'activation", {
      description: "L'abonnement mensuel sera disponible dès la finalisation du compte de paiement.",
    });
  };

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <SiteHeader />

      <section className="bg-[#eef3fb]">
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-6 sm:px-8">
          <nav className="flex items-center gap-1 text-xs text-slate-500">
            <button onClick={() => navigate("/")} className="transition-colors hover:text-slate-900">
              Accueil
            </button>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-slate-700">Tarifs</span>
          </nav>

          <div className="mx-auto mt-10 max-w-2xl text-center">
            <Reveal>
              <h1 className="font-display text-3xl font-extrabold leading-tight tracking-[-0.025em] sm:text-[2.75rem]">
                Commencez gratuitement, passez en <span className="text-emerald-600">Premium</span> quand vous voulez
              </h1>
            </Reveal>
            <Reveal delay={90}>
              <p className="mt-4 text-[15px] leading-7 text-slate-600">
                {freeCount} modèles sont accessibles sans payer, avec export PDF sans filigrane.
                L'abonnement mensuel débloque les {premiumCount} modèles premium et la génération par IA.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal from="scale">
            <div className="h-full rounded-2xl border border-slate-200 p-8 shadow-sm sm:p-10">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-xl font-bold">Gratuit</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-600">
                  Sans compte
                </span>
              </div>

              <p className="mt-6 font-display text-5xl font-extrabold">0 €</p>
              <p className="mt-1 text-sm text-slate-500">Pour toujours, sans engagement</p>

              <ul className="mt-8 space-y-3">
                {FREE_FEATURES.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-7 text-slate-700">
                    <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                      <Check className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate("/create")}
                className="mt-9 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 py-4 text-[15px] font-bold text-slate-900 transition hover:bg-slate-50"
              >
                Créer mon CV gratuitement <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>

          <Reveal from="scale" delay={90}>
            <div className="h-full rounded-2xl border-2 border-emerald-600 p-8 shadow-xl sm:p-10">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-xl font-bold">Premium</span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700">
                  Mensuel
                </span>
              </div>

              <p className="mt-6 font-display text-5xl font-extrabold">
                9,99 € <span className="text-base font-semibold text-slate-500">/ mois</span>
              </p>
              <p className="mt-1 text-sm text-slate-500">Sans engagement, résiliable en un clic</p>

              <ul className="mt-8 space-y-3">
                {PREMIUM_FEATURES.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-7 text-slate-700">
                    <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <Check className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={handleSubscribe}
                className="mt-9 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-4 text-[15px] font-bold text-white transition hover:bg-emerald-700"
              >
                {isPremium ? "Votre abonnement est actif" : "Passer en Premium"}
                {!isPremium && <Lock className="h-4 w-4" />}
              </button>
              <p className="mt-4 text-center text-xs text-slate-500">
                Un compte est nécessaire pour retrouver vos modèles premium sur tous vos appareils.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
};

export default Pricing;
