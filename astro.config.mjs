// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { remarkHighlightApi } from 'remark-shiki-highlight-api';

// https://astro.build/config
export default defineConfig({
  site: 'https://stevehill.xyz',
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [
      [remarkHighlightApi, {
        theme: 'dark-plus'
      }]
    ]
  },
  vite: {
    build: {
      rollupOptions: {
        external: ['sharp']
      }
    }
  }
});
