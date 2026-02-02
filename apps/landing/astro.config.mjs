import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://beta-stack.example.com',
  integrations: [
    tailwind(),
    sitemap(),
  ],
});
