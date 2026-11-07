import fs from 'node:fs';
import path from 'node:path';
import { resolveDistImagesDir, resolveDistOutputRoot } from './resolve-dist-output.mjs';
import { getSitemapSiteOrigin } from './site-origin.mjs';

const MAX_IMAGE_SITEMAP_URLS = 50000;

const root = process.cwd();
const outputRoot = resolveDistOutputRoot(root);
const relRoot = path.relative(root, outputRoot).split(path.sep).join('/') || 'dist';
const distImages = resolveDistImagesDir(root);
const outPath = path.join(outputRoot, 'sitemap-images.xml');
const base = getSitemapSiteOrigin();

function walkImages(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkImages(full, acc);
    } else if (/\.webp$/i.test(entry.name)) {
      acc.push(full);
    }
  }
  return acc;
}

const imagesRootExists = fs.existsSync(distImages);
const files = walkImages(distImages);
const today = new Date().toISOString().slice(0, 10);

if (!imagesRootExists) {
  console.error(
    `write-image-sitemap: images directory missing at ${path.relative(root, distImages)} (output root: ${relRoot}).`,
  );
  process.exit(1);
}

if (files.length === 0) {
  console.error(
    `write-image-sitemap: no WebP files under ${path.relative(root, distImages)} — check astro build output path.`,
  );
  process.exit(1);
}

if (files.length > MAX_IMAGE_SITEMAP_URLS) {
  console.error(
    `write-image-sitemap: ${files.length} URLs exceeds sitemap limit (${MAX_IMAGE_SITEMAP_URLS}).`,
  );
  process.exit(1);
}

const body = files
  .map((file) => {
    const rel = path.relative(distImages, file).split(path.sep).join('/');
    const loc = `${base}/images/${rel}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

fs.writeFileSync(outPath, xml, 'utf8');
console.log(`Image sitemap: ${files.length} WebP URLs → ${relRoot}/sitemap-images.xml`);
