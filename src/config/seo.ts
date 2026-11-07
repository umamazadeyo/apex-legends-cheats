import { t } from '../i18n';
import { SITE_DOMAIN as INDEXNOW_HOST_NAME } from './site';
import { getPageSeoEntry } from './pageSeo';
import { getPublicSiteOrigin } from './public-site-origin';
import { HOME_SITE_META } from './site-meta';

export const SITE_ORIGIN = getPublicSiteOrigin();

export const DEFAULT_OG_IMAGE = '/images/gameplay/apex-legends-cheats-carousel-map-terrain-esp.webp';

export const GA_MEASUREMENT_ID = import.meta.env.PUBLIC_GA_MEASUREMENT_ID as string | undefined;

/** @example @apexlegendcheats */
export const TWITTER_SITE = import.meta.env.PUBLIC_TWITTER_SITE as string | undefined;

export const TWITTER_CREATOR = import.meta.env.PUBLIC_TWITTER_CREATOR as string | undefined;

/** Comma-separated profile URLs (X, YouTube, etc.) for Organization sameAs. */
export function getOrganizationSameAs(): string[] {
  const raw = import.meta.env.PUBLIC_ORG_SAME_AS as string | undefined;
  if (!raw?.trim()) return [];
  return raw
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export const INDEXNOW_KEY = import.meta.env.INDEXNOW_KEY as string | undefined;

export function canonicalUrl(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return `${SITE_ORIGIN}${path}`;
}

export function absoluteAssetUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}

export function resolvePageSeo(pathname: string): { title: string; description: string } {
  const entry = getPageSeoEntry(pathname);
  if (entry) return entry;
  return { title: HOME_SITE_META.title, description: HOME_SITE_META.description };
}

export function pageTitle(keyword: string, brand = t.site.name): string {
  const suffix = ` | ${brand}`;
  const max = 60;
  const full = `${keyword}${suffix}`;
  if (full.length <= max) return full;
  const budget = Math.max(24, max - suffix.length);
  let trimmed = keyword.slice(0, budget).trim();
  const lastSpace = trimmed.lastIndexOf(' ');
  if (lastSpace >= 20) trimmed = trimmed.slice(0, lastSpace).trim();
  return `${trimmed}${suffix}`;
}

export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;

export const RSS_FEED_PATH = '/rss.xml';

/** Used by IndexNow postbuild script. */
export const INDEXNOW_HOST = INDEXNOW_HOST_NAME;
