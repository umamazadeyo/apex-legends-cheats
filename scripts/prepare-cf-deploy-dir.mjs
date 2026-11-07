/**
 * Wrangler `[assets].directory` must be a fixed path. Astro may emit to dist/ or dist/client/.
 * Copy the resolved publish root into dist/_cf_pages for Cloudflare Workers/Pages deploy.
 */
import fs from 'node:fs';
import path from 'node:path';
import { resolveDistOutputRoot } from './resolve-dist-output.mjs';
import { patchGoRedirectHtml } from './patch-go-redirect-html.mjs';

const cwd = process.cwd();
const distRoot = path.join(cwd, 'dist');
const source = resolveDistOutputRoot(cwd);
const target = path.join(distRoot, '_cf_pages');
const skipNames = new Set(['_cf_pages']);

if (!fs.existsSync(path.join(source, 'index.html'))) {
  console.error(`prepare-cf-deploy-dir: missing index.html in ${path.relative(cwd, source)} — run astro build first.`);
  process.exit(1);
}

fs.rmSync(target, { recursive: true, force: true });
fs.mkdirSync(target, { recursive: true });

const sourceNorm = path.normalize(source);
const distNorm = path.normalize(distRoot);

if (sourceNorm === distNorm) {
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    if (skipNames.has(entry.name)) continue;
    fs.cpSync(path.join(source, entry.name), path.join(target, entry.name), { recursive: true });
  }
} else {
  fs.cpSync(source, target, { recursive: true });
}

const sitemapFiles = ['sitemap.xml', 'sitemap-images.xml', 'sitemap-index.xml'];
for (const name of sitemapFiles) {
  const inTarget = path.join(target, name);
  if (fs.existsSync(inTarget)) continue;
  const sources = [
    path.join(source, name),
    path.join(distRoot, name),
    path.join(cwd, 'dist', name),
    path.join(cwd, 'dist', 'client', name),
  ];
  const found = sources.find((p) => fs.existsSync(p));
  if (found) {
    fs.copyFileSync(found, inTarget);
    console.log(`prepare-cf-deploy-dir: copied missing ${name} into _cf_pages`);
  }
}

const goPatched = patchGoRedirectHtml(target);
if (goPatched > 0) {
  console.log(`Instant /go/ redirect script: ${goPatched} page(s) in _cf_pages`);
}
patchGoRedirectHtml(source);

console.log(`Cloudflare deploy bundle: ${path.relative(cwd, source)} → dist/_cf_pages`);
