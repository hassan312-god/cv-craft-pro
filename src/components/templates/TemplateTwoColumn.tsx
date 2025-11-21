import { Card } from "@/components/ui/card";
import { CVData } from "@/pages/CVCreate";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe } from "lucide-react";
import { formatDate } from "@/lib/cvUtils";

interface TemplateTwoColumnProps {
  cvData: CVData;
}

export const TemplateTwoColumn = ({ cvData }: TemplateTwoColumnProps) => {
  const getThemeColors = (theme: string) => {
    const themes = {
      'minimalist-black': {
        primary: 'rgb(23, 23, 23)',
        secondary: 'rgb(64, 64, 64)',
        text: 'rgb(23, 23, 23)',
        light: 'rgb(245, 245, 245)',
        accent: 'rgb(23, 23, 23)'
      },
      'elegant-dark': {
        primary: 'rgb(30, 41, 59)',
        secondary: 'rgb(51, 65, 85)',
        text: 'rgb(30, 41, 59)',
        light: 'rgb(248, 250, 252)',
        accent: 'rgb(100, 116, 139)'
      },
      'professional-blue': {
        primary: 'rgb(37, 99, 235)',
        secondary: 'rgb(59, 130, 246)',
        text: 'rgb(30, 41, 59)',
        light: 'rgb(241, 245, 249)',
        accent: 'rgb(37, 99, 235)'
      },
      'modern-gray': {
        primary: 'rgb(75, 85, 99)',
        secondary: 'rgb(107, 114, 128)',
        text: 'rgb(31, 41, 55)',
        light: 'rgb(249, 250, 251)',
        accent: 'rgb(75, 85, 99)'
      },
      'creative-gradient': {
        primary: 'rgb(168, 85, 247)',
        secondary: 'rgb(236, 72, 153)',
        text: 'rgb(30, 41, 59)',
        light: 'rgb(250, 245, 255)',
        accent: 'rgb(168, 85, 247)'
      }
    };
    return themes[theme as keyof typeof themes] || themes['minimalist-black'];
  };

  const colors = getThemeColors(cvData.theme);

  return (
    <Card className="overflow-hidden border border-border">
      <div className="bg-card p-8" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {/* Header */}
        <div className="mb-8 pb-6 border-b-2" style={{ borderColor: colors.accent }}>
          <h1 className="text-4xl font-bold mb-2" style={{ color: colors.primary }}>
            {cvData.firstName || 'Prénom'} {cvData.lastName || 'Nom'}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm" style={{ color: colors.text }}>
            {cvData.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" style={{ color: colors.accent }} />
                <span>{cvData.email}</span>
              </div>
            )}
            {cvData.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" style={{ color: colors.accent }} />
                <span>{cvData.phone}</span>
              </div>
            )}
            {cvData.address && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" style={{ color: colors.accent }} />
                <span>{cvData.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* About */}
            {cvData.about && (
              <div>
                <h2 
                  className="text-sm uppercase tracking-widest font-bold mb-3 pb-2 border-b" 
                  style={{ color: colors.primary, borderColor: colors.light }}
                >
                  À PROPOS
                </h2>
                <p style={{ color: colors.text }} className="text-sm leading-relaxed">
                  {cvData.about}
                </p>
              </div>
            )}

            {/* Experience */}
            {cvData.experiences.length > 0 && (
              <div>
                <h2 
                  className="text-sm uppercase tracking-widest font-bold mb-4 pb-2 border-b" 
                  style={{ color: colors.primary, borderColor: colors.light }}
                >
                  EXPÉRIENCE
                </h2>
                <div className="space-y-4">
                  {cvData.experiences.map((exp) => (
                    <div key={exp.id}>
                      <h3 className="font-bold text-sm" style={{ color: colors.primary }}>
                        {exp.position || 'Poste'}
                      </h3>
                      <p className="text-xs font-medium mb-1" style={{ color: colors.accent }}>
                        {exp.company || 'Entreprise'}
                      </p>
                      <p className="text-xs mb-2" style={{ color: colors.secondary }}>
                        {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Présent'}
                      </p>
                      {exp.description && (
                        <p className="text-xs leading-relaxed" style={{ color: colors.text }}>
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Education */}
            {cvData.education.length > 0 && (
              <div>
                <h2 
                  className="text-sm uppercase tracking-widest font-bold mb-4 pb-2 border-b" 
                  style={{ color: colors.primary, borderColor: colors.light }}
                >
                  FORMATION
                </h2>
                <div className="space-y-4">
                  {cvData.education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-sm" style={{ color: colors.primary }}>
                        {edu.degree || 'Diplôme'}
                      </h3>
                      <p className="text-xs font-medium mb-1" style={{ color: colors.accent }}>
                        {edu.school || 'École'}
                      </p>
                      <p className="text-xs mb-2" style={{ color: colors.secondary }}>
                        {formatDate(edu.startDate) || 'Date de début'} - {formatDate(edu.endDate) || 'Date de fin'}
                      </p>
                      {edu.description && (
                        <p className="text-xs leading-relaxed" style={{ color: colors.text }}>
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {cvData.skills.length > 0 && (
              <div>
                <h2 
                  className="text-sm uppercase tracking-widest font-bold mb-4 pb-2 border-b" 
                  style={{ color: colors.primary, borderColor: colors.light }}
                >
                  COMPÉTENCES
                </h2>
                <div className="space-y-3">
                  {cvData.skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm" style={{ color: colors.text }}>
                          {skill.name || 'Compétence'}
                        </span>
                        <span className="text-xs font-bold" style={{ color: colors.secondary }}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: colors.light }}>
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${skill.level}%`,
                            backgroundColor: colors.accent 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            {(cvData.linkedin || cvData.github || cvData.twitter || cvData.portfolio) && (
              <div>
                <h2 
                  className="text-sm uppercase tracking-widest font-bold mb-4 pb-2 border-b" 
                  style={{ color: colors.primary, borderColor: colors.light }}
                >
                  LIENS
                </h2>
                <div className="space-y-2 text-sm">
                  {cvData.linkedin && (
                    <div className="flex items-center gap-2" style={{ color: colors.text }}>
                      <Linkedin className="w-4 h-4" style={{ color: colors.accent }} />
                      <span>LinkedIn</span>
                    </div>
                  )}
                  {cvData.github && (
                    <div className="flex items-center gap-2" style={{ color: colors.text }}>
                      <Github className="w-4 h-4" style={{ color: colors.accent }} />
                      <span>GitHub</span>
                    </div>
                  )}
                  {cvData.twitter && (
                    <div className="flex items-center gap-2" style={{ color: colors.text }}>
                      <Twitter className="w-4 h-4" style={{ color: colors.accent }} />
                      <span>Twitter</span>
                    </div>
                  )}
                  {cvData.portfolio && (
                    <div className="flex items-center gap-2" style={{ color: colors.text }}>
                      <Globe className="w-4 h-4" style={{ color: colors.accent }} />
                      <span>Portfolio</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

