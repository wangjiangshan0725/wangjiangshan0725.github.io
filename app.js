(() => {
  'use strict';
  const profile = window.PROFILE;
  if (!profile) return;
  const $ = (selector) => document.querySelector(selector);
  const create = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };
  // Render only emphasis and links; keep all other profile content as text.
  function richText(element, text) {
    String(text || '').split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).forEach(part => {
      if (part.startsWith('**') && part.endsWith('**')) {
        element.append(richText(create('strong'), part.slice(2, -2)));
        return;
      }
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      element.append(link ? (externalLink(link[1], link[2]) || document.createTextNode(link[1])) : document.createTextNode(part));
    });
    return element;
  }
  function safeUrl(value) {
    if (!value || typeof value !== 'string') return '';
    try {
      const url = new URL(value, location.href);
      return ['https:', 'http:', 'mailto:'].includes(url.protocol) ||
        (url.protocol === 'file:' && !/^[a-z][a-z\d+.-]*:/i.test(value)) ? url.href : '';
    } catch { return ''; }
  }
  function externalLink(label, value, className = '') {
    const url = safeUrl(value);
    if (!url) return null;
    const link = create('a', className, label);
    link.href = url;
    if (!url.startsWith('mailto:')) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    return link;
  }
  function setImage(element, path, alt, fallback) {
    element.alt = alt || '';
    element.onerror = () => { element.onerror = null; element.src = fallback; };
    element.src = path || fallback;
  }

  document.title = `${profile.name} — Research`;
  $('meta[name="description"]').content = profile.description || '';
  $('#nav-name').textContent = profile.name;
  $('#footer-name').textContent = profile.name;
  $('#name').replaceChildren(document.createTextNode(profile.name));
  if (profile.nativeName) {
    const native = create('span', 'name-native', profile.nativeName);
    native.lang = 'zh';
    $('#name').append(' ', native);
  }
  $('#affiliation').textContent = profile.affiliation;
  (profile.bio || []).forEach(paragraph => $('#bio').append(richText(create('p'), paragraph)));
  $('#footer-note').textContent = profile.footerNote || '';

  const profileLinks = [
    ['Google Scholar', profile.scholar], ['GitHub', profile.github],
    ['Email', profile.email ? `mailto:${profile.email}` : '']
  ];
  profileLinks.forEach(([label, url]) => {
    const link = externalLink(label, url);
    if (link) $('#social-links').append(link);
    else {
      const placeholder = create('span', 'unconfigured-link', label);
      placeholder.title = `${label} contact details coming soon`;
      placeholder.setAttribute('aria-disabled', 'true');
      $('#social-links').append(placeholder);
    }
  });
  const wechatDialog = $('#wechat-dialog');
  let contactTrigger = null;
  let contactOverflow = '';
  if (profile.wechat) {
    const wechat = create('button', 'social-button', 'WeChat');
    wechat.type = 'button';
    wechat.setAttribute('aria-haspopup', 'dialog');
    wechat.addEventListener('click', () => {
      contactTrigger = wechat;
      $('#wechat-id').textContent = profile.wechat;
      $('#copy-status').textContent = '';
      contactOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      wechatDialog.showModal();
      $('.wechat-close').focus();
    });
    $('#social-links').append(wechat);
  } else {
    const placeholder = create('span', 'unconfigured-link', 'WeChat');
    placeholder.title = 'WeChat contact details coming soon';
    placeholder.setAttribute('aria-disabled', 'true');
    $('#social-links').append(placeholder);
  }
  if (profile.cv) {
    const cv = externalLink('CV', profile.cv);
    if (cv) $('#social-links').append(cv);
  }
  $('.wechat-close').addEventListener('click', () => wechatDialog.close());
  wechatDialog.addEventListener('click', event => {
    const bounds = wechatDialog.getBoundingClientRect();
    if (event.target === wechatDialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) wechatDialog.close();
  });
  wechatDialog.addEventListener('close', () => {
    document.body.style.overflow = contactOverflow;
    contactTrigger?.focus({ preventScroll: true });
  });
  $('.copy-wechat').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(profile.wechat);
      $('#copy-status').textContent = 'WeChat ID copied.';
    } catch {
      $('#copy-status').textContent = 'Select the WeChat ID above to copy it.';
    }
  });

  // Newest publication year first; retain the supplied order within each year.
  const publications = [...(profile.publications || [])].sort((a, b) => Number(b.year) - Number(a.year));
  $('#research-title').textContent = profile.researchTitle || 'Selected Publications';
  const dialog = $('#research-dialog');
  let previousOverflow = '';
  let dialogTrigger = null;

  function openOverview(paper, trigger) {
    dialogTrigger = trigger;
    $('#dialog-eyebrow').textContent = paper.example ? 'ILLUSTRATIVE RESEARCH ENTRY' : 'RESEARCH OVERVIEW';
    $('#dialog-title').textContent = paper.title;
    $('#dialog-authors').replaceChildren();
    richText($('#dialog-authors'), paper.authors);
    $('#dialog-summary').textContent = paper.abstract || paper.summary || '';
    setImage($('#dialog-image'), paper.image, paper.imageAlt, 'assets/flow.svg');
    $('#dialog-example').hidden = !paper.example;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    $('.dialog-close').focus();
  }
  $('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    if (dialogTrigger?.isConnected) dialogTrigger.focus({ preventScroll: true });
  });

  function renderPublications() {
    const shown = publications;
    $('#publications').replaceChildren();
    if (!shown.length) $('#publications').append(create('p', 'empty-research', 'Research updates will appear here.'));
    shown.forEach(paper => {
      const article = create('article', 'publication');
      const teaser = create('button', 'teaser-button');
      teaser.type = 'button';
      teaser.setAttribute('aria-label', `Read overview: ${paper.title}`);
      const img = create('img');
      img.width = 600; img.height = 336; img.loading = 'lazy';
      setImage(img, paper.image, paper.imageAlt, 'assets/flow.svg');
      teaser.append(img, create('span', 'teaser-action', '↗'));
      teaser.addEventListener('click', () => openOverview(paper, teaser));
      const details = create('div', 'publication-copy');
      const title = create('h3');
      title.append(externalLink(paper.title, paper.links?.paper, 'paper-title-link') || document.createTextNode(paper.title));
      details.append(title, richText(create('p', 'authors'), paper.authors));
      const venue = create('p', 'venue');
      if (paper.venue) venue.append(create('em', '', paper.venue));
      if (paper.year) venue.append(`${paper.venue ? ' · ' : ''}${paper.year}`);
      details.append(venue);
      if (paper.summary) details.append(create('p', 'paper-summary', paper.summary));
      article.append(teaser, details);
      $('#publications').append(article);
    });
  }
  renderPublications();

  const icons = {
    research: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="4" y="7" width="16" height="13" rx="2"/><path d="M9 7V4h6v3M4 12h16M10 12v3h4v-3"/></svg>',
    education: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="m2 9 10-5 10 5-10 5-10-5Zm4 3v6c4 3 8 3 12 0v-6M22 9v8"/></svg>'
  };
  for (const section of ['experience', 'education']) {
    const entries = profile[section] || [];
    $(`#${section}`).hidden = !entries.length;
    $(`nav a[href="#${section}"]`).hidden = !entries.length;
    entries.forEach(item => {
      const row = create('article', 'experience-row');
      const icon = create('span', 'organization-icon');
      icon.innerHTML = icons[item.type] || icons.research;
      const copy = create('div', 'experience-copy');
      const first = create('div', 'experience-first-line');
      const title = create('h3');
      title.append(externalLink(item.organization, item.url) || document.createTextNode(item.organization));
      first.append(title, create('span', 'experience-date', item.dates));
      copy.append(first, create('p', 'experience-role', item.role), create('p', 'experience-detail', item.detail));
      if (item.collaborators?.length) {
        const collaborators = create('p', 'experience-collaborators', 'Work with ');
        item.collaborators.forEach((person, index) => {
          if (index) collaborators.append(index === item.collaborators.length - 1 ? ' and ' : ', ');
          collaborators.append(externalLink(person.name, person.url) || document.createTextNode(person.name));
        });
        collaborators.append('.');
        copy.append(collaborators);
      }
      row.append(icon, copy);
      $(`#${section}-list`).append(row);
    });
  }
  const awards = profile.awards || [];
  if (awards.length) {
    const list = create('ul');
    awards.forEach(item => list.append(richText(create('li'), item)));
    $('#awards-list').append(list);
  } else {
    $('#awards').hidden = true;
    $('nav a[href="#awards"]').hidden = true;
  }

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const dark = theme === 'dark';
    $('.theme-toggle').setAttribute('aria-pressed', String(dark));
    $('.theme-toggle').setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    $('meta[name="theme-color"]').content = dark ? '#171c21' : '#fcfcfb';
  }
  let savedTheme = 'light';
  try { savedTheme = localStorage.getItem('homepage-theme') || 'light'; } catch { /* Local file storage may be unavailable. */ }
  setTheme(savedTheme === 'dark' ? 'dark' : 'light');
  $('.theme-toggle').addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(theme);
    try { localStorage.setItem('homepage-theme', theme); } catch { /* The toggle still works without storage. */ }
  });
  const menu = $('.menu-toggle');
  const nav = $('#main-nav');
  function closeMenu() {
    nav.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
  }
  menu.addEventListener('click', () => {
    const expanded = menu.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('is-open', expanded);
    menu.setAttribute('aria-expanded', String(expanded));
    menu.setAttribute('aria-label', `${expanded ? 'Close' : 'Open'} navigation`);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); }
  });
  document.addEventListener('click', event => { if (!$('.header-inner').contains(event.target)) closeMenu(); });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    closeMenu();
    nav.querySelectorAll('a').forEach(item => item.removeAttribute('aria-current'));
    link.setAttribute('aria-current', 'page');
    // Move focus out of the collapsed navigation on small screens.
    if (window.matchMedia('(max-width: 600px)').matches) {
      const section = document.querySelector(link.getAttribute('href'));
      section.setAttribute('tabindex', '-1');
      section.focus({ preventScroll: true });
    }
  }));
  const sections = [...nav.querySelectorAll('a')].map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  let scrollPending = false;
  function updateActiveSection() {
    const visible = sections.filter(section => !section.hidden);
    let active = visible[0];
    for (const section of visible) if (section.getBoundingClientRect().top <= 150) active = section;
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) active = visible[visible.length - 1];
    nav.querySelectorAll('a').forEach(link => {
      if (active && link.getAttribute('href') === `#${active.id}`) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    scrollPending = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateActiveSection); }
  }, { passive: true });
  updateActiveSection();
})();
