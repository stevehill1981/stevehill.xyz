// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { remarkHighlightApi } from 'remark-shiki-highlight-api';

// https://astro.build/config
export default defineConfig({
  site: 'https://stevehill.xyz',
  output: 'static',
  integrations: [sitemap()],
  image: {
    service: { entrypoint: 'astro/assets/services/noop' }
  },
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [
      [remarkHighlightApi, {
        theme: 'dark-plus'
      }]
    ]
  }
});
