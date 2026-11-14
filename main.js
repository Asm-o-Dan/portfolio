/**
 * Daniil Gandapas (Asm-o-Dan) — portfolio logic.
 * Вкладки с хэш-маршрутизацией, рендер из projects-data.js, инспектор слоёв,
 * печатное резюме и терминал.
 */
(function () {
  'use strict';

  var data = window.ASM_PORTFOLIO || {};
  var me = data.engineerProfile || {};
  var lab = data.drugsEngineLab || {};
  var projects = data.projectsData || [];
  var skills = data.skillsData || [];
  var timeline = data.timelineData || [];

  var VIEWS = ['overview', 'lab', 'dossier'];
  // Старые якоря из прошлой версии сайта ведут в нужную вкладку
  var LEGACY = {
    hero: 'overview', about: 'overview', projects: 'overview', skills: 'overview',
    experience: 'overview', contact: 'overview', architecture: 'lab', systems: 'lab', cv: 'dossier', resume: 'dossier'
  };

  // ---------- helpers ----------
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function icon(id) { return '<svg class="ic" aria-hidden="true"><use href="#i-' + id + '"/></svg>'; }
  function ext(url, inner, cls) {
    return '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer"' + (cls ? ' class="' + cls + '"' : '') + '>' + inner + '</a>';
  }
  function store(key, val) {
    try {
      if (val === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, val);
    } catch (e) { return null; }
    return null;
  }

  var toastHub = $('#toast-hub');
  function toast(msg) {
    if (!toastHub) return;
    var el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    toastHub.appendChild(el);
    setTimeout(function () { el.remove(); }, 2200);
  }

  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () { toast('Скопировано: ' + text); },
        function () { toast('Не удалось скопировать: ' + text); }
      );
    } else {
      toast(text);
    }
  }

  // ---------- theme ----------
  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    store('theme', t);
    var btn = $('#theme-toggle');
    if (btn) btn.setAttribute('aria-label', t === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему');
  }
  $('#theme-toggle').addEventListener('click', function () {
    setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  });
  setTheme(document.documentElement.getAttribute('data-theme') || 'dark');

  // ---------- code highlighting (минимальный, без зависимостей) ----------
  var KW = {
    'C#': 'public|private|protected|internal|class|record|sealed|abstract|static|readonly|var|new|return|if|else|await|async|using|null|true|false|void|override|this|base|const|is|not|foreach|in|throw|get|set|init',
    'Python': 'def|return|if|not|None|True|False|with|as|import|from|for|in|try|except|class|self|and|or',
    'YAML': ''
  };
  function highlight(code, lang) {
    var kw = KW[lang] || '';
    var parts = [
      lang === 'YAML' || lang === 'Python' ? '(#[^\\n]*)' : '(\\/\\/[^\\n]*)',
      '("(?:[^"\\\\\\n]|\\\\.)*"|\'(?:[^\'\\\\\\n]|\\\\.)*\')',
      lang === 'Python' ? '(@\\w+)' : lang === 'YAML' ? '(\\b\\B)' : '(\\b[A-Z][A-Za-z0-9]*(?=[<(\\s.]))',
      kw ? '(\\b(?:' + kw + ')\\b)' : '(\\b\\B)'
    ];
    var re = new RegExp(parts.join('|'), 'g');
    var out = '';
    var last = 0;
    code.replace(re, function (m, c, s, t, k, idx) {
      out += esc(code.slice(last, idx));
      var cls = c ? 'c' : s ? 's' : t ? 't' : 'k';
      out += '<span class="' + cls + '">' + esc(m) + '</span>';
      last = idx + m.length;
      return m;
    });
    out += esc(code.slice(last));
    return out;
  }

  // =========================================================================
  // OVERVIEW
  // =========================================================================
  $all('[data-bind]').forEach(function (el) {
    var v = me[el.getAttribute('data-bind')];
    if (v) el.textContent = v;
  });

  // Аватар: если GitHub недоступен, остаётся монограмма
  (function () {
    var box = $('#avatar');
    if (!box || !me.avatar) return;
    var img = new Image();
    img.alt = '';
    img.decoding = 'async';
    img.onload = function () { box.innerHTML = ''; box.appendChild(img); };
    img.src = me.avatar;
  })();

  $('#contact-list').innerHTML = [
    { ic: 'send', label: 'Telegram — отвечаю быстрее всего', value: me.telegram, href: me.telegramUrl, copy: me.telegram },
    { ic: 'mail', label: 'Почта', value: me.email, href: 'mailto:' + me.email, copy: me.email, self: true },
    { ic: 'github', label: 'GitHub', value: me.githubLabel, href: me.githubUrl }
  ].map(function (c) {
    var link = c.self
      ? '<a class="contact-value" href="' + esc(c.href) + '">' + esc(c.value) + '</a>'
      : ext(c.href, esc(c.value), 'contact-value');
    var btn = c.copy
      ? '<button class="copy-btn" type="button" data-copy="' + esc(c.copy) + '" aria-label="Скопировать ' + esc(c.value) + '">' + icon('copy') + '</button>'
      : '';
    return '<li class="contact-row">' + icon(c.ic) +
      '<div class="contact-main"><div class="contact-label">' + esc(c.label) + '</div>' + link + '</div>' + btn + '</li>';
  }).join('');

  $('#facts').innerHTML = (me.facts || []).map(function (f) {
    return '<dt>' + esc(f.label) + '</dt><dd>' + esc(f.value) + '</dd>';
  }).join('');

  $('#core-stack').innerHTML = (me.coreStack || []).map(function (s) {
    return '<li class="stack-item"><div class="stack-name">' + esc(s.name) + '</div><div class="stack-note">' + esc(s.note) + '</div></li>';
  }).join('');

  function flowHtml(nodes) {
    return nodes.map(function (n) {
      return '<li class="flow-node" data-flow="' + esc(n.id) + '">' +
        '<span class="flow-lang">' + esc(n.lang) + '</span>' +
        '<div class="flow-label">' + esc(n.label) + '</div>' +
        '<div class="flow-sub">' + esc(n.sub) + '</div></li>';
    }).join('');
  }
  $('#feature-tagline').textContent = lab.tagline || '';
  $('#flow-mini').innerHTML = flowHtml(lab.flow || []);

  $('#mini-timeline').innerHTML = timeline.map(function (t) {
    return '<li><div class="mt-period">' + esc(t.period) + ' · ' + esc(t.type) + '</div>' +
      '<div class="mt-role">' + esc(t.role) + '</div><div class="mt-company">' + esc(t.company) + '</div></li>';
  }).join('');

  $('#project-list').innerHTML = projects.filter(function (p) { return !p.lab; }).map(function (p) {
    return '<li class="project-item"><div class="project-top"><h3 class="project-title">' + esc(p.title) + '</h3>' +
      ext(p.githubUrl, 'GitHub ' + icon('external'), 'project-link') + '</div>' +
      '<p class="project-sub">' + esc(p.subtitle) + '</p>' +
      '<div class="tags">' + p.stack.map(function (s) { return '<span class="tag">' + esc(s) + '</span>'; }).join('') + '</div></li>';
  }).join('');

  // =========================================================================
  // LAB
  // =========================================================================
  $('#case-tagline').textContent = lab.tagline || '';
  $('#case-problem').textContent = lab.problem || '';
  $('#repo-links').innerHTML = (lab.repos || []).map(function (r) {
    return '<li>' + ext(r.url, icon('github') + '<span>' + esc(r.label) + '</span><small>' + esc(r.note) + '</small>', 'repo-link') + '</li>';
  }).join('');
  $('#case-numbers').innerHTML = (lab.numbers || []).map(function (n) {
    return '<li class="number"><div class="number-value">' + esc(n.value) + '</div><div class="number-label">' + esc(n.label) + '</div></li>';
  }).join('');
  $('#flow-full').innerHTML = flowHtml(lab.flow || []);

  var layers = lab.layers || [];
  var layerTabs = $('#layer-tabs');
  var layerPanel = $('#layer-panel');

  layerTabs.innerHTML = layers.map(function (l, i) {
    return '<button class="layer-tab" role="tab" type="button" id="layer-tab-' + esc(l.id) + '" aria-controls="layer-panel"' +
      ' aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '" data-layer="' + esc(l.id) + '">' +
      '<span class="layer-tab-name">' + esc(l.name) + '</span><span class="layer-tab-rule">' + esc(l.rule) + '</span></button>';
  }).join('');

  function selectLayer(id, focus) {
    var layer = layers.filter(function (l) { return l.id === id; })[0];
    if (!layer) return;
    $all('.layer-tab', layerTabs).forEach(function (b) {
      var on = b.getAttribute('data-layer') === id;
      b.setAttribute('aria-selected', on);
      b.tabIndex = on ? 0 : -1;
      if (on && focus) { b.focus(); b.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }
    });
    layerPanel.setAttribute('aria-labelledby', 'layer-tab-' + id);
    layerPanel.innerHTML =
      '<h3 class="panel-title">' + esc(layer.name) + '</h3>' +
      '<span class="panel-rule">' + esc(layer.rule) + '</span>' +
      '<p class="panel-desc">' + esc(layer.desc) + '</p>' +
      '<ul class="panel-points">' + layer.points.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' +
      '<figure class="code-box"><figcaption class="code-head">' +
        ext(layer.url, icon('file') + '<span>' + esc(layer.file) + '</span>', 'code-file') +
        '<span class="code-lang">' + esc(layer.lang) + '</span></figcaption>' +
        '<pre class="code-body"><code>' + highlight(layer.code, layer.lang) + '</code></pre></figure>';
    $all('#flow-full .flow-node').forEach(function (n) {
      n.classList.toggle('is-active', layer.flowIds.indexOf(n.getAttribute('data-flow')) !== -1);
    });
  }

  layerTabs.addEventListener('click', function (e) {
    var b = e.target.closest('.layer-tab');
    if (b) selectLayer(b.getAttribute('data-layer'));
  });
  layerTabs.addEventListener('keydown', function (e) {
    var tabs = $all('.layer-tab', layerTabs);
    var i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    var next = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % tabs.length;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    if (next === null) return;
    e.preventDefault();
    selectLayer(tabs[next].getAttribute('data-layer'), true);
  });
  if (layers.length) selectLayer(layers[0].id);

  var commitBase = (lab.repos && lab.repos[0] ? lab.repos[0].url : 'https://github.com/Asm-o-Dan/DrugsEngine') + '/commit/';
  $('#review-log').innerHTML = (lab.reviewLog || []).map(function (r) {
    return '<li class="review-item">' + ext(commitBase + r.sha, esc(r.sha), 'review-sha') +
      '<span class="review-area">' + esc(r.area) + '</span><span class="review-text">' + esc(r.text) + '</span></li>';
  }).join('');
  $('#next-list').innerHTML = (lab.next || []).map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('');

  // =========================================================================
  // DOSSIER
  // =========================================================================
  (function renderSheet() {
    var de = projects.filter(function (p) { return p.lab; })[0];
    var others = projects.filter(function (p) { return !p.lab; });
    var exp = timeline.filter(function (t) { return t.type !== 'Образование'; });
    var edu = timeline.filter(function (t) { return t.type === 'Образование'; });
    var deBullets = [
      'Слоистая архитектура: Domain (сущности с инвариантами, value objects, доменные события), Application (команды и запросы MediatR, UnitOfWork), Infrastructure (EF Core, PostgreSQL, ASP.NET Core API с OData).',
      'Публикация препаратов в Kafka с передачей trace-контекста; Python-сервис строит эмбеддинги LaBSE и ищет аналоги в Qdrant.',
      'Docker Compose: PostgreSQL → контейнер миграций → API, health checks; Serilog и OpenTelemetry.',
      '42 unit-теста (xUnit); 20 исправлений после код-ревью отдельными коммитами.'
    ];

    function item(title, meta, sub, bullets, link) {
      return '<div class="cv-item"><div class="cv-item-top"><span class="cv-item-title">' + esc(title) + '</span>' +
        '<span class="cv-item-meta">' + esc(meta) + '</span></div>' +
        (sub ? '<div class="cv-item-sub">' + esc(sub) + '</div>' : '') +
        (bullets && bullets.length ? '<ul class="cv-bullets">' + bullets.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('') + '</ul>' : '') +
        (link ? '<div>' + ext(link, esc(link.replace('https://', '')), 'cv-link') + '</div>' : '') + '</div>';
    }

    $('#sheet').innerHTML =
      '<header class="cv-head"><div><h2 class="cv-name">' + esc(me.name) + '</h2>' +
        '<div class="cv-role">' + esc(me.role) + ' · ' + esc(me.level) + '</div></div>' +
        '<div class="cv-contacts">' +
          ext(me.telegramUrl, 'Telegram ' + esc(me.telegram)) +
          '<a href="mailto:' + esc(me.email) + '">' + esc(me.email) + '</a>' +
          ext(me.githubUrl, esc(me.githubLabel)) +
          ext('https://asm-o-dan.github.io/portfolio/', 'asm-o-dan.github.io/portfolio') +
        '</div></header>' +
      '<section class="cv-section"><h3 class="cv-h">О себе</h3><p class="cv-summary">' + esc(me.summary) + '</p></section>' +
      '<section class="cv-section"><h3 class="cv-h">Условия</h3><dl class="cv-facts">' +
        (me.facts || []).map(function (f) { return '<div><dt>' + esc(f.label) + ':</dt><dd>' + esc(f.value) + '</dd></div>'; }).join('') +
      '</dl></section>' +
      '<section class="cv-section"><h3 class="cv-h">Навыки</h3><dl class="cv-skills">' +
        skills.map(function (s) { return '<dt>' + esc(s.category) + '</dt><dd>' + esc(s.items.join(', ')) + '</dd>'; }).join('') +
      '</dl></section>' +
      '<section class="cv-section"><h3 class="cv-h">Опыт</h3>' +
        exp.map(function (t) { return item(t.role, t.period, t.company, t.highlights); }).join('') +
      '</section>' +
      '<section class="cv-section"><h3 class="cv-h">Проекты</h3>' +
        (de ? item(de.title + ' — ' + de.subtitle, 'C# · Python', de.stack.join(', '), deBullets, de.githubUrl) : '') +
        others.map(function (p) { return item(p.title + ' — ' + p.subtitle, p.stack.slice(0, 3).join(' · '), p.description, null, p.githubUrl); }).join('') +
      '</section>' +
      '<section class="cv-section"><h3 class="cv-h">Образование</h3>' +
        edu.map(function (t) { return item(t.company, t.period, t.role, t.highlights); }).join('') +
      '</section>';
  })();

  $('#print-btn').addEventListener('click', function () { window.print(); });

  // =========================================================================
  // ROUTER (вкладки)
  // =========================================================================
  var viewTabs = $all('.view-tab');
  var current = null;

  function resolve(hash) {
    var h = (hash || '').replace(/^#/, '').toLowerCase();
    if (VIEWS.indexOf(h) !== -1) return h;
    return LEGACY[h] || 'overview';
  }

  function setView(view, opts) {
    opts = opts || {};
    if (VIEWS.indexOf(view) === -1) view = 'overview';
    var changed = view !== current;
    current = view;
    VIEWS.forEach(function (v) {
      var panel = document.getElementById(v);
      if (panel) panel.hidden = v !== view;
    });
    viewTabs.forEach(function (t) {
      var on = t.getAttribute('data-view') === view;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
    });
    if (opts.push && location.hash !== '#' + view) {
      history.pushState(null, '', '#' + view);
    }
    if (changed && opts.scroll !== false) window.scrollTo(0, 0);
    if (opts.focusPanel) {
      var p = document.getElementById(view);
      if (p) p.focus({ preventScroll: true });
    }
  }

  viewTabs.forEach(function (t) {
    t.addEventListener('click', function () { setView(t.getAttribute('data-view'), { push: true }); });
  });
  $('.views-list').addEventListener('keydown', function (e) {
    var i = viewTabs.indexOf(document.activeElement);
    if (i < 0) return;
    var n = null;
    if (e.key === 'ArrowRight') n = (i + 1) % viewTabs.length;
    else if (e.key === 'ArrowLeft') n = (i - 1 + viewTabs.length) % viewTabs.length;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = viewTabs.length - 1;
    if (n === null) return;
    e.preventDefault();
    viewTabs[n].focus();
    setView(viewTabs[n].getAttribute('data-view'), { push: true });
  });

  // Внутренние ссылки вида data-go="lab"
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-go]');
    if (!a) return;
    e.preventDefault();
    setView(a.getAttribute('data-go'), { push: true, focusPanel: a.getAttribute('data-go') !== 'overview' });
  });

  window.addEventListener('popstate', function () { setView(resolve(location.hash)); });
  window.addEventListener('hashchange', function () { setView(resolve(location.hash)); });

  // Если пришли по старому якорю (#architecture и т.п.) — переписываем адрес
  var initial = resolve(location.hash);
  if (location.hash && location.hash !== '#' + initial) history.replaceState(null, '', '#' + initial);
  setView(initial, { scroll: false });

  // ---------- copy buttons ----------
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copy]');
    if (b) copy(b.getAttribute('data-copy'));
  });

  // =========================================================================
  // CLI
  // =========================================================================
  var cli = $('#cli');
  var out = $('#cli-out');
  var input = $('#cli-input');
  var opener = null;
  var hist = [];
  var hIdx = 0;
  var greeted = false;

  var FILES = {
    'about.txt': function () {
      return me.name + ' — ' + me.role + ' (' + me.level + ')\n\n' + me.summary;
    },
    'contacts.txt': function () {
      return 'telegram  ' + me.telegram + '  ' + me.telegramUrl + '\nemail     ' + me.email + '\ngithub    ' + me.githubUrl;
    },
    'stack.txt': function () {
      return skills.map(function (s) { return s.category + ':\n  ' + s.items.join(', '); }).join('\n\n');
    },
    'terms.txt': function () {
      return (me.facts || []).map(function (f) { return (f.label + ':').padEnd(14) + f.value; }).join('\n');
    },
    'projects.md': function () {
      return projects.map(function (p) { return '# ' + p.title + '\n' + p.subtitle + '\n' + p.githubUrl; }).join('\n\n');
    },
    'drugsengine.md': function () {
      return '# DrugsEngine\n' + lab.problem + '\n\n' +
        layers.map(function (l) { return '## ' + l.name + '\n' + l.rule + '\n' + l.file; }).join('\n\n') +
        '\n\nПодробно: open lab';
    }
  };

  var COMMANDS = {
    help: function () {
      return [
        '<span class="hl">help</span>              список команд',
        '<span class="hl">whoami</span>            кто я',
        '<span class="hl">ls</span>                файлы',
        '<span class="hl">cat</span> &lt;файл&gt;        показать файл',
        '<span class="hl">open</span> &lt;раздел&gt;      overview | lab | dossier',
        '<span class="hl">cv</span>                скачать резюме (PDF)',
        '<span class="hl">contacts</span>          контакты',
        '<span class="hl">github</span>            открыть GitHub',
        '<span class="hl">theme</span>             сменить тему',
        '<span class="hl">clear</span>             очистить экран',
        '<span class="hl">exit</span>              закрыть терминал (или Esc)',
        '',
        '<span class="dim">Tab — автодополнение, ↑/↓ — история.</span>'
      ].join('\n');
    },
    whoami: function () { return esc(me.name + ' — ' + me.role + ', ' + me.status); },
    ls: function () { return Object.keys(FILES).map(function (f) { return '<span class="hl">' + f + '</span>'; }).join('  '); },
    cat: function (args) {
      if (!args[0]) return '<span class="err">cat: укажите файл, например: cat about.txt</span>';
      var f = FILES[args[0]];
      return f ? esc(f()) : '<span class="err">cat: ' + esc(args[0]) + ': нет такого файла (см. ls)</span>';
    },
    open: function (args) {
      var v = resolve(args[0] || '');
      if (!args[0] || (VIEWS.indexOf(args[0]) === -1 && !LEGACY[args[0]])) {
        return '<span class="err">open: укажите раздел: overview, lab или dossier</span>';
      }
      setView(v, { push: true });
      return 'Открыт раздел: ' + v;
    },
    cv: function () {
      var a = document.createElement('a');
      a.href = me.resumePdf;
      a.download = 'Daniil_Gandapas_CV.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      return 'Скачиваю ' + esc(me.resumePdf) + '…';
    },
    contacts: function () {
      return 'telegram  <a href="' + esc(me.telegramUrl) + '" target="_blank" rel="noopener noreferrer">' + esc(me.telegram) + '</a>\n' +
        'email     <a href="mailto:' + esc(me.email) + '">' + esc(me.email) + '</a>\n' +
        'github    <a href="' + esc(me.githubUrl) + '" target="_blank" rel="noopener noreferrer">' + esc(me.githubLabel) + '</a>';
    },
    github: function () {
      window.open(me.githubUrl, '_blank', 'noopener');
      return 'Открываю ' + esc(me.githubUrl);
    },
    theme: function () {
      var t = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      setTheme(t);
      return 'Тема: ' + t;
    },
    clear: function () { out.innerHTML = ''; return null; },
    exit: function () { closeCli(); return null; },
    sudo: function () { return '<span class="dim">Права выдаются после оффера.</span>'; }
  };
  COMMANDS.cd = function () { return '<span class="dim">Здесь одна директория. Попробуйте ls.</span>'; };

  function print(html, cls) {
    var div = document.createElement('div');
    if (cls) div.className = cls;
    div.innerHTML = html;
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
  }

  function run(line) {
    var raw = line.trim();
    if (!raw) return;
    var cmdLine = document.createElement('div');
    cmdLine.className = 'cmd';
    cmdLine.textContent = raw;
    out.appendChild(cmdLine);
    hist.push(raw);
    hIdx = hist.length;
    var parts = raw.split(/\s+/);
    var name = parts[0].toLowerCase();
    var fn = COMMANDS[name];
    var res = fn ? fn(parts.slice(1)) : '<span class="err">' + esc(name) + ': команда не найдена. Наберите help</span>';
    if (res !== null && res !== undefined) print(res);
    out.scrollTop = out.scrollHeight;
  }

  function openCli() {
    if (!cli.hidden) return;
    opener = document.activeElement;
    cli.hidden = false;
    if (!greeted) {
      greeted = true;
      print('<span class="dim">asm-o-dan shell. Наберите</span> <span class="hl">help</span><span class="dim">, чтобы увидеть команды.</span>');
    }
    setTimeout(function () { input.focus(); }, 0);
  }
  function closeCli() {
    if (cli.hidden) return;
    cli.hidden = true;
    if (opener && opener.focus) opener.focus();
  }

  $('#cli-open').addEventListener('click', function () { if (cli.hidden) openCli(); else closeCli(); });
  $('#cli-close').addEventListener('click', closeCli);
  $('#cli-form').addEventListener('submit', function (e) {
    e.preventDefault();
    run(input.value);
    input.value = '';
  });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp') {
      if (hIdx > 0) { hIdx--; input.value = hist[hIdx]; }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (hIdx < hist.length - 1) { hIdx++; input.value = hist[hIdx]; } else { hIdx = hist.length; input.value = ''; }
      e.preventDefault();
    } else if (e.key === 'Tab' && !e.shiftKey && input.value.trim()) {
      e.preventDefault();
      var parts = input.value.replace(/^\s+/, '').split(/\s+/);
      var pool = parts.length > 1
        ? (parts[0] === 'open' ? VIEWS : Object.keys(FILES))
        : Object.keys(COMMANDS).filter(function (c) { return c !== 'sudo' && c !== 'cd'; });
      var cur = parts[parts.length - 1];
      var hits = pool.filter(function (p) { return p.indexOf(cur) === 0; });
      if (hits.length === 1) {
        parts[parts.length - 1] = hits[0];
        input.value = parts.join(' ') + ' ';
      } else if (hits.length > 1) {
        print('<span class="dim">' + hits.join('  ') + '</span>');
      }
    }
  });

  // Удерживаем фокус внутри открытого терминала
  cli.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var focusables = [input, $('#cli-close')];
    var i = focusables.indexOf(document.activeElement);
    if (e.key === 'Tab' && document.activeElement === input && !e.shiftKey && input.value.trim()) return; // автодополнение
    e.preventDefault();
    focusables[(i + (e.shiftKey ? -1 : 1) + focusables.length) % focusables.length].focus();
  });

  // ` / ё (одна физическая клавиша) открывает терминал; Esc закрывает
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !cli.hidden) { e.preventDefault(); closeCli(); return; }
    if (e.code !== 'Backquote' || e.ctrlKey || e.metaKey || e.altKey) return;
    var t = e.target;
    var typing = t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
    if (typing && t !== input) return;
    e.preventDefault();
    if (cli.hidden) openCli(); else closeCli();
  });
})();
