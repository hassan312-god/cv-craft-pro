import { Button } from "@/components/ui/button";
import { FileText, Download, Palette, CheckCircle2, ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

  // Animation typewriter pour le titre avec plusieurs phrases et couleurs aléatoires
  const TypewriterText = () => {
    const phrases = [
      "Créez votre CV professionnel en quelques minutes",
      "Designez un CV moderne qui vous démarque",
      "Générez votre CV en PDF haute qualité",
      "Personnalisez votre CV avec nos templates",
      "Exportez votre CV professionnel instantanément"
    ];
    
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIndex, setCharIndex] = useState(0);
    const [wordColors, setWordColors] = useState<Record<number, string>>({});

    // Générer des couleurs aléatoires pour certains mots
    const generateWordColors = (text: string) => {
      const words = text.split(' ');
      const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4'];
      const newColors: Record<number, string> = {};
      
      // Colorier aléatoirement 30-40% des mots
      words.forEach((_, index) => {
        if (Math.random() < 0.35) {
          newColors[index] = colors[Math.floor(Math.random() * colors.length)];
        }
      });
      
      return newColors;
    };

    useEffect(() => {
      const currentPhrase = phrases[currentPhraseIndex];
      const typingSpeed = isDeleting ? 30 : 100;
      const pauseTime = isDeleting ? 500 : 2000;

      let pauseTimer: NodeJS.Timeout | null = null;

      const timer = setTimeout(() => {
        if (!isDeleting && charIndex < currentPhrase.length) {
          setDisplayedText(currentPhrase.slice(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
        } else if (!isDeleting && charIndex === currentPhrase.length) {
          pauseTimer = setTimeout(() => setIsDeleting(true), pauseTime);
        } else if (isDeleting && charIndex > 0) {
          setDisplayedText(currentPhrase.slice(0, charIndex - 1));
          setCharIndex(prev => prev - 1);
        } else if (isDeleting && charIndex === 0) {
          setIsDeleting(false);
          // Passer à la phrase suivante
          const nextIndex = (currentPhraseIndex + 1) % phrases.length;
          setCurrentPhraseIndex(nextIndex);
          setWordColors(generateWordColors(phrases[nextIndex]));
        }
      }, typingSpeed);

      return () => {
        clearTimeout(timer);
        if (pauseTimer) clearTimeout(pauseTimer);
      };
    }, [charIndex, isDeleting, currentPhraseIndex, phrases]);

    // Générer les couleurs au chargement initial
    useEffect(() => {
      setWordColors(generateWordColors(phrases[0]));
    }, []);

    // Rendre le texte avec les couleurs appliquées
    const renderColoredText = () => {
      const words = displayedText.split(' ');
      return words.map((word, index) => {
        const color = wordColors[index];
        return (
          <span key={index} style={color ? { color } : {}}>
            {word}
            {index < words.length - 1 ? ' ' : ''}
          </span>
        );
      });
    };

    return (
      <span className="inline-block break-words">
        {renderColoredText()}
        <span className="animate-pulse inline-block w-0.5 h-6 sm:h-8 bg-foreground ml-1 align-middle">|</span>
      </span>
    );

  };

  // Composants d'animation pour les stats
  const AnimatedCount = ({ value, label }: { value: string; label: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const end = parseInt(value);
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, 40);

      return () => clearInterval(timer);
    }, [value]);

    return (
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold transform transition-all duration-300 hover:scale-110">
          {count}+
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">{label}</p>
      </div>
    );

  };

  const AnimatedPercentSmooth = () => {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
      let start = 0;
      let end = 100;
      let duration = 1500;
      let interval = 10;
      let increment = end / (duration / interval);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          setPercent(Math.floor(start));
          clearInterval(timer);
        } else {
          setPercent(Math.floor(start));
        }
      }, interval);

      return () => clearInterval(timer);
    }, []);

    return (
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          {percent}%
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">Gratuit</p>
      </div>
    );
  };

  const AnimatedPDF = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
      setTimeout(() => setShow(true), 200);
    }, []);

    return (
      <div
        className={`text-center transform transition-all duration-500 ${
          show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">PDF</h2>
        <p className="text-xs sm:text-sm text-muted-foreground">Export Haute Qualité</p>
      </div>
    );
  };


  return (
    <main className="min-h-screen bg-background overflow-x-hidden" aria-label="Page d'accueil">
      {/* Header */}
      <header className="border-b border-border bg-card/90 backdrop-blur-md sticky top-0 z-50 safe-top">
        <div className="container mx-auto safe-x py-3 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="text-lg sm:text-2xl font-bold text-foreground tracking-tight truncate">
              CV Builder Pro
            </div>
            <div className="hidden sm:block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              2025
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button 
              onClick={() => navigate('/gallery')} 
              variant="outline"
              size="sm"
              className="font-medium press"
            >
              Modèles
            </Button>
            <Button 
              onClick={() => navigate('/mes-cv')} 
              variant="outline"
              size="sm"
              className="font-medium press hidden sm:inline-flex"
            >
              Mes CV
            </Button>
            <Button 
              onClick={() => navigate('/auth')} 
              variant="ghost"
              size="sm"
              className="font-medium press"
            >
              Connexion
            </Button>
            <Button 
              onClick={() => navigate('/create')} 
              size="sm"
              className="bg-primary hover:bg-primary/90 font-medium press"
            >
              <span className="hidden sm:inline">Créer mon CV</span>
              <span className="sm:hidden">Créer</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-foreground/10" />
        
        <div className="container mx-auto safe-x" style={{ maxWidth: '1200px' }}>
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="order-2 lg:order-1 animate-fade-in">
              <div className="inline-flex items-center gap-2 border border-border px-3 sm:px-4 py-2 rounded-full mb-6 sm:mb-8 text-xs sm:text-sm font-medium">
                <Sparkles className="w-4 h-4 text-primary" />
                100% Gratuit - Sans Inscription
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-foreground mb-5 leading-[1.1] tracking-tight min-h-[140px] sm:min-h-[180px] md:min-h-[200px]">
                <TypewriterText />
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Des outils intuitifs, des designs modernes et un export PDF instantané. 
                Créez un CV qui vous démarque en 2025.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-8 mb-8 pb-8 border-b border-border">
                <AnimatedCount value="5" label="Modèles Professionnels" />
                <AnimatedPercentSmooth />
                <AnimatedPDF />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/create')}
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 font-medium text-base px-8 h-12 press"
                >
                  Commencer Maintenant
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/gallery')}
                  className="w-full sm:w-auto font-medium text-base px-8 h-12 border-border hover:bg-accent hover:text-accent-foreground press"
                >
                  Voir les Modèles
                </Button>
              </div>
            </div>

            {/* Right Column - Mockup Image */}
            <div className="order-1 lg:order-2 flex items-center justify-center animate-scale-in">
              <div className="w-full flex items-center justify-center">
                <img 
                  src="/A_digital_advertisement_displays_CV_Builder_Pro_20.png" 
                  alt="CV Builder Pro - Aperçu de l'application de création de CV"
                  className="w-full h-auto max-w-[420px] lg:max-w-full object-contain rounded-xl"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-14 sm:py-20 border-t border-border bg-muted/20">
        <div className="container mx-auto safe-x">
          <div className="mb-10 sm:mb-16 text-center">
            <div className="inline-block text-[11px] sm:text-xs uppercase tracking-wider text-muted-foreground mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-background border border-border rounded-full">
              Fonctionnalités
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Tout ce dont vous avez besoin
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="border border-border rounded-lg p-5 sm:p-8 hover:border-foreground transition-all bg-card group hover-lift"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-foreground/5 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-foreground/10 transition-colors">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 tracking-tight">
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
      <section className="py-14 sm:py-20 border-t border-border">
        <div className="container mx-auto safe-x">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <div className="text-[11px] sm:text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  Avantages
                </div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4 sm:mb-6">
                  Pourquoi choisir CV Builder Pro ?
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-8">
                  Notre plateforme combine simplicité et professionnalisme pour vous offrir 
                  la meilleure expérience de création de CV en 2025.
                </p>
                <Button 
                  size="lg"
                  onClick={() => navigate('/create')}
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 press"
                >
                  Commencer Gratuitement
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid gap-3 sm:gap-4">
                {[
                  { icon: Zap, text: "Interface intuitive et rapide" },
                  { icon: Palette, text: "Design moderne et professionnel" },
                  { icon: Shield, text: "100% gratuit, aucune inscription" },
                  { icon: Download, text: "Export PDF haute qualité" },
                  { icon: CheckCircle2, text: "Compatible tous secteurs" },
                  { icon: Sparkles, text: "Optimisé pour 2025" }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 sm:gap-4 border border-border rounded-lg p-3 sm:p-4 bg-card hover:border-foreground/50 transition-colors">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-foreground/5 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
                    </div>
                    <span className="text-sm sm:text-base text-foreground font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-primary text-primary-foreground relative overflow-hidden border-t border-primary/20">
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
          backgroundSize: '32px 32px' 
        }} />
        
        <div className="container mx-auto safe-x relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-tight text-balance">
              Prêt à créer votre CV parfait ?
            </h2>
            <p className="text-base sm:text-lg mb-8 sm:mb-10 opacity-90 leading-relaxed">
              Rejoignez des milliers de professionnels qui créent leur CV avec notre outil en 2025
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/create')}
              className="w-full sm:w-auto bg-background text-primary hover:bg-background/90 font-medium text-base px-8 h-12 press"
            >
              Commencer Gratuitement
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-10 sm:py-12 safe-bottom">
        <div className="container mx-auto safe-x">
          <div className="text-center">
            <p className="text-sm sm:text-base text-muted-foreground mb-2 font-medium">
              © 2025 CV Builder Pro. Tous droits réservés.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Développé pour vous aider à réussir
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;
