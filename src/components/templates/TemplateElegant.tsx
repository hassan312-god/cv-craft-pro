import { Card } from "@/components/ui/card";
import { CVData } from "@/pages/CVCreate";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe } from "lucide-react";
import { getServiceName, formatUrl, safeValue, formatDate } from "@/lib/cvUtils";

export const TemplateElegant = ({ cvData }: { cvData: CVData }) => {
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
    return themes[theme as keyof typeof themes] || themes['modern-gray'];
  };

  const colors = getThemeColors(cvData.theme || 'modern-gray');

  return (
    <Card className="overflow-hidden border border-border">
      <div className="bg-white p-10" style={{ fontFamily: 'Georgia, serif' }}>
        <div className="text-center mb-10">
          <h1 className="text-5xl font-serif mb-3 tracking-wide" style={{ color: colors.primary }}>
            {safeValue(cvData.firstName)} {safeValue(cvData.lastName)}
          </h1>
          <div className="h-px w-32 mx-auto mb-4" style={{ backgroundColor: colors.accent }} />
          <div className="flex flex-wrap justify-center gap-4 text-sm" style={{ color: colors.secondary }}>
            {cvData.email && <span>{safeValue(cvData.email)}</span>}
            {cvData.phone && <span>{safeValue(cvData.phone)}</span>}
            {cvData.address && <span>{safeValue(cvData.address)}</span>}
          </div>
        </div>

        {cvData.about && (
          <div className="mb-10 text-center">
            <p className="text-sm leading-relaxed italic max-w-2xl mx-auto" style={{ color: colors.text }}>
              {cvData.about}
            </p>
          </div>
        )}

        {cvData.experiences.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-serif mb-6 text-center" style={{ color: colors.primary }}>
              Expérience
            </h2>
            <div className="space-y-8">
              {cvData.experiences.map((exp) => (
                <div key={exp.id} className="text-center">
                  <h3 className="text-lg font-serif mb-1" style={{ color: colors.primary }}>
                    {safeValue(exp.position)}
                  </h3>
                  <p className="text-sm mb-2" style={{ color: colors.accent }}>
                    {safeValue(exp.company)}
                  </p>
                  <p className="text-xs mb-3" style={{ color: colors.secondary }}>
                    {formatDate(exp.startDate)} - {exp.endDate && formatDate(exp.endDate) ? formatDate(exp.endDate) : 'Présent'}
                  </p>
                  {exp.description && (
                    <p className="text-sm leading-relaxed max-w-xl mx-auto" style={{ color: colors.text }}>
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-10">
          {cvData.education.length > 0 && (
            <div>
              <h2 className="text-xl font-serif mb-4 text-center" style={{ color: colors.primary }}>
                Formation
              </h2>
              <div className="space-y-4">
                {cvData.education.map((edu) => (
                  <div key={edu.id} className="text-center">
                    <h3 className="font-serif text-sm" style={{ color: colors.primary }}>
                      {safeValue(edu.degree)}
                    </h3>
                    <p className="text-sm" style={{ color: colors.text }}>
                      {safeValue(edu.school)}
                    </p>
                    <p className="text-xs mt-1" style={{ color: colors.secondary }}>
                      {formatDate(edu.startDate) || 'Date de début'} - {formatDate(edu.endDate) || 'Date de fin'}
                    </p>
                    {edu.description && (
                      <p className="text-xs mt-2 leading-relaxed max-w-md mx-auto" style={{ color: colors.text }}>
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
              <h2 className="text-xl font-serif mb-4 text-center" style={{ color: colors.primary }}>
                Compétences
              </h2>
              <div className="space-y-2">
                {cvData.skills.map((skill) => (
                  <div key={skill.id} className="text-center">
                    <p className="text-sm mb-1" style={{ color: colors.text }}>
                      {safeValue(skill.name)} - {skill.level}%
                    </p>
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

