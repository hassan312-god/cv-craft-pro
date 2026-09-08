import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, ChevronRight, Minus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ACCENT_CHOICES, canvasPresets } from "@/lib/canvasPresets";

const INCLUDED = [
  `${canvasPresets.length} mises en page modifiables`,
  `${ACCENT_CHOICES.length} couleurs d'accent par modèle`,
  "Éditeur canvas complet : déplacement, redimensionnement, styles",
  "Tunnel de création guidé, une question par écran",
  "Rédaction assistée de l'accroche",
  "Export PDF A4 et PNG haute résolution",
  "Brouillons enregistrés dans le navigateur",
  "Aucune carte bancaire, aucun filigrane",
];

/** Comparatif face aux pratiques courantes du marché, sans citer de marque. */
const COMPARISON = [
  { label: "Créer un CV", free: true, paywall: true },
  { label: "Modifier la mise en page", free: true, paywall: true },
  { label: "Télécharger le PDF", free: true, paywall: false },
  { label: "PDF sans filigrane", free: true, paywall: false },
  { label: "Nombre de CV", free: "Illimité", paywall: "Souvent limité" },
  { label: "Abonnement à résilier", free: "Aucun", paywall: "Généralement requis" },
];

const Pricing = () => {
  const navigate = useNavigate();

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
                Gratuit, <span className="text-emerald-600">vraiment</span>
              </h1>
            </Reveal>
            <Reveal delay={90}>
              <p className="mt-4 text-[15px] leading-7 text-slate-600">
                Pas de version d'essai qui se bloque au moment du téléchargement. Créez, modifiez et
                exportez votre CV sans payer, et sans filigrane sur le PDF.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Offre */}
      <section className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
        <Reveal from="scale">
          <div className="rounded-2xl border-2 border-emerald-600 p-8 shadow-xl sm:p-10">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-xl font-bold">Accès complet</span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700">
                Sans compte
              </span>
            </div>

            <p className="mt-6 font-display text-6xl font-extrabold">0 €</p>
            <p className="mt-1 text-sm text-slate-500">Pour toujours, sans engagement</p>

            <ul className="mt-8 space-y-3">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-7 text-slate-700">
                  <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate("/create")}
              className="mt-9 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-4 text-[15px] font-bold text-white transition hover:bg-emerald-700"
            >
              Commencer maintenant <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-4 text-center text-xs text-slate-500">
              Créer un compte sert uniquement à retrouver vos CV depuis un autre appareil.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Comparatif */}
      <section className="bg-[#f7f8fa]">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <h2 className="text-center font-display text-2xl font-extrabold tracking-[-0.02em] sm:text-3xl">
              Ce qui change par rapport aux offres payantes
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-center text-sm leading-7 text-slate-600">
              Beaucoup d'outils laissent composer le CV gratuitement, puis demandent un abonnement
              au moment de le télécharger. Voici la différence, sans détour.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-10 overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="grid grid-cols-[1.6fr_1fr_1fr] gap-2 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                <span />
                <span className="text-center text-emerald-700">CV Craft</span>
                <span className="text-center">Offres payantes</span>
              </div>
              {COMPARISON.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[1.6fr_1fr_1fr] items-center gap-2 border-b border-slate-100 px-5 py-3.5 text-[14px] last:border-b-0"
                >
                  <span className="text-slate-700">{row.label}</span>
                  <span className="flex justify-center font-semibold text-emerald-700">
                    {typeof row.free === "boolean" ? (
                      row.free ? <Check className="h-4 w-4" /> : <Minus className="h-4 w-4" />
                    ) : (
                      row.free
                    )}
                  </span>
                  <span className="flex justify-center text-slate-500">
                    {typeof row.paywall === "boolean" ? (
                      row.paywall ? <Check className="h-4 w-4" /> : <Minus className="h-4 w-4" />
                    ) : (
                      row.paywall
                    )}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-6 text-center text-xs leading-6 text-slate-500">
              Colonne de droite : pratiques couramment observées sur les outils payants. Elle ne
              vise aucun service en particulier et n'engage que ce qui est constaté publiquement.
            </p>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
};

export default Pricing;
