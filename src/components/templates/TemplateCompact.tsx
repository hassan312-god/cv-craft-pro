import { Card } from "@/components/ui/card";
import { CVData } from "@/pages/CVCreate";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe } from "lucide-react";
import { getServiceName, formatUrl, safeValue, formatDate } from "@/lib/cvUtils";
import { getThemeColors, getThemeFont } from "@/lib/themeConfig";

export const TemplateCompact = ({ cvData }: { cvData: CVData }) => {
  const colors = getThemeColors(cvData.theme || 'minimalist-black');
  const fontFamily = getThemeFont(cvData.theme || 'minimalist-black');

  return (
    <Card className="overflow-hidden border-0 shadow-none" style={{ width: '794px' }}>
      <div className="bg-white p-8" style={{ fontFamily }}>
        {/* Header compact */}
        <div className="mb-6 pb-4 border-b-2" style={{ borderColor: colors.primary }}>
          <h1 className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>
            {safeValue(cvData.firstName)} {safeValue(cvData.lastName)}
          </h1>
          <div className="flex flex-wrap gap-3 text-xs mt-2" style={{ color: colors.secondary }}>
            {cvData.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {safeValue(cvData.email)}
              </span>
            )}
            {cvData.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {safeValue(cvData.phone)}
              </span>
            )}
            {cvData.address && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {safeValue(cvData.address)}
              </span>
            )}
          </div>
        </div>

        {/* About compact */}
        {cvData.about && (
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase mb-2" style={{ color: colors.primary }}>
              Profil
            </h2>
            <p className="text-xs leading-relaxed" style={{ color: colors.text }}>
              {cvData.about}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          {/* Colonne gauche */}
          <div>
            {/* Expériences */}
            {cvData.experiences.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase mb-3" style={{ color: colors.primary }}>
                  Expérience
                </h2>
                <div className="space-y-4">
                  {cvData.experiences.map((exp) => (
                    <div key={exp.id}>
                      <h3 className="font-bold text-xs" style={{ color: colors.primary }}>
                        {safeValue(exp.position)}
                      </h3>
                      <p className="text-xs" style={{ color: colors.accent }}>
                        {safeValue(exp.company)}
                      </p>
                      <p className="text-xs mt-1" style={{ color: colors.secondary }}>
                        {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Présent'}
                      </p>
                      {exp.description && (
                        <p className="text-xs mt-1 leading-relaxed" style={{ color: colors.text }}>
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
                <h2 className="text-sm font-bold uppercase mb-3" style={{ color: colors.primary }}>
                  Formation
                </h2>
                <div className="space-y-3">
                  {cvData.education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-xs" style={{ color: colors.primary }}>
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
              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase mb-3" style={{ color: colors.primary }}>
                  Compétences
                </h2>
                <div className="space-y-2">
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
                      <div className="w-full h-1 rounded-full" style={{ backgroundColor: colors.light }}>
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
          </div>
        </div>
      </div>
    </Card>
  );
};

