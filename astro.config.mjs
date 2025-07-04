import { defineConfig } from 'astro/config';

// https://astro.build/config
import react from "@astrojs/react";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), vue()],
  site: 'https://astro.build'
});