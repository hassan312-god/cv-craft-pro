import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Download, Plus, Trash2, Upload, X, Sparkles, Loader2, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { CVPreview } from "@/components/CVPreview";
import { TemplateSelector } from "@/components/TemplateSelector";
import { toast } from "sonner";
import { generateAbout, generateExperienceDescription, generateEducationDescription } from "@/lib/openRouter";

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
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  
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
    }
  }, [preloadedData]);

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

  const handleDownloadPDF = () => {
    toast.success("Téléchargement du PDF en cours...", {
      description: "Votre CV sera téléchargé dans quelques instants"
    });
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
      });
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
      const generated = await generateExperienceDescription(exp.position, exp.company, exp.description);
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
      const generated = await generateEducationDescription(edu.degree, edu.school);
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/')} className="font-medium">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Retour
          </Button>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Créer mon CV</h1>
          <Button 
            onClick={handleDownloadPDF} 
            className="bg-primary hover:bg-primary/90 font-medium"
          >
            <Download className="mr-2 w-4 h-4" />
            PDF
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[1fr_500px] gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <button
                    onClick={() => setCurrentStep(index)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
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
                    <div className={`flex-1 h-1 mx-2 ${currentStep > index ? 'bg-primary' : 'bg-muted'}`} />
                  )}
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-2">{steps[currentStep].title}</h2>

            {/* Step 0: Personal Info */}
            {currentStep === 0 && (
              <Card className="p-6 border-border">
                <div className="space-y-4">
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
                      <Label htmlFor="address">Adresse</Label>
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
                <div className="space-y-6">
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
                      <div className="grid md:grid-cols-2 gap-3">
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
                <div className="space-y-6">
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
                      <div className="grid md:grid-cols-2 gap-3">
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
                      <div className="grid md:grid-cols-2 gap-3">
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
              <Card className="p-6 border-border space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4">Choisir un Template</h3>
                  <TemplateSelector 
                    selectedTemplate={cvData.template || 'minimal'}
                    onSelectTemplate={(templateId) => updateField('template', templateId)}
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4">Choisir un thème</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { id: 'minimalist-black', name: 'Minimaliste Noir', color: 'bg-black' },
                      { id: 'elegant-dark', name: 'Élégant Sombre', color: 'bg-slate-800' },
                      { id: 'professional-blue', name: 'Professionnel Bleu', color: 'bg-blue-600' },
                      { id: 'modern-gray', name: 'Moderne Gris', color: 'bg-gray-600' },
                      { id: 'creative-gradient', name: 'Créatif Gradient', color: 'bg-gradient-to-r from-purple-500 to-pink-500' }
                    ].map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => updateField('theme', theme.id)}
                        className={`p-4 rounded-lg border transition-all ${
                          cvData.theme === theme.id 
                            ? 'border-foreground bg-accent' 
                            : 'border-border hover:border-foreground/50'
                        }`}
                      >
                        <div className={`w-full h-24 ${theme.color} rounded mb-3`} />
                        <p className="font-medium text-foreground">{theme.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="font-medium"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Précédent
              </Button>
              
              <div className="text-sm text-muted-foreground">
                Étape {currentStep + 1} sur {steps.length}
              </div>

              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={nextStep}
                  className="font-medium bg-primary hover:bg-primary/90"
                >
                  Suivant
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleDownloadPDF}
                  className="font-medium bg-primary hover:bg-primary/90"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger PDF
                </Button>
              )}
            </div>
          </div>

          {/* Fixed Preview Section */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <CVPreview cvData={cvData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVCreate;
