import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Download, Plus, Trash2, Upload, X, Sparkles, Loader2, ArrowRight, ChevronLeft, ChevronRight, Eye, EyeOff, MapPin, Save, FolderOpen, Clock, FileText, Share2, BarChart3 } from "lucide-react";
import { CVPreview } from "@/components/CVPreview";
import { TemplateSelector } from "@/components/TemplateSelector";
import { toast } from "sonner";
import { generateAbout, generateExperienceDescription, generateEducationDescription, generateStepContent, generateFullCV, OPENROUTER_MODELS, type OpenRouterModel } from "@/lib/openRouter";
import { useAuth } from "@/contexts/AuthContext";
import { saveCVToCloud } from "@/lib/cloudCvs";
import { getTemplateComponent } from "@/lib/templateConfig";
import { allThemes } from "@/lib/themeConfig";
import { saveDraft, getAllDrafts, getDraft, deleteDraft, formatDraftDate, Draft } from "@/lib/draftStorage";
import { exportToWord } from "@/lib/wordExport";
import { saveSharedCV, getShareUrl, formatExpiryDate } from "@/lib/shareStorage";
import { extractDocumentText, parseCVFromDocumentText } from "@/lib/documentImport";
import { incrementCVsCreated, incrementPDFsExported, incrementWordsExported, incrementSharesCreated, recordTemplateUsage, recordThemeUsage, getUsageStats } from "@/lib/usageStats";
import { importCVFromFile } from "@/lib/importCV";
import { exportCVToPDF } from "@/lib/pdfExport";
import { importCVFile } from "@/lib/cvFileImport";
import { importJsonResumeFile } from "@/lib/jsonResumeImport";

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
}

export interface CVData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  photo: string;
  about: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  linkedin: string;
  github: string;
  twitter: string;
  portfolio: string;
  theme: string;
  template: string;
}

const CVCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(true);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isExportingWord, setIsExportingWord] = useState(false);
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(null);
  const [showDraftsModal, setShowDraftsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState<string>("");
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [selectedAiModel, setSelectedAiModel] = useState<OpenRouterModel>(OPENROUTER_MODELS[0].value);
  const [isImportingCV, setIsImportingCV] = useState(false);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [jobTitle, setJobTitle] = useState("");
  const [isGeneratingFull, setIsGeneratingFull] = useState(false);
  const [isSavingCloud, setIsSavingCloud] = useState(false);
  const { user } = useAuth();
  const [savedCvId, setSavedCvId] = useState<string | null>((location.state?.savedCvId as string) ?? null);
  const [savedCvTitle, setSavedCvTitle] = useState<string>((location.state?.savedCvTitle as string) ?? "");
  const cvPreviewRef = useRef<HTMLDivElement>(null);
  const cvPreviewVisibleRef = useRef<HTMLDivElement>(null);
  
  const preloadedData = location.state?.cvData as CVData | undefined;
  
  const [cvData, setCvData] = useState<CVData>(preloadedData || {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    photo: "",
    about: "",
    experiences: [],
    education: [],
    skills: [],
    linkedin: "",
    github: "",
    twitter: "",
    portfolio: "",
    theme: "minimalist-black",
    template: "minimal"
  });

  const steps = [
    { id: 0, title: "Informations Personnelles", icon: "user" },
    { id: 1, title: "Expériences Professionnelles", icon: "briefcase" },
    { id: 2, title: "Formation", icon: "graduation" },
    { id: 3, title: "Compétences", icon: "award" },
    { id: 4, title: "Thème & Template", icon: "palette" }
  ];

  useEffect(() => {
    if (preloadedData) {
      toast.success("Modèle chargé avec succès ! Personnalisez-le à votre guise.");
      incrementCVsCreated();
    } else if (cvData.firstName || cvData.lastName) {
      // Compter comme création si on a au moins un nom
      incrementCVsCreated();
    }
  }, [preloadedData]);

  // Enregistrer l'utilisation du template et thème
  useEffect(() => {
    if (cvData.template) {
      recordTemplateUsage(cvData.template);
    }
    if (cvData.theme) {
      recordThemeUsage(cvData.theme);
    }
  }, [cvData.template, cvData.theme]);

  // Sauvegarde automatique toutes les 30 secondes
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      // Ne sauvegarder que si au moins un champ est rempli
      if (cvData.firstName || cvData.lastName || cvData.email || cvData.experiences.length > 0) {
        try {
          const draftId = saveDraft(cvData, currentDraftId || undefined);
          if (!currentDraftId) {
            setCurrentDraftId(draftId);
          }
        } catch (error) {
          // Erreur silencieuse pour la sauvegarde automatique
          console.error('Erreur sauvegarde automatique:', error);
        }
      }
    }, 30000); // 30 secondes

    return () => clearInterval(autoSaveInterval);
  }, [cvData, currentDraftId]);

  // Charger les brouillons quand le modal s'ouvre
  useEffect(() => {
    if (showDraftsModal) {
      setDrafts(getAllDrafts());
    }
  }, [showDraftsModal]);

  const updateField = (field: keyof CVData, value: any) => {
    setCvData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Veuillez sélectionner une image");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("L'image est trop grande (max 5MB)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('photo', reader.result as string);
        toast.success("Photo téléchargée avec succès");
      };
      reader.onerror = () => toast.error("Erreur lors du chargement de l'image");
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoRemove = () => {
    updateField('photo', '');
    toast.success("Photo supprimée");
  };

  const handleImportCV = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setIsImportingCV(true);
    try {
      const importedData = file.name.toLowerCase().endsWith(".json")
        ? await importJsonResumeFile(file)
        : await importCVFile(file);
      setCvData((current) => ({ ...current, ...importedData }));
      toast.success("CV importé. Vérifiez les champs avant de continuer.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Impossible d’importer ce fichier.");
    } finally {
      setIsImportingCV(false);
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error("La géolocalisation n'est pas supportée par votre navigateur");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Utiliser l'API Nominatim d'OpenStreetMap pour une adresse complète et précise
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&accept-language=fr`
          );
          const data = await response.json();
          
          if (data && data.address) {
            const addr = data.address;
            const addressParts = [];
            
            // Construire l'adresse de manière précise
            if (addr.house_number) addressParts.push(addr.house_number);
            if (addr.road) addressParts.push(addr.road);
            if (addr.postcode) addressParts.push(addr.postcode);
            if (addr.city || addr.town || addr.village || addr.municipality) {
              addressParts.push(addr.city || addr.town || addr.village || addr.municipality);
            }
            if (addr.country) addressParts.push(addr.country);
            
            if (addressParts.length > 0) {
              const fullAddress = addressParts.join(', ');
              updateField('address', fullAddress);
              toast.success("Adresse précise détectée avec succès !");
            } else {
              // Fallback si pas assez de détails
              const fallbackParts = [];
              if (addr.city || addr.town || addr.village) {
                fallbackParts.push(addr.city || addr.town || addr.village);
              }
              if (addr.postcode) fallbackParts.push(addr.postcode);
              if (addr.country) fallbackParts.push(addr.country);
              
              if (fallbackParts.length > 0) {
                updateField('address', fallbackParts.join(', '));
                toast.success("Position détectée avec succès !");
              } else {
                toast.error("Impossible de déterminer une adresse précise");
              }
            }
          } else {
            toast.error("Impossible de déterminer votre position");
          }
        } catch (error) {
          console.error('Erreur géolocalisation:', error);
          toast.error("Erreur lors de la récupération de l'adresse");
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          toast.error("Permission de géolocalisation refusée. Veuillez autoriser l'accès à votre position.");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          toast.error("Position indisponible. Vérifiez votre connexion GPS.");
        } else if (error.code === error.TIMEOUT) {
          toast.error("Délai d'attente dépassé. Réessayez.");
        } else {
          toast.error("Erreur lors de la géolocalisation");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: ""
    };
    setCvData(prev => ({ ...prev, experiences: [...prev.experiences, newExp] }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setCvData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setCvData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      description: ""
    };
    setCvData(prev => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      level: 50
    };
    setCvData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
  };

  const updateSkill = (id: string, field: keyof Skill, value: string | number) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const removeSkill = (id: string) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const applyGenerated = (data: Record<string, unknown>) => {
    setCvData((prev) => {
      const next = { ...prev };
      const str = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : undefined);
      (["firstName", "lastName", "email", "phone", "address", "about", "linkedin", "github", "twitter", "portfolio"] as const).forEach((k) => {
        const v = str(k);
        if (v) (next as any)[k] = v;
      });
      if (Array.isArray(data.experiences)) {
        next.experiences = (data.experiences as any[]).map((e, i) => ({
          id: `${Date.now()}-exp-${i}`,
          company: e.company ?? "",
          position: e.position ?? "",
          startDate: e.startDate ?? "",
          endDate: e.endDate ?? "",
          description: e.description ?? "",
        }));
      }
      if (Array.isArray(data.education)) {
        next.education = (data.education as any[]).map((e, i) => ({
          id: `${Date.now()}-edu-${i}`,
          school: e.school ?? "",
          degree: e.degree ?? "",
          startDate: e.startDate ?? "",
          endDate: e.endDate ?? "",
          description: e.description ?? "",
        }));
      }
      if (Array.isArray(data.skills)) {
        next.skills = (data.skills as any[]).map((s, i) => ({
          id: `${Date.now()}-skill-${i}`,
          name: s.name ?? "",
          level: typeof s.level === "number" ? s.level : 75,
        }));
      }
      return next;
    });
  };

  const handleGenerateFullCV = async (downloadPdf = false) => {
    setIsGeneratingFull(true);
    toast.loading("Génération du CV complet avec IA...", { id: "ai-full" });
    try {
      const data = await generateFullCV(
        { firstName: cvData.firstName, lastName: cvData.lastName, jobTitle },
        selectedAiModel
      );
      applyGenerated(data);
      toast.success("CV généré avec IA", { id: "ai-full" });
      if (downloadPdf) {
        await new Promise((r) => setTimeout(r, 300));
        await handleDownloadPDF();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Génération impossible", { id: "ai-full" });
    } finally {
      setIsGeneratingFull(false);
    }
  };

  const handleGenerateStep = async () => {
    const stepKeys = ["personal", "experiences", "education", "skills", "socials"] as const;
    const step = stepKeys[currentStep];
    if (!step) {
      toast.info("Aucune génération IA pour cette étape");
      return;
    }
    setIsGenerating(`step-${step}`);
    try {
      const data = await generateStepContent(step, { firstName: cvData.firstName, lastName: cvData.lastName, jobTitle }, selectedAiModel);
      applyGenerated(data);
      toast.success("Section générée avec IA");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Génération impossible");
    } finally {
      setIsGenerating(null);
    }
  };

  const handleSaveCloud = async () => {
    if (!user) {
      toast.error("Connectez-vous pour sauvegarder dans le cloud");
      navigate("/auth");
      return;
    }
    setIsSavingCloud(true);
    try {
      const title = savedCvTitle || `${cvData.firstName || "CV"} ${cvData.lastName || ""}`.trim() || "Mon CV";
      const id = await saveCVToCloud(cvData, title, savedCvId);
      setSavedCvId(id);
      setSavedCvTitle(title);
      toast.success("CV sauvegardé dans le cloud");
    } catch {
      toast.error("Sauvegarde cloud impossible");
    } finally {
      setIsSavingCloud(false);
    }
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    toast.loading("Génération du PDF en cours...", {
      id: "pdf-download"
    });

    try {
      await exportCVToPDF(cvData);
      incrementPDFsExported();
      toast.success("PDF téléchargé avec succès !", {
        id: "pdf-download"
      });
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      toast.error(`Erreur lors de la génération du PDF: ${error instanceof Error ? error.message : 'Erreur inconnue'}`, {
        id: "pdf-download"
      });
    } finally {
      setIsDownloading(false);
      toast.dismiss("pdf-download");
    }
  };

  // Export en Word
  const handleExportWord = async () => {
    setIsExportingWord(true);
    toast.loading("Génération du document Word...", {
      id: "word-export"
    });

    try {
      await exportToWord(cvData);
      incrementWordsExported();
      toast.success("Document Word téléchargé avec succès !", {
        id: "word-export"
      });
    } catch (error) {
      console.error('Erreur lors de l\'export Word:', error);
      toast.error("Erreur lors de l'export Word. Veuillez réessayer.", {
        id: "word-export"
      });
    } finally {
      setIsExportingWord(false);
    }
  };

  // Partager le CV
  const handleShareCV = () => {
    try {
      const shareId = saveSharedCV(cvData);
      const url = getShareUrl(shareId);
      setShareUrl(url);
      setShowShareModal(true);
      incrementSharesCreated();
      toast.success("Lien de partage créé !");
    } catch (error) {
      console.error('Erreur lors du partage:', error);
      toast.error("Erreur lors de la création du lien de partage");
    }
  };

  const copyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Lien copié dans le presse-papiers !");
  };

  const handleGenerateAbout = async () => {
    setIsGenerating('about');
    try {
      const generated = await generateAbout({
        firstName: cvData.firstName,
        lastName: cvData.lastName,
        experiences: cvData.experiences,
        education: cvData.education,
        skills: cvData.skills
      }, selectedAiModel);
      updateField('about', generated);
      toast.success("Description générée avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la génération");
    } finally {
      setIsGenerating(null);
    }
  };

  const handleGenerateExperienceDescription = async (expId: string) => {
    setIsGenerating(`exp-${expId}`);
    const exp = cvData.experiences.find(e => e.id === expId);
    if (!exp) return;
    try {
      const generated = await generateExperienceDescription(exp.position, exp.company, exp.description, selectedAiModel);
      updateExperience(expId, 'description', generated);
      toast.success("Description générée avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la génération");
    } finally {
      setIsGenerating(null);
    }
  };

  const handleGenerateEducationDescription = async (eduId: string) => {
    setIsGenerating(`edu-${eduId}`);
    const edu = cvData.education.find(e => e.id === eduId);
    if (!edu) return;
    try {
      const generated = await generateEducationDescription(edu.degree, edu.school, selectedAiModel);
      updateEducation(eduId, 'description', generated);
      toast.success("Description générée avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la génération");
    } finally {
      setIsGenerating(null);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Fonction pour sauvegarder manuellement un brouillon
  const handleSaveDraft = () => {
    try {
      const draftId = saveDraft(cvData, currentDraftId || undefined);
      if (!currentDraftId) {
        setCurrentDraftId(draftId);
      }
      toast.success("Brouillon sauvegardé avec succès !");
      // Rafraîchir la liste des brouillons
      setDrafts(getAllDrafts());
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast.error("Erreur lors de la sauvegarde du brouillon");
    }
  };

  // Fonction pour charger un brouillon
  const handleLoadDraft = (draft: Draft) => {
    try {
      setCvData(draft.data);
      setCurrentDraftId(draft.id);
      setShowDraftsModal(false);
      toast.success("Brouillon chargé avec succès !");
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      toast.error("Erreur lors du chargement du brouillon");
    }
  };

  // Fonction pour supprimer un brouillon
  const handleDeleteDraft = (draftId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Empêcher le clic de se propager au Card
    try {
      deleteDraft(draftId);
      if (currentDraftId === draftId) {
        setCurrentDraftId(null);
      }
      setDrafts(getAllDrafts());
      toast.success("Brouillon supprimé");
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error("Erreur lors de la suppression du brouillon");
    }
  };

  return (
    <main className="min-h-screen bg-background" aria-label="Création de CV">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto safe-x py-3 sm:py-5 flex items-center justify-between gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="font-medium shrink-0 px-2 sm:px-3">
            <ArrowLeft className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Retour</span>
          </Button>
          <h1 className="text-base sm:text-xl font-bold text-foreground tracking-tight truncate">Créer mon CV</h1>
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Aperçu : modal sur mobile, colonne sur desktop */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(user ? "/mes-cv" : "/auth")}
              className="font-medium px-2 sm:px-3"
            >
              <FolderOpen className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Mes CV</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMobilePreview(true)}
              className="font-medium px-2 lg:hidden"
              aria-label="Aperçu du CV"
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)} 
              className="font-medium hidden lg:inline-flex"
            >
              {showPreview ? (
                <>
                  <EyeOff className="mr-2 w-4 h-4" />
                  Masquer Aperçu
                </>
              ) : (
                <>
                  <Eye className="mr-2 w-4 h-4" />
                  Aperçu
                </>
              )}
            </Button>
            <Button 
              onClick={handleDownloadPDF} 
              disabled={isDownloading}
              size="sm"
              className="bg-primary hover:bg-primary/90 font-medium px-2 sm:px-3"
            >
              {isDownloading ? (
                <Loader2 className="w-4 h-4 animate-spin sm:mr-2" />
              ) : (
                <Download className="w-4 h-4 sm:mr-2" />
              )}
              <span className="hidden sm:inline">{isDownloading ? 'Génération...' : 'PDF'}</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto safe-x py-6 sm:py-8">
        <div className={`grid gap-6 lg:gap-8 ${showPreview ? 'lg:grid-cols-[1fr_500px]' : 'lg:grid-cols-1'}`}>
          {/* Form Section */}
          <div className="space-y-6 min-w-0">
            {/* Progress Steps */}
            <div className="-mx-1 overflow-x-auto pb-1 mb-6 sm:mb-8">
              <div className="flex items-center min-w-max px-1 sm:min-w-0">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center flex-1">
                    <button
                      onClick={() => setCurrentStep(index)}
                      className={`w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full flex items-center justify-center font-bold transition-all ${
                        currentStep === index 
                          ? 'bg-primary text-primary-foreground scale-110' 
                          : currentStep > index
                          ? 'bg-primary/20 text-primary'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {index + 1}
                    </button>
                    {index < steps.length - 1 && (
                      <div className={`w-10 sm:w-auto sm:flex-1 h-1 mx-2 ${currentStep > index ? 'bg-primary' : 'bg-muted'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>


            <h2 className="text-2xl font-bold text-foreground mb-2">{steps[currentStep].title}</h2>

            {/* Step 0: Personal Info */}
            {currentStep === 0 && (
              <Card className="p-6 border-border">
                <div className="space-y-4">
                  <div className="rounded-lg border border-dashed border-primary/40 bg-primary/5 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-medium text-foreground">Importer un CV existant</p>
                        <p className="text-xs text-muted-foreground">PDF ou DOCX. Les informations seront extraites puis modifiables.</p>
                      </div>
                      <label className="inline-flex cursor-pointer items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                        {isImportingCV ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                        {isImportingCV ? "Import..." : "Choisir un fichier"}
                        <input type="file" accept=".json,.pdf,.docx,application/json,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleImportCV} disabled={isImportingCV} className="hidden" />
                      </label>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/30 p-3">
                    <Label htmlFor="ai-model">Modèle IA</Label>
                    <select
                      id="ai-model"
                      value={selectedAiModel}
                      onChange={(e) => setSelectedAiModel(e.target.value as OpenRouterModel)}
                      className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    >
                      {OPENROUTER_MODELS.map((model) => (
                        <option key={model.value} value={model.value}>{model.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="rounded-lg border border-primary/40 bg-primary/5 p-4 space-y-3">
                    <div>
                      <p className="font-medium text-foreground">Générer un CV complet avec IA</p>
                      <p className="text-xs text-muted-foreground">Toutes les sections sont remplies en une seule étape.</p>
                    </div>
                    <Input
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="Métier visé (ex : Développeur Full Stack)"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Button
                        onClick={() => handleGenerateFullCV(false)}
                        disabled={isGeneratingFull}
                        className="bg-primary hover:bg-primary/90 font-medium w-full"
                      >
                        {isGeneratingFull ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                        Générer le CV complet
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleGenerateFullCV(true)}
                        disabled={isGeneratingFull || isDownloading}
                        className="font-medium w-full"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Générer + PDF A4
                      </Button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input 
                        id="firstName"
                        value={cvData.firstName}
                        onChange={(e) => updateField('firstName', e.target.value)}
                        placeholder="Jean"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom</Label>
                      <Input 
                        id="lastName"
                        value={cvData.lastName}
                        onChange={(e) => updateField('lastName', e.target.value)}
                        placeholder="Dupont"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={cvData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="jean.dupont@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input 
                        id="phone"
                        value={cvData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="+33 6 12 34 56 78"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="address">Adresse</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleGetLocation}
                          disabled={isLocating}
                          className="text-xs"
                        >
                          {isLocating ? (
                            <>
                              <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                              Localisation...
                            </>
                          ) : (
                            <>
                              <MapPin className="w-3 h-3 mr-2" />
                              Localiser
                            </>
                          )}
                        </Button>
                      </div>
                      <Input 
                        id="address"
                        value={cvData.address}
                        onChange={(e) => updateField('address', e.target.value)}
                        placeholder="Paris, France"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="photo">Photo de profil</Label>
                      <div className="space-y-3">
                        {!cvData.photo ? (
                          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                            <label htmlFor="photo" className="cursor-pointer">
                              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm font-medium mb-1">Cliquez pour télécharger une photo</p>
                              <p className="text-xs text-muted-foreground">JPG, PNG (max 5MB)</p>
                              <input 
                                type="file" 
                                id="photo"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                className="hidden"
                              />
                            </label>
                          </div>
                        ) : (
                          <div className="relative inline-block">
                            <img 
                              src={cvData.photo} 
                              alt="Photo de profil" 
                              className="w-32 h-32 object-cover rounded-lg border-2 border-border"
                            />
                            <Button
                              type="button"
                              size="icon"
                              variant="destructive"
                              className="absolute -top-2 -right-2 rounded-full w-6 h-6"
                              onClick={handlePhotoRemove}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="about">À propos de moi</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleGenerateAbout}
                          disabled={isGenerating === 'about' || !cvData.firstName || !cvData.lastName}
                        >
                          {isGenerating === 'about' ? (
                            <>
                              <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                              Génération...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3 h-3 mr-2" />
                              Générer avec IA
                            </>
                          )}
                        </Button>
                      </div>
                      <Textarea 
                        id="about"
                        value={cvData.about}
                        onChange={(e) => updateField('about', e.target.value)}
                        placeholder="Décrivez-vous en quelques lignes..."
                        rows={4}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Réseaux sociaux</Label>
                      <div className="space-y-2 mt-2">
                        <Input 
                          value={cvData.linkedin}
                          onChange={(e) => updateField('linkedin', e.target.value)}
                          placeholder="LinkedIn URL"
                        />
                        <Input 
                          value={cvData.github}
                          onChange={(e) => updateField('github', e.target.value)}
                          placeholder="GitHub URL"
                        />
                        <Input 
                          value={cvData.twitter}
                          onChange={(e) => updateField('twitter', e.target.value)}
                          placeholder="Twitter URL"
                        />
                        <Input 
                          value={cvData.portfolio}
                          onChange={(e) => updateField('portfolio', e.target.value)}
                          placeholder="Portfolio URL"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Step 1: Experience */}
            {currentStep === 1 && (
              <Card className="p-6 border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-foreground">Expériences Professionnelles</h3>
                  <Button onClick={addExperience} size="sm" variant="outline" className="font-medium">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
                <div className="space-y-4">
                  {cvData.experiences.map((exp) => (
                    <div key={exp.id} className="border border-border rounded-lg p-4 relative">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => removeExperience(exp.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Entreprise</Label>
                          <Input 
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            placeholder="Nom de l'entreprise"
                          />
                        </div>
                        <div>
                          <Label>Poste</Label>
                          <Input 
                            value={exp.position}
                            onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                            placeholder="Intitulé du poste"
                          />
                        </div>
                        <div>
                          <Label>Date de début</Label>
                          <Input 
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Date de fin</Label>
                          <Input 
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <div className="flex items-center justify-between mb-2">
                            <Label>Description</Label>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleGenerateExperienceDescription(exp.id)}
                              disabled={isGenerating === `exp-${exp.id}` || !exp.position || !exp.company}
                            >
                              {isGenerating === `exp-${exp.id}` ? (
                                <>
                                  <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                                  Génération...
                                </>
                              ) : (
                                <>
                                  <Sparkles className="w-3 h-3 mr-2" />
                                  Générer avec IA
                                </>
                              )}
                            </Button>
                          </div>
                          <Textarea 
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                            placeholder="Décrivez vos missions et réalisations..."
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {cvData.experiences.length === 0 && (
                    <p className="text-muted-foreground text-center py-8">
                      Aucune expérience ajoutée. Cliquez sur "Ajouter" pour commencer.
                    </p>
                  )}
                </div>
              </Card>
            )}

            {/* Step 2: Education */}
            {currentStep === 2 && (
              <Card className="p-6 border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-foreground">Formation</h3>
                  <Button onClick={addEducation} size="sm" variant="outline" className="font-medium">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
                <div className="space-y-4">
                  {cvData.education.map((edu) => (
                    <div key={edu.id} className="border border-border rounded-lg p-4 relative">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => removeEducation(edu.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Établissement</Label>
                          <Input 
                            value={edu.school}
                            onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                            placeholder="Nom de l'école/université"
                          />
                        </div>
                        <div>
                          <Label>Diplôme</Label>
                          <Input 
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                            placeholder="Nom du diplôme"
                          />
                        </div>
                        <div>
                          <Label>Date de début</Label>
                          <Input 
                            type="month"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Date de fin</Label>
                          <Input 
                            type="month"
                            value={edu.endDate}
                            onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <div className="flex items-center justify-between mb-2">
                            <Label>Description</Label>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleGenerateEducationDescription(edu.id)}
                              disabled={isGenerating === `edu-${edu.id}` || !edu.degree || !edu.school}
                            >
                              {isGenerating === `edu-${edu.id}` ? (
                                <>
                                  <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                                  Génération...
                                </>
                              ) : (
                                <>
                                  <Sparkles className="w-3 h-3 mr-2" />
                                  Générer avec IA
                                </>
                              )}
                            </Button>
                          </div>
                          <Textarea 
                            value={edu.description}
                            onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                            placeholder="Décrivez votre parcours..."
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {cvData.education.length === 0 && (
                    <p className="text-muted-foreground text-center py-8">
                      Aucune formation ajoutée. Cliquez sur "Ajouter" pour commencer.
                    </p>
                  )}
                </div>
              </Card>
            )}

            {/* Step 3: Skills */}
            {currentStep === 3 && (
              <Card className="p-6 border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-foreground">Compétences</h3>
                  <Button onClick={addSkill} size="sm" variant="outline" className="font-medium">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
                <div className="space-y-4">
                  {cvData.skills.map((skill) => (
                    <div key={skill.id} className="border border-border rounded-lg p-4 relative">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => removeSkill(skill.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Nom de la compétence</Label>
                          <Input 
                            value={skill.name}
                            onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                            placeholder="Ex: JavaScript, Design, Management..."
                          />
                        </div>
                        <div>
                          <Label>Niveau (0-100%)</Label>
                          <Input 
                            type="number"
                            min="0"
                            max="100"
                            value={skill.level}
                            onChange={(e) => updateSkill(skill.id, 'level', parseInt(e.target.value))}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {cvData.skills.length === 0 && (
                    <p className="text-muted-foreground text-center py-8">
                      Aucune compétence ajoutée. Cliquez sur "Ajouter" pour commencer.
                    </p>
                  )}
                </div>
              </Card>
            )}

            {/* Step 4: Theme */}
            {currentStep === 4 && (
              <Card className="p-6 border-border">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-4">Choisir un Template</h3>
                    <TemplateSelector 
                      selectedTemplate={cvData.template || 'minimal'}
                      onSelectTemplate={(templateId) => updateField('template', templateId)}
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-4">Choisir un thème</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allThemes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => updateField('theme', theme.id)}
                        className={`p-4 rounded-lg border transition-all ${
                          cvData.theme === theme.id 
                            ? 'border-primary ring-2 ring-primary ring-offset-2 bg-accent' 
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className={`w-full h-24 ${theme.previewColor} rounded mb-3`} />
                        <p className="font-medium text-foreground mb-1">{theme.name}</p>
                        <p className="text-xs text-muted-foreground">{theme.fontFamily.split(',')[0]}</p>
                      </button>
                    ))}
                  </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col gap-4 pt-5 sm:pt-6 border-t border-border safe-bottom">
              <div className="flex items-center justify-between gap-3">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="font-medium press flex-1 sm:flex-none"
                >
                  <ChevronLeft className="w-4 h-4 mr-1.5 sm:mr-2" />
                  Précédent
                </Button>

                <span className="hidden sm:block text-sm text-muted-foreground whitespace-nowrap">
                  Étape {currentStep + 1} sur {steps.length}
                </span>

                {currentStep < steps.length - 1 && (
                  <Button
                    onClick={nextStep}
                    className="font-medium bg-primary hover:bg-primary/90 press flex-1 sm:flex-none"
                  >
                    Suivant
                    <ChevronRight className="w-4 h-4 ml-1.5 sm:ml-2" />
                  </Button>
                )}
              </div>

              <p className="sm:hidden text-center text-xs text-muted-foreground">
                Étape {currentStep + 1} sur {steps.length}
              </p>

              {currentStep === steps.length - 1 && (
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                  <Button
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    className="font-medium bg-primary hover:bg-primary/90 press w-full sm:w-auto"
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Génération...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        PDF
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleExportWord}
                    disabled={isExportingWord}
                    variant="outline"
                    className="font-medium press w-full sm:w-auto"
                  >
                    {isExportingWord ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Génération...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        Word
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleShareCV}
                    variant="outline"
                    className="font-medium press w-full sm:w-auto"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Partager
                  </Button>
                  <Button
                    onClick={() => setShowStatsModal(true)}
                    variant="outline"
                    className="font-medium press w-full sm:w-auto"
                    title="Statistiques"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Stats
                  </Button>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveDraft}
                  className="font-medium press flex-1 sm:flex-none"
                  title="Sauvegarder le brouillon"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDraftsModal(true)}
                  className="font-medium press flex-1 sm:flex-none"
                  title="Voir les brouillons sauvegardés"
                >
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Brouillons
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveCloud}
                  disabled={isSavingCloud}
                  className="font-medium press flex-1 sm:flex-none"
                  title="Sauvegarder dans le cloud"
                >
                  {isSavingCloud ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Cloud
                </Button>
                {currentStep < 4 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateStep}
                    disabled={isGenerating !== null}
                    className="font-medium press flex-1 sm:flex-none"
                    title="Générer cette section avec IA"
                  >
                    {isGenerating?.startsWith("step-") ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                    IA section
                  </Button>
                )}
              </div>
            </div>

          </div>

          {/* Fixed Preview Section */}
          {showPreview && (
            <div className="hidden lg:block" ref={cvPreviewVisibleRef}>
              <div className="sticky top-24">
                <CVPreview key={`${cvData.theme}-${cvData.template}`} cvData={cvData} />
              </div>
            </div>
          )}

          {/* Aperçu mobile en modal */}
          <Dialog open={showMobilePreview} onOpenChange={setShowMobilePreview}>
            <DialogContent className="lg:hidden max-w-[100vw] w-screen h-[100dvh] sm:h-auto sm:max-h-[95vh] overflow-y-auto p-3 rounded-none sm:rounded-lg">
              <DialogHeader className="text-left">
                <DialogTitle className="text-base">Aperçu du CV</DialogTitle>
                <DialogDescription className="text-xs">
                  Aperçu au format A4 de votre CV.
                </DialogDescription>
              </DialogHeader>
              <div className="w-full overflow-x-hidden">
                <CVPreview key={`modal-${cvData.theme}-${cvData.template}`} cvData={cvData} />
              </div>
              <Button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {isDownloading ? (
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                ) : (
                  <Download className="mr-2 w-4 h-4" />
                )}
                Télécharger PDF
              </Button>
            </DialogContent>
          </Dialog>

          
          {/* Hidden preview for PDF generation - full size A4 without scaling */}
          <div 
            className="fixed -left-[9999px] top-0 pointer-events-none" 
            ref={cvPreviewRef}
            style={{ 
              visibility: 'hidden',
              position: 'absolute',
              left: '-9999px',
              top: '0',
              zIndex: -1
            }}
          >
            <div 
              style={{ 
                width: '794px', 
                minHeight: '1123px',
                backgroundColor: 'white',
                padding: '0',
                position: 'relative'
              }}
            >
              {(() => {
                const template = cvData.template || 'minimal';
                const TemplateComponent = getTemplateComponent(template);
                return <TemplateComponent cvData={cvData} />;
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Modal des brouillons */}
      <Dialog open={showDraftsModal} onOpenChange={setShowDraftsModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Mes brouillons</DialogTitle>
            <DialogDescription>
              Vos CVs sauvegardés. Cliquez sur un brouillon pour le charger.
            </DialogDescription>
          </DialogHeader>
          
          {drafts.length === 0 ? (
            <div className="text-center py-12">
              <FolderOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Aucun brouillon sauvegardé</p>
              <p className="text-sm text-muted-foreground mt-2">
                Vos brouillons seront sauvegardés automatiquement toutes les 30 secondes
              </p>
            </div>
          ) : (
            <div className="space-y-2 mt-4">
              {drafts.map((draft) => (
                <Card
                  key={draft.id}
                  className={`p-4 cursor-pointer transition-all hover:bg-accent ${
                    currentDraftId === draft.id ? 'border-primary bg-accent' : ''
                  }`}
                  onClick={() => handleLoadDraft(draft)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        {draft.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDraftDate(draft.updatedAt)}
                        </span>
                        {draft.data.firstName || draft.data.lastName ? (
                          <span>
                            {draft.data.firstName} {draft.data.lastName}
                          </span>
                        ) : null}
                        {draft.data.experiences.length > 0 && (
                          <span className="truncate">
                            {draft.data.experiences[0].position}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleDeleteDraft(draft.id, e)}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de partage */}
      <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Partager votre CV</DialogTitle>
            <DialogDescription>
              Partagez ce lien pour permettre à d'autres de voir votre CV
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex gap-2 mb-4">
              <Input
                value={shareUrl}
                readOnly
                className="flex-1"
              />
              <Button onClick={copyShareUrl} variant="outline">
                Copier
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Ce lien sera valide pendant 30 jours. Toute personne avec ce lien pourra voir votre CV.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal des statistiques */}
      <Dialog open={showStatsModal} onOpenChange={setShowStatsModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Statistiques d'utilisation</DialogTitle>
            <DialogDescription>
              Vos statistiques d'utilisation de CV Builder Pro
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {(() => {
              const stats = getUsageStats();
              return (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4">
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {stats.totalCVsCreated}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        CVs créés
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {stats.totalPDFsExported}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        PDFs exportés
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {stats.totalWordsExported}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Documents Word exportés
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {stats.totalSharesCreated}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        CVs partagés
                      </div>
                    </Card>
                  </div>
                  
                  {stats.mostUsedTemplate && (
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Template le plus utilisé</h3>
                      <p className="text-sm text-muted-foreground">
                        {stats.mostUsedTemplate} ({stats.templatesUsed[stats.mostUsedTemplate]} fois)
                      </p>
                    </div>
                  )}
                  
                  {stats.mostUsedTheme && (
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Thème le plus utilisé</h3>
                      <p className="text-sm text-muted-foreground">
                        {stats.mostUsedTheme} ({stats.themesUsed[stats.mostUsedTheme]} fois)
                      </p>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default CVCreate;
