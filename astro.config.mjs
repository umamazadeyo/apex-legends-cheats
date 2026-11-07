import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';
import { CHECKOUT_PATH_REDIRECTS } from './src/config/checkout-redirects.mjs';

/** Static 302 stubs so /go/* works without the Worker (Cloudflare assets). */
const checkoutRedirects = Object.fromEntries(CHECKOUT_PATH_REDIRECTS);

const publicSiteOrigin =
  (typeof process !== 'undefined' && process.env.PUBLIC_SITE_ORIGIN?.trim()) ||
  'https://apexlegendcheats.com';

export default defineConfig({
  site: publicSiteOrigin.replace(/\/+$/, ''),
  env: {
    schema: {
      PUBLIC_SITE_ORIGIN: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
    },
  },
  trailingSlash: 'always',
  redirects: {
    ...checkoutRedirects,
    '/cheats/': '/products/apex-legends-cheats/',
    '/cheats/lite/': '/products/apex-legends-cheats/lite/',
    '/cheats/pro/': '/products/apex-legends-cheats/pro/',
    '/cheats/elite/': '/products/apex-legends-cheats/elite/',
    '/cheats/compare/': '/blog/best-apex-legends-cheats-product-comparison-buying-guide/',
    '/products/dota-2-cheats/': '/products/apex-legends-cheats/',
    '/products/dota-2-cheats/lite/': '/products/apex-legends-cheats/lite/',
    '/products/dota-2-cheats/pro/': '/products/apex-legends-cheats/pro/',
    '/products/dota-2-cheats/elite/': '/products/apex-legends-cheats/elite/',
    '/products/dota-2-cheats/hwid-spoofer/': '/products/apex-legends-cheats/hwid-spoofer/',
    '/products/dota-2-cheats/ugc/': '/products/apex-legends-cheats/ugc/',
    '/products/dota-2-cheats/unlock-all/': '/products/apex-legends-cheats/unlock-all/',
    '/products/dota-2-cheats/utilities/': '/products/apex-legends-cheats/utilities/',
    '/contact/': '/support/',
    '/blog/apex-legends-lite-vs-pro/': '/blog/best-apex-legends-cheats-product-comparison-buying-guide/',
    '/blog/apex-legends-cheat-features-guide/':
      '/blog/apex-legends-cheats-compare-available-products-and-features/',
    '/blog/how-to-buy-apex-legends-cheats-2026/':
      '/blog/apex-legends-cheat-purchase-guide-payment-delivery-access/',
    '/blog/easy-anti-cheat-patch-checklist/':
      '/blog/apex-legends-cheat-updates-current-version-compatibility/',
    '/blog/apex-legends-ea-app-steam-loader/': '/blog/apex-legends-cheats-for-pc-compatibility-requirements/',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/go/'),
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      modulePreload: { polyfill: false },
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
});
