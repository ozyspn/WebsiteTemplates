/**
 * Jacob Morales — site router.
 *
 * Replaces the Claude Design DCLogic state machine (state.page / state.sent,
 * sc-if blocks, {{ go* }} handlers) with a real, shareable hash router:
 *   #/home #/work #/story #/about #/pricing #/contact
 *
 * Navigation: any element with [data-nav="<page>"] routes on click.
 * Contact form: [data-contact="form"] toggles to [data-contact="sent"] on submit
 * (the prototype's notSent/sent split), and resets when you leave the page.
 */
(() => {
  'use strict';

  const PAGES = ['home', 'work', 'story', 'about', 'pricing', 'contact'];
  // Nav items that get an active dot — story has no top-nav entry in the design.
  const NAV_PAGES = ['work', 'story', 'about', 'pricing'];
  const DEFAULT = 'home';

  const pageEls = new Map();
  const navEls = new Map();
  let contactSent = false;

  function currentPage() {
    const raw = (location.hash || '').replace(/^#\/?/, '').trim().toLowerCase();
    return PAGES.includes(raw) ? raw : DEFAULT;
  }

  function render() {
    const page = currentPage();

    pageEls.forEach((el, name) => el.classList.toggle('is-active', name === page));
    navEls.forEach((el, name) => el.classList.toggle('is-active', name === page));

    // Contact view mirrors the prototype's sent / notSent conditional. Leaving
    // the page resets it so a fresh visit always shows the form.
    if (page !== 'contact') contactSent = false;
    syncContact();

    document.title = page === 'home'
      ? "Jacob Morales — Documentary Wedding Photography"
      : titleCase(page) + " · Jacob Morales";
  }

  function syncContact() {
    const sentEl = document.querySelector('[data-contact="sent"]');
    const formEl = document.querySelector('[data-contact="form"]');
    if (sentEl) sentEl.hidden = !contactSent;
    if (formEl) formEl.hidden = contactSent;
  }

  function navigate(page) {
    const next = PAGES.includes(page) ? page : DEFAULT;
    if (currentPage() === next) {
      // Same page (e.g. story → next story): no hashchange fires, so scroll now.
      scrollTop();
      return;
    }
    location.hash = '#/' + next;
  }

  function scrollTop() {
    // rAF matches the prototype: let the new view paint, then jump to top.
    requestAnimationFrame(() => {
      try { window.scrollTo({ top: 0 }); } catch (e) { window.scrollTo(0, 0); }
    });
  }

  function titleCase(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  function init() {
    PAGES.forEach((name) => {
      const el = document.querySelector('[data-page="' + name + '"]');
      if (el) pageEls.set(name, el);
    });
    NAV_PAGES.forEach((name) => {
      const el = document.querySelector('nav [data-nav="' + name + '"]');
      if (el) navEls.set(name, el);
    });

    // Delegate all in-app navigation.
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-nav]');
      if (!trigger) return;
      e.preventDefault();
      navigate(trigger.getAttribute('data-nav'));
    });

    // Contact form submit → confirmation state (no backend in the template).
    const form = document.querySelector('[data-contact="form"]');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!form.reportValidity()) return;
        contactSent = true;
        syncContact();
        scrollTop();
      });
    }

    window.addEventListener('hashchange', () => { render(); scrollTop(); });

    // Normalize a bare/invalid hash to a canonical route on first load.
    const canonical = '#/' + currentPage();
    if (location.hash !== canonical) {
      history.replaceState(null, '', canonical);
    }
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
