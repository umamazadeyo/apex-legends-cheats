/**
 * Cloudflare Worker in front of static assets — adds X-Robots-Tag on *.workers.dev only.
 * Production SEO URLs remain https://apexlegendcheats.com via HTML canonicals and sitemaps.
 */

const CHECKOUT_REDIRECTS = new Map([
  ['/go/apex-legends', 'https://zadeyo.com/go/UMAMA?to=%2Fproducts%2Fapex-legends'],
  ['/go/apex-legends/', 'https://zadeyo.com/go/UMAMA?to=%2Fproducts%2Fapex-legends'],
  ['/go/dota-2', 'https://zadeyo.com/go/UMAMA?to=%2Fproducts%2Fapex-legends'],
  ['/go/dota-2/', 'https://zadeyo.com/go/UMAMA?to=%2Fproducts%2Fapex-legends'],
  ['/go/skin-changer', 'https://zadeyo.com/go/UMAMA?to=%2Fproducts%2Fskin-changer'],
  ['/go/skin-changer/', 'https://zadeyo.com/go/UMAMA?to=%2Fproducts%2Fskin-changer'],
  ['/go/hwid-spoofer', 'https://zadeyo.com/go/UMAMA?to=%2Fproducts%2Fhwid-spoofer'],
  ['/go/hwid-spoofer/', 'https://zadeyo.com/go/UMAMA?to=%2Fproducts%2Fhwid-spoofer'],
  ['/go/ugc', 'https://zadeyo.com/go/UMAMA?to=%2Fproducts%2Fugc'],
  ['/go/ugc/', 'https://zadeyo.com/go/UMAMA?to=%2Fproducts%2Fugc'],
]);

const PRODUCTION_ORIGIN = 'https://apexlegendcheats.com';

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

function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_REDIRECTS.get(pathname);
  if (direct) return direct;
  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_REDIRECTS.get(`${pathname}/`) ?? null;
  }
  return null;
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

function normalizeTrailingSlash(pathname) {
  if (pathname === '/' || pathname.endsWith('/')) return pathname;
  return `${pathname}/`;
}

function rewritePreviewHtml(html, origin, pathname) {
  const path = normalizeTrailingSlash(pathname);
  const self = `${origin}${path}`;
  let out = html.replaceAll(PRODUCTION_ORIGIN, origin);
  out = out.replace(
    /(<link rel="canonical" href=")[^"]+(")/,
    `$1${self}$2`,
  );
  out = out.replace(
    /(<link rel="alternate" hreflang="en" href=")[^"]+(")/g,
    `$1${self}$2`,
  );
  out = out.replace(
    /(<link rel="alternate" hreflang="x-default" href=")[^"]+(")/g,
    `$1${self}$2`,
  );
  out = out.replace(/(<meta property="og:url" content=")[^"]+(")/, `$1${self}$2`);
  return out;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const checkoutTarget = resolveCheckoutPathRedirect(url.pathname);
    if (checkoutTarget) {
      const dest = new URL(checkoutTarget);
      url.searchParams.forEach((value, key) => {
        dest.searchParams.set(key, value);
      });
      return Response.redirect(dest.toString(), 302);
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

    const preview = isWorkersDev(url.hostname);
    const contentType = headers.get('content-type') ?? '';
    const isHtml =
      contentType.includes('text/html') || (preview && pathLooksIndexable(url.pathname) && !url.pathname.includes('.'));
    const isXml = url.pathname.endsWith('.xml');

    if (preview && response.ok && (isXml || isHtml)) {
      const origin = `${url.protocol}//${url.host}`;
      let body = await response.text();
      if (isXml) {
        body = body.replaceAll(PRODUCTION_ORIGIN, origin);
      } else if (isHtml) {
        body = rewritePreviewHtml(body, origin, url.pathname);
      }
      if (
        url.pathname !== '/robots.txt' &&
        (isIndexableMime(contentType) || pathLooksIndexable(url.pathname))
      ) {
        headers.set('X-Robots-Tag', 'noindex, nofollow');
      }
      return new Response(body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

    if (!preview) {
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

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
