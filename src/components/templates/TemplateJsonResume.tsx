import { useEffect, useId, useMemo, useState } from "react";
import type { CVData } from "@/pages/CVCreate";
import { toJsonResume } from "@/lib/jsonResume";
import { renderJsonResumeTheme, scopeThemeCss } from "@/lib/jsonResumeThemes";

interface Props {
  cvData: CVData;
  themeId: string;
}

/**
 * Rendu d'un thème npm JSON Resume (HTML + CSS) dans l'aperçu A4.
 * Le CSS du thème est limité au conteneur pour ne pas affecter l'application.
 */
export const TemplateJsonResume = ({ cvData, themeId }: Props) => {
  const rawId = useId();
  const scopeClass = useMemo(() => `jr-${rawId.replace(/[:]/g, "")}`, [rawId]);
  const resume = useMemo(() => toJsonResume(cvData), [cvData]);
  const [state, setState] = useState<{ html: string; css: string; error: string | null }>({
    html: "",
    css: "",
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    renderJsonResumeTheme(themeId, resume)
      .then(({ html, css }) => {
        if (cancelled) return;
        setState({ html, css: scopeThemeCss(css, `.${scopeClass}`), error: null });
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setState({
          html: "",
          css: "",
          error: error instanceof Error ? error.message : "Rendu du thème impossible",
        });
      });
    return () => {
      cancelled = true;
    };
  }, [themeId, resume, scopeClass]);

  if (state.error) {
    return (
      <div className="p-10 text-sm text-destructive">
        Impossible de charger ce thème JSON Resume : {state.error}
      </div>
    );
  }

  return (
    <div className={scopeClass} style={{ width: "100%" }}>
      <style dangerouslySetInnerHTML={{ __html: state.css }} />
      <div dangerouslySetInnerHTML={{ __html: state.html }} />
    </div>
  );
};

export const createJsonResumeTemplate = (themeId: string) => {
  const Component = ({ cvData }: { cvData: CVData }) => (
    <TemplateJsonResume cvData={cvData} themeId={themeId} />
  );
  Component.displayName = `JsonResume(${themeId})`;
  return Component;
};
