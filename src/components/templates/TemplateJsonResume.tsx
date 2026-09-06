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

  // Les thèmes ciblent `body` : une fois scopés, certaines règles (grid, max-width)
  // rétrécissent le contenu dans la page A4. On rétablit la pleine largeur.
  const widthFix = `
    .${scopeClass} { width: 100% !important; max-width: 100% !important; margin: 0 !important; box-sizing: border-box; }
    .${scopeClass}[style], .${scopeClass} { grid-template-columns: minmax(0, 1fr) !important; }
    .${scopeClass} > * { max-width: 100% !important; min-width: 0 !important; }
    .${scopeClass} img { max-width: 100% !important; height: auto !important; }
  `;

  return (
    <div className={scopeClass} style={{ width: "100%" }}>
      <style dangerouslySetInnerHTML={{ __html: `${state.css}\n${widthFix}` }} />
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
