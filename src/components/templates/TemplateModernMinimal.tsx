import { Card } from "@/components/ui/card";
import { CVData } from "@/pages/CVCreate";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe } from "lucide-react";
import { getServiceName, formatUrl, safeValue, formatDate } from "@/lib/cvUtils";
import { getThemeColors, getThemeFont } from "@/lib/themeConfig";

export const TemplateModernMinimal = ({ cvData }: { cvData: CVData }) => {
  const colors = getThemeColors(cvData.theme || 'minimalist-black');
  const fontFamily = getThemeFont(cvData.theme || 'minimalist-black');

  return (
    <Card className="overflow-hidden border-0 shadow-none" style={{ width: '794px' }}>
      <div className="bg-white p-12" style={{ fontFamily }}>
        {/* Header avec ligne décorative */}
        <div className="mb-10">
          <div className="h-1 w-24 mb-6" style={{ backgroundColor: colors.primary }}></div>
          <h1 className="text-5xl font-light mb-3 tracking-tight" style={{ color: colors.primary }}>
            {safeValue(cvData.firstName)} {safeValue(cvData.lastName)}
          </h1>
          <div className="flex flex-wrap gap-3 text-sm mt-4" style={{ color: colors.secondary }}>
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

        {/* About */}
        {cvData.about && (
          <div className="mb-10">
            <h2 className="text-sm uppercase tracking-widest font-normal mb-3" style={{ color: colors.primary }}>
              À Propos
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: colors.text }}>
              {cvData.about}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-10">
          {/* Colonne gauche */}
          <div>
            {/* Expériences */}
            {cvData.experiences.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm uppercase tracking-widest font-normal mb-4" style={{ color: colors.primary }}>
                  Expérience
                </h2>
                <div className="space-y-6">
                  {cvData.experiences.map((exp) => (
                    <div key={exp.id}>
                      <h3 className="font-bold text-sm mb-1" style={{ color: colors.primary }}>
                        {safeValue(exp.position)}
                      </h3>
                      <p className="text-xs mb-1" style={{ color: colors.accent }}>
                        {safeValue(exp.company)}
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

            {/* Formation */}
            {cvData.education.length > 0 && (
              <div>
                <h2 className="text-sm uppercase tracking-widest font-normal mb-4" style={{ color: colors.primary }}>
                  Formation
                </h2>
                <div className="space-y-4">
                  {cvData.education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-sm" style={{ color: colors.primary }}>
                        {safeValue(edu.degree)}
                      </h3>
                      <p className="text-xs" style={{ color: colors.accent }}>
                        {safeValue(edu.school)}
                      </p>
                      <p className="text-xs mt-1" style={{ color: colors.secondary }}>
                        {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Présent'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Colonne droite */}
          <div>
            {/* Compétences */}
            {cvData.skills.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm uppercase tracking-widest font-normal mb-4" style={{ color: colors.primary }}>
                  Compétences
                </h2>
                <div className="space-y-3">
                  {cvData.skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium" style={{ color: colors.text }}>
                          {safeValue(skill.name)}
                        </span>
                        <span className="text-xs" style={{ color: colors.secondary }}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: colors.light }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${skill.level}%`,
                            backgroundColor: colors.primary
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Liens sociaux */}
            {(cvData.linkedin || cvData.github || cvData.portfolio) && (
              <div>
                <h2 className="text-sm uppercase tracking-widest font-normal mb-4" style={{ color: colors.primary }}>
                  Liens
                </h2>
                <div className="space-y-2 text-xs">
                  {cvData.linkedin && (
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-3 h-3" style={{ color: colors.accent }} />
                      <span style={{ color: colors.text }}>{formatUrl(cvData.linkedin)}</span>
                    </div>
                  )}
                  {cvData.github && (
                    <div className="flex items-center gap-2">
                      <Github className="w-3 h-3" style={{ color: colors.accent }} />
                      <span style={{ color: colors.text }}>{formatUrl(cvData.github)}</span>
                    </div>
                  )}
                  {cvData.portfolio && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-3 h-3" style={{ color: colors.accent }} />
                      <span style={{ color: colors.text }}>{formatUrl(cvData.portfolio)}</span>
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

