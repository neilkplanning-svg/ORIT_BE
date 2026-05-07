/**
 * תפריט נגישות מתקדם - תקן ישראלי 5568 / WCAG 2.1 AA
 * Advanced Accessibility Widget
 */
(function () {
    'use strict';

    const STORAGE_KEY = 'a11y-orit-prefs-v1';

    const defaults = {
        fontScale: 0,
        contrast: 'none',
        grayscale: false,
        highlightLinks: false,
        readableFont: false,
        bigCursor: false,
        pauseAnimations: false,
        underlineHeadings: false,
        lineHeight: 0,
        letterSpacing: 0
    };

    let state = loadState();

    function loadState() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            return Object.assign({}, defaults, saved || {});
        } catch (e) {
            return Object.assign({}, defaults);
        }
    }

    function saveState() {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
    }

    function applyState() {
        const root = document.documentElement;
        const body = document.body;
        if (!body) return;

        root.style.setProperty('--a11y-font-scale', String(1 + state.fontScale * 0.1));
        root.style.setProperty('--a11y-line-height', String(1.7 + state.lineHeight * 0.15));
        root.style.setProperty('--a11y-letter-spacing', state.letterSpacing * 0.5 + 'px');

        body.classList.toggle('a11y-contrast-high', state.contrast === 'high');
        body.classList.toggle('a11y-contrast-dark', state.contrast === 'dark');
        body.classList.toggle('a11y-contrast-light', state.contrast === 'light');
        body.classList.toggle('a11y-grayscale', !!state.grayscale);
        body.classList.toggle('a11y-highlight-links', !!state.highlightLinks);
        body.classList.toggle('a11y-readable-font', !!state.readableFont);
        body.classList.toggle('a11y-big-cursor', !!state.bigCursor);
        body.classList.toggle('a11y-pause-animations', !!state.pauseAnimations);
        body.classList.toggle('a11y-underline-headings', !!state.underlineHeadings);
        body.classList.toggle('a11y-active', hasAnyChange());

        updateButtonStates();
    }

    function hasAnyChange() {
        return Object.keys(defaults).some(k => state[k] !== defaults[k]);
    }

    function updateButtonStates() {
        document.querySelectorAll('[data-a11y-action]').forEach(btn => {
            const action = btn.getAttribute('data-a11y-action');
            const value = btn.getAttribute('data-a11y-value');
            let active = false;

            if (action === 'contrast') active = state.contrast === value;
            else if (action === 'fontInc') active = state.fontScale > 0;
            else if (action === 'fontDec') active = state.fontScale < 0;
            else if (action === 'lineHeight') active = state.lineHeight > 0;
            else if (action === 'letterSpacing') active = state.letterSpacing > 0;
            else if (action in state) active = !!state[action];

            btn.classList.toggle('a11y-btn-active', active);
            btn.setAttribute('aria-pressed', String(active));
        });

        const sizeLabel = document.getElementById('a11y-size-label');
        if (sizeLabel) sizeLabel.textContent = (100 + state.fontScale * 10) + '%';
    }

    function buildPanel() {
        const panel = document.createElement('div');
        panel.className = 'a11y-panel';
        panel.id = 'a11y-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-labelledby', 'a11y-panel-title');
        panel.setAttribute('aria-modal', 'false');
        panel.setAttribute('lang', 'he');
        panel.setAttribute('dir', 'rtl');
        panel.hidden = true;

        panel.innerHTML = `
            <div class="a11y-panel-header">
                <h2 id="a11y-panel-title"><i class="fas fa-universal-access" aria-hidden="true"></i> תפריט נגישות</h2>
                <button class="a11y-close" aria-label="סגירת תפריט נגישות" data-a11y-action="close">
                    <i class="fas fa-times" aria-hidden="true"></i>
                </button>
            </div>

            <div class="a11y-panel-body">
                <div class="a11y-section">
                    <h3>גודל טקסט</h3>
                    <div class="a11y-row a11y-size-row">
                        <button class="a11y-btn a11y-btn-square" data-a11y-action="fontDec" aria-label="הקטנת טקסט">
                            <i class="fas fa-minus" aria-hidden="true"></i>
                        </button>
                        <span class="a11y-size-display" id="a11y-size-label" aria-live="polite">100%</span>
                        <button class="a11y-btn a11y-btn-square" data-a11y-action="fontInc" aria-label="הגדלת טקסט">
                            <i class="fas fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>

                <div class="a11y-section">
                    <h3>ניגודיות וצבעים</h3>
                    <div class="a11y-grid">
                        <button class="a11y-btn" data-a11y-action="contrast" data-a11y-value="high" aria-label="ניגודיות גבוהה">
                            <i class="fas fa-adjust" aria-hidden="true"></i><span>ניגודיות גבוהה</span>
                        </button>
                        <button class="a11y-btn" data-a11y-action="contrast" data-a11y-value="dark" aria-label="מצב כהה">
                            <i class="fas fa-moon" aria-hidden="true"></i><span>מצב כהה</span>
                        </button>
                        <button class="a11y-btn" data-a11y-action="contrast" data-a11y-value="light" aria-label="מצב בהיר">
                            <i class="fas fa-sun" aria-hidden="true"></i><span>מצב בהיר</span>
                        </button>
                        <button class="a11y-btn" data-a11y-action="grayscale" aria-label="גווני אפור">
                            <i class="fas fa-tint-slash" aria-hidden="true"></i><span>גווני אפור</span>
                        </button>
                    </div>
                </div>

                <div class="a11y-section">
                    <h3>קריאות וטקסט</h3>
                    <div class="a11y-grid">
                        <button class="a11y-btn" data-a11y-action="readableFont" aria-label="גופן קריא">
                            <i class="fas fa-font" aria-hidden="true"></i><span>גופן קריא</span>
                        </button>
                        <button class="a11y-btn" data-a11y-action="lineHeight" aria-label="ריווח שורות">
                            <i class="fas fa-text-height" aria-hidden="true"></i><span>ריווח שורות</span>
                        </button>
                        <button class="a11y-btn" data-a11y-action="letterSpacing" aria-label="ריווח אותיות">
                            <i class="fas fa-text-width" aria-hidden="true"></i><span>ריווח אותיות</span>
                        </button>
                        <button class="a11y-btn" data-a11y-action="underlineHeadings" aria-label="הדגשת כותרות">
                            <i class="fas fa-heading" aria-hidden="true"></i><span>הדגשת כותרות</span>
                        </button>
                    </div>
                </div>

                <div class="a11y-section">
                    <h3>ניווט וסימון</h3>
                    <div class="a11y-grid">
                        <button class="a11y-btn" data-a11y-action="highlightLinks" aria-label="הדגשת קישורים">
                            <i class="fas fa-link" aria-hidden="true"></i><span>הדגשת קישורים</span>
                        </button>
                        <button class="a11y-btn" data-a11y-action="bigCursor" aria-label="סמן מוגדל">
                            <i class="fas fa-mouse-pointer" aria-hidden="true"></i><span>סמן מוגדל</span>
                        </button>
                        <button class="a11y-btn" data-a11y-action="pauseAnimations" aria-label="עצירת אנימציות">
                            <i class="fas fa-pause-circle" aria-hidden="true"></i><span>עצירת אנימציות</span>
                        </button>
                    </div>
                </div>

                <div class="a11y-actions">
                    <button class="a11y-btn a11y-btn-reset" data-a11y-action="reset">
                        <i class="fas fa-undo" aria-hidden="true"></i> איפוס הגדרות
                    </button>
                    <a href="#" class="a11y-btn a11y-btn-statement" data-a11y-statement>
                        <i class="fas fa-file-alt" aria-hidden="true"></i> הצהרת נגישות
                    </a>
                </div>

                <p class="a11y-credit">תפריט נגישות בהתאם לתקן ישראלי 5568 ולהנחיות WCAG 2.1 AA</p>
            </div>
        `;
        return panel;
    }

    function buildButton() {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'a11y-toggle';
        btn.id = 'a11y-toggle';
        btn.setAttribute('aria-label', 'פתיחת תפריט נגישות');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-controls', 'a11y-panel');
        btn.innerHTML = '<i class="fas fa-universal-access" aria-hidden="true"></i><span class="a11y-toggle-text">נגישות</span>';
        return btn;
    }

    function getStatementHref() {
        const test = document.querySelector('a[href*="accessibility.html"]');
        if (test) return test.getAttribute('href');
        const path = window.location.pathname;
        if (path.indexOf('/pages/') !== -1) return 'accessibility.html';
        return 'pages/accessibility.html';
    }

    function setupActions(panel, toggleBtn) {
        panel.addEventListener('click', function (e) {
            const target = e.target.closest('[data-a11y-action], [data-a11y-statement]');
            if (!target) return;

            if (target.hasAttribute('data-a11y-statement')) {
                e.preventDefault();
                window.location.href = getStatementHref();
                return;
            }

            const action = target.getAttribute('data-a11y-action');
            const value = target.getAttribute('data-a11y-value');

            switch (action) {
                case 'close':
                    closePanel();
                    return;
                case 'reset':
                    state = Object.assign({}, defaults);
                    break;
                case 'fontInc':
                    state.fontScale = Math.min(state.fontScale + 1, 5);
                    break;
                case 'fontDec':
                    state.fontScale = Math.max(state.fontScale - 1, -2);
                    break;
                case 'contrast':
                    state.contrast = (state.contrast === value) ? 'none' : value;
                    if (state.contrast !== 'none') state.grayscale = false;
                    break;
                case 'grayscale':
                    state.grayscale = !state.grayscale;
                    if (state.grayscale) state.contrast = 'none';
                    break;
                case 'lineHeight':
                    state.lineHeight = state.lineHeight >= 3 ? 0 : state.lineHeight + 1;
                    break;
                case 'letterSpacing':
                    state.letterSpacing = state.letterSpacing >= 2 ? 0 : state.letterSpacing + 1;
                    break;
                case 'highlightLinks':
                case 'readableFont':
                case 'bigCursor':
                case 'pauseAnimations':
                case 'underlineHeadings':
                    state[action] = !state[action];
                    break;
            }

            saveState();
            applyState();
        });

        toggleBtn.addEventListener('click', function () {
            if (panel.hidden) openPanel();
            else closePanel();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && !panel.hidden) closePanel();
        });

        document.addEventListener('click', function (e) {
            if (panel.hidden) return;
            if (panel.contains(e.target) || toggleBtn.contains(e.target)) return;
            closePanel();
        });
    }

    function openPanel() {
        const panel = document.getElementById('a11y-panel');
        const toggle = document.getElementById('a11y-toggle');
        if (!panel || !toggle) return;
        panel.hidden = false;
        requestAnimationFrame(() => panel.classList.add('a11y-panel-open'));
        toggle.setAttribute('aria-expanded', 'true');
        const firstBtn = panel.querySelector('button');
        if (firstBtn) firstBtn.focus();
    }

    function closePanel() {
        const panel = document.getElementById('a11y-panel');
        const toggle = document.getElementById('a11y-toggle');
        if (!panel || !toggle) return;
        panel.classList.remove('a11y-panel-open');
        toggle.setAttribute('aria-expanded', 'false');
        setTimeout(() => { panel.hidden = true; }, 250);
        toggle.focus();
    }

    function injectSkipLink() {
        if (document.querySelector('.a11y-skip-link')) return;
        const skip = document.createElement('a');
        skip.href = '#main-content';
        skip.className = 'a11y-skip-link';
        skip.textContent = 'דלג לתוכן הראשי';
        document.body.insertBefore(skip, document.body.firstChild);
        const main = document.querySelector('main');
        if (main && !main.id) main.id = 'main-content';
    }

    function init() {
        injectSkipLink();
        const panel = buildPanel();
        const toggle = buildButton();
        document.body.appendChild(toggle);
        document.body.appendChild(panel);
        setupActions(panel, toggle);
        applyState();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
