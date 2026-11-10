import path from 'path';
import fs from 'fs';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VIEW_ROUTES } from './data/routes';
import { SITE_ORIGIN } from './utils/seo';

/**
 * Mirrors Vercel's static routing in dev: /word -> public/word.html and
 * /triplook/ -> public/triplook/index.html when those files exist.
 */
function cleanUrlsDev(): Plugin {
  return {
    name: 'clean-urls-dev',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = (req.url || '').split('?')[0];
        if (url && url !== '/' && !url.includes('.')) {
          const clean = url.replace(/^\//, '').replace(/\/$/, '');
          const flat = path.resolve(__dirname, 'public', clean + '.html');
          const dirIndex = path.resolve(__dirname, 'public', clean, 'index.html');
          if (fs.existsSync(flat)) {
            req.url = '/' + clean + '.html';
          } else if (fs.existsSync(dirIndex)) {
            req.url = '/' + clean + '/index.html';
          }
        }
        next();
      });
    },
  };
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const replaceOnce = (html: string, pattern: RegExp, replacement: string, label: string) => {
  if (!pattern.test(html)) throw new Error(`route-html: could not find ${label} in dist/index.html`);
  return html.replace(pattern, () => replacement);
};

/**
 * Writes dist/apps/<slug>.html for every route in VIEW_ROUTES except '/': the built
 * index.html with that route's title, description, canonical and share tags. Vercel
 * serves a real file before its rewrites, so crawlers and link previews get the
 * right tags without running JavaScript.
 */
function routeHtml(): Plugin {
  let outDir = 'dist';
  return {
    name: 'route-html',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const base = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');
      for (const route of Object.values(VIEW_ROUTES)) {
        if (route.path === '/') continue;
        const url = SITE_ORIGIN + route.path;
        const title = escapeHtml(route.title);
        const description = escapeHtml(route.description);
        let html = replaceOnce(base, /<title>[^<]*<\/title>/, `<title>${title}</title>`, '<title>');
        html = replaceOnce(
          html,
          /<link rel="canonical" href="[^"]*" \/>/,
          `<link rel="canonical" href="${url}" />`,
          'canonical'
        );
        const metas: [string, string, string][] = [
          ['name', 'description', description],
          ['property', 'og:url', url],
          ['property', 'og:title', title],
          ['property', 'og:description', description],
          ['name', 'twitter:title', title],
          ['name', 'twitter:description', description],
        ];
        for (const [attr, key, value] of metas) {
          html = replaceOnce(
            html,
            new RegExp(`<meta ${attr}="${key}" content="[^"]*" />`),
            `<meta ${attr}="${key}" content="${value}" />`,
            `meta ${key}`
          );
        }
        const file = path.join(outDir, route.path.replace(/^\//, '') + '.html');
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, html);
      }
    },
  };
}

export default defineConfig(() => {
    return {
      server: {
        port: Number(process.env.PORT) || 3000,
      },
      plugins: [react(), tailwindcss(), cleanUrlsDev(), routeHtml()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules/framer-motion')) return 'framer-motion';
            },
          },
        },
      },
    };
});
