import { Card } from "@/components/ui/card";
import { CVData } from "@/pages/CVCreate";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe } from "lucide-react";
import { formatDate } from "@/lib/cvUtils";

interface TemplateSidebarProps {
  cvData: CVData;
}

export const TemplateSidebar = ({ cvData }: TemplateSidebarProps) => {
  const getThemeColors = (theme: string) => {
    const themes = {
      'minimalist-black': {
        primary: 'rgb(23, 23, 23)',
        secondary: 'rgb(64, 64, 64)',
        text: 'rgb(23, 23, 23)',
        light: 'rgb(245, 245, 245)',
        accent: 'rgb(23, 23, 23)',
        sidebar: 'rgb(23, 23, 23)',
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

  return (
    <Card className="overflow-hidden border border-border">
      <div className="flex" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {/* Sidebar */}
        <div 
          className="w-64 p-6 text-white"
          style={{ 
            background: colors.sidebar,
            color: colors.sidebarText
          }}
        >
          {/* Name */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">
              {cvData.firstName || 'Prénom'} {cvData.lastName || 'Nom'}
            </h1>
            <div className="h-0.5 w-16 bg-white/30 mb-4" />
          </div>

          {/* Contact Info */}
          <div className="space-y-3 mb-6 text-sm">
            {cvData.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="text-white/90">{cvData.email}</span>
              </div>
            )}
            {cvData.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="text-white/90">{cvData.phone}</span>
              </div>
            )}
            {cvData.address && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-white/90">{cvData.address}</span>
              </div>
            )}
          </div>

          {/* Social Links */}
          {(cvData.linkedin || cvData.github || cvData.twitter || cvData.portfolio) && (
            <div className="mb-6">
              <h3 className="text-sm uppercase tracking-widest font-bold mb-3">Réseaux</h3>
              <div className="space-y-2 text-sm">
                {cvData.linkedin && (
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    <span className="text-white/90">LinkedIn</span>
                  </div>
                )}
                {cvData.github && (
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    <span className="text-white/90">GitHub</span>
                  </div>
                )}
                {cvData.twitter && (
                  <div className="flex items-center gap-2">
                    <Twitter className="w-4 h-4" />
                    <span className="text-white/90">Twitter</span>
                  </div>
                )}
                {cvData.portfolio && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span className="text-white/90">Portfolio</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Skills */}
          {cvData.skills.length > 0 && (
            <div>
              <h3 className="text-sm uppercase tracking-widest font-bold mb-3">Compétences</h3>
              <div className="space-y-3">
                {cvData.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-white/90">{skill.name || 'Compétence'}</span>
                      <span className="text-xs text-white/70">{skill.level}%</span>
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
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 bg-white">
          {/* About */}
          {cvData.about && (
            <div className="mb-8">
              <h2 
                className="text-lg uppercase tracking-widest font-bold mb-3" 
                style={{ color: colors.primary }}
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
                className="text-lg uppercase tracking-widest font-bold mb-4" 
                style={{ color: colors.primary }}
              >
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
                      <span className="text-xs font-medium" style={{ color: colors.secondary }}>
                        {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Présent'}
                      </span>
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
            <div>
              <h2 
                className="text-lg uppercase tracking-widest font-bold mb-4" 
                style={{ color: colors.primary }}
              >
                FORMATION
              </h2>
              <div className="space-y-5">
                {cvData.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-base" style={{ color: colors.primary }}>
                          {edu.degree || 'Diplôme'}
                        </h3>
                        <p className="text-sm font-medium" style={{ color: colors.accent }}>
                          {edu.school || 'École'}
                        </p>
                      </div>
                      <span className="text-xs font-medium" style={{ color: colors.secondary }}>
                        {formatDate(edu.startDate) || 'Date de début'} - {formatDate(edu.endDate) || 'Date de fin'}
                      </span>
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
        </div>
      </div>
    </Card>
  );
};

