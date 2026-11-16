import { defineConfig } from "astro/config";

// Le portail est un site statique : tout son contenu est dans public/.
// Astro ne sert qu'à le publier (voir .github/workflows/deploy.yml).
export default defineConfig({
  site: "https://stexsnt.github.io",
});
