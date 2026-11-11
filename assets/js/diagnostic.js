/* ============================================================
   Диагностика развития малыша 12–24 месяцев
   Студия Монтессори · Ирина Кичигина
   ============================================================ */
(function () {
  'use strict';

  const SPHERES = [
    {
      id: 'fine', name: 'Глаза и руки', norm: 70,
      reco: ['Предлагайте рисовать пальчиковыми красками', 'Играйте с мозаикой и крупными бусинами', 'Шнуровки, кнопки и застёжки на игрушках', 'Лепите из теста и глины', 'Собирайте простой конструктор'],
      items: [
        [12, 'Ставит один кубик на другой — башня из 2 кубиков'],
        [13, 'Перекладывает мелкие игрушки из руки в руку'],
        [13, 'Видна ведущая рука: тянется к игрушке чаще одной и той же'],
        [14, 'Катает и бросает мяч'],
        [14, 'Вкладывает предметы простой формы в отверстия сортёра'],
        [15, 'Строит башню из 3 кубиков'],
        [15, 'Катает маленькие машинки перед собой'],
        [16, 'Рисует первые «каракули» — штрихи и точки'],
        [16, 'Находит игрушку, спрятанную под тканью на глазах'],
        [17, 'Помогает собирать игрушки в коробку'],
        [18, 'Собирает пирамидку из 3 колец в любом порядке'],
        [19, 'Собирает пирамидку из 4 колец'],
        [19, 'Бросает мяч двумя руками от груди'],
        [20, 'Переливает воду из чашки в чашку с небольшой помощью'],
        [20, 'Пересыпает крупу ложкой из одной ёмкости в другую'],
        [21, 'Пытается рисовать круговые «мохнатые» линии'],
        [22, 'Повторяет за взрослым вертикальную линию'],
        [23, 'Строит «поезд» из 3–4 кубиков-вагончиков'],
        [24, 'Находит и приносит предметы трёх цветов по просьбе'],
        [24, 'Строит башню из 6–7 кубиков']
      ]
    },
    {
      id: 'gross', name: 'Движение', norm: 75,
      reco: ['Устраивайте домашнюю полосу препятствий из подушек', 'Игры с мячом: катить, бросать, пинать', 'Танцуйте под ритмичную музыку', 'Ходите по бордюру и узкой дорожке', 'Прыжки на месте и вперёд, держась за руки'],
      items: [
        [12, 'Первые самостоятельные шаги без поддержки'],
        [13, 'Уверенно стоит, приседает и встаёт'],
        [13, 'Забирается на невысокую ступеньку'],
        [14, 'Ходит самостоятельно по комнате'],
        [15, 'Залезает на диван или кресло и слезает с него'],
        [15, 'Толкает перед собой коляску или каталку'],
        [16, 'Ходит уверенно, обходит предметы на пути'],
        [17, 'Наклоняется за игрушкой, не теряя равновесия'],
        [18, 'Поднимается по лестнице за руку взрослого'],
        [19, 'Бегает — пока неуклюже, но с удовольствием'],
        [20, 'Пинает мяч ногой, стоя на месте'],
        [21, 'Перешагивает через низкое препятствие'],
        [22, 'Спускается по лестнице приставным шагом с поддержкой'],
        [23, 'Подпрыгивает, отталкиваясь двумя ногами'],
        [24, 'Бросает мяч вперёд и бежит за ним']
      ]
    },
    {
      id: 'listen', name: 'Понимаю', norm: 65,
      reco: ['Давайте простые поручения: «принеси», «положи»', 'Играйте в «где спряталась?» с игрушками', 'Называйте предметы и действия в течение дня', 'Задавайте вопросы по картинкам в сказках', 'Играйте с предлогами: «в коробке», «на столе»'],
      items: [
        [12, 'Понимает слово «нельзя» — останавливается хотя бы на мгновение'],
        [13, 'Выполняет простые просьбы: «дай», «принеси», «покажи»'],
        [14, 'Показывает знакомые предметы на картинке в книге'],
        [15, 'Показывает части тела у себя или у куклы'],
        [16, 'Понимает короткий рассказ о знакомых событиях'],
        [18, 'Выполняет поручение из двух действий: «возьми и положи»'],
        [20, 'Понимает предлоги «в» и «на»: положит в коробку, на стол'],
        [22, 'Находит предмет по описанию действия: «чем мы рисуем?»'],
        [24, 'Слушает короткую сказку с картинками, показывает «где кто»']
      ]
    },
    {
      id: 'speak', name: 'Говорю', norm: 60,
      reco: ['Читайте короткие книги с крупными картинками каждый день', 'Пойте простые песенки с повторами', 'Задавайте открытые вопросы и ждите ответ', 'Пальчиковые игры и потешки со звукоподражаниями', 'Подражайте звукам животных и транспорта вместе'],
      items: [
        [12, 'Говорит первые слова: «мама», «папа», «дай»'],
        [14, 'Произносит 5–10 облегчённых слов: «ав-ав», «ба», «ту-ту»'],
        [16, 'С удовольствием повторяет новые звуки и слоги'],
        [18, 'Активный словарь — около 15–20 слов и звукоподражаний'],
        [20, 'Соединяет два слова: «мама, дай», «папа, иди»'],
        [22, 'Спрашивает «что это?» — словом или интонацией'],
        [23, 'Использует слова «я», «мой», «на»'],
        [24, 'Строит фразу из 2–3 слов, называет предметы на картинках']
      ]
    },
    {
      id: 'social', name: 'Быт и социум', norm: 70,
      reco: ['Учите малыша мыть и вытирать руки', 'Привлекайте накрыть на стол', 'Тренируйте самостоятельное одевание без спешки', 'Разыгрывайте простые сюжеты с куклами', 'Учите делиться и обмениваться игрушками'],
      items: [
        [12, 'Пьёт из чашки с небольшой помощью'],
        [14, 'Пробует есть ложкой сам — пока неаккуратно'],
        [15, 'Снимает носок, шапку, тянет застёжку'],
        [16, 'Играет рядом со взрослым, включается в общее дело'],
        [18, 'Просится на горшок знаком, звуком или словом'],
        [19, 'Помогает одеваться: просовывает ручки и ножки'],
        [20, 'Моет руки с помощью и вытирает полотенцем'],
        [21, 'Ест ложкой почти аккуратно, держит её правильно'],
        [22, 'Подражает домашним делам: «подметает», «вытирает»'],
        [24, 'Остаётся сухим днём, сообщает о нужде']
      ]
    },
    {
      id: 'play', name: 'Игра', norm: 75,
      reco: ['Стройте постройки из кубиков вместе и усложняйте их', 'Предлагайте сюжеты: «покорми мишку», «отвези зайку спать»', 'Покажите предметы-заместители: палочка — ложка', 'Играйте в простые настольные игры по очереди', 'Устраивайте мини-инсценировки знакомых потешек'],
      items: [
        [12, 'Катит машинку, тянет игрушку на верёвочке'],
        [14, 'Обнимает, качает и «кормит» куклу или мишку'],
        [16, 'Повторяет в игре 1–2 действия за взрослым'],
        [18, 'Играет рядом с другими детьми, наблюдает за ними'],
        [20, 'Строит простые постройки из кубиков вместе со взрослым'],
        [22, 'Использует предметы-заместители: кубик — «машинка»'],
        [24, 'Появляются первые сюжетные игры: «баюкает», «везёт»']
      ]
    }
  ];

  const AGE_BLOCKS = [
    { label: '12–14 мес', from: 12, to: 14 },
    { label: '15–17 мес', from: 15, to: 17 },
    { label: '18–20 мес', from: 18, to: 20 },
    { label: '21–24 мес', from: 21, to: 24 }
  ];

  const LS_KEY = 'montessori-diag-v1';

  const root = document.getElementById('diagnostic');
  if (!root) return;

  /* ---------- состояние ---------- */
  let state = { name: '', age: 18, checked: {} };
  try {
    const saved = JSON.parse(localStorage.getItem(LS_KEY));
    if (saved && saved.checked) state = Object.assign(state, saved);
  } catch (e) { /* noop */ }

  const save = () => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) { /* noop */ }
  };

  const key = (sid, idx) => sid + ':' + idx;
  const applicableItems = sp => sp.items.filter(it => it[0] <= state.age + 1);
  const checkedInSphere = sp =>
    sp.items.reduce((n, it, i) => n + (state.checked[key(sp.id, i)] && it[0] <= state.age + 1 ? 1 : 0), 0);
  const pctOf = sp => {
    const app = applicableItems(sp).length;
    return app ? Math.round(checkedInSphere(sp) / app * 100) : 0;
  };

  /* ---------- элементы ---------- */
  const $ = sel => document.querySelector(sel);
  const introEl = $('#diagIntro');
  const quizEl = $('#diagQuiz');
  const tabsEl = $('#diagTabs');
  const panelsEl = $('#diagPanels');
  const actionsEl = $('#diagActions');
  const resultsEl = $('#diagResults');
  const fillEl = $('#dpFill');
  const pctEl = $('#dpPct');
  const cntEl = $('#dpCount');

  /* ---------- прогресс ---------- */
  function updateProgress() {
    let total = 0, done = 0;
    SPHERES.forEach(sp => { total += applicableItems(sp).length; done += checkedInSphere(sp); });
    const pct = total ? Math.round(done / total * 100) : 0;
    fillEl.style.width = pct + '%';
    pctEl.textContent = pct + '%';
    cntEl.textContent = 'отмечено ' + done + ' из ' + total;
    SPHERES.forEach((sp, i) => {
      const tab = tabsEl.children[i];
      if (!tab) return;
      const app = applicableItems(sp).length;
      const c = checkedInSphere(sp);
      tab.querySelector('.dt-count').textContent = c + '/' + app;
      tab.classList.toggle('is-done', app > 0 && c === app);
    });
  }

  /* ---------- построение вкладок и панелей ---------- */
  function buildQuiz() {
    tabsEl.innerHTML = '';
    panelsEl.innerHTML = '';
    SPHERES.forEach((sp, i) => {
      const tab = document.createElement('button');
      tab.className = 'diag-tab' + (i === 0 ? ' is-active' : '');
      tab.innerHTML = sp.name + ' <span class="dt-count"></span>';
      tab.addEventListener('click', () => activate(i));
      tabsEl.appendChild(tab);

      const panel = document.createElement('div');
      panel.className = 'diag-panel' + (i === 0 ? ' is-active' : '');
      AGE_BLOCKS.forEach(block => {
        const items = sp.items.map((it, idx) => ({ age: it[0], text: it[1], idx }))
          .filter(x => x.age >= block.from && x.age <= block.to);
        if (!items.length) return;
        const b = document.createElement('div');
        b.className = 'age-block';
        b.innerHTML = '<h4>' + block.label + '</h4>';
        items.forEach(x => {
          const k = key(sp.id, x.idx);
          const row = document.createElement('div');
          row.className = 'skill-item' + (state.checked[k] ? ' checked' : '') +
            (x.age > state.age ? ' future' : '');
          row.setAttribute('role', 'checkbox');
          row.setAttribute('aria-checked', !!state.checked[k]);
          row.tabIndex = 0;
          row.innerHTML =
            '<span class="box"><svg viewBox="0 0 16 16" fill="none"><path d="M2.5 8.5l3.5 3.5 7-8"/></svg></span>' +
            '<span class="txt">' + x.text + '</span>';
          const toggle = () => {
            state.checked[k] = !state.checked[k];
            if (!state.checked[k]) delete state.checked[k];
            row.classList.toggle('checked', !!state.checked[k]);
            row.setAttribute('aria-checked', !!state.checked[k]);
            save(); updateProgress();
          };
          row.addEventListener('click', toggle);
          row.addEventListener('keydown', e => {
            if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); }
          });
          b.appendChild(row);
        });
        panel.appendChild(b);
      });
      panelsEl.appendChild(panel);
    });
    updateProgress();
  }

  function activate(i) {
    [...tabsEl.children].forEach((t, j) => t.classList.toggle('is-active', j === i));
    [...panelsEl.children].forEach((p, j) => p.classList.toggle('is-active', j === i));
  }

  /* ---------- запуск ---------- */
  const nameInput = $('#childName');
  const ageSelect = $('#childAge');
  nameInput.value = state.name || '';
  ageSelect.value = state.age;

  $('#startDiag').addEventListener('click', () => {
    state.name = nameInput.value.trim();
    state.age = parseInt(ageSelect.value, 10);
    save();
    introEl.style.display = 'none';
    quizEl.style.display = 'block';
    actionsEl.style.display = 'flex';
    buildQuiz();
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  $('#resetDiag').addEventListener('click', () => {
    if (!confirm('Сбросить все отметки и начать заново?')) return;
    state.checked = {};
    save();
    buildQuiz();
    resultsEl.style.display = 'none';
    quizEl.style.display = 'block';
  });

  /* ---------- результаты ---------- */
  function statusOf(sp) {
    const p = pctOf(sp);
    if (p >= sp.norm + 10) return { cls: 'v-up', tag: 'опережает', pct: p };
    if (p >= sp.norm - 15) return { cls: 'v-ok', tag: 'по возрасту', pct: p };
    return { cls: 'v-low', tag: 'фокус внимания', pct: p };
  }

  function renderRadar() {
    const size = 340, cx = size / 2, cy = size / 2, R = 118;
    const n = SPHERES.length;
    const pt = (i, val) => {
      const a = -Math.PI / 2 + i * 2 * Math.PI / n;
      const r = R * val / 100;
      return (cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1);
    };
    const axisEnd = i => {
      const a = -Math.PI / 2 + i * 2 * Math.PI / n;
      return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
    };
    let rings = '';
    [25, 50, 75, 100].forEach(v => {
      rings += '<polygon points="' + SPHERES.map((s, i) => pt(i, v)).join(' ') +
        '" fill="none" stroke="rgba(42,22,13,.1)" stroke-width="1"/>';
    });
    let axes = '', labels = '';
    SPHERES.forEach((sp, i) => {
      const e = axisEnd(i);
      axes += '<line x1="' + cx + '" y1="' + cy + '" x2="' + e.x.toFixed(1) + '" y2="' + e.y.toFixed(1) +
        '" stroke="rgba(42,22,13,.1)" stroke-width="1"/>';
      const lx = cx + (R + 34) * Math.cos(-Math.PI / 2 + i * 2 * Math.PI / n);
      const ly = cy + (R + 26) * Math.sin(-Math.PI / 2 + i * 2 * Math.PI / n);
      labels += '<text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) +
        '" text-anchor="middle" font-size="12.5" fill="rgba(42,22,13,.65)" font-family="Jost,sans-serif">' +
        sp.name + '</text>';
    });
    const childPts = SPHERES.map((sp, i) => pt(i, pctOf(sp))).join(' ');
    const normPts = SPHERES.map((sp, i) => pt(i, sp.norm)).join(' ');
    const dots = SPHERES.map((sp, i) => {
      const p = pt(i, pctOf(sp)).split(',');
      return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4" fill="#c4785a"/>';
    }).join('');
    return '<svg viewBox="0 0 ' + size + ' ' + size + '" style="width:100%;height:auto" role="img" aria-label="Профиль развития">' +
      rings + axes +
      '<polygon points="' + normPts + '" fill="rgba(201,169,110,.12)" stroke="#c9a96e" stroke-width="1.5" stroke-dasharray="5 4"/>' +
      '<polygon points="' + childPts + '" fill="rgba(196,120,90,.22)" stroke="#c4785a" stroke-width="2"/>' +
      dots + labels +
      '<text x="' + cx + '" y="' + (size - 6) + '" text-anchor="middle" font-size="11" fill="rgba(42,22,13,.4)" font-family="Jost,sans-serif">терракот — ребёнок · золотой пунктир — возрастной ориентир</text>' +
      '</svg>';
  }

  function renderResults() {
    let verdicts = '';
    let recoCols = '';
    SPHERES.forEach(sp => {
      const st = statusOf(sp);
      verdicts += '<div class="verdict ' + st.cls + '">' +
        '<span class="v-dot"></span><span class="v-name">' + sp.name + '</span>' +
        '<span class="v-pct">' + st.pct + '%</span><span class="v-tag">' + st.tag + '</span></div>';
      if (st.cls === 'v-low') {
        recoCols += '<div class="reco-col"><h5>' + sp.name + '</h5><ul>' +
          sp.reco.slice(0, 4).map(r => '<li>' + r + '</li>').join('') + '</ul></div>';
      }
    });

    $('#radarBox').innerHTML = renderRadar();
    $('#verdictList').innerHTML = verdicts;
    $('#recoCols').innerHTML = recoCols ||
      '<p class="reco-empty">Все сферы в пределах возрастных ориентиров — замечательно! Продолжайте играть, разговаривать и давать малышу свободу действий.</p>';
    $('#recoBlock').style.display = 'block';

    quizEl.style.display = 'none';
    resultsEl.style.display = 'block';
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  $('#showResults').addEventListener('click', renderResults);
  $('#backToQuiz').addEventListener('click', () => {
    resultsEl.style.display = 'none';
    quizEl.style.display = 'block';
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* ---------- отчёт для PDF / печати ---------- */
  function reportHTML() {
    const name = state.name || 'Малыш';
    const ageTxt = state.age + ' ' + (state.age === 12 ? 'месяцев' : state.age >= 21 && state.age <= 24 ? 'месяца' : 'месяцев');
    const date = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    let rows = '';
    SPHERES.forEach(sp => {
      const st = statusOf(sp);
      const tagRu = st.cls === 'v-up' ? 'опережает' : st.cls === 'v-ok' ? 'по возрасту' : 'фокус внимания';
      const color = st.cls === 'v-up' ? '#c9a96e' : st.cls === 'v-ok' ? '#7a9e87' : '#c4785a';
      rows += '<tr>' +
        '<td style="padding:10px 14px;border-bottom:1px solid #e7ded1;font-size:14px">' + sp.name + '</td>' +
        '<td style="padding:10px 14px;border-bottom:1px solid #e7ded1;font-size:14px;text-align:center;font-weight:600">' + st.pct + '%</td>' +
        '<td style="padding:10px 14px;border-bottom:1px solid #e7ded1;font-size:13px;text-align:center;color:' + color + ';font-weight:600">' + tagRu + '</td></tr>';
    });
    let recos = '';
    SPHERES.forEach(sp => {
      if (statusOf(sp).cls === 'v-low') {
        recos += '<div style="margin-bottom:14px"><b style="font-size:14px;color:#a55f43">' + sp.name + '</b>' +
          '<ul style="margin:6px 0 0 18px;font-size:13.5px;line-height:1.55">' +
          sp.reco.slice(0, 4).map(r => '<li>' + r + '</li>').join('') + '</ul></div>';
      }
    });
    if (!recos) recos = '<p style="font-size:13.5px">Все сферы развития в пределах возрастных ориентиров.</p>';
    return '' +
      '<div style="font-family:Jost,Arial,sans-serif;color:#2a160d;background:#fcfcf8;padding:36px 40px">' +
      '<div style="border-bottom:2px solid #c4785a;padding-bottom:14px;margin-bottom:20px">' +
      '<div style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#a55f43">Студия Монтессори · детский центр «Лукошко», Тюмень</div>' +
      '<h1 style="font-family:Georgia,serif;font-size:30px;font-weight:600;margin:8px 0 4px">Карта развития: ' + name + '</h1>' +
      '<div style="font-size:13px;color:rgba(42,22,13,.6)">Возраст: ' + ageTxt + ' · дата наблюдения: ' + date + '</div></div>' +
      '<table style="width:100%;border-collapse:collapse;margin-bottom:24px">' +
      '<tr style="background:#f5f0e6"><th style="padding:10px 14px;text-align:left;font-size:12px;letter-spacing:.1em;text-transform:uppercase">Сфера развития</th>' +
      '<th style="padding:10px 14px;font-size:12px;letter-spacing:.1em;text-transform:uppercase">Освоено</th>' +
      '<th style="padding:10px 14px;font-size:12px;letter-spacing:.1em;text-transform:uppercase">Итог</th></tr>' +
      rows + '</table>' +
      '<h2 style="font-family:Georgia,serif;font-size:20px;margin-bottom:10px">Домашние игры и рекомендации</h2>' + recos +
      '<p style="margin-top:22px;font-size:11.5px;color:rgba(42,22,13,.5);line-height:1.5">Карта составлена по наблюдениям родителя и не является медицинским заключением. ' +
      'Если что-то настораживает, приходите на занятие — педагог посмотрит малыша в игре и подскажет следующие шаги. ' +
      'Ирина Кичигина, Монтессори-педагог, учитель-дефектолог. «Лукошко», ул. Газовиков, 41к1 · тел. 53-12-20 (доб. 3)</p></div>';
  }

  function loadScript(src) {
    return new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  $('#savePdf').addEventListener('click', async () => {
    const btn = $('#savePdf');
    const original = btn.textContent;
    btn.textContent = 'Готовим PDF…';
    btn.disabled = true;
    try {
      if (!window.html2pdf) {
        await loadScript('https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js');
      }
      const holder = document.createElement('div');
      holder.style.cssText = 'position:fixed;left:-12000px;top:0;width:820px;background:#fff;';
      holder.innerHTML = reportHTML();
      document.body.appendChild(holder);
      const fname = 'razvitie-' + (state.name || 'malysh').toLowerCase().replace(/[^a-zа-яё0-9]+/gi, '-') + '.pdf';
      await window.html2pdf().set({
        margin: 8,
        filename: fname,
        image: { type: 'jpeg', quality: 0.96 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: '#fcfcf8' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(holder.firstChild).save();
      holder.remove();
    } catch (err) {
      printReport();
    } finally {
      btn.textContent = original;
      btn.disabled = false;
    }
  });

  function printReport() {
    let pr = document.getElementById('print-report');
    if (!pr) {
      pr = document.createElement('div');
      pr.id = 'print-report';
      document.body.appendChild(pr);
    }
    pr.innerHTML = reportHTML();
    window.print();
  }
  $('#printPdf').addEventListener('click', printReport);
})();
