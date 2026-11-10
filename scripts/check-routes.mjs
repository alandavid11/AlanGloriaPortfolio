// Fails if a sitemap URL has no file in dist/, or if a case-study page still
// carries the home page's canonical. Run after `vite build`.
import fs from 'node:fs';
import path from 'node:path';

const ORIGIN = 'https://www.alangloria.com';
const dist = path.resolve('dist');
const sitemap = fs.readFileSync(path.resolve('public/sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
const errors = [];

// Vercel static routing with cleanUrls: /a/b -> a/b.html or a/b/index.html, /a/ -> a/index.html.
const fileFor = (pathname) => {
  if (pathname === '/') return 'index.html';
  const clean = pathname.replace(/^\/|\/$/g, '');
  const candidates = pathname.endsWith('/')
    ? [`${clean}/index.html`]
    : [`${clean}.html`, `${clean}/index.html`];
  return candidates.find((file) => fs.existsSync(path.join(dist, file))) ?? null;
};

if (urls.length === 0) errors.push('public/sitemap.xml has no <loc> entries');

for (const url of urls) {
  if (!url.startsWith(ORIGIN + '/')) {
    errors.push(`${url}: not under ${ORIGIN}`);
    continue;
  }
  const pathname = url.slice(ORIGIN.length);
  const file = fileFor(pathname);
  if (!file) {
    errors.push(`${pathname}: no file in dist/ (sitemap URL would fall through to the home page)`);
    continue;
  }
  if (pathname.startsWith('/apps/')) {
    const html = fs.readFileSync(path.join(dist, file), 'utf8');
    if (!html.includes(`<link rel="canonical" href="${url}" />`)) {
      errors.push(`${pathname}: dist/${file} canonical is not ${url}`);
    }
    if (!html.includes(`<meta property="og:url" content="${url}" />`)) {
      errors.push(`${pathname}: dist/${file} og:url is not ${url}`);
    }
  }
}

if (errors.length > 0) {
  console.error(`check-routes: ${errors.length} problem(s)`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}
console.log(`check-routes: ${urls.length} sitemap URLs resolve to files in dist/`);
