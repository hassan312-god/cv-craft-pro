import { Card } from "@/components/ui/card";
import { CVData } from "@/pages/CVCreate";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe } from "lucide-react";
import { getServiceName, formatUrl, safeValue, formatDate } from "@/lib/cvUtils";

export const TemplateMinimal = ({ cvData }: { cvData: CVData }) => {
  const getThemeColors = (theme: string) => {
    const themes = {
      'minimalist-black': {
        primary: 'rgb(23, 23, 23)',
        secondary: 'rgb(100, 100, 100)',
        text: 'rgb(50, 50, 50)',
        light: 'rgb(240, 240, 240)',
        accent: 'rgb(23, 23, 23)'
      },
      'elegant-dark': {
        primary: 'rgb(30, 41, 59)',
        secondary: 'rgb(100, 116, 139)',
        text: 'rgb(51, 65, 85)',
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

  const colors = getThemeColors(cvData.theme || 'minimalist-black');

  return (
    <Card className="overflow-hidden border-0 shadow-none" style={{ width: '794px', minHeight: '1123px' }}>
      <div className="bg-white p-10" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '1123px' }}>
        <div className="mb-8">
          <h1 className="text-5xl font-light mb-2 tracking-tight" style={{ color: colors.primary }}>
            {safeValue(cvData.firstName)} {safeValue(cvData.lastName)}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm mt-4" style={{ color: colors.secondary }}>
            {cvData.email && <span>{safeValue(cvData.email)}</span>}
            {cvData.phone && <span>{safeValue(cvData.phone)}</span>}
            {cvData.address && <span>{safeValue(cvData.address)}</span>}
          </div>
        </div>

        {cvData.about && (
          <div className="mb-8">
            <p className="text-sm leading-relaxed" style={{ color: colors.text }}>
              {cvData.about}
            </p>
          </div>
        )}

        {cvData.experiences.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs uppercase tracking-widest font-normal mb-4" style={{ color: colors.secondary }}>
              Expérience
            </h2>
            <div className="space-y-6">
              {cvData.experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between mb-1">
                    <div>
                      <h3 className="font-normal text-base" style={{ color: colors.primary }}>
                        {safeValue(exp.position)}
                      </h3>
                      <p className="text-sm" style={{ color: colors.secondary }}>
                        {safeValue(exp.company)}
                      </p>
                    </div>
                    <span className="text-xs" style={{ color: colors.secondary }}>
                      {formatDate(exp.startDate)} - {exp.endDate && formatDate(exp.endDate) ? formatDate(exp.endDate) : 'Présent'}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm mt-2" style={{ color: colors.text }}>
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {cvData.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs uppercase tracking-widest font-normal mb-4" style={{ color: colors.secondary }}>
              Formation
            </h2>
            <div className="space-y-4">
              {cvData.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-normal text-sm" style={{ color: colors.primary }}>
                    {safeValue(edu.degree)}
                  </h3>
                  <p className="text-sm" style={{ color: colors.secondary }}>
                    {safeValue(edu.school)}
                  </p>
                  <p className="text-xs mt-1" style={{ color: colors.secondary }}>
                    {formatDate(edu.startDate) || 'Date de début'} - {formatDate(edu.endDate) || 'Date de fin'}
                  </p>
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

        {cvData.skills.length > 0 && (
          <div>
            <h2 className="text-xs uppercase tracking-widest font-normal mb-4" style={{ color: colors.secondary }}>
              Compétences
            </h2>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.map((skill) => (
                <span key={skill.id} className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: colors.light, color: colors.text }}>
                  {safeValue(skill.name)}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

