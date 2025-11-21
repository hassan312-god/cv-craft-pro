import { Button } from "@/components/ui/button";
import { FileText, Download, Palette, CheckCircle2, ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
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

  const stats = [
    { value: "5+", label: "Modèles Professionnels" },
    { value: "100%", label: "Gratuit" },
    { value: "PDF", label: "Export Haute Qualité" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-foreground tracking-tight">
              CV Builder Pro
            </div>
            <div className="hidden sm:block px-3 py-1 bg-muted text-xs font-medium rounded-full">
              2025
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

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-foreground/10" />
        
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 border border-border px-4 py-2 rounded-full mb-8 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              100% Gratuit - Sans Inscription
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tight">
              Créez votre CV<br />
              professionnel en<br />
              <span className="relative inline-block">
                quelques minutes
                <div className="absolute bottom-2 left-0 w-full h-3 bg-foreground/10 -z-10" />
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              Des outils intuitifs, des designs modernes et un export PDF instantané. 
              Créez un CV qui vous démarque en 2025.
            </p>
            
            {/* Stats */}
            <div className="flex gap-8 mb-10 pb-10 border-b border-border">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
            
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

      {/* Features Section */}
      <section className="py-20 border-t border-border bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <div className="inline-block text-xs uppercase tracking-wider text-muted-foreground mb-4 px-4 py-2 bg-background border border-border rounded-full">
              Fonctionnalités
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Tout ce dont vous avez besoin
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="border border-border rounded-lg p-8 hover:border-foreground transition-all bg-card group hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mb-6 group-hover:bg-foreground/10 transition-colors">
                  <feature.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  Avantages
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
                  Pourquoi choisir<br />CV Builder Pro ?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Notre plateforme combine simplicité et professionnalisme pour vous offrir 
                  la meilleure expérience de création de CV en 2025.
                </p>
                <Button 
                  size="lg"
                  onClick={() => navigate('/create')}
                  className="bg-primary hover:bg-primary/90"
                >
                  Commencer Gratuitement
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid gap-4">
                {[
                  { icon: Zap, text: "Interface intuitive et rapide" },
                  { icon: Palette, text: "Design moderne et professionnel" },
                  { icon: Shield, text: "100% gratuit, aucune inscription" },
                  { icon: Download, text: "Export PDF haute qualité" },
                  { icon: CheckCircle2, text: "Compatible tous secteurs" },
                  { icon: Sparkles, text: "Optimisé pour 2025" }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-4 border border-border rounded-lg p-4 bg-card hover:border-foreground/50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-foreground" />
                    </div>
                    <span className="text-foreground font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-foreground text-background relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 opacity-5" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
          backgroundSize: '32px 32px' 
        }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Prêt à créer votre<br />CV parfait ?
            </h2>
            <p className="text-lg mb-10 opacity-80 leading-relaxed">
              Rejoignez des milliers de professionnels qui créent leur CV avec notre outil en 2025
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
            <p className="text-muted-foreground mb-2 font-medium">
              © 2025 CV Builder Pro. Tous droits réservés.
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
