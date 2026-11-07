/**
 * Wrangler `[assets].directory` must be a fixed path. Astro may emit to dist/ or dist/client/.
 * Copy the resolved publish root into dist/_cf_pages for Cloudflare Workers/Pages deploy.
 */
import fs from 'node:fs';
import path from 'node:path';
import { resolveDistOutputRoot } from './resolve-dist-output.mjs';

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

console.log(`Cloudflare deploy bundle: ${path.relative(cwd, source)} → dist/_cf_pages`);
