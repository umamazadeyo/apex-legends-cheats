import type { APIRoute } from 'astro';
import { getPublicSiteOrigin } from '../config/public-site-origin';

export const prerender = true;

export const GET: APIRoute = () => {
  const origin = getPublicSiteOrigin();
  const body = `User-agent: *
Allow: /

Disallow: /go/

Sitemap: ${origin}/sitemap.xml
Sitemap: ${origin}/sitemap-images.xml

# RSS: ${origin}/rss.xml
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
