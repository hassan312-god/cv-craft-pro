import { Button } from "@/components/ui/button";
import { FileText, Download, Palette, CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileText,
      title: "Création Intuitive",
      description: "Interface simple et guidée pour créer votre CV en quelques minutes"
    },
    {
      icon: Palette,
      title: "5 Thèmes Professionnels",
      description: "Choisissez parmi nos designs élégants adaptés à votre secteur"
    },
    {
      icon: Download,
      title: "Export PDF",
      description: "Téléchargez votre CV en haute qualité, prêt à envoyer"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-foreground tracking-tight">
              CV Builder Pro
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => navigate('/gallery')} 
              variant="outline"
              className="font-medium"
            >
              Modèles
            </Button>
            <Button 
              onClick={() => navigate('/create')} 
              className="bg-primary hover:bg-primary/90 font-medium"
            >
              Créer mon CV
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Rainbow Gradient */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute top-0 left-1/4 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--rainbow-gradient)] to-transparent opacity-60" />
        
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block border border-border px-4 py-2 rounded-full mb-8 text-sm font-medium">
              100% Gratuit - Sans Inscription
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tight">
              Hello!<br />
              Créez votre CV<br />
              professionnel
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              Concevez votre CV parfait en quelques minutes avec nos outils intuitifs et nos designs modernes. Export PDF instantané, 100% personnalisable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/create')}
                className="bg-primary hover:bg-primary/90 font-medium text-base px-8 h-12"
              >
                Commencer Maintenant
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/gallery')}
                className="font-medium text-base px-8 h-12 border-border hover:bg-accent"
              >
                Voir les Modèles
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What I'm Offering Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              MES SERVICES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              WHAT I'M<br />OFFERING
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="border border-border rounded-lg p-8 hover:border-foreground transition-all bg-card group"
              >
                <feature.icon className="w-8 h-8 text-foreground mb-6" />
                <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {feature.description}
                </p>
                <button className="text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  READ MORE
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 border-t border-border bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                AVANTAGES
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
                Pourquoi choisir<br />CV Builder Pro ?
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Interface intuitive et facile à utiliser",
                "Design moderne et professionnel",
                "Compatible tous secteurs d'activité",
                "Export PDF haute qualité",
                "Responsive et optimisé mobile",
                "Aucune inscription requise"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 border border-border rounded-lg p-4 bg-card">
                  <CheckCircle2 className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-foreground font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
          backgroundSize: '32px 32px' 
        }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Prêt à créer votre<br />CV parfait ?
            </h2>
            <p className="text-lg mb-10 opacity-90 leading-relaxed">
              Rejoignez des milliers de professionnels qui ont déjà créé leur CV avec notre outil
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/create')}
              className="bg-background text-foreground hover:bg-background/90 font-medium text-base px-8 h-12"
            >
              Commencer Gratuitement
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-muted-foreground mb-2">
              © 2024 CV Builder Pro. Tous droits réservés.
            </p>
            <p className="text-sm text-muted-foreground">
              Développé pour vous aider à réussir
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
