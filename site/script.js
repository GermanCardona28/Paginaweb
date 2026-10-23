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

  /* ---- Contadores ---- */
  const counters = document.querySelectorAll('[data-count]');
  const setCount = (el, v) => { const n = Math.round(v); el.textContent = (el.dataset.prefix || '') + (el.dataset.fmt ? n.toLocaleString('es-CO') : n) + (el.dataset.suffix || ''); };
  if (reduce || !hasGsap) {
    counters.forEach(el => setCount(el, +el.dataset.count));
  }

  if (reduce || !hasGsap) {
    document.querySelectorAll('.card').forEach(c => c.classList.add('in'));
    document.querySelectorAll('.tl-line span').forEach(s => { s.style.transform = 'none'; });
  } else {
    gsap.registerPlugin(ScrollTrigger);

    // Nombre del hero, línea por línea
    const heroA = gsap.from('.hero-name .split', { yPercent: 115, rotate: 4, duration: 1.1, ease: 'power4.out', stagger: .12, delay: .1, paused: true });
    const heroB = gsap.to('.hero .reveal-up', { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .12, delay: .45, paused: true });
    appReady.then(() => { heroA.play(); heroB.play(); });

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
    gsap.to('.portrait:not(.playing)', { yPercent: -3, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('#net', { yPercent: 12, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    // Mapa: los pines aparecen después del mapa
    gsap.from("#map .pin", { opacity: 0, duration: .7, stagger: .15, ease: "power2.out",
      scrollTrigger: { trigger: "#map", start: "top 75%", once: true } });
    gsap.from("#map .mun", { opacity: 0, duration: .8, stagger: { amount: .8, from: "random" }, ease: "power1.out",
      scrollTrigger: { trigger: "#map", start: "top 80%", once: true } });
  }

  /* ---- Mapa interactivo ---- */
  const mt = document.getElementById("map-title");
  const md = document.getElementById("map-desc");
  const pinsEl = [...document.querySelectorAll("#map .pin")];
  const byName = n => pinsEl.find(p => p.dataset.t === n || (n === "Socorro" && p.dataset.t === "El Socorro"));
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
  const detailEl = document.getElementById('line-detail');
  const chipsEl = document.getElementById('chips');
  const pubsEl = document.getElementById('pubs');
  if (linesEl && pubsEl) {
    const lineName = id => CHIP_LABEL[id] || '';
    let current = 'all';
    const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    linesEl.innerHTML = LINES.map(l => `<button type="button" class="line-card" role="tab" data-l="${l.id}" aria-selected="false"><span class="r-ico" aria-hidden="true">${ICONS[l.id]}</span><b>${esc(l.name)}</b></button>`).join('');
    chipsEl.innerHTML = [['all', 'Todas'], ...Object.entries(CHIP_LABEL)].map(([id, name]) => `<button type="button" class="chip" data-l="${id}" aria-pressed="false">${esc(name)}</button>`).join('');
    const render = () => {
      linesEl.querySelectorAll('.line-card').forEach(b => { const on = b.dataset.l === current; b.classList.toggle('on', on); b.setAttribute('aria-selected', String(on)); });
      chipsEl.querySelectorAll('.chip').forEach(b => { const on = b.dataset.l === current; b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); });
      const L = LINES.find(l => l.id === current);
      detailEl.innerHTML = L
        ? `<span class="r-ico big" aria-hidden="true">${ICONS[L.id]}</span><div><h4>${esc(L.name)}</h4><p>${esc(L.desc)}</p><ul>${L.topics.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div>`
        : '';
      pubsEl.innerHTML = PUBS.filter(p => current === 'all' || p.l === current).map(p => {
        const orig = p.doi ? `<a href="https://doi.org/${p.doi}" target="_blank" rel="noopener">${esc(p.t)}</a>` : esc(p.t);
        return `<li class="pub"><time>${p.y}</time><div><h4>${esc(p.s)}</h4><p class="orig">${orig}</p><p>${esc(p.v)} · <em>${esc(lineName(p.l))}</em></p></div><span class="cites" title="Citas según OpenAlex">${p.c ? p.c + ' citas' : 'Reciente'}</span></li>`;
      }).join('');
      if (hasGsap) ScrollTrigger.refresh();
    };
    const pick = e => {
      const b = e.target.closest('[data-l]'); if (!b) return;
      current = (b.dataset.l === current && b.classList.contains('line-card')) ? 'all' : b.dataset.l;
      render();
    };
    linesEl.addEventListener('click', pick);
    chipsEl.addEventListener('click', pick);
    render();
  }

  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .3 });
  document.querySelectorAll(".finding, .card").forEach(el => io.observe(el));

  /* ---- Portada: el reel está debajo de la foto; un solo clic en el centro lo reproduce ---- */
  const cover = document.getElementById("cover");
  if (cover) {
    const frame = cover.querySelector("iframe");
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      cover.classList.add("started");
      clearInterval(timer);
      window.removeEventListener("blur", check);
    };
    // El clic dentro del iframe de Instagram no llega a la página: se detecta porque el foco pasa al iframe.
    const check = () => { setTimeout(() => { if (document.activeElement === frame) start(); }, 0); };
    const timer = setInterval(() => { if (document.activeElement === frame) start(); }, 150);
    window.addEventListener("blur", check);
    setTimeout(() => clearInterval(timer), 10 * 60 * 1000);
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
})();
