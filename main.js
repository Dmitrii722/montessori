/* ============================================================
   Общие интерактивные системы сайта
   ============================================================ */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- шторка: прибытие ---------- */
  document.body.classList.add('is-arriving');
  window.addEventListener('load', () => {
    setTimeout(() => document.body.classList.remove('is-arriving'), 900);
  });
  // страховка, если load не наступил быстро
  setTimeout(() => document.body.classList.remove('is-arriving'), 1600);

  /* ---------- шторка: уход по внутренним ссылкам ---------- */
  const PAGE_WORDS = {
    'index.html': 'Знакомство',
    'montessori.html': 'Монтессори',
    'logoritmika.html': 'Логоритмика'
  };
  document.querySelectorAll('a[href$=".html"], a[href*=".html#"]').forEach(a => {
    const url = new URL(a.getAttribute('href'), location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.hash) return; // якорь на той же странице
    a.addEventListener('click', e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      const file = url.pathname.split('/').pop() || 'index.html';
      const word = PAGE_WORDS[file] || '';
      const w = document.querySelector('.veil .veil-word');
      if (w) w.textContent = word;
      document.body.classList.add('is-leaving');
      setTimeout(() => { location.href = a.getAttribute('href'); }, reduced ? 0 : 620);
    });
  });

  /* ---------- кастомный курсор ---------- */
  if (finePointer && !reduced) {
    document.body.classList.add('has-cursor');
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    ring.innerHTML = '<span></span>';
    document.body.append(dot, ring);

    let mx = innerWidth / 2, my = innerHeight / 2;
    let rx = mx, ry = my;
    addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    }, { passive: true });

    (function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();

    const bindCursor = root => {
      root.querySelectorAll('a, button, .skill-item, select, input, [data-cursor]').forEach(el => {
        if (el.dataset.cursorBound) return;
        el.dataset.cursorBound = '1';
        el.addEventListener('mouseenter', () => {
          const label = el.getAttribute('data-cursor');
          if (label) {
            ring.querySelector('span').textContent = label;
            ring.classList.add('is-active');
            ring.classList.remove('is-link');
          } else {
            ring.classList.add('is-link');
            ring.classList.remove('is-active');
          }
        });
        el.addEventListener('mouseleave', () => {
          ring.classList.remove('is-active', 'is-link');
        });
      });
    };
    bindCursor(document);
    new MutationObserver(muts => {
      muts.forEach(m => m.addedNodes.forEach(n => {
        if (n.nodeType === 1) bindCursor(n.parentElement || document);
      }));
    }).observe(document.body, { childList: true, subtree: true });

    /* магнитные кнопки */
    document.querySelectorAll('.btn, .rail-btn, .sc-arrow').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.22}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- мобильное меню ---------- */
  const burger = document.querySelector('.nav-burger');
  const menu = document.querySelector('.mobile-menu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }));
  }

  /* ---------- reveal при скролле ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('[data-reveal], .draw, .line-mask').forEach(el => io.observe(el));

  /* ---------- длина путей для draw-анимации ---------- */
  document.querySelectorAll('.draw path, .draw circle, .draw ellipse').forEach(p => {
    try {
      const len = p.getTotalLength();
      p.style.setProperty('--len', len);
    } catch (e) { /* noop */ }
  });

  /* ---------- параллакс в герое от курсора ---------- */
  if (finePointer && !reduced) {
    const hero = document.querySelector('.hero');
    if (hero) {
      const layers = hero.querySelectorAll('[data-depth]');
      let tx = 0, ty = 0, cx = 0, cy = 0;
      hero.addEventListener('mousemove', e => {
        tx = (e.clientX / innerWidth - 0.5);
        ty = (e.clientY / innerHeight - 0.5);
      }, { passive: true });
      (function par() {
        cx += (tx - cx) * 0.06;
        cy += (ty - cy) * 0.06;
        layers.forEach(l => {
          const d = parseFloat(l.dataset.depth || 10);
          l.style.transform = `translate(${(-cx * d).toFixed(1)}px, ${(-cy * d).toFixed(1)}px)`;
        });
        requestAnimationFrame(par);
      })();
    }
  }

  /* ---------- бегущая строка: дублируем для бесшовности ---------- */
  document.querySelectorAll('.marquee-track').forEach(t => {
    t.innerHTML += t.innerHTML;
  });

  /* ---------- лента отзывов: кнопки ---------- */
  const rail = document.querySelector('.reviews-rail');
  if (rail) {
    const prev = document.querySelector('[data-rail="prev"]');
    const next = document.querySelector('[data-rail="next"]');
    const step = () => Math.min(rail.clientWidth * 0.8, 430);
    const update = () => {
      if (!prev || !next) return;
      prev.disabled = rail.scrollLeft < 10;
      next.disabled = rail.scrollLeft > rail.scrollWidth - rail.clientWidth - 10;
    };
    prev && prev.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
    next && next.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));
    rail.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ---------- год в футере ---------- */
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
})();
