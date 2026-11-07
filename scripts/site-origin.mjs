/** Node/build scripts — same semantics as src/config/public-site-origin.ts */
const DEFAULT = 'https://apexlegendcheats.com';

export function getPublicSiteOrigin() {
  const raw = process.env.PUBLIC_SITE_ORIGIN?.trim();
  const origin = raw || DEFAULT;
  return origin.replace(/\/+$/, '');
}
