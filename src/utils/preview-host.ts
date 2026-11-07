const PREVIEW_NOINDEX = 'noindex, nofollow';

const INDEXABLE_MEDIA = new Set([
  'text/html',
  'application/xhtml+xml',
  'application/xml',
  'text/xml',
  'application/rss+xml',
  'application/atom+xml',
]);

export function isWorkersDevHostname(hostname: string): boolean {
  const host = hostname.split(':')[0].toLowerCase();
  return host === 'workers.dev' || host.endsWith('.workers.dev');
}

export function isIndexableMime(contentType: string | null | undefined): boolean {
  if (!contentType) return false;
  const base = contentType.split(';')[0]?.trim().toLowerCase() ?? '';
  return INDEXABLE_MEDIA.has(base);
}

/** Path-based fallback when asset servers omit Content-Type on HTML. */
export function pathLooksIndexable(pathname: string): boolean {
  if (pathname === '/robots.txt') return false;
  if (/\.(webp|png|jpe?g|gif|svg|ico|css|js|mjs|woff2?|map)$/i.test(pathname)) return false;
  if (pathname.endsWith('.xml') || pathname.endsWith('.html')) return true;
  if (pathname.endsWith('/')) return true;
  return !pathname.includes('.');
}

export function shouldApplyPreviewNoindex(hostname: string, pathname: string, contentType?: string | null): boolean {
  if (!isWorkersDevHostname(hostname)) return false;
  if (pathname === '/robots.txt') return false;
  return isIndexableMime(contentType) || pathLooksIndexable(pathname);
}

export const PREVIEW_ROBOTS_HEADER = PREVIEW_NOINDEX;
