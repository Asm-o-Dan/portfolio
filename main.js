/**
 * AsmODan — The Radial Ritual Circle & 3 Concentric Arcane Seals Engine
 * Radial Trigonometry, Orbital Rotation, Energy Beams, Web Audio FX, Mobile Touch & Altar CLI
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.ASM_PORTFOLIO || {};
  const charSheet = data.characterSheet || {};
  const hrData = data.hrQuickFacts || {};
  const ring1Chronicle = data.ring1Chronicle || [];
  const ring2Skills = data.ring2Skills || [];
  const ring3Projects = data.ring3Projects || [];
  const virtualFS = data.virtualFS || { "/": [], "/grimoire": [], files: {} };

  // Active state
  let currentView = 'radial';
  let activeNodeData = null;
  let soundEnabled = true;
  let isOrbitHovered = false;
  let activeMobileRing = '3';

  // Terminal & Game state
  let terminalHistory = [];
  let historyIndex = -1;

  // =========================================================================
  // 1. Web Audio Synthesizer (Zero-dependency tactile sound FX)
  // =========================================================================
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playSound(type) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(580, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.06);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === 'open-drawer') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(740, now + 0.12);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'dice') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.linearRampToValueAtTime(420, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(90, now + 0.25);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'crit') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        osc.frequency.setValueAtTime(1046.50, now + 0.24);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      }
    } catch (e) {}
  }

  // Audio Toggle UI
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  const audioIconOn = document.getElementById('audio-icon-on');
  const audioIconOff = document.getElementById('audio-icon-off');

  function updateAudioUI() {
    if (audioIconOn && audioIconOff) {
      if (soundEnabled) {
        audioIconOn.style.display = 'block';
        audioIconOff.style.display = 'none';
      } else {
        audioIconOn.style.display = 'none';
        audioIconOff.style.display = 'block';
      }
    }
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      updateAudioUI();
      if (soundEnabled) playSound('click');
    });
  }

  // =========================================================================
  // 2. Icon Initializer
  // =========================================================================
  function refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
  refreshIcons();

  // =========================================================================
  // 3. Central Core D&D 5e Stat Block Renderer
  // =========================================================================
  function renderCoreStats() {
    const statsContainer = document.getElementById('core-dnd-stats');
    if (!statsContainer || !charSheet.stats) return;
    statsContainer.innerHTML = '';

    charSheet.stats.forEach(stat => {
      const node = document.createElement('div');
      node.className = 'core-stat-node';
      node.title = `${stat.name}: ${stat.desc}`;
      node.innerHTML = `<div>${stat.code}</div><div class="mod">${stat.mod}</div>`;
      statsContainer.appendChild(node);
    });
  }
  renderCoreStats();

  // =========================================================================
  // 4. Radial Orbital Positioning Engine (Rings 1, 2, 3)
  // =========================================================================
  const ring1Container = document.getElementById('ring-1-container');
  const ring2Container = document.getElementById('ring-2-container');
  const ring3Container = document.getElementById('ring-3-container');
  const energyBeam = document.getElementById('active-energy-beam');

  // Orbital angles in degrees (updated each animation frame for smooth rotation)
  let angles = {
    ring1: 0,
    ring2: 180,
    ring3: 45
  };

  const orbitalRadii = {
    ring1: 240,
    ring2: 340,
    ring3: 440
  };

  const ring1NodesElements = [];
  const ring2NodesElements = [];
  const ring3NodesElements = [];

  function createRingNodes(items, container, ringNum, elementArray) {
    if (!container) return;
    container.innerHTML = '';
    const count = items.length;

    items.forEach((item, index) => {
      const nodeEl = document.createElement('div');
      nodeEl.className = 'orbital-node';
      nodeEl.setAttribute('data-id', item.id);
      nodeEl.setAttribute('data-ring', ringNum);

      let icon = item.icon || 'sparkles';
      let title = item.shortTitle || item.title || item.name;
      let tag = item.period || item.category || (item.school ? item.school.split(' ')[0] : '');

      nodeEl.innerHTML = `
        <div class="node-card">
          <div class="node-icon-wrap">
            <i data-lucide="${icon}" style="width: 14px; height: 14px;"></i>
          </div>
          <div class="node-title-box">
            <span class="node-name">${title}</span>
            <span class="node-tag">${tag}</span>
          </div>
        </div>
      `;

      nodeEl.addEventListener('mouseenter', () => {
        isOrbitHovered = true;
        highlightEnergyBeam(nodeEl);
      });

      nodeEl.addEventListener('mouseleave', () => {
        isOrbitHovered = false;
        if (!activeNodeData) {
          hideEnergyBeam();
        }
      });

      nodeEl.addEventListener('click', () => {
        playSound('open-drawer');
        selectNode(item, ringNum, nodeEl);
      });

      container.appendChild(nodeEl);
      elementArray.push({
        el: nodeEl,
        baseAngle: (index / count) * 360,
        radius: orbitalRadii[`ring${ringNum}`]
      });
    });
  }

  createRingNodes(ring1Chronicle, ring1Container, 1, ring1NodesElements);
  createRingNodes(ring2Skills, ring2Container, 2, ring2NodesElements);
  createRingNodes(ring3Projects, ring3Container, 3, ring3NodesElements);

  // Position nodes on circle using trigonometry
  function updateNodePositions() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return; // Responsive mode handles layout in CSS

    // Update Ring 1 (Chronicle)
    ring1NodesElements.forEach(item => {
      const totalAngle = (item.baseAngle + angles.ring1) * (Math.PI / 180);
      const x = 500 + item.radius * Math.cos(totalAngle);
      const y = 500 + item.radius * Math.sin(totalAngle);
      item.el.style.left = `${(x / 1000) * 100}%`;
      item.el.style.top = `${(y / 1000) * 100}%`;
    });

    // Update Ring 2 (Skills)
    ring2NodesElements.forEach(item => {
      const totalAngle = (item.baseAngle + angles.ring2) * (Math.PI / 180);
      const x = 500 + item.radius * Math.cos(totalAngle);
      const y = 500 + item.radius * Math.sin(totalAngle);
      item.el.style.left = `${(x / 1000) * 100}%`;
      item.el.style.top = `${(y / 1000) * 100}%`;
    });

    // Update Ring 3 (Projects)
    ring3NodesElements.forEach(item => {
      const totalAngle = (item.baseAngle + angles.ring3) * (Math.PI / 180);
      const x = 500 + item.radius * Math.cos(totalAngle);
      const y = 500 + item.radius * Math.sin(totalAngle);
      item.el.style.left = `${(x / 1000) * 100}%`;
      item.el.style.top = `${(y / 1000) * 100}%`;
    });
  }

  // Animation Loop for Orbital Rotation
  function orbitalLoop() {
    if (!isOrbitHovered && window.innerWidth > 768) {
      angles.ring1 = (angles.ring1 + 0.04) % 360;
      angles.ring2 = (angles.ring2 - 0.025 + 360) % 360;
      angles.ring3 = (angles.ring3 + 0.015) % 360;
      updateNodePositions();
    }
    requestAnimationFrame(orbitalLoop);
  }
  updateNodePositions();
  orbitalLoop();

  // Energy Beam Connector
  function highlightEnergyBeam(nodeEl) {
    if (!energyBeam || window.innerWidth <= 768) return;
    const xPct = parseFloat(nodeEl.style.left) || 50;
    const yPct = parseFloat(nodeEl.style.top) || 50;
    energyBeam.setAttribute('x1', '500');
    energyBeam.setAttribute('y1', '500');
    energyBeam.setAttribute('x2', (xPct * 10).toString());
    energyBeam.setAttribute('y2', (yPct * 10).toString());
    energyBeam.classList.add('visible');
  }

  function hideEnergyBeam() {
    if (!energyBeam) return;
    energyBeam.classList.remove('visible');
  }

  // =========================================================================
  // 5. Mobile Rings Switcher (Tabs)
  // =========================================================================
  const mobileRingTabs = document.querySelectorAll('.mobile-ring-tab-btn');

  function setMobileActiveRing(ringNum) {
    activeMobileRing = ringNum.toString();
    mobileRingTabs.forEach(btn => {
      if (btn.getAttribute('data-ring') === activeMobileRing) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    [ring1Container, ring2Container, ring3Container].forEach(c => {
      if (c) {
        if (c.getAttribute('data-ring') === activeMobileRing) {
          c.classList.add('mobile-active');
        } else {
          c.classList.remove('mobile-active');
        }
      }
    });
  }

  mobileRingTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const ring = btn.getAttribute('data-ring');
      playSound('click');
      setMobileActiveRing(ring);
    });
  });

  // Set default mobile ring to 3 (Projects)
  setMobileActiveRing('3');

  // Handle window resize
  window.addEventListener('resize', () => {
    updateNodePositions();
    if (window.innerWidth <= 768) {
      setMobileActiveRing(activeMobileRing);
    }
  });

  // =========================================================================
  // 6. Radial Side Inspector Drawer Manager (Bottom Sheet on Mobile)
  // =========================================================================
  const sideDrawer = document.getElementById('radial-side-drawer');
  const drawerScrollContent = document.getElementById('drawer-scroll-content');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  let touchStartY = 0;

  function selectNode(item, ringNum, nodeEl) {
    activeNodeData = item;
    highlightEnergyBeam(nodeEl);

    // Remove active from all cards
    document.querySelectorAll('.node-card').forEach(c => c.classList.remove('active'));
    const card = nodeEl.querySelector('.node-card');
    if (card) card.classList.add('active');

    renderDrawerContent(item, ringNum);
    if (sideDrawer) {
      sideDrawer.classList.add('open');
    }
  }

  function closeDrawer() {
    if (sideDrawer) {
      sideDrawer.classList.remove('open');
    }
    activeNodeData = null;
    hideEnergyBeam();
    document.querySelectorAll('.node-card').forEach(c => c.classList.remove('active'));
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }

  // Mobile Touch Swipe Down to Dismiss Drawer
  if (sideDrawer) {
    sideDrawer.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    sideDrawer.addEventListener('touchend', (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      if (touchEndY - touchStartY > 70 && window.innerWidth <= 768) {
        closeDrawer();
      }
    }, { passive: true });
  }

  function renderDrawerContent(item, ringNum) {
    if (!drawerScrollContent) return;

    if (ringNum === 3) {
      // Project Node (Ring 3)
      const metricsHtml = (item.metrics || []).map(m => `
        <div class="drawer-metric-col">
          <span class="metric-lbl">${m.label}</span>
          <span class="metric-v">${m.val}</span>
        </div>
      `).join('');

      const layersHtml = (item.architecture && item.architecture.diagram ? item.architecture.diagram : []).map(l => `
        <div class="drawer-layer-item">
          <div class="drawer-layer-name">${l.name}</div>
          <div class="drawer-layer-tech">${l.tech}</div>
          <div class="drawer-layer-role">${l.role}</div>
        </div>
      `).join('');

      let extraLinks = '';
      if (item.pythonServiceUrl) {
        extraLinks += `
          <a href="${item.pythonServiceUrl}" target="_blank" rel="noopener noreferrer" class="drawer-action-link">
            <i data-lucide="git-branch" style="width: 14px; height: 14px;"></i>
            <span>Python Service</span>
          </a>
        `;
      }
      if (item.extraRepoUrl) {
        extraLinks += `
          <a href="${item.extraRepoUrl}" target="_blank" rel="noopener noreferrer" class="drawer-action-link">
            <i data-lucide="git-branch" style="width: 14px; height: 14px;"></i>
            <span>Bot Repo</span>
          </a>
        `;
      }

      drawerScrollContent.innerHTML = `
        <div class="drawer-header">
          <span class="block-title-tag">Круг 3 • Реликвия • ${item.school || 'Architecture'}</span>
          <h2 class="drawer-title">${item.title}</h2>
          <div class="drawer-subtitle">${item.subtitle}</div>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 0.5rem; line-height: 1.45;">
            ${item.description}
          </p>
          <div class="drawer-metrics-row">
            ${metricsHtml}
          </div>
        </div>

        <div class="drawer-section-title">Case Study</div>
        <div class="drawer-case-grid">
          <div class="drawer-case-card">
            <div class="drawer-case-title prob">Проблема</div>
            <div class="drawer-case-text">${item.caseStudy.problem}</div>
          </div>
          <div class="drawer-case-card">
            <div class="drawer-case-title sol">Решение</div>
            <div class="drawer-case-text">${item.caseStudy.solution}</div>
          </div>
          <div class="drawer-case-card">
            <div class="drawer-case-title imp">Результат</div>
            <div class="drawer-case-text">${item.caseStudy.impact}</div>
          </div>
        </div>

        <div class="drawer-section-title">Концентрические Слои Архитектуры</div>
        <div class="drawer-layers-list">
          ${layersHtml}
        </div>

        <div class="drawer-links-bar">
          <a href="${item.githubUrl}" target="_blank" rel="noopener noreferrer" class="drawer-action-link">
            <i data-lucide="github" style="width: 14px; height: 14px;"></i>
            <span>Открыть на GitHub</span>
          </a>
          ${extraLinks}
        </div>
      `;

    } else if (ringNum === 2) {
      // Skill Node (Ring 2)
      const pointsHtml = (item.points || []).map(p => `<li style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.25rem;">${p}</li>`).join('');

      drawerScrollContent.innerHTML = `
        <div class="drawer-header">
          <span class="block-title-tag" style="background: var(--accent-gold-glow); color: var(--accent-gold);">Круг 2 • Школа Навыков • ${item.school}</span>
          <h2 class="drawer-title">${item.name}</h2>
          <div class="drawer-subtitle" style="color: var(--accent-gold);">Категория: ${item.category} • Уровень владения: ${item.level}%</div>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.75rem; line-height: 1.5;">
            ${item.summary}
          </p>
        </div>

        <div class="drawer-section-title">Ключевые компетенции и применение</div>
        <ul style="padding-left: 1.25rem; margin-top: 0.5rem;">
          ${pointsHtml}
        </ul>
      `;

    } else if (ringNum === 1) {
      // Chronicle / Experience Node (Ring 1)
      const highlightsHtml = (item.highlights || []).map(h => `<li style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.25rem;">${h}</li>`).join('');
      const techTags = (item.tech || []).map(t => `<span class="mono text-cyan" style="background: var(--bg-slot); padding: 0.15rem 0.45rem; border-radius: 4px; font-size: 0.72rem;">${t}</span>`).join(' ');

      drawerScrollContent.innerHTML = `
        <div class="drawer-header">
          <span class="block-title-tag" style="background: var(--accent-emerald-glow); color: var(--accent-emerald);">Круг 1 • Хроника & Корни • ${item.badge}</span>
          <h2 class="drawer-title">${item.title}</h2>
          <div class="drawer-subtitle" style="color: var(--accent-emerald);">${item.period} • ${item.role}</div>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.75rem; line-height: 1.5;">
            ${item.summary}
          </p>
        </div>

        <div class="drawer-section-title">Ключевые достижения и результаты</div>
        <ul style="padding-left: 1.25rem; margin-top: 0.5rem; margin-bottom: 1rem;">
          ${highlightsHtml}
        </ul>

        <div class="drawer-section-title">Стек этапа</div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.4rem;">
          ${techTags}
        </div>
      `;
    }

    refreshIcons();
  }

  // =========================================================================
  // 7. View Switcher (Radial Ritual vs Flat HR Dossier)
  // =========================================================================
  const btnViewRadial = document.getElementById('btn-view-radial');
  const btnViewFlat = document.getElementById('btn-view-flat');
  const viewRadialStage = document.getElementById('view-radial-stage');
  const viewFlatStage = document.getElementById('view-flat-stage');
  const flatProjectsSummary = document.getElementById('flat-projects-summary');
  const flatPrintBtn = document.getElementById('flat-print-btn');

  function renderFlatDossier() {
    if (!flatProjectsSummary) return;
    flatProjectsSummary.innerHTML = ring3Projects.map(p => `
      <div><strong>${p.title}</strong> (${p.tags.slice(0, 4).join(', ')}) — ${p.subtitle}.</div>
    `).join('');
  }
  renderFlatDossier();

  function switchView(viewName) {
    currentView = viewName;
    playSound('click');

    if (viewName === 'radial') {
      if (btnViewRadial) btnViewRadial.classList.add('active');
      if (btnViewFlat) btnViewFlat.classList.remove('active');
      if (viewRadialStage) viewRadialStage.classList.add('active');
      if (viewFlatStage) viewFlatStage.classList.remove('active');
    } else {
      if (btnViewRadial) btnViewRadial.classList.remove('active');
      if (btnViewFlat) btnViewFlat.classList.add('active');
      if (viewRadialStage) viewRadialStage.classList.remove('active');
      if (viewFlatStage) viewFlatStage.classList.add('active');
    }
  }

  if (btnViewRadial) btnViewRadial.addEventListener('click', () => switchView('radial'));
  if (btnViewFlat) btnViewFlat.addEventListener('click', () => switchView('flat'));
  if (flatPrintBtn) flatPrintBtn.addEventListener('click', () => window.print());

  // =========================================================================
  // 8. D&D 3D Dice Roller Engine (Physical Floating Dice)
  // =========================================================================
  const diceStageOverlay = document.getElementById('dice-stage-overlay');
  const d20Visual = document.getElementById('d20-visual');
  const diceResultBanner = document.getElementById('dice-result-banner');
  const coreDiceBtn = document.getElementById('core-dice-btn');

  function triggerD20Roll() {
    if (!diceStageOverlay || !d20Visual) return;
    playSound('dice');

    diceStageOverlay.classList.add('open');
    diceStageOverlay.setAttribute('aria-hidden', 'false');

    d20Visual.classList.add('rolling');
    d20Visual.textContent = '...';
    if (diceResultBanner) diceResultBanner.textContent = 'Rolling d20...';

    setTimeout(() => {
      d20Visual.classList.remove('rolling');
      const roll = Math.floor(Math.random() * 20) + 1;
      d20Visual.textContent = roll;

      let msg = `🎲 Rolled a ${roll}!`;
      if (roll === 20) {
        playSound('crit');
        msg = `🌟 NATURAL 20! CRITICAL SUCCESS! The Clean Architecture Gods Smile Upon You!`;
      } else if (roll === 1) {
        msg = `💀 NATURAL 1! CRITICAL FAIL! A stray NullReferenceException lurks!`;
      } else if (roll >= 15) {
        msg = `✨ Great roll (${roll})! Systems functioning with high performance.`;
      }
      if (diceResultBanner) diceResultBanner.textContent = msg;
    }, 600);
  }

  if (coreDiceBtn) {
    coreDiceBtn.addEventListener('click', triggerD20Roll);
  }

  if (diceStageOverlay) {
    diceStageOverlay.addEventListener('click', () => {
      diceStageOverlay.classList.remove('open');
      diceStageOverlay.setAttribute('aria-hidden', 'true');
    });
  }

  // =========================================================================
  // 9. The Altar of AsmODan (Quake CLI Engine)
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
      playSound('click');
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

  // Global Keyboard listener for ` (backtick/tilde) and ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === '`' || e.key === '~') {
      if (document.activeElement && document.activeElement.tagName === 'INPUT' && document.activeElement.id !== 'terminal-input') {
        return;
      }
      if (document.activeElement && document.activeElement.tagName === 'TEXTAREA') {
        return;
      }
      e.preventDefault();
      toggleTerminal();
    } else if (e.key === 'Escape') {
      if (diceStageOverlay && diceStageOverlay.classList.contains('open')) {
        diceStageOverlay.classList.remove('open');
      }
      if (sideDrawer && sideDrawer.classList.contains('open')) {
        closeDrawer();
      }
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

  function handleCommand(rawCmd) {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    terminalHistory.push(cmd);
    historyIndex = terminalHistory.length;

    appendTermLine(`asmodan > ${cmd}`, 'command');

    const parts = cmd.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').trim();

    switch (mainCmd) {
      case 'help':
        appendTermLine(
          "AsmODan Radial Ritual Commands:\n" +
          "  roll <dice>     — D&D dice roller (e.g. 'roll d20', 'roll 1d20+5')\n" +
          "  cast <spell>    — Cast tech-spells: 'cast clean-arch', 'cast vector-search'\n" +
          "  whoami          — AsmODan Character Sheet & Lore\n" +
          "  ls [dir]        — List files in virtual grimoire (/, /grimoire)\n" +
          "  cat <file>      — View artifact content (e.g. cat bio.md, cat dnd_stats.json)\n" +
          "  projects        — List 5 relics from Outer Seal\n" +
          "  contact         — Direct summoning channels\n" +
          "  cv / resume     — Switch to Flat HR Dossier view\n" +
          "  theme [toggle]  — Switch between Dark Obsidian and Parchment Light mode\n" +
          "  clear           — Cleanse the altar display",
          'output'
        );
        break;

      case 'roll':
      case 'dice':
      case 'd20':
        triggerD20Roll();
        appendTermLine("🎲 Physical d20 rolled on the central altar!", "dice");
        break;

      case 'cast':
        if (!arg) {
          appendTermLine("Available Spells: clean-arch, vector-search, malloc-free. Type 'cast <spell>'.", 'system');
        } else {
          playSound('crit');
          appendTermLine(`✨ [SPELL CAST: ${arg.toUpperCase()}] Invocation deployed across the radial seals.`, 'spell');
        }
        break;

      case 'whoami':
        appendTermLine(
          `Avatar: ${charSheet.name} (${charSheet.alias})\n` +
          `Title: ${charSheet.title}\n` +
          `Alignment: ${charSheet.alignment}\n` +
          `Specialties: C# (.NET 8/9), Python AI, Clean Architecture, CQRS, Qdrant Vector DB, Pure ANSI C\n` +
          `Status: Open for Remote / Full-time Backend roles`,
          'output'
        );
        break;

      case 'ls':
        if (arg === 'grimoire' || arg === '/grimoire' || arg === 'grimoire/') {
          appendTermLine(virtualFS["/grimoire"].join("   "), 'accent');
        } else {
          appendTermLine(virtualFS["/"].join("   "), 'accent');
        }
        break;

      case 'cat':
        if (!arg) {
          appendTermLine("Usage: cat <filename> (e.g. cat bio.md, cat dnd_stats.json, cat manifest.txt)", 'error');
        } else {
          const cleanArg = arg.replace(/^\//, '');
          if (virtualFS.files[cleanArg]) {
            appendTermLine(virtualFS.files[cleanArg], 'output');
          } else {
            appendTermLine(`cat: ${arg}: No such artifact in grimoire. Type 'ls' to view available scrolls.`, 'error');
          }
        }
        break;

      case 'projects':
        let projText = "Outer Seal Relics:\n";
        ring3Projects.forEach((p, idx) => {
          projText += ` [${idx + 1}] ${p.title} (${p.tags.slice(0, 3).join(', ')})\n     Pattern: ${p.architecture.pattern}\n     GitHub: ${p.githubUrl}\n`;
        });
        appendTermLine(projText, 'output');
        break;

      case 'contact':
        appendTermLine(
          "Direct Summoning Channels:\n" +
          " • Telegram: https://t.me/SomeSimpleTag (@SomeSimpleTag)\n" +
          " • Email: dgandapas1@gmail.com\n" +
          " • GitHub: https://github.com/Asm-o-Dan",
          'output'
        );
        break;

      case 'cv':
      case 'resume':
        switchView('flat');
        closeTerminal();
        break;

      case 'theme':
        toggleTheme();
        appendTermLine(`Altar theme updated to: ${document.documentElement.getAttribute('data-theme')}`, 'system');
        break;

      case 'clear':
        if (terminalBody) {
          terminalBody.innerHTML = '';
        }
        break;

      default:
        appendTermLine(`Unknown incantation: '${cmd}'. Type 'help' for grimoire commands.`, 'error');
        break;
    }
  }

  // Terminal input listener
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
  // 10. Theme Switcher Controller
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
    playSound('click');
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('asmodan_theme', next);
    } catch (e) {}
    updateThemeIcons(next);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  try {
    const savedTheme = localStorage.getItem('asmodan_theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateThemeIcons(savedTheme);
    }
  } catch (e) {}

  // =========================================================================
  // 11. Summon / Contact Modal & Toast Notifications
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
      playSound('click');
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
