import { Card } from "@/components/ui/card";
import { CVData } from "@/pages/CVCreate";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe } from "lucide-react";
import { getServiceName, formatUrl, safeValue, formatDate } from "@/lib/cvUtils";
import { getThemeColors, getThemeFont } from "@/lib/themeConfig";

export const TemplatePhotoBanner = ({ cvData }: { cvData: CVData }) => {
  const colors = getThemeColors(cvData.theme || 'minimalist-black');
  const fontFamily = getThemeFont(cvData.theme || 'minimalist-black');

  return (
    <Card className="overflow-hidden border-0 shadow-none" style={{ width: '794px' }}>
      <div className="bg-white" style={{ fontFamily }}>
        {/* Banner avec photo */}
        <div 
          className="p-10 text-white relative"
          style={{ 
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`
          }}
        >
          <div className="flex items-center gap-6">
            {cvData.photo && (
              <img
                src={cvData.photo}
                alt={`${cvData.firstName} ${cvData.lastName}`}
                className="w-32 h-32 rounded-full object-cover border-4 border-white"
              />
            )}
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {safeValue(cvData.firstName)} {safeValue(cvData.lastName)}
              </h1>
              {cvData.experiences.length > 0 && (
                <p className="text-lg opacity-90">
                  {cvData.experiences[0].position}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="p-10">
          {/* Contact */}
          <div className="flex flex-wrap gap-4 mb-8 text-sm" style={{ color: colors.text }}>
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
              <h2 className="text-xl font-bold mb-3" style={{ color: colors.primary }}>
                À Propos
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: colors.text }}>
                {cvData.about}
              </p>
            </div>
          )}

          {/* Expériences */}
          {cvData.experiences.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>
                Expérience Professionnelle
              </h2>
              <div className="space-y-5">
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
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>
                Formation
              </h2>
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
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>
                Compétences
              </h2>
              <div className="flex flex-wrap gap-2">
                {cvData.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-4 py-2 text-sm font-medium rounded-full"
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

