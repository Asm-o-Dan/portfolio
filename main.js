/**
 * Daniil Gandapas (Asm-o-Dan) — Portfolio & Engineering Systems Workbench
 * Main Application Logic & Interactive Systems Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.ASM_PORTFOLIO || {};
  const hrData = data.hrQuickFacts || {};
  const projectsData = data.projectsData || [];
  const skillsData = data.skillsData || [];
  const timelineData = data.timelineData || [];
  const teamValues = data.teamValues || [];
  const virtualFS = data.virtualFS || { "/": [], "/projects": [], files: {} };

  // Active state
  let currentView = 'overview';
  let activeProjectId = projectsData[0] ? projectsData[0].id : 'drugs-engine';
  let activeLayerIndex = 0;
  let activeCategoryFilter = 'all';

  // Terminal state
  let terminalHistory = [];
  let historyIndex = -1;
  let tanksGameActive = false;
  let tankPlayer = { x: 4, y: 5 };
  let tankEnemy = { x: 4, y: 1, alive: true };

  // =========================================================================
  // 1. Icon Initializer
  // =========================================================================
  function refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
  refreshIcons();

  // =========================================================================
  // 2. Perspective Router / View Switcher
  // =========================================================================
  const navSegmentBtns = document.querySelectorAll('.nav-segment-btn');
  const viewPanels = document.querySelectorAll('.view-panel');

  function switchView(targetView, selectProjectId = null) {
    if (!['overview', 'lab', 'dossier'].includes(targetView)) {
      targetView = 'overview';
    }
    currentView = targetView;

    // Update nav segmented buttons
    navSegmentBtns.forEach(btn => {
      if (btn.getAttribute('data-view') === targetView) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update view panels
    viewPanels.forEach(panel => {
      if (panel.id === `view-${targetView}`) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    // If switching to lab with a specific project selected
    if (targetView === 'lab') {
      if (selectProjectId) {
        activeProjectId = selectProjectId;
      }
      activeLayerIndex = 0;
      renderLabSidebar();
      renderLabInspector();
    }

    // Update URL hash without jumping
    if (history.pushState) {
      history.pushState(null, null, `#${targetView}`);
    } else {
      location.hash = `#${targetView}`;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    refreshIcons();
  }

  // Bind segmented nav buttons
  navSegmentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view');
      switchView(view);
    });
  });

  // Bind all triggers with .switch-view-trigger
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.switch-view-trigger');
    if (trigger) {
      e.preventDefault();
      const target = trigger.getAttribute('data-target');
      const selectProject = trigger.getAttribute('data-select-project');
      switchView(target, selectProject);
    }
  });

  // Check initial hash on page load
  const initialHash = window.location.hash.replace('#', '');
  if (['overview', 'lab', 'dossier'].includes(initialHash)) {
    switchView(initialHash);
  }

  // =========================================================================
  // 3. Overview (Bento) Renderer
  // =========================================================================
  function renderOverviewValues() {
    const valuesContainer = document.getElementById('overview-values-row');
    if (!valuesContainer) return;
    valuesContainer.innerHTML = '';

    teamValues.forEach(val => {
      const item = document.createElement('div');
      item.className = 'value-pill-box';
      item.innerHTML = `
        <div class="val-box-header">
          <i data-lucide="${val.icon}" class="text-cyan" style="width: 18px; height: 18px;"></i>
          <h3 class="val-box-title">${val.title}</h3>
        </div>
        <p class="val-box-desc">${val.desc}</p>
      `;
      valuesContainer.appendChild(item);
    });
  }
  renderOverviewValues();

  // =========================================================================
  // 4. Systems Lab (Split-View Explorer) Controller
  // =========================================================================
  const labNavList = document.getElementById('lab-project-nav-list');
  const labInspector = document.getElementById('lab-inspector-content');
  const labFilters = document.querySelectorAll('.lab-filter-pill');

  function renderLabSidebar() {
    if (!labNavList) return;
    labNavList.innerHTML = '';

    const filteredProjects = activeCategoryFilter === 'all'
      ? projectsData
      : projectsData.filter(p => p.category.includes(activeCategoryFilter.toLowerCase()));

    // If active project is not in filtered list, set to first filtered
    if (!filteredProjects.some(p => p.id === activeProjectId) && filteredProjects.length > 0) {
      activeProjectId = filteredProjects[0].id;
    }

    filteredProjects.forEach(proj => {
      const el = document.createElement('div');
      el.className = `lab-nav-item ${proj.id === activeProjectId ? 'active' : ''}`;
      el.setAttribute('data-id', proj.id);

      el.innerHTML = `
        <div class="nav-item-top">
          <span class="nav-item-title">${proj.shortTitle || proj.title}</span>
          <span class="card-tag" style="margin: 0; padding: 0.1rem 0.4rem; font-size: 0.65rem;">${proj.architecture.pattern.split('+')[0].trim()}</span>
        </div>
        <div class="nav-item-pattern">${proj.tags.slice(0, 3).join(' • ')}</div>
      `;

      el.addEventListener('click', () => {
        activeProjectId = proj.id;
        activeLayerIndex = 0;
        renderLabSidebar();
        renderLabInspector();
      });

      labNavList.appendChild(el);
    });
  }

  // Filter pills click
  labFilters.forEach(pill => {
    pill.addEventListener('click', () => {
      labFilters.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategoryFilter = pill.getAttribute('data-filter');
      renderLabSidebar();
      renderLabInspector();
    });
  });

  function renderLabInspector() {
    if (!labInspector) return;
    const proj = projectsData.find(p => p.id === activeProjectId) || projectsData[0];
    if (!proj) return;

    const layers = proj.architecture.diagram || [];
    const activeLayer = layers[activeLayerIndex] || layers[0];

    // Build metrics HTML
    const metricsHtml = (proj.metrics || []).map(m => `
      <div class="metric-col">
        <span class="metric-label">${m.label}</span>
        <span class="metric-val text-cyan">${m.val}</span>
      </div>
    `).join('');

    // Build interactive layers nodes HTML
    const layersNodesHtml = layers.map((layer, idx) => `
      <div class="arch-layer-card ${idx === activeLayerIndex ? 'active' : ''}" data-layer-idx="${idx}">
        <div class="layer-name">${layer.name}</div>
        <div class="layer-tech">${layer.tech}</div>
      </div>
    `).join('');

    // Build architecture details HTML
    const detailsHtml = (proj.architecture.details || []).map(d => `
      <div class="detail-item">
        <div class="detail-title">${d.title}</div>
        <div class="detail-desc">${d.content}</div>
      </div>
    `).join('');

    // Build extra links HTML
    let extraLinksHtml = '';
    if (proj.pythonServiceUrl) {
      extraLinksHtml += `
        <a href="${proj.pythonServiceUrl}" target="_blank" rel="noopener noreferrer" class="inspector-link-btn" title="Python Service Repo">
          <i data-lucide="git-branch" style="width: 14px; height: 14px;"></i>
          <span>Python Service</span>
        </a>
      `;
    }
    if (proj.extraRepoUrl) {
      extraLinksHtml += `
        <a href="${proj.extraRepoUrl}" target="_blank" rel="noopener noreferrer" class="inspector-link-btn" title="Secondary Repo">
          <i data-lucide="git-branch" style="width: 14px; height: 14px;"></i>
          <span>Bot Repo</span>
        </a>
      `;
    }

    labInspector.innerHTML = `
      <div class="inspector-hero">
        <div class="inspector-header-row">
          <div>
            <div class="card-tag">${proj.architecture.pattern}</div>
            <h1 class="inspector-title">${proj.title}</h1>
            <div class="inspector-subtitle">${proj.subtitle}</div>
          </div>
          <div class="inspector-links-row">
            <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="inspector-link-btn" title="Source Code on GitHub">
              <i data-lucide="github" style="width: 14px; height: 14px;"></i>
              <span>GitHub</span>
            </a>
            ${extraLinksHtml}
          </div>
        </div>

        <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5; margin-top: 0.5rem;">
          ${proj.description}
        </p>

        <div class="inspector-metrics-bar">
          ${metricsHtml}
        </div>
      </div>

      <!-- Interactive Blueprint Canvas -->
      <div style="margin-bottom: 1.75rem;">
        <div class="blueprint-section-title">
          <span>Интерактивная архитектурная схема</span>
          <span class="blueprint-hint">Кликните на слой для инспекции ➜</span>
        </div>

        <div class="architecture-diagram-nodes" id="arch-nodes-container">
          ${layersNodesHtml}
        </div>

        <!-- Dynamic Layer Deep-Dive Info Box -->
        <div class="layer-deepdive-box" id="layer-deepdive-box">
          <div class="layer-deepdive-title">Слой: ${activeLayer.name} [${activeLayer.tech}]</div>
          <div class="layer-deepdive-desc">${activeLayer.role}</div>
        </div>
      </div>

      <!-- Case Study Section -->
      <div class="case-study-box">
        <div class="card-tag" style="margin-bottom: 0.25rem;">Case Study</div>
        <div class="case-grid">
          <div class="case-col">
            <div class="case-col-title problem">Проблема</div>
            <div class="case-col-text">${proj.caseStudy.problem}</div>
          </div>
          <div class="case-col">
            <div class="case-col-title solution">Решение</div>
            <div class="case-col-text">${proj.caseStudy.solution}</div>
          </div>
          <div class="case-col">
            <div class="case-col-title impact">Результат</div>
            <div class="case-col-text">${proj.caseStudy.impact}</div>
          </div>
        </div>
      </div>

      <!-- Key Engineering Highlights -->
      <div>
        <h3 class="blueprint-section-title" style="margin-bottom: 0.75rem;">Инженерные решения & Детали реализации</h3>
        <div class="arch-details-list">
          ${detailsHtml}
        </div>
      </div>
    `;

    // Bind layer click events
    const layerCards = labInspector.querySelectorAll('.arch-layer-card');
    layerCards.forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-layer-idx'), 10);
        activeLayerIndex = idx;
        renderLabInspector();
      });
    });

    refreshIcons();
  }

  // Initial render of Lab
  renderLabSidebar();
  renderLabInspector();

  // =========================================================================
  // 5. Dossier & CV View Renderer
  // =========================================================================
  function renderDossierContent() {
    const timelineContainer = document.getElementById('cv-timeline-container');
    const skillsContainer = document.getElementById('cv-skills-container');

    if (timelineContainer) {
      timelineContainer.innerHTML = '';
      timelineData.forEach(item => {
        const el = document.createElement('div');
        el.className = 'cv-timeline-item';
        el.innerHTML = `
          <div class="cv-tl-header">
            <span class="cv-tl-title">${item.title}</span>
            <span class="cv-tl-year">${item.year}</span>
          </div>
          <div class="cv-tl-subtitle">${item.subtitle} • <span class="text-cyan">${item.badge}</span></div>
          <p class="cv-tl-desc">${item.description}</p>
        `;
        timelineContainer.appendChild(el);
      });
    }

    if (skillsContainer) {
      skillsContainer.innerHTML = '';
      skillsData.forEach(cat => {
        const el = document.createElement('div');
        el.className = 'cv-skill-cat';
        const tags = cat.skills.map(s => `<span class="cv-skill-tag">${s.name}</span>`).join('');
        el.innerHTML = `
          <div class="cv-cat-title">${cat.category}</div>
          <div class="cv-cat-pills">${tags}</div>
        `;
        skillsContainer.appendChild(el);
      });
    }

    const printBtn = document.getElementById('dossier-print-btn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }
  renderDossierContent();

  // =========================================================================
  // 6. Quake CLI Dropdown Terminal Engine
  // =========================================================================
  const quakeDrawer = document.getElementById('quake-terminal');
  const toggleTerminalBtn = document.getElementById('toggle-terminal-btn');
  const closeTerminalDot = document.getElementById('close-terminal-dot');
  const footerCliBtn = document.getElementById('footer-cli-btn');
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');
  const termChips = document.querySelectorAll('.term-chip');

  function openTerminal() {
    if (quakeDrawer) {
      quakeDrawer.classList.add('open');
      quakeDrawer.setAttribute('aria-hidden', 'false');
      if (terminalInput) {
        setTimeout(() => terminalInput.focus(), 150);
      }
    }
  }

  function closeTerminal() {
    if (quakeDrawer) {
      quakeDrawer.classList.remove('open');
      quakeDrawer.setAttribute('aria-hidden', 'true');
    }
  }

  function toggleTerminal() {
    if (quakeDrawer && quakeDrawer.classList.contains('open')) {
      closeTerminal();
    } else {
      openTerminal();
    }
  }

  if (toggleTerminalBtn) toggleTerminalBtn.addEventListener('click', toggleTerminal);
  if (closeTerminalDot) closeTerminalDot.addEventListener('click', closeTerminal);
  if (footerCliBtn) footerCliBtn.addEventListener('click', toggleTerminal);

  // Global Keyboard shortcut: ` (backtick/tilde) and ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === '`' || e.key === '~') {
      // Don't toggle if user is typing in a form input outside terminal
      if (document.activeElement && document.activeElement.tagName === 'INPUT' && document.activeElement.id !== 'terminal-input') {
        return;
      }
      if (document.activeElement && document.activeElement.tagName === 'TEXTAREA') {
        return;
      }
      e.preventDefault();
      toggleTerminal();
    } else if (e.key === 'Escape') {
      if (quakeDrawer && quakeDrawer.classList.contains('open')) {
        closeTerminal();
      }
      const contactModal = document.getElementById('contact-modal');
      if (contactModal && contactModal.classList.contains('open')) {
        contactModal.classList.remove('open');
      }
    }
  });

  function appendTermLine(text, type = 'output') {
    if (!terminalBody) return;
    const line = document.createElement('div');
    line.className = `term-line ${type}`;
    line.textContent = text;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // Tanks ASCII Mini-Game Logic
  function renderTanksGame() {
    const width = 10;
    const height = 7;
    let screen = "\n=== TANKS1984 TERMINAL EMULATOR ===\n";
    screen += "Controls: 'w' (up), 's' (down), 'a' (left), 'd' (right), 'f' (fire), 'q' (quit)\n";
    screen += "┌" + "─".repeat(width * 2) + "┐\n";

    for (let y = 0; y < height; y++) {
      let row = "│";
      for (let x = 0; x < width; x++) {
        if (tankEnemy.alive && tankEnemy.x === x && tankEnemy.y === y) {
          row += "▼ ";
        } else if (tankPlayer.x === x && tankPlayer.y === y) {
          row += "▲ ";
        } else if ((x === 2 && y === 3) || (x === 7 && y === 3)) {
          row += "▓▓";
        } else {
          row += " .";
        }
      }
      row += "│\n";
      screen += row;
    }
    screen += "└" + "─".repeat(width * 2) + "┘\n";
    if (!tankEnemy.alive) {
      screen += "🎯 ENEMY TANK DESTROYED! YOU WIN! Type 'tanks' to restart.\n";
    }
    appendTermLine(screen, 'command');
  }

  function handleCommand(rawCmd) {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    terminalHistory.push(cmd);
    historyIndex = terminalHistory.length;

    appendTermLine(`asm-o-dan > ${cmd}`, 'command');

    const parts = cmd.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const arg = parts[1] ? parts.slice(1).join(' ').trim() : '';

    // If Tanks mini game is active
    if (tanksGameActive) {
      if (['w', 'a', 's', 'd', 'up', 'down', 'left', 'right'].includes(mainCmd)) {
        if (mainCmd === 'w' && tankPlayer.y > 0) tankPlayer.y--;
        if (mainCmd === 's' && tankPlayer.y < 6) tankPlayer.y++;
        if (mainCmd === 'a' && tankPlayer.x > 0) tankPlayer.x--;
        if (mainCmd === 'd' && tankPlayer.x < 9) tankPlayer.x++;
        renderTanksGame();
        return;
      } else if (mainCmd === 'f' || mainCmd === 'fire') {
        if (tankEnemy.alive && tankPlayer.x === tankEnemy.x) {
          tankEnemy.alive = false;
          appendTermLine("💥 BOOM! Direct hit! Shell eliminated enemy tank!", "output");
        } else {
          appendTermLine("💨 Missed! Shell hit the perimeter wall.", "output");
        }
        renderTanksGame();
        return;
      } else if (mainCmd === 'q' || mainCmd === 'quit') {
        tanksGameActive = false;
        appendTermLine("Exited Tanks1984 game engine.", "system");
        return;
      }
    }

    switch (mainCmd) {
      case 'help':
        appendTermLine(
          "Available Commands:\n" +
          "  whoami          — About Daniil Gandapas\n" +
          "  ls [dir]        — List files in virtual filesystem (/, /projects)\n" +
          "  cat <file>      — View file content (e.g. cat bio.md, cat stack.json)\n" +
          "  projects        — List engineering projects and patterns\n" +
          "  skills          — View tech stack breakdown\n" +
          "  architecture    — Explain Clean Architecture & CQRS principles\n" +
          "  tanks           — Launch retro ASCII Tanks1984 mini-game\n" +
          "  contact         — Show direct contact links\n" +
          "  cv / resume     — Switch to Dossier & CV view\n" +
          "  theme [toggle]  — Switch between Dark and Light mode\n" +
          "  clear           — Clear terminal display",
          'output'
        );
        break;

      case 'whoami':
        appendTermLine(
          `Name: Даниил Гандапас (@Asm-o-Dan)\n` +
          `Role: Backend & Systems Software Engineer\n` +
          `Stack: C# (.NET 8), Python, Clean Architecture, CQRS, Qdrant Vector DB, Pure C\n` +
          `Education: ТИФТ (Software Engineering)\n` +
          `Status: Open for Remote / Full-time roles`,
          'output'
        );
        break;

      case 'ls':
        if (arg === 'projects' || arg === '/projects' || arg === 'projects/') {
          appendTermLine(virtualFS["/projects"].join("   "), 'accent');
        } else {
          appendTermLine(virtualFS["/"].join("   "), 'accent');
        }
        break;

      case 'cat':
        if (!arg) {
          appendTermLine("Usage: cat <filename> (e.g., cat bio.md, cat stack.json)", 'error');
        } else {
          const cleanArg = arg.replace(/^\//, '');
          if (virtualFS.files[cleanArg]) {
            appendTermLine(virtualFS.files[cleanArg], 'output');
          } else {
            appendTermLine(`cat: ${arg}: No such file or directory. Try 'ls' to see available files.`, 'error');
          }
        }
        break;

      case 'projects':
        let projText = "Engineering Systems & Projects:\n";
        projectsData.forEach((p, idx) => {
          projText += ` [${idx + 1}] ${p.title} (${p.tags.slice(0, 3).join(', ')})\n     Pattern: ${p.architecture.pattern}\n     GitHub: ${p.githubUrl}\n`;
        });
        appendTermLine(projText, 'output');
        break;

      case 'skills':
        let skillsText = "Core Competencies:\n";
        skillsData.forEach(cat => {
          skillsText += ` • ${cat.category}: ${cat.skills.map(s => s.name).join(', ')}\n`;
        });
        appendTermLine(skillsText, 'output');
        break;

      case 'architecture':
        appendTermLine(
          "Clean Architecture & Systems Discipline:\n" +
          " 1. Domain Layer: Pure business logic, aggregates, and value objects (0 dependencies).\n" +
          " 2. Application Layer: CQRS commands, queries, MediatR handlers, and pipeline behaviors.\n" +
          " 3. Infrastructure: Database mapping (EF Core / Dapper), network RPC clients.\n" +
          " 4. Vector AI: Qdrant Vector DB with cosine similarity search on embeddings.",
          'output'
        );
        break;

      case 'tanks':
        tanksGameActive = true;
        tankPlayer = { x: 4, y: 5 };
        tankEnemy = { x: 4, y: 1, alive: true };
        renderTanksGame();
        break;

      case 'contact':
        appendTermLine(
          "Direct Contact Channels:\n" +
          " • Telegram: https://t.me/SomeSimpleTag (@SomeSimpleTag)\n" +
          " • Email: dgandapas1@gmail.com\n" +
          " • GitHub: https://github.com/Asm-o-Dan",
          'output'
        );
        break;

      case 'cv':
      case 'resume':
        switchView('dossier');
        closeTerminal();
        break;

      case 'theme':
        toggleTheme();
        appendTermLine(`Theme updated to: ${document.documentElement.getAttribute('data-theme')}`, 'system');
        break;

      case 'clear':
        if (terminalBody) {
          terminalBody.innerHTML = '';
        }
        break;

      default:
        appendTermLine(`Command not found: '${cmd}'. Type 'help' for valid commands.`, 'error');
        break;
    }
  }

  // Terminal input enter & history listener
  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        terminalInput.value = '';
        handleCommand(val);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          terminalInput.value = terminalHistory[historyIndex] || '';
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < terminalHistory.length - 1) {
          historyIndex++;
          terminalInput.value = terminalHistory[historyIndex] || '';
        } else {
          historyIndex = terminalHistory.length;
          terminalInput.value = '';
        }
      }
    });
  }

  // Quick action chips click
  termChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        handleCommand(cmd);
      }
    });
  });

  // =========================================================================
  // 7. Theme Switcher Controller
  // =========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeSunIcon = document.getElementById('theme-icon-sun');
  const themeMoonIcon = document.getElementById('theme-icon-moon');

  function updateThemeIcons(theme) {
    if (themeSunIcon && themeMoonIcon) {
      if (theme === 'light') {
        themeSunIcon.style.display = 'none';
        themeMoonIcon.style.display = 'block';
      } else {
        themeSunIcon.style.display = 'block';
        themeMoonIcon.style.display = 'none';
      }
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('asm_theme', next);
    } catch (e) {}
    updateThemeIcons(next);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Init saved theme
  try {
    const savedTheme = localStorage.getItem('asm_theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateThemeIcons(savedTheme);
    }
  } catch (e) {}

  // =========================================================================
  // 8. Contact Modal & Toast Notifications
  // =========================================================================
  const contactModal = document.getElementById('contact-modal');
  const openContactModalBtn = document.getElementById('open-contact-modal-btn');
  const contactModalClose = document.getElementById('contact-modal-close');
  const toastHub = document.getElementById('toast-hub');

  function showToast(message) {
    if (!toastHub) return;
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `<i data-lucide="check" style="width: 14px; height: 14px;" class="text-emerald"></i> <span>${message}</span>`;
    toastHub.appendChild(toast);
    refreshIcons();
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2400);
  }

  if (openContactModalBtn && contactModal) {
    openContactModalBtn.addEventListener('click', () => {
      contactModal.classList.add('open');
      contactModal.setAttribute('aria-hidden', 'false');
    });
  }

  if (contactModalClose && contactModal) {
    contactModalClose.addEventListener('click', () => {
      contactModal.classList.remove('open');
      contactModal.setAttribute('aria-hidden', 'true');
    });
  }

  // Copy to clipboard
  document.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('[data-copy]');
    if (copyBtn) {
      const textToCopy = copyBtn.getAttribute('data-copy');
      if (navigator.clipboard && textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Скопировано: ${textToCopy}`);
        }).catch(() => {
          showToast(`Скопировано: ${textToCopy}`);
        });
      }
    }
  });

});
