import { Card } from "@/components/ui/card";
import { CVData } from "@/pages/CVCreate";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe } from "lucide-react";
import { formatDate } from "@/lib/cvUtils";
import { getThemeColors, getThemeFont } from "@/lib/themeConfig";

interface TemplateModernProps {
  cvData: CVData;
}

export const TemplateModern = ({ cvData }: TemplateModernProps) => {
  const colors = getThemeColors(cvData.theme || 'minimalist-black');
  const fontFamily = getThemeFont(cvData.theme || 'minimalist-black');

  return (
    <Card className="overflow-hidden border border-border">
      <div className="bg-card" style={{ fontFamily }}>
        {/* Header with colored bar */}
        <div 
          className="h-2 w-full"
          style={{ backgroundColor: colors.accent }}
        />
        
        <div className="p-8">
          {/* Name and Contact */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              {cvData.firstName || 'Prénom'} {cvData.lastName || 'Nom'}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm">
              {cvData.email && (
                <div className="flex items-center gap-2" style={{ color: colors.text }}>
                  <Mail className="w-4 h-4" style={{ color: colors.accent }} />
                  <span>{cvData.email}</span>
                </div>
              )}
              {cvData.phone && (
                <div className="flex items-center gap-2" style={{ color: colors.text }}>
                  <Phone className="w-4 h-4" style={{ color: colors.accent }} />
                  <span>{cvData.phone}</span>
                </div>
              )}
              {cvData.address && (
                <div className="flex items-center gap-2" style={{ color: colors.text }}>
                  <MapPin className="w-4 h-4" style={{ color: colors.accent }} />
                  <span>{cvData.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* About */}
          {cvData.about && (
            <div className="mb-8">
              <h2 
                className="text-lg font-bold mb-3 pb-2 border-b-2" 
                style={{ color: colors.primary, borderColor: colors.accent }}
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
            <div className="mb-8">
              <h2 
                className="text-lg font-bold mb-4 pb-2 border-b-2" 
                style={{ color: colors.primary, borderColor: colors.accent }}
              >
                EXPÉRIENCE PROFESSIONNELLE
              </h2>
              <div className="space-y-6">
                {cvData.experiences.map((exp) => (
                  <div key={exp.id} className="relative pl-6 border-l-2" style={{ borderColor: colors.accent }}>
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full" style={{ backgroundColor: colors.accent }} />
                    <div className="mb-2">
                      <h3 className="font-bold text-base" style={{ color: colors.primary }}>
                        {exp.position || 'Poste'}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm font-medium" style={{ color: colors.accent }}>
                          {exp.company || 'Entreprise'}
                        </p>
                        <span className="text-xs" style={{ color: colors.secondary }}>•</span>
                        <span className="text-xs" style={{ color: colors.secondary }}>
                          {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Présent'}
                        </span>
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-sm mt-2 leading-relaxed" style={{ color: colors.text }}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {cvData.education.length > 0 && (
            <div className="mb-8">
              <h2 
                className="text-lg font-bold mb-4 pb-2 border-b-2" 
                style={{ color: colors.primary, borderColor: colors.accent }}
              >
                FORMATION
              </h2>
              <div className="space-y-6">
                {cvData.education.map((edu) => (
                  <div key={edu.id} className="relative pl-6 border-l-2" style={{ borderColor: colors.accent }}>
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full" style={{ backgroundColor: colors.accent }} />
                    <div className="mb-2">
                      <h3 className="font-bold text-base" style={{ color: colors.primary }}>
                        {edu.degree || 'Diplôme'}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm font-medium" style={{ color: colors.accent }}>
                          {edu.school || 'École'}
                        </p>
                        <span className="text-xs" style={{ color: colors.secondary }}>•</span>
                        <span className="text-xs" style={{ color: colors.secondary }}>
                          {formatDate(edu.startDate) || 'Date de début'} - {formatDate(edu.endDate) || 'Date de fin'}
                        </span>
                      </div>
                    </div>
                    {edu.description && (
                      <p className="text-sm mt-2 leading-relaxed" style={{ color: colors.text }}>
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills and Social in Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Skills */}
            {cvData.skills.length > 0 && (
              <div>
                <h2 
                  className="text-lg font-bold mb-4 pb-2 border-b-2" 
                  style={{ color: colors.primary, borderColor: colors.accent }}
                >
                  COMPÉTENCES
                </h2>
                <div className="space-y-3">
                  {cvData.skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium" style={{ color: colors.text }}>
                          {skill.name || 'Compétence'}
                        </span>
                        <span className="text-xs font-bold" style={{ color: colors.secondary }}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full" style={{ backgroundColor: colors.light }}>
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
                  className="text-lg font-bold mb-4 pb-2 border-b-2" 
                  style={{ color: colors.primary, borderColor: colors.accent }}
                >
                  LIENS
                </h2>
                <div className="space-y-3 text-sm">
                  {cvData.linkedin && (
                    <div className="flex items-center gap-2" style={{ color: colors.text }}>
                      <Linkedin className="w-5 h-5" style={{ color: colors.accent }} />
                      <span>LinkedIn</span>
                    </div>
                  )}
                  {cvData.github && (
                    <div className="flex items-center gap-2" style={{ color: colors.text }}>
                      <Github className="w-5 h-5" style={{ color: colors.accent }} />
                      <span>GitHub</span>
                    </div>
                  )}
                  {cvData.twitter && (
                    <div className="flex items-center gap-2" style={{ color: colors.text }}>
                      <Twitter className="w-5 h-5" style={{ color: colors.accent }} />
                      <span>Twitter</span>
                    </div>
                  )}
                  {cvData.portfolio && (
                    <div className="flex items-center gap-2" style={{ color: colors.text }}>
                      <Globe className="w-5 h-5" style={{ color: colors.accent }} />
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

