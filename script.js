/**
 * CODE TO IMAGE CONVERTER (restored)
 */

const translations = { en: { app_title: "Code to Image Converter", settings: "Settings", download: "Download", clear: "Clear", format: "Format", copy: "Copy", share: "Share", live_preview: "Live Preview", customization_settings: "Customization Settings", font_family: "Font Family", font_size: "Font Size", line_height: "Line Height", padding: "Padding", window_width: "Window Width", corner_radius: "Corner Radius", show_line_numbers: "Show Line Numbers", window_frame: "Window Frame", drop_shadow: "Drop Shadow", reflection_effect: "Reflection Effect", reset_to_default: "Reset to Default", apply_changes: "Apply Changes", processing: "Processing...", image_downloaded: "Image downloaded successfully", image_copied: "Image copied to clipboard", code_copied: "Code copied as text", code_cleared: "Code cleared", code_formatted: "Code formatted", settings_applied: "Settings applied", settings_reset: "Settings reset", share_link_copied: "Share link copied", download_failed: "Download failed", copy_failed: "Copy failed", format_error: "Format error" } };

class CodeToImageConverter {
    constructor() {
        this.settings = {
            language: 'javascript',
            theme: 'dracula',
            backgroundType: 'gradient',
            gradientStyle: 'warm-flame',
            font: 'jetbrains-mono',
            fontSize: 14,
            lineHeight: 1.5,
            padding: 24,
            width: 600,
            radius: 8,
            showLineNumbers: true,
            showWindowFrame: true,
            showShadow: true,
            showReflection: false,
            exportScale: 2
        };

        this.isDarkMode = false;
        this.currentLanguage = localStorage.getItem('codeToImage_language') || 'en';
        this.languages = { javascript: { name: 'JavaScript', ext: '.js', icon: 'JS' }, typescript: { name: 'TypeScript', ext: '.ts', icon: 'TS' }, python: { name: 'Python', ext: '.py', icon: 'PY' }, java: { name: 'Java', ext: '.java', icon: 'JA' }, cpp: { name: 'C++', ext: '.cpp', icon: 'C+' }, csharp: { name: 'C#', ext: '.cs', icon: 'C#' }, go: { name: 'Go', ext: '.go', icon: 'GO' }, rust: { name: 'Rust', ext: '.rs', icon: 'RS' }, php: { name: 'PHP', ext: '.php', icon: 'PH' }, html: { name: 'HTML', ext: '.html', icon: 'HT' }, css: { name: 'CSS', ext: '.css', icon: 'CS' }, json: { name: 'JSON', ext: '.json', icon: 'JS' } };
        this.themes = { 'dracula': { name: 'Dracula - Dark', bg: '#282a36', color: '#f8f8f2', header: '#44475a' }, 'github-light': { name: 'GitHub - Light', bg: '#ffffff', color: '#24292e', header: '#f6f8fa' }, 'github-dark': { name: 'GitHub - Dark', bg: '#0d1117', color: '#c9d1d9', header: '#21262d' }, 'monokai': { name: 'Monokai - Dark', bg: '#272822', color: '#f8f8f2', header: '#3e3d32' }, 'vs-code': { name: 'VS Code - Dark', bg: '#1e1e1e', color: '#d4d4d4', header: '#2d2d30' }, 'nord': { name: 'Nord - Dark', bg: '#2e3440', color: '#d8dee9', header: '#3b4252' } };
        this.backgroundTypes = { 'gradient': 'Gradient', 'solid': 'Solid Color', 'transparent': 'Transparent' };
        this.gradientStyles = { 'warm-flame': 'Warm Flame', 'night-fade': 'Night Fade', 'spring-warmth': 'Spring Warmth', 'juicy-peach': 'Juicy Peach', 'young-passion': 'Young Passion', 'lady-lips': 'Lady Lips', 'sunny-morning': 'Sunny Morning', 'rainy-ashville': 'Rainy Ashville' };

        this.init();
    }

    init() {
        this.initializeElements();
        this.bindEvents();
        this.initializeTheme();
        this.initializeDropdowns();
        this.loadSettings();
        this.autosizeEditor();
        setTimeout(() => {
            this.updatePreview();
            this.updateLineNumbers();
            this.updateAllDropdowns();
        }, 200);
    }

