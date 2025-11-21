import { Card } from "@/components/ui/card";
import { CVData } from "@/pages/CVCreate";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe } from "lucide-react";
import { getServiceName, formatUrl, safeValue, formatDate } from "@/lib/cvUtils";
import { getThemeColors, getThemeFont } from "@/lib/themeConfig";

export const TemplateMinimal = ({ cvData }: { cvData: CVData }) => {
  const colors = getThemeColors(cvData.theme || 'minimalist-black');
  const fontFamily = getThemeFont(cvData.theme || 'minimalist-black');

  return (
    <Card className="overflow-hidden border-0 shadow-none" style={{ width: '794px' }}>
      <div className="bg-white p-10" style={{ fontFamily }}>
        <div className="mb-8">
          <h1 className="text-5xl font-light mb-2 tracking-tight" style={{ color: colors.primary }}>
            {safeValue(cvData.firstName)} {safeValue(cvData.lastName)}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm mt-4" style={{ color: colors.secondary }}>
            {cvData.email && (
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" style={{ color: colors.accent }} />
                {safeValue(cvData.email)}
              </span>
            )}
            {cvData.phone && (
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" style={{ color: colors.accent }} />
                {safeValue(cvData.phone)}
              </span>
            )}
            {cvData.address && (
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" style={{ color: colors.accent }} />
                {safeValue(cvData.address)}
              </span>
            )}
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

