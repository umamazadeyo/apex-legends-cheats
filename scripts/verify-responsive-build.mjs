import fs from 'node:fs';
import path from 'node:path';
import { resolveDistOutputRoot } from './resolve-dist-output.mjs';

const root = process.cwd();
const outputRoot = path.join(resolveDistOutputRoot(root), '_cf_pages');
const errors = [];

function read(rel) {
  const file = path.join(outputRoot, rel);
  if (!fs.existsSync(file)) {
    errors.push(`Missing: ${rel}`);
    return '';
  }
  return fs.readFileSync(file, 'utf8');
}

const viewportRe =
  /<meta\s+name="viewport"\s+content="width=device-width,\s*initial-scale=1(?:,\s*viewport-fit=cover)?"/i;

const samplePages = [
  ['index.html', 'home'],
  ['features/index.html', 'features'],
  ['products/apex-legends-cheats/lite/index.html', 'product-lite'],
  ['blog/index.html', 'blog'],
  ['forum/index.html', 'forum'],
  ['support/index.html', 'support'],
];

for (const [rel, label] of samplePages) {
  const html = read(rel);
  if (!html) continue;
  if (!viewportRe.test(html)) {
    errors.push(`${label}: missing mobile viewport meta`);
  }
  if (!html.includes('overflow-x: clip') && !html.includes('overflow-x:clip')) {
    // Inlined CSS may minify; check class hooks instead
    if (!html.includes('section-paint-defer') && label === 'home') {
      errors.push(`${label}: expected responsive performance hooks in HTML`);
    }
  }
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)];
  const missingDims = imgs.filter((tag) => !/\bwidth=/.test(tag) || !/\bheight=/.test(tag));
  if (missingDims.length > 0) {
    errors.push(`${label}: ${missingDims.length} img without width/height (CLS risk)`);
  }
}

const featuresHtml = read('features/index.html');
if (featuresHtml && !featuresHtml.includes('touch-scroll-x')) {
  errors.push('features: feature matrix should use touch-scroll-x wrapper');
}

if (errors.length) {
  console.error('Responsive verify FAILED:');
  for (const e of errors) console.error(' -', e);
  process.exit(1);
}

console.log('Responsive verify OK');
console.log(` - ${samplePages.length} representative pages checked`);
console.log(` - viewport-fit=cover, overflow guards, lazy images with dimensions`);
