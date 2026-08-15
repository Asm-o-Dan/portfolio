/**
 * Main Interactive Application Script
 */
document.addEventListener('DOMContentLoaded', () => {
  const data = window.ASM_PORTFOLIO || {};
  const projectsData = data.projectsData || [];
  const skillsData = data.skillsData || [];
  const timelineData = data.timelineData || [];
  const teamValues = data.teamValues || [];

  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Mobile Drawer Navigation
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 3. Render Timeline
  const timelineContainer = document.getElementById('timeline-items-container');
  if (timelineContainer) {
    timelineContainer.innerHTML = '';
    timelineData.forEach(item => {
      const el = document.createElement('div');
      el.className = 'timeline-card';
      el.innerHTML = `
        <div class="timeline-node"></div>
        <div class="timeline-content">
          <div class="timeline-header-row">
            <span class="timeline-period">${item.period}</span>
            <span class="timeline-badge">${item.badge}</span>
          </div>
          <h3 class="timeline-title">${item.title}</h3>
          <div class="timeline-subtitle">${item.subtitle}</div>
          <p class="timeline-desc">${item.description}</p>
        </div>
      `;
      timelineContainer.appendChild(el);
    });
  }

  // 4. Render Team Values
  const valuesGrid = document.getElementById('team-values-grid');
  if (valuesGrid) {
    valuesGrid.innerHTML = '';
    teamValues.forEach(val => {
      const card = document.createElement('div');
      card.className = 'value-card';
      card.innerHTML = `
        <div class="value-icon-box">
          <i data-lucide="${val.icon}" style="width: 24px; height: 24px;"></i>
        </div>
        <h3 class="value-title">${val.title}</h3>
        <p class="value-desc">${val.desc}</p>
      `;
      valuesGrid.appendChild(card);
    });
  }

  // 5. Render Projects with Case Studies
  const projectsGrid = document.getElementById('projects-cards-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCountBadge = document.getElementById('project-count-badge');

  function renderProjects(filter = 'all') {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = '';

    const filtered = filter === 'all' 
      ? projectsData 
      : projectsData.filter(p => p.category.includes(filter.toLowerCase()));

    if (projectCountBadge) {
      projectCountBadge.textContent = `Показано ${filtered.length} из ${projectsData.length} проектов`;
    }

    filtered.forEach(project => {
      const card = document.createElement('article');
      card.className = `project-card ${project.featured ? 'featured' : ''}`;
      card.setAttribute('data-id', project.id);

      const tagsHtml = project.tags.map(t => `<span class="project-tag-pill">${t}</span>`).join('');

      let caseStudyHtml = '';
      if (project.caseStudy) {
        caseStudyHtml = `
          <div class="project-case-summary">
            <div class="case-line"><strong>Проблема:</strong> ${project.caseStudy.problem}</div>
            <div class="case-line"><strong>Результат:</strong> ${project.caseStudy.impact}</div>
          </div>
        `;
      }

      card.innerHTML = `
        <div>
          <div class="project-header">
            <span class="project-category-badge">${project.architecture.pattern}</span>
            <h3 class="project-title">${project.title}</h3>
            <div class="project-subtitle">${project.subtitle}</div>
          </div>
          <p class="project-description">${project.description}</p>
          ${caseStudyHtml}
          <div class="project-tags">${tagsHtml}</div>
        </div>
        <div class="project-footer">
          <button class="project-btn-arch" data-arch-id="${project.id}">
            <i data-lucide="layers" style="width: 16px; height: 16px;"></i>
            <span>Архитектура</span>
          </button>
          <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-btn-code">
            <i data-lucide="github" style="width: 16px; height: 16px;"></i>
            <span>GitHub</span>
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

  // 6. Render Skills Matrix
  const skillsGrid = document.getElementById('skills-matrix-grid');
  if (skillsGrid) {
    skillsGrid.innerHTML = '';
    skillsData.forEach(cat => {
      const catCard = document.createElement('div');
      catCard.className = 'skill-category-card';

      const itemsHtml = cat.skills.map(s => `
        <div class="skill-item">
          <div class="skill-meta">
            <span>${s.name}</span>
            <span class="mono" style="color: var(--accent-cyan); font-size: 0.8rem;">${s.level}%</span>
          </div>
          <div class="skill-detail">${s.detail}</div>
          <div class="skill-progress-bar">
            <div class="skill-progress-fill" style="width: ${s.level}%;"></div>
          </div>
        </div>
      `).join('');

      catCard.innerHTML = `
        <div class="skill-category-header">
          <div class="skill-cat-icon">
            <i data-lucide="${cat.icon}" style="width: 20px; height: 20px;"></i>
          </div>
          <h3 class="skill-cat-title">${cat.category}</h3>
        </div>
        <div class="skill-items-list">${itemsHtml}</div>
      `;

      skillsGrid.appendChild(catCard);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // 7. Architecture Modal Handler
  const archModalOverlay = document.getElementById('arch-modal-overlay');
  const archModalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-project-title');
  const modalPattern = document.getElementById('modal-project-pattern');
  const modalLayersContainer = document.getElementById('modal-layers-container');
  const modalHighlightsContainer = document.getElementById('modal-highlights-container');

  function openArchModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project || !archModalOverlay) return;

    modalTitle.textContent = project.title;
    modalPattern.textContent = `Паттерн: ${project.architecture.pattern}`;

    modalLayersContainer.innerHTML = project.architecture.layers.map(l => `
      <div class="modal-layer-card">
        <div class="modal-layer-title">${l.name}</div>
        <div class="modal-layer-desc">${l.description}</div>
      </div>
    `).join('');

    modalHighlightsContainer.innerHTML = project.architecture.highlights.map(h => `
      <li>${h}</li>
    `).join('');

    archModalOverlay.classList.add('open');
    archModalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeArchModal() {
    if (!archModalOverlay) return;
    archModalOverlay.classList.remove('open');
    archModalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-arch-id]');
    if (target) {
      const archId = target.getAttribute('data-arch-id');
      openArchModal(archId);
    }
  });

  if (archModalCloseBtn) archModalCloseBtn.addEventListener('click', closeArchModal);
  if (archModalOverlay) {
    archModalOverlay.addEventListener('click', (e) => {
      if (e.target === archModalOverlay) closeArchModal();
    });
  }

  // 8. CV Preview Modal Handler
  const cvModalOverlay = document.getElementById('cv-modal-overlay');
  const openCvModalBtn = document.getElementById('open-cv-modal-btn');
  const heroCvBtn = document.getElementById('hero-cv-btn');
  const cvModalCloseBtn = document.getElementById('cv-modal-close-btn');
  const printCvBtn = document.getElementById('print-cv-btn');

  function openCvModal() {
    if (!cvModalOverlay) return;
    cvModalOverlay.classList.add('open');
    cvModalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCvModal() {
    if (!cvModalOverlay) return;
    cvModalOverlay.classList.remove('open');
    cvModalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  const previewCvModalBtn = document.getElementById('preview-cv-modal-btn');

  if (openCvModalBtn) openCvModalBtn.addEventListener('click', openCvModal);
  if (previewCvModalBtn) previewCvModalBtn.addEventListener('click', openCvModal);
  if (cvModalCloseBtn) cvModalCloseBtn.addEventListener('click', closeCvModal);
  if (cvModalOverlay) {
    cvModalOverlay.addEventListener('click', (e) => {
      if (e.target === cvModalOverlay) closeCvModal();
    });
  }

  if (printCvBtn) {
    printCvBtn.addEventListener('click', () => {
      window.print();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeArchModal();
      closeCvModal();
    }
  });

  // 9. Interactive CLI Terminal
  const termOutput = document.getElementById('terminal-output-container');
  const termInput = document.getElementById('terminal-cli-input');
  const quickCmdBtns = document.querySelectorAll('.quick-cmd-btn');

  function appendTermLine(text, className = 'output') {
    if (!termOutput) return;
    const line = document.createElement('div');
    line.className = `term-line ${className}`;
    line.innerHTML = text;
    termOutput.appendChild(line);
    termOutput.scrollTop = termOutput.scrollHeight;
  }

  function executeCommand(cmd) {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    appendTermLine(`asm-o-dan &gt; ${cmd}`, 'command');

    switch (cleanCmd) {
      case 'help':
        appendTermLine(`Доступные команды:<br>
• <span class="term-line accent">whoami</span> — Информация о разработчике и позиции<br>
• <span class="term-line accent">skills</span> — Ключевые компетенции и стек (.NET, Python, C, Qdrant)<br>
• <span class="term-line accent">projects</span> — Список ключевых проектов в репозитории<br>
• <span class="term-line accent">architecture</span> — Принципы Clean Architecture & CQRS<br>
• <span class="term-line accent">manifest</span> — Манифест и философия кода<br>
• <span class="term-line accent">contact</span> — Контакты для связи (Telegram, GitHub, Email)<br>
• <span class="term-line accent">cv</span> — Открыть интерактивное резюме<br>
• <span class="term-line accent">theme</span> — Переключить тему оформления (Dark/Light)<br>
• <span class="term-line accent">clear</span> — Очистить буфер терминала`);
        break;

      case 'whoami':
        appendTermLine(`👤 <strong>Даниил Гандапас (Asm-o-Dan)</strong><br>
🚀 <strong>Роль</strong>: Backend & Systems Software Engineer<br>
🎓 <strong>Вуз</strong>: Тираспольский институт физики и техники (Software Engineering)<br>
🎯 <strong>Фокус</strong>: Clean Architecture, CQRS, Vector Search (Qdrant), Telegram/OCR bots, High-load APIs`);
        break;

      case 'skills':
        appendTermLine(`🛠️ <strong>Технологический стек</strong>:<br>
• Языки: C# (.NET 8/9), Python, C (Low-level), SQL<br>
• Архитектура: Clean Architecture, CQRS, DDD, Event-Driven, Microservices<br>
• БД & AI: PostgreSQL, Qdrant Vector DB, SQLite, EF Core, Dapper<br>
• Инструменты: ASP.NET Core, Tesseract OCR, Telegram.Bot, Docker, Git`);
        break;

      case 'projects':
        appendTermLine(`📦 <strong>Ключевые проекты</strong>:<br>
1. <strong>DrugsEngine & PythonService</strong> — C# Clean Architecture, CQRS, Qdrant Vector Search<br>
2. <strong>Tanks1984</strong> — Retro game engine in pure C with deterministic physics<br>
3. <strong>TelegramBot Suite</strong> — Telegram bots with Tesseract OCR & async pipelines<br>
4. <strong>FirstApi & EduProject</strong> — ASP.NET Core REST API with CQRS Read/Write separation<br>
5. <strong>Automation Engines</strong> — DzenAuto & DiscordLiker data sync tools`);
        break;

      case 'architecture':
        appendTermLine(`🏛️ <strong>Архитектурный манифест</strong>:<br>
1. Домен изолирован от внешних библиотек и БД.<br>
2. CQRS разделяет команды мутации и оптимизированные выборки.<br>
3. Векторные БД (Qdrant) обеспечивают быстрый семантический поиск.<br>
4. Асинхронные очереди и воркеры гарантируют отказоустойчивость.`);
        break;

      case 'manifest':
      case 'cat manifest.txt':
        appendTermLine(`📜 <em>«Structure is freedom. Architecture is intention. I don’t just write code — I structure possibility.»</em>`, 'accent');
        break;

      case 'contact':
        appendTermLine(`📫 <strong>Контакты</strong>:<br>
• Telegram: <a href="https://t.me/SomeSimpleTag" target="_blank" style="color: var(--accent-cyan);">@SomeSimpleTag</a><br>
• GitHub: <a href="https://github.com/Asm-o-Dan" target="_blank" style="color: var(--accent-cyan);">github.com/Asm-o-Dan</a><br>
• Email: <a href="mailto:dgandapas1@gmail.com" style="color: var(--accent-cyan);">dgandapas1@gmail.com</a>`);
        break;

      case 'cv':
        openCvModal();
        appendTermLine(`📄 Окно резюме открыто. Вы также можете <a href="resume.pdf" download="Daniil_Gandapas_Resume.pdf" style="color: var(--accent-cyan); text-decoration: underline;">скачать resume.pdf напрямую</a>.`);
        break;

      case 'theme':
        toggleTheme();
        appendTermLine(`Тема успешно переключена.`);
        break;

      case 'clear':
        if (termOutput) termOutput.innerHTML = '';
        break;

      default:
        appendTermLine(`Команда не найдена: <code>${cleanCmd}</code>. Введите <span class="term-line accent">help</span> для списка доступных команд.`, 'system');
    }
  }

  if (termInput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = termInput.value;
        termInput.value = '';
        executeCommand(val);
      }
    });
  }

  quickCmdBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) executeCommand(cmd);
    });
  });

  // 10. Theme Switcher
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');

  function updateThemeIcons(theme) {
    if (!sunIcon || !moonIcon) return;
    if (theme === 'light') {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('asm_portfolio_theme', theme);
    updateThemeIcons(theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }

  const savedTheme = localStorage.getItem('asm_portfolio_theme') || 'dark';
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // 11. Toast Notifications
  const toastContainer = document.getElementById('toast-container');
  function showToast(message, icon = 'check-circle') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i data-lucide="${icon}" style="width: 18px; height: 18px; color: var(--accent-cyan);"></i>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // 12. Clipboard Copy Handlers
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Скопировано в буфер: ${text}`);
        });
      }
    });
  });

  // 13. Contact Form Simulation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      showToast(`Спасибо, ${name}! Сообщение отправлено. Скоро свяжусь с вами.`);
      contactForm.reset();
    });
  }

  // 14. Scroll-Spy Navigation
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
