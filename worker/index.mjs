/**
 * Cloudflare Worker in front of static assets — adds X-Robots-Tag on *.workers.dev only.
 * Production SEO URLs remain https://apexlegendcheats.com via HTML canonicals and sitemaps.
 */

import { resolveCheckoutPathRedirect } from '../src/config/checkout-redirects.mjs';

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

function xmlContentType(pathname) {
  if (pathname.endsWith('.xml')) return 'application/xml; charset=utf-8';
  return null;
}

function previewRobotsTxt(origin) {
  return `User-agent: *
Allow: /

Disallow: /go/

Sitemap: ${origin}/sitemap.xml
Sitemap: ${origin}/sitemap-images.xml
`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const checkoutTarget = resolveCheckoutPathRedirect(url.pathname);
    if (checkoutTarget) {
      return Response.redirect(checkoutTarget, 302);
    }

    if (url.pathname === '/robots.txt' && isWorkersDev(url.hostname)) {
      const origin = `${url.protocol}//${url.host}`;
      return new Response(previewRobotsTxt(origin), {
        status: 200,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    const response = await env.SITE_ASSETS.fetch(request);

    const headers = new Headers(response.headers);
    const forcedXml = xmlContentType(url.pathname);
    if (forcedXml) {
      headers.set('Content-Type', forcedXml);
    }

    if (!isWorkersDev(url.hostname)) {
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }
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
