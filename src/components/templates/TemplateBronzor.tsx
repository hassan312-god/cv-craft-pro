import { Card } from "@/components/ui/card";
import { CVData } from "@/pages/CVCreate";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe } from "lucide-react";
import { formatDate } from "@/lib/cvUtils";

interface TemplateBronzorProps {
  cvData: CVData;
}

export const TemplateBronzor = ({ cvData }: TemplateBronzorProps) => {
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
      <div className="bg-white p-8" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {/* Header Left-Aligned */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>
            {cvData.firstName || 'Prénom'} {cvData.lastName || 'Nom'}
          </h1>
          <p className="text-base mb-3" style={{ color: colors.secondary }}>
            {cvData.about ? cvData.about.split('.')[0] : 'Développeur Web Créatif et Innovant'}
          </p>
          <div className="flex flex-wrap gap-4 text-sm" style={{ color: colors.text }}>
            {cvData.address && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{cvData.address}</span>
              </div>
            )}
            {cvData.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span>{cvData.phone}</span>
              </div>
            )}
            {cvData.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                <span>{cvData.email}</span>
              </div>
            )}
            {cvData.portfolio && (
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <span>{cvData.portfolio}</span>
              </div>
            )}
          </div>
        </div>

        {/* Two Column Layout - Distinct Separation */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Narrow */}
          <div className="space-y-6">
            {/* Profiles */}
            {(cvData.linkedin || cvData.github || cvData.twitter) && (
              <div>
                <h2 className="text-sm font-bold mb-3" style={{ color: colors.primary }}>
                  PROFILS
                </h2>
                <div className="space-y-2 text-sm">
                  {cvData.linkedin && (
                    <div className="flex items-center gap-2" style={{ color: colors.text }}>
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </div>
                  )}
                  {cvData.github && (
                    <div className="flex items-center gap-2" style={{ color: colors.text }}>
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </div>
                  )}
                  {cvData.twitter && (
                    <div className="flex items-center gap-2" style={{ color: colors.text }}>
                      <Twitter className="w-4 h-4" />
                      <span>Twitter</span>
                    </div>
                  )}
                </div>
                <div className="mt-4 border-t" style={{ borderColor: colors.light }} />
              </div>
            )}

            {/* Summary */}
            {cvData.about && (
              <div>
                <h2 className="text-sm font-bold mb-3" style={{ color: colors.primary }}>
                  RÉSUMÉ
                </h2>
                <p style={{ color: colors.text }} className="text-xs leading-relaxed">
                  {cvData.about}
                </p>
                <div className="mt-4 border-t" style={{ borderColor: colors.light }} />
              </div>
            )}

            {/* Education */}
            {cvData.education.length > 0 && (
              <div>
                <h2 className="text-sm font-bold mb-3" style={{ color: colors.primary }}>
                  FORMATION
                </h2>
                <div className="space-y-3">
                  {cvData.education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-xs" style={{ color: colors.primary }}>
                        {edu.degree || 'Diplôme'}
                      </h3>
                      <p className="text-xs" style={{ color: colors.text }}>
                        {edu.school || 'École'}
                      </p>
                      <p className="text-xs mt-1" style={{ color: colors.secondary }}>
                        {formatDate(edu.startDate) || 'Date de début'} - {formatDate(edu.endDate) || 'Date de fin'}
                      </p>
                      {edu.description && (
                        <p className="text-xs mt-2 leading-relaxed" style={{ color: colors.text }}>
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 border-t" style={{ borderColor: colors.light }} />
              </div>
            )}

            {/* Skills */}
            {cvData.skills.length > 0 && (
              <div>
                <h2 className="text-sm font-bold mb-3" style={{ color: colors.primary }}>
                  COMPÉTENCES
                </h2>
                <div className="space-y-2">
                  {cvData.skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs" style={{ color: colors.text }}>
                          {skill.name || 'Compétence'}
                        </span>
                        <span className="text-xs" style={{ color: colors.secondary }}>
                          {skill.level >= 80 ? 'Avancé' : skill.level >= 50 ? 'Intermédiaire' : 'Débutant'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 border-t" style={{ borderColor: colors.light }} />
              </div>
            )}
          </div>

          {/* Right Column - Wide, Experience Only */}
          <div className="col-span-2">
            {cvData.experiences.length > 0 && (
              <div>
                <h2 className="text-sm font-bold mb-4" style={{ color: colors.primary }}>
                  EXPÉRIENCE
                </h2>
                <div className="space-y-5">
                  {cvData.experiences.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="font-bold text-base" style={{ color: colors.primary }}>
                            {exp.position || 'Poste'}
                          </h3>
                          <p className="text-sm font-medium" style={{ color: colors.accent }}>
                            {exp.company || 'Entreprise'}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-medium block" style={{ color: colors.secondary }}>
                            {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Présent'}
                          </span>
                        </div>
                      </div>
                      {exp.description && (
                        <ul className="text-sm mt-2 space-y-1" style={{ color: colors.text }}>
                          {exp.description.split('.').filter(Boolean).map((point, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="mr-2" style={{ color: colors.accent }}>•</span>
                              <span>{point.trim()}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

