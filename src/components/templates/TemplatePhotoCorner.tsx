import { Card } from "@/components/ui/card";
import { CVData } from "@/pages/CVCreate";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe } from "lucide-react";
import { getServiceName, formatUrl, safeValue, formatDate } from "@/lib/cvUtils";

export const TemplatePhotoCorner = ({ cvData }: { cvData: CVData }) => {
  const getThemeColors = (theme: string) => {
    const themes = {
      'minimalist-black': {
        primary: 'rgb(23, 23, 23)',
        secondary: 'rgb(64, 64, 64)',
        text: 'rgb(17, 24, 39)',
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
        primary: 'rgb(220, 38, 38)',
        secondary: 'rgb(185, 28, 28)',
        text: 'rgb(17, 24, 39)',
        light: 'rgb(254, 242, 242)',
        accent: 'rgb(220, 38, 38)'
      }
    };
    return themes[theme as keyof typeof themes] || themes['creative-gradient'];
  };

  const colors = getThemeColors(cvData.theme || 'creative-gradient');

  return (
    <Card className="overflow-hidden border-2 border-border" style={{ borderColor: colors.accent }}>
      <div className="bg-white relative" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {/* Photo in top right corner */}
        {cvData.photo && (
          <div className="absolute top-4 right-4 z-10">
            <img 
              src={cvData.photo} 
              alt="Profile" 
              className="w-32 h-32 rounded-lg object-cover border-4 shadow-xl"
              style={{ borderColor: colors.accent }}
            />
          </div>
        )}

        <div className="p-8 pr-48">
          <h1 className="text-4xl font-bold mb-2" style={{ color: colors.primary }}>
            {safeValue(cvData.firstName)} {safeValue(cvData.lastName)}
          </h1>
          <div className="h-1 w-24 mb-4" style={{ backgroundColor: colors.accent }} />
          <div className="flex flex-wrap gap-4 text-sm mb-6" style={{ color: colors.text }}>
            {cvData.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" style={{ color: colors.accent }} />
                <span>{safeValue(cvData.email)}</span>
              </div>
            )}
            {cvData.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" style={{ color: colors.accent }} />
                <span>{safeValue(cvData.phone)}</span>
              </div>
            )}
            {cvData.address && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" style={{ color: colors.accent }} />
                <span>{safeValue(cvData.address)}</span>
              </div>
            )}
          </div>

          {cvData.about && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-3" style={{ color: colors.primary }}>
                À propos
              </h2>
              <p style={{ color: colors.text }} className="text-sm leading-relaxed">
                {cvData.about}
              </p>
            </div>
          )}

          {cvData.experiences.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4" style={{ color: colors.primary }}>
                Expérience
              </h2>
              <div className="space-y-5">
                {cvData.experiences.map((exp) => (
                  <div key={exp.id} className="border-l-4 pl-4" style={{ borderColor: colors.accent }}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-base" style={{ color: colors.primary }}>
                          {safeValue(exp.position)}
                        </h3>
                        <p className="text-sm font-medium" style={{ color: colors.accent }}>
                          {safeValue(exp.company)}
                        </p>
                      </div>
                      <span className="text-xs font-medium" style={{ color: colors.secondary }}>
                        {formatDate(exp.startDate)} - {exp.endDate && formatDate(exp.endDate) ? formatDate(exp.endDate) : 'Présent'}
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

          <div className="grid md:grid-cols-2 gap-8">
            {cvData.education.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-4" style={{ color: colors.primary }}>
                  Formation
                </h2>
                <div className="space-y-4">
                  {cvData.education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-sm" style={{ color: colors.primary }}>
                        {safeValue(edu.degree)}
                      </h3>
                      <p className="text-sm" style={{ color: colors.text }}>
                        {safeValue(edu.school)}
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

            {cvData.skills.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-4" style={{ color: colors.primary }}>
                  Compétences
                </h2>
                <div className="space-y-3">
                  {cvData.skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span style={{ color: colors.text }}>{safeValue(skill.name)}</span>
                        <span style={{ color: colors.secondary }}>{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full" style={{ backgroundColor: colors.light }}>
                        <div style={{ width: `${skill.level}%`, height: '100%', backgroundColor: colors.accent, borderRadius: '9999px' }} />
                      </div>
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

