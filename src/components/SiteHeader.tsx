import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Modèles", to: "/modeles" },
  { label: "Exemples", to: "/exemples" },
  { label: "Fonctionnalités", to: "/fonctionnalites" },
  { label: "Tarifs", to: "/tarifs" },
  { label: "FAQ", to: "/faq" },
];

/** En-tête commun à toutes les pages publiques. */
export const SiteHeader = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (to: string) => {
    setMenuOpen(false);
    navigate(to);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-8 px-5 py-3.5 sm:px-8">
        <button
          onClick={() => go("/")}
          className="font-display text-xl font-extrabold tracking-tight"
        >
          CV<span className="text-emerald-600">Craft</span>
        </button>

        <nav className="hidden flex-1 items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => go(link.to)}
              className="relative text-[15px] font-semibold text-slate-600 transition-colors hover:text-slate-900 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <button
            onClick={() => go("/auth")}
            className="hidden px-3 py-2 text-[15px] font-semibold text-slate-600 transition-colors hover:text-slate-900 sm:block"
          >
            Connexion
          </button>
          <button
            onClick={() => go("/create")}
            className="rounded-lg bg-emerald-600 px-4 py-2.5 text-[15px] font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 sm:px-5"
          >
            Créer mon CV
          </button>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-lg p-2 text-slate-600 lg:hidden"
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav className="animate-fade-in border-t border-slate-200 bg-white px-5 py-3 lg:hidden">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => go(link.to)}
              className="block w-full py-2.5 text-left text-[15px] font-semibold text-slate-700"
            >
              {link.label}
            </button>
          ))}
        </nav>
      ) : null}
    </header>
  );
};
