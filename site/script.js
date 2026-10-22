(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  if (!reduce && hasGsap) document.documentElement.classList.add('js');

  /* ---- Nav ---- */
  const nav = document.getElementById('nav');
  const burger = document.querySelector('.burger');
  const menu = document.getElementById('menu');
  const onScroll = () => nav.classList.toggle('solid', window.scrollY > 60);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });
  menu.addEventListener('click', e => {
    if (e.target.closest('a')) { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
  });

  /* ---- Scroll suave (Lenis) ---- */
  let lenis = null;
  if (!reduce && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    if (hasGsap) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        const t = id.length > 1 && document.querySelector(id);
        if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -50 }); }
      });
    });
  }

  /* ---- Barra de progreso ---- */
  const bar = document.querySelector('.progress span');
  const prog = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
  };
  addEventListener('scroll', prog, { passive: true }); prog();

  /* ---- Red de nodos del hero (canvas) ---- */
  const cv = document.getElementById('net');
  const ctx = cv.getContext('2d');
  let W, H, pts = [], mouse = { x: -999, y: -999 };
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(110, (W * H) / 14000));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
      r: Math.random() * 1.6 + .8, c: Math.random() < .12
    }));
  };
  resize();
  addEventListener('resize', resize);
  cv.parentElement.addEventListener('pointermove', e => {
    const b = cv.getBoundingClientRect(); mouse.x = e.clientX - b.left; mouse.y = e.clientY - b.top;
  });
  cv.parentElement.addEventListener('pointerleave', () => { mouse.x = mouse.y = -999; });
  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(cv);
  const draw = () => {
    if (visible) {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 120) { p.x += dx / d * 1.4; p.y += dy / d * 1.4; }
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.strokeStyle = `rgba(224,123,68,${(1 - d / 130) * .35})`;
            ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const m = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (m < 160) {
          ctx.strokeStyle = `rgba(43,179,192,${(1 - m / 160) * .6})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = a.c ? '#2BB3C0' : 'rgba(247,242,234,.75)';
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 7); ctx.fill();
      }
    }
    if (!reduce) requestAnimationFrame(draw);
  };
  draw();

  /* ---- Tilt (vanilla-tilt) ---- */
  if (!reduce && typeof VanillaTilt !== 'undefined' && matchMedia('(hover: hover)').matches) {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), { speed: 600, scale: 1.02 });
  }

  /* ---- Contadores ---- */
  const counters = document.querySelectorAll('[data-count]');
  const setCount = (el, v) => { el.textContent = (el.dataset.prefix || '') + Math.round(v); };
  if (reduce || !hasGsap) {
    counters.forEach(el => setCount(el, +el.dataset.count));
  }

  if (reduce || !hasGsap) {
    document.querySelectorAll('.card').forEach(c => c.classList.add('in'));
    document.querySelectorAll('.tl-line span').forEach(s => { s.style.transform = 'none'; });
  } else {
    gsap.registerPlugin(ScrollTrigger);

    // Nombre del hero, línea por línea
    gsap.from('.hero-name .split', { yPercent: 115, rotate: 4, duration: 1.1, ease: 'power4.out', stagger: .12, delay: .15 });
    gsap.to('.hero .reveal-up', { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .12, delay: .6 });

    // Revelado genérico
    gsap.utils.toArray('.reveal-up').forEach(el => {
      if (el.closest('.hero')) return;
      gsap.to(el, { opacity: 1, y: 0, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });

    // Contadores
    counters.forEach(el => {
      const o = { v: 0 };
      ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () =>
        gsap.to(o, { v: +el.dataset.count, duration: 1.8, ease: 'power2.out', onUpdate: () => setCount(el, o.v) }) });
    });

    // Cartas: entrada escalonada y trazo de íconos
    gsap.from('.card', { opacity: 0, y: 60, duration: .9, stagger: .12, ease: 'power3.out',
      scrollTrigger: { trigger: '.cards', start: 'top 80%', once: true, onEnter: () => document.querySelectorAll('.card').forEach(c => c.classList.add('in')) } });

    // Línea de tiempo: línea que se dibuja y tarjetas que entran
    gsap.to('.tl-line span', { scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: '#timeline', start: 'top 70%', end: 'bottom 60%', scrub: true } });
    gsap.utils.toArray('.tl-item').forEach(item => {
      const from = item.classList.contains('left') ? -60 : 60;
      gsap.from(item, { opacity: 0, x: from, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 85%', once: true } });
    });

    // Parallax suave del retrato y de la sección oscura
    gsap.to('.portrait', { yPercent: -8, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('#net', { yPercent: 12, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    // Mapa: líneas y pines
    gsap.from('#map .pin', { scale: 0, transformOrigin: 'center', duration: .6, stagger: .15, ease: 'back.out(2)',
      scrollTrigger: { trigger: '#map', start: 'top 75%', once: true } });
    gsap.utils.toArray('#map .lk').forEach((p, i) => {
      gsap.from(p, { opacity: 0, duration: .8, delay: .4 + i * .2,
        scrollTrigger: { trigger: '#map', start: 'top 75%', once: true } });
    });
  }

  /* ---- Mapa interactivo ---- */
  const mt = document.getElementById('map-title');
  const md = document.getElementById('map-desc');
  document.querySelectorAll('#map .pin').forEach(pin => {
    pin.setAttribute('tabindex', '0');
    pin.setAttribute('role', 'button');
    pin.setAttribute('aria-label', `${pin.dataset.t}: ${pin.dataset.d}`);
    const show = () => {
      document.querySelectorAll('#map .pin').forEach(p => p.classList.remove('active'));
      pin.classList.add('active'); mt.textContent = pin.dataset.t; md.textContent = pin.dataset.d;
    };
    pin.addEventListener('click', show);
    pin.addEventListener('mouseenter', show);
    pin.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(); } });
  });

  /* ---- Acordeón: uno abierto a la vez ---- */
  const dets = document.querySelectorAll('#acc details');
  dets.forEach(d => d.addEventListener('toggle', () => {
    if (d.open) dets.forEach(o => { if (o !== d) o.open = false; });
    if (hasGsap) ScrollTrigger.refresh();
  }));

  /* ---- Formulario (solo validación en el navegador; aún no envía datos a ningún servidor) ---- */
  const form = document.getElementById('form');
  const msg = document.getElementById('form-msg');
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('[required]').forEach(f => {
      const bad = f.type === 'checkbox' ? !f.checked : !f.value.trim();
      f.classList.toggle('err', bad); if (bad) ok = false;
    });
    msg.textContent = ok
      ? 'Recibido. Esta es una versión de prueba: aún no se guardan datos.'
      : 'Revisa los campos marcados y acepta el tratamiento de datos.';
    if (ok) form.reset();
  });
})();
