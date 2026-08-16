// fotorobot.js — Main fotorobot (facial composite) controller
// Uses FaceParts from face-parts.js

const Fotorobot = (() => {
  let draft = { ...FaceParts.DEFAULT_FACE };
  let suspects = [];
  let editingId = null;
  let currentMode = 'svg'; // 'svg', 'collage', 'gallery'
  const NEURO_BASES = 4;
  const STORAGE_KEY = 'fotorobot_suspects';

  function init() {
    loadSuspects();
    render();
  }

  function loadSuspects() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      suspects = saved ? JSON.parse(saved) : [];
    } catch (e) {
      suspects = [];
    }
  }

  function saveSuspectsToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(suspects));
    } catch (e) {
      console.error('Failed to save suspects:', e);
    }
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function setDraft(patch) {
    Object.assign(draft, patch);
    updateCanvas();
    updateControls();
  }

  function randomize() {
    const r = (max) => Math.floor(Math.random() * max);
    draft = {
      face: r(6), hair: r(10), brows: r(6), eyes: r(8),
      nose: r(5), mouth: r(7), beard: r(5), ears: r(3),
      scars: r(8), accessory: r(8), hats: r(7), mythos: r(7),
      skinTone: draft.skinTone, hairColor: draft.hairColor,
    };
    updateCanvas();
    updateControls();
  }

  function reset() {
    draft = { ...FaceParts.DEFAULT_FACE };
    updateCanvas();
    updateControls();
  }

  function cycle(cat, dir) {
    const len = FaceParts.LIBRARY[cat].length;
    draft[cat] = (((draft[cat] + dir) % len) + len) % len;
    updateCanvas();
    updateControls();
  }

  function setMode(mode) {
    currentMode = mode;
    // Update tab UI
    document.querySelectorAll('.fr-tab').forEach(t => {
      if (t.dataset.tab === mode) t.classList.add('active');
      else t.classList.remove('active');
    });
    
    // Hide color pickers if not SVG
    const colorsGrid = document.querySelector('.fr-colors-grid');
    if (colorsGrid) {
      colorsGrid.style.display = (mode === 'svg') ? 'grid' : 'none';
    }

    updateCanvas();
    updateControls();
  }

  function updateCanvas() {
    const wrap = document.getElementById('fr-canvas');
    if (!wrap) return;
    
    if (currentMode === 'svg') {
      wrap.innerHTML = FaceParts.renderFace(draft, 320);
    } else if (currentMode === 'gallery') {
      // Old Gallery mode just uses the base portraits (which we kept in assets/neuro)
      // wait, the bases might still be there, let's use the parts! 
      // We didn't delete the bases, but it's cleaner to keep Gallery as it was.
      const bFace = (draft.face % NEURO_BASES) + 1;
      wrap.innerHTML = `
        <div class="fr-neuro-wrap">
          <div class="fr-neuro-layer gallery-mode" style="background-image: url('assets/neuro/base_${bFace}.jpg');"></div>
          <div class="fr-neuro-text" style="color:rgba(255,255,255,0.7); text-shadow:0 1px 2px #000;">ARKHAM P.D. · NEURO-GALLERY №${bFace}</div>
        </div>
      `;
    } else if (currentMode === 'collage') {
      // New Constructor mode
      const NEURO_PARTS = 2; // Due to generation limits we only have 2 options for parts
      const bFace = (draft.face % NEURO_PARTS) + 1;
      const bEyes = (draft.eyes % NEURO_PARTS) + 1;
      const bNose = (draft.nose % NEURO_PARTS) + 1;
      const bMouth = (draft.mouth % NEURO_PARTS) + 1;
      
      wrap.innerHTML = `
        <div class="fr-neuro-wrap">
          <div class="fr-neuro-layer neuro-part-face" style="background-image: url('assets/neuro/parts/face_${bFace}.png');"></div>
          <div class="fr-neuro-layer neuro-part-eyes" style="background-image: url('assets/neuro/parts/eyes_${bEyes}.png');"></div>
          <div class="fr-neuro-layer neuro-part-nose" style="background-image: url('assets/neuro/parts/nose_${bNose}.png');"></div>
          <div class="fr-neuro-layer neuro-part-mouth" style="background-image: url('assets/neuro/parts/mouth_${bMouth}.png');"></div>
          <div class="fr-neuro-text">ARKHAM P.D. · NEURO-CONSTRUCTOR</div>
        </div>
      `;
    }
    
    const numEl = document.getElementById('fr-case-number');
    if (numEl) numEl.textContent = '№ ' + (Math.abs(FaceParts.hashFace(draft)) % 9000 + 1000);
  }

  function updateControls() {
    const colors = { skin: draft.skinTone, hair: draft.hairColor };
    
    FaceParts.CATEGORY_ORDER.forEach(cat => {
      const row = document.getElementById(`fr-row-${cat}`);
      // Visibility logic
      if (row) {
        if (currentMode === 'gallery') {
          row.style.display = (cat === 'face') ? 'flex' : 'none';
        } else if (currentMode === 'collage') {
          const allowed = ['face', 'eyes', 'nose', 'mouth'];
          row.style.display = allowed.includes(cat) ? 'flex' : 'none';
        } else {
          row.style.display = 'flex';
        }
      }
      
      const lib = FaceParts.LIBRARY[cat];
      // Use 4 for gallery, 2 for parts due to generation limits
      let len = lib.length;
      if (currentMode === 'gallery') len = 4;
      if (currentMode === 'collage') len = 2;
      const i = draft[cat] % len;
      
      const thumbEl = document.getElementById(`fr-thumb-${cat}`);
      if (thumbEl) {
        if (currentMode === 'svg') {
          thumbEl.innerHTML = FaceParts.renderThumb(cat, i, colors);
        } else if (currentMode === 'gallery') {
          const bgId = i + 1;
          thumbEl.innerHTML = `<div style="width:100%; height:100%; border-radius:4px; background-image:url('assets/neuro/base_${bgId}.jpg'); background-size:cover; background-position:center;"></div>`;
        } else if (currentMode === 'collage') {
          const bgId = i + 1;
          thumbEl.innerHTML = `<div style="width:100%; height:100%; border-radius:4px; background-color:#fff; background-image:url('assets/neuro/parts/${cat}_${bgId}.png'); background-size:contain; background-repeat:no-repeat; background-position:center;"></div>`;
        }
      }
      
      const counterEl = document.getElementById(`fr-counter-${cat}`);
      if (counterEl) counterEl.textContent = `${i + 1}/${len}`;
    });
    updateSwatches('skin', draft.skinTone);
    updateSwatches('hair', draft.hairColor);
  }

  function updateSwatches(type, value) {
    const container = document.getElementById(`fr-swatches-${type}`);
    if (!container) return;
    container.querySelectorAll('.fr-swatch').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.color && btn.dataset.color.toLowerCase() === value.toLowerCase());
    });
  }

  function renderColorPicker(id, label, value, swatches) {
    const swatchHtml = swatches.map(c =>
      `<button class="fr-swatch${value.toLowerCase() === c.toLowerCase() ? ' active' : ''}" data-color="${c}" style="background-color:${c}" aria-label="Цвет ${c}" onclick="Fotorobot.setColor('${id}', '${c}')"></button>`
    ).join('');

    return `
      <div>
        <div class="fr-color-label">${label}</div>
        <div class="fr-swatches" id="fr-swatches-${id}">
          ${swatchHtml}
          <label class="fr-swatch-custom">
            <input type="color" value="${value}" onchange="Fotorobot.setColor('${id}', this.value)" aria-label="Свой цвет">
            <span class="fr-swatch-custom-label">+</span>
          </label>
        </div>
      </div>
    `;
  }

  function renderPartRow(cat) {
    const lib = FaceParts.LIBRARY[cat];
    const len = lib.length;
    const i = draft[cat];
    const meta = FaceParts.LABELS[cat];
    const colors = { skin: draft.skinTone, hair: draft.hairColor };

    return `
      <div class="fr-part-row" id="fr-row-${cat}">
        <div class="fr-part-thumb" id="fr-thumb-${cat}">
          ${FaceParts.renderThumb(cat, i, colors)}
        </div>
        <div class="fr-part-info">
          <div class="fr-part-header">
            <span class="fr-part-name">${meta.name}</span>
            <span class="fr-part-counter" id="fr-counter-${cat}">${i + 1}/${len}</span>
          </div>
          <div class="fr-part-controls">
            <button class="fr-arrow-btn" onclick="Fotorobot.cycle('${cat}', -1)" aria-label="Предыдущий вариант">‹</button>
            <button class="fr-arrow-btn" onclick="Fotorobot.cycle('${cat}', 1)" aria-label="Следующий вариант">›</button>
          </div>
        </div>
      </div>
    `;
  }

  const ICONS = {
    eye: `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 60 C 35 25, 85 25, 110 60 C 85 95, 35 95, 10 60 Z"/><circle cx="60" cy="60" r="20"/><circle cx="60" cy="60" r="9" fill="currentColor" stroke="none"/></svg>`,
    back: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>`,
  };

  function render() {
    const screen = document.getElementById('fotorobot-screen');
    if (!screen) return;

    const caseNum = Math.abs(FaceParts.hashFace(draft)) % 9000 + 1000;

    screen.innerHTML = `
      <div class="fr-screen">
        <button class="fr-back-btn" onclick="App.goToSelector()">
          ${ICONS.back}
          <span>Назад</span>
        </button>

        <header class="fr-header">
          <div class="fr-header-tag">Том I · Идентификация</div>
          <h1>ФОТОРОБОТ</h1>
          <p class="fr-header-desc">
            Соберите облик подозреваемого из черт — обычных и не очень. Сохраните
            в архив, и фигурант появится в картотеке.
          </p>
          <div class="fr-tabs-container">
            <button class="fr-tab ${currentMode === 'svg' ? 'active' : ''}" data-tab="svg" onclick="Fotorobot.setMode('svg')">Классика (SVG)</button>
            <button class="fr-tab ${currentMode === 'collage' ? 'active' : ''}" data-tab="collage" onclick="Fotorobot.setMode('collage')">Нейро-Коллаж</button>
            <button class="fr-tab ${currentMode === 'gallery' ? 'active' : ''}" data-tab="gallery" onclick="Fotorobot.setMode('gallery')">Нейро-Галерея</button>
          </div>
          <div class="fr-divider">
            <span class="fr-divider-line"></span>
            <span class="fr-divider-dot"></span>
            <span class="fr-divider-line"></span>
          </div>
        </header>

        <div class="fr-grid">
          <!-- CANVAS -->
          <section class="fr-panel fr-ink-edge">
            <div class="fr-canvas-header">
              <div class="fr-panel-title">Субъект</div>
              <span class="fr-panel-number" id="fr-case-number">№ ${caseNum}</span>
            </div>
            <div class="fr-canvas-wrap" id="fr-canvas">
              ${FaceParts.renderFace(draft, 320)}
            </div>
            <div class="fr-actions">
              <button class="fr-btn" onclick="Fotorobot.randomize()">
                <span class="fr-btn-icon">🎲</span> Случайно
              </button>
              <button class="fr-btn" onclick="Fotorobot.reset()">
                <span class="fr-btn-icon">↺</span> Сброс
              </button>
              <button class="fr-btn" onclick="Fotorobot.exportPng()">
                <span class="fr-btn-icon">⬇</span> PNG
              </button>
              <button class="fr-btn fr-btn-primary" onclick="Fotorobot.openSave()">
                <span class="fr-btn-icon">✦</span> В архив
              </button>
            </div>
          </section>

          <!-- CONTROLS -->
          <section class="fr-panel">
            <div class="fr-panel-title">Черты</div>
            <div class="fr-colors-grid">
              ${renderColorPicker('skin', 'Тон кожи', draft.skinTone, FaceParts.SKIN_TONES)}
              ${renderColorPicker('hair', 'Цвет волос', draft.hairColor, FaceParts.HAIR_COLORS)}
            </div>
            <div class="fr-parts-grid" id="fr-parts-grid">
              ${FaceParts.CATEGORY_ORDER.map(cat => renderPartRow(cat)).join('')}
            </div>
          </section>
        </div>

        <!-- GALLERY -->
        <section class="fr-gallery">
          <div class="fr-gallery-header">
            <div>
              <h2>Архив субъектов</h2>
              <p class="fr-gallery-count">
                ${suspects.length === 0
                  ? 'Пока ни одного субъекта. Соберите облик и сохраните.'
                  : suspects.length + ' в картотеке.'}
              </p>
            </div>
            <div class="fr-gallery-eye">${ICONS.eye}</div>
          </div>
          ${suspects.length === 0 ? renderEmptyGallery() : renderGallery()}
        </section>

        <!-- SAVE MODAL -->
        <div class="fr-modal-overlay" id="fr-save-modal">
          <div class="fr-modal">
            <h3 id="fr-modal-title">Завести досье</h3>
            <p class="fr-modal-desc">Субъект будет добавлен в картотеку.</p>
            <div class="fr-form-grid">
              <div class="fr-form-row">
                <div class="fr-form-group">
                  <label>Имя / Фамилия</label>
                  <input type="text" id="fr-name" placeholder="Напр. Уилбур Уэйтли">
                </div>
                <div class="fr-form-group">
                  <label>Кличка</label>
                  <input type="text" id="fr-alias" placeholder="«Безумец из Иннсмута»">
                </div>
              </div>
              <div class="fr-form-group">
                <label>Описание / Приметы</label>
                <textarea id="fr-description" placeholder="Особые приметы, манера поведения, связи…"></textarea>
              </div>
              <div class="fr-form-row">
                <div class="fr-form-group">
                  <label class="fr-threat-display">
                    Уровень угрозы <span class="fr-threat-value" id="fr-threat-display">2/5</span>
                  </label>
                  <input type="range" class="fr-range" id="fr-threat" min="1" max="5" value="2" step="1" oninput="document.getElementById('fr-threat-display').textContent=this.value+'/5'">
                </div>
                <div class="fr-form-group">
                  <label>Статус</label>
                  <select id="fr-status">
                    <option value="unknown">Неизвестно</option>
                    <option value="at-large">В розыске</option>
                    <option value="captured">Задержан</option>
                    <option value="deceased">Мёртв</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="fr-modal-footer">
              <button class="fr-btn fr-btn-ghost" onclick="Fotorobot.closeSave()">Отмена</button>
              <button class="fr-btn fr-btn-primary" onclick="Fotorobot.saveSuspect()" id="fr-save-btn">Завести дело</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderEmptyGallery() {
    return `
      <div class="fr-empty">
        <div class="fr-empty-icon">${ICONS.eye}</div>
        <p>Картотека пуста. Первый субъект ждёт сборки…</p>
      </div>
    `;
  }

  function renderGallery() {
    const statusLabels = { 'at-large': 'В розыске', captured: 'Задержан', deceased: 'Мёртв', unknown: 'Неизвестно' };
    const statusClasses = { 'at-large': 'fr-status-at-large', captured: 'fr-status-captured', deceased: 'fr-status-deceased', unknown: 'fr-status-unknown' };

    const cards = suspects.map(s => {
      const threatClass = s.threatLevel <= 2 ? 'fr-threat-low' : s.threatLevel <= 3 ? 'fr-threat-mid' : 'fr-threat-high';
      return `
        <div class="fr-card">
          <div class="fr-card-portrait">
            ${FaceParts.renderFace(s.face, 160)}
          </div>
          <div class="fr-card-info">
            <div class="fr-card-name-row">
              <span class="fr-card-name">${s.name || 'Без имени'}</span>
              <span class="fr-card-threat ${threatClass}">${'◈'.repeat(s.threatLevel)}</span>
            </div>
            ${s.alias ? `<div class="fr-card-alias">«${s.alias}»</div>` : ''}
            <span class="fr-card-status ${statusClasses[s.status]}">${statusLabels[s.status]}</span>
          </div>
          <div class="fr-card-actions">
            <button class="fr-btn" onclick="Fotorobot.loadSuspect('${s.id}')">Изменить</button>
            <button class="fr-btn fr-btn-delete" onclick="Fotorobot.deleteSuspect('${s.id}')">✕</button>
          </div>
        </div>
      `;
    }).join('');

    return `<div class="fr-cards-grid">${cards}</div>`;
  }

  function setColor(type, color) {
    if (type === 'skin') {
      setDraft({ skinTone: color });
    } else {
      setDraft({ hairColor: color });
    }
  }

  async function exportPng() {
    const svgEl = document.querySelector('#fr-canvas svg');
    if (!svgEl) return;
    const xml = new XMLSerializer().serializeToString(svgEl);
    const svg64 = btoa(unescape(encodeURIComponent(xml)));
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 480;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.fillStyle = '#d4c4a8';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 40, 0, 400, 600);
      const a = document.createElement('a');
      a.download = `fotorobot-${Date.now()}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
      showToast('Ориентир сохранён — PNG выгружен');
    };
    img.src = `data:image/svg+xml;base64,${svg64}`;
  }

  function openSave(id) {
    editingId = id || null;
    const modal = document.getElementById('fr-save-modal');
    if (!modal) return;

    const titleEl = document.getElementById('fr-modal-title');
    const saveBtnEl = document.getElementById('fr-save-btn');

    if (editingId) {
      const s = suspects.find(x => x.id === editingId);
      if (s) {
        document.getElementById('fr-name').value = s.name;
        document.getElementById('fr-alias').value = s.alias;
        document.getElementById('fr-description').value = s.description;
        document.getElementById('fr-threat').value = s.threatLevel;
        document.getElementById('fr-threat-display').textContent = s.threatLevel + '/5';
        document.getElementById('fr-status').value = s.status;
        titleEl.textContent = 'Редактировать досье';
        saveBtnEl.textContent = 'Сохранить';
      }
    } else {
      document.getElementById('fr-name').value = '';
      document.getElementById('fr-alias').value = '';
      document.getElementById('fr-description').value = '';
      document.getElementById('fr-threat').value = 2;
      document.getElementById('fr-threat-display').textContent = '2/5';
      document.getElementById('fr-status').value = 'unknown';
      titleEl.textContent = 'Завести досье';
      saveBtnEl.textContent = 'Завести дело';
    }

    modal.classList.add('active');
  }

  function closeSave() {
    const modal = document.getElementById('fr-save-modal');
    if (modal) modal.classList.remove('active');
    editingId = null;
  }

  function saveSuspect() {
    const name = document.getElementById('fr-name').value.trim();
    if (!name) {
      showToast('Укажите имя — без него досье не заводится');
      return;
    }
    const data = {
      name,
      alias: document.getElementById('fr-alias').value.trim(),
      description: document.getElementById('fr-description').value.trim(),
      threatLevel: parseInt(document.getElementById('fr-threat').value),
      status: document.getElementById('fr-status').value,
      face: { ...draft },
    };

    if (editingId) {
      const idx = suspects.findIndex(x => x.id === editingId);
      if (idx !== -1) {
        suspects[idx] = { ...suspects[idx], ...data, updatedAt: Date.now() };
      }
      showToast('Досье обновлено — ' + name);
    } else {
      suspects.push({
        ...data,
        id: uid(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      showToast('Внесён в картотеку — ' + name);
    }

    saveSuspectsToStorage();
    closeSave();
    render();
  }

  function loadSuspect(id) {
    const s = suspects.find(x => x.id === id);
    if (!s) return;
    draft = { ...s.face };
    editingId = id;
    render();
    openSave(id);
    showToast('Загружено в редактор — ' + s.name);
  }

  function deleteSuspect(id) {
    const s = suspects.find(x => x.id === id);
    suspects = suspects.filter(x => x.id !== id);
    saveSuspectsToStorage();
    render();
    if (s) showToast('Досье уничтожено — ' + s.name);
  }

  function showToast(message) {
    let toast = document.querySelector('.fr-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'fr-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
  }

  return {
    init, render, randomize, reset, cycle, setMode, setColor, exportPng,
    openSave, closeSave, saveSuspect, loadSuspect, deleteSuspect,
    showToast,
  };
})();
