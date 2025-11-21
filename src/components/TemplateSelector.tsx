import { Card } from "@/components/ui/card";
import { templateConfig } from "@/lib/templateConfig";
import { Check } from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

export const TemplateSelector = ({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-foreground tracking-tight">Choisir un template</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {templateConfig.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className={`relative group rounded-lg border-2 overflow-hidden transition-all ${
              selectedTemplate === template.id 
                ? 'border-primary ring-2 ring-primary ring-offset-2' 
                : 'border-border hover:border-primary/50'
            }`}
          >
            {/* Preview Image */}
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
              {/* Placeholder avec nom du template */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="text-4xl font-bold mb-2 opacity-20" style={{ color: template.id === 'tech' ? '#10b981' : template.id === 'creative' ? '#a855f7' : '#1e293b' }}>
                    {template.name.charAt(0)}
                  </div>
                  <div className="text-xs font-semibold opacity-40" style={{ color: '#1e293b' }}>
                    {template.name}
                  </div>
                </div>
              </div>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              
              {/* Selected indicator */}
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </div>
            
            {/* Template name */}
            <div className="p-2 bg-background">
              <p className="text-xs font-medium text-center text-foreground">{template.name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

