import fs from 'node:fs';
import path from 'node:path';
import { resolveDistOutputRoot } from './resolve-dist-output.mjs';
import { PRODUCTION_SITE_ORIGIN } from './production-site-origin.mjs';

const root = process.cwd();
const dist = resolveDistOutputRoot(root);
const cf = path.join(dist, '_cf_pages');
const outputRoot = fs.existsSync(cf) ? cf : dist;

const errors = [];
const notes = [];

function read(rel) {
  const file = path.join(outputRoot, rel.replace(/^\//, ''));
  if (!fs.existsSync(file)) {
    errors.push(`Missing file: ${rel}`);
    return '';
  }
  return fs.readFileSync(file, 'utf8');
}

function assertXml(name, rel) {
  const xml = read(rel);
  if (!xml) return;
  if (!xml.startsWith('<?xml')) errors.push(`${name}: missing XML declaration`);
  if (xml.includes('workers.dev')) errors.push(`${name}: contains workers.dev URL`);
  if (!xml.includes(PRODUCTION_SITE_ORIGIN)) errors.push(`${name}: missing production origin`);
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const loc of locs) {
    if (!loc.startsWith(PRODUCTION_SITE_ORIGIN)) errors.push(`${name}: non-production loc ${loc}`);
  }
  notes.push(`${name}: ${locs.length} URLs, valid XML header`);
}

function countH1(html) {
  return (html.match(/<h1[\s>]/gi) ?? []).length;
}

assertXml('sitemap.xml', 'sitemap.xml');
assertXml('sitemap-images.xml', 'sitemap-images.xml');

const sitemap = read('sitemap.xml');
if (sitemap.includes('/go/')) errors.push('sitemap.xml lists /go/ path');

const robots = read('robots.txt');
if (!robots.includes(`${PRODUCTION_SITE_ORIGIN}/sitemap.xml`)) {
  errors.push('robots.txt missing production sitemap URL');
}

function checkPage(rel, label) {
  const file = path.join(outputRoot, rel);
  if (!fs.existsSync(file)) {
    errors.push(`Page missing: ${rel}`);
    return;
  }
  const html = fs.readFileSync(file, 'utf8');
  const h1 = countH1(html);
  if (h1 !== 1) errors.push(`${label}: expected 1 h1, got ${h1}`);
  const canon = html.match(/rel="canonical" href="([^"]+)"/);
  if (!canon?.[1]?.startsWith(PRODUCTION_SITE_ORIGIN)) {
    errors.push(`${label}: canonical not production (${canon?.[1] ?? 'none'})`);
  }
  if (!html.includes('hreflang="en"')) errors.push(`${label}: missing hreflang en`);
  if (!html.includes('hreflang="x-default"')) errors.push(`${label}: missing x-default`);
  if (label === 'blog') {
    if (!html.includes('data-blog-filters')) errors.push('blog: missing data-blog-filters toolbar');
    if (!html.includes('Symbol("blog-filters-abort")')) {
      errors.push('blog: missing bundled blog-index filter script');
    }
    if (/<script(?![^>]*type=["']module["'])[^>]*>[\s\S]*?\bimport\s+/.test(html)) {
      errors.push('blog: import in non-module inline script (filters will not run)');
    }
  }
}

const pages = [
  ['index.html', 'home'],
  ['faq/index.html', 'faq'],
  ['features/index.html', 'features'],
  ['blog/index.html', 'blog'],
  ['forum/index.html', 'forum'],
  ['about/index.html', 'about'],
  ['blog/apex-legends-cheats-compare-available-products-and-features/index.html', 'blog-compare'],
  ['blog/apex-legends-cheats-pricing-compare-plans-subscription-options/index.html', 'blog-pricing'],
  ['blog/best-apex-legends-cheats-product-comparison-buying-guide/index.html', 'blog-buying'],
  ['products/apex-legends-cheats/lite/index.html', 'product-lite'],
];

for (const [rel, label] of pages) checkPage(rel, label);

// Crawl URLs listed in sitemap.xml (indexable production pages only).
for (const loc of [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])) {
  const pathname = new URL(loc).pathname;
  const rel =
    pathname === '/'
      ? 'index.html'
      : `${pathname.replace(/^\//, '').replace(/\/$/, '')}/index.html`;
  checkPage(rel, `sitemap:${pathname}`);
}
notes.push(`Crawled ${[...sitemap.matchAll(/<loc>/g)].length} sitemap URLs`);

if (errors.length) {
  console.error('SEO verify FAILED:');
  for (const e of errors) console.error(' -', e);
  process.exit(1);
}

console.log('SEO verify OK');
for (const n of notes) console.log(' -', n);
console.log(`Checked HTML under ${path.relative(root, outputRoot)}`);