    initializeElements() {
        this.codeEditor = document.getElementById('codeEditor');
        this.lineNumbers = document.getElementById('lineNumbers');
        this.fileName = document.getElementById('fileName');
        this.highlightedCode = document.getElementById('highlightedCode');
        this.windowTitle = document.getElementById('windowTitle');
        this.windowContent = document.getElementById('windowContent');
        this.previewContainer = document.getElementById('previewContainer');
        this.codeWindow = document.getElementById('codeWindow');
        this.languageDropdown = document.getElementById('languageDropdown');
        this.languageMenu = document.getElementById('languageMenu');
        this.themeDropdown = document.getElementById('themeDropdown');
        this.themeMenu = document.getElementById('themeMenu');
        this.backgroundDropdown = document.getElementById('backgroundDropdown');
        this.backgroundMenu = document.getElementById('backgroundMenu');
        this.gradientDropdown = document.getElementById('gradientDropdown');
        this.gradientMenu = document.getElementById('gradientMenu');
        this.languageSwitcher = document.getElementById('languageSwitcher');
        this.languageSwitcherMenu = document.getElementById('languageSwitcherMenu');
        this.settingsBtn = document.getElementById('settingsBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.formatBtn = document.getElementById('formatBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.shareBtn = document.getElementById('shareBtn');
        this.themeToggle = document.getElementById('themeToggle');
        this.settingsModal = document.getElementById('settingsModal');
        this.closeModalBtn = document.getElementById('closeModalBtn');
        this.applyBtn = document.getElementById('applyBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.fontSelect = document.getElementById('fontSelect');
        this.fontSizeRange = document.getElementById('fontSizeRange');
        this.fontSizeValue = document.getElementById('fontSizeValue');
        this.lineHeightRange = document.getElementById('lineHeightRange');
        this.lineHeightValue = document.getElementById('lineHeightValue');
        this.paddingRange = document.getElementById('paddingRange');
        this.paddingValue = document.getElementById('paddingValue');
        this.widthRange = document.getElementById('widthRange');
        this.widthValue = document.getElementById('widthValue');
        this.radiusRange = document.getElementById('radiusRange');
        this.radiusValue = document.getElementById('radiusValue');
        this.showLineNumbers = document.getElementById('showLineNumbers');
        this.showWindowFrame = document.getElementById('showWindowFrame');
        this.showShadow = document.getElementById('showShadow');
        this.showReflection = document.getElementById('showReflection');
        this.exportScaleRange = document.getElementById('exportScaleRange');
        this.exportScaleValue = document.getElementById('exportScaleValue');
        this.toastContainer = document.getElementById('toastContainer');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.codeEditor.value = this.getDefaultCode();
    }

    bindEvents() {
        this.codeEditor.addEventListener('input', () => { this.updatePreview(); this.updateLineNumbers(); });
        this.codeEditor.addEventListener('scroll', () => { this.syncScroll(); });
        this.settingsBtn.addEventListener('click', () => this.openSettings());
        this.downloadBtn.addEventListener('click', () => this.downloadImage());
        this.clearBtn.addEventListener('click', () => this.clearCode());
        this.formatBtn.addEventListener('click', () => this.formatCode());
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        this.shareBtn.addEventListener('click', () => this.shareCode());
        this.themeToggle.addEventListener('click', () => this.toggleAppTheme());
        this.closeModalBtn.addEventListener('click', () => this.closeSettings());
        this.applyBtn.addEventListener('click', () => this.applySettings());
        this.resetBtn.addEventListener('click', () => this.resetSettings());
        this.fontSizeRange.addEventListener('input', () => this.updateRangeValue('fontSize'));
        this.lineHeightRange.addEventListener('input', () => this.updateRangeValue('lineHeight'));
        this.paddingRange.addEventListener('input', () => this.updateRangeValue('padding'));
        this.widthRange.addEventListener('input', () => this.updateRangeValue('width'));
        this.radiusRange.addEventListener('input', () => this.updateRangeValue('radius'));
        if (this.exportScaleRange) this.exportScaleRange.addEventListener('input', () => this.updateRangeValue('exportScale'));
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    initializeDropdowns() {
        this.initDropdown('language', this.languageDropdown, this.languageMenu, this.languages);
        this.initDropdown('theme', this.themeDropdown, this.themeMenu, this.themes);
        this.initDropdown('backgroundType', this.backgroundDropdown, this.backgroundMenu, this.backgroundTypes);
        this.initDropdown('gradientStyle', this.gradientDropdown, this.gradientMenu, this.gradientStyles);
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('codeToImage_appTheme');
        if (savedTheme) {
            this.isDarkMode = savedTheme === 'dark';
        } else {
            this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        this.applyAppTheme();
    }

    toggleAppTheme() {
        this.isDarkMode = !this.isDarkMode;
        this.applyAppTheme();
        localStorage.setItem('codeToImage_appTheme', this.isDarkMode ? 'dark' : 'light');
        this.showToast(`Switched to ${this.isDarkMode ? 'dark' : 'light'} mode`, '🎨');
    }

    applyAppTheme() {
        const html = document.documentElement;
        html.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
    }

    initDropdown(settingKey, button, menu, options) {
        if (!button || !menu) return;
        button.addEventListener('click', (e) => { e.stopPropagation(); button.parentElement.classList.toggle('open'); });
        menu.addEventListener('click', (e) => {
            const item = e.target.closest('.dropdown-item');
            if (!item) return;
            const value = item.dataset.value;
            this.settings[settingKey] = value;
            this.updateDropdownButton(settingKey, button, options);
            document.querySelectorAll('.dropdown-container').forEach(d => d.classList.remove('open'));
            this.updatePreview();
            this.saveSettings();
        });
    }

    updateDropdownButton(settingKey, button, options) {
        const value = this.settings[settingKey];
        const option = options[value];
        const name = typeof option === 'object' ? option.name : option;
        if (settingKey === 'language') {
            button.querySelector('.dropdown-icon').textContent = this.languages[value].icon;
            button.querySelector('span:nth-child(2)').textContent = this.languages[value].name;
            this.updateFileName();
        } else if (settingKey === 'theme') {
            button.querySelector('.theme-preview').className = `theme-preview ${value}-theme`;
            button.querySelector('span:nth-child(2)').textContent = name;
        } else if (settingKey === 'backgroundType') {
            button.querySelector('.bg-preview').className = `bg-preview ${value}-bg`;
            button.querySelector('span:nth-child(2)').textContent = name;
        } else if (settingKey === 'gradientStyle') {
            button.querySelector('.gradient-preview').className = `gradient-preview ${value}`;
            button.querySelector('span:nth-child(2)').textContent = name;
        }
    }

    updatePreview() {
        const code = this.codeEditor.value || this.getDefaultCode();
        this.highlightedCode.className = `language-${this.settings.language}`;
        this.highlightedCode.textContent = code;
        if (window.Prism && window.Prism.highlightElement) Prism.highlightElement(this.highlightedCode);
        this.applyCodeTheme();
        this.applyBackground();
        this.applyWindowStyles();
    }

    applyCodeTheme() {
        const theme = this.themes[this.settings.theme];
        if (!theme) return;
        this.windowContent.style.background = theme.bg;
        this.windowContent.style.color = theme.color;
        const header = this.codeWindow.querySelector('.window-header');
        if (header) header.style.background = theme.header;
        this.windowContent.style.fontFamily = this.getFontFamily();
        this.windowContent.style.fontSize = this.settings.fontSize + 'px';
        this.windowContent.style.lineHeight = this.settings.lineHeight;
        this.windowContent.style.padding = this.settings.padding + 'px';
    }

    applyBackground() {
        const className = this.settings.backgroundType === 'gradient' ? `preview-container gradient-${this.settings.gradientStyle}` : `preview-container bg-${this.settings.backgroundType}`;
        this.previewContainer.className = className;
    }

    applyWindowStyles() {
        const header = this.codeWindow.querySelector('.window-header');
        if (header) header.style.display = this.settings.showWindowFrame ? 'flex' : 'none';
        this.codeWindow.style.boxShadow = this.settings.showShadow ? 'var(--shadow-xl)' : 'none';
        this.codeWindow.style.maxWidth = this.settings.width + 'px';
        this.codeWindow.style.borderRadius = this.settings.radius + 'px';
        if (this.settings.showReflection) this.codeWindow.classList.add('reflect'); else this.codeWindow.classList.remove('reflect');
    }

    getFontFamily() {
        const fontMap = { 'jetbrains-mono': 'JetBrains Mono', 'fira-code': 'Fira Code', 'source-code-pro': 'Source Code Pro', 'ibm-plex-mono': 'IBM Plex Mono', 'space-mono': 'Space Mono', 'ubuntu-mono': 'Ubuntu Mono', 'roboto-mono': 'Roboto Mono', 'inconsolata': 'Inconsolata', 'cascadia-code': 'Cascadia Code', 'monaco': 'Monaco', 'consolas': 'Consolas' };
        return fontMap[this.settings.font] + ', monospace';
    }

    updateLineNumbers() {
        const lines = (this.codeEditor.value || '').split('\n').length;
        let out = '';
        for (let i = 1; i <= lines; i++) out += i + '\n';
        this.lineNumbers.textContent = out.trim();
        this.lineNumbers.style.display = this.settings.showLineNumbers ? 'block' : 'none';
    }

    syncScroll() { this.lineNumbers.scrollTop = this.codeEditor.scrollTop; }

    updateFileName() {
        const lang = this.languages[this.settings.language];
        const filename = `main${lang.ext}`;
        this.fileName.textContent = filename;
        this.windowTitle.textContent = filename;
    }

    getDefaultCode() {
        return `function fibonacci(n) {\n    if (n <= 1) return n;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nfor (let i = 0; i < 10; i++) {\n    console.log(\`F(\${i}) = \${fibonacci(i)}\`);\n}`;
    }

    clearCode() { this.codeEditor.value = ''; this.updatePreview(); this.updateLineNumbers(); this.showToast(this.t('code_cleared'), '🗑️'); }

    formatCode() {
        try {
            if (this.settings.language === 'json') {
                this.codeEditor.value = JSON.stringify(JSON.parse(this.codeEditor.value), null, 2);
            }
            this.updatePreview(); this.updateLineNumbers(); this.showToast(this.t('code_formatted'), '✨');
        } catch { this.showToast(this.t('format_error'), '❌'); }
    }

    async downloadImage() {
        const canvas = await this.generateCanvas();
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png', 1.0);
        link.download = `code-snippet-${Date.now()}.png`;
        document.body.appendChild(link); link.click(); document.body.removeChild(link);
        this.showToast(this.t('image_downloaded'), '📥');
    }

    async generateCanvas() {
        const element = this.codeWindow;
        if (!element || !element.offsetWidth || !element.offsetHeight) throw new Error('Preview element not ready');
        if (typeof html2canvas === 'undefined') throw new Error('html2canvas library not loaded');
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute'; tempContainer.style.left = '-9999px'; tempContainer.style.top = '0'; tempContainer.style.padding = '40px';
        const clonedWindow = element.cloneNode(true);
        clonedWindow.style.transform = 'none'; clonedWindow.style.transition = 'none'; clonedWindow.style.position = 'static'; clonedWindow.style.margin = '0';
        tempContainer.appendChild(clonedWindow);
        if (this.settings.backgroundType === 'gradient') tempContainer.style.background = 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)';
        if (this.settings.backgroundType === 'solid') tempContainer.style.background = '#0969da';
        document.body.appendChild(tempContainer);
        const options = { backgroundColor: this.settings.backgroundType === 'transparent' ? null : 'transparent', scale: Math.max(1, Number(this.settings.exportScale) || 2), useCORS: true, allowTaint: true, foreignObjectRendering: false, logging: false, width: tempContainer.offsetWidth, height: tempContainer.offsetHeight, x: 0, y: 0 };
        const canvas = await html2canvas(tempContainer, options);
        document.body.removeChild(tempContainer);
        return canvas;
    }

    openSettings() { this.loadSettingsToModal(); this.settingsModal.classList.add('active'); }
    closeSettings() { this.settingsModal.classList.remove('active'); }

    loadSettingsToModal() {
        this.fontSelect.value = this.settings.font;
        this.fontSizeRange.value = this.settings.fontSize;
        this.lineHeightRange.value = this.settings.lineHeight;
        this.paddingRange.value = this.settings.padding;
        this.widthRange.value = this.settings.width;
        this.radiusRange.value = this.settings.radius;
        this.showLineNumbers.checked = this.settings.showLineNumbers;
        this.showWindowFrame.checked = this.settings.showWindowFrame;
        this.showShadow.checked = this.settings.showShadow;
        this.showReflection.checked = this.settings.showReflection;
        if (this.exportScaleRange) this.exportScaleRange.value = this.settings.exportScale;
        this.updateAllRangeValues();
    }

    applySettings() {
        this.settings.font = this.fontSelect.value;
        this.settings.fontSize = parseInt(this.fontSizeRange.value);
        this.settings.lineHeight = parseFloat(this.lineHeightRange.value);
        this.settings.padding = parseInt(this.paddingRange.value);
        this.settings.width = parseInt(this.widthRange.value);
        this.settings.radius = parseInt(this.radiusRange.value);
        this.settings.showLineNumbers = this.showLineNumbers.checked;
        this.settings.showWindowFrame = this.showWindowFrame.checked;
        this.settings.showShadow = this.showShadow.checked;
        this.settings.showReflection = this.showReflection.checked;
        if (this.exportScaleRange) this.settings.exportScale = parseInt(this.exportScaleRange.value);
        this.updatePreview(); this.updateLineNumbers(); this.saveSettings(); this.closeSettings(); this.showToast(this.t('settings_applied'), '⚙️');
    }

    resetSettings() {
        this.settings = { language: 'javascript', theme: 'dracula', backgroundType: 'gradient', gradientStyle: 'warm-flame', font: 'jetbrains-mono', fontSize: 14, lineHeight: 1.5, padding: 24, width: 600, radius: 8, showLineNumbers: true, showWindowFrame: true, showShadow: true, showReflection: false, exportScale: 2 };
        this.loadSettingsToModal(); this.updatePreview(); this.updateLineNumbers(); this.initializeDropdowns(); this.showToast(this.t('settings_reset'), '🔄');
    }

    updateRangeValue(type) {
        const range = this[type + 'Range']; const value = this[type + 'Value'];
        const unit = type === 'lineHeight' ? '' : (['fontSize', 'padding', 'width', 'radius'].includes(type) ? 'px' : (type === 'exportScale' ? 'x' : ''));
        value.textContent = range.value + unit;
    }

    updateAllRangeValues() { this.updateRangeValue('fontSize'); this.updateRangeValue('lineHeight'); this.updateRangeValue('padding'); this.updateRangeValue('width'); this.updateRangeValue('radius'); if (this.exportScaleRange) this.updateRangeValue('exportScale'); }

    saveSettings() { localStorage.setItem('codeToImage_settings', JSON.stringify(this.settings)); }
    loadSettings() { const saved = localStorage.getItem('codeToImage_settings'); if (saved) { try { this.settings = { ...this.settings, ...JSON.parse(saved) }; } catch {} } setTimeout(() => { this.updateAllDropdowns(); this.updateFileName(); }, 100); }

    handleKeyboard(event) { if ((event.ctrlKey || event.metaKey) && event.key === 's') { event.preventDefault(); this.downloadImage(); } }

    t(key) { return (translations[this.currentLanguage] && translations[this.currentLanguage][key]) || translations.en[key] || key; }

    showToast(message, icon = '✅') { const toast = document.createElement('div'); toast.className = 'toast'; toast.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-message">${message}</span><button class="toast-close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>`; toast.querySelector('.toast-close').addEventListener('click', () => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }); document.getElementById('toastContainer').appendChild(toast); setTimeout(() => toast.classList.add('show'), 10); setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 4000); }

    autosizeEditor() { if (!this.codeEditor) return; const resize = () => { this.codeEditor.style.height = 'auto'; const maxHeight = 600, minHeight = 300; const newHeight = Math.min(maxHeight, Math.max(minHeight, this.codeEditor.scrollHeight + 16)); this.codeEditor.style.height = newHeight + 'px'; }; resize(); this.codeEditor.addEventListener('input', this.debounce(resize, 80)); }

    debounce(func, wait) { let timeout; return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => func(...args), wait); }; }
}

document.addEventListener('DOMContentLoaded', () => { window.codeConverter = new CodeToImageConverter(); });

