(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  if (!reduce && hasGsap) document.documentElement.classList.add('js');

  /* ---- Pantalla de carga: se cierra cuando la tipografía y las imágenes clave están listas ---- */
  const pre = document.getElementById('preloader');
  const imgReady = src => new Promise(res => {
    const i = new Image();
    i.onload = i.onerror = () => res();
    i.src = src;
    if (i.decode) i.decode().then(res, res);
  });
  const key = [...document.querySelectorAll('link[rel="preload"][as="image"]')].map(l => imgReady(l.href));
  const minWait = new Promise(r => setTimeout(r, 800));
  const maxWait = new Promise(r => setTimeout(r, 6000));
  const fontsReady = (document.fonts && document.fonts.ready) || Promise.resolve();
  const appReady = Promise.race([Promise.all([minWait, fontsReady, ...key]), maxWait]).then(() => {
    document.documentElement.classList.remove('is-loading');
    if (pre) { pre.classList.add('done'); setTimeout(() => pre.remove(), 700); }
    // los videos de Instagram se cargan después, para no competir con el banner y las fotos
    document.querySelectorAll('iframe[data-src]').forEach(f => { f.src = f.dataset.src; });
    document.dispatchEvent(new Event('app:ready'));
    if (hasGsap) ScrollTrigger.refresh();
  });
  window.addEventListener('load', () => { if (hasGsap) ScrollTrigger.refresh(); });


  /* ---- Apariencia (tema): automático, claro u oscuro ---- */
  const themeBtn = document.querySelector('.settings-btn');
  const themePop = document.getElementById('theme-pop');
  if (themeBtn && themePop) {
    const root = document.documentElement;
    const saved = () => { try { return localStorage.getItem('tema') || 'auto'; } catch (e) { return 'auto'; } };
    const apply = t => {
      if (t === 'dark' || t === 'light') root.setAttribute('data-theme', t); else root.removeAttribute('data-theme');
      try { if (t === 'auto') localStorage.removeItem('tema'); else localStorage.setItem('tema', t); } catch (e) {}
      themePop.querySelectorAll('[data-tema]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tema === t)));
    };
    apply(saved());
    const toggle = open => { themePop.classList.toggle('open', open); themeBtn.setAttribute('aria-expanded', String(open)); };
    themeBtn.addEventListener('click', e => { e.stopPropagation(); toggle(!themePop.classList.contains('open')); });
    themePop.addEventListener('click', e => { const b = e.target.closest('[data-tema]'); if (b) { apply(b.dataset.tema); toggle(false); } });
    document.addEventListener('click', e => { if (!e.target.closest('.settings')) toggle(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });
  }

  /* ---- Desplegable del nav: Sobre Lengerke / Logros UTS ---- */
  const navDropBtn = document.querySelector('.nav-drop-btn');
  const navDropMenu = document.querySelector('.nav-drop-menu');
  if (navDropBtn && navDropMenu) {
    const toggleDrop = open => { navDropMenu.classList.toggle('open', open); navDropBtn.setAttribute('aria-expanded', String(open)); };
    navDropBtn.addEventListener('click', e => { e.stopPropagation(); toggleDrop(!navDropMenu.classList.contains('open')); });
    document.addEventListener('click', e => { if (!e.target.closest('.nav-drop')) toggleDrop(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleDrop(false); });
  }

  /* ---- Nav ---- */
  const nav = document.getElementById('nav');
  const burger = document.querySelector('.burger');
  const menu = document.getElementById('menu');
  const onScroll = () => nav.classList.toggle('solid', window.scrollY > 60 || document.body.hasAttribute('data-solid-nav'));
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
  // En el home (con secciones ancladas) el avance es del carrusel por secciones, no de Lenis: Lenis se queda apagado ahí
  // para que no compita por el control del scroll.
  const hasSnap = !!document.querySelector('[data-snap]');
  let lenis = null;
  if (!reduce && typeof Lenis !== 'undefined' && !hasSnap) {
    lenis = new Lenis({ duration: 0.85, smoothWheel: true });
    if (hasGsap) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      const t = id.length > 1 && document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(t, { offset: -50 });
      else t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
  });

  /* ---- Barra de progreso ---- */
  const bar = document.querySelector('.progress span');
  const prog = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
  };
  addEventListener('scroll', prog, { passive: true }); prog();

  /* ---- Red de nodos del hero (canvas) ---- */
  if (document.getElementById("net")) {
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
            ctx.strokeStyle = `rgba(0,135,58,${(1 - d / 130) * .35})`;
            ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const m = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (m < 160) {
          ctx.strokeStyle = `rgba(0,135,58,${(1 - m / 160) * .6})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = a.c ? '#00873A' : 'rgba(6,78,43,.55)';
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 7); ctx.fill();
      }
    }
    if (!reduce) requestAnimationFrame(draw);
  };
  draw();

  }

  /* ---- Tilt (vanilla-tilt) ---- */
  if (!reduce && typeof VanillaTilt !== 'undefined' && matchMedia('(hover: hover)').matches) {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), { speed: 600, scale: 1.02 });
  }

  /* ---- Crecimiento (Territorio): pictograma de personas que se va llenando ---- */
  const growthPeople = document.getElementById('growthPeople');
  if (growthPeople) {
    const total = 72;
    for (let i = 0; i < total; i++) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'gp');
      svg.setAttribute('viewBox', '0 0 24 24');
      const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#gp-icon');
      use.setAttribute('href', '#gp-icon');
      svg.appendChild(use);
      growthPeople.appendChild(svg);
    }
  }

  /* ---- Botón flotante de WhatsApp: a la vista en el inicio, se repliega a un lado en el resto y vuelve al acercarse ---- */
  const waFloat = document.querySelector('.wa-float');
  if (waFloat) {
    const waTarget = document.querySelector('#inicio') || document.querySelector('.page-head') || document.querySelector('main');
    if (waTarget) {
      // Se revisa en cada frame (en vez de escuchar "scroll") porque Lenis anima el
      // desplazamiento por su cuenta y no siempre dispara el evento nativo del navegador.
      let waLastState = null;
      const waLoop = () => {
        const r = waTarget.getBoundingClientRect();
        const visible = Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0));
        const ratio = r.height > 0 ? visible / Math.min(r.height, innerHeight) : 0;
        const collapsed = ratio < 0.35;
        if (collapsed !== waLastState) { waFloat.classList.toggle('is-collapsed', collapsed); waLastState = collapsed; }
        requestAnimationFrame(waLoop);
      };
      waLoop();
    }
  }

  /* ---- Contadores ---- */
  const counters = document.querySelectorAll('[data-count]');
  const setCount = (el, v) => { const n = Math.round(v); el.textContent = (el.dataset.prefix || '') + (el.dataset.fmt ? n.toLocaleString('es-CO') : n) + (el.dataset.suffix || ''); };
  if (reduce || !hasGsap) {
    counters.forEach(el => setCount(el, +el.dataset.count));
  }

  if (reduce || !hasGsap) {
    document.querySelectorAll('.card').forEach(c => c.classList.add('in'));
    document.querySelectorAll('.tl-line span').forEach(s => { s.style.transform = 'none'; });
    document.querySelectorAll('.growth-people .gp').forEach(g => { g.style.opacity = 1; g.style.transform = 'none'; });
  } else {
    gsap.registerPlugin(ScrollTrigger);

    // Nombre del hero, línea por línea (la portada «retrato al centro» anima su entrada con CSS)
    if (document.querySelector('.hero-name')) {
      const heroA = gsap.from('.hero-name .split', { yPercent: 115, rotate: 4, duration: 1.1, ease: 'power4.out', stagger: .12, delay: .1, paused: true });
      const heroB = gsap.to('.hero .reveal-up', { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .12, delay: .45, paused: true });
      appReady.then(() => { heroA.play(); heroB.play(); });
    }

    // Paralaje del hero: la foto y la red de fondo se mueven a otro ritmo que el texto,
    // y el nombre se encoge mientras se hace scroll, como una intro cinematográfica.
    // Sin pin (probado y descartado: generaba parpadeos al combinarse con el scroll
    // suave de Lenis) — el scroll nunca se retiene ni se bloquea.
    if (document.querySelector('.portrait')) {
      gsap.to('.portrait', { yPercent: 14, scale: .82, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: '70% top', scrub: true } });
    }
    if (document.getElementById('net')) {
      gsap.to('#net', { yPercent: 22, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    }
    if (document.querySelector('.hero-name')) {
      gsap.to('.hero-name', { scale: .68, yPercent: -20, opacity: .3, transformOrigin: 'left top', ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: '70% top', scrub: true } });
    }

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

    // Mapa: los pines aparecen después del mapa (si la página todavía tiene el mapa)
    if (document.getElementById("map")) {
      gsap.from("#map .pin", { opacity: 0, duration: .7, stagger: .15, ease: "power2.out",
        scrollTrigger: { trigger: "#map", start: "top 75%", once: true } });
      gsap.from("#map .mun", { opacity: 0, duration: .8, stagger: { amount: .8, from: "random" }, ease: "power1.out",
        scrollTrigger: { trigger: "#map", start: "top 80%", once: true } });
    }

    // Crecimiento: el grupo de personas se va formando, primero pocas y luego muchas
    if (growthPeople) {
      gsap.from('.growth-people .gp', { opacity: 0, scale: 0, duration: .5, ease: 'back.out(2)',
        stagger: { each: .02, from: 'start' },
        scrollTrigger: { trigger: '.growth-viz', start: 'top 80%', once: true } });
    }
  }

  /* ---- Mapa interactivo (si la página todavía tiene el mapa) ---- */
  if (document.getElementById("map")) {
    const mt = document.getElementById("map-title");
    const md = document.getElementById("map-desc");
    const pinsEl = [...document.querySelectorAll("#map .pin")];
    const clear = () => document.querySelectorAll("#map .active").forEach(e => e.classList.remove("active"));
    const show = (t, d, ...els) => { clear(); els.forEach(e => e && e.classList.add("active")); mt.textContent = t; md.textContent = d; };
    pinsEl.forEach(pin => {
      pin.setAttribute("tabindex", "0");
      pin.setAttribute("role", "button");
      pin.setAttribute("aria-label", pin.dataset.t + ": " + pin.dataset.d);
      const mun = [...document.querySelectorAll("#map .mun[data-k]")].find(m => m.dataset.n === (pin.dataset.t === "El Socorro" ? "Socorro" : pin.dataset.t));
      const go = () => show(pin.dataset.t, pin.dataset.d, pin, mun);
      pin.addEventListener("mousedown", e => e.preventDefault());
      pin.addEventListener("click", go);
      pin.addEventListener("mouseenter", go);
      pin.addEventListener("focus", go);
      pin.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
      if (mun) { mun.addEventListener("click", go); mun.addEventListener("mouseenter", go); }
    });
    document.querySelectorAll("#map .mun:not([data-k])").forEach(m => {
      m.addEventListener("mouseenter", () => show(m.dataset.n, "Municipio de Santander."));
    });
  }

  /* ---- Investigación: líneas, filtros y publicaciones ---- */
  const ICONS = {
    robotica: '<svg viewBox="0 0 48 48"><rect x="11" y="16" width="26" height="19" rx="4"/><path d="M24 16V9"/><circle cx="24" cy="7" r="2"/><circle cx="18.5" cy="25" r="2.4"/><circle cx="29.5" cy="25" r="2.4"/><path d="M19 31h10"/><path d="M7 22v9M41 22v9"/><path d="M17 35v6M31 35v6"/></svg>',
    energia: '<svg viewBox="0 0 48 48"><circle cx="24" cy="12" r="5"/><path d="M24 2v2M24 20v2M14 12h-2M36 12h-2M17 5l-1.5-1.5M33 5l1.5-1.5M17 19l-1.5 1.5M33 19l1.5 1.5"/><path d="M9 44l5-14h20l5 14z"/><path d="M13 37h22M21 30l-2 14M27 30l2 14"/></svg>',
    biomecanica: '<svg viewBox="0 0 48 48"><path d="M3 26h9l4-11 6 22 5-15 3 4h15"/><circle cx="9" cy="13" r="2.5"/><circle cx="39" cy="13" r="2.5"/></svg>',
    maquinas: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="6"/><circle cx="24" cy="24" r="13"/><path d="M24 4v7M24 37v7M4 24h7M37 24h7M9.9 9.9l4.9 4.9M33.2 33.2l4.9 4.9M38.1 9.9l-4.9 4.9M14.8 33.2l-4.9 4.9"/></svg>',
    agro: '<svg viewBox="0 0 48 48"><path d="M24 43V24"/><path d="M24 27c-10 0-15-5-15-13 10 0 15 5 15 13z"/><path d="M24 32c0-8 5-13 15-13 0 8-5 13-15 13z"/><path d="M13 43h22"/></svg>'
  };
  const LINES = [
    { id: 'robotica', name: 'Robots y control', desc: 'Robots y máquinas que se mueven solas: brazos robóticos, vehículos que transportan cosas en las fábricas, drones y hasta exoesqueletos. Es donde empezó su carrera de investigador.', topics: ['Brazos robot', 'Robots que se desplazan', 'Vehículos autónomos de fábrica', 'Exoesqueletos', 'Control inteligente'] },
    { id: 'energia', name: 'Energía del sol y eficiencia', desc: 'Aprovechar el sol y gastar menos energía: calor solar para producir agua dulce, casas más frescas y vehículos eléctricos.', topics: ['Energía solar', 'Agua dulce con sol', 'Casas más frescas', 'Vehículos eléctricos'] },
    { id: 'biomecanica', name: 'Señales del cuerpo', desc: 'Entender el cuerpo con ayuda de la ingeniería: leer las señales eléctricas de los músculos para saber con cuánta fuerza y qué tan rápido se mueve la mano.', topics: ['Señales de los músculos', 'Movimiento de la mano', 'Modelos matemáticos', 'Inteligencia artificial'] },
    { id: 'maquinas', name: 'Máquinas y materiales', desc: 'Que las máquinas duren más: detectar fallas escuchando sus vibraciones, estudiar cómo se calientan y probar materiales más resistentes, incluso con fibras naturales.', topics: ['Detección de fallas', 'Vibraciones', 'Transferencia de calor', 'Materiales resistentes'] },
    { id: 'agro', name: 'Tecnología para el campo', desc: 'Tecnología para el campo: máquinas para cacao y panela, cultivos de peces y plantas, invernaderos automáticos y cuidado del ambiente.', topics: ['Cacao', 'Panela', 'Peces y plantas (acuaponía)', 'Invernaderos automáticos'] }
  ];
  const CHIP_LABEL = { robotica: 'Robots y control', energia: 'Energía', biomecanica: 'Señales del cuerpo', maquinas: 'Máquinas y materiales', agro: 'Campo' };
  const PUBS = [
    { y: 2014, s: 'Cómo hacer que un brazo robot de siete articulaciones calcule solo cómo moverse para llegar a un punto.', t: 'A Hybrid Solution for the Inverse Kinematic on a Seven DOF Robotic Manipulator', v: 'IEEE Latin America Transactions', c: 14, l: 'robotica', doi: '10.1109/tla.2014.6749540' },
    { y: 2021, s: 'Cómo medir qué tan bien funciona un concentrador de energía solar hecho a mano.', t: 'Optical Performance Assessment of a Handmade Prototype of Linear Fresnel Concentrator', v: 'Periodicals of Engineering and Natural Sciences', c: 13, l: 'energia', doi: '10.21533/pen.v9.i4.985' },
    { y: 2010, s: 'Un sistema con redes neuronales para controlar el movimiento de una plataforma automatizada en el mar.', t: 'Movement pursuit control of an offshore automated platform via a RAM-based neural network', v: 'ICARCV (conferencia internacional)', c: 11, l: 'robotica', doi: '10.1109/icarcv.2010.5707913' },
    { y: 2011, s: 'Un robot para combatir incendios que se mueve de forma impredecible, con un tipo de movimiento llamado caos.', t: 'Implementation of Chaotic Behavior on a Fire Fighting Robot', v: 'Capítulo / ponencia', c: 10, l: 'robotica' },
    { y: 2009, s: 'Una comparación de formas de controlar la temperatura y el flujo de agua en un equipo que intercambia calor.', t: 'Comparison of Defuzzification Methods: Automatic Control of Temperature and Flow in Heat Exchanger', v: 'InTech', c: 9, l: 'robotica', doi: '10.5772/7899' },
    { y: 2008, s: 'Cómo encontrar la mejor ruta para vehículos autónomos que mueven materiales dentro de una fábrica.', t: 'Automated Guided Vehicles (AGV): Searching a Path in the Flexible Manufacturing Systems', v: 'Journal of KONBiN', c: 9, l: 'robotica', doi: '10.2478/v10040-008-0106-7' },
    { y: 2011, s: 'Una manera más sencilla de planear el recorrido de robots que se desplazan, con una técnica matemática.', t: 'Motion planning on Mobile Robots using Differential Flatness', v: 'IEEE Latin America Transactions', c: 8, l: 'robotica', doi: '10.1109/tla.2011.6129695' },
    { y: 2023, s: 'Cómo las paredes y los techos de una casa pueden refrescarla sin aire acondicionado.', t: 'Evaluation of the thermal performance of housing envelopes as passive cooling systems', v: 'Sustainable Engineering and Innovation', c: 8, l: 'energia', doi: '10.37868/sei.v5i2.id227' },
    { y: 2021, s: 'Cuánta energía gasta en la práctica un vehículo eléctrico de trabajo.', t: 'Estimation of the Energy Consumption of an Electric Utility Vehicle: A Case Study', v: 'Lecture Notes in Electrical Engineering', c: 7, l: 'energia', doi: '10.1007/978-3-030-72212-8_19' },
    { y: 2021, s: 'El diseño y la puesta en marcha de una máquina para pulverizar panela.', t: 'Design and set up of a pulverized panela machine', v: 'Periodicals of Engineering and Natural Sciences', c: 7, l: 'agro', doi: '10.21533/pen.v9.i4.986' },
    { y: 2021, s: 'Cómo detectar fallas en una máquina que gira (mal alineada o desbalanceada) analizando sus vibraciones.', t: 'Descriptive Study of a Rotary Machine Affected by Misalignment and Imbalance Applying the Wavelet Transform', v: 'Lecture Notes in Electrical Engineering', c: 6, l: 'maquinas', doi: '10.1007/978-3-030-72212-8_17' },
    { y: 2021, s: 'Qué tan bien aguanta el calor una construcción convencional en un clima cálido y seco.', t: 'Assessing the thermal performance of a conventional architecture in a dry warm climate', v: 'Heritage and Sustainable Development', c: 6, l: 'energia', doi: '10.37868/hsd.v3i2.66' },
    { y: 2023, s: 'Qué etapas de la producción de cacao en Santander gastan más energía.', t: 'Identification of energetically critical processes for cocoa production in Santander, Colombia', v: 'Periodicals of Engineering and Natural Sciences', c: 3, l: 'agro' },
    { y: 2024, s: 'Un modelo matemático que explica por qué cambia la fuerza al mover la muñeca.', t: 'Differences in the force exerted during wrist movements are explained by a general mathematical model', v: 'Heritage and Sustainable Development', c: 0, l: 'biomecanica' },
    { y: 2025, s: 'Calcular qué tan rápido se mueve la muñeca a partir de las señales eléctricas de los músculos, con inteligencia artificial.', t: 'Estimating different velocities in wrist movements from surface electromyography: application of a machine learning technique', v: 'Sustainable Engineering and Innovation', c: 0, l: 'biomecanica' },
    { y: 2025, s: 'Un sistema automático que mantiene sana el agua de un cultivo de peces y plantas (acuaponía).', t: 'Smart water quality regulation in sustainable aquaponics using PID control and long-term performance analysis', v: 'Sustainable Engineering and Innovation', c: 0, l: 'agro' },
    { y: 2026, s: 'Un equipo pequeño que saca agua dulce usando el calor del sol.', t: 'Experimental and Numerical Analysis of a Small-Scale Desalination System Using Humidification–Dehumidification Fed by Linear Fresnel Concentration', v: 'Sustainability', c: 0, l: 'energia' }
  ];
  const linesEl = document.getElementById('lines');
  const chipsEl = document.getElementById('chips');
  const pubsEl = document.getElementById('pubs');
  if (linesEl && pubsEl) {
    const lineName = id => CHIP_LABEL[id] || '';
    let current = 'all';
    let expanded = false;
    const PUB_LIMIT = 5;
    const moreEl = document.getElementById('pubsMore');
    const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    // Cada línea es una tarjeta del carrusel: la que queda en el centro se resalta y muestra su ficha
    linesEl.innerHTML = LINES.map(l => `<button type="button" class="line-card" data-l="${l.id}"><span class="lc-media" aria-hidden="true"><video muted playsinline preload="none" data-src="media/lineas/${l.id}.mp4"></video></span><span class="r-ico" aria-hidden="true">${ICONS[l.id]}</span><b>${esc(l.name)}</b><span class="lc-body"><span class="lc-inner"><span class="lc-desc">${esc(l.desc)}</span><span class="lc-tags">${l.topics.map(t => `<span>${esc(t)}</span>`).join('')}</span></span></span></button>`).join('');
    chipsEl.innerHTML = Object.entries(CHIP_LABEL).map(([id, name]) => `<button type="button" class="chip" data-l="${id}" aria-pressed="false">${esc(name)}</button>`).join('');
    const render = () => {
      chipsEl.querySelectorAll('.chip').forEach(b => { const on = b.dataset.l === current; b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); });
      const list = PUBS.filter(p => current === 'all' || p.l === current);
      const collapsed = current === 'all' && !expanded && list.length > PUB_LIMIT;
      if (moreEl) {
        moreEl.hidden = !(current === 'all' && list.length > PUB_LIMIT);
        const btn = moreEl.querySelector('button');
        btn.textContent = expanded ? 'Ver menos' : 'Ver todas (' + list.length + ')';
        btn.setAttribute('aria-expanded', String(expanded));
      }
      pubsEl.innerHTML = (collapsed ? list.slice(0, PUB_LIMIT) : list).map(p => {
        const orig = p.doi ? `<a href="https://doi.org/${p.doi}" target="_blank" rel="noopener">${esc(p.t)}</a>` : esc(p.t);
        return `<li class="pub"><time>${p.y}</time><div><h4>${esc(p.s)}</h4><p class="orig">${orig}</p><p>${esc(p.v)} · <em>${esc(lineName(p.l))}</em></p></div><span class="cites" title="Citas según OpenAlex">${p.c ? p.c + ' citas' : 'Reciente'}</span></li>`;
      }).join('');
      if (hasGsap) ScrollTrigger.refresh();
    };
    /* Carrusel de líneas: desliza con swipe, flechas o puntos; la tarjeta del centro despliega su ficha */
    const cards = [...linesEl.querySelectorAll('.line-card')];
    const linesDots = document.getElementById('linesDots');
    if (linesDots) linesDots.innerHTML = LINES.map((l, i) => `<button type="button" class="centers-dot" data-i="${i}" role="tab" aria-selected="false" aria-label="${esc(l.name)}"></button>`).join('');
    const dots = linesDots ? [...linesDots.children] : [];
    let center = -1, target = -1;
    const setCenter = i => {
      if (i === center) return;
      center = i;
      cards.forEach((c, j) => { c.classList.toggle('on', j === i); c.setAttribute('aria-current', j === i ? 'true' : 'false'); });
      dots.forEach((d, j) => d.setAttribute('aria-selected', String(j === i)));
      playClip(i);
    };
    /* Video de 8 s por línea (Pexels): solo se carga y reproduce el de la tarjeta del centro; los demás quedan oscurecidos.
       Al final de cada vuelta la imagen se oscurece y vuelve a aparecer desde el inicio. */
    const CLIP = 8, FADE = .7;
    const clips = cards.map(c => c.querySelector('.lc-media video'));
    const load = v => { if (v && !v.src) { v.src = v.dataset.src; v.preload = 'auto'; } };
    clips.forEach(v => {
      v.addEventListener('loadeddata', () => v.closest('.lc-media').classList.add('ready'));
      v.addEventListener('timeupdate', () => {
        const m = v.closest('.lc-media');
        if (v.currentTime >= CLIP) { v.currentTime = 0; m.classList.remove('fading'); }
        else m.classList.toggle('fading', v.currentTime >= CLIP - FADE);
      });
      v.addEventListener('ended', () => { v.currentTime = 0; v.play().catch(() => {}); });
    });
    function playClip(i) {
      clips.forEach((v, j) => {
        if (j === i) { load(v); if (reduce) return; v.play().catch(() => {}); }
        else v.pause();
      });
      // la siguiente se deja lista para que al deslizar no aparezca vacía
      load(clips[(i + 1) % clips.length]);
    }
    const centerOn = i => {
      target = (i + cards.length) % cards.length;
      const c = cards[target];
      setCenter(target);
      linesEl.scrollTo({ left: c.offsetLeft - (linesEl.clientWidth - c.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
    };
    const markCenter = () => {
      const mid = linesEl.scrollLeft + linesEl.clientWidth / 2;
      let best = 0;
      cards.forEach((c, i) => { if (Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid) < Math.abs(cards[best].offsetLeft + cards[best].offsetWidth / 2 - mid)) best = i; });
      // mientras va hacia una tarjeta elegida con flecha o punto, no se resaltan las que pasan de largo
      if (target !== -1) { if (best !== target) return; target = -1; }
      setCenter(best);
    };
    let settle = 0;
    linesEl.addEventListener('scroll', () => { clearTimeout(settle); settle = setTimeout(markCenter, 80); }, { passive: true });
    ['pointerdown', 'wheel', 'touchstart'].forEach(ev => linesEl.addEventListener(ev, () => { target = -1; }, { passive: true }));
    // Iguala el alto del párrafo y de la fila de etiquetas de todas las tarjetas (el de la más larga)
    const equalize = () => {
      linesEl.style.removeProperty('--lc-desc-h'); linesEl.style.removeProperty('--lc-tags-h');
      const max = sel => Math.max(...cards.map(c => c.querySelector(sel).offsetHeight));
      linesEl.style.setProperty('--lc-desc-h', max('.lc-desc') + 'px');
      linesEl.style.setProperty('--lc-tags-h', max('.lc-tags') + 'px');
    };
    equalize();
    if (document.fonts) document.fonts.ready.then(equalize);
    window.addEventListener('resize', () => { equalize(); centerOn(center); });
    linesEl.addEventListener('click', e => { const c = e.target.closest('.line-card'); if (c) centerOn(cards.indexOf(c)); });
    dots.forEach((d, i) => d.addEventListener('click', () => centerOn(i)));
    document.querySelector('.lines-arrow.prev')?.addEventListener('click', () => centerOn(center - 1));
    document.querySelector('.lines-arrow.next')?.addEventListener('click', () => centerOn(center + 1));
    markCenter();

    const pick = e => {
      const b = e.target.closest('[data-l]'); if (!b) return;
      current = b.dataset.l === current ? 'all' : b.dataset.l;
      expanded = false;
      render();
      if (current !== 'all') centerOn(LINES.findIndex(l => l.id === current));
    };
    if (moreEl) moreEl.addEventListener('click', () => { expanded = !expanded; render(); if (!expanded) pubsEl.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); });
    chipsEl.addEventListener('click', pick);
    render();
  }

  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .3 });
  document.querySelectorAll(".finding, .card").forEach(el => io.observe(el));

  /* ---- Portada: el video se reproduce dentro del arco; al pausarlo o al terminar vuelve la foto ---- */
  const hrFrame = document.getElementById('hrFrame');
  if (hrFrame) {
    const hrVid = document.getElementById('hrVid');
    const hrPlay = document.getElementById('hrPlay');
    const showPhoto = () => {
      hrFrame.classList.remove('playing');
      hrVid.controls = false;
      hrPlay.focus();
    };
    hrPlay.addEventListener('click', () => {
      hrVid.controls = true;
      hrFrame.classList.add('playing');
      const p = hrVid.play();
      if (p && p.catch) p.catch(showPhoto);
      hrVid.focus();
    });
    // al pausar se conserva el punto: «Ver video» sigue desde ahí
    hrVid.addEventListener('pause', () => { if (!hrVid.seeking && !hrVid.ended) showPhoto(); });
    hrVid.addEventListener('ended', () => { hrVid.currentTime = 0; showPhoto(); });
  }

  /* ---- «Ver más»: despliega el contenido completo de cada apartado ---- */
  document.querySelectorAll('[data-more]').forEach(btn => {
    const panel = document.getElementById(btn.dataset.more);
    if (!panel) return;
    const label = btn.textContent;
    btn.addEventListener('click', () => {
      const open = !panel.classList.contains('open');
      panel.classList.toggle('open', open);
      if (open) panel.removeAttribute('inert'); else panel.setAttribute('inert', '');
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Ver menos' : label;
      btn.classList.toggle('is-open', open);
      if (!open) {
        const top = btn.closest('section').getBoundingClientRect().top;
        if (top < 0) window.scrollBy({ top: top - 80, behavior: reduce ? 'auto' : 'smooth' });
      }
    });
    panel.addEventListener('transitionend', e => {
      if (e.target === panel && hasGsap) ScrollTrigger.refresh();
    });
  });

  if (document.getElementById("form")) {
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
      : 'Revise los campos marcados y acepte el tratamiento de datos.';
    if (ok) form.reset();
  });
  }

  if (document.getElementById("blog-sub-form")) {
  /* ---- Suscripción del blog (solo validación en el navegador; aún no envía datos a ningún servidor) ---- */
  const bsForm = document.getElementById('blog-sub-form');
  const bsMsg = document.getElementById('blog-sub-msg');
  bsForm.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    bsForm.querySelectorAll('[required]').forEach(f => {
      const bad = !f.value.trim();
      f.classList.toggle('err', bad); if (bad) ok = false;
    });
    bsMsg.textContent = ok
      ? 'Recibido. Esta es una versión de prueba: aún no se guardan datos.'
      : 'Revise los campos marcados.';
    if (ok) bsForm.reset();
  });
  }

  /* ---- Mini-carruseles "una idea a la vez": navegados con scroll/swipe o los puntos, sin avance automático ---- */
  const initMiniCarousel = (viewportId, slideSelector, dotsId) => {
    const viewport = document.getElementById(viewportId);
    if (!viewport) return;
    const slides = [...viewport.querySelectorAll(slideSelector)];
    const dots = [...document.querySelectorAll(`#${dotsId} [data-i]`)];

    const goTo = i => {
      const target = (i + slides.length) % slides.length;
      // Solo se mueve el carrusel (scroll horizontal del propio viewport); nunca la página
      viewport.scrollTo({ left: slides[target].offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
    };
    const setActive = i => dots.forEach((d, j) => d.setAttribute('aria-selected', String(j === i)));
    dots.forEach(d => d.addEventListener('click', () => goTo(Number(d.dataset.i))));

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && e.intersectionRatio > 0.6) setActive(slides.indexOf(e.target));
      });
    }, { root: viewport, threshold: [0, 0.6, 1] });
    slides.forEach(s => io.observe(s));
  };
  initMiniCarousel('lcViewport', '.lc-slide', 'lcDots');
  initMiniCarousel('eduViewport', '.edu-slide', 'eduDots');
  initMiniCarousel('routeViewport', '.route-slide', 'routeDots');
  initMiniCarousel('centersViewport', '.centers-slide', 'centersDots');

  /* ---- Logros UTS (inicio): los logros van en orden de crecimiento y cada uno trae su foto de fondo a pantalla
     completa, que entra barriendo sobre la anterior y se acerca despacio. La línea de tiempo 2015–2026 avanza hasta
     el logro visible y sus puntos también sirven para navegar ---- */
  const lcVp = document.getElementById('lcViewport');
  const lcBg = document.querySelector('.lc-bg');
  if (lcVp && lcBg) {
    const slides = [...lcVp.querySelectorAll('.lc-slide')];
    const steps = document.querySelector('.lc-steps');
    const shots = [...lcBg.children];
    let current = -1;
    const paint = i => { const el = shots[i]; if (el && el.dataset.bg) { el.style.backgroundImage = `url(${el.dataset.bg})`; delete el.dataset.bg; } };
    const show = i => {
      paint(i); paint((i + 1) % shots.length);
      // la foto anterior queda debajo mientras la nueva la cubre con el barrido
      shots.forEach((el, j) => { el.classList.toggle('prev', el.classList.contains('on') && j !== i); el.classList.toggle('on', j === i); });
    };
    const light = () => { if (current >= 0) show(current); };
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting || e.intersectionRatio < .6) return;
      const i = slides.indexOf(e.target);
      if (i === current) return;
      current = i;
      slides.forEach((s, j) => s.classList.toggle('is-active', j === i));
      if (steps) steps.querySelectorAll('.lc-step').forEach((b, j) => b.classList.toggle('done', j <= i));
      progress();
      light();
    }), { root: lcVp, threshold: [.6] });
    slides.forEach(s => io.observe(s));

    /* Avance automático: la línea de tiempo es el reloj. El tramo hasta el siguiente logro se llena como barra
       de progreso y al completarse pasa solo. Se pausa con el mouse encima y se detiene si la persona lo toca. */
    const DWELL = 7000, last = slides.length - 1;
    let auto = !reduce, onScreen = false, hover = false, timer = 0;
    const span = i => (last ? i / last : 1);
    function progress() {
      clearTimeout(timer);
      if (!steps || current < 0) return;
      steps.classList.remove('timing');
      steps.style.setProperty('--lc-progress', span(current));
      if (!auto || hover || !onScreen || document.hidden) return;
      // tras llegar al punto actual, el tramo siguiente se llena durante el tiempo que dura el logro
      timer = setTimeout(() => {
        steps.style.setProperty('--lc-dur', (DWELL - 900) / 1000 + 's');
        steps.classList.add('timing');
        steps.style.setProperty('--lc-progress', current === last ? 1 : span(current + 1));
        timer = setTimeout(() => {
          const next = current === last ? 0 : current + 1;
          lcVp.scrollTo({ left: slides[next].offsetLeft - slides[0].offsetLeft, behavior: 'smooth' });
        }, DWELL - 900);
      }, 900);
    }
    new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; progress(); }, { threshold: .4 }).observe(lcVp);
    document.addEventListener('visibilitychange', progress);
    const stopAuto = () => { if (auto) { auto = false; progress(); } };
    ['pointerdown', 'wheel', 'touchstart', 'keydown'].forEach(ev => lcVp.addEventListener(ev, stopAuto, { passive: true }));
    steps?.addEventListener('click', stopAuto);
    lcVp.closest('section')?.addEventListener('mouseenter', () => { hover = true; progress(); });
    lcVp.closest('section')?.addEventListener('mouseleave', () => { hover = false; progress(); });
  }

  /* ---- Inicio en zigzag: al llegar a cada sección su imagen entra desde su lado y el texto en cascada;
     con el mouse encima, la imagen se inclina y se desplaza un poco (profundidad). El panel de video de
     Investigación alterna tres clips de las líneas de investigación ---- */
  const zz = document.querySelectorAll('.zz');
  if (zz.length) {
    const zzIo = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      e.target.querySelectorAll('video[data-src]').forEach(v => { v.src = v.dataset.src; v.removeAttribute('data-src'); });
    }), { threshold: .3 });
    zz.forEach(s => zzIo.observe(s));
    if (!reduce && matchMedia('(hover: hover)').matches) zz.forEach(sec => {
      const media = sec.querySelector('.zz-media, .uni-carousel');
      if (!media) return;
      sec.addEventListener('mousemove', e => {
        const r = sec.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        media.style.setProperty('--ry', (x * 6).toFixed(2) + 'deg');
        media.style.setProperty('--rx', (-y * 4).toFixed(2) + 'deg');
        media.style.setProperty('--mx', (-x * 18).toFixed(1) + 'px');
        media.style.setProperty('--my', (-y * 14).toFixed(1) + 'px');
      });
      sec.addEventListener('mouseleave', () => ['--ry', '--rx', '--mx', '--my'].forEach(p => media.style.removeProperty(p)));
    });
    document.querySelectorAll('.zz-video').forEach(box => {
      const clips = [...box.querySelectorAll('video')];
      let k = 0;
      const show = () => clips.forEach((v, j) => { v.classList.toggle('on', j === k); if (j === k) { v.currentTime = 0; v.play().catch(() => {}); } else v.pause(); });
      // el primer clip arranca cuando ya tiene fuente; luego cambia cada 8 s
      const start = () => { if (!clips[0].src) return setTimeout(start, 300); show(); if (!reduce) setInterval(() => { k = (k + 1) % clips.length; show(); }, 8000); };
      start();
    });
  }

  /* ---- Formación (inicio): cada tarjeta muestra fotos de su universidad como un video de 8 s.
     Las fotos se cruzan con un acercamiento lento; al final de la vuelta se oscurece y el carrusel pasa
     solo a la siguiente formación, hasta que la persona lo toque (entonces solo avanza a mano). ---- */
  const eduVp = document.getElementById('eduViewport');
  if (eduVp && eduVp.querySelector('.uni-show')) {
    const slides = [...eduVp.querySelectorAll('.edu-slide')];
    const CYCLE = 8000;
    let active = -1, auto = !reduce, onScreen = false, timers = [];
    const paint = s => s && s.querySelectorAll('.uni-show i[data-bg]').forEach(i => { i.style.backgroundImage = `url(${i.dataset.bg})`; i.removeAttribute('data-bg'); });
    const stop = () => { timers.forEach(clearTimeout); timers = []; };
    const goTo = i => { const t = slides[(i + slides.length) % slides.length]; eduVp.scrollTo({ left: t.offsetLeft, behavior: reduce ? 'auto' : 'smooth' }); };
    const run = () => {
      stop();
      const s = slides[active]; if (!s) return;
      const imgs = [...s.querySelectorAll('.uni-show i')], per = CYCLE / imgs.length;
      s.style.setProperty('--kb', (per + 1200) / 1000 + 's');
      s.classList.remove('fading', 'playing'); void s.offsetWidth;
      imgs.forEach((im, j) => im.classList.toggle('on', j === 0));
      if (reduce || !onScreen || document.hidden) return;
      s.classList.add('playing');
      imgs.forEach((im, j) => { if (j) timers.push(setTimeout(() => imgs.forEach((x, k) => x.classList.toggle('on', k === j)), per * j)); });
      timers.push(setTimeout(() => s.classList.add('fading'), CYCLE - 700));
      timers.push(setTimeout(() => { if (auto) goTo(active + 1); else run(); }, CYCLE));
    };
    const setActive = i => {
      if (i === active) return;
      active = i;
      slides.forEach((s, j) => { s.classList.toggle('is-active', j === i); if (j !== i) s.classList.remove('playing', 'fading'); });
      paint(slides[i]); paint(slides[(i + 1) % slides.length]);
      run();
    };
    const slideIo = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting && e.intersectionRatio > .6) setActive(slides.indexOf(e.target)); }), { root: eduVp, threshold: [.6] });
    slides.forEach(s => slideIo.observe(s));
    new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; run(); }, { threshold: .35 }).observe(eduVp);
    document.addEventListener('visibilitychange', run);
    // al tocar el carrusel deja de avanzar solo (las fotos de la tarjeta siguen pasando); con el mouse encima, se pausa el avance
    let touched = false;
    const manual = () => { touched = true; auto = false; };
    ['pointerdown', 'wheel', 'touchstart', 'keydown'].forEach(ev => eduVp.addEventListener(ev, manual, { passive: true }));
    document.querySelectorAll('#eduDots [data-i]').forEach(d => d.addEventListener('click', manual));
    document.querySelectorAll('.uni-arrow').forEach(b => b.addEventListener('click', () => { manual(); goTo(Math.max(active, 0) + Number(b.dataset.dir)); }));
    eduVp.addEventListener('mouseenter', () => { auto = false; });
    eduVp.addEventListener('mouseleave', () => { auto = !reduce && !touched; });
  }


  /* ---- Tarjetas de logros: parallax por capas + luz que sigue al cursor ---- */
  const fnds = document.querySelectorAll('.findings .finding');
  if (fnds.length) {
    fnds.forEach((el, i) => {
      el.style.setProperty('--i', i % 3);
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
    if (!reduce) {
      let ft = false;
      const fRun = () => {
        ft = false;
        fnds.forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.bottom < -80 || r.top > innerHeight + 80) return;
          const d = (r.top + r.height / 2 - innerHeight / 2) / (innerHeight / 2);
          el.style.setProperty('--p', Math.max(-1, Math.min(1, d)).toFixed(3));
        });
      };
      const fReq = () => { if (!ft) { ft = true; requestAnimationFrame(fRun); } };
      addEventListener('scroll', fReq, { passive: true });
      addEventListener('resize', fReq);
      fRun();
    }
  }

  /* ---- Parallax de las fotos de fondo en los recuadros de investigación ---- */
  const rbs = document.querySelectorAll('.r-badges > .rb');
  if (rbs.length && !reduce) {
    let tick = false;
    const run = () => {
      tick = false;
      rbs.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        const d = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        const max = r.height * 0.12;
        el.style.setProperty('--py', Math.max(-max, Math.min(max, -d * r.height * 0.5)).toFixed(1) + 'px');
      });
    };
    const req = () => { if (!tick) { tick = true; requestAnimationFrame(run); } };
    addEventListener('scroll', req, { passive: true });
    addEventListener('resize', req);
    run();
  }

  /* ---- Publicaciones: aparecen en alterno y se mueven con el scroll (parallax) ---- */
  const pubsList = document.getElementById('pubs');
  if (pubsList) {
    const pio = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); pio.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' }) : null;
    const items = () => pubsList.querySelectorAll('.pub');
    const prep = () => items().forEach((el, i) => { el.style.setProperty('--i', i % 5); if (!el.classList.contains('in')) { if (pio) pio.observe(el); else el.classList.add('in'); } });
    new MutationObserver(prep).observe(pubsList, { childList: true });
    prep();
    if (!reduce) {
      let pt = false;
      const pRun = () => {
        pt = false;
        items().forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.bottom < -60 || r.top > innerHeight + 60) return;
          const d = (r.top + r.height / 2 - innerHeight / 2) / (innerHeight / 2);
          const p = Math.max(-1, Math.min(1, d));
          el.style.setProperty('--p', p.toFixed(3));
          el.style.setProperty('--ap', Math.min(1, Math.abs(p)).toFixed(3));
        });
      };
      const pReq = () => { if (!pt) { pt = true; requestAnimationFrame(pRun); } };
      addEventListener('scroll', pReq, { passive: true });
      addEventListener('resize', pReq);
      new MutationObserver(pReq).observe(pubsList, { childList: true });
      pRun();
    }
  }

})();

/* Reconocimientos por año: un año abierto a la vez; el botón anuncia su estado con aria-expanded */
(() => {
  const acc = document.getElementById('porAnio');
  if (!acc) return;
  acc.classList.add('yr-js');
  const rows = [...acc.querySelectorAll('.yr')];
  const set = (row, open) => {
    row.classList.toggle('open', open);
    row.querySelector('.yr-btn').setAttribute('aria-expanded', open);
    row.querySelector('.yr-panel').toggleAttribute('inert', !open);
  };
  rows.forEach(r => {
    set(r, r.classList.contains('open'));
    r.querySelector('.yr-btn').addEventListener('click', () => {
      const open = !r.classList.contains('open');
      rows.forEach(o => set(o, o === r && open));
    });
  });
})();
