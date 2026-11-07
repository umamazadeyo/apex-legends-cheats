/**
 * Cloudflare Worker in front of static assets — adds X-Robots-Tag on *.workers.dev only.
 * Production SEO URLs remain https://apexlegendcheats.com via HTML canonicals and sitemaps.
 */

const INDEXABLE_MEDIA = new Set([
  'text/html',
  'application/xhtml+xml',
  'application/xml',
  'text/xml',
  'application/rss+xml',
  'application/atom+xml',
]);

function isWorkersDev(hostname) {
  const host = hostname.split(':')[0].toLowerCase();
  return host === 'workers.dev' || host.endsWith('.workers.dev');
}

function isIndexableMime(contentType) {
  if (!contentType) return false;
  const base = contentType.split(';')[0]?.trim().toLowerCase() ?? '';
  return INDEXABLE_MEDIA.has(base);
}

function pathLooksIndexable(pathname) {
  if (pathname === '/robots.txt') return false;
  if (/\.(webp|png|jpe?g|gif|svg|ico|css|js|mjs|woff2?|map)$/i.test(pathname)) return false;
  if (pathname.endsWith('.xml') || pathname.endsWith('.html')) return true;
  if (pathname.endsWith('/')) return true;
  return !pathname.includes('.');
}

export default {
  async fetch(request, env) {
    const response = await env.SITE_ASSETS.fetch(request);
    const url = new URL(request.url);

    if (!isWorkersDev(url.hostname)) {
      return response;
    }

    const headers = new Headers(response.headers);
    const contentType = headers.get('content-type');
    if (
      url.pathname !== '/robots.txt' &&
      (isIndexableMime(contentType) || pathLooksIndexable(url.pathname))
    ) {
      headers.set('X-Robots-Tag', 'noindex, nofollow');
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
