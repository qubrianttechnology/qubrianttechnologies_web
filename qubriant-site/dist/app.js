/* Qubriant — framework-free interactions and accessible motion. */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const heroVideo = $('.hero-video');
  if (heroVideo) {
    heroVideo.muted = true;
    if (reducedMotion.matches) {
      heroVideo.autoplay = false;
      heroVideo.pause();
    }
    reducedMotion.addEventListener('change', event => { if (event.matches) heroVideo.pause(); });
  }
  const header = $('.site-header');
  const themeButton = $('.theme-toggle');
  const menuButton = $('.menu-toggle');
  const mobileMenu = $('#mobile-menu');
  const quoteDialog = $('#quote-dialog');
  let quoteTrigger = null;
  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      header.classList.toggle('scrolled', scrollY > 35);
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function syncTheme() {
    const dark = document.documentElement.dataset.theme === 'dark';
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }
  syncTheme();
  themeButton.addEventListener('click', () => {
    const dark = document.documentElement.dataset.theme !== 'dark';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    try { localStorage.setItem('qubriant-theme', dark ? 'dark' : 'light'); } catch { /* Storage can be disabled. */ }
    syncTheme();
  });

  function closeMenu(restoreFocus = false) {
    mobileMenu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    document.body.classList.remove('menu-open');
    if (restoreFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    if (!mobileMenu.hidden) return closeMenu();
    mobileMenu.hidden = false;
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Close navigation');
    document.body.classList.add('menu-open');
    $('a', mobileMenu).focus();
  });
  $$('#mobile-menu a').forEach(a => a.addEventListener('click', () => closeMenu()));
  addEventListener('resize', () => { if (innerWidth >= 1024) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileMenu.hidden) closeMenu(true);
    if (event.key === 'Tab' && !mobileMenu.hidden && !quoteDialog.open) {
      const focusables = [menuButton, ...$$('a,button', mobileMenu)];
      const first = focusables[0], last = focusables.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  $$('[data-quote]').forEach(button => button.addEventListener('click', () => {
    quoteTrigger = button;
    closeMenu();
    quoteDialog.showModal();
    document.body.classList.add('modal-open');
  }));
  $('.dialog-close').addEventListener('click', () => quoteDialog.close());
  quoteDialog.addEventListener('click', event => { if (event.target === quoteDialog) quoteDialog.close(); });
  quoteDialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    if (quoteTrigger?.offsetParent) quoteTrigger.focus();
    else menuButton.focus();
  });

  // A static site prepares a draft; it never claims an enquiry was sent.
  $$('.project-form').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name')).trim();
    const subject = `Project enquiry — ${data.get('type')} — ${name}`;
    const body = `Hello Qubriant,\n\nName: ${name}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone') || 'Not provided'}\nProject type: ${data.get('type')}\nBudget: ${data.get('budget')}\n\nProject details:\n${String(data.get('details')).trim()}\n\nThank you,\n${name}`;
    const mailto = `mailto:info@qubriant.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const status = $('.form-status', form);
    status.replaceChildren();
    status.hidden = false;
    const message = document.createElement('p');
    message.textContent = 'Your enquiry draft is ready. Open it in your email app, review it, and send it when you are ready.';
    const open = document.createElement('a');
    open.href = mailto;
    open.textContent = 'Open email draft';
    const copy = document.createElement('button');
    copy.type = 'button';
    copy.textContent = 'Copy enquiry text';
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(`To: info@qubriant.com\nSubject: ${subject}\n\n${body}`);
        copy.textContent = 'Copied to clipboard';
      } catch {
        const text = document.createElement('textarea');
        text.value = `To: info@qubriant.com\nSubject: ${subject}\n\n${body}`;
        text.readOnly = true;
        text.setAttribute('aria-label', 'Your enquiry text — select and copy');
        status.append(text);
        text.select();
        copy.hidden = true;
      }
    });
    status.append(message, open, document.createElement('br'), copy);
    status.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'nearest' });
  }));

  // Reveal once; content remains visible when scripts or observers are unavailable.
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    document.documentElement.classList.add('js-motion');
    const reveals = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          reveals.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -25px 0px' });
    $$('.reveal').forEach(el => reveals.observe(el));
    reducedMotion.addEventListener('change', e => {
      if (e.matches) document.documentElement.classList.remove('js-motion');
    });
  }

  const industryPanels = $$('.industry-panel');
  if (industryPanels.length) {
    const industries = JSON.parse($('#industry-data').textContent);
    const description = $('.industry-description');
    function selectIndustry(index) {
      const selected = industries[index];
      industryPanels.forEach((panel, i) => {
        panel.classList.toggle('is-active', i === index);
        panel.setAttribute('aria-pressed', String(i === index));
      });
      $('#industry-title').textContent = selected.title;
      $('#industry-copy').textContent = selected.text;
      $('.industry-description>.mini-label').textContent = `0${index + 1} / 06`;
      $('.industry-link').href = `industry-${selected.slug}.html`;
      // Reuse the corresponding decorative icon from the main navigation.
      const navIcon = $(`.industries-dropdown a[href="industry-${selected.slug}.html"] svg`);
      if (navIcon) $('#industry-icon').replaceChildren(navIcon.cloneNode(true));
      description.classList.remove('changing');
      requestAnimationFrame(() => description.classList.add('changing'));
    }
    industryPanels.forEach((panel, i) => {
      panel.addEventListener('click', () => selectIndustry(i));
      panel.addEventListener('pointerenter', event => {
        if (event.pointerType === 'mouse' && innerWidth >= 1024) selectIndustry(i);
      });
      panel.addEventListener('keydown', event => {
        if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(event.key)) return;
        event.preventDefault();
        const next = (i + (['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1) + industries.length) % industries.length;
        selectIndustry(next);
        industryPanels[next].focus();
      });
    });
  }

  const techTabs = $$('[data-tech-tab]');
  if (techTabs.length && 'IntersectionObserver' in window) {
    const techObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        techTabs.forEach(tab => tab.classList.toggle('is-active', tab.hash === `#${id}`));
      });
    }, { rootMargin: '-15% 0px -50% 0px', threshold: 0 });
    $$('.tech-card').forEach(card => techObserver.observe(card));
  }

  $$('[data-project-filter]').forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.projectFilter;
    $$('[data-project-filter]').forEach(b => {
      b.classList.toggle('is-active', b === button);
      b.setAttribute('aria-pressed', String(b === button));
    });
    let visible = 0;
    $$('#project-grid .project-card').forEach(card => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
      if (!card.hidden) { visible++; card.classList.add('is-visible'); }
    });
    $('.filter-status').textContent = `${visible} ${visible === 1 ? 'project' : 'projects'} shown`;
  }));

  let articleCategory = 'All';
  const articleSearch = $('#article-search');
  function filterArticles() {
    const query = (articleSearch?.value || '').trim().toLowerCase();
    let visible = 0;
    $$('.article-card').forEach(card => {
      card.hidden = !(articleCategory === 'All' || card.dataset.articleCategory === articleCategory) || !card.dataset.search.toLowerCase().includes(query);
      if (!card.hidden) { visible++; card.classList.add('is-visible'); }
    });
    $('.empty-search').hidden = visible !== 0;
  }
  articleSearch?.addEventListener('input', filterArticles);
  $$('[data-article-filter]').forEach(button => button.addEventListener('click', () => {
    articleCategory = button.dataset.articleFilter;
    $$('[data-article-filter]').forEach(b => {
      b.classList.toggle('is-active', b === button);
      b.setAttribute('aria-pressed', String(b === button));
    });
    filterArticles();
  }));

  $$('.faq').forEach(detail => detail.addEventListener('toggle', () => {
    if (detail.open) $$('.faq', detail.parentElement).forEach(other => { if (other !== detail) other.open = false; });
  }));
  $('.back-top').addEventListener('click', () => scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' }));
})();
