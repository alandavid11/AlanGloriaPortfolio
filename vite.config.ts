import path from 'path';
import fs from 'fs';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

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

export default defineConfig(() => {
    return {
      server: {
        port: Number(process.env.PORT) || 3000,
      },
      plugins: [react(), tailwindcss(), cleanUrlsDev()],
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
