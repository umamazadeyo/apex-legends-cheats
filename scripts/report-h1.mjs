import fs from 'node:fs';
import path from 'node:path';
import { resolveDistOutputRoot } from './resolve-dist-output.mjs';

const root = process.cwd();
const dist = resolveDistOutputRoot(root);
const outputRoot = path.join(dist, '_cf_pages');

function countAndText(html) {
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
  );
  return { n: h1s.length, texts: h1s };
}

const sitemap = fs.readFileSync(path.join(outputRoot, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const rows = [];

for (const loc of locs) {
  const pathname = new URL(loc).pathname;
  const rel =
    pathname === '/'
      ? 'index.html'
      : `${pathname.replace(/^\//, '').replace(/\/$/, '')}/index.html`;
  const file = path.join(outputRoot, rel);
  const html = fs.readFileSync(file, 'utf8');
  const { n, texts } = countAndText(html);
  rows.push({ pathname, n, h1: texts[0] ?? '(none)', all: texts });
}

const bad = rows.filter((r) => r.n !== 1);
console.log(`Sitemap URLs: ${rows.length} | exactly 1 H1: ${rows.length - bad.length} | issues: ${bad.length}\n`);

for (const r of rows.sort((a, b) => a.pathname.localeCompare(b.pathname))) {
  const mark = r.n === 1 ? '✓' : '✗';
  console.log(`${mark} [${r.n}] ${r.pathname}`);
  console.log(`    → ${r.h1.slice(0, 120)}${r.h1.length > 120 ? '…' : ''}`);
  if (r.n !== 1) console.log(`    all: ${JSON.stringify(r.all)}`);
}

const extras = ['support/index.html', '404.html'];
for (const rel of extras) {
  const file = path.join(outputRoot, rel);
  if (!fs.existsSync(file)) {
    console.log(`\n(extra missing) ${rel}`);
    continue;
  }
  const { n, texts } = countAndText(fs.readFileSync(file, 'utf8'));
  console.log(`\n(extra) [${n}] /${rel.replace(/index\.html$/, '')} → ${texts[0] ?? '(none)'}`);
}

process.exit(bad.length ? 1 : 0);
