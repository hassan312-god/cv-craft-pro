import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { templateConfig, templateCategories, TemplateCategory, getTemplateComponent } from "@/lib/templateConfig";
import { Check } from "lucide-react";
import { CVData } from "@/pages/CVCreate";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

// Données d'exemple pour l'aperçu des templates
const getExampleCVData = (templateId: string): CVData => ({
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean.dupont@email.com",
  phone: "+33 6 12 34 56 78",
  address: "Paris, France",
  photo: (templateId.includes('photo') || templateId === 'azurill' || templateId === 'chikorita' || templateId === 'photo-banner') ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" : "",
  about: "Développeur passionné avec 5 ans d'expérience en développement web et mobile.",
  experiences: [
    {
      id: "1",
      company: "Tech Corp",
      position: "Développeur Full Stack",
      startDate: "2020-01",
      endDate: "",
      description: "Développement d'applications web et mobiles"
    }
  ],
  education: [
    {
      id: "1",
      school: "Université Paris",
      degree: "Master Informatique",
      startDate: "2018-09",
      endDate: "2020-06",
      description: ""
    }
  ],
  skills: [
    { id: "1", name: "React", level: 90 },
    { id: "2", name: "TypeScript", level: 85 }
  ],
  linkedin: "",
  github: "",
  twitter: "",
  portfolio: "",
  theme: "minimalist-black",
  template: templateId
});

export const TemplateSelector = ({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>("all");

  const filteredTemplates = templateConfig.filter(template => 
    selectedCategory === "all" || template.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-background via-muted/30 to-background p-5 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              Premium collection
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Templates premium</h2>
          </div>
          <span className="text-sm text-muted-foreground">{templateConfig.length} modèles professionnels</span>
        </div>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Choisissez un design premium selon votre secteur, votre style et votre niveau de professionnalisme.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            size="sm"
            className="rounded-full"
          >
            Tous ({templateConfig.length})
          </Button>
          {Object.entries(templateCategories)
            .filter(([key]) => key !== "all")
            .map(([key, label]) => {
              const count = templateConfig.filter(t => t.category === key).length;
              return (
                <Button
                  key={key}
                  variant={selectedCategory === key ? "default" : "outline"}
                  onClick={() => setSelectedCategory(key as TemplateCategory)}
                  size="sm"
                  className="rounded-full"
                >
                  {label} ({count})
                </Button>
              );
            })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredTemplates.map((template) => {
          const exampleData = getExampleCVData(template.id);
          const isSelected = selectedTemplate === template.id;

          return (
            <Card
              key={template.id}
              className={`group overflow-hidden border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-primary ring-2 ring-primary/20 shadow-md'
                  : 'border-border hover:border-primary/50 hover:shadow-md'
              }`}
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex items-center justify-between border-b border-border bg-muted/20 px-4 py-3">
                <span className="rounded-full border border-border bg-background px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {templateCategories[template.category]}
                </span>
                {isSelected ? (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-4 w-4" />
                  </div>
                ) : (
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Pro
                  </span>
                )}
              </div>

              <div className="p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{template.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{template.description}</p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
                  <div className="relative flex items-center justify-center bg-gradient-to-b from-slate-50 to-white p-2" style={{ aspectRatio: '210/297' }}>
                    <div
                      style={{
                        transform: 'scale(0.34)',
                        transformOrigin: 'center center',
                        width: '794px',
                        minHeight: '1123px',
                        backgroundColor: 'white',
                      }}
                    >
                      {(() => {
                        const TemplateComponent = getTemplateComponent(template.id);
                        return <TemplateComponent cvData={exampleData} />;
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-10 text-center">
          <p className="text-muted-foreground">Aucun template trouvé dans cette catégorie.</p>
        </div>
      )}
    </div>
  );
};

