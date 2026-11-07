/**
 * Astro may emit static assets to `dist/` (static) or `dist/client/` (@astrojs/cloudflare, SSR).
 * Post-build scripts use these helpers so paths match the real build output.
 */
import fs from 'node:fs';
import path from 'node:path';

function latestMtime(...files) {
  let best = -1;
  for (const file of files) {
    if (!file || !fs.existsSync(file)) continue;
    const t = fs.statSync(file).mtimeMs;
    if (t > best) best = t;
  }
  return best;
}

/**
 * @param {string} [cwd]
 * @returns {string} Absolute path to the public site root inside dist/
 */
export function resolveDistOutputRoot(cwd = process.cwd()) {
  const dist = path.join(cwd, 'dist');
  const candidates = [path.join(dist, 'client'), dist].filter((dir) => fs.existsSync(dir));

  let bestDir = candidates[candidates.length - 1] ?? dist;
  let bestTime = -1;

  for (const dir of candidates) {
    const marker = latestMtime(
      path.join(dir, 'sitemap-0.xml'),
      path.join(dir, 'sitemap-index.xml'),
      path.join(dir, 'index.html'),
    );
    if (marker > bestTime) {
      bestTime = marker;
      bestDir = dir;
    }
  }

  if (bestTime >= 0) return bestDir;

  if (fs.existsSync(path.join(dist, 'client'))) {
    return path.join(dist, 'client');
  }
  return dist;
}

/**
 * @param {string} outputRoot
 * @returns {string | null} Path to Astro's primary URL sitemap part (usually sitemap-0.xml)
 */
export function resolveAstroSitemapPart(outputRoot) {
  const direct = path.join(outputRoot, 'sitemap-0.xml');
  if (fs.existsSync(direct)) return direct;

  const indexPath = path.join(outputRoot, 'sitemap-index.xml');
  if (!fs.existsSync(indexPath)) return null;

  const indexXml = fs.readFileSync(indexPath, 'utf8');
  const locs = [...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  for (const loc of locs) {
    let pathname;
    try {
      pathname = new URL(loc).pathname;
    } catch {
      continue;
    }
    const base = path.basename(pathname);
    if (!/^sitemap-\d+\.xml$/i.test(base)) continue;
    const child = path.join(outputRoot, base);
    if (fs.existsSync(child)) return child;
  }

  return null;
}

/**
 * @param {string} [cwd]
 * @returns {string}
 */
export function resolveDistImagesDir(cwd = process.cwd()) {
  return path.join(resolveDistOutputRoot(cwd), 'images');
}

/**
 * Relative publish dir for Cloudflare Pages (from repo root).
 * @param {string} [cwd]
 */
export function resolvePagesPublishDir(cwd = process.cwd()) {
  const root = resolveDistOutputRoot(cwd);
  const rel = path.relative(cwd, root).split(path.sep).join('/');
  return rel || 'dist';
}
