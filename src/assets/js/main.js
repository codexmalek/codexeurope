/* Codex — interactions. Requires gsap, ScrollTrigger, Lenis (all deferred before this file). */
(async () => {
  const root = document.documentElement;
  // Setup below the fold is split into small tasks so the page stays responsive while it loads.
  const yieldTask = () => new Promise((r) => setTimeout(r, 0));
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Any mouse or touchpad counts: touchscreen laptops report a coarse *primary* pointer even when a mouse is used.
  const fine = matchMedia('(any-hover: hover) and (any-pointer: fine)').matches;
  // Cursor effects start right away when a mouse is reported, otherwise on the first real mouse movement.
  const whenMouse = (fn) => {
    if (fine) { root.classList.add('has-mouse'); return fn(); }
    const h = (e) => {
      if (e.pointerType !== 'mouse') return;
      removeEventListener('pointermove', h);
      root.classList.add('has-mouse');
      fn();
    };
    addEventListener('pointermove', h, { passive: true });
  };

  // Image loader: until an image has loaded, a shimmer + spinner sits over its box, then fades away.
  // (An overlay element, not ::before/::after, because many image containers already use those.)
  const markLoading = (img) => {
    const tile = img.closest('.gal__item');
    if (tile) {
      const ov = $('.img-loader', tile);
      const done = () => ov && ov.classList.add('is-done');
      if (img.complete && img.naturalWidth) { done(); return; }
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
      return;
    }
    if (img.complete && img.naturalWidth) return;
    const box = img.offsetParent;
    if (!box || !img.offsetWidth || !img.offsetHeight) return;
    const ov = document.createElement('span');
    ov.className = 'img-loader';
    ov.setAttribute('aria-hidden', 'true');
    const place = () => Object.assign(ov.style, { left: img.offsetLeft + 'px', top: img.offsetTop + 'px', width: img.offsetWidth + 'px', height: img.offsetHeight + 'px' });
    place();
    img.after(ov);
    const done = () => { ov.classList.add('is-done'); setTimeout(() => ov.remove(), 450); };
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', done, { once: true });
    addEventListener('resize', place, { passive: true });
  };
  requestAnimationFrame(() => $$('main img, .foot img').forEach(markLoading));

  // Without GSAP, show everything rather than leaving hidden content.
  if (!window.gsap || !window.ScrollTrigger) { root.classList.remove('js'); return; }
  if (reduced) root.classList.add('reduced');

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'expo.out', duration: 1.2 });

  // One-shot reveals share a single IntersectionObserver: far cheaper than one ScrollTrigger each,
  // and nothing to recalculate when the layout changes.
  const viewCbs = new Map();
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const fns = viewCbs.get(e.target);
    viewCbs.delete(e.target);
    io.unobserve(e.target);
    fns && fns.forEach((f) => f());
  }), { rootMargin: '0px 0px -8% 0px' }) : null;
  const onView = (el, fn) => {
    if (typeof el === 'string') el = $(el);
    if (!el) return;
    if (!io) return fn();
    if (!viewCbs.has(el)) viewCbs.set(el, []);
    viewCbs.get(el).push(fn);
    io.observe(el);
  };
  const playOnView = (tween, el) => { tween.pause(); onView(el, () => tween.play()); return tween; };

  /* ---------- smooth scroll ---------- */
  let lenis = null;
  // Smooth wheel scrolling on desktop only; phones keep native touch scrolling (smoother and cheaper).
  if (!reduced && fine && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, touchMultiplier: 1.4 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  // Page language (fr / en / ar) for the few strings written from JavaScript.
  const LANG = (root.lang || 'fr').slice(0, 2);
  const AR = LANG === 'ar';
  const T = {
    fr: { sending: 'Envoi en cours…', sent: 'Merci ! Votre demande est envoyée. Nous revenons vers vous très vite.', mail: 'Votre messagerie va s’ouvrir pour finaliser l’envoi.', name: 'Nom', company: 'Entreprise', phone: 'Téléphone', need: 'Besoin', subject: 'Nouveau projet', copied: 'Lien copié', copy: 'Copier le lien' },
    en: { sending: 'Sending…', sent: 'Thank you! Your request has been sent. We will get back to you very soon.', mail: 'Your email app will open to finish sending.', name: 'Name', company: 'Company', phone: 'Phone', need: 'Need', subject: 'New project', copied: 'Link copied', copy: 'Copy link' },
    ar: { sending: 'جارٍ الإرسال…', sent: 'شكرًا! تم إرسال طلبكم. سنعود إليكم قريبًا جدًا.', mail: 'سيُفتح تطبيق البريد لإتمام الإرسال.', name: 'الاسم', company: 'الشركة', phone: 'الهاتف', need: 'الاحتياج', subject: 'مشروع جديد', copied: 'تم نسخ الرابط', copy: 'نسخ الرابط' },
  }[LANG] || {};
  const scrollTo = (target) => (lenis ? lenis.scrollTo(target, { offset: -80, duration: 1.4 }) : (typeof target === 'number' ? scrollTo_(target) : target.scrollIntoView({ behavior: 'smooth' })));
  const scrollTo_ = (y) => window.scrollTo({ top: y, behavior: 'smooth' });

  /* ---------- text splitting ---------- */
  const splitChars = (el, a11y) => {
    if (a11y) {
      // Screen readers get the plain text once; the animated letters are hidden from them.
      const text = el.textContent.replace(/\s+/g, ' ').trim();
      el.innerHTML = `<span class="sr-only">${text}</span><span class="vis" aria-hidden="true">${el.innerHTML}</span>`;
      el = el.lastElementChild;
    }
    const walk = (node) => [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        // In Arabic pages each word becomes its own box, which right-to-left layout would reorder:
        // runs of Latin words and numbers (Codex, Web Summit 2026…) are kept together, left to right.
        const parts = n.textContent.split(/(\s+)/).filter(Boolean);
        const word = (p) => p && /[A-Za-z0-9]/.test(p) && !/[؀-ۿ]/.test(p);
        // symbols such as & · / — between two Latin words stay in the run
        const latin = (p, k) => AR && (word(p) || (!/[؀-ۿ]/.test(p) && word(parts[k - 2]) && word(parts[k + 2])));
        let run = null;
        parts.forEach((part, k) => {
          if (/^\s+$/.test(part)) {
            if (run && !(parts[k + 1] && latin(parts[k + 1], k + 1))) run = null;
            return (run || frag).appendChild(document.createTextNode(' '));
          }
          if (latin(part, k)) {
            if (!run) { run = document.createElement('span'); run.dir = 'ltr'; run.className = 'ltr'; frag.appendChild(run); }
          } else run = null;
          const w = document.createElement('span');
          w.className = 'wd';
          // Arabic letters join up, so Arabic text animates word by word instead of letter by letter.
          (AR ? [part] : [...part]).forEach((c) => { const ch = document.createElement('span'); ch.className = 'ch'; ch.textContent = c; w.appendChild(ch); });
          (run || frag).appendChild(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && !n.classList.contains('sr-only')) walk(n);
    });
    walk(el);
  };
  $$('[data-chars], [data-split]').forEach((el) => { el.classList.add('chars'); splitChars(el, true); });
  // Hover ripple titles
  $$('.srv__name, .sec-item__name, .pcard h3, .fitem h2, .pitem__meta h3, .menu__links a, .scard h2, .ev__name').forEach((el) => {
    el.classList.add('wave');
    const small = el.querySelector('small');
    if (small) small.remove();
    splitChars(el, true);
    if (small) el.prepend(small);
  });
  $$('.eyebrow').forEach((el) => {
    const t = [...el.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim());
    if (!t) return;
    const sp = document.createElement('span');
    sp.className = 'sc';
    sp.textContent = t.textContent;
    t.replaceWith(sp);
  });
  $$('[data-words]').forEach((el) => {
    el.innerHTML = el.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(' ');
  });

  /* ---------- loader + intro ---------- */
  const hero = $('.hero, .phero');
  const introLines = hero ? $$('[data-split] .ln', hero) : [];
  const introFades = hero ? $$('[data-fade]', hero) : [];

  const intro = () => {
    if (reduced) return;
    if (hero) $$('.chars', hero).forEach((line) => {
      gsap.to($$('.ch', line), { y: 0, rotate: 0, duration: 1.3, stagger: 0.022, delay: 0.05 + parseFloat(line.dataset.delay || 0), onComplete: () => line.classList.add('is-in') });
    });
    gsap.from('.nav__in > *', { y: -40, opacity: 0, duration: 1.2, stagger: 0.07, delay: 0.1, clearProps: 'transform,opacity' });
    introLines.forEach((ln) => {
      const d = parseFloat(ln.parentElement.dataset.delay || 0);
      gsap.to(ln, { y: 0, duration: 1.4, delay: 0.05 + d });
    });
    gsap.to(introFades, { opacity: 1, y: 0, duration: 1.2, stagger: 0.08, delay: 0.45 });
    const mk = $('.hero__mark');
    if (mk) gsap.from(mk, { opacity: 0, scale: 0.92, rotate: -6, duration: 2.2, ease: 'expo.out' });
  };

  const loader = $('[data-loader]');
  const seen = root.classList.contains('seen');
  const pt = $('[data-pt]');
  const fromTransition = root.classList.contains('pt-in');
  try { sessionStorage.removeItem('cx-pt'); } catch (e) {}
  if (fromTransition) {
    if (reduced) root.classList.remove('pt-in');
    else gsap.to(pt, { y: 0, yPercent: -100, duration: 1, ease: 'expo.inOut', delay: 0.05, onComplete: () => { root.classList.remove('pt-in'); gsap.set(pt, { yPercent: 100, visibility: 'hidden' }); } });
  }
  if (loader && !seen && !reduced) {
    lenis && lenis.stop();
    const count = $('[data-count]', loader);
    const n = { v: 0 };
    const tl = gsap.timeline({
      // Hide rather than remove: deleting a full-screen node is reported as a layout shift.
      onComplete: () => { gsap.set(loader, { visibility: 'hidden', pointerEvents: 'none' }); lenis && lenis.start(); },
    });
    tl.from('.loader__mark', { scale: 0.4, opacity: 0, rotate: -90, duration: 0.8, ease: 'expo.out' })
      .to(n, { v: 100, duration: 0.8, ease: 'power2.inOut', onUpdate: () => (count.textContent = Math.round(n.v)) }, 0)
      .to('.loader__mark', { rotate: 180, duration: 0.7, ease: 'expo.inOut' }, 0.4)
      .to(loader, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, 0.85)
      .add(intro, 1.05);
    try { sessionStorage.setItem('cx-loaded', '1'); } catch (e) {}
  } else {
    loader && (loader.style.display = 'none');
    fromTransition && !reduced ? gsap.delayedCall(0.55, intro) : requestAnimationFrame(intro);
  }

  await yieldTask();
  /* ---------- scroll reveals ---------- */
  if (!reduced) {
    $$('[data-split]').forEach((el) => {
      if (hero && hero.contains(el)) return;
      playOnView(gsap.to($$('.ch', el), { y: 0, rotate: 0, duration: 1.2, stagger: 0.016, paused: true, onComplete: () => el.classList.add('is-in') }), el);
    });
    // Each kind of item gets its own entrance.
    const enter = {
      card: { from: { opacity: 0, y: 80, rotationX: -28, transformPerspective: 900, transformOrigin: '50% 0%' }, to: { opacity: 1, y: 0, rotationX: 0, duration: 1.4, stagger: 0.09 } },
      row: { from: { opacity: 0, x: -50 }, to: { opacity: 1, x: 0, duration: 1.1, stagger: 0.06 } },
      chip: { from: { opacity: 0, scale: 0.4, rotate: () => gsap.utils.random(-14, 14) }, to: { opacity: 1, scale: 1, rotate: 0, duration: 0.9, stagger: 0.04, ease: 'back.out(2.2)' } },
      base: { from: { opacity: 0, y: 40 }, to: { opacity: 1, y: 0, duration: 1.1, stagger: 0.07 } },
      circle: { from: { opacity: 1, clipPath: 'circle(0% at 0% 0%)' }, to: { clipPath: 'circle(150% at 0% 0%)', duration: 1.7, stagger: 0.12, ease: 'expo.inOut', clearProps: 'clipPath' } },
      zoom: { from: { opacity: 0, scale: 0.82, filter: 'blur(12px)' }, to: { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.08, clearProps: 'filter' } },
    };
    const kind = (el) => el.matches('.reason') ? 'circle'
      : el.matches('.deliv__item') ? 'zoom'
      : el.matches('.scard, .stat, .pitem, .bcard') ? 'card'
      : el.matches('.qa, .sec-item, .fit__list li, .facts dl > div, .ev__item, .feat__item, .refs__list li') ? 'row'
      : el.matches('.chips li') ? 'chip' : 'base';
    const groups = {};
    $$('[data-reveal]').forEach((el) => (groups[kind(el)] = groups[kind(el)] || []).push(el));
    // Items that come into view in the same frame animate together with a stagger.
    const pend = {};
    let flush = 0;
    Object.entries(groups).forEach(([k, els]) => {
      gsap.set(els, enter[k].from);
      els.forEach((el) => onView(el, () => {
        (pend[k] = pend[k] || []).push(el);
        flush = flush || requestAnimationFrame(() => {
          flush = 0;
          Object.keys(pend).forEach((kk) => { gsap.to(pend[kk], { ...enter[kk].to, overwrite: 'auto' }); delete pend[kk]; });
        });
      }));
    });
    $$('[data-fade]').forEach((el) => {
      if (hero && hero.contains(el)) return;
      playOnView(gsap.to(el, { opacity: 1, y: 0, paused: true }), el);
    });

    // Manifesto: words light up as you read.
    $$('[data-words]').forEach((el) => {
      const words = $$('.w', el);
      ScrollTrigger.create({
        trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true,
        onUpdate: (st) => {
          const k = Math.round(st.progress * words.length);
          words.forEach((w, i) => w.classList.toggle('on', i < k));
        },
      });
    });

    $$('[data-parallax]').forEach((el) => {
      gsap.to(el, { yPercent: parseFloat(el.dataset.parallax) * 100, ease: 'none', scrollTrigger: { trigger: el.closest('section'), start: 'top top', end: 'bottom top', scrub: true } });
    });

    // Process cards stack and recede. A card only dims while the next one actually slides over it:
    // from the moment the next card touches its bottom edge until the next card is stuck in place.
    // (Starting at 'top bottom' dimmed the card you were still reading.)
    const stepEls = $$('[data-step]');
    const stickTop = (el) => parseFloat(getComputedStyle(el).top) || 0;
    stepEls.forEach((s, i) => {
      if (i === stepEls.length - 1) return;
      const card = $('.step__in', s), next = stepEls[i + 1];
      gsap.fromTo(card, { scale: 1, filter: 'brightness(1)' }, {
        scale: 0.94, filter: 'brightness(0.55)', ease: 'none',
        scrollTrigger: { trigger: next, start: () => `top ${stickTop(s) + card.offsetHeight}px`, end: () => `top ${stickTop(next)}px`, scrub: true, invalidateOnRefresh: true },
      });
    });
  } else {
    $$('.manifesto__text .w').forEach((w) => w.classList.add('on'));
  }

  await yieldTask();
  /* ---------- marquee (speeds up with scroll velocity) ---------- */
  $$('[data-marquee]').forEach((m) => {
    // A row can hold several tracks (the logo band paints a second, coloured copy): they move together.
    const tracks = $$('.marquee__track', m);
    if (reduced) return;
    const base = parseFloat(m.dataset.marquee) || 1;
    let x = 0, dir = 1, half = 0, vis = false, slow = 1, hover = false;
    new IntersectionObserver(([en]) => (vis = en.isIntersecting), { rootMargin: '100px' }).observe(m);
    const measure = () => (half = tracks[0].scrollWidth / 2);
    measure();
    addEventListener('resize', measure);
    // Logo rows slow right down under the cursor so a name can be read.
    if (m.classList.contains('lband__row')) {
      m.addEventListener('pointerenter', (e) => e.pointerType === 'mouse' && (hover = true));
      m.addEventListener('pointerleave', () => (hover = false));
    }
    gsap.ticker.add((t, dt) => {
      if (!vis) return;
      const v = lenis ? lenis.velocity : 0;
      if (Math.abs(v) > 0.5) dir = v > 0 ? 1 : -1;
      slow += ((hover ? 0.12 : 1) - slow) * 0.08;
      x -= (0.06 + Math.min(Math.abs(v) * 0.04, 1.6)) * dir * base * dt * slow;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      const tf = `translate3d(${x}px,0,0) skewX(${gsap.utils.clamp(-8, 8, -v * 0.5).toFixed(2)}deg)`;
      for (const tr of tracks) tr.style.transform = tf;
    });
  });

  /* ---------- logo band: a spotlight paints the logos in the accent ---------- */
  $$('[data-lband]').forEach((band) => {
    const rows = $$('.lband__row', band);
    if (!reduced) onView(band, () => {
      rows.forEach((r, i) => gsap.fromTo(r, { xPercent: i ? -14 : 14, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1.8, ease: 'expo.out', delay: i * 0.12, clearProps: 'transform,opacity' }));
      gsap.fromTo($$('.lband__row > .marquee__track .lmark', band), { y: 26, opacity: 0 }, { y: 0, opacity: 0.46, duration: 1.2, stagger: { each: 0.03, from: 'center' }, delay: 0.2, clearProps: 'transform,opacity' });
    });
    if (reduced) return;
    // Each row keeps its own light: it follows the cursor, or sweeps across on its own when idle.
    const st = rows.map((r, i) => ({ r, glow: $('.lband__glow', r), x: -400, y: 0, rad: 150, dir: i ? -1 : 1 }));
    let px = null, py = null, vis = false;
    new IntersectionObserver(([en]) => (vis = en.isIntersecting)).observe(band);
    whenMouse(() => {
      band.addEventListener('pointermove', (e) => { px = e.clientX; py = e.clientY; });
      band.addEventListener('pointerleave', () => (px = py = null));
    });
    gsap.ticker.add((t) => {
      if (!vis) return;
      st.forEach((s, i) => {
        const b = s.r.getBoundingClientRect();
        let tx, ty, tr;
        if (px !== null) { tx = px - b.left; ty = py - b.top; tr = 230; }
        else {
          const ph = ((t * 0.16 + i * 0.5) % 1.5) - 0.25;
          tx = (s.dir > 0 ? ph : 1 - ph) * b.width; ty = b.height / 2; tr = 150;
        }
        // Snap instead of gliding when the idle sweep wraps around.
        const k = Math.abs(tx - s.x) > b.width * 0.8 && px === null ? 1 : 0.14;
        s.x += (tx - s.x) * k; s.y += (ty - s.y) * 0.14; s.rad += (tr - s.rad) * 0.08;
        s.glow.style.setProperty('--gx', `${s.x.toFixed(1)}px`);
        s.glow.style.setProperty('--gy', `${s.y.toFixed(1)}px`);
        s.glow.style.setProperty('--r', `${s.rad.toFixed(1)}px`);
      });
    });
  });

  await yieldTask();
  /* ---------- horizontal work scroll (desktop) ---------- */
  const mm = gsap.matchMedia();
  mm.add('(min-width: 901px)', () => {
    const pin = $('[data-hscroll]');
    if (!pin || reduced) return;
    const track = $('[data-hscroll-track]', pin);
    const dist = () => Math.max(0, track.scrollWidth - innerWidth);
    gsap.to(track, {
      // right-to-left pages: the cards overflow to the left, so the track slides the other way
      x: () => (AR ? dist() : -dist()), ease: 'none',
      scrollTrigger: { trigger: pin, start: 'center center', end: () => '+=' + dist(), pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1, refreshPriority: 2 },
    });
  });

  await yieldTask();
  /* ---------- nav ---------- */
  const nav = $('[data-nav]');
  let lastY = 0;
  const onScroll = () => {
    const y = scrollY;
    nav.classList.toggle('is-scrolled', y > 20);
    if (!root.classList.contains('menu-open')) nav.classList.toggle('is-hidden', y > 160 && y > lastY);
    lastY = y;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  $$('[data-theme="light"]').forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec, start: () => `top ${nav.offsetHeight / 2}px`, end: () => `bottom ${nav.offsetHeight / 2}px`,
      onToggle: (st) => nav.classList.toggle('on-light', st.isActive),
    });
  });

  const burger = $('[data-burger]');
  const menu = $('[data-menu]');
  const setMenu = (open) => {
    root.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    menu.setAttribute('aria-hidden', !open);
    nav.classList.remove('is-hidden');
    if (lenis) open ? lenis.stop() : lenis.start();
    if (open && !reduced) gsap.fromTo($$('a', menu), { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, delay: 0.25, duration: 1 });
  };
  burger.addEventListener('click', () => setMenu(!root.classList.contains('menu-open')));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && root.classList.contains('menu-open')) setMenu(false); });

  // In-page anchors via Lenis.
  $$('a[href*="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname) return;
      const target = url.hash === '#top' ? 0 : $(url.hash);
      if (target === null) return;
      e.preventDefault();
      scrollTo(target);
    });
  });

  await yieldTask();
  /* ---------- cursor, magnetic, service preview ---------- */
  whenMouse(() => {
    const cur = $('[data-cursor-el]');
    const label = $('span', cur);
    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const xTo = gsap.quickTo(cur, 'x', { duration: 0.35, ease: 'power3' });
    const yTo = gsap.quickTo(cur, 'y', { duration: 0.35, ease: 'power3' });
    addEventListener('pointermove', (e) => { pos.x = e.clientX; pos.y = e.clientY; xTo(pos.x); yTo(pos.y); cur.classList.add('is-on'); });
    document.addEventListener('pointerleave', () => cur.classList.remove('is-on'));
    document.addEventListener('pointerover', (e) => {
      const lab = e.target.closest('[data-cursor]');
      const link = e.target.closest('a, button, summary, label');
      cur.classList.toggle('is-label', !!lab);
      cur.classList.toggle('is-link', !lab && !!link && !e.target.closest('.srv-list'));
      if (lab) label.textContent = lab.dataset.cursor;
    });

    $$('[data-magnetic]').forEach((el) => {
      const inner = el.firstElementChild;
      const mx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1,.4)' });
      const my = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1,.4)' });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        mx(dx * 0.28); my(dy * 0.4);
        inner && gsap.to(inner, { x: dx * 0.12, y: dy * 0.16, duration: 0.6 });
      });
      el.addEventListener('pointerleave', () => { mx(0); my(0); inner && gsap.to(inner, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1,.4)' }); });
    });

    const list = $('[data-srv-list]');
    const prev = $('[data-srv-preview]');
    if (list && prev) {
      const px = gsap.quickTo(prev, 'x', { duration: 0.7, ease: 'power3' });
      const py = gsap.quickTo(prev, 'y', { duration: 0.7, ease: 'power3' });
      const rot = gsap.quickTo(prev, 'rotation', { duration: 0.9, ease: 'power3' });
      let lx = 0;
      list.addEventListener('pointermove', (e) => {
        px(e.clientX + 28); py(e.clientY - 100);
        rot(gsap.utils.clamp(-10, 10, (e.clientX - lx) * 0.6)); lx = e.clientX;
      });
      $$('.srv', list).forEach((row) => row.addEventListener('pointerenter', (e) => {
        if (!prev.classList.contains('is-on')) { gsap.set(prev, { x: e.clientX + 28, y: e.clientY - 100 }); px(e.clientX + 28); py(e.clientY - 100); }
        prev.classList.add('is-on');
        $$('[data-k]', prev).forEach((d) => d.classList.toggle('on', d.dataset.k === row.dataset.illo));
      }));
      list.addEventListener('pointerleave', () => prev.classList.remove('is-on'));
    }
  });

  await yieldTask();
  /* ---------- FAQ: animate open/close ---------- */
  $$('.qa').forEach((d) => {
    const sum = $('summary', d), body = $('.qa__a', d);
    sum.addEventListener('click', (e) => {
      if (reduced) return;
      e.preventDefault();
      if (d.open) {
        gsap.to(body, { height: 0, duration: 0.6, ease: 'expo.inOut', onComplete: () => { d.open = false; body.style.height = ''; ScrollTrigger.refresh(); } });
      } else {
        d.open = true;
        gsap.fromTo(body, { height: 0 }, { height: 'auto', duration: 0.8, ease: 'expo.out', onComplete: () => ScrollTrigger.refresh() });
      }
    });
  });

  await yieldTask();
  /* ---------- back to top ---------- */
  $$('[data-top]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); scrollTo(0); }));

  await yieldTask();
  /* ---------- contact form ---------- */
  const form = $('[data-form]');
  if (form) {
    const want = new URLSearchParams(location.search).get('service');
    if (want) { const box = $(`input[data-slug="${want}"]`, form); if (box) box.checked = true; }
    const status = $('[data-status]', form);
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      status.className = 'form__status';
      status.textContent = T.sending;
      try {
        if (form.dataset.formMode === 'mail') throw new Error('no form backend');
        const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(data).toString() });
        if (!res.ok) throw new Error(res.status);
        form.reset();
        status.classList.add('ok');
        status.textContent = T.sent;
      } catch (err) {
        // Host without form handling: fall back to the visitor's mail client.
        const body = `${T.name} : ${data.get('name')}\n${T.company} : ${data.get('company') || '-'}\n${T.phone} : ${data.get('phone') || '-'}\n${T.need} : ${data.getAll('services').join(', ') || '-'}\n\n${data.get('message')}`;
        location.href = `mailto:contact@codexeurope.com?subject=${encodeURIComponent(T.subject + ' — ' + data.get('name'))}&body=${encodeURIComponent(body)}`;
        status.textContent = T.mail;
      }
    });
  }

  await yieldTask();
  /* ---------- theme (light / dark) ---------- */
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  const syncMeta = () => metaTheme && metaTheme.setAttribute('content', getComputedStyle(document.body).backgroundColor);
  syncMeta();
  $$('[data-mode-toggle]').forEach((modeBtn) => modeBtn.addEventListener('click', (e) => {
    const next = root.dataset.mode === 'light' ? 'dark' : 'light';
    const apply = () => {
      root.dataset.mode = next;
      try { localStorage.setItem('cx-mode', next); } catch (err) {}
      syncMeta();
      document.dispatchEvent(new CustomEvent('cx:mode'));
    };
    if (document.startViewTransition && !reduced) {
      const r0 = modeBtn.getBoundingClientRect();
      const x = e.clientX || r0.left + r0.width / 2, y = e.clientY || r0.top + r0.height / 2;
      const rad = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      document.startViewTransition(apply).ready.then(() => {
        root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${rad}px at ${x}px ${y}px)`] },
          { duration: 900, easing: 'cubic-bezier(.65,0,.35,1)', pseudoElement: '::view-transition-new(root)' });
      });
    } else {
      root.classList.add('mode-anim');
      apply();
      setTimeout(() => root.classList.remove('mode-anim'), 700);
    }
  }));

  await yieldTask();
  /* ---------- page transitions ---------- */
  if (!reduced && pt) {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || (url.pathname === location.pathname && url.hash)) return;
      e.preventDefault();
      try { sessionStorage.setItem('cx-pt', '1'); } catch (err) {}
      gsap.fromTo(pt, { y: 0, yPercent: 100, visibility: 'visible' }, { yPercent: 0, duration: 0.75, ease: 'expo.inOut', onComplete: () => (location.href = url.href) });
      gsap.fromTo('.pt__mark', { rotate: -90, scale: 0.6 }, { rotate: 0, scale: 1, duration: 0.9, ease: 'expo.out', delay: 0.3 });
    });
    addEventListener('pageshow', (e) => { if (e.persisted) { gsap.set(pt, { yPercent: 100, visibility: 'hidden' }); root.classList.remove('pt-in'); } });
  }

  await yieldTask();
  /* ---------- scroll progress ---------- */
  const prog = $('[data-progress]');
  if (prog) gsap.to(prog, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 } });

  if (!reduced) {
    await yieldTask();
    /* ---------- hero: exit on scroll ---------- */
    const heroIn = $('.hero__in');
    if (heroIn) {
      gsap.to(heroIn, { y: -120, opacity: 0.1, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero__mark', { rotate: 14, scale: 1.12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    }

    await yieldTask();
    /* ---------- rotating word ---------- */
    $$('[data-rotate]').forEach((el) => {
      const words = [$('.rot__w', el).textContent, ...el.dataset.rotate.split('|')];
      const w = $('.rot__w', el);
      let i = 0;
      const next = () => {
        const out = $$('.ch', w);
        gsap.to(out, { yPercent: -115, rotate: -6, duration: 0.6, stagger: 0.025, ease: 'expo.in', onComplete: () => {
          i = (i + 1) % words.length;
          w.textContent = words[i];
          splitChars(w);
          gsap.fromTo($$('.ch', w), { y: 0, yPercent: 115, rotate: 8 }, { yPercent: 0, rotate: 0, duration: 1, stagger: 0.03, ease: 'expo.out' });
        } });
      };
      gsap.delayedCall(4.2, function loop() { next(); gsap.delayedCall(3, loop); });
    });

    await yieldTask();
    /* ---------- eyebrow scramble ---------- */
    const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*/<>';
    if (!AR) $$('.eyebrow .sc').forEach((sp) => {
      const final = sp.textContent;
      onView(sp, () => {
        {
          const o = { p: 0 };
          gsap.to(o, { p: 1, duration: 1.1, ease: 'power2.out', onUpdate: () => {
            const k = Math.floor(o.p * final.length);
            sp.textContent = final.slice(0, k) + final.slice(k).replace(/\S/g, () => glyphs[(Math.random() * glyphs.length) | 0]);
          }, onComplete: () => (sp.textContent = final) });
        }
      });
    });

    await yieldTask();
    /* ---------- inverted sections open up ---------- */
    $$('[data-theme="light"]').forEach((sec) => {
      gsap.fromTo(sec, { clipPath: 'inset(7% 4% 0% 4% round 48px)' }, {
        clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
        scrollTrigger: { trigger: sec, start: 'top 95%', end: 'top 20%', scrub: true },
      });
    });

    await yieldTask();
    /* ---------- velocity rows ---------- */
    $$('[data-velo]').forEach((row) => {
      const d = parseFloat(row.dataset.velo);
      const dist = () => Math.max(0, row.scrollWidth - innerWidth) * 0.6;
      gsap.fromTo(row, { x: () => (d > 0 ? 0 : -dist()) }, {
        x: () => (d > 0 ? -dist() : 0), ease: 'none',
        scrollTrigger: { trigger: row.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.5, invalidateOnRefresh: true },
      });
    });

    await yieldTask();
    /* ---------- footer wordmark ---------- */
    $$('[data-word]').forEach((w) => {
      playOnView(gsap.fromTo($$('b', w), { y: 0, yPercent: 105 }, { yPercent: 0, duration: 1.5, stagger: 0.07, ease: 'expo.out', paused: true }), w);
    });

    await yieldTask();
    /* ---------- image reveals (real project photos) ---------- */
    $$('.wcard__media.has-img, .media-reveal:not(.fitem__img):not(.pitem__img)').forEach((m) => {
      const img = $('img', m);
      // expo.out shows most of the picture in the first few frames, so images feel instant.
      playOnView(gsap.to(m, { clipPath: `inset(0% 0 0 0 round 14px)`, duration: 1, ease: 'expo.out', paused: true }), m);
      img && !m.matches('.case__frame') && playOnView(gsap.fromTo(img, { scale: 1.15 }, { scale: 1, duration: 1.4, ease: 'expo.out', paused: true }), m);
    });

  }

  await yieldTask();
  /* ---------- hero dot field ---------- */
  const cv = $('[data-dots]');
  if (cv) {
    const ctx = cv.getContext('2d');
    const heroEl = cv.closest('.hero');
    const dpr = Math.min(devicePixelRatio || 1, fine ? 2 : 1.5);
    let frame = 0;
    let W = 0, H = 0, dots = [], ink = '243,240,234', on = true;
    const mouse = { x: -999, y: -999, tx: -999, ty: -999 };
    const readInk = () => {
      const c = getComputedStyle(document.body).color.match(/\d+/g);
      ink = c ? c.slice(0, 3).join(',') : ink;
    };
    const resize = () => {
      W = heroEl.offsetWidth; H = heroEl.offsetHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const gap = W < 700 ? 24 : 30;
      dots = [];
      for (let y = gap / 2; y < H; y += gap) for (let x = gap / 2; x < W; x += gap) dots.push([x, y]);
    };
    // Dots are grouped into a few opacity buckets so each frame needs ~8 fills, not one per dot.
    const LV = 4;
    const draw = (t) => {
      ctx.clearRect(0, 0, W, H);
      mouse.x += (mouse.tx - mouse.x) * 0.12; mouse.y += (mouse.ty - mouse.y) * 0.12;
      const inkP = Array.from({ length: LV }, () => new Path2D());
      const accP = Array.from({ length: LV }, () => new Path2D());
      for (const [x, y] of dots) {
        const dx = x - mouse.x, dy = y - mouse.y, d = Math.sqrt(dx * dx + dy * dy);
        const f = d < 190 ? 1 - d / 190 : 0;
        const wave = Math.sin(t * 0.0011 + x * 0.011 + y * 0.008) * 0.5 + 0.5;
        const push = f * 14 / (d || 1);
        const px = x + dx * push, py = y + dy * push;
        const r = 0.8 + wave * 0.5 + f * 2.4;
        const path = f > 0.04 ? accP[Math.min(LV - 1, (f * LV) | 0)] : inkP[Math.min(LV - 1, (wave * LV) | 0)];
        path.moveTo(px + r, py); path.arc(px, py, r, 0, 6.283);
      }
      for (let i = 0; i < LV; i++) {
        ctx.fillStyle = `rgba(${ink},${0.07 + (i + 0.5) / LV * 0.09})`; ctx.fill(inkP[i]);
        ctx.fillStyle = `rgba(254,164,30,${0.25 + (i + 0.5) / LV * 0.75})`; ctx.fill(accP[i]);
      }
    };
    readInk(); resize();
    addEventListener('resize', resize);
    document.addEventListener('cx:mode', () => setTimeout(readInk, 50));
    heroEl.addEventListener('pointermove', (e) => { const r = heroEl.getBoundingClientRect(); mouse.tx = e.clientX - r.left; mouse.ty = e.clientY - r.top; });
    heroEl.addEventListener('pointerleave', () => { mouse.tx = mouse.ty = -999; });
    new IntersectionObserver(([en]) => (on = en.isIntersecting)).observe(heroEl);
    if (reduced) draw(0);
    // Touch devices have no cursor to react to: draw every other frame.
    else if (fine) gsap.ticker.add(() => on && draw(performance.now()));
    // No cursor on touch screens: one static frame now, then a slow ambient wave once the page has settled.
    else { draw(0); gsap.delayedCall(2.5, () => gsap.ticker.add(() => on && ++frame % 4 === 0 && draw(performance.now()))); }
  }

  await yieldTask();
  /* ---------- 3D tilt ---------- */
  whenMouse(() => {
    $$('[data-tilt]').forEach((el) => {
      gsap.set(el, { transformPerspective: 900 });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(el, { rotationY: x * 9, rotationX: -y * 9, duration: 0.6, ease: 'power3' });
      });
      el.addEventListener('pointerleave', () => gsap.to(el, { rotationY: 0, rotationX: 0, duration: 1, ease: 'elastic.out(1,.5)' }));
    });
  });

  await yieldTask();
  /* ---------- reel: featured project zooms to full screen ---------- */
  const reel = $('[data-reel]');
  if (reel && !reduced) {
    const frame = $('[data-reel-frame]', reel);
    const small = innerWidth < 700;
    gsap.timeline({ scrollTrigger: { trigger: reel, start: 'top top', end: small ? '+=70%' : '+=110%', pin: true, scrub: 0.6, anticipatePin: 1, refreshPriority: 3 } })
      .fromTo(frame, { clipPath: small ? 'inset(10% 5% 10% 5% round 20px)' : 'inset(14% 18% 14% 18% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none' })
      .fromTo($('.reel__img', reel), { scale: 1.3 }, { scale: 1, ease: 'none' }, 0)
      .to($('.reel__cap', reel), { opacity: 1, duration: 0.3 }, 0.65);
  }

  await yieldTask();

  await yieldTask();
  /* ---------- portfolio filters ---------- */
  const filters = $('[data-filters]');
  if (filters) {
    const grid = $('[data-folio]');
    const items = $$('.fitem', grid);
    filters.addEventListener('click', (e) => {
      const b = e.target.closest('[data-filter]');
      if (!b) return;
      const k = b.dataset.filter;
      $$('[data-filter]', filters).forEach((x) => x.setAttribute('aria-pressed', x === b));
      grid.classList.toggle('is-filtered', k !== 'all');
      items.forEach((it) => {
        const show = k === 'all' || it.dataset.cat === k;
        if (show) {
          it.hidden = false;
          $('.media-reveal', it).style.clipPath = 'none';
          gsap.fromTo(it, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: reduced ? 0 : 0.9 });
        } else it.hidden = true;
      });
      ScrollTrigger.refresh();
    });
  }

  await yieldTask();
  /* ---------- lightbox ---------- */
  const dlg = $('[data-lightbox-dialog]');
  if (dlg) {
    const img = $('img', dlg);
    $$('[data-lightbox]').forEach((b) => b.addEventListener('click', () => {
      img.src = b.dataset.lightbox;
      img.alt = $('img', b).alt;
      dlg.showModal();
      lenis && lenis.stop();
      reduced || gsap.fromTo(img, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8 });
    }));
    $('[data-lightbox-close]', dlg).addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('close', () => lenis && lenis.start());
  }

  await yieldTask();
  /* =========================================================
     v3 motion layer
     ========================================================= */

  await yieldTask();
  /* ---------- odometer numbers ---------- */
  $$('[data-counter]').forEach((el) => {
    const val = el.dataset.counter;
    el.innerHTML = `<span class="sr-only">${val}</span>` + [...val].map(() => `<span class="odo" aria-hidden="true"><span class="odo__col">${'0123456789'.split('').map((d) => `<span>${d}</span>`).join('')}</span></span>`).join('');
    if (reduced) return $$('.odo__col', el).forEach((c, i) => (c.style.transform = `translateY(-${val[i] * 10}%)`));
    onView(el, () => $$('.odo__col', el).forEach((c, i) => gsap.fromTo(c, { yPercent: 0 }, { yPercent: -val[i] * 10, duration: 2.4 + i * 0.25, ease: 'expo.out', delay: i * 0.08 })));
  });

  await yieldTask();
  /* ---------- button text roll ---------- */
  $$('.btn > span').forEach((sp) => {
    const t = sp.textContent.trim();
    sp.innerHTML = `<span class="btn__t" data-t="${t}">${t}</span>`;
  });

  await yieldTask();
  /* ---------- illustrations draw themselves ---------- */
  $$('.illo').forEach((svg) => {
    if (svg.closest('.srv-preview')) return;
    const strokes = $$('path:not(.a):not([stroke-dasharray]), rect:not(.a), circle:not(.a)', svg);
    strokes.forEach((n) => n.setAttribute('pathLength', '1'));
    if (reduced) return;
    svg.classList.add('draw');
    const fills = $$('.a', svg);
    gsap.set(fills, { scale: 0, transformOrigin: '50% 50%' });
    onView(svg, () => {
      gsap.to(strokes, { strokeDashoffset: 0, duration: 1.8, stagger: 0.05, ease: 'power2.inOut' });
      gsap.to(fills, { scale: 1, duration: 1, delay: 0.7, stagger: 0.08, ease: 'back.out(2.5)' });
    });
  });

  if (!reduced) {
    await yieldTask();
    /* ---------- hairlines draw in ---------- */
    $$('.srv, .sec-item, .qa, .fit__list li, .facts dl > div, .cinfo__block, .stat, .reason, .foot__grid, .hero__foot').forEach((el) => {
      el.classList.add('line-draw');
      playOnView(gsap.fromTo(el, { '--d': 0 }, { '--d': 1, duration: 1.6, ease: 'expo.inOut', paused: true }), el);
    });

    await yieldTask();
    /* ---------- paragraphs: blurred word reveal ---------- */
    $$('.phero__lead, .hero__lead, .process__head .muted, .faq__head .muted, .work__side .muted, .sectors__lead, .story p, .guide__body p, .wcard--end p').forEach((el) => {
      const inHero = hero && hero.contains(el);
      const span = el.querySelector('.guide__n');
      const words = [];
      const walk = (node) => [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((w) => {
            if (!w) return;
            if (/^\s+$/.test(w)) return frag.appendChild(document.createTextNode(' '));
            const s2 = document.createElement('span'); s2.className = 'bw'; s2.textContent = w; frag.appendChild(s2); words.push(s2);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n !== span) walk(n);
      });
      walk(el);
      gsap.set(el, { opacity: 1, y: 0 });
      gsap.set(words, { opacity: 0, filter: 'blur(8px)', y: 12 });
      const play = () => gsap.to(words, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.018, ease: 'power3.out' });
      if (inHero) gsap.delayedCall(fromTransition ? 1.1 : (loader && !seen ? 1.6 : 0.6), play);
      else onView(el, play);
    });

    await yieldTask();
    /* ---------- hover ripple on titles ---------- */
    $$('.wave').forEach((el) => {
      const chars = $$('.ch', el);
      const host = el.closest('a, li, article') || el;
      host.addEventListener('pointerenter', () => {
        gsap.fromTo(chars, { y: 0 }, { y: -10, duration: 0.22, stagger: 0.018, ease: 'power2.out', yoyo: true, repeat: 1, overwrite: true });
      });
    });

    await yieldTask();
    /* ---------- scroll-velocity skew ---------- */
    const skewEls = $$('.pcard, .fitem, .scard, .pitem, .deliv__item, .velo__row');
    if (lenis && fine && skewEls.length) {
      const setters = skewEls.map((el) => gsap.quickTo(el, 'skewY', { duration: 0.5, ease: 'power3' }));
      const skewX = skewEls.map((el) => el.matches('.marquee__track span, .velo__row'));
      const setX = skewEls.map((el, i) => (skewX[i] ? gsap.quickTo(el, 'skewX', { duration: 0.5, ease: 'power3' }) : null));
      let last = 0;
      gsap.ticker.add(() => {
        const v = gsap.utils.clamp(-6, 6, lenis.velocity * 0.35);
        if (Math.abs(v - last) < 0.05) return;
        last = v;
        skewEls.forEach((el, i) => (skewX[i] ? setX[i](-v * 1.4) : setters[i](v * 0.5)));
      });
    }

    await yieldTask();
    /* ---------- project cards rise as the carousel moves ---------- */
    const hTrack = $('[data-hscroll-track]');
    const hTween = hTrack && gsap.getTweensOf(hTrack)[0];
    if (hTween && hTween.scrollTrigger) {
      $$('.pcard', hTrack).forEach((c) => {
        // The whole card moves, never the image inside it: covers stay uncropped.
        gsap.fromTo(c, { y: 70, rotate: 2.5 }, { y: 0, rotate: 0, ease: 'none', scrollTrigger: { trigger: c, containerAnimation: hTween, start: 'left right', end: 'center center', scrub: true } });
      });
    }

    await yieldTask();
    /* ---------- hero: letters thicken near the cursor, mark follows ---------- */
    const heroSec = $('.hero');
    if (heroSec && fine) {
      const chars = $$('.hero__title .chars .ch', heroSec).filter((c) => !c.closest('em'));
      let mx = -9999, my = -9999, active = false;
      const wt = chars.map(() => ({ v: 500 }));
      heroSec.addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; active = true; });
      heroSec.addEventListener('pointerleave', () => { mx = my = -9999; });
      const mk = $('.hero__mark', heroSec);
      const mkx = mk && gsap.quickTo(mk, 'x', { duration: 1.6, ease: 'power3' });
      const mky = mk && gsap.quickTo(mk, 'y', { duration: 1.6, ease: 'power3' });
      gsap.ticker.add(() => {
        if (!active) return;
        let moving = false;
        chars.forEach((c, i) => {
          const r = c.getBoundingClientRect();
          const d = Math.hypot(r.left + r.width / 2 - mx, r.top + r.height / 2 - my);
          const target = 500 + 350 * Math.max(0, 1 - d / 260);
          wt[i].v += (target - wt[i].v) * 0.14;
          if (Math.abs(target - wt[i].v) > 0.5) moving = true;
          c.style.fontVariationSettings = `'wght' ${wt[i].v.toFixed(0)}`;
        });
        if (mk && mx > -9999) { mkx((mx - innerWidth / 2) * 0.04); mky((my - innerHeight / 2) * 0.04); }
        if (!moving && mx === -9999) active = false;
      });
    }

    await yieldTask();
    /* ---------- footer CTA letters: weight wave on hover ---------- */
    const big = $('.foot__big');
    if (big) {
      const chars = $$('.ch', big);
      big.addEventListener('pointerenter', () => gsap.to(chars, { '--w': 640, duration: 0.5, stagger: { each: 0.025, from: 'start' }, ease: 'power2.out' }));
      big.addEventListener('pointerleave', () => gsap.to(chars, { '--w': 500, duration: 0.6, stagger: { each: 0.02, from: 'end' }, ease: 'power2.out' }));
    }

    await yieldTask();
    /* ---------- footer slides up from under the CTA panel (desktop) ---------- */
    const fBase = $('[data-foot-base]');
    if (fBase && $('.foot__top') && innerWidth > 900) {
      gsap.fromTo(fBase, { yPercent: -30 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: fBase, start: 'top bottom', end: 'bottom bottom', scrub: true } });
    }

    /* ---------- footer columns cascade ---------- */
    $$('.foot__grid > div').forEach((col, i) => {
      playOnView(gsap.from($$('.foot__h, li, address', col), { opacity: 0, y: 24, duration: 1, stagger: 0.05, delay: i * 0.1, paused: true }), '.foot__grid');
    });

    await yieldTask();
    /* ---------- process cards slide in ---------- */
    $$('.step__in').forEach((c) => {
      // No opacity in the entrance: the card is visible as soon as it rises into view (it used to stay dark).
      playOnView(gsap.fromTo(c, { x: 90, rotate: 3 }, { x: 0, rotate: 0, duration: 1.2, paused: true }), c);
      playOnView(gsap.from($('.step__n', c), { scale: 3, opacity: 0, duration: 1.2, paused: true }), c);
    });

    await yieldTask();
    /* ---------- section heads: eyebrow dot pops ---------- */
    $$('.eyebrow .dot').forEach((d) => playOnView(gsap.from(d, { scale: 0, duration: 1, ease: 'back.out(3)', paused: true }), d));


    await yieldTask();
    /* ---------- FAQ answers ---------- */
    $$('.qa').forEach((d) => d.addEventListener('toggle', () => {
      if (d.open) gsap.fromTo($('.qa__a p', d), { opacity: 0, y: 16, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, delay: 0.1 });
    }));

    await yieldTask();
    /* ---------- loader word ---------- */
    const lw = $('.loader__label');
    if (lw && loader && !seen) gsap.from(lw, { opacity: 0, y: 20, duration: 1, delay: 0.2 });
  }

  await yieldTask();
  /* ---------- cursor ring + card spotlight ---------- */
  whenMouse(() => {
    const ring = $('[data-ring]');
    if (ring) {
      const rx = gsap.quickTo(ring, 'x', { duration: 0.7, ease: 'power3' });
      const ry = gsap.quickTo(ring, 'y', { duration: 0.7, ease: 'power3' });
      addEventListener('pointermove', (e) => { rx(e.clientX); ry(e.clientY); ring.classList.add('is-on'); });
      document.addEventListener('pointerover', (e) => ring.classList.toggle('is-big', !!e.target.closest('a, button, summary, [data-tilt], .sec-item')));
      addEventListener('pointerdown', () => gsap.fromTo(ring, { scale: 0.7 }, { scale: 1, duration: 0.6, ease: 'elastic.out(1,.4)' }));
    }
    $$('.scard, .deliv__item, .reason, .step__in, .events li, .pcard__stage, .fit__list li, .cinfo__block').forEach((el) => {
      el.classList.add('spot');
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  });

  /* =========================================================
     v4 — new motion styles
     ========================================================= */
  await yieldTask();
  if (!reduced) {
    await yieldTask();
    /* ---------- hero kicker types itself ---------- */
    const kick = $('.hero__kicker');
    if (kick) {
      const t = [...kick.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim()) || $('.sc', kick);
      const node = t && t.nodeType === 3 ? t : t;
      if (node) {
        const full = node.textContent;
        const caret = document.createElement('span');
        caret.className = 'caret';
        caret.setAttribute('aria-hidden', 'true');
        kick.appendChild(caret);
        node.textContent = '';
        const o = { n: 0 };
        gsap.to(o, { n: full.length, duration: full.length * 0.028, ease: 'none', delay: fromTransition ? 0.9 : (loader && !seen ? 1.3 : 0.4),
          onUpdate: () => (node.textContent = full.slice(0, Math.round(o.n))),
          onComplete: () => gsap.to(caret, { opacity: 0, duration: 0.4, delay: 2.5, onComplete: () => caret.remove() }) });
      }
    }

    await yieldTask();
    /* ---------- outline headings fill with colour as you scroll ---------- */
    $$('.stats .h2, .process__head .h2, .ev .h2, .reasons .h2, .faq__head .h2').forEach((h) => {
      h.classList.add('fill');
      const chars = $$('.ch', h);
      gsap.fromTo(chars, { '--f': 0 }, { '--f': 1, stagger: 0.04, ease: 'none', scrollTrigger: { trigger: h, start: 'top 85%', end: 'top 40%', scrub: 0.6 } });
    });

    await yieldTask();
    /* ---------- image wipes with different shapes ---------- */
    $$('.fitem__img').forEach((m) => playOnView(gsap.fromTo(m,
      { clipPath: 'polygon(0% 0%, 0% 0%, -30% 100%, -30% 100%)' },
      { clipPath: 'polygon(0% 0%, 130% 0%, 100% 100%, -30% 100%)', duration: 1, ease: 'expo.out', paused: true, onComplete: () => (m.style.clipPath = 'none') }), m));
    $$('.pitem__img').forEach((m) => playOnView(gsap.fromTo(m,
      { clipPath: 'circle(0% at 50% 60%)' },
      { clipPath: 'circle(80% at 50% 50%)', duration: 1, ease: 'expo.out', paused: true, onComplete: () => (m.style.clipPath = 'none') }), m));

    await yieldTask();
    /* ---------- process progress rail ---------- */
    $$('.process__body').forEach((b) => gsap.to($('.process__rail i', b), { scaleY: 1, ease: 'none', scrollTrigger: { trigger: b, start: 'top 70%', end: 'bottom 60%', scrub: true } }));

    await yieldTask();
    /* ---------- page-hero illustration floats ---------- */
    $$('.phero__illo').forEach((il) => {
      gsap.to(il, { y: -14, rotate: 1.5, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to(il, { yPercent: 18, ease: 'none', scrollTrigger: { trigger: il.closest('section'), start: 'top top', end: 'bottom top', scrub: true } });
    });

    await yieldTask();
    /* ---------- contact form cascades in ---------- */
    const form = $('[data-form]');
    if (form) {
      gsap.from($$('.form__chips label', form), { opacity: 0, scale: 0.6, y: 20, duration: 0.8, stagger: 0.04, ease: 'back.out(2)', delay: 0.6 });
      gsap.from($$('.field, .form__foot', form), { opacity: 0, y: 40, duration: 1.1, stagger: 0.08, delay: 0.9 });
      gsap.from($$('.cinfo__block', document), { opacity: 0, x: 60, duration: 1.2, stagger: 0.1, delay: 0.8 });
    }

    await yieldTask();
    /* ---------- events: pinned photo deck ---------- */
    const deck = $('[data-deck]');
    if (deck) {
      const cards = $$('.deck__card', deck);
      const evEl = $('[data-deck-ev]', deck), idxEl = $('[data-deck-i]', deck);
      let shown = 0;
      const setCaption = (i) => {
        if (i === shown) return;
        shown = i;
        idxEl.textContent = String(i + 1).padStart(2, '0');
        const name = cards[i].dataset.event;
        if (evEl.textContent !== name) gsap.fromTo(evEl, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, onStart: () => (evEl.textContent = name) });
      };
      const tl = gsap.timeline({ scrollTrigger: { trigger: deck, start: 'top top', end: () => '+=' + (cards.length - 1) * innerHeight * 0.45, pin: true, scrub: 0.6, anticipatePin: 1, refreshPriority: 1,
        onUpdate: (st) => setCaption(Math.min(cards.length - 1, Math.floor(st.progress * (cards.length - 1) + 0.15))) } });
      cards.slice(0, -1).forEach((c, i) => {
        const side = i % 2 ? 1 : -1;
        tl.to(c, { yPercent: -280, xPercent: -50 + side * 55, rotate: side * gsap.utils.random(18, 32), ease: 'power2.in', duration: 1 }, i)
          .to(c, { opacity: 0, ease: 'power1.in', duration: 0.35 }, i + 0.65)
          .fromTo(cards[i + 1], { scale: 0.94 }, { scale: 1, ease: 'power2.out', duration: 1 }, i);
      });
      playOnView(gsap.from(cards, { y: 120, opacity: 0, rotate: 0, stagger: 0.06, duration: 1.2, paused: true }), deck);
    }

  }
  await yieldTask();
  {
    /* ---------- events: image trail on hover ---------- */
    const list = $('[data-trail-list]');
    const layer = $('[data-trail-layer]');
    if (list && layer && list.dataset.trail) whenMouse(() => {
      const srcs = JSON.parse(list.dataset.trail);
      const pool = Array.from({ length: 10 }, () => { const im = document.createElement('img'); im.alt = ''; im.decoding = 'async'; layer.appendChild(im); return im; });
      let k = 0, lx = 0, ly = 0, cur = null, n = 0;
      $$('.ev__item', list).forEach((li) => li.addEventListener('pointerenter', () => { cur = srcs[li.dataset.event] || []; n = 0; }));
      list.addEventListener('pointerleave', () => (cur = null));
      list.addEventListener('pointermove', (e) => {
        if (!cur || !cur.length) return;
        if (Math.hypot(e.clientX - lx, e.clientY - ly) < 90) return;
        lx = e.clientX; ly = e.clientY;
        const im = pool[k++ % pool.length];
        im.src = cur[n++ % cur.length];
        gsap.killTweensOf(im);
        gsap.set(im, { x: e.clientX - 90, y: e.clientY - 110, opacity: 1, scale: 0.5, rotate: gsap.utils.random(-12, 12), zIndex: k });
        gsap.to(im, { scale: 1, duration: 0.6, ease: 'expo.out' });
        gsap.to(im, { opacity: 0, y: '+=80', scale: 0.8, duration: 0.9, delay: 0.5, ease: 'power2.in' });
      });
    });
  }

  /* ---------- events gallery: filters ---------- */
  const gf = $('[data-gfilters]');
  if (gf) {
    gf.addEventListener('click', (e) => {
      const b = e.target.closest('[data-gfilter]');
      if (!b) return;
      const k = b.dataset.gfilter;
      $$('[data-gfilter]', gf).forEach((x) => x.setAttribute('aria-pressed', x === b));
      $$('[data-gev]').forEach((sec) => {
        const show = k === 'all' || sec.dataset.gev === k;
        sec.hidden = !show;
        if (show && !reduced) {
          $$('.media-reveal', sec).forEach((m) => (m.style.clipPath = 'none'));
          gsap.fromTo(sec, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9 });
        }
      });
      ScrollTrigger.refresh();
    });
  }

  /* ---------- events gallery: photo viewer ---------- */
  const gbox = $('[data-gbox]');
  if (gbox) {
    const img = $('img', gbox), cap = $('[data-gbox-cap]', gbox);
    let idx = 0;
    const items = () => $$('[data-gbox-item]').filter((b) => !b.closest('[hidden]'));
    const show = (i, dir = 0) => {
      const list = items();
      idx = (i + list.length) % list.length;
      const b = list[idx];
      const thumb = $('img', b);
      const token = idx;
      const swap = () => {
        img.alt = thumb ? thumb.alt : '';
        cap.textContent = b.dataset.caption;
        const preview = thumb ? (thumb.currentSrc || thumb.src) : '';
        if (preview) img.src = preview;
        gbox.classList.add('is-loading');
        const full = new Image();
        const reveal = () => {
          if (token !== idx) return;
          img.src = b.dataset.full;
          gbox.classList.remove('is-loading');
        };
        full.onload = reveal;
        full.onerror = () => { if (token === idx) gbox.classList.remove('is-loading'); };
        full.src = b.dataset.full;
        if (full.complete && full.naturalWidth) reveal();
        const nxt = list[(idx + 1) % list.length];
        if (nxt && nxt.dataset.full) { const pre = new Image(); pre.src = nxt.dataset.full; }
      };
      if (reduced || !dir) { swap(); reduced || gsap.fromTo(img, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.7 }); return; }
      gsap.to(img, { xPercent: -dir * 12, opacity: 0, duration: 0.25, ease: 'power2.in', onComplete: () => {
        swap();
        gsap.fromTo(img, { xPercent: dir * 12, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.6, ease: 'expo.out' });
      } });
    };
    $$('[data-gbox-item]').forEach((b) => b.addEventListener('click', () => {
      show(items().indexOf(b));
      gbox.showModal();
      lenis && lenis.stop();
    }));
    $('[data-gbox-prev]', gbox).addEventListener('click', () => show(idx - 1, -1));
    $('[data-gbox-next]', gbox).addEventListener('click', () => show(idx + 1, 1));
    $('[data-gbox-close]', gbox).addEventListener('click', () => gbox.close());
    gbox.addEventListener('click', (e) => { if (e.target === gbox || e.target.classList.contains('gbox__fig')) gbox.close(); });
    gbox.addEventListener('close', () => lenis && lenis.start());
    gbox.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') show(idx + 1, 1);
      if (e.key === 'ArrowLeft') show(idx - 1, -1);
    });
    let sx = null;
    gbox.addEventListener('pointerdown', (e) => (sx = e.clientX));
    gbox.addEventListener('pointerup', (e) => {
      if (sx === null) return;
      const dx = e.clientX - sx;
      sx = null;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    });
  }

  /* ---------- testimonials: certificate stack + quote ---------- */
  $$('[data-tst]').forEach((box) => {
    const items = $$('[data-tst-item]', box);
    const docs = $$('[data-tst-doc]', box);
    const thumbs = $$('[data-tst-go]', box);
    const stamp = $('[data-tst-stamp]', box);
    const docsBox = $('[data-tst-docs]', box);
    const strip = $('[data-tst-thumbs]', box);
    const idx = $('[data-tst-i]', box);
    const n = items.length;
    if (n < 2) return;
    let i = 0, timer = null, hovering = false;
    const DUR = 9;

    // Stack depth → pose. The top sheet is straight; the ones behind fan out a little.
    const pose = (d) => d === 0 ? { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }
      : d === 1 ? { xPercent: -7, yPercent: -3, rotate: -5, scale: 0.95, opacity: 1 }
      : d === 2 ? { xPercent: 8, yPercent: -6, rotate: 6, scale: 0.9, opacity: 1 }
      : { xPercent: 0, yPercent: -8, rotate: 0, scale: 0.86, opacity: 0 };
    const layout = (animate, skip) => docs.forEach((doc, j) => {
      if (doc === skip) return;
      const d = (j - i + n) % n;
      const p = { xPercent: 0, yPercent: 0, ...pose(d), zIndex: n - d };
      if (animate) gsap.to(doc, { ...p, duration: 1.1, ease: 'expo.out', overwrite: 'auto' });
      else gsap.set(doc, p);
    });
    layout(false);

    // Split quote words, keeping the highlighted phrase wrapped in its <mark>.
    const split = (p) => {
      if (p.dataset.split) return;
      p.dataset.split = '1';
      const wrap = (node) => [...node.childNodes].forEach((c) => {
        if (c.nodeType === 3) {
          const frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach((w) => {
            if (!w) return;
            if (/^\s+$/.test(w)) return frag.appendChild(document.createTextNode(' '));
            const sp = document.createElement('span'); sp.className = 'bw'; sp.textContent = w; frag.appendChild(sp);
          });
          c.replaceWith(frag);
        } else if (c.nodeType === 1) wrap(c);
      });
      wrap(p);
    };
    const reveal = (it) => {
      if (reduced) return;
      const p = $('.tst__quote p', it);
      split(p);
      const words = $$('.bw', p);
      const hl = $('.tst__hl', it);
      gsap.fromTo($('.tst__top', it), { opacity: 0, y: 14, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(2)' });
      gsap.fromTo(words, { opacity: 0, y: 16, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.016, ease: 'power3.out', delay: 0.1 });
      if (hl) gsap.fromTo(hl, { backgroundSize: '0% .4em' }, { backgroundSize: '100% .4em', duration: 0.9, ease: 'power2.inOut', delay: 0.25 + words.length * 0.016 });
      gsap.fromTo($('.tst__ava', it), { scale: 0.4, opacity: 0, rotate: -40 }, { scale: 1, opacity: 1, rotate: 0, duration: 1, ease: 'back.out(1.8)', delay: 0.3 });
      gsap.fromTo([$('.tst__meta', it), $('.tst__proj', it), $('.tst__cert', it)], { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.9, stagger: 0.08, delay: 0.38 });
    };
    const slam = () => {
      if (reduced || !stamp) return;
      gsap.fromTo(stamp, { scale: 1.9, opacity: 0, rotate: -40 }, { scale: 1, opacity: 1, rotate: -12, duration: 0.5, ease: 'back.out(2.2)', delay: 0.5 });
      gsap.fromTo(docsBox, { x: 0 }, { x: 4, duration: 0.05, repeat: 5, yoyo: true, ease: 'none', delay: 0.62, clearProps: 'x' });
    };
    const go = (to, byUser) => {
      const next = (to + n) % n;
      if (next === i) return;
      const dir = byUser === -1 ? -1 : 1;
      const prev = i, out = items[prev];
      i = next;
      // Leaving sheet is thrown off the stack (forward), or the arriving one is pulled back on (backward).
      if (!reduced) {
        if (dir > 0) {
          const doc = docs[prev];
          gsap.to(doc, { xPercent: -130, yPercent: 12, rotate: -24, opacity: 0, duration: 0.75, ease: 'power3.in', zIndex: n + 1, overwrite: 'auto',
            onComplete: () => { const d = (prev - i + n) % n; gsap.set(doc, { xPercent: 0, yPercent: 0, ...pose(d), zIndex: n - d }); } });
          layout(true, doc);
        } else {
          gsap.set(docs[i], { xPercent: -130, yPercent: 12, rotate: -24, opacity: 0, zIndex: n + 1 });
          layout(true);
        }
        gsap.killTweensOf(items[i]);
        gsap.set(items[i], { clearProps: 'opacity,transform' });
        gsap.to(out, { opacity: 0, y: -14, duration: 0.35, ease: 'power2.in', onComplete: () => { if (out !== items[i]) out.classList.remove('is-active'); gsap.set(out, { clearProps: 'opacity,transform' }); } });
      } else { out.classList.remove('is-active'); layout(false); }
      items[i].classList.add('is-active');
      thumbs.forEach((t, j) => { t.classList.toggle('is-active', j === i); j === i ? t.setAttribute('aria-current', 'true') : t.removeAttribute('aria-current'); t.style.removeProperty('--p'); });
      const th = thumbs[i];
      if (strip && th) strip.scrollTo({ left: th.offsetLeft - strip.clientWidth / 2 + th.clientWidth / 2, behavior: reduced ? 'auto' : 'smooth' });
      idx.textContent = String(i + 1).padStart(2, '0');
      reveal(items[i]);
      slam();
      restart();
    };
    const restart = () => {
      if (timer) timer.kill();
      if (reduced) return;
      const th = thumbs[i], o = { p: 1 };
      timer = gsap.to(o, { p: 0, duration: DUR, ease: 'none', paused: hovering, onUpdate: () => th && th.style.setProperty('--p', o.p.toFixed(4)), onComplete: () => go(i + 1) });
    };
    $('[data-tst-next]', box).addEventListener('click', () => go(i + 1, 1));
    $('[data-tst-prev]', box).addEventListener('click', () => go(i - 1, -1));
    thumbs.forEach((t, j) => t.addEventListener('click', () => go(j, j < i ? -1 : 1)));
    docsBox.addEventListener('click', () => go(i + 1, 1));
    box.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') go(i + 1, 1);
      if (e.key === 'ArrowLeft') go(i - 1, -1);
    });
    const stage = $('.tst__stage', box);
    stage.addEventListener('pointerenter', (e) => { if (e.pointerType !== 'mouse') return; hovering = true; timer && timer.pause(); });
    stage.addEventListener('pointerleave', () => { hovering = false; timer && timer.resume(); });
    let sx = null;
    stage.addEventListener('pointerdown', (e) => (sx = e.clientX));
    stage.addEventListener('pointerup', (e) => { if (sx !== null && Math.abs(e.clientX - sx) > 50) go(i + (e.clientX < sx ? 1 : -1), e.clientX < sx ? 1 : -1); sx = null; });
    // The certificate stack leans toward the cursor.
    if (!reduced) whenMouse(() => {
      const rx = gsap.quickTo(docsBox, 'rotationX', { duration: 0.8, ease: 'power3' });
      const ry = gsap.quickTo(docsBox, 'rotationY', { duration: 0.8, ease: 'power3' });
      gsap.set(docsBox, { transformPerspective: 1200 });
      docsBox.addEventListener('pointermove', (e) => {
        const b = docsBox.getBoundingClientRect();
        ry(((e.clientX - b.left) / b.width - 0.5) * 14);
        rx(-((e.clientY - b.top) / b.height - 0.5) * 10);
      });
      docsBox.addEventListener('pointerleave', () => { rx(0); ry(0); });
    });
    // Start cycling only once the section is seen; the stack deals itself in first.
    onView(box, () => {
      if (!reduced) gsap.from(docs.slice(0, 3), { yPercent: 40, rotate: (k) => [-14, 10, -6][k], opacity: 0, duration: 1.3, stagger: -0.12, ease: 'expo.out', onComplete: () => layout(false) });
      reveal(items[0]);
      slam();
      restart();
    });
  });

  await yieldTask();
  /* ---------- project pages: cover settles, device mockup floats ---------- */
  const caseCover = $('[data-case-cover]');
  if (caseCover && !reduced) {
    // The frame grows to full width as it scrolls in; the image itself is never scaled or shifted (no cropping).
    gsap.fromTo(caseCover, { scale: 0.9 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: caseCover, start: 'top bottom', end: 'top 25%', scrub: true } });
    const show = $('[data-case-show]');
    const mock = show && $('.case__mock', show);
    if (mock) {
      gsap.fromTo(mock, { y: 50, rotate: -3, scale: 0.9 }, { y: -30, rotate: 1.5, scale: 1, ease: 'none', scrollTrigger: { trigger: show, start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
    }
  }

  /* ---------- blog: theme filters ---------- */
  const bf = $('[data-bfilters]');
  if (bf) {
    const items = $$('[data-bitem]');
    const empty = $('[data-bempty]');
    bf.addEventListener('click', (e) => {
      const b = e.target.closest('[data-bfilter]');
      if (!b) return;
      const k = b.dataset.bfilter;
      $$('[data-bfilter]', bf).forEach((x) => x.setAttribute('aria-pressed', x === b));
      let gridShown = 0;
      items.forEach((it) => {
        const show = k === 'all' || it.dataset.cat === k;
        if (show && !it.matches('.bfeat')) gridShown++;
        if (!show) { it.hidden = true; return; }
        it.hidden = false;
        $$('.media-reveal', it).forEach((m) => (m.style.clipPath = 'none'));
        gsap.fromTo(it, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: reduced ? 0 : 0.9, overwrite: 'auto' });
      });
      if (empty) empty.hidden = gridShown > 0;
      ScrollTrigger.refresh();
    });
  }

  /* ---------- article: reading progress + active chapter in the table of contents ---------- */
  const post = $('[data-post]');
  if (post) {
    const pct = $('[data-read-pct]'), bar = $('[data-read-bar]');
    const links = $$('[data-toc] a');
    const heads = links.map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1)))).filter(Boolean);
    ScrollTrigger.create({
      trigger: post, start: 'top 70%', end: 'bottom 70%',
      onUpdate: (st) => {
        if (pct) pct.textContent = Math.round(st.progress * 100) + ' %';
        if (bar) bar.style.transform = `scaleX(${st.progress})`;
      },
    });
    heads.forEach((h, i) => ScrollTrigger.create({
      trigger: h, start: 'top 45%', endTrigger: heads[i + 1] || post, end: heads[i + 1] ? 'top 45%' : 'bottom 45%',
      onToggle: (st) => st.isActive && links.forEach((a, j) => a.classList.toggle('is-active', j === i)),
    }));
    // Chapter titles slide in from the margin; pull quotes open like a curtain.
    if (!reduced) {
      $$('.post__h2', post).forEach((h) => playOnView(gsap.fromTo(h, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 1.1, paused: true }), h));
      $$('.post__quote', post).forEach((q) => playOnView(gsap.fromTo(q, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'expo.inOut', paused: true, onComplete: () => (q.style.clipPath = 'none') }), q));
      $$('.post__ol li, .post__brief li', post).forEach((li, i) => playOnView(gsap.fromTo(li, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, delay: (i % 5) * 0.06, paused: true }), li));
    }
  }
  $$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
    const label = $('[data-copy-label]', b);
    try { await navigator.clipboard.writeText(b.dataset.copy); } catch (e) { return; }
    b.classList.add('is-done');
    if (label) label.textContent = T.copied;
    setTimeout(() => { b.classList.remove('is-done'); if (label) label.textContent = T.copy; }, 2200);
  }));

  /* ---------- team: tap a card to open its panel (touch-only screens; with a mouse, hover opens it in CSS) ---------- */
  // Touchscreen laptops report no hover even with a mouse, so the test is .has-mouse (set on the first real
  // mouse movement by whenMouse), not the (any-hover) media query.
  $$('.tcard').forEach((c) => c.addEventListener('click', () => {
    if (root.classList.contains('has-mouse') && innerWidth > 700) return;
    const open = !c.classList.contains('is-open');
    $$('.tcard.is-open').forEach((o) => o.classList.remove('is-open'));
    c.classList.toggle('is-open', open);
    if (open && innerWidth <= 700) setTimeout(() => c.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest' }), 80);
  }));

  /* ---------- fixed controls: rail progress, contrast on light sections, floating CTA ---------- */
  // Rails only exist on wide screens; skip their work elsewhere. The contrast class goes on the
  // rails themselves (not <html>) so switching it restyles two small elements, not the whole page.
  const rails = $$('[data-rail]');
  if (rails.length && matchMedia('(min-width: 1200px)').matches) {
    const railProg = $('[data-rail-progress]');
    if (railProg) gsap.to(railProg, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 } });
    $$('[data-theme="light"]').forEach((sec) => ScrollTrigger.create({
      trigger: sec, start: 'top 55%', end: 'bottom 45%',
      onToggle: (st) => rails.forEach((r) => r.classList.toggle('on-light', st.isActive)),
    }));
    // Explicit end values: a from() would end on whatever opacity the element happened to have.
    rails.forEach((r, i) => reduced || gsap.fromTo(r, { opacity: 0, x: i ? 30 : -30 }, { opacity: 1, x: 0, duration: 1.2, delay: 1.2, clearProps: 'opacity' }));
  }
  const fabCta = $('[data-fab-cta]');
  if (fabCta) {
    // Shown once the hero is passed; hidden again while the footer's own call-to-action is on screen.
    let pastHero = false, footVisible = false;
    const sync = () => fabCta.classList.toggle('is-on', pastHero && !footVisible);
    const onS = () => { pastHero = scrollY > innerHeight * 0.6; sync(); };
    addEventListener('scroll', onS, { passive: true });
    onS();
    const fc = $('.foot__cta');
    if (fc && io) new IntersectionObserver(([en]) => { footVisible = en.isIntersecting; sync(); }).observe(fc);
  }
  const fabs = $('[data-fabs]');
  if (fabs && !reduced) gsap.fromTo(fabs.children, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'back.out(2)', delay: 1.4, clearProps: 'transform,opacity' });

  /* ---------- keep triggers accurate: one refresh once setup and fonts are done ---------- */
  if (document.fonts) await document.fonts.ready;
  ScrollTrigger.refresh();
})();
