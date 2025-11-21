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
  photo: (templateId.includes('photo') || templateId === 'azurill' || templateId === 'chikorita') ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" : "",
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
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-foreground tracking-tight">Choisir un template</h2>
        <p className="text-muted-foreground mb-6">
          Plus de {templateConfig.length} templates professionnels organisés par style
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            size="sm"
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
                >
                  {label} ({count})
                </Button>
              );
            })}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const exampleData = getExampleCVData(template.id);
          const isSelected = selectedTemplate === template.id;
          
          return (
            <Card
              key={template.id}
              className={`overflow-hidden border-border flex flex-col cursor-pointer transition-all ${
                isSelected 
                  ? 'border-primary ring-2 ring-primary ring-offset-2' 
                  : 'border-border hover:border-primary/50'
              }`}
              style={{ height: '650px' }}
              onClick={() => onSelectTemplate(template.id)}
            >
              {/* Template Header */}
              <div className="p-4 border-b border-border bg-muted/30 flex-shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-foreground truncate flex-1 mr-2">{template.name}</h3>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs px-2 py-1 bg-background border border-border rounded-full whitespace-nowrap">
                      {templateCategories[template.category]}
                    </span>
                    {isSelected && (
                      <div className="bg-primary text-primary-foreground rounded-full p-1 flex-shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{template.description}</p>
              </div>

              {/* CV Preview - Fixed aspect ratio container */}
              <div className="p-4 bg-muted/10 flex-1 min-h-0 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full" style={{ aspectRatio: '210/297' }}>
                  <div className="relative w-full h-full flex items-center justify-center" style={{ overflow: 'hidden' }}>
                    <div 
                      style={{
                        transform: 'scale(0.4)',
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

              {/* Template name footer */}
              <div className="p-3 border-t border-border bg-background flex-shrink-0">
                <p className="text-sm font-medium text-center text-foreground truncate">{template.name}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun template trouvé dans cette catégorie.</p>
        </div>
      )}
    </div>
  );
};

