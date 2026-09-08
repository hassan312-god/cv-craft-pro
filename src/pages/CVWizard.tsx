import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Plus, Sparkles, Trash2, WandSparkles, X } from "lucide-react";
import { toast } from "sonner";
import { WizardField, WizardLayout } from "@/components/wizard/WizardLayout";
import { CanvasRenderer } from "@/components/canvas/CanvasRenderer";
import { PAGE_WIDTH } from "@/lib/canvasDocument";
import { buildPresetDocument, canvasPresets } from "@/lib/canvasPresets";
import { demoResume } from "@/lib/demoResumes";
import { saveDraft } from "@/lib/draftStorage";
import { generateAbout } from "@/lib/openRouter";
import type { CVData, Education, Experience, Skill } from "@/pages/CVCreate";

/** Étapes du tunnel, dans l'ordre de collecte. */
const STEPS = [
  "modele",
  "identite",
  "contact",
  "poste",
  "experiences",
  "formation",
  "competences",
  "liens",
  "profil",
  "recap",
] as const;

type Step = (typeof STEPS)[number];

const emptyCV = (): CVData => ({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  photo: "",
  about: "",
  experiences: [],
  education: [],
  skills: [],
  linkedin: "",
  github: "",
  twitter: "",
  portfolio: "",
  theme: "minimalist-black",
  template: "canvas",
});

const newExperience = (): Experience => ({
  id: crypto.randomUUID(),
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  description: "",
});

const newEducation = (): Education => ({
  id: crypto.randomUUID(),
  school: "",
  degree: "",
  startDate: "",
  endDate: "",
  description: "",
});

/**
 * Tunnel de création : une question par écran, jusqu'à disposer de toutes les
 * informations du CV. La dernière étape ouvre l'éditeur avec le document déjà
 * composé.
 */
