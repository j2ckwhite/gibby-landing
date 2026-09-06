/* LGO — Dead Quote Recovery site behaviours */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const money = n => '$' + Math.round(n).toLocaleString('en-US');

  /* nav */
  const nav = $('.nav');
  const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 24);
  onScroll(); addEventListener('scroll', onScroll, { passive: true });

  /* scroll reveal */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => io.observe(el));

  /* hero ledger */
  const ledger = $('#ledger');
  if (ledger) {
    const data = [
      ['2023 Tacoma', 'Full front PPF', 2400, 'Let me talk to my wife'],
      ['Model Y', 'Ceramic + tint', 1850, 'Just getting quotes'],
      ['F-150 Lightning', 'Full front PPF', 2600, 'After my bonus'],
      ['GR Corolla', 'Track pack PPF', 3200, 'Maybe in the spring'],
      ['Civic Type R', 'Full front PPF', 2400, 'I\'ll call you back'],
      ['Rivian R1S', 'Full body PPF', 6800, 'Went quiet'],
      ['4Runner TRD', 'Ceramic coating', 1200, 'Went quiet'],
      ['Model 3', 'Front + ceramic', 2950, 'Need to think about it'],
    ];
    const slots = ['Tue 10:00', 'Thu 2:30', 'Sat 9:00', 'Mon 1:00', 'Wed 11:30', 'Fri 3:00', 'Tue 4:00', 'Sat 12:00'];
    const rows = $('#rows'), deadOut = $('#deadTotal'), liveOut = $('#liveTotal'), cnt = $('#bookedCount');
    const els = data.map((d) => {
      const r = document.createElement('div');
      r.className = 'row';
      r.innerHTML = `<span class="v">${d[0]}</span><span class="pk">${d[1]}</span><span class="p">${money(d[2])}</span><span class="s">${d[3]}</span>`;
      rows.appendChild(r); return r;
    });
    const total = data.reduce((a, d) => a + d[2], 0);
    let booked = 0, live = 0, i = 0;
    const paint = () => { liveOut.textContent = money(live); cnt.textContent = booked; deadOut.textContent = money(total - live); };
    paint();
    if (!reduce) {
      const step = () => {
        if (i >= data.length) {
          setTimeout(() => { els.forEach((r, k) => { r.className = 'row'; $('.s', r).textContent = data[k][3]; }); booked = 0; live = 0; i = 0; paint(); setTimeout(step, 1400); }, 3200);
          return;
        }
        const r = els[i], d = data[i];
        r.classList.add('working'); $('.s', r).textContent = 'Reaching out';
        setTimeout(() => {
          r.classList.remove('working'); r.classList.add('live');
          $('.s', r).textContent = 'Booked ' + slots[i];
          booked++; live += d[2]; paint(); i++;
          setTimeout(step, 700);
        }, 1100);
      };
      setTimeout(step, 1600);
    }
  }

  /* calculator */
  const q = $('#q'), c = $('#c'), t = $('#t');
  if (q && c && t) {
    const outs = { q: $('#qOut'), c: $('#cOut'), t: $('#tOut') };
    const mo = $('#monthly'), yr = $('#yearly'), lost = $('#lostCount'), tenv = $('#tenValue');
    let cur = { mo: 0, yr: 0 };
    const tween = (el, from, to) => {
      if (reduce) { el.textContent = money(to); return; }
      const t0 = performance.now(), d = 500;
      const f = now => { const p = Math.min(1, (now - t0) / d), e = 1 - Math.pow(1 - p, 3); el.textContent = money(from + (to - from) * e); if (p < 1) requestAnimationFrame(f); };
      requestAnimationFrame(f);
    };
    const calc = () => {
      const Q = +q.value, C = +c.value, T = +t.value;
      outs.q.textContent = Q; outs.c.textContent = C; outs.t.textContent = money(T);
      const dead = Math.max(0, Q - C);
      const m = dead * T, y = m * 12;
      lost.textContent = dead;
      tween(mo, cur.mo, m); tween(yr, cur.yr, y); cur = { mo: m, yr: y };
      tenv.textContent = money(10 * T);
      if (c.max !== q.value) { c.max = q.value; if (C > Q) c.value = Q; }
    };
    [q, c, t].forEach(el => el.addEventListener('input', calc)); calc();
  }

  /* compare phones — reveal bubbles */
  $$('.phone').forEach(p => {
    const o = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { p.classList.add('in'); o.disconnect(); } }), { threshold: 0.35 });
    o.observe(p);
  });

  /* process steps — scroll-driven, no timer, no clicks, nothing collapses */
  const steps = $$('.step');
  if (steps.length) {
    const gauge = $('#gaugeBar'), gDay = $('#gaugeDay'), gLab = $('#gaugeLabel'), fill = $('#stepFill');
    const days = [3, 5, 7, 17, 21];
    const labels = ['Registered & exported', 'List cleaned & segmented', 'Messages ready', 'Appointments landing', 'Scorecard delivered'];
    let reached = -1;
    const paint = () => {
      steps.forEach((s, i) => { s.classList.toggle('done', i <= reached); s.classList.toggle('active', i === reached + 1); });
      const i = Math.max(0, reached);
      if (gauge) { gauge.style.width = (reached < 0 ? 0 : days[i] / 21 * 100) + '%'; gDay.textContent = reached < 0 ? 'Day 1' : 'Day ' + days[i]; gLab.textContent = reached < 0 ? 'You send the file' : labels[i]; }
      if (fill) { const last = steps[i]; fill.style.height = reached < 0 ? '0px' : (last.offsetTop + 14 - steps[0].offsetTop) + 'px'; }
    };
    if (reduce) { reached = steps.length - 1; paint(); }
    else {
      const so = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return;
        const i = steps.indexOf(e.target);
        if (i > reached) { reached = i; paint(); }
      }), { threshold: 0, rootMargin: '0px 0px -45% 0px' });
      steps.forEach(s => so.observe(s));
      paint();
    }
  }

  /* faq */
  $$('.qa button').forEach(b => b.addEventListener('click', () => {
    const qa = b.parentElement, a = $('.a', qa), open = qa.classList.contains('open');
    $$('.qa.open').forEach(o => { o.classList.remove('open'); $('.a', o).style.maxHeight = 0; });
    if (!open) { qa.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
  }));

  /* lead form */
  const form = $('#leadForm');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const err = $('.err', form); err.style.display = 'none';
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const fd = new FormData(form);
      const Q = +fd.get('quotes'), C = +fd.get('closed'), T = +fd.get('ticket');
      const yearly = Math.max(0, Q - C) * T * 12;
      const btn = $('button[type=submit]', form); btn.disabled = true; btn.textContent = 'Working it out…';
      try {
        // Netlify Forms handles this once deployed. Swap this block for the quiz/resource API later.
        await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(fd).toString() });
      } catch (_) { /* local dev: no endpoint yet */ }
      $('#formWrap').style.display = 'none';
      const done = $('#done'); done.classList.add('show');
      $('#doneNum').textContent = money(yearly);
      $('#doneName').textContent = fd.get('first') || 'there';
      $('#doneTen').textContent = money(10 * T);
      done.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    });
  }
})();
