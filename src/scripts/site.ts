function initFonts() {
  const root = document.documentElement;

  const markReady = () => {
    root.classList.remove('fonts-pending');
    root.classList.add('fonts-ready');
  };

  if (!document.fonts?.ready) {
    markReady();
    return;
  }

  document.fonts.ready.then(markReady).catch(markReady);
}

function initNavHighlight() {
  const path = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';

  document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]').forEach((link) => {
    const href = link.getAttribute('href') ?? '';
    const linkPath = href.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';
    let isActive = false;

    if (linkPath === '/') {
      isActive = path === '/';
    } else {
      isActive = path === linkPath || path.startsWith(`${linkPath}/`);
    }

    link.classList.toggle('is-active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function getScrollMarginTop(): number {
  const rootStyles = getComputedStyle(document.documentElement);
  const raw = rootStyles.getPropertyValue('--floating-nav-clearance').trim();
  let offset = Number.parseFloat(raw);
  if (Number.isNaN(offset)) offset = 5.25 * 16;
  else if (raw.endsWith('rem')) offset *= 16;
  return offset + 8;
}

function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return false;
  const top = target.getBoundingClientRect().top + window.scrollY - getScrollMarginTop();
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  return true;
}

function initInPageScroll() {
  document.querySelectorAll<HTMLElement>('[data-scroll-target]').forEach((el) => {
    el.addEventListener('click', (event) => {
      const id = el.getAttribute('data-scroll-target');
      if (!id) return;

      const href = el.getAttribute('href') ?? '';
      const url = new URL(href || window.location.href, window.location.origin);
      const here = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';
      const destPath = url.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';

      if (destPath !== here) return;

      if (!scrollToId(id)) return;

      event.preventDefault();
    });
  });

  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const id = hash.slice(1);
      if (!id || !scrollToId(id)) return;
      event.preventDefault();
      history.replaceState(null, '', hash);
    });
  });
}

function initSkipLink() {
  document.querySelectorAll<HTMLElement>('[data-skip-to-main]').forEach((button) => {
    button.addEventListener('click', () => {
      const main = document.getElementById('main-content');
      if (!main) return;

      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: false });
      main.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initFaqFilters() {
  document.querySelectorAll('[data-faq-filters]').forEach((container) => {
    const section = container.closest('[data-faq-section]');
    const list = section?.querySelector('[data-faq-list]');
    if (!list) return;

    const items = list.querySelectorAll<HTMLElement>('[data-faq-topic]');
    const chips = container.querySelectorAll<HTMLButtonElement>('[data-faq-filter]');

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const topic = chip.getAttribute('data-faq-filter');
        chips.forEach((c) => c.classList.toggle('is-active', c === chip));
        items.forEach((item) => {
          const itemTopic = item.getAttribute('data-faq-topic');
          const show = topic === 'all' || itemTopic === topic;
          item.toggleAttribute('data-hidden', !show);
        });
      });
    });
  });
}

function initThemeMetaColor() {
  const metaTheme = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (!metaTheme) return;

  const update = () => {
    metaTheme.content = document.documentElement.classList.contains('dark') ? '#7F3DEE' : '#f5f7fa';
  };

  update();
  const observer = new MutationObserver(update);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
}

function initHashOnLoad() {
  const id = window.location.hash.slice(1);
  if (!id) return;
  requestAnimationFrame(() => scrollToId(id));
}

/** Checkout CTAs: navigate immediately (no interaction delay on animated buttons). */
function initCheckoutLinks() {
  document.addEventListener(
    'click',
    (event) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[href^="/go/"]');
      if (!link || event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      if (link.target && link.target !== '_self') return;
      event.preventDefault();
      window.location.assign(link.href);
    },
    true,
  );
}

function bootSite() {
  initFonts();
  initFaqFilters();
  initNavHighlight();
  initInPageScroll();
  initHashOnLoad();
  initSkipLink();
  initThemeMetaColor();
  initCheckoutLinks();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootSite);
} else {
  bootSite();
}
