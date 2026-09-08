import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface WizardLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onBack?: () => void;
  onNext: () => void;
  /** Libellé du bouton principal (« Continuer » par défaut). */
  nextLabel?: string;
  /** Affiche « Passer » à la place de « Continuer » quand rien n'est saisi. */
  onSkip?: () => void;
  nextDisabled?: boolean;
  /** Progression 0-1, affichée en fine barre sous l'en-tête. */
  progress: number;
  /** Contenu large (listes d'expériences) : élargit la colonne centrale. */
  wide?: boolean;
}

/**
 * Coquille du tunnel de création : une question par écran.
 *
 * L'utilisateur ne voit qu'un titre, une aide courte, le champ concerné et
 * deux actions. Toute la logique de saisie vit dans `CVWizard`.
 */
export const WizardLayout = ({
  title,
  subtitle,
  children,
  onBack,
  onNext,
  nextLabel = "Continuer",
  onSkip,
  nextDisabled,
  progress,
  wide,
}: WizardLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
      <header className="px-6 py-5 sm:px-10">
        <button
          onClick={() => navigate("/")}
          className="font-display text-xl font-extrabold tracking-tight"
        >
          CV<span className="text-emerald-600">Craft</span>
        </button>
      </header>

      {/* Progression */}
      <div className="h-1 w-full bg-slate-100">
        <div
          className="h-full bg-emerald-600 transition-all duration-500 ease-out"
          style={{ width: `${Math.round(Math.min(1, Math.max(0, progress)) * 100)}%` }}
        />
      </div>

      <main className="relative flex flex-1 justify-center px-6 pb-20 pt-12 sm:pt-20">
        {/* Décor discret, purement graphique */}
        <svg
          aria-hidden="true"
          viewBox="0 0 200 200"
          className="pointer-events-none absolute bottom-8 left-6 hidden h-48 w-48 text-emerald-100 lg:block"
        >
          <circle cx="60" cy="70" r="46" fill="currentColor" />
          <rect x="96" y="96" width="76" height="96" rx="10" fill="currentColor" opacity="0.55" />
          <rect x="110" y="116" width="48" height="6" rx="3" fill="#ffffff" />
          <rect x="110" y="132" width="38" height="6" rx="3" fill="#ffffff" />
          <rect x="110" y="148" width="44" height="6" rx="3" fill="#ffffff" />
        </svg>

        <div className={`relative z-10 w-full ${wide ? "max-w-2xl" : "max-w-md"}`}>
          <h1 className="animate-fade-in text-center font-display text-[2.1rem] font-extrabold leading-tight tracking-[-0.02em] text-emerald-600 sm:text-[2.6rem]">
            {title}
          </h1>
          {subtitle ? (
            <p className="animate-fade-in mt-3 text-center text-[15px] leading-7 text-slate-600">
              {subtitle}
            </p>
          ) : null}

          <div className="animate-fade-in mt-10 space-y-5">{children}</div>

          <div className="mt-12 flex items-center justify-between gap-3">
            {onBack ? (
              <button
                onClick={onBack}
                className="rounded-lg border border-slate-300 bg-white px-7 py-3 text-[15px] font-bold text-slate-700 transition hover:border-slate-900"
              >
                Retour
              </button>
            ) : (
              <span />
            )}

            <div className="flex items-center gap-3">
              {onSkip ? (
                <button
                  onClick={onSkip}
                  className="px-3 py-3 text-[15px] font-semibold text-slate-500 transition-colors hover:text-slate-900"
                >
                  Passer
                </button>
              ) : null}
              <button
                onClick={onNext}
                disabled={nextDisabled}
                className="rounded-lg bg-emerald-600 px-8 py-3 text-[15px] font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {nextLabel}
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="px-6 pb-8 text-center text-xs leading-6 text-slate-400">
        Vos informations restent enregistrées dans votre navigateur tant que vous ne créez pas de
        compte.
      </footer>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Champs                                                              */
/* ------------------------------------------------------------------ */

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  autoFocus?: boolean;
  /** Saisie multiligne. */
  textarea?: boolean;
  rows?: number;
}

/** Champ du tunnel : libellé discret au-dessus, fond gris, soulignement actif. */
export const WizardField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoFocus,
  textarea,
  rows = 4,
}: FieldProps) => {
  const shared =
    "w-full rounded-t-md border-b-2 border-slate-200 bg-slate-50 px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white";

  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-500">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          rows={rows}
          autoFocus={autoFocus}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={`${shared} resize-none leading-7`}
        />
      ) : (
        <input
          type={type}
          value={value}
          autoFocus={autoFocus}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={shared}
        />
      )}
    </label>
  );
};
