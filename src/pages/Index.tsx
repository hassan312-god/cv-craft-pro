import { ArrowRight, Check, FileText, LayoutTemplate, Sparkles, WandSparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { exampleCVs } from "@/lib/exampleCVData";
import { getTemplateComponent } from "@/lib/templateConfig";

const previewSheets = [
  { name: "Modern", data: exampleCVs["dev-fullstack"].data },
  { name: "Professional", data: exampleCVs["data-scientist"].data },
  { name: "Creative", data: exampleCVs["ux-designer"].data },
];

const PreviewSheet = ({ name, data }: typeof previewSheets[number]) => {
  const TemplateComponent = getTemplateComponent(data.template);

  return (
    <div className="group relative aspect-[0.7] w-full max-w-[210px] overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="absolute inset-0 flex items-start justify-center overflow-hidden bg-slate-50">
        <div className="origin-top" style={{ width: "794px", height: "1123px", transform: "scale(0.25)", backgroundColor: "white" }}>
          <TemplateComponent cvData={data} />
        </div>
      </div>
      <span className="absolute bottom-2 left-2 rounded bg-white/95 px-1.5 py-0.5 text-[9px] font-semibold text-slate-700 shadow-sm">{name}</span>
    </div>
  );
};

const Index = () => {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbfaf7] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#fbfaf7]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <button onClick={() => navigate("/")} className="text-lg font-bold tracking-tight">CV<span className="text-emerald-600">Craft</span></button>
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex"><a href="#modeles">Modèles</a><a href="#fonctionnalites">Fonctionnalités</a><a href="#tarifs">Tarifs</a></nav>
          <div className="flex items-center gap-2"><button onClick={() => navigate("/auth")} className="hidden px-3 py-2 text-sm font-semibold text-slate-600 sm:block">Connexion</button><button onClick={() => navigate("/create")} className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700">Créer mon CV</button></div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f2f1ed]"><div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
        <div className="relative z-10"><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700"><Sparkles className="h-3.5 w-3.5" /> Simple, rapide, gratuit</div><h1 className="max-w-xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">Créez votre <span className="text-emerald-600">CV parfait</span> en quelques minutes.</h1><p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">Des modèles professionnels, des conseils guidés et un export PDF prêt à envoyer. Votre prochaine opportunité commence ici.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><button onClick={() => navigate("/create")} className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700">Commencer gratuitement <ArrowRight className="h-4 w-4" /></button><button onClick={() => navigate("/gallery")} className="rounded-md border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 hover:border-slate-500">Voir les modèles</button></div><div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-500"><span><Check className="mr-1.5 inline h-3.5 w-3.5 text-emerald-600" />Sans inscription</span><span><Check className="mr-1.5 inline h-3.5 w-3.5 text-emerald-600" />Export PDF gratuit</span></div></div>
        <div className="relative flex min-h-[330px] items-center justify-center lg:min-h-[420px]"><div className="absolute h-64 w-64 rounded-full bg-amber-200/50 blur-3xl" /><div className="relative flex w-full max-w-[500px] items-end justify-center gap-3 sm:gap-5">{previewSheets.map((sheet, index) => <div key={sheet.name} className={index === 1 ? "-translate-y-7" : index === 0 ? "-rotate-6" : "rotate-6"}><PreviewSheet {...sheet} /></div>)}</div></div>
      </div></section>

      <section id="modeles" className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-8 sm:py-24"><p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Une collection pensée pour vous</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Des modèles qui donnent envie de vous rencontrer</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600">Choisissez une base, personnalisez chaque détail et gardez le contrôle de votre candidature.</p><div className="mt-10 grid gap-4 sm:grid-cols-3">{previewSheets.map((sheet) => <div key={sheet.name} className="rounded-lg border border-slate-200 bg-white p-4 text-left"><PreviewSheet {...sheet} /><div className="mt-4 flex items-center justify-between"><span className="font-bold">{sheet.name}</span><button onClick={() => navigate("/gallery")} className="text-xs font-semibold text-emerald-700">Découvrir <ArrowRight className="ml-1 inline h-3 w-3" /></button></div></div>)}</div><button onClick={() => navigate("/gallery")} className="mt-9 rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 hover:border-slate-500">Explorer tous les modèles</button></section>

      <section id="fonctionnalites" className="border-y border-slate-200 bg-[#d8f0f0]"><div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 md:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Votre contenu, notre méthode</p><h2 className="mt-3 max-w-md text-3xl font-bold tracking-tight sm:text-4xl">Un CV solide sans partir d’une page blanche.</h2><p className="mt-4 max-w-md text-sm leading-6 text-slate-600">Ajoutez vos expériences étape par étape. Les conseils et les exemples vous aident à transformer vos missions en résultats convaincants.</p><button onClick={() => navigate("/create")} className="mt-7 rounded-md bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800">Créer mon CV</button></div><div className="mx-auto w-full max-w-md rounded-lg border border-white/80 bg-white p-4 shadow-xl"><div className="mb-3 flex items-center gap-2 border-b border-slate-100 pb-3 text-sm font-bold"><WandSparkles className="h-4 w-4 text-emerald-600" /> Assistant de rédaction</div>{["Décrivez votre dernière expérience", "Ajoutez vos compétences clés", "Renforcez votre profil"].map((text) => <div key={text} className="mb-2 flex items-center gap-3 rounded border border-slate-200 p-3 text-xs text-slate-600"><span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-600 text-white">✓</span>{text}<ArrowRight className="ml-auto h-3.5 w-3.5 text-slate-400" /></div>)}</div></div></section>

      <section id="tarifs" className="bg-[#0d2a50] px-5 py-16 text-white sm:px-8 sm:py-20"><div className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Commencez sans risque</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Votre CV professionnel, sans abonnement.</h2><p className="mt-4 text-sm leading-6 text-slate-300">Créez, personnalisez et exportez votre CV gratuitement. Aucun paiement caché pour démarrer.</p><div className="mx-auto mt-8 max-w-sm rounded-lg bg-white p-6 text-left text-slate-900 shadow-2xl"><div className="flex items-center justify-between"><span className="font-bold">Accès gratuit</span><FileText className="h-5 w-5 text-emerald-600" /></div><p className="mt-3 text-4xl font-bold">0€</p><div className="mt-4 space-y-2 text-sm text-slate-600"><p><Check className="mr-2 inline h-4 w-4 text-emerald-600" />Modèles locaux professionnels</p><p><Check className="mr-2 inline h-4 w-4 text-emerald-600" />Export PDF et Word</p><p><Check className="mr-2 inline h-4 w-4 text-emerald-600" />Aucune carte bancaire</p></div><button onClick={() => navigate("/create")} className="mt-6 w-full rounded-md bg-emerald-600 py-3 text-sm font-bold text-white hover:bg-emerald-700">Commencer maintenant</button></div></div></section>

      <footer className="border-t border-slate-200 bg-[#fbfaf7] px-5 py-8 text-center text-xs text-slate-500"><div className="mb-3 flex items-center justify-center gap-2 font-bold text-slate-900"><LayoutTemplate className="h-4 w-4 text-emerald-600" /> CV Craft Pro</div><p>Créez un CV qui vous ressemble et ouvrez la porte à de nouvelles opportunités.</p><button onClick={() => navigate("/create")} className="mt-4 inline-flex items-center gap-1 font-bold text-emerald-700">Créer mon CV <ArrowRight className="h-3.5 w-3.5" /></button></footer>
    </main>
  );
};

export default Index;
