/**
 * SIRM Tech - site behavior.
 * Theme toggle (persisted), mobile nav drawer, scroll-reveal via
 * IntersectionObserver (no scroll listeners), and the contact form's
 * submit -> confirmation cycle.
 */
(() => {
  'use strict';

  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- theme toggle ----
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('sirm-theme', theme);
  }
  function initTheme() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      setTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  // ---- mobile nav drawer ----
  function initNav() {
    const toggle = document.getElementById('navToggle');
    if (!toggle) return;
    const close = () => {
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
      const open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.mobile-drawer a').forEach((a) => a.addEventListener('click', close));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 1023) close(); });
  }

  // ---- scroll reveal ----
  function initReveal() {
    const targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });
    targets.forEach((el) => io.observe(el));
  }

  // ---- contact form ----
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const band = document.getElementById('ctaBand');
    const errorEl = document.getElementById('contactError');
    if (!form || !band) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('contactEmail');
      const valid = input.value.trim() !== '' && input.checkValidity();

      if (!valid) {
        input.classList.add('invalid');
        errorEl.textContent = 'Enter a work email address to continue.';
        input.focus();
        return;
      }

      input.classList.remove('invalid');
      errorEl.textContent = '';

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalLabel = submitBtn.textContent.trim();
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      window.setTimeout(() => {
        band.classList.add('is-sent');
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }, 600);
    });

    document.getElementById('contactEmail').addEventListener('input', (e) => {
      e.target.classList.remove('invalid');
      errorEl.textContent = '';
    });
  }

  function init() {
    initTheme();
    initNav();
    initReveal();
    initContactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
