/// <reference types="vite/client" />

declare module "*.hbs?raw" {
  const content: string;
  export default content;
}

declare module "handlebars/dist/handlebars.js" {
  const Handlebars: typeof import("handlebars");
  export default Handlebars;
}

declare module "jsonresume-theme-even" {
  export function render(resume: unknown): string | Promise<string>;
}
