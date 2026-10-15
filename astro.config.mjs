// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import { remarkHighlightApi } from 'remark-shiki-highlight-api';
import { rehypeLazyImages } from './src/plugins/rehype-lazy-images.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://stevehill.xyz',
  output: 'static',
  compressHTML: true,
  integrations: [sitemap()],
  markdown: {
    syntaxHighlight: false,
    processor: unified({
      remarkPlugins: [
        [remarkHighlightApi, {
          theme: 'dark-plus'
        }]
      ],
      rehypePlugins: [rehypeLazyImages]
    })
  },
  vite: {
    build: {
      rollupOptions: {
        external: ['sharp']
      }
    }
  }
});
