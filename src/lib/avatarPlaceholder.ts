/**
 * Avatars de démonstration, dessinés en SVG et encodés en data-URI.
 *
 * Ils remplacent les photos manquantes dans les modèles qui en prévoient une :
 * aucun appel réseau, aucune question de licence, et le rendu reste net à
 * n'importe quelle taille comme à l'export PDF.
 */

interface AvatarColors {
  background: string;
  figure: string;
}

const svg = ({ background, figure }: AvatarColors): string => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" fill="${background}"/>
  <circle cx="100" cy="78" r="34" fill="${figure}"/>
  <path d="M100 122c-34 0-62 24-66 56h132c-4-32-32-56-66-56z" fill="${figure}"/>
</svg>`;

const toDataUri = (markup: string): string =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup.trim())}`;

const PALETTES: AvatarColors[] = [
  { background: "#dbeafe", figure: "#93b4e6" },
  { background: "#dcfce7", figure: "#8fceab" },
  { background: "#fef3c7", figure: "#e0bd72" },
  { background: "#ede9fe", figure: "#b0a2e8" },
  { background: "#fee2e2", figure: "#e5a0a0" },
  { background: "#e2e8f0", figure: "#a3aebf" },
];

/** Avatars prêts à l'emploi, un par palette. */
export const AVATARS: string[] = PALETTES.map((palette) => toDataUri(svg(palette)));

/** Avatar stable pour une clé donnée (même profil, même avatar). */
export const avatarFor = (key: string): string => {
  const hash = Array.from(key).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return AVATARS[hash % AVATARS.length];
};
