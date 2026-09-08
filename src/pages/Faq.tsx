import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronRight, Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { canvasPresets } from "@/lib/canvasPresets";

interface QA {
  q: string;
  a: string;
}

const SECTIONS: { title: string; items: QA[] }[] = [
  {
    title: "L'outil",
    items: [
      {
        q: "L'outil est-il vraiment gratuit ?",
        a: "Oui. Créer un CV, le personnaliser dans l'éditeur et l'exporter en PDF ne coûte rien, ne demande aucune carte bancaire et n'ajoute aucun filigrane sur le document.",
      },
      {
        q: "Dois-je créer un compte ?",
        a: "Non. Vos brouillons sont enregistrés dans votre navigateur. Créer un compte sert uniquement à retrouver vos CV depuis un autre appareil.",
      },
      {
        q: "Où sont stockées mes données ?",
        a: "Sans compte, tout reste dans le stockage local de votre navigateur : vider les données du site efface vos brouillons. Avec un compte, vos CV sont enregistrés en ligne pour être retrouvés ailleurs.",
      },
    ],
  },
  {
    title: "Les modèles",
    items: [
      {
        q: "Combien y a-t-il de modèles ?",
        a: `${canvasPresets.length} mises en page, déclinables en huit couleurs d'accent. Chaque modèle reste entièrement modifiable une fois ouvert dans l'éditeur.`,
      },
      {
        q: "Puis-je changer de modèle après avoir tout saisi ?",
        a: "Oui, et sans rien ressaisir. Les sections du CV sont reliées à vos données : changer de mise en page ne touche pas au contenu.",
      },
      {
        q: "Puis-je modifier la mise en page moi-même ?",
        a: "Oui. L'éditeur permet de déplacer, redimensionner et restyliser chaque bloc, d'en ajouter de nouveaux, de changer les polices et les couleurs, et d'annuler à tout moment.",
      },
      {
        q: "Les modèles avec photo sont-ils conseillés ?",
        a: "Cela dépend du pays et du secteur. En France la photo reste courante, mais elle est déconseillée pour les candidatures anglo-saxonnes. Les modèles sans photo couvrent ce cas.",
      },
    ],
  },
  {
    title: "Les recruteurs et les ATS",
    items: [
      {
        q: "Qu'est-ce qu'un CV compatible ATS ?",
        a: "Les ATS sont les logiciels qui trient les candidatures avant lecture humaine. Ils lisent mal les mises en page complexes. Un CV compatible utilise une structure linéaire, des titres de sections standards et un texte réellement sélectionnable dans le PDF.",
      },
      {
        q: "Quels modèles choisir pour passer les filtres ?",
        a: "Ceux marqués « ATS » dans la galerie : Pure ATS et Prime ATS en priorité, ainsi que Classic et Traditional. Ils évitent les colonnes que les robots interprètent mal.",
      },
      {
        q: "Quelle longueur pour un CV ?",
        a: "Une page pour la plupart des profils, deux au-delà d'une dizaine d'années d'expérience. Les modèles sont calibrés sur une page A4.",
      },
    ],
  },
  {
    title: "Export et partage",
    items: [
      {
        q: "Dans quels formats puis-je exporter ?",
        a: "PDF au format A4 pour vos candidatures, et PNG haute résolution si vous souhaitez partager une image de votre CV.",
      },
      {
        q: "Le PDF est-il lisible par les logiciels de recrutement ?",
        a: "Le PDF reproduit fidèlement la page composée. Pour une candidature passant par un ATS, privilégiez un modèle marqué ATS, dont la structure reste linéaire.",
      },
      {
        q: "Puis-je reprendre un CV plus tard ?",
        a: "Oui. Chaque passage par l'éditeur enregistre un brouillon, retrouvable depuis la page « Mes CV ».",
      },
    ],
  },
];

/** Page « FAQ » : questions regroupées par thème, avec recherche. */
const Faq = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return SECTIONS;
    return SECTIONS.map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          item.q.toLowerCase().includes(search) || item.a.toLowerCase().includes(search),
      ),
    })).filter((section) => section.items.length > 0);
  }, [query]);

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
            <span className="font-semibold text-slate-700">FAQ</span>
          </nav>

          <div className="mx-auto mt-10 max-w-2xl text-center">
            <Reveal>
              <h1 className="font-display text-3xl font-extrabold leading-tight tracking-[-0.025em] sm:text-[2.75rem]">
                Questions <span className="text-emerald-600">fréquentes</span>
              </h1>
            </Reveal>
            <Reveal delay={90}>
              <div className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 shadow-sm transition focus-within:border-emerald-500">
                <Search className="h-4 w-4 shrink-0 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Rechercher une question…"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        {filtered.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 py-16 text-center text-sm text-slate-500">
            Aucune question ne correspond à cette recherche.
          </p>
        ) : (
          filtered.map((section, index) => (
            <Reveal key={section.title} delay={index * 60}>
              <div className="mb-10">
                <h2 className="font-display text-xl font-extrabold">{section.title}</h2>
                <Accordion type="single" collapsible className="mt-3">
                  {section.items.map((item) => (
                    <AccordionItem key={item.q} value={item.q} className="border-slate-200">
                      <AccordionTrigger className="text-left font-display text-[16px] font-bold hover:no-underline">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-[15px] leading-7 text-slate-600">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </Reveal>
          ))
        )}

        <Reveal>
          <div className="rounded-2xl bg-[#f7f8fa] p-8 text-center">
            <h2 className="font-display text-xl font-extrabold">Vous n'avez pas trouvé ?</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-7 text-slate-600">
              Le plus simple reste d'essayer : la création est gratuite et ne demande pas de compte.
            </p>
            <button
              onClick={() => navigate("/create")}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-[15px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              Créer mon CV <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
};

export default Faq;
