/** Blog index topic filters + Starwind sort select. */
const BLOG_FILTERS_ABORT = Symbol('blog-filters-abort');

export function initBlogIndexFilters(emptyMessage: string) {
  const grid = document.getElementById('blog-grid');
  const emptyEl = document.getElementById('blog-empty');
  const sortRoot = document.getElementById('blog-sort-select');
  const featuredSlot = document.getElementById('blog-featured-slot');
  if (!grid) return;

  const host = grid.parentElement ?? document.body;
  const prev = (host as HTMLElement & { [BLOG_FILTERS_ABORT]?: AbortController })[BLOG_FILTERS_ABORT];
  prev?.abort();
  const abort = new AbortController();
  (host as HTMLElement & { [BLOG_FILTERS_ABORT]?: AbortController })[BLOG_FILTERS_ABORT] = abort;
  const signal = abort.signal;

  const toolbar = document.querySelector<HTMLElement>('[data-blog-filters]');
  const filters = toolbar
    ? toolbar.querySelectorAll<HTMLButtonElement>('[data-blog-filter]')
    : document.querySelectorAll<HTMLButtonElement>('[data-blog-filter]');

  const cards = () => {
    const list: HTMLElement[] = [];
    const featured = featuredSlot?.querySelector<HTMLElement>('[data-blog-card]');
    if (featured) list.push(featured);
    list.push(...grid.querySelectorAll<HTMLElement>('[data-blog-card]'));
    return list;
  };

  const activeTag = () => {
    const scope = toolbar ?? document;
    return (
      scope.querySelector<HTMLButtonElement>('[data-blog-filter][aria-pressed="true"]')?.getAttribute(
        'data-blog-filter',
      ) ?? 'all'
    );
  };

  const getSortSelectRoot = () => sortRoot?.querySelector<HTMLElement>('[data-sw-select]');

  const getSort = () => {
    const root = getSortSelectRoot();
    const fromAttr = root?.getAttribute('data-value');
    if (fromAttr) return fromAttr;
    const input = sortRoot?.querySelector<HTMLInputElement>('[data-sw-select-input]');
    return input?.value || 'newest';
  };

  const compareCards = (a: HTMLElement, b: HTMLElement, sort: string) => {
    const tsA = Number(a.getAttribute('data-ts') ?? 0);
    const tsB = Number(b.getAttribute('data-ts') ?? 0);
    const readA = Number(a.getAttribute('data-read-minutes') ?? 0);
    const readB = Number(b.getAttribute('data-read-minutes') ?? 0);
    if (sort === 'oldest') return tsA - tsB;
    if (sort === 'short') return readA - readB;
    if (sort === 'long') return readB - readA;
    return tsB - tsA;
  };

  const apply = () => {
    const tag = activeTag();
    const sort = getSort();
    const items = cards();
    const gridCards = [...grid.querySelectorAll<HTMLElement>('[data-blog-card]')];

    const sortedGrid = [...gridCards].sort((a, b) => compareCards(a, b, sort));
    sortedGrid.forEach((el) => grid.appendChild(el));

    let visibleCount = 0;
    items.forEach((el) => {
      const match = tag === 'all' || el.getAttribute('data-tag') === tag;
      el.classList.toggle('hidden', !match);
      if (match) visibleCount += 1;
    });

    if (featuredSlot) {
      const featuredCard = featuredSlot.querySelector('[data-blog-card]');
      const showFeatured =
        featuredCard && (tag === 'all' || featuredCard.getAttribute('data-tag') === tag);
      featuredSlot.classList.toggle('hidden', !showFeatured);
    }

    if (emptyEl) {
      emptyEl.classList.toggle('hidden', visibleCount > 0);
      emptyEl.textContent = emptyMessage;
    }
  };

  filters.forEach((btn) => {
    btn.addEventListener(
      'click',
      () => {
        filters.forEach((b) => b.setAttribute('aria-pressed', 'false'));
        btn.setAttribute('aria-pressed', 'true');
        apply();
      },
      { signal },
    );
  });

  const bindSortListeners = () => {
    const selectRoot = getSortSelectRoot();
    const input = sortRoot?.querySelector<HTMLInputElement>('[data-sw-select-input]');
    if (!selectRoot && !input) return false;

    selectRoot?.addEventListener('starwind:value-change', apply, { signal });
    input?.addEventListener('change', apply, { signal });
    input?.addEventListener('input', apply, { signal });

    if (selectRoot) {
      const observer = new MutationObserver(() => apply());
      observer.observe(selectRoot, { attributes: true, attributeFilter: ['data-value'] });
      signal.addEventListener('abort', () => observer.disconnect());
    }

    return true;
  };

  document.addEventListener(
    'starwind:init',
    () => {
      bindSortListeners();
      apply();
    },
    { signal },
  );

  bindSortListeners();
  requestAnimationFrame(apply);
  window.setTimeout(apply, 0);
  window.setTimeout(apply, 120);
}
