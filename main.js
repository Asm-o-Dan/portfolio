/**
 * AsmODan — Cyber-Occult Grimoire & Arcane Systems Engine
 * Open Grimoire Book Router, RPG Equipment Inventory, D&D 5e Dice Engine, and Web Audio Synthesizer
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.ASM_PORTFOLIO || {};
  const charSheet = data.characterSheet || {};
  const projectsData = data.projectsData || [];
  const skillsData = data.skillsData || [];
  const timelineData = data.timelineData || [];
  const virtualFS = data.virtualFS || { "/": [], "/grimoire": [], files: {} };

  // Active state
  let currentTab = 'inspector';
  let activeProjectId = 'drugs-engine';
  let activeLayerIndex = 0;
  let activeEquipSlot = 'mainhand';
  let soundEnabled = true;

  // Terminal & Game state
  let terminalHistory = [];
  let historyIndex = -1;
  let tanksGameActive = false;
  let tankPlayer = { x: 4, y: 5 };
  let tankEnemy = { x: 4, y: 1, alive: true };

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
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.05);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'equip') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'dice') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.linearRampToValueAtTime(360, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(90, now + 0.25);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'crit') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6
        gain.gain.setValueAtTime(0.15, now);
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
  // 3. D&D 5e Stat Block Renderer
  // =========================================================================
  function renderDndStats() {
    const statsContainer = document.getElementById('dnd-stats-row');
    if (!statsContainer || !charSheet.stats) return;
    statsContainer.innerHTML = '';

    charSheet.stats.forEach(stat => {
      const node = document.createElement('div');
      node.className = 'dnd-stat-node';
      node.title = stat.desc;
      node.innerHTML = `
        <div class="dnd-node-code">${stat.code}</div>
        <div class="dnd-node-score">${stat.score}</div>
        <div class="dnd-node-mod">${stat.mod}</div>
      `;
      statsContainer.appendChild(node);
    });
  }
  renderDndStats();

  // =========================================================================
  // 4. RPG Equipped Artifacts Inventory Renderer
  // =========================================================================
  const equipmentGrid = document.getElementById('equipment-slots-grid');

  function renderEquipmentSlots() {
    if (!equipmentGrid || !charSheet.equippedItems) return;
    equipmentGrid.innerHTML = '';

    charSheet.equippedItems.forEach(item => {
      const slotEl = document.createElement('div');
      slotEl.className = `equip-slot-item ${item.slot === activeEquipSlot ? 'active' : ''}`;
      slotEl.setAttribute('data-slot', item.slot);
      slotEl.setAttribute('data-project', item.projectId || '');

      slotEl.innerHTML = `
        <div class="slot-top">
          <span class="slot-badge">${item.slotName}</span>
          <i data-lucide="${item.icon}" class="slot-icon"></i>
        </div>
        <div class="slot-item-name">${item.itemName}</div>
        <div class="slot-bonus">${item.bonus}</div>
      `;

      slotEl.addEventListener('click', () => {
        playSound('equip');
        activeEquipSlot = item.slot;
        if (item.projectId) {
          activeProjectId = item.projectId;
          activeLayerIndex = 0;
          switchRightTab('inspector');
          renderArtifactInspector();
        } else if (item.action === 'download-cv') {
          const downloadBtn = document.getElementById('wax-seal-download-btn');
          if (downloadBtn) downloadBtn.click();
        }
        renderEquipmentSlots();
      });

      equipmentGrid.appendChild(slotEl);
    });

    refreshIcons();
  }
  renderEquipmentSlots();

  // =========================================================================
  // 5. Right Page Codex Tabs Manager
  // =========================================================================
  const chapterNavBtns = document.querySelectorAll('.chapter-nav-btn');
  const edgeTabBtns = document.querySelectorAll('.tome-tab-btn');
  const tabPanes = document.querySelectorAll('.codex-tab-pane');
  const footerShortcuts = document.querySelectorAll('.tab-nav-shortcut');

  function switchRightTab(targetTab) {
    if (!['inspector', 'spellbook', 'chronicle', 'print-cv'].includes(targetTab)) {
      targetTab = 'inspector';
    }
    currentTab = targetTab;
    playSound('click');

    // Update chapter nav buttons
    chapterNavBtns.forEach(btn => {
      if (btn.getAttribute('data-tab') === targetTab) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update edge tabs
    edgeTabBtns.forEach(btn => {
      if (btn.getAttribute('data-tab') === targetTab) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update tab panes
    tabPanes.forEach(pane => {
      if (pane.id === `pane-${targetTab}`) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    if (targetTab === 'inspector') {
      renderArtifactInspector();
    } else if (targetTab === 'spellbook') {
      renderSkillsSpellbook();
    } else if (targetTab === 'chronicle') {
      renderChronicle();
    }

    refreshIcons();
  }

  // Bind chapter nav buttons
  chapterNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      switchRightTab(tab);
    });
  });

  // Bind edge bookmark tabs
  edgeTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      switchRightTab(tab);
    });
  });

  // Bind footer shortcuts
  footerShortcuts.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      switchRightTab(tab);
    });
  });

  // =========================================================================
  // 6. Artifact Inspector Renderer (Concentric Architecture Canvas)
  // =========================================================================
  const inspectorContainer = document.getElementById('artifact-inspector-container');

  function renderArtifactInspector() {
    if (!inspectorContainer) return;
    const proj = projectsData.find(p => p.id === activeProjectId) || projectsData[0];
    if (!proj) return;

    const layers = proj.architecture.diagram || [];
    const activeLayer = layers[activeLayerIndex] || layers[0];

    // Build metrics HTML
    const metricsHtml = (proj.metrics || []).map(m => `
      <div class="metric-node">
        <span class="metric-lbl">${m.label}</span>
        <span class="metric-v">${m.val}</span>
      </div>
    `).join('');

    // Build concentric layer nodes HTML
    const layersNodesHtml = layers.map((layer, idx) => `
      <div class="concentric-layer-box ${idx === activeLayerIndex ? 'active' : ''}" data-layer-idx="${idx}">
        <div class="layer-box-name">${layer.name}</div>
        <div class="layer-box-tech">${layer.tech}</div>
      </div>
    `).join('');

    // Build extra links HTML
    let extraLinksHtml = '';
    if (proj.pythonServiceUrl) {
      extraLinksHtml += `
        <a href="${proj.pythonServiceUrl}" target="_blank" rel="noopener noreferrer" class="artifact-link-pill" title="Python Service Repo">
          <i data-lucide="git-branch" style="width: 13px; height: 13px;"></i>
          <span>Python Service</span>
        </a>
      `;
    }
    if (proj.extraRepoUrl) {
      extraLinksHtml += `
        <a href="${proj.extraRepoUrl}" target="_blank" rel="noopener noreferrer" class="artifact-link-pill" title="Secondary Repo">
          <i data-lucide="git-branch" style="width: 13px; height: 13px;"></i>
          <span>Bot Repo</span>
        </a>
      `;
    }

    inspectorContainer.innerHTML = `
      <div class="artifact-hero">
        <div class="artifact-header-flex">
          <div>
            <span class="block-title-tag">${proj.school || 'Architecture'} • ${proj.architecture.pattern}</span>
            <h2 class="artifact-title">${proj.title}</h2>
            <div class="artifact-school">${proj.subtitle}</div>
          </div>
          <div class="artifact-links">
            <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="artifact-link-pill" title="GitHub Repository">
              <i data-lucide="github" style="width: 13px; height: 13px;"></i>
              <span>GitHub</span>
            </a>
            ${extraLinksHtml}
          </div>
        </div>

        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.45; margin-top: 0.5rem;">
          ${proj.description}
        </p>

        <div class="artifact-metrics-bar">
          ${metricsHtml}
        </div>
      </div>

      <!-- Concentric Architecture Layers -->
      <div style="margin-bottom: 1rem;">
        <div class="block-label-row">
          <span class="block-title-tag">Концентрические ритуальные слои</span>
          <span class="inventory-hint">Кликните слой для инспекции ➜</span>
        </div>

        <div class="concentric-nodes-grid">
          ${layersNodesHtml}
        </div>

        <div class="layer-active-inspect-card">
          <div class="layer-active-title">Слой: ${activeLayer.name} [${activeLayer.tech}]</div>
          <div class="layer-active-desc">${activeLayer.role}</div>
        </div>
      </div>

      <!-- Case Study -->
      <div class="case-study-pane">
        <span class="block-title-tag" style="margin-bottom: 0.2rem;">Case Study</span>
        <div class="case-study-grid">
          <div>
            <div class="case-col-header prob">Проблема</div>
            <div class="case-col-body">${proj.caseStudy.problem}</div>
          </div>
          <div>
            <div class="case-col-header sol">Решение</div>
            <div class="case-col-body">${proj.caseStudy.solution}</div>
          </div>
          <div>
            <div class="case-col-header imp">Результат</div>
            <div class="case-col-body">${proj.caseStudy.impact}</div>
          </div>
        </div>
      </div>
    `;

    // Bind concentric layer cards click
    const layerBoxes = inspectorContainer.querySelectorAll('.concentric-layer-box');
    layerBoxes.forEach(box => {
      box.addEventListener('click', () => {
        playSound('click');
        const idx = parseInt(box.getAttribute('data-layer-idx'), 10);
        activeLayerIndex = idx;
        renderArtifactInspector();
      });
    });

    refreshIcons();
  }
  renderArtifactInspector();

  // =========================================================================
  // 7. Skills Spellbook Renderer
  // =========================================================================
  function renderSkillsSpellbook() {
    const container = document.getElementById('skills-spellbook-container');
    if (!container) return;
    container.innerHTML = '';

    skillsData.forEach(cat => {
      const card = document.createElement('div');
      card.className = 'spellbook-cat-card';
      const tags = cat.skills.map(s => `<span class="spell-tag-item">${s.name}</span>`).join('');
      card.innerHTML = `
        <h3 class="spellbook-cat-title">${cat.category}</h3>
        <div class="spellbook-tags">${tags}</div>
      `;
      container.appendChild(card);
    });
  }

  // =========================================================================
  // 8. Quest Chronicle Renderer
  // =========================================================================
  function renderChronicle() {
    const container = document.getElementById('quest-timeline-container');
    if (!container) return;
    container.innerHTML = '';

    timelineData.forEach(item => {
      const el = document.createElement('div');
      el.className = 'quest-item';
      el.innerHTML = `
        <div class="quest-header-row">
          <span class="quest-title">${item.title}</span>
          <span class="quest-year">${item.year}</span>
        </div>
        <div class="quest-subtitle">${item.subtitle} • <span class="text-cyan">${item.badge}</span></div>
        <p class="quest-desc">${item.description}</p>
      `;
      container.appendChild(el);
    });
  }

  // Print button handler
  const printTriggerBtn = document.getElementById('trigger-browser-print-btn');
  if (printTriggerBtn) {
    printTriggerBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // =========================================================================
  // 9. D&D 3D Dice Roller Engine (Physical Floating Dice)
  // =========================================================================
  const diceStageOverlay = document.getElementById('dice-stage-overlay');
  const d20Visual = document.getElementById('d20-visual');
  const diceResultBanner = document.getElementById('dice-result-banner');
  const diceRollBtn = document.getElementById('dice-roll-btn');

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
        msg = `🌟 NATURAL 20! CRITICAL HIT! The Clean Architecture Gods Smile Upon You!`;
      } else if (roll === 1) {
        msg = `💀 NATURAL 1! CRITICAL FAIL! A wild NullReferenceException lurks!`;
      } else if (roll >= 15) {
        msg = `✨ Great roll (${roll})! Spell cast with high precision.`;
      }
      if (diceResultBanner) diceResultBanner.textContent = msg;
    }, 600);
  }

  if (diceRollBtn) {
    diceRollBtn.addEventListener('click', triggerD20Roll);
  }

  if (diceStageOverlay) {
    diceStageOverlay.addEventListener('click', () => {
      diceStageOverlay.classList.remove('open');
      diceStageOverlay.setAttribute('aria-hidden', 'true');
    });
  }

  // =========================================================================
  // 10. The Altar of AsmODan (Quake CLI Engine)
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
          "AsmODan Grimoire Commands:\n" +
          "  roll <dice>     — D&D dice roller (e.g. 'roll d20', 'roll 1d20+5', 'roll 2d6+4')\n" +
          "  cast <spell>    — Cast tech-spells: 'cast clean-arch', 'cast vector-search', 'cast banish-bug', 'cast malloc-free'\n" +
          "  whoami          — AsmODan Character Sheet & Lore\n" +
          "  ls [dir]        — List files in virtual grimoire (/, /grimoire)\n" +
          "  cat <file>      — View artifact content (e.g. cat bio.md, cat dnd_stats.json)\n" +
          "  projects        — List engineering relics and magic schools\n" +
          "  tanks           — Launch retro ASCII Tanks1984 demon battle\n" +
          "  contact         — Show direct summoning channels\n" +
          "  cv / resume     — Switch to Printable CV view\n" +
          "  theme [toggle]  — Switch between Dark Obsidian and Parchment Light mode\n" +
          "  clear           — Cleanse the altar display",
          'output'
        );
        break;

      case 'roll':
      case 'dice':
      case 'd20':
        triggerD20Roll();
        appendTermLine("🎲 Physical d20 rolled on the altar!", "dice");
        break;

      case 'cast':
        if (!arg) {
          appendTermLine("Available Spells: clean-arch, vector-search, malloc-free, banish-bug, async-pipeline. Type 'cast <spell>'.", 'system');
        } else {
          const spell = (charSheet.spells || []).find(s => s.name.toLowerCase() === arg.toLowerCase());
          if (spell) {
            playSound('crit');
            appendTermLine(`✨ [SPELL CAST: ${spell.name.toUpperCase()} (${spell.school} • ${spell.level})]`, 'spell');
            appendTermLine(`🔮 ${spell.desc}`, 'output');
          } else {
            appendTermLine(`Spell '${arg}' not found in grimoire. Try: clean-arch, vector-search, malloc-free, banish-bug.`, 'error');
          }
        }
        break;

      case 'whoami':
        appendTermLine(
          `Avatar: ${charSheet.name} (${charSheet.alias})\n` +
          `Title: ${charSheet.title}\n` +
          `Alignment: ${charSheet.alignment}\n` +
          `Spell Ability: ${charSheet.spellcasting.spellAbility} (DC ${charSheet.spellcasting.spellSaveDC} / Attack ${charSheet.spellcasting.spellAttackBonus})\n` +
          `Specialties: C# (.NET 8), Python AI, Clean Architecture, CQRS, Qdrant Vector DB, Pure ANSI C\n` +
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
        let projText = "Arcane Engineering Artifacts:\n";
        projectsData.forEach((p, idx) => {
          projText += ` [${idx + 1}] ${p.title} (${p.tags.slice(0, 3).join(', ')})\n     School: ${p.school || 'Architecture'}\n     Pattern: ${p.architecture.pattern}\n     GitHub: ${p.githubUrl}\n`;
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
        switchRightTab('print-cv');
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
  // 11. Theme Switcher Controller
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
  // 12. Summon / Contact Modal & Toast Notifications
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
