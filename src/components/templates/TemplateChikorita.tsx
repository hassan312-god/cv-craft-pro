import { Card } from "@/components/ui/card";
import { CVData } from "@/pages/CVCreate";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe } from "lucide-react";
import { getServiceName, formatUrl, safeValue, formatDate } from "@/lib/cvUtils";

interface TemplateChikoritaProps {
  cvData: CVData;
}

export const TemplateChikorita = ({ cvData }: TemplateChikoritaProps) => {
  const getThemeColors = (theme: string) => {
    const themes = {
      'minimalist-black': {
        primary: 'rgb(23, 23, 23)',
        secondary: 'rgb(64, 64, 64)',
        text: 'rgb(23, 23, 23)',
        light: 'rgb(245, 245, 245)',
        accent: 'rgb(23, 23, 23)',
        sidebar: 'rgb(34, 139, 34)',
        sidebarText: 'rgb(255, 255, 255)'
      },
      'elegant-dark': {
        primary: 'rgb(30, 41, 59)',
        secondary: 'rgb(51, 65, 85)',
        text: 'rgb(30, 41, 59)',
        light: 'rgb(248, 250, 252)',
        accent: 'rgb(100, 116, 139)',
        sidebar: 'rgb(30, 41, 59)',
        sidebarText: 'rgb(255, 255, 255)'
      },
      'professional-blue': {
        primary: 'rgb(37, 99, 235)',
        secondary: 'rgb(59, 130, 246)',
        text: 'rgb(30, 41, 59)',
        light: 'rgb(241, 245, 249)',
        accent: 'rgb(37, 99, 235)',
        sidebar: 'rgb(37, 99, 235)',
        sidebarText: 'rgb(255, 255, 255)'
      },
      'modern-gray': {
        primary: 'rgb(75, 85, 99)',
        secondary: 'rgb(107, 114, 128)',
        text: 'rgb(31, 41, 55)',
        light: 'rgb(249, 250, 251)',
        accent: 'rgb(75, 85, 99)',
        sidebar: 'rgb(75, 85, 99)',
        sidebarText: 'rgb(255, 255, 255)'
      },
      'creative-gradient': {
        primary: 'rgb(168, 85, 247)',
        secondary: 'rgb(236, 72, 153)',
        text: 'rgb(30, 41, 59)',
        light: 'rgb(250, 245, 255)',
        accent: 'rgb(168, 85, 247)',
        sidebar: 'linear-gradient(135deg, rgb(168, 85, 247) 0%, rgb(236, 72, 153) 100%)',
        sidebarText: 'rgb(255, 255, 255)'
      }
    };
    return themes[theme as keyof typeof themes] || themes['minimalist-black'];
  };

  const colors = getThemeColors(cvData.theme);

  // formatDate is imported from utils

  return (
    <Card className="overflow-hidden border border-border">
      <div className="flex" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {/* Main Content Area */}
        <div className="flex-1 p-8 bg-white">
          {/* Header with Photo */}
          <div className="mb-6 flex items-start gap-4">
            {cvData.photo && (
              <img 
                src={cvData.photo} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover flex-shrink-0"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>
                {safeValue(cvData.firstName) || 'Prénom'} {safeValue(cvData.lastName) || 'Nom'}
              </h1>
              <p className="text-base mb-2" style={{ color: colors.secondary }}>
                {cvData.about ? cvData.about.split('.')[0] : 'Développeur Web Créatif et Innovant'}
              </p>
              <div className="flex flex-wrap gap-3 text-xs" style={{ color: colors.text }}>
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
          </div>

          {/* Summary */}
          {cvData.about && (
            <div className="mb-6">
              <h2 
                className="text-sm font-bold mb-2 pb-1 border-b-2" 
                style={{ color: colors.primary, borderColor: colors.primary }}
              >
                RÉSUMÉ
              </h2>
              <p style={{ color: colors.text }} className="text-sm leading-relaxed">
                {cvData.about}
              </p>
            </div>
          )}

          {/* Experience */}
          {cvData.experiences.length > 0 && (
            <div className="mb-6">
              <h2 
                className="text-sm font-bold mb-4 pb-1 border-b-2" 
                style={{ color: colors.primary, borderColor: colors.primary }}
              >
                EXPÉRIENCE
              </h2>
              <div className="space-y-5">
                {cvData.experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-base" style={{ color: colors.primary }}>
                          {safeValue(exp.position) || 'Poste'}
                        </h3>
                        <p className="text-sm font-medium" style={{ color: colors.accent }}>
                          {safeValue(exp.company) || 'Entreprise'}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-medium block" style={{ color: colors.secondary }}>
                          {formatDate(exp.startDate) || 'Date de début'} - {exp.endDate && formatDate(exp.endDate) ? formatDate(exp.endDate) : 'Présent'}
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

          {/* Education */}
          {cvData.education.length > 0 && (
            <div className="mb-6">
              <h2 
                className="text-sm font-bold mb-4 pb-1 border-b-2" 
                style={{ color: colors.primary, borderColor: colors.primary }}
              >
                FORMATION
              </h2>
              <div className="space-y-4">
                {cvData.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-sm" style={{ color: colors.primary }}>
                      {safeValue(edu.degree) || 'Diplôme'}
                    </h3>
                    <p className="text-sm" style={{ color: colors.text }}>
                      {safeValue(edu.school) || 'École'}
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
            </div>
          )}
        </div>

        {/* Sidebar - Colored */}
        <div 
          className="w-64 p-6 text-white"
          style={{ 
            background: colors.sidebar,
            color: colors.sidebarText
          }}
        >
          {/* Skills */}
          {cvData.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold mb-3 text-white">COMPÉTENCES</h2>
              <div className="space-y-3">
                {cvData.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-white/90">{skill.name || 'Compétence'}</span>
                      <span className="text-xs text-white/70">
                        {skill.level >= 80 ? 'Avancé' : skill.level >= 50 ? 'Intermédiaire' : 'Débutant'}
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/20">
                      <div 
                        className="h-full rounded-full bg-white" 
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          {(cvData.linkedin || cvData.github || cvData.twitter || cvData.portfolio) && (
            <div className="mb-6">
              <h2 className="text-sm font-bold mb-3 text-white">RÉSEAUX</h2>
              <div className="space-y-2 text-xs">
                {cvData.linkedin && (
                  <a 
                    href={formatUrl(cvData.linkedin)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>{getServiceName(cvData.linkedin)}</span>
                  </a>
                )}
                {cvData.github && (
                  <a 
                    href={formatUrl(cvData.github)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>{getServiceName(cvData.github)}</span>
                  </a>
                )}
                {cvData.twitter && (
                  <a 
                    href={formatUrl(cvData.twitter)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                    <span>{getServiceName(cvData.twitter)}</span>
                  </a>
                )}
                {cvData.portfolio && (
                  <a 
                    href={formatUrl(cvData.portfolio)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    <span>{getServiceName(cvData.portfolio)}</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

