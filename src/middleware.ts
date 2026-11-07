import { defineMiddleware } from 'astro:middleware';
import { resolveCheckoutPathRedirect } from './config/checkout-redirects.mjs';
import { PREVIEW_ROBOTS_HEADER, shouldApplyPreviewNoindex } from './utils/preview-host';

export const onRequest = defineMiddleware(async (context, next) => {
  const destination = resolveCheckoutPathRedirect(new URL(context.request.url).pathname);
  if (destination) {
    return context.redirect(destination, 302);
  }

  const response = await next();
  const requestUrl = new URL(context.request.url);
  const host = requestUrl.hostname;
  const pathname = requestUrl.pathname;

  if (
    shouldApplyPreviewNoindex(host, pathname, response.headers.get('content-type'))
  ) {
    response.headers.set('X-Robots-Tag', PREVIEW_ROBOTS_HEADER);
  }

  return response;
});
