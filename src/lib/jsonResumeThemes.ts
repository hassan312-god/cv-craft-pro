import Handlebars from "handlebars/dist/handlebars.js";
import type { JsonResume } from "@/lib/jsonResume";

// Templates & styles des thèmes npm JSON Resume, chargés en brut (compatibles navigateur)
import spartanTpl from "jsonresume-theme-spartan/resume.hbs?raw";
import spartanCss from "jsonresume-theme-spartan/style.css?raw";
import onepageTpl from "jsonresume-theme-onepage-plus/resume.hbs?raw";
import onepageCss from "jsonresume-theme-onepage-plus/style.css?raw";

const onepagePartials = import.meta.glob("/node_modules/jsonresume-theme-onepage-plus/partials/*.hbs", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export interface JsonResumeThemeMeta {
  id: string;
  name: string;
  package: string;
  description: string;
}

export const jsonResumeThemes: JsonResumeThemeMeta[] = [
  {
    id: "jsonresume-even",
    name: "Even",
    package: "jsonresume-theme-even",
    description: "Thème officiel JSON Resume, typographie sobre et lisible.",
  },
  {
    id: "jsonresume-onepage-plus",
    name: "One Page Plus",
    package: "jsonresume-theme-onepage-plus",
    description: "Thème JSON Resume compact, pensé pour tenir sur une page A4.",
  },
  {
    id: "jsonresume-spartan",
    name: "Spartan",
    package: "jsonresume-theme-spartan",
    description: "Thème JSON Resume épuré avec sections nettement séparées.",
  },
];

export const isJsonResumeTheme = (id?: string): boolean =>
  !!id && jsonResumeThemes.some((theme) => theme.id === id);

/* ------------------------------------------------------------------ */
/* Helpers Handlebars (repris des thèmes, sans dépendance Node)        */
/* ------------------------------------------------------------------ */

let helpersRegistered = false;

const asDate = (value: unknown): Date | null => {
  if (!value) return null;
  const raw = String(value);
  const normalized = /^\d{4}$/.test(raw) ? `${raw}-01-01` : /^\d{4}-\d{2}$/.test(raw) ? `${raw}-01` : raw;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
};

const registerHelpers = () => {
  if (helpersRegistered) return;
  helpersRegistered = true;

  Handlebars.registerHelper("formatDate", (value: unknown) => {
    const date = asDate(value);
    return date ? date.toLocaleDateString("fr-FR", { month: "short", year: "numeric" }) : String(value ?? "");
  });

  Handlebars.registerHelper("paragraphSplit", (plaintext: unknown) => {
    const lines = String(plaintext ?? "").split(/\r\n|\r|\n/g);
    const output = lines.filter(Boolean).map((line) => `<p>${line}</p>`).join("");
    return new Handlebars.SafeString(output);
  });

  Handlebars.registerHelper("toLowerCase", (str: unknown) => String(str ?? "").toLowerCase());
  Handlebars.registerHelper("spaceToDash", (str: unknown) =>
    String(str ?? "").replace(/\s/g, "-").toLowerCase(),
  );

  Handlebars.registerHelper("MY", (value: unknown) => {
    const date = asDate(value);
    return date ? date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" }) : "";
  });
  Handlebars.registerHelper("Y", (value: unknown) => {
    const date = asDate(value);
    return date ? String(date.getFullYear()) : "";
  });
  Handlebars.registerHelper("DMY", (value: unknown) => {
    const date = asDate(value);
    return date
      ? date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
      : "";
  });

  Object.entries(onepagePartials).forEach(([path, source]) => {
    const name = path.split("/").pop()?.replace(/\.hbs$/, "");
    if (name) Handlebars.registerPartial(name, source);
  });
};

/* ------------------------------------------------------------------ */
/* Rendu                                                               */
/* ------------------------------------------------------------------ */

export interface RenderedTheme {
  html: string;
  css: string;
}

const extractDocument = (fullHtml: string): RenderedTheme => {
  const styles: string[] = [];
  const withoutStyles = fullHtml.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (_m, css) => {
    styles.push(css);
    return "";
  });
  const bodyMatch = withoutStyles.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1] : withoutStyles;
  return {
    html: body.replace(/<\/?(html|head|meta|title|link|script)[^>]*>/gi, ""),
    css: styles.join("\n"),
  };
};

const compile = (tpl: string, css: string, resume: JsonResume): RenderedTheme => {
  registerHelpers();
  const html = Handlebars.compile(tpl)({ css, resume });
  const extracted = extractDocument(html);
  return { html: extracted.html, css: `${css}\n${extracted.css}` };
};

export const renderJsonResumeTheme = async (
  themeId: string,
  resume: JsonResume,
): Promise<RenderedTheme> => {
  if (themeId === "jsonresume-spartan") {
    return compile(spartanTpl, spartanCss, resume);
  }
  if (themeId === "jsonresume-onepage-plus") {
    return compile(onepageTpl, onepageCss, resume);
  }

  // Even : thème ESM moderne exposant render()
  const even = await import("jsonresume-theme-even");
  const rendered = await (even as { render: (r: unknown) => string | Promise<string> }).render(resume);
  return extractDocument(String(rendered));
};

/**
 * Limite la portée du CSS d'un thème au conteneur d'aperçu pour ne pas
 * polluer les styles de l'application.
 */
export const scopeThemeCss = (css: string, scope: string): string => {
  const cleaned = css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/@import[^;]+;/g, "");

  const scopeSelector = (selectorList: string) =>
    selectorList
      .split(",")
      .map((selector) => {
        const trimmed = selector.trim();
        if (!trimmed) return trimmed;
        if (/^(html|:root|body)\b/i.test(trimmed)) {
          return trimmed.replace(/^(html|:root|body)/i, scope);
        }
        if (trimmed.startsWith("@") || trimmed.startsWith("from") || trimmed.startsWith("to") || /^\d+%$/.test(trimmed)) {
          return trimmed;
        }
        return `${scope} ${trimmed}`;
      })
      .join(", ");

  let output = "";
  let index = 0;

  while (index < cleaned.length) {
    const braceStart = cleaned.indexOf("{", index);
    if (braceStart === -1) break;

    const prelude = cleaned.slice(index, braceStart).trim();

    // Blocs at-rule à contenu imbriqué : on scope l'intérieur
    if (/^@(media|supports|layer|container)/i.test(prelude)) {
      let depth = 0;
      let cursor = braceStart;
      for (; cursor < cleaned.length; cursor++) {
        if (cleaned[cursor] === "{") depth++;
        else if (cleaned[cursor] === "}") {
          depth--;
          if (depth === 0) break;
        }
      }
      const inner = cleaned.slice(braceStart + 1, cursor);
      output += `${prelude}{${scopeThemeCss(inner, scope)}}`;
      index = cursor + 1;
      continue;
    }

    const braceEnd = cleaned.indexOf("}", braceStart);
    const block = cleaned.slice(braceStart + 1, braceEnd === -1 ? cleaned.length : braceEnd);

    if (/^@(font-face|keyframes|page|charset|-webkit-keyframes)/i.test(prelude)) {
      output += `${prelude}{${block}}`;
    } else if (prelude) {
      output += `${scopeSelector(prelude)}{${block}}`;
    }

    index = braceEnd === -1 ? cleaned.length : braceEnd + 1;
  }

  return output;
};
