/**
 * Daniil Gandapas (Asm-o-Dan) — Systems & Backend Engineering Engine
 * Handles interactive topology blueprints, project filtering, telemetry console, and responsive UI.
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.ASM_PORTFOLIO || {};
  const engineer = data.engineerProfile || {};
  const topologies = data.architectureTopologies || {};
  const projects = data.projectsData || [];
  const skills = data.skillsData || [];
  const timeline = data.timelineData || [];
  const values = data.teamValues || [];

  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // =========================================================================
  // 1. THE SIGNATURE ELEMENT: Interactive System Topology Inspector
  // =========================================================================
  let currentTopologyKey = 'drugs-engine';
  let currentLayerId = 'domain';

  const topoSwitchBtns = document.querySelectorAll('.topo-switch-btn');
  const layersListContainer = document.getElementById('topology-layers-list');
  const layerTitleEl = document.getElementById('inspector-layer-title');
  const layerBadgeEl = document.getElementById('inspector-layer-badge');
  const layerRuleEl = document.getElementById('inspector-layer-rule');
  const layerDescEl = document.getElementById('inspector-layer-desc');
  const layerCodeEl = document.getElementById('inspector-layer-code');
  const metricsRowEl = document.getElementById('inspector-metrics-row');

  function renderTopology(topoKey, selectLayerId = null) {
    const topo = topologies[topoKey];
    if (!topo) return;
    currentTopologyKey = topoKey;

    // Update switcher buttons state
    topoSwitchBtns.forEach(btn => {
      if (btn.getAttribute('data-topo') === topoKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Render layers in left column
    if (layersListContainer) {
      layersListContainer.innerHTML = '';

      topo.layers.forEach((layer, idx) => {
        const layerBtn = document.createElement('button');
        layerBtn.className = 'layer-card-btn';
        layerBtn.setAttribute('data-layer-id', layer.id);

        layerBtn.innerHTML = `
          <div class="layer-card-title">${layer.name}</div>
          <div class="layer-card-rule mono">${layer.rule}</div>
        `;

        layerBtn.addEventListener('click', () => {
          selectLayer(layer.id);
        });

        layersListContainer.appendChild(layerBtn);
      });
    }

    // Default layer selection
    const firstLayerId = selectLayerId || topo.layers[0]?.id;
    if (firstLayerId) {
      selectLayer(firstLayerId);
    }
  }

  function selectLayer(layerId) {
    const topo = topologies[currentTopologyKey];
    if (!topo) return;

    const layer = topo.layers.find(l => l.id === layerId);
    if (!layer) return;
    currentLayerId = layerId;

    // Update active class on layer buttons
    const allLayerBtns = document.querySelectorAll('.layer-card-btn');
    allLayerBtns.forEach(b => {
      if (b.getAttribute('data-layer-id') === layerId) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    // Update Inspector details
    if (layerTitleEl) layerTitleEl.textContent = layer.name;
    if (layerBadgeEl) layerBadgeEl.textContent = `INSPECTOR // ${layerId.toUpperCase()}`;
    if (layerRuleEl) layerRuleEl.textContent = layer.rule;
    if (layerDescEl) layerDescEl.textContent = layer.desc;
    if (layerCodeEl) layerCodeEl.textContent = layer.codeSnippet || '// No snippet available';

    // Render Metrics
    if (metricsRowEl) {
      metricsRowEl.innerHTML = '';
      topo.metrics.forEach(m => {
        const pill = document.createElement('div');
        pill.className = 'metric-pill mono';
        pill.innerHTML = `
          <span class="metric-pill-key">${m.key}:</span>
          <span class="metric-pill-val">${m.val}</span>
        `;
        metricsRowEl.appendChild(pill);
      });
    }
  }

  topoSwitchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const topoKey = btn.getAttribute('data-topo');
      renderTopology(topoKey);
    });
  });

  // Initial render of topology
  renderTopology('drugs-engine');

  // =========================================================================
  // 2. Case Studies & Projects Showcase
  // =========================================================================
  const projectsGrid = document.getElementById('projects-grid');
  const filterBtns = document.querySelectorAll('.btn-filter');
  const projectCountBadge = document.getElementById('project-count-badge');

  function renderProjects(filter = 'all') {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = '';

    const filtered = filter === 'all'
      ? projects
      : projects.filter(p => p.category.includes(filter.toLowerCase()));

    if (projectCountBadge) {
      projectCountBadge.textContent = `${filtered.length} из ${projects.length} систем`;
    }

    filtered.forEach(project => {
      const card = document.createElement('article');
      card.className = `project-docket ${project.featured ? 'featured' : ''}`;
      card.setAttribute('data-id', project.id);

      const stackHtml = project.stack.map(s => `<span class="stack-pill mono">${s}</span>`).join('');

      let archActionHtml = '';
      if (project.topologyId) {
        archActionHtml = `
          <button class="btn-inspect-arch mono" data-target-topo="${project.topologyId}">
            <i data-lucide="layers" style="width: 14px; height: 14px;"></i>
            <span>Архитектура</span>
          </button>
        `;
      }

      card.innerHTML = `
        <div>
          <div class="docket-meta-row">
            <span class="docket-tag mono">${project.subtitle}</span>
            <div style="display:flex; align-items:center; gap:0.4rem; color:var(--sys-amber); font-size:0.75rem;">
              <i data-lucide="git-branch" style="width:13px; height:13px;"></i>
              <span class="mono">production-ready</span>
            </div>
          </div>

          <h3 class="docket-title">${project.title}</h3>

          <div class="docket-case-block">
            <div class="case-part"><strong>Вызов:</strong> ${project.problem}</div>
            <div class="case-part"><strong>Решение:</strong> ${project.solution}</div>
            <div class="case-part"><strong>Результат:</strong> ${project.impact}</div>
          </div>

          <div class="docket-stack-row">${stackHtml}</div>
        </div>

        <div class="docket-actions-row">
          <div>${archActionHtml}</div>
          <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-code-link mono">
            <i data-lucide="github" style="width: 14px; height: 14px;"></i>
            <span>Исходный код</span>
          </a>
        </div>
      `;

      projectsGrid.appendChild(card);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  renderProjects('all');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter') || 'all';
      renderProjects(filter);
    });
  });

  // Jump from project card to topology inspector
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-target-topo]');
    if (btn) {
      const topoKey = btn.getAttribute('data-target-topo');
      renderTopology(topoKey);
      const targetSection = document.getElementById('topology');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  // =========================================================================
  // 3. Technical Competencies Matrix
  // =========================================================================
  const compGrid = document.getElementById('competencies-grid');
  if (compGrid) {
    compGrid.innerHTML = '';
    skills.forEach(cat => {
      const card = document.createElement('div');
      card.className = 'comp-card';

      const itemsHtml = cat.skills.map(s => `
        <div class="comp-item">
          <div class="comp-meta">
            <span>${s.name}</span>
            <span class="mono text-amber" style="font-size: 0.8rem;">${s.level}%</span>
          </div>
          <div class="comp-detail mono">${s.detail}</div>
          <div class="comp-bar">
            <div class="comp-bar-fill" style="width: ${s.level}%;"></div>
          </div>
        </div>
      `).join('');

      card.innerHTML = `
        <div class="comp-header">
          <div class="comp-icon-box">
            <i data-lucide="${cat.icon}" style="width: 18px; height: 18px;"></i>
          </div>
          <h3 class="comp-title">${cat.category}</h3>
        </div>
        <div class="comp-items-list">${itemsHtml}</div>
      `;

      compGrid.appendChild(card);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // =========================================================================
  // 4. Chronicle & Education Timeline
  // =========================================================================
  const timelineNodes = document.getElementById('timeline-nodes');
  if (timelineNodes) {
    timelineNodes.innerHTML = '';
    timeline.forEach(item => {
      const node = document.createElement('div');
      node.className = 'timeline-node-card';
      node.innerHTML = `
        <div class="timeline-bullet"></div>
        <div class="timeline-content-panel">
          <div class="timeline-top-row">
            <span class="timeline-period mono">${item.period}</span>
            <span class="timeline-badge mono">${item.badge}</span>
          </div>
          <h3 class="timeline-heading">${item.title}</h3>
          <div class="timeline-subheading mono">${item.subtitle}</div>
          <p class="timeline-body">${item.description}</p>
        </div>
      `;
      timelineNodes.appendChild(node);
    });
  }

  // =========================================================================
  // 5. Work Culture & Engineering Values
  // =========================================================================
  const valuesContainer = document.getElementById('team-values-container');
  if (valuesContainer) {
    valuesContainer.innerHTML = '';
    values.forEach(v => {
      const panel = document.createElement('div');
      panel.className = 'value-item-panel';
      panel.innerHTML = `
        <div class="value-icon">
          <i data-lucide="${v.icon}" style="width: 20px; height: 20px;"></i>
        </div>
        <h3 class="value-heading">${v.title}</h3>
        <p class="value-body">${v.desc}</p>
      `;
      valuesContainer.appendChild(panel);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // =========================================================================
  // 6. Embedded Engineering CLI Console
  // =========================================================================
  const termOutput = document.getElementById('terminal-output');
  const termInput = document.getElementById('terminal-input');
  const chips = document.querySelectorAll('.console-quick-chips .chip');

  function appendOutput(text, type = 'out') {
    if (!termOutput) return;
    const row = document.createElement('div');
    row.className = `term-row ${type} mono`;
    row.innerHTML = text;
    termOutput.appendChild(row);
    termOutput.scrollTop = termOutput.scrollHeight;
  }

  function handleCommand(cmd) {
    const raw = cmd.trim();
    if (!raw) return;

    appendOutput(`asm-o-dan &gt; ${raw}`, 'cmd');

    const clean = raw.toLowerCase();

    switch (clean) {
      case 'help':
        appendOutput(`Доступные команды:<br>
• <span class="term-hl">whoami</span> — Справка о разработчике и позиции<br>
• <span class="term-hl">stack</span> — Ключевые компетенции (.NET 8, Python, C, Qdrant)<br>
• <span class="term-hl">projects</span> — Список систем в репозитории<br>
• <span class="term-hl">arch</span> — Переключиться на топологию DrugsEngine<br>
• <span class="term-hl">cv</span> — Скачать официальное резюме в PDF<br>
• <span class="term-hl">contact</span> — Контакты (Telegram, Email, GitHub)<br>
• <span class="term-hl">clear</span> — Очистить консоль`);
        break;

      case 'whoami':
        appendOutput(`👤 <strong>Даниил Гандапас (@Asm-o-Dan)</strong><br>
Роль: Systems & Backend Software Engineer<br>
Вуз: Тираспольский институт физики и техники (Software Engineering)<br>
Статус: Открыт к предложениям (Full-time / Remote)<br>
Специализация: Clean Architecture, CQRS, Qdrant Vector DB, Pure ANSI C`);
        break;

      case 'stack':
        appendOutput(`🛠️ <strong>Технологический арсенал</strong>:<br>
• Языки: C# (.NET 8/9), Python, Pure ANSI C, SQL<br>
• Архитектура: Clean Architecture, CQRS, DDD, Event-Driven, Microservices<br>
• БД и Векторы: PostgreSQL, Qdrant Vector DB, Dapper, EF Core<br>
• Инструменты: ASP.NET Core, Tesseract OCR, Telegram.Bot, Docker, Git`);
        break;

      case 'projects':
        appendOutput(`📦 <strong>Инженерные системы</strong>:<br>
1. <strong>DrugsEngine & PythonService</strong> — C# Clean Architecture, CQRS, Qdrant Vector DB<br>
2. <strong>Tanks1984</strong> — Deterministic game engine in pure C with manual memory<br>
3. <strong>Telegram Bot Suite</strong> — Async OCR pipeline (Tesseract) & state machines<br>
4. <strong>FirstApi & EduProject</strong> — High-performance CQRS REST API (Dapper + EF Core)<br>
5. <strong>Automation Engines</strong> — Distributed data sync & scrapers`);
        break;

      case 'arch':
        renderTopology('drugs-engine');
        document.getElementById('topology')?.scrollIntoView({ behavior: 'smooth' });
        appendOutput(`Переход к интерактивному инспектору архитектуры DrugsEngine.`);
        break;

      case 'cv':
        const link = document.createElement('a');
        link.href = 'resume.pdf';
        link.download = 'Daniil_Gandapas_Resume.pdf';
        link.click();
        appendOutput(`Загрузка файла resume.pdf инициирована.`);
        break;

      case 'contact':
        appendOutput(`📫 <strong>Прямая связь</strong>:<br>
• Telegram: <a href="https://t.me/SomeSimpleTag" target="_blank" class="term-hl">@SomeSimpleTag</a><br>
• Email: <a href="mailto:dgandapas1@gmail.com" class="term-hl">dgandapas1@gmail.com</a><br>
• GitHub: <a href="https://github.com/Asm-o-Dan" target="_blank" class="term-hl">github.com/Asm-o-Dan</a>`);
        break;

      case 'clear':
        if (termOutput) termOutput.innerHTML = '';
        break;

      default:
        appendOutput(`Неизвестная команда: <code>${raw}</code>. Введите <span class="term-hl">help</span> для списка доступных инструкций.`, 'sys');
    }
  }

  if (termInput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = termInput.value;
        termInput.value = '';
        handleCommand(val);
      }
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) handleCommand(cmd);
    });
  });

  // =========================================================================
  // 7. Theme Management (Light / Dark)
  // =========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sys_theme', theme);
    if (!sunIcon || !moonIcon) return;
    if (theme === 'light') {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
  }

  const savedTheme = localStorage.getItem('sys_theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  // =========================================================================
  // 8. Off-Canvas Mobile Drawer & Backdrop
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileBackdrop = document.getElementById('mobile-drawer-backdrop');
  const mobileDrawerClose = document.getElementById('mobile-drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (mobileBackdrop) mobileBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (mobileBackdrop) mobileBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openDrawer);
  }

  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', closeDrawer);
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeDrawer);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('open')) {
      closeDrawer();
    }
  });

  // =========================================================================
  // 9. Toast System & Clipboard Copy
  // =========================================================================
  const toastHub = document.getElementById('toast-hub');

  function showToast(message, iconName = 'check') {
    if (!toastHub) return;
    const toast = document.createElement('div');
    toast.className = 'toast-msg mono';
    toast.innerHTML = `
      <i data-lucide="${iconName}" style="width: 16px; height: 16px; color: var(--sys-amber);"></i>
      <span>${message}</span>
    `;
    toastHub.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 3500);
  }

  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Скопировано в буфер: ${text}`);
        });
      }
    });
  });

  // Contact Form Submission Simulation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      showToast(`Спасибо, ${name}! Сообщение принято. Скоро свяжусь с вами.`);
      contactForm.reset();
    });
  }

  // =========================================================================
  // 10. Scrollspy Navigation Indicator
  // =========================================================================
  const navLinks = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 130;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
});
