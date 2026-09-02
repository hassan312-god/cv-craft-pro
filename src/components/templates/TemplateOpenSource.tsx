import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter } from "lucide-react";
import { getThemeColors, getThemeFont } from "@/lib/themeConfig";
import { formatDate, getServiceName, formatUrl, safeValue } from "@/lib/cvUtils";
import { CVData } from "@/pages/CVCreate";

export const TemplateOpenSource = ({ cvData }: { cvData: CVData }) => {
  const colors = getThemeColors(cvData.theme || "minimalist-black");
  const fontFamily = getThemeFont(cvData.theme || "minimalist-black");

  const contactItems = [
    cvData.email && { icon: Mail, label: cvData.email },
    cvData.phone && { icon: Phone, label: cvData.phone },
    cvData.address && { icon: MapPin, label: cvData.address },
    cvData.portfolio && { icon: Globe, label: cvData.portfolio },
  ].filter(Boolean) as Array<{ icon: any; label: string }>;

  return (
    <Card className="overflow-hidden border-0 shadow-none" style={{ width: "794px" }}>
      <div className="bg-[#f8fafc] p-0" style={{ fontFamily }}>
        <div className="bg-slate-900 text-white px-10 py-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300">CV / Resume</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight">
                {safeValue(cvData.firstName)} {safeValue(cvData.lastName)}
              </h1>
              <p className="mt-2 text-sm text-slate-300">
                {cvData.portfolio ? safeValue(cvData.portfolio) : "Professionnel polyvalent"}
              </p>
            </div>
            <div
              className="rounded-full border border-slate-700 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-200"
              style={{ backgroundColor: colors.light }}
            >
              Open Source
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[260px_minmax(0,1fr)]">
          <aside className="bg-slate-100 p-8 text-slate-700">
            <div className="mb-8">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Contact</h2>
              <div className="mt-4 space-y-3">
                {contactItems.map(({ icon: Icon, label }, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <Icon className="h-4 w-4 text-slate-500" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {cvData.skills.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Compétences</h2>
                <ul className="mt-4 space-y-2 text-sm">
                  {cvData.skills.map((skill) => (
                    <li key={skill.id} className="flex items-center justify-between gap-3">
                      <span>{safeValue(skill.name)}</span>
                      <span className="text-slate-500">{skill.level}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-3 text-sm">
              {cvData.linkedin && (
                <div className="flex items-center gap-3">
                  <Linkedin className="h-4 w-4 text-slate-500" />
                  <span>{safeValue(cvData.linkedin)}</span>
                </div>
              )}
              {cvData.github && (
                <div className="flex items-center gap-3">
                  <Github className="h-4 w-4 text-slate-500" />
                  <span>{safeValue(cvData.github)}</span>
                </div>
              )}
              {cvData.twitter && (
                <div className="flex items-center gap-3">
                  <Twitter className="h-4 w-4 text-slate-500" />
                  <span>{safeValue(cvData.twitter)}</span>
                </div>
              )}
            </div>
          </aside>

          <main className="bg-white p-8">
            {cvData.about && (
              <section className="mb-8">
                <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Profil</h2>
                <p className="text-sm leading-7 text-slate-700">{safeValue(cvData.about)}</p>
              </section>
            )}

            {cvData.experiences.length > 0 && (
              <section className="mb-8">
                <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Expérience</h2>
                <div className="space-y-6">
                  {cvData.experiences.map((exp) => (
                    <div key={exp.id} className="relative pl-4 border-l border-slate-200">
                      <div className="absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full bg-slate-900" />
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{safeValue(exp.position)}</h3>
                          <p className="text-sm text-slate-600">{safeValue(exp.company)}</p>
                        </div>
                        <span className="text-xs text-slate-500 whitespace-nowrap">
                          {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Aujourd'hui"}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="mt-3 text-sm leading-6 text-slate-700">{safeValue(exp.description)}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {cvData.education.length > 0 && (
              <section>
                <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Formation</h2>
                <div className="space-y-5">
                  {cvData.education.map((edu) => (
                    <div key={edu.id} className="border-l border-slate-200 pl-4 relative">
                      <div className="absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full bg-slate-900" />
                      <div className="flex justify-between gap-4">
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">{safeValue(edu.degree)}</h3>
                          <p className="text-sm text-slate-600">{safeValue(edu.school)}</p>
                        </div>
                        <span className="text-xs text-slate-500 whitespace-nowrap">
                          {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Aujourd'hui"}
                        </span>
                      </div>
                      {edu.description && (
                        <p className="mt-2 text-sm leading-6 text-slate-700">{safeValue(edu.description)}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </Card>
  );
};
