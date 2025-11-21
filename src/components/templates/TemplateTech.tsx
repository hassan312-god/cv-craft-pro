import { Card } from "@/components/ui/card";
import { CVData } from "@/pages/CVCreate";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe } from "lucide-react";
import { getServiceName, formatUrl, safeValue, formatDate } from "@/lib/cvUtils";

export const TemplateTech = ({ cvData }: { cvData: CVData }) => {
  const getThemeColors = (theme: string) => {
    const themes = {
      'minimalist-black': {
        primary: 'rgb(23, 23, 23)',
        secondary: 'rgb(64, 64, 64)',
        text: 'rgb(17, 24, 39)',
        light: 'rgb(245, 245, 245)',
        accent: 'rgb(23, 23, 23)',
        bg: 'rgb(17, 24, 39)',
        bgText: 'rgb(255, 255, 255)'
      },
      'elegant-dark': {
        primary: 'rgb(30, 41, 59)',
        secondary: 'rgb(51, 65, 85)',
        text: 'rgb(30, 41, 59)',
        light: 'rgb(248, 250, 252)',
        accent: 'rgb(100, 116, 139)',
        bg: 'rgb(30, 41, 59)',
        bgText: 'rgb(255, 255, 255)'
      },
      'professional-blue': {
        primary: 'rgb(37, 99, 235)',
        secondary: 'rgb(59, 130, 246)',
        text: 'rgb(30, 41, 59)',
        light: 'rgb(241, 245, 249)',
        accent: 'rgb(37, 99, 235)',
        bg: 'rgb(37, 99, 235)',
        bgText: 'rgb(255, 255, 255)'
      },
      'modern-gray': {
        primary: 'rgb(75, 85, 99)',
        secondary: 'rgb(107, 114, 128)',
        text: 'rgb(31, 41, 55)',
        light: 'rgb(249, 250, 251)',
        accent: 'rgb(75, 85, 99)',
        bg: 'rgb(75, 85, 99)',
        bgText: 'rgb(255, 255, 255)'
      },
      'creative-gradient': {
        primary: 'rgb(16, 185, 129)',
        secondary: 'rgb(5, 150, 105)',
        text: 'rgb(17, 24, 39)',
        light: 'rgb(236, 253, 245)',
        accent: 'rgb(16, 185, 129)',
        bg: 'rgb(17, 24, 39)',
        bgText: 'rgb(255, 255, 255)'
      },
      'ocean-blue': {
        primary: 'rgb(14, 165, 233)',
        secondary: 'rgb(6, 182, 212)',
        text: 'rgb(30, 41, 59)',
        light: 'rgb(224, 242, 254)',
        accent: 'rgb(14, 165, 233)',
        bg: 'rgb(14, 165, 233)',
        bgText: 'rgb(255, 255, 255)'
      },
      'forest-green': {
        primary: 'rgb(22, 163, 74)',
        secondary: 'rgb(16, 185, 129)',
        text: 'rgb(30, 41, 59)',
        light: 'rgb(220, 252, 231)',
        accent: 'rgb(22, 163, 74)',
        bg: 'rgb(22, 163, 74)',
        bgText: 'rgb(255, 255, 255)'
      },
      'sunset-orange': {
        primary: 'rgb(249, 115, 22)',
        secondary: 'rgb(239, 68, 68)',
        text: 'rgb(30, 41, 59)',
        light: 'rgb(255, 237, 213)',
        accent: 'rgb(249, 115, 22)',
        bg: 'rgb(249, 115, 22)',
        bgText: 'rgb(255, 255, 255)'
      },
      'royal-purple': {
        primary: 'rgb(147, 51, 234)',
        secondary: 'rgb(99, 102, 241)',
        text: 'rgb(30, 41, 59)',
        light: 'rgb(243, 232, 255)',
        accent: 'rgb(147, 51, 234)',
        bg: 'rgb(147, 51, 234)',
        bgText: 'rgb(255, 255, 255)'
      },
      'coral-pink': {
        primary: 'rgb(244, 63, 94)',
        secondary: 'rgb(251, 113, 133)',
        text: 'rgb(30, 41, 59)',
        light: 'rgb(255, 228, 230)',
        accent: 'rgb(244, 63, 94)',
        bg: 'rgb(244, 63, 94)',
        bgText: 'rgb(255, 255, 255)'
      },
      'midnight-blue': {
        primary: 'rgb(15, 23, 42)',
        secondary: 'rgb(30, 58, 138)',
        text: 'rgb(248, 250, 252)',
        light: 'rgb(241, 245, 249)',
        accent: 'rgb(59, 130, 246)',
        bg: 'rgb(15, 23, 42)',
        bgText: 'rgb(255, 255, 255)'
      },
      'emerald-green': {
        primary: 'rgb(16, 185, 129)',
        secondary: 'rgb(5, 150, 105)',
        text: 'rgb(30, 41, 59)',
        light: 'rgb(209, 250, 229)',
        accent: 'rgb(16, 185, 129)',
        bg: 'rgb(16, 185, 129)',
        bgText: 'rgb(255, 255, 255)'
      }
    };
    return themes[theme as keyof typeof themes] || themes['creative-gradient'];
  };

  const colors = getThemeColors(cvData.theme || 'creative-gradient');

  return (
    <Card className="overflow-hidden border border-border">
      <div className="bg-white" style={{ fontFamily: 'system-ui, -apple-system, monospace' }}>
        <div className="p-8 text-white" style={{ backgroundColor: colors.bg }}>
          <h1 className="text-4xl font-bold mb-2 font-mono">
            {safeValue(cvData.firstName)} {safeValue(cvData.lastName)}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm mt-3 text-green-400">
            {cvData.email && (
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {safeValue(cvData.email)}
              </span>
            )}
            {cvData.phone && (
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {safeValue(cvData.phone)}
              </span>
            )}
            {cvData.address && (
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {safeValue(cvData.address)}
              </span>
            )}
          </div>
        </div>

        <div className="p-8">
          {cvData.about && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-3 font-mono" style={{ color: colors.accent }}>
                &gt; À propos
              </h2>
              <p className="text-sm leading-relaxed font-mono" style={{ color: colors.text }}>
                {cvData.about}
              </p>
            </div>
          )}

          {cvData.experiences.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 font-mono" style={{ color: colors.accent }}>
                &gt; Expérience
              </h2>
              <div className="space-y-5">
                {cvData.experiences.map((exp) => (
                  <div key={exp.id} className="pl-4 border-l-2" style={{ borderColor: colors.accent }}>
                    <h3 className="font-bold text-base font-mono" style={{ color: colors.primary }}>
                      {safeValue(exp.position)}
                    </h3>
                    <p className="text-sm mb-1 font-mono" style={{ color: colors.accent }}>
                      {safeValue(exp.company)}
                    </p>
                    <p className="text-xs mb-2 font-mono" style={{ color: colors.secondary }}>
                      {formatDate(exp.startDate)} - {exp.endDate && formatDate(exp.endDate) ? formatDate(exp.endDate) : 'Présent'}
                    </p>
                    {exp.description && (
                      <p className="text-sm mt-2 font-mono" style={{ color: colors.text }}>
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
                <h2 className="text-lg font-bold mb-4 font-mono" style={{ color: colors.accent }}>
                  &gt; Formation
                </h2>
                <div className="space-y-4">
                  {cvData.education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-sm font-mono" style={{ color: colors.primary }}>
                        {safeValue(edu.degree)}
                      </h3>
                      <p className="text-sm font-mono" style={{ color: colors.text }}>
                        {safeValue(edu.school)}
                      </p>
                      <p className="text-xs mt-1 font-mono" style={{ color: colors.secondary }}>
                        {formatDate(edu.startDate) || 'Date de début'} - {formatDate(edu.endDate) || 'Date de fin'}
                      </p>
                      {edu.description && (
                        <p className="text-xs mt-2 font-mono leading-relaxed" style={{ color: colors.text }}>
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
                <h2 className="text-lg font-bold mb-4 font-mono" style={{ color: colors.accent }}>
                  &gt; Compétences
                </h2>
                <div className="space-y-3">
                  {cvData.skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between text-sm mb-1 font-mono">
                        <span style={{ color: colors.text }}>{safeValue(skill.name)}</span>
                        <span style={{ color: colors.secondary }}>{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 rounded" style={{ backgroundColor: colors.light }}>
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
    </Card>
  );
};