const CVWizard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [stepIndex, setStepIndex] = useState(0);
  const [cv, setCv] = useState<CVData>(() => (location.state?.cvData as CVData) ?? emptyCV());
  const [presetId, setPresetId] = useState<string>(
    (location.state?.presetId as string) ?? canvasPresets[0].id,
  );
  const [jobTitle, setJobTitle] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [isWriting, setIsWriting] = useState(false);

  const step: Step = STEPS[stepIndex];
  const set = (patch: Partial<CVData>) => setCv((current) => ({ ...current, ...patch }));

  const goNext = () => setStepIndex((index) => Math.min(STEPS.length - 1, index + 1));
  const goBack = () => setStepIndex((index) => Math.max(0, index - 1));
  const progress = stepIndex / (STEPS.length - 1);

  /* ---------------------------------------------------------------- */
  /* Listes répétables                                                 */
  /* ---------------------------------------------------------------- */

  const experiences = cv.experiences.length > 0 ? cv.experiences : [newExperience()];
  const education = cv.education.length > 0 ? cv.education : [newEducation()];

  const patchExperience = (id: string, patch: Partial<Experience>) =>
    set({ experiences: experiences.map((item) => (item.id === id ? { ...item, ...patch } : item)) });

  const patchEducation = (id: string, patch: Partial<Education>) =>
    set({ education: education.map((item) => (item.id === id ? { ...item, ...patch } : item)) });

  const addSkill = () => {
    const name = skillInput.trim();
    if (!name) return;
    const skill: Skill = { id: crypto.randomUUID(), name, level: 80 };
    set({ skills: [...cv.skills, skill] });
    setSkillInput("");
  };

  /* ---------------------------------------------------------------- */
  /* Rédaction assistée                                                */
  /* ---------------------------------------------------------------- */

  const writeAbout = async () => {
    setIsWriting(true);
    try {
      const text = await generateAbout({
        firstName: cv.firstName,
        lastName: cv.lastName,
        experiences: cv.experiences.map((item) => ({
          position: item.position,
          company: item.company,
          description: item.description,
        })),
        education: cv.education.map((item) => ({ degree: item.degree, school: item.school })),
        skills: cv.skills.map((item) => ({ name: item.name, level: item.level })),
      });
      set({ about: text });
    } catch {
      toast.error("La rédaction assistée n'est pas disponible pour le moment.");
    } finally {
      setIsWriting(false);
    }
  };

  /* ---------------------------------------------------------------- */
  /* Fin du tunnel                                                     */
  /* ---------------------------------------------------------------- */

  const finish = () => {
    const canvas = buildPresetDocument(presetId);
    const complete: CVData = {
      ...cv,
      experiences: cv.experiences.filter((item) => item.position || item.company),
      education: cv.education.filter((item) => item.degree || item.school),
      template: "canvas",
      canvas,
    };
    saveDraft(complete);
    navigate("/editeur", { state: { cvData: complete, canvas } });
  };

  const previewDoc = useMemo(() => buildPresetDocument(presetId), [presetId]);

  /* ---------------------------------------------------------------- */

  if (step === "modele") {
    return (
      <WizardLayout
        title="Choisissez un modèle"
        subtitle="Vous pourrez en changer à tout moment, sans ressaisir vos informations."
        onNext={goNext}
        progress={progress}
        wide
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {canvasPresets.map((preset) => {
            const doc = preset.build(preset.accent);
            const width = 130;
            return (
              <button
                key={preset.id}
                onClick={() => setPresetId(preset.id)}
                className={`overflow-hidden rounded-lg border-2 bg-white p-1 transition ${
                  presetId === preset.id
                    ? "border-emerald-600 shadow-md"
                    : "border-transparent hover:border-slate-300"
                }`}
              >
                <div className="overflow-hidden" style={{ width, height: width * 1.414 }}>
                  <div style={{ transform: `scale(${width / PAGE_WIDTH})`, transformOrigin: "top left" }}>
                    <CanvasRenderer doc={doc} cvData={demoResume} />
                  </div>
                </div>
                <span className="mt-1.5 block text-center text-[11px] font-semibold">
                  {preset.name}
                </span>
              </button>
            );
          })}
        </div>
      </WizardLayout>
    );
  }

  if (step === "identite") {
    return (
      <WizardLayout
        title="Votre nom"
        subtitle="Bon choix de modèle ! Ajoutons maintenant votre nom."
        onBack={goBack}
        onNext={goNext}
        nextDisabled={!cv.firstName.trim()}
        progress={progress}
      >
        <WizardField label="Prénom" value={cv.firstName} autoFocus onChange={(v) => set({ firstName: v })} />
        <WizardField label="Nom" value={cv.lastName} onChange={(v) => set({ lastName: v })} />
      </WizardLayout>
    );
  }

  if (step === "contact") {
    return (
      <WizardLayout
        title="Vos coordonnées"
        subtitle="Elles apparaissent en haut du CV pour que le recruteur puisse vous joindre."
        onBack={goBack}
        onNext={goNext}
        progress={progress}
      >
        <WizardField label="Email" type="email" value={cv.email} autoFocus onChange={(v) => set({ email: v })} />
        <WizardField label="Téléphone" value={cv.phone} onChange={(v) => set({ phone: v })} />
        <WizardField label="Ville" value={cv.address} placeholder="Paris, France" onChange={(v) => set({ address: v })} />
      </WizardLayout>
    );
  }

  if (step === "poste") {
    return (
      <WizardLayout
        title="Quel poste visez-vous ?"
        subtitle="Cela nous aide à adapter les conseils et la rédaction assistée."
        onBack={goBack}
        onNext={goNext}
        progress={progress}
      >
        <WizardField
          label="Intitulé du poste"
          value={jobTitle}
          autoFocus
          placeholder="Développeur full stack"
          onChange={setJobTitle}
        />
      </WizardLayout>
    );
  }

  if (step === "experiences") {
    return (
      <WizardLayout
        title="Vos expériences"
        subtitle="Commencez par la plus récente. Décrivez vos résultats plutôt que vos tâches."
        onBack={goBack}
        onNext={() => {
          set({ experiences });
          goNext();
        }}
        progress={progress}
        wide
      >
        {experiences.map((item, index) => (
          <div key={item.id} className="rounded-xl border border-slate-200 p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Expérience {index + 1}
              </span>
              {experiences.length > 1 ? (
                <button
                  onClick={() => set({ experiences: experiences.filter((entry) => entry.id !== item.id) })}
                  className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-red-600"
                  aria-label={`Supprimer l'expérience ${index + 1}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              ) : null}
            </div>
            <div className="space-y-4">
              <WizardField
                label="Poste"
                value={item.position}
                onChange={(v) => patchExperience(item.id, { position: v })}
              />
              <WizardField
                label="Entreprise"
                value={item.company}
                onChange={(v) => patchExperience(item.id, { company: v })}
              />
              <div className="grid grid-cols-2 gap-4">
                <WizardField
                  label="Début"
                  type="month"
                  value={item.startDate}
                  onChange={(v) => patchExperience(item.id, { startDate: v })}
                />
                <WizardField
                  label="Fin (vide = en poste)"
                  type="month"
                  value={item.endDate}
                  onChange={(v) => patchExperience(item.id, { endDate: v })}
                />
              </div>
              <WizardField
                label="Missions et résultats"
                textarea
                value={item.description}
                placeholder="Une ligne par réalisation."
                onChange={(v) => patchExperience(item.id, { description: v })}
              />
            </div>
          </div>
        ))}

        <button
          onClick={() => set({ experiences: [...experiences, newExperience()] })}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 py-3.5 text-[15px] font-semibold text-slate-600 transition hover:border-emerald-500 hover:text-emerald-700"
        >
          <Plus className="h-4 w-4" /> Ajouter une expérience
        </button>
      </WizardLayout>
    );
  }

  if (step === "formation") {
    return (
      <WizardLayout
        title="Votre formation"
        subtitle="Diplômes, écoles et certifications marquantes."
        onBack={goBack}
        onNext={() => {
          set({ education });
          goNext();
        }}
        progress={progress}
        wide
      >
        {education.map((item, index) => (
          <div key={item.id} className="rounded-xl border border-slate-200 p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Formation {index + 1}
              </span>
              {education.length > 1 ? (
                <button
                  onClick={() => set({ education: education.filter((entry) => entry.id !== item.id) })}
                  className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-red-600"
                  aria-label={`Supprimer la formation ${index + 1}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              ) : null}
            </div>
            <div className="space-y-4">
              <WizardField
                label="Diplôme"
                value={item.degree}
                onChange={(v) => patchEducation(item.id, { degree: v })}
              />
              <WizardField
                label="École ou université"
                value={item.school}
                onChange={(v) => patchEducation(item.id, { school: v })}
              />
              <div className="grid grid-cols-2 gap-4">
                <WizardField
                  label="Début"
                  type="month"
                  value={item.startDate}
                  onChange={(v) => patchEducation(item.id, { startDate: v })}
                />
                <WizardField
                  label="Fin"
                  type="month"
                  value={item.endDate}
                  onChange={(v) => patchEducation(item.id, { endDate: v })}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() => set({ education: [...education, newEducation()] })}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 py-3.5 text-[15px] font-semibold text-slate-600 transition hover:border-emerald-500 hover:text-emerald-700"
        >
          <Plus className="h-4 w-4" /> Ajouter une formation
        </button>
      </WizardLayout>
    );
  }

  if (step === "competences") {
    return (
      <WizardLayout
        title="Vos compétences"
        subtitle="Six à huit compétences suffisent : les plus recherchées pour votre métier."
        onBack={goBack}
        onNext={goNext}
        progress={progress}
      >
        <div className="flex gap-2">
          <input
            value={skillInput}
            autoFocus
            placeholder="React, gestion de projet…"
            onChange={(event) => setSkillInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addSkill();
              }
            }}
            className="w-full rounded-t-md border-b-2 border-slate-200 bg-slate-50 px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white"
          />
          <button
            onClick={addSkill}
            className="shrink-0 rounded-lg bg-slate-900 px-4 text-white transition hover:bg-slate-800"
            aria-label="Ajouter la compétence"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {cv.skills.map((skill) => (
            <span
              key={skill.id}
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 py-1.5 pl-3 pr-2 text-sm font-semibold text-emerald-800"
            >
              {skill.name}
              <button
                onClick={() => set({ skills: cv.skills.filter((entry) => entry.id !== skill.id) })}
                aria-label={`Retirer ${skill.name}`}
                className="rounded-full p-0.5 transition-colors hover:bg-emerald-200"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          {cv.skills.length === 0 ? (
            <p className="text-sm text-slate-400">Aucune compétence pour l'instant.</p>
          ) : null}
        </div>
      </WizardLayout>
    );
  }

  if (step === "liens") {
    return (
      <WizardLayout
        title="Vos liens"
        subtitle="Facultatif, mais un profil en ligne rassure toujours un recruteur."
        onBack={goBack}
        onNext={goNext}
        onSkip={goNext}
        progress={progress}
      >
        <WizardField label="LinkedIn" value={cv.linkedin} autoFocus onChange={(v) => set({ linkedin: v })} />
        <WizardField label="GitHub" value={cv.github} onChange={(v) => set({ github: v })} />
        <WizardField label="Portfolio ou site" value={cv.portfolio} onChange={(v) => set({ portfolio: v })} />
      </WizardLayout>
    );
  }

  if (step === "profil") {
    return (
      <WizardLayout
        title="Votre accroche"
        subtitle="Trois lignes qui résument votre profil et ce que vous cherchez."
        onBack={goBack}
        onNext={goNext}
        onSkip={goNext}
        progress={progress}
      >
        <WizardField
          label="Profil"
          textarea
          rows={6}
          value={cv.about}
          autoFocus
          placeholder="Développeur full stack avec 8 ans d'expérience…"
          onChange={(v) => set({ about: v })}
        />
        <button
          onClick={writeAbout}
          disabled={isWriting}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-700 disabled:opacity-50"
        >
          <WandSparkles className="h-4 w-4" />
          {isWriting ? "Rédaction en cours…" : "Rédiger avec l'IA"}
        </button>
      </WizardLayout>
    );
  }

  // Récapitulatif
  return (
    <WizardLayout
      title="Votre CV est prêt"
      subtitle="Ouvrez l'éditeur pour ajuster la mise en page, puis exportez en PDF."
      onBack={goBack}
      onNext={finish}
      nextLabel="Ouvrir mon CV"
      progress={1}
      wide
    >
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div
          className="shrink-0 overflow-hidden rounded-lg border border-slate-200 shadow-lg"
          style={{ width: 240, height: 240 * 1.414 }}
        >
          <div style={{ transform: `scale(${240 / PAGE_WIDTH})`, transformOrigin: "top left" }}>
            <CanvasRenderer doc={previewDoc} cvData={cv} />
          </div>
        </div>

        <ul className="w-full space-y-2 text-[15px]">
          {[
            ["Nom", `${cv.firstName} ${cv.lastName}`.trim()],
            ["Contact", [cv.email, cv.phone, cv.address].filter(Boolean).join(" · ")],
            ["Expériences", `${cv.experiences.filter((item) => item.position || item.company).length}`],
            ["Formations", `${cv.education.filter((item) => item.degree || item.school).length}`],
            ["Compétences", `${cv.skills.length}`],
            ["Accroche", cv.about ? "renseignée" : "à compléter"],
          ].map(([label, value]) => (
            <li key={label} className="flex justify-between gap-4 border-b border-slate-100 py-2">
              <span className="text-slate-500">{label}</span>
              <span className="text-right font-semibold">{value || "—"}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        <Sparkles className="h-4 w-4 shrink-0" />
        Votre brouillon est enregistré : vous pourrez le reprendre depuis « Mes CV ».
      </p>
    </WizardLayout>
  );
};

export default CVWizard;
