/**
 * Daniil Gandapas (Asm-o-Dan) — Portfolio Script
 * Handles project filtering, interactive architecture inspector, theme switching, and clipboard.
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.ASM_PORTFOLIO || {};
  const engineer = data.engineerProfile || {};
  const topologies = data.architectureTopologies || {};
  const projects = data.projectsData || [];
  const skills = data.skillsData || [];
  const timeline = data.timelineData || [];

  // Initialize Lucide Icons
  function refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
  refreshIcons();

  // =========================================================================
  // 1. THEME SWITCHER
  // =========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  const iconSun = document.getElementById('icon-sun');
  const iconMoon = document.getElementById('icon-moon');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      if (iconSun) iconSun.style.display = 'none';
      if (iconMoon) iconMoon.style.display = 'inline-block';
    } else {
      if (iconSun) iconSun.style.display = 'inline-block';
      if (iconMoon) iconMoon.style.display = 'none';
    }
  }

  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // =========================================================================
  // 2. MOBILE MENU DRAWER
  // =========================================================================
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
    });

    // Close drawer when clicking any link inside
    mobileDrawer.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
      });
    });
  }

  // =========================================================================
  // 3. PROJECTS FILTERING & RENDERING
  // =========================================================================
  const projectsContainer = document.getElementById('projects-container');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderProjects(filter = 'all') {
    if (!projectsContainer) return;
    projectsContainer.innerHTML = '';

    const filtered = filter === 'all' 
      ? projects 
      : projects.filter(p => p.category.includes(filter));

    filtered.forEach(proj => {
      const card = document.createElement('article');
      card.className = 'project-card';

      const highlightsHtml = proj.highlights && proj.highlights.length > 0
        ? `<ul class="project-highlights">${proj.highlights.map(h => `<li>${h}</li>`).join('')}</ul>`
        : '';

      const stackHtml = proj.stack && proj.stack.length > 0
        ? `<div class="project-stack">${proj.stack.map(s => `<span class="stack-tag">${s}</span>`).join('')}</div>`
        : '';

      let extraLinks = '';
      if (proj.topologyId) {
        extraLinks += `
          <a href="#architecture" class="project-link-btn" title="Посмотреть слои архитектуры">
            <i data-lucide="layers" style="width: 14px; height: 14px;"></i>
            <span>Архитектура</span>
          </a>
        `;
      }
      if (proj.githubUrl) {
        extraLinks += `
          <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link-btn">
            <i data-lucide="github" style="width: 14px; height: 14px;"></i>
            <span>GitHub</span>
          </a>
        `;
      }

      card.innerHTML = `
        <div class="project-head">
          <div>
            <h3 class="project-title">${proj.title}</h3>
            <div class="project-subtitle">${proj.subtitle}</div>
          </div>
          <div class="project-links">
            ${extraLinks}
          </div>
        </div>
        <p class="project-desc">${proj.description}</p>
        ${highlightsHtml}
        ${stackHtml}
      `;

      projectsContainer.appendChild(card);
    });

    refreshIcons();
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.getAttribute('data-filter'));
    });
  });

  renderProjects('all');

  // =========================================================================
  // 4. INTERACTIVE ARCHITECTURE WORKBENCH
  // =========================================================================
  let currentTopoKey = 'drugs-engine';
  let currentLayerId = 'domain';

  const tabBtns = document.querySelectorAll('.tab-btn');
  const layersList = document.getElementById('layers-list');
  const layerBadge = document.getElementById('layer-badge');
  const layerTitle = document.getElementById('layer-title');
  const layerRule = document.getElementById('layer-rule');
  const layerDesc = document.getElementById('layer-desc');
  const layerCode = document.getElementById('layer-code');

  function renderTopology(topoKey, selectLayerId = null) {
    const topo = topologies[topoKey];
    if (!topo) return;
    currentTopoKey = topoKey;

    tabBtns.forEach(btn => {
      if (btn.getAttribute('data-topo') === topoKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (layersList) {
      layersList.innerHTML = '';
      topo.layers.forEach(layer => {
        const btn = document.createElement('button');
        btn.className = 'layer-btn';
        btn.setAttribute('data-layer-id', layer.id);
        btn.innerHTML = `
          <div class="layer-btn-title">${layer.name}</div>
          <div class="layer-btn-rule">${layer.rule}</div>
        `;
        btn.addEventListener('click', () => {
          selectLayer(layer.id);
        });
        layersList.appendChild(btn);
      });
    }

    const firstId = selectLayerId || topo.layers[0]?.id;
    if (firstId) {
      selectLayer(firstId);
    }
  }

  function selectLayer(layerId) {
    const topo = topologies[currentTopoKey];
    if (!topo) return;
    const layer = topo.layers.find(l => l.id === layerId);
    if (!layer) return;

    currentLayerId = layerId;

    const layerBtns = document.querySelectorAll('.layer-btn');
    layerBtns.forEach(b => {
      if (b.getAttribute('data-layer-id') === layerId) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    if (layerBadge) layerBadge.textContent = layer.name.split('.')[1]?.trim() || layer.name;
    if (layerTitle) layerTitle.textContent = layer.name;
    if (layerRule) layerRule.textContent = layer.rule;
    if (layerDesc) layerDesc.textContent = layer.desc;
    if (layerCode) layerCode.textContent = layer.codeSnippet || '// No code snippet';
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      renderTopology(btn.getAttribute('data-topo'));
    });
  });

  renderTopology('drugs-engine');

  // =========================================================================
  // 5. SKILLS GRID RENDERING
  // =========================================================================
  const skillsContainer = document.getElementById('skills-container');
  if (skillsContainer && skills.length > 0) {
    skillsContainer.innerHTML = '';
    skills.forEach(cat => {
      const card = document.createElement('div');
      card.className = 'skill-category-card';

      const pillsHtml = cat.items.map(item => `<span class="skill-pill">${item}</span>`).join('');

      card.innerHTML = `
        <div class="skill-category-head">
          <div class="skill-category-icon"><i data-lucide="${cat.icon || 'code-2'}"></i></div>
          <h3 class="skill-category-title">${cat.category}</h3>
        </div>
        <div class="skill-tags-list">
          ${pillsHtml}
        </div>
      `;

      skillsContainer.appendChild(card);
    });
    refreshIcons();
  }

  // =========================================================================
  // 6. TIMELINE (EXPERIENCE & EDUCATION) RENDERING
  // =========================================================================
  const timelineContainer = document.getElementById('timeline-container');
  if (timelineContainer && timeline.length > 0) {
    timelineContainer.innerHTML = '';
    timeline.forEach(item => {
      const node = document.createElement('div');
      node.className = 'timeline-item';

      const bulletsHtml = item.highlights && item.highlights.length > 0
        ? `<ul class="timeline-bullets">${item.highlights.map(h => `<li>${h}</li>`).join('')}</ul>`
        : '';

      node.innerHTML = `
        <div class="timeline-meta">
          <h3 class="timeline-role">${item.role}</h3>
          <span class="timeline-period">${item.period}</span>
        </div>
        <div class="timeline-company">${item.company} (${item.type})</div>
        ${bulletsHtml}
      `;

      timelineContainer.appendChild(node);
    });
  }

  // =========================================================================
  // 7. CLIPBOARD COPY & TOAST NOTIFICATION
  // =========================================================================
  const toastHub = document.getElementById('toast-hub');

  function showToast(message) {
    if (!toastHub) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastHub.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 2400);
  }

  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Скопировано: ${textToCopy}`);
        }).catch(() => {
          showToast(`Скопируйте вручную: ${textToCopy}`);
        });
      }
    });
  });
});
