import { Card } from "@/components/ui/card";
import { CVData } from "@/pages/CVCreate";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe } from "lucide-react";
import { getServiceName, formatUrl, safeValue, formatDate } from "@/lib/cvUtils";

export const TemplatePhotoCompact = ({ cvData }: { cvData: CVData }) => {
  const getThemeColors = (theme: string) => {
    const themes: Record<string, any> = {
      'minimalist-black': { primary: 'rgb(23, 23, 23)', secondary: 'rgb(100, 100, 100)', text: 'rgb(50, 50, 50)', light: 'rgb(240, 240, 240)', accent: 'rgb(23, 23, 23)' },
      'elegant-dark': { primary: 'rgb(30, 41, 59)', secondary: 'rgb(100, 116, 139)', text: 'rgb(51, 65, 85)', light: 'rgb(248, 250, 252)', accent: 'rgb(100, 116, 139)' },
      'professional-blue': { primary: 'rgb(37, 99, 235)', secondary: 'rgb(59, 130, 246)', text: 'rgb(30, 41, 59)', light: 'rgb(241, 245, 249)', accent: 'rgb(37, 99, 235)' },
      'modern-gray': { primary: 'rgb(75, 85, 99)', secondary: 'rgb(107, 114, 128)', text: 'rgb(31, 41, 55)', light: 'rgb(249, 250, 251)', accent: 'rgb(75, 85, 99)' },
      'creative-gradient': { primary: 'rgb(168, 85, 247)', secondary: 'rgb(236, 72, 153)', text: 'rgb(30, 41, 59)', light: 'rgb(250, 245, 255)', accent: 'rgb(168, 85, 247)' },
      'ocean-blue': { primary: 'rgb(14, 165, 233)', secondary: 'rgb(6, 182, 212)', text: 'rgb(30, 41, 59)', light: 'rgb(224, 242, 254)', accent: 'rgb(14, 165, 233)' },
      'forest-green': { primary: 'rgb(22, 163, 74)', secondary: 'rgb(16, 185, 129)', text: 'rgb(30, 41, 59)', light: 'rgb(220, 252, 231)', accent: 'rgb(22, 163, 74)' },
      'sunset-orange': { primary: 'rgb(249, 115, 22)', secondary: 'rgb(239, 68, 68)', text: 'rgb(30, 41, 59)', light: 'rgb(255, 237, 213)', accent: 'rgb(249, 115, 22)' },
      'royal-purple': { primary: 'rgb(147, 51, 234)', secondary: 'rgb(99, 102, 241)', text: 'rgb(30, 41, 59)', light: 'rgb(243, 232, 255)', accent: 'rgb(147, 51, 234)' },
      'coral-pink': { primary: 'rgb(244, 63, 94)', secondary: 'rgb(251, 113, 133)', text: 'rgb(30, 41, 59)', light: 'rgb(255, 228, 230)', accent: 'rgb(244, 63, 94)' },
      'midnight-blue': { primary: 'rgb(15, 23, 42)', secondary: 'rgb(30, 58, 138)', text: 'rgb(248, 250, 252)', light: 'rgb(241, 245, 249)', accent: 'rgb(59, 130, 246)' },
      'emerald-green': { primary: 'rgb(16, 185, 129)', secondary: 'rgb(5, 150, 105)', text: 'rgb(30, 41, 59)', light: 'rgb(209, 250, 229)', accent: 'rgb(16, 185, 129)' }
    };
    return themes[theme as keyof typeof themes] || themes['minimalist-black'];
  };

  const colors = getThemeColors(cvData.theme || 'minimalist-black');

  return (
    <Card className="overflow-hidden border-0 shadow-none" style={{ width: '794px' }}>
      <div className="bg-white" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {/* Compact Header with Photo */}
        <div className="flex items-center gap-6 p-8 border-b-2" style={{ borderColor: colors.accent }}>
          {cvData.photo && (
            <img 
              src={cvData.photo} 
              alt="Photo de profil" 
              className="w-24 h-24 object-cover rounded-lg"
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>
              {safeValue(cvData.firstName)} {safeValue(cvData.lastName)}
            </h1>
            <div className="flex flex-wrap gap-4 text-xs mt-2" style={{ color: colors.secondary }}>
              {cvData.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{safeValue(cvData.email)}</span>}
              {cvData.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{safeValue(cvData.phone)}</span>}
              {cvData.address && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{safeValue(cvData.address)}</span>}
            </div>
          </div>
        </div>

        <div className="p-8">
          {cvData.about && (
            <div className="mb-6">
              <h2 className="text-sm uppercase tracking-widest font-bold mb-2" style={{ color: colors.primary }}>À propos</h2>
              <p className="text-xs leading-relaxed" style={{ color: colors.text }}>{cvData.about}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-8">
            <div>
              {cvData.experiences.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-sm uppercase tracking-widest font-bold mb-3" style={{ color: colors.primary }}>Expérience</h2>
                  <div className="space-y-4">
                    {cvData.experiences.map((exp) => (
                      <div key={exp.id}>
                        <h3 className="font-bold text-xs" style={{ color: colors.primary }}>{safeValue(exp.position)}</h3>
                        <p className="text-xs" style={{ color: colors.secondary }}>{safeValue(exp.company)}</p>
                        <p className="text-xs mt-1" style={{ color: colors.secondary }}>
                          {formatDate(exp.startDate)} - {exp.endDate && formatDate(exp.endDate) ? formatDate(exp.endDate) : 'Présent'}
                        </p>
                        {exp.description && <p className="text-xs mt-1" style={{ color: colors.text }}>{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              {cvData.education.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-sm uppercase tracking-widest font-bold mb-3" style={{ color: colors.primary }}>Formation</h2>
                  <div className="space-y-3">
                    {cvData.education.map((edu) => (
                      <div key={edu.id}>
                        <h3 className="font-bold text-xs" style={{ color: colors.primary }}>{safeValue(edu.degree)}</h3>
                        <p className="text-xs" style={{ color: colors.secondary }}>{safeValue(edu.school)}</p>
                        {edu.description && <p className="text-xs mt-1" style={{ color: colors.text }}>{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {cvData.skills.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-sm uppercase tracking-widest font-bold mb-3" style={{ color: colors.primary }}>Compétences</h2>
                  <div className="flex flex-wrap gap-1">
                    {cvData.skills.map((skill) => (
                      <span key={skill.id} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: colors.light, color: colors.text }}>
                        {safeValue(skill.name)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {(cvData.linkedin || cvData.github || cvData.twitter || cvData.portfolio) && (
            <div className="mt-6 pt-6 border-t" style={{ borderColor: colors.light }}>
              <div className="flex flex-wrap gap-4 text-xs">
                {cvData.linkedin && <a href={formatUrl(cvData.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" style={{ color: colors.accent }}><Linkedin className="w-3 h-3" />LinkedIn</a>}
                {cvData.github && <a href={formatUrl(cvData.github)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" style={{ color: colors.accent }}><Github className="w-3 h-3" />GitHub</a>}
                {cvData.twitter && <a href={formatUrl(cvData.twitter)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" style={{ color: colors.accent }}><Twitter className="w-3 h-3" />Twitter</a>}
                {cvData.portfolio && <a href={formatUrl(cvData.portfolio)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" style={{ color: colors.accent }}><Globe className="w-3 h-3" />Portfolio</a>}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

