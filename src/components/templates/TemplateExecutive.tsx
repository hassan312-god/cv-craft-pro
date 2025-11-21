import { Card } from "@/components/ui/card";
import { CVData } from "@/pages/CVCreate";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe } from "lucide-react";
import { getServiceName, formatUrl, safeValue, formatDate } from "@/lib/cvUtils";

export const TemplateExecutive = ({ cvData }: { cvData: CVData }) => {
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
        secondary: 'rgb(100, 116, 139)',
        text: 'rgb(51, 65, 85)',
        light: 'rgb(241, 245, 249)',
        accent: 'rgb(30, 41, 59)'
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
    return themes[theme as keyof typeof themes] || themes['elegant-dark'];
  };

  const colors = getThemeColors(cvData.theme || 'elegant-dark');

  return (
    <Card className="overflow-hidden border border-border">
      <div className="bg-white" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div className="p-8 border-b-4" style={{ borderColor: colors.accent }}>
          <h1 className="text-4xl font-bold mb-2" style={{ color: colors.primary }}>
            {safeValue(cvData.firstName)} {safeValue(cvData.lastName)}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm mt-3" style={{ color: colors.secondary }}>
            {cvData.email && <span>{safeValue(cvData.email)}</span>}
            {cvData.phone && <span>{safeValue(cvData.phone)}</span>}
            {cvData.address && <span>{safeValue(cvData.address)}</span>}
          </div>
        </div>

        <div className="p-8">
          {cvData.about && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-3" style={{ color: colors.primary }}>Profil</h2>
              <p className="text-sm leading-relaxed" style={{ color: colors.text }}>
                {cvData.about}
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              {cvData.experiences.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-bold mb-4" style={{ color: colors.primary }}>Expérience</h2>
                  <div className="space-y-5">
                    {cvData.experiences.map((exp) => (
                      <div key={exp.id}>
                        <h3 className="font-bold text-sm" style={{ color: colors.primary }}>
                          {safeValue(exp.position)}
                        </h3>
                        <p className="text-xs mb-1" style={{ color: colors.accent }}>
                          {safeValue(exp.company)}
                        </p>
                        <p className="text-xs mb-2" style={{ color: colors.secondary }}>
                          {formatDate(exp.startDate)} - {exp.endDate && formatDate(exp.endDate) ? formatDate(exp.endDate) : 'Présent'}
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

            <div>
              {cvData.education.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-bold mb-4" style={{ color: colors.primary }}>Formation</h2>
                  <div className="space-y-4">
                    {cvData.education.map((edu) => (
                      <div key={edu.id}>
                        <h3 className="font-bold text-sm" style={{ color: colors.primary }}>
                          {safeValue(edu.degree)}
                        </h3>
                        <p className="text-xs" style={{ color: colors.text }}>
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
                  <h2 className="text-lg font-bold mb-4" style={{ color: colors.primary }}>Compétences</h2>
                  <div className="space-y-2">
                    {cvData.skills.map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between text-xs mb-1">
                          <span style={{ color: colors.text }}>{safeValue(skill.name)}</span>
                          <span style={{ color: colors.secondary }}>{skill.level}%</span>
                        </div>
                        <div className="w-full h-1 rounded" style={{ backgroundColor: colors.light }}>
                          <div style={{ width: `${skill.level}%`, height: '100%', backgroundColor: colors.accent }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

