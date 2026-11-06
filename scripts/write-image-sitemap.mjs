import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const distImages = path.join(root, 'dist', 'images');
const outPath = path.join(root, 'dist', 'sitemap-images.xml');
const base = 'https://apexlegendcheats.com';

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

const files = walkImages(distImages);
const today = new Date().toISOString().slice(0, 10);

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
console.log(`Image sitemap: ${files.length} WebP URLs → dist/sitemap-images.xml`);
