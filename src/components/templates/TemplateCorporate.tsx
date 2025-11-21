import { Card } from "@/components/ui/card";
import { CVData } from "@/pages/CVCreate";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe } from "lucide-react";
import { getServiceName, formatUrl, safeValue, formatDate } from "@/lib/cvUtils";
import { getThemeColors, getThemeFont } from "@/lib/themeConfig";

export const TemplateCorporate = ({ cvData }: { cvData: CVData }) => {
  const colors = getThemeColors(cvData.theme || 'minimalist-black');
  const fontFamily = getThemeFont(cvData.theme || 'minimalist-black');

  return (
    <Card className="overflow-hidden border-0 shadow-none" style={{ width: '794px' }}>
      <div className="bg-white" style={{ fontFamily }}>
        {/* Header avec barre colorée */}
        <div className="h-3" style={{ backgroundColor: colors.primary }}></div>
        
        <div className="p-10">
          {/* Nom et titre */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2" style={{ color: colors.primary }}>
              {safeValue(cvData.firstName)} {safeValue(cvData.lastName)}
            </h1>
            {cvData.experiences.length > 0 && (
              <p className="text-lg font-medium" style={{ color: colors.secondary }}>
                {cvData.experiences[0].position}
              </p>
            )}
          </div>

          {/* Contact */}
          <div className="grid grid-cols-2 gap-4 mb-8 text-sm" style={{ color: colors.text }}>
            {cvData.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" style={{ color: colors.accent }} />
                {safeValue(cvData.email)}
              </div>
            )}
            {cvData.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" style={{ color: colors.accent }} />
                {safeValue(cvData.phone)}
              </div>
            )}
            {cvData.address && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" style={{ color: colors.accent }} />
                {safeValue(cvData.address)}
              </div>
            )}
            {cvData.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4" style={{ color: colors.accent }} />
                {formatUrl(cvData.linkedin)}
              </div>
            )}
          </div>

          {/* About */}
          {cvData.about && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: colors.primary }}>
                À Propos
              </h2>
              <div className="h-0.5 w-20 mb-3" style={{ backgroundColor: colors.primary }}></div>
              <p className="text-sm leading-relaxed" style={{ color: colors.text }}>
                {cvData.about}
              </p>
            </div>
          )}

          {/* Expériences */}
          {cvData.experiences.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: colors.primary }}>
                Expérience Professionnelle
              </h2>
              <div className="h-0.5 w-20 mb-3" style={{ backgroundColor: colors.primary }}></div>
              <div className="space-y-6">
                {cvData.experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-base" style={{ color: colors.primary }}>
                          {safeValue(exp.position)}
                        </h3>
                        <p className="text-sm font-medium" style={{ color: colors.accent }}>
                          {safeValue(exp.company)}
                        </p>
                      </div>
                      <span className="text-xs" style={{ color: colors.secondary }}>
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

          {/* Formation */}
          {cvData.education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: colors.primary }}>
                Formation
              </h2>
              <div className="h-0.5 w-20 mb-3" style={{ backgroundColor: colors.primary }}></div>
              <div className="space-y-4">
                {cvData.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-base" style={{ color: colors.primary }}>
                      {safeValue(edu.degree)}
                    </h3>
                    <p className="text-sm" style={{ color: colors.accent }}>
                      {safeValue(edu.school)}
                    </p>
                    <p className="text-xs mt-1" style={{ color: colors.secondary }}>
                      {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Présent'}
                    </p>
                    {edu.description && (
                      <p className="text-sm mt-1" style={{ color: colors.text }}>
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compétences */}
          {cvData.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: colors.primary }}>
                Compétences
              </h2>
              <div className="h-0.5 w-20 mb-3" style={{ backgroundColor: colors.primary }}></div>
              <div className="flex flex-wrap gap-2">
                {cvData.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-3 py-1 text-xs font-medium rounded"
                    style={{
                      backgroundColor: colors.light,
                      color: colors.primary
                    }}
                  >
                    {safeValue(skill.name)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

