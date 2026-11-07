/** Intended production SEO origin (not workers.dev). Override with PUBLIC_SITE_ORIGIN at build/runtime. */
const DEFAULT_PUBLIC_SITE_ORIGIN = 'https://apexlegendcheats.com';

function normalizeOrigin(value: string): string {
  return value.trim().replace(/\/+$/, '');
}

export function getPublicSiteOrigin(): string {
  const fromEnv = import.meta.env.PUBLIC_SITE_ORIGIN as string | undefined;
  if (fromEnv?.trim()) return normalizeOrigin(fromEnv);
  return DEFAULT_PUBLIC_SITE_ORIGIN;
}
