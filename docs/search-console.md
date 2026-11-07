# Search Console workflow (apexlegendcheats.com)

Verify the domain at your DNS provider—no HTML meta tags in the repo.

## Setup (once)

1. Open [Google Search Console](https://search.google.com/search-console) and add the **domain** property for `apexlegendcheats.com` if it is not already there.
2. Under **Sitemaps**, submit: `https://apexlegendcheats.com/sitemap.xml`
3. Repeat in [Bing Webmaster Tools](https://www.bing.com/webmasters) if you use Bing.

## Monthly tune (15 minutes)

1. Search Console → **Performance** → **Search results**.
2. Sort by **Impressions** (last 28 days).
3. For each query that already maps to a page on your site, open the matching path in [`src/config/pageSeo.ts`](../src/config/pageSeo.ts).
4. Adjust `title` and `description` so the primary query appears naturally in the title (avoid mid-word truncation; product pages use `seoTitle` in [`src/data/products.ts`](../src/data/products.ts) plus `pageTitle()` in [`src/config/seo.ts`](../src/config/seo.ts)).
5. Deploy. Allow 1–2 weeks before judging click-through changes.

## Path cheat sheet

| Common query intent | Edit path in `pageSeo.ts` or product `seoTitle` |
| ------------------- | ------------------------------------------------- |
| Apex Legends cheats (broad) | `/` via [`src/config/site-meta.ts`](../src/config/site-meta.ts) |
| Buy / compare tiers | `/products/apex-legends-cheats/` |
| lite / pro / elite | Product `seoTitle` on tier pages |
| map hack, scripts, features hub | `/features/`, blog posts |
| hwid, skin changer | `/products/apex-legends-cheats/utilities/` |
| purchase / refund | `/terms/`, `/support/` |

Product tier and utility titles live in `products.ts`; hub and legal/support routes use `PAGE_SEO`. Homepage copy is centralized in `site-meta.ts` (shared with `pageSeo` and i18n defaults).
