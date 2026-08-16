// Main application entry point
const App = {
    templates: {},
    currentStyle: null,
    currentCategory: 'military',

    init() {
        this.templates = {
            soviet: SovietTemplate,
            reich: ReichTemplate,
            american: AmericanTemplate,
            med_soviet: MedSovietTemplate,
            med_reich: MedReichTemplate,
            med_american: MedAmericanTemplate,
            hq_soviet: HqSovietTemplate,
            hq_reich: HqReichTemplate,
            hq_american: HqAmericanTemplate,
            id_soviet: IdSovietTemplate,
            id_reich: IdReichTemplate,
            id_american: IdAmericanTemplate,
            doc_soviet: DocSovietTemplate,
            doc_reich: DocReichTemplate,
            doc_american: DocAmericanTemplate,
            pilot_soviet: PilotSovietTemplate,
            pilot_reich: PilotReichTemplate,
            pilot_american: PilotAmericanTemplate,
            intel_soviet: IntelSovietTemplate,
            intel_reich: IntelReichTemplate,
            intel_american: IntelAmericanTemplate
        };

        this.renderStyleCards();
        this.bindEvents();
        Fotorobot.init();
    },

    renderStyleCards() {
        const grid = document.getElementById('style-cards');
        const allCards = [
            { id: 'soviet', category: 'military', name: 'Советский солдат', desc: 'Личное дело военнослужащего РККА. Пожелтевшая бумага, красные звёзды, штампы.', icon: '☭', tag: 'РККА / СА' },
            { id: 'reich', category: 'military', name: 'Солдат Рейха', desc: 'Personalakte Wehrmacht. Готический шрифт, орлы, штамп «Geheim».', icon: '🦅', tag: 'Wehrmacht' },
            { id: 'american', category: 'military', name: 'Американский солдат', desc: 'DA Form 20 — Personnel Record. Оливковый стиль US Army, гриф CLASSIFIED.', icon: '🎖️', tag: 'US Army' },
            { id: 'med_soviet', category: 'medical', name: 'Карточка раненого', desc: 'Медицинская карточка передового района (РККА). Диагнозы, красные кресты.', icon: '🏥', tag: 'Мед. РККА' },
            { id: 'med_reich', category: 'medical', name: 'Lazarett-Karte', desc: 'Медицинская карта раненого бойца Wehrmacht. Готическая клиника.', icon: '⚕️', tag: 'Мед. Wehrmacht' },
            { id: 'med_american', category: 'medical', name: 'Emergency Tag', desc: 'Field Medical Record. Полевая бирка солдата US Army.', icon: '🩺', tag: 'Мед. US Army' },
            { id: 'hq_soviet', category: 'hq', name: 'Спецсообщение', desc: 'Донесение / Специальное сообщение (НКВД/СМЕРШ) с резолюцией вождя.', icon: '📝', tag: 'Штаб РККА' },
            { id: 'hq_reich', category: 'hq', name: 'OKW-Befehl', desc: 'Секретный приказ Вермахта. Geheime Kommandosache.', icon: '🦅', tag: 'ОКВ / Рейх' },
            { id: 'hq_american', category: 'hq', name: 'War Dept. Memo', desc: 'Секретный меморандум War Department (США). Строгий формат.', icon: '📁', tag: 'US Pentagon' },
            { id: 'id_soviet', category: 'ids', name: 'Удостоверение', desc: 'Удостоверение РККА / НКВД. Красная книжка с гербом.', icon: '📕', tag: 'ID / РККА' },
            { id: 'id_reich', category: 'ids', name: 'Kennkarte', desc: 'Документ Рейха. Тканевая текстура, отпечатки.', icon: '🆔', tag: 'ID / Рейх' },
            { id: 'id_american', category: 'ids', name: 'War Dept. ID', desc: 'Military Identification. Карточка с фото и печатью.', icon: '👤', tag: 'ID / US Army' },
            // Specialists — Profession-specific dossiers
            { id: 'doc_soviet', category: 'specialist', name: 'Военный врач', desc: 'Личное дело военного врача РККА. Специальность, госпитальные назначения.', icon: '🩺', tag: 'Врач / РККА' },
            { id: 'doc_reich', category: 'specialist', name: 'Sanitätsoffizier', desc: 'Personalakte Sanitätsoffizier. Личное дело военного врача Вермахта.', icon: '⚕️', tag: 'Арцт / Wehrmacht' },
            { id: 'doc_american', category: 'specialist', name: 'Medical Officer', desc: 'Medical Officer Personnel Record. Личное дело медофицера US Army.', icon: '🏥', tag: 'Med. Officer / US' },
            { id: 'pilot_soviet', category: 'specialist', name: 'Лётная книжка', desc: 'Личное дело лётчика ВВС РККА. Налёт, типы, победы.', icon: '✈️', tag: 'Лётчик / ВВС' },
            { id: 'pilot_reich', category: 'specialist', name: 'Fliegerpersonalakte', desc: 'Personalakte Flugzeugführer. Личное дело пилота Люфтваффе.', icon: '🛩️', tag: 'Pilot / Luftwaffe' },
            { id: 'pilot_american', category: 'specialist', name: 'Pilot Record', desc: 'USAAF Pilot Personnel Record. Личное дело пилота USAAF.', icon: '🦅', tag: 'Pilot / USAAF' },
            { id: 'intel_soviet', category: 'specialist', name: 'Дело оперативника', desc: 'Личное дело оперативника НКВД/СМЕРШ. Агентура, операции.', icon: '🕵️', tag: 'Разведка / СМЕРШ' },
            { id: 'intel_reich', category: 'specialist', name: 'Agentenakte', desc: 'Personalakte Abwehr/SD. Досье агента разведки Рейха.', icon: '🔍', tag: 'Agent / Abwehr' },
            { id: 'intel_american', category: 'specialist', name: 'OSS Agent File', desc: 'OSS Personnel File. Досье агента стратегических служб США.', icon: '🗝️', tag: 'Agent / OSS' }
        ];
        
        const cards = allCards.filter(c => c.category === this.currentCategory);

        const makeCard = (card) => `
            <div class="style-card" data-style="${card.id}" onclick="App.selectStyle('${card.id}')">
                <div class="card-visual">
                    <div class="card-visual-bg"></div>
                    <div class="card-visual-overlay"></div>
                    <span class="card-icon">${card.icon}</span>
                </div>
                <div class="card-tag">${card.tag}</div>
                <div class="card-info">
                    <div class="card-title">${card.name}</div>
                    <div class="card-desc">${card.desc}</div>
                </div>
            </div>
        `;

        grid.innerHTML = cards.map(makeCard).join('');
    },

    bindEvents() {
        document.getElementById('btn-back').addEventListener('click', () => this.goToSelector());
        document.getElementById('btn-save').addEventListener('click', () => this.save());
        document.getElementById('btn-export').addEventListener('click', () => this.exportPdf());
        
        document.getElementById('btn-import-json').addEventListener('click', () => {
            document.getElementById('input-import-json').click();
        });
        document.getElementById('input-import-json').addEventListener('change', (e) => this.importJson(e));
        document.getElementById('btn-export-json').addEventListener('click', () => this.exportJson());
        
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentCategory = e.target.dataset.category;
                this.renderStyleCards();
            });
        });
    },

    selectStyle(styleId) {
        this.currentStyle = styleId;
        const template = this.templates[styleId];
        
        document.getElementById('toolbar-title').textContent = template.name;
        
        const selectorScreen = document.getElementById('selector-screen');
        const editorScreen = document.getElementById('editor-screen');
        
        selectorScreen.style.opacity = '1';
        selectorScreen.style.transition = 'opacity 0.35s ease';
        selectorScreen.style.opacity = '0';
        
        setTimeout(() => {
            selectorScreen.classList.remove('active');
            editorScreen.classList.add('active');
            editorScreen.style.opacity = '0';
            editorScreen.style.transition = 'opacity 0.35s ease';
            
            requestAnimationFrame(() => {
                editorScreen.style.opacity = '1';
            });
            
            Editor.init(template);
        }, 350);
    },

    goToSelector() {
        if (this.currentStyle) {
            Editor.saveData(this.currentStyle);
        }

        const selectorScreen = document.getElementById('selector-screen');
        const editorScreen = document.getElementById('editor-screen');
        const fotorobotScreen = document.getElementById('fotorobot-screen');

        // Hide whichever screen is currently active
        const activeScreen = editorScreen.classList.contains('active') 
            ? editorScreen 
            : fotorobotScreen.classList.contains('active') 
                ? fotorobotScreen 
                : null;

        if (!activeScreen) return;
        
        activeScreen.style.transition = 'opacity 0.35s ease';
        activeScreen.style.opacity = '0';
        
        setTimeout(() => {
            activeScreen.classList.remove('active');
            selectorScreen.classList.add('active');
            selectorScreen.style.opacity = '0';
            selectorScreen.style.transition = 'opacity 0.35s ease';
            
            requestAnimationFrame(() => {
                selectorScreen.style.opacity = '1';
            });
        }, 350);
    },

    goToFotorobot() {
        const selectorScreen = document.getElementById('selector-screen');
        const editorScreen = document.getElementById('editor-screen');
        const fotorobotScreen = document.getElementById('fotorobot-screen');

        // Hide whichever screen is active
        const activeScreen = selectorScreen.classList.contains('active') ? selectorScreen : editorScreen;
        activeScreen.style.transition = 'opacity 0.35s ease';
        activeScreen.style.opacity = '0';

        setTimeout(() => {
            activeScreen.classList.remove('active');
            fotorobotScreen.classList.add('active');
            fotorobotScreen.style.opacity = '0';
            fotorobotScreen.style.transition = 'opacity 0.35s ease';
            Fotorobot.init();
            requestAnimationFrame(() => {
                fotorobotScreen.style.opacity = '1';
            });
        }, 350);
    },

    showToast(message) {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    },

    save() {
        const success = Editor.saveData(this.currentStyle);
        this.showToast(success ? '✓ Сохранено в браузере' : '✗ Ошибка сохранения');
    },

    importJson(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                Editor.importData(data);
                this.showToast('✓ JSON загружен');
            } catch (err) {
                console.error(err);
                this.showToast('✗ Ошибка загрузки');
            }
            event.target.value = ''; // Reset input
        };
        reader.readAsText(file);
    },

    exportJson() {
        if (!Editor.formData) return;
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(Editor.formData));
        const template = this.templates[this.currentStyle];
        const name = Editor.formData.surname || Editor.formData.characterName || Editor.formData.lastName || Editor.formData.familyName || template.name;
        
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${template.name} — ${name}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        this.showToast('✓ JSON скачан');
    },

    async exportPdf() {
        const template = this.templates[this.currentStyle];
        const name = Editor.formData.surname || Editor.formData.characterName || Editor.formData.lastName || Editor.formData.familyName || template.name;
        await PdfExport.exportPdf(`${template.name} — ${name}`);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
