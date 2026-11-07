import fs from 'node:fs';
import path from 'node:path';
import { resolveAstroSitemapPart, resolveDistOutputRoot } from './resolve-dist-output.mjs';
import { getPublicSiteOrigin } from './site-origin.mjs';

const root = process.cwd();
const outputRoot = resolveDistOutputRoot(root);
const relRoot = path.relative(root, outputRoot).split(path.sep).join('/') || 'dist';
const source = resolveAstroSitemapPart(outputRoot);

if (!source) {
  console.error(
    `finalize-sitemap: no Astro sitemap part (sitemap-0.xml) under ${relRoot} — run astro build first.`,
  );
  console.error(`Searched: ${relRoot}/sitemap-0.xml and child refs from ${relRoot}/sitemap-index.xml`);
  process.exit(1);
}

const raw = fs.readFileSync(source, 'utf8');
const urlCount = (raw.match(/<url>/g) ?? []).length;

if (urlCount === 0) {
  console.error(`finalize-sitemap: ${path.basename(source)} contains no URLs.`);
  process.exit(1);
}

function formatUrlset(xml) {
  return xml
    .replace(/^<\?xml[^?]*\?>/, '<?xml version="1.0" encoding="UTF-8"?>\n')
    .replace(/<urlset([^>]*)>/, '<urlset$1>\n')
    .replace(/<\/urlset>/, '\n</urlset>\n')
    .replace(/<url>/g, '  <url>\n')
    .replace(/<\/url>/g, '\n  </url>\n')
    .replace(/<loc>/g, '    <loc>')
    .replace(/<\/loc>/g, '</loc>\n')
    .replace(/<lastmod>/g, '    <lastmod>')
    .replace(/<\/lastmod>/g, '</lastmod>\n')
    .replace(/<changefreq>/g, '    <changefreq>')
    .replace(/<\/changefreq>/g, '</changefreq>\n')
    .replace(/<priority>/g, '    <priority>')
    .replace(/<\/priority>/g, '</priority>\n');
}

const formatted = formatUrlset(raw);
fs.writeFileSync(path.join(outputRoot, 'sitemap.xml'), formatted, 'utf8');

const siteOrigin = getPublicSiteOrigin();
const today = new Date().toISOString().slice(0, 10);
const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteOrigin}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteOrigin}/sitemap-images.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`;
fs.writeFileSync(path.join(outputRoot, 'sitemap-index.xml'), indexXml, 'utf8');
fs.writeFileSync(path.join(outputRoot, 'sitemap-0.xml'), formatted, 'utf8');

console.log(`Sitemap finalized: ${urlCount} URLs → ${relRoot}/sitemap.xml`);
