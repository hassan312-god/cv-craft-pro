import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Download, Loader2, Sparkles, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CVPreview } from "@/components/CVPreview";
import { generateFullResume, OPENROUTER_MODELS, type OpenRouterModel } from "@/lib/openRouter";
import { importJsonResume } from "@/lib/jsonResumeImport";
import { jsonResumeThemes } from "@/lib/jsonResumeThemes";
import { exportCVToPDF } from "@/lib/pdfExport";
import type { CVData } from "@/pages/CVCreate";

type Resume = Record<string, any>;

const emptyCV: CVData = {
  firstName: "", lastName: "", email: "", phone: "", address: "", photo: "", about: "",
  experiences: [], education: [], skills: [],
  linkedin: "", github: "", twitter: "", portfolio: "",
  theme: "minimalist-black", template: jsonResumeThemes[0].id,
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{title}</h3>
    <div className="space-y-2 text-sm text-foreground">{children}</div>
  </div>
);

const CVComplete = () => {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState("");
  const [name, setName] = useState("");
  const [model, setModel] = useState<OpenRouterModel>(OPENROUTER_MODELS[0].value);
  const [themeId, setThemeId] = useState(jsonResumeThemes[0].id);
  const [resume, setResume] = useState<Resume | null>(null);
  const [rawJson, setRawJson] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const cvData: CVData = useMemo(() => {
    if (!resume) return { ...emptyCV, template: themeId };
    return { ...emptyCV, ...importJsonResume(resume), template: themeId } as CVData;
  }, [resume, themeId]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const [firstName, ...rest] = name.trim().split(/\s+/).filter(Boolean);
    try {
      const generated = await generateFullResume(
        { firstName, lastName: rest.join(" "), jobTitle },
        model,
      );
      setResume(generated);
      setRawJson(JSON.stringify(generated, null, 2));
      toast.success("JSON Resume généré et rendu par le thème");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Génération impossible");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyJson = () => {
    try {
      const parsed = JSON.parse(rawJson);
      if (!parsed?.basics) throw new Error("Le JSON doit contenir une section \"basics\".");
      setResume(parsed);
      toast.success("JSON Resume chargé");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "JSON invalide");
    }
  };

  const handleDownload = async () => {
    if (!resume) return;
    setIsDownloading(true);
    try {
      await exportCVToPDF(cvData);
      toast.success("PDF A4 téléchargé");
    } catch {
      toast.error("Export PDF impossible");
    } finally {
      setIsDownloading(false);
    }
  };

  const basics = (resume?.basics ?? {}) as Resume;

  return (
    <main className="min-h-screen bg-background pb-[env(safe-area-inset-bottom)]">
      <header className="border-b border-border">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Accueil
          </Button>
          <h1 className="text-lg font-semibold sm:text-xl">CV complet par IA</h1>
          <Button variant="outline" size="sm" onClick={() => navigate("/create", { state: { cvData } })} disabled={!resume}>
            <PenLine className="mr-2 h-4 w-4" /> Modifier
          </Button>
        </div>
      </header>

      <div className="container mx-auto grid gap-6 px-4 py-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card className="space-y-4 p-4 sm:p-6">
            <div>
              <Label htmlFor="cv-name">Nom complet</Label>
              <Input id="cv-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jean Dupont" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="cv-job">Métier visé</Label>
              <Input id="cv-job" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Développeur Full Stack" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="cv-model">Modèle IA</Label>
              <select
                id="cv-model"
                value={model}
                onChange={(e) => setModel(e.target.value as OpenRouterModel)}
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              >
                {OPENROUTER_MODELS.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="cv-theme">Thème JSON Resume</Label>
              <select
                id="cv-theme"
                value={themeId}
                onChange={(e) => setThemeId(e.target.value)}
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              >
                {jsonResumeThemes.map((theme) => (
                  <option key={theme.id} value={theme.id}>{theme.name}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
                {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Générer un CV complet avec IA
              </Button>
              <Button variant="outline" onClick={handleDownload} disabled={!resume || isDownloading} className="w-full">
                {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                Télécharger le PDF A4
              </Button>
            </div>
          </Card>

          {resume && (
            <Card className="space-y-5 p-4 sm:p-6">
              <Section title="Informations">
                <p className="text-base font-semibold">{basics.name}</p>
                <p className="text-muted-foreground">{basics.label}</p>
                <p className="text-muted-foreground">
                  {[basics.email, basics.phone, basics.location?.city].filter(Boolean).join(" · ")}
                </p>
              </Section>
              {basics.summary && <Section title="Profil"><p>{basics.summary}</p></Section>}
              {!!resume.work?.length && (
                <Section title="Expériences">
                  {resume.work.map((item: Resume, index: number) => (
                    <div key={index} className="border-l-2 border-border pl-3">
                      <p className="font-medium">{item.position} — {item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.startDate} → {item.endDate || "Présent"}</p>
                      <p className="text-muted-foreground">{item.summary}</p>
                    </div>
                  ))}
                </Section>
              )}
              {!!resume.education?.length && (
                <Section title="Formation">
                  {resume.education.map((item: Resume, index: number) => (
                    <div key={index} className="border-l-2 border-border pl-3">
                      <p className="font-medium">{[item.studyType, item.area].filter(Boolean).join(" - ")}</p>
                      <p className="text-xs text-muted-foreground">{item.institution} · {item.startDate} → {item.endDate}</p>
                    </div>
                  ))}
                </Section>
              )}
              {!!resume.skills?.length && (
                <Section title="Compétences">
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.map((item: Resume, index: number) => (
                      <span key={index} className="rounded-full border border-border px-3 py-1 text-xs">
                        {item.name}{item.level ? ` · ${item.level}` : ""}
                      </span>
                    ))}
                  </div>
                </Section>
              )}
              {!!resume.languages?.length && (
                <Section title="Langues">
                  <p>{resume.languages.map((item: Resume) => `${item.language} (${item.fluency ?? ""})`).join(", ")}</p>
                </Section>
              )}
            </Card>
          )}

          <Card className="space-y-3 p-4 sm:p-6">
            <Label htmlFor="cv-json">JSON Resume</Label>
            <Textarea
              id="cv-json"
              value={rawJson}
              onChange={(e) => setRawJson(e.target.value)}
              placeholder='{"basics":{"name":"Jean Dupont"}}'
              className="min-h-[160px] font-mono text-xs"
            />
            <Button variant="outline" onClick={handleApplyJson} disabled={!rawJson.trim()}>Charger ce JSON Resume</Button>
          </Card>
        </div>

        <div className="lg:sticky lg:top-6 lg:h-fit">
          <CVPreview cvData={cvData} />
        </div>
      </div>
    </main>
  );
};

export default CVComplete;
