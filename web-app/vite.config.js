import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  // Use relative base so the site can be published to GitHub Pages
  // without needing to hardcode the repository name.
  base: "./",
});
