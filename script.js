/**
 * CODE TO IMAGE CONVERTER
 * Minimalistic & Professional Web App
 */

// Internationalization translations
const translations = {
    en: {
        app_title: "Code to Image Converter",
        settings: "Settings",
        download: "Download",
        clear: "Clear",
        format: "Format",
        copy: "Copy",
        share: "Share",
        live_preview: "Live Preview",
        customization_settings: "Customization Settings",
        font_family: "Font Family",
        font_size: "Font Size",
        line_height: "Line Height",
        padding: "Padding",
        window_width: "Window Width",
        corner_radius: "Corner Radius",
        show_line_numbers: "Show Line Numbers",
        window_frame: "Window Frame",
        drop_shadow: "Drop Shadow",
        reflection_effect: "Reflection Effect",
        reset_to_default: "Reset to Default",
        apply_changes: "Apply Changes",
        processing: "Processing...",
        image_downloaded: "Image downloaded successfully",
        image_copied: "Image copied to clipboard",
        code_copied: "Code copied as text",
        code_cleared: "Code cleared",
        code_formatted: "Code formatted",
        settings_applied: "Settings applied",
        settings_reset: "Settings reset",
        share_link_copied: "Share link copied",
        download_failed: "Download failed",
        copy_failed: "Copy failed",
        format_error: "Format error"
    },
    ru: {
        app_title: "Конвертер Кода в Изображение",
        settings: "Настройки",
        download: "Скачать",
        clear: "Очистить",
        format: "Форматировать",
        copy: "Копировать",
        share: "Поделиться",
        live_preview: "Превью",
        customization_settings: "Настройки оформления",
        font_family: "Семейство шрифтов",
        font_size: "Размер шрифта",
        line_height: "Высота строки",
        padding: "Отступы",
        window_width: "Ширина окна",
        corner_radius: "Радиус углов",
        show_line_numbers: "Показать номера строк",
        window_frame: "Рамка окна",
        drop_shadow: "Тень",
        reflection_effect: "Эффект отражения",
        reset_to_default: "Сбросить",
        apply_changes: "Применить",
        processing: "Обработка...",
        image_downloaded: "Изображение скачано",
        image_copied: "Изображение скопировано",
        code_copied: "Код скопирован как текст",
        code_cleared: "Код очищен",
        code_formatted: "Код отформатирован",
        settings_applied: "Настройки применены",
        settings_reset: "Настройки сброшены",
        share_link_copied: "Ссылка скопирована",
        download_failed: "Ошибка загрузки",
        copy_failed: "Ошибка копирования",
        format_error: "Ошибка форматирования"
    },
    uz: {
        app_title: "Kod ni Rasmga O'tkazuvchi",
        settings: "Sozlamalar",
        download: "Yuklab olish",
        clear: "Tozalash",
        format: "Formatlash",
        copy: "Nusxalash",
        share: "Ulashish",
        live_preview: "Jonli ko'rinish",
        customization_settings: "Moslash sozlamalari",
        font_family: "Shrift oilasi",
        font_size: "Shrift o'lchami",
        line_height: "Qator balandligi",
        padding: "Bo'shliq",
        window_width: "Oyna kengligi",
        corner_radius: "Burchak radiusi",
        show_line_numbers: "Qator raqamlarini ko'rsatish",
        window_frame: "Oyna ramkasi",
        drop_shadow: "Soya",
        reflection_effect: "Aks ettirish effekti",
        reset_to_default: "Boshlang'ich holatga",
        apply_changes: "Qo'llash",
        processing: "Ishlov berish...",
        image_downloaded: "Rasm yuklab olindi",
        image_copied: "Rasm nusxalandi",
        code_copied: "Kod matn sifatida nusxalandi",
        code_cleared: "Kod tozalandi",
        code_formatted: "Kod formatlandi",
        settings_applied: "Sozlamalar qo'llandi",
        settings_reset: "Sozlamalar qaytarildi",
        share_link_copied: "Havola nusxalandi",
        download_failed: "Yuklab olishda xato",
        copy_failed: "Nusxalashda xato",
        format_error: "Formatlashda xato"
    }
};

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
            showReflection: false
        };
        
        this.isDarkMode = false;
        this.isProcessing = false;
        this.currentLanguage = localStorage.getItem('codeToImage_language') || 'en';
        
        this.languages = {
            javascript: { name: 'JavaScript', ext: '.js', icon: 'JS' },
            typescript: { name: 'TypeScript', ext: '.ts', icon: 'TS' },
            python: { name: 'Python', ext: '.py', icon: 'PY' },
            java: { name: 'Java', ext: '.java', icon: 'JA' },
            cpp: { name: 'C++', ext: '.cpp', icon: 'C+' },
            csharp: { name: 'C#', ext: '.cs', icon: 'C#' },
            go: { name: 'Go', ext: '.go', icon: 'GO' },
            rust: { name: 'Rust', ext: '.rs', icon: 'RS' },
            php: { name: 'PHP', ext: '.php', icon: 'PH' },
            html: { name: 'HTML', ext: '.html', icon: 'HT' },
            css: { name: 'CSS', ext: '.css', icon: 'CS' },
            json: { name: 'JSON', ext: '.json', icon: 'JS' }
        };
        
        this.themes = {
            'dracula': { name: 'Dracula - Dark', bg: '#282a36', color: '#f8f8f2', header: '#44475a' },
            'github-light': { name: 'GitHub - Light', bg: '#ffffff', color: '#24292e', header: '#f6f8fa' },
            'github-dark': { name: 'GitHub - Dark', bg: '#0d1117', color: '#c9d1d9', header: '#21262d' },
            'monokai': { name: 'Monokai - Dark', bg: '#272822', color: '#f8f8f2', header: '#3e3d32' },
            'vs-code': { name: 'VS Code - Dark', bg: '#1e1e1e', color: '#d4d4d4', header: '#2d2d30' },
            'nord': { name: 'Nord - Dark', bg: '#2e3440', color: '#d8dee9', header: '#3b4252' }
        };
        
        this.backgroundTypes = {
            'gradient': 'Gradient',
            'solid': 'Solid Color',
            'transparent': 'Transparent'
        };
        
        this.gradientStyles = {
            'warm-flame': 'Warm Flame',
            'night-fade': 'Night Fade',
            'spring-warmth': 'Spring Warmth',
            'juicy-peach': 'Juicy Peach',
            'young-passion': 'Young Passion',
            'lady-lips': 'Lady Lips',
            'sunny-morning': 'Sunny Morning',
            'rainy-ashville': 'Rainy Ashville'
        };
        
        this.init();
    }
    
    init() {
        try {
        this.initializeElements();
        this.bindEvents();
            this.initializeTheme();
            this.initializeDropdowns();
        this.loadSettings();
            
            // Wait for DOM to be fully ready
            setTimeout(() => {
                this.translateInterface();
        this.updatePreview();
        this.updateLineNumbers();
                this.updateAllDropdowns();
            }, 200);
        } catch (error) {
            console.error('Initialization error:', error);
            this.showToast('Initialization failed', '❌');
        }
    }
    
    initializeElements() {
        // Editor elements
        this.codeEditor = document.getElementById('codeEditor');
        this.lineNumbers = document.getElementById('lineNumbers');
        this.fileName = document.getElementById('fileName');
        this.highlightedCode = document.getElementById('highlightedCode');
        this.windowTitle = document.getElementById('windowTitle');
        this.windowContent = document.getElementById('windowContent');
        this.previewContainer = document.getElementById('previewContainer');
        this.codeWindow = document.getElementById('codeWindow');
        
        // Check if critical elements exist
        if (!this.codeEditor || !this.previewContainer || !this.codeWindow) {
            throw new Error('Critical DOM elements not found');
        }
        
        // Dropdown elements
        this.languageDropdown = document.getElementById('languageDropdown');
        this.languageMenu = document.getElementById('languageMenu');
        this.themeDropdown = document.getElementById('themeDropdown');
        this.themeMenu = document.getElementById('themeMenu');
        this.backgroundDropdown = document.getElementById('backgroundDropdown');
        this.backgroundMenu = document.getElementById('backgroundMenu');
        this.gradientDropdown = document.getElementById('gradientDropdown');
        this.gradientMenu = document.getElementById('gradientMenu');
        
        // Language Switcher
        this.languageSwitcher = document.getElementById('languageSwitcher');
        this.languageSwitcherMenu = document.getElementById('languageSwitcherMenu');
        
        // Button elements
        this.settingsBtn = document.getElementById('settingsBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.formatBtn = document.getElementById('formatBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.shareBtn = document.getElementById('shareBtn');
        this.themeToggle = document.getElementById('themeToggle');
        
        // Modal elements
        this.settingsModal = document.getElementById('settingsModal');
        this.closeModalBtn = document.getElementById('closeModalBtn');
        this.applyBtn = document.getElementById('applyBtn');
        this.resetBtn = document.getElementById('resetBtn');
        
        // Settings elements
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
        
        // Utility elements
        this.toastContainer = document.getElementById('toastContainer');
        this.loadingOverlay = document.getElementById('loadingOverlay');
    }
    
    bindEvents() {
        // Editor events
        this.codeEditor.addEventListener('input', () => {
            this.updatePreview();
            this.updateLineNumbers();
        });
        
        this.codeEditor.addEventListener('scroll', () => {
            this.syncScroll();
        });
        
        // Button events
        this.settingsBtn.addEventListener('click', () => this.openSettings());
        this.downloadBtn.addEventListener('click', () => this.downloadImage());
        this.clearBtn.addEventListener('click', () => this.clearCode());
        this.formatBtn.addEventListener('click', () => this.formatCode());
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        this.shareBtn.addEventListener('click', () => this.shareCode());
        this.themeToggle.addEventListener('click', () => this.toggleAppTheme());
        
        // Modal events
        this.closeModalBtn.addEventListener('click', () => this.closeSettings());
        this.applyBtn.addEventListener('click', () => this.applySettings());
        this.resetBtn.addEventListener('click', () => this.resetSettings());
        
        // Settings events
        this.fontSizeRange.addEventListener('input', () => this.updateRangeValue('fontSize'));
        this.lineHeightRange.addEventListener('input', () => this.updateRangeValue('lineHeight'));
        this.paddingRange.addEventListener('input', () => this.updateRangeValue('padding'));
        this.widthRange.addEventListener('input', () => this.updateRangeValue('width'));
        this.radiusRange.addEventListener('input', () => this.updateRangeValue('radius'));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Prevent default browser shortcuts that conflict with app
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
            }
        });
        
        // Close modal on backdrop click
        this.settingsModal.addEventListener('click', (e) => {
            if (e.target === this.settingsModal) {
                this.closeSettings();
            }
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            this.closeAllDropdowns(e);
        });
    }
    
    initializeDropdowns() {
        this.initDropdown('language', this.languageDropdown, this.languageMenu, this.languages);
        this.initDropdown('theme', this.themeDropdown, this.themeMenu, this.themes);
        this.initDropdown('backgroundType', this.backgroundDropdown, this.backgroundMenu, this.backgroundTypes);
        this.initDropdown('gradientStyle', this.gradientDropdown, this.gradientMenu, this.gradientStyles);
        
        // Initialize language switcher
        this.initLanguageSwitcher();
    }
    
    initLanguageSwitcher() {
        if (!this.languageSwitcher || !this.languageSwitcherMenu) return;
        
        this.languageSwitcher.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown(this.languageSwitcher.parentElement);
        });
        
        this.languageSwitcherMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            const item = e.target.closest('.dropdown-item');
            if (item) {
                const value = item.dataset.value;
                this.setLanguage(value);
                this.closeAllDropdowns();
            }
        });
        
        // Update language switcher display
        this.updateLanguageSwitcher();
    }
    
    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('codeToImage_language', lang);
        this.updateLanguageSwitcher();
        this.translateInterface();
    }
    
    updateLanguageSwitcher() {
        if (!this.languageSwitcher) return;
        
        const flags = { en: '🇺🇸', ru: '🇷🇺', uz: '🇺🇿' };
        const names = { en: 'EN', ru: 'RU', uz: 'UZ' };
        
        const flagSpan = this.languageSwitcher.querySelector('.flag-icon');
        const textSpan = this.languageSwitcher.querySelector('span:nth-child(2)');
        
        if (flagSpan) flagSpan.textContent = flags[this.currentLanguage];
        if (textSpan) textSpan.textContent = names[this.currentLanguage];
    }
    
    translateInterface() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[this.currentLanguage] && translations[this.currentLanguage][key]) {
                element.textContent = translations[this.currentLanguage][key];
            }
        });
    }
    
    t(key) {
        return translations[this.currentLanguage] && translations[this.currentLanguage][key] 
            ? translations[this.currentLanguage][key] 
            : translations.en[key] || key;
    }
    
    initDropdown(settingKey, button, menu, options) {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown(button.parentElement);
        });
        
        menu.addEventListener('click', (e) => {
            e.stopPropagation();
            const item = e.target.closest('.dropdown-item');
            if (item) {
                const value = item.dataset.value;
                this.settings[settingKey] = value;
                this.updateDropdownButton(settingKey, button, options);
                this.closeAllDropdowns();
                this.updatePreview();
                this.saveSettings();
            }
        });
    }
    
    updateDropdownButton(settingKey, button, options) {
        const value = this.settings[settingKey];
        const option = options[value];
        const name = typeof option === 'object' ? option.name : option;
        
        if (settingKey === 'language') {
            const iconSpan = button.querySelector('.dropdown-icon');
            const textSpan = button.querySelector('span:nth-child(2)');
            iconSpan.textContent = this.languages[value].icon;
            textSpan.textContent = this.languages[value].name;
            this.updateFileName();
        } else if (settingKey === 'theme') {
            const previewSpan = button.querySelector('.theme-preview');
            const textSpan = button.querySelector('span:nth-child(2)');
            previewSpan.className = `theme-preview ${value}-theme`;
            textSpan.textContent = name;
        } else if (settingKey === 'backgroundType') {
            const previewSpan = button.querySelector('.bg-preview');
            const textSpan = button.querySelector('span:nth-child(2)');
            previewSpan.className = `bg-preview ${value}-bg`;
            textSpan.textContent = name;
        } else if (settingKey === 'gradientStyle') {
            const previewSpan = button.querySelector('.gradient-preview');
            const textSpan = button.querySelector('span:nth-child(2)');
            previewSpan.className = `gradient-preview ${value}`;
            textSpan.textContent = name;
        }
    }
    
    toggleDropdown(container) {
        const isOpen = container.classList.contains('open');
        this.closeAllDropdowns();
        if (!isOpen) {
            container.classList.add('open');
        }
    }
    
    closeAllDropdowns(event) {
        const dropdowns = document.querySelectorAll('.dropdown-container');
        dropdowns.forEach(dropdown => {
            if (!event || !dropdown.contains(event.target)) {
                dropdown.classList.remove('open');
            }
        });
    }
    
    initializeTheme() {
        const savedTheme = localStorage.getItem('codeToImage_appTheme');
        this.isDarkMode = savedTheme === 'dark';
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
        if (this.isDarkMode) {
            html.setAttribute('data-theme', 'dark');
            document.body.className = 'dark-theme'; // Legacy support
        } else {
            html.setAttribute('data-theme', 'light');
            document.body.className = 'light-theme'; // Legacy support
        }
    }
    
    updatePreview() {
        if (!this.codeEditor || !this.highlightedCode) {
            console.warn('Preview elements not ready yet');
            return;
        }
        
        try {
            const code = this.codeEditor.value || this.getDefaultCode();
        
        // Update syntax highlighting
            this.highlightedCode.className = `language-${this.settings.language}`;
        this.highlightedCode.textContent = code;
        
            if (window.Prism && window.Prism.highlightElement) {
            Prism.highlightElement(this.highlightedCode);
        }
        
            this.applyCodeTheme();
            this.applyBackground();
            this.applyWindowStyles();
        } catch (error) {
            console.error('Error updating preview:', error);
        }
    }
    
    applyCodeTheme() {
        if (!this.windowContent || !this.codeWindow) {
            console.warn('Window elements not ready for theme application');
            return;
        }
        
        try {
            const theme = this.themes[this.settings.theme];
            if (!theme) {
                console.warn('Theme not found:', this.settings.theme);
                return;
            }
            
            this.windowContent.style.background = theme.bg;
            this.windowContent.style.color = theme.color;
            
            const header = this.codeWindow.querySelector('.window-header');
            if (header) {
                header.style.background = theme.header;
            }
            
            // Apply font settings
            this.windowContent.style.fontFamily = this.getFontFamily();
            this.windowContent.style.fontSize = this.settings.fontSize + 'px';
            this.windowContent.style.lineHeight = this.settings.lineHeight;
            this.windowContent.style.padding = this.settings.padding + 'px';
        } catch (error) {
            console.error('Error applying code theme:', error);
        }
    }
    
    applyBackground() {
        if (!this.previewContainer) {
            console.warn('Preview container not ready for background application');
            return;
        }
        
        try {
            const className = this.settings.backgroundType === 'gradient' 
                ? `preview-container gradient-${this.settings.gradientStyle}`
                : `preview-container bg-${this.settings.backgroundType}`;
            
            this.previewContainer.className = className;
            
            // Apply CSS custom properties for gradients
            const gradients = {
                'warm-flame': 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
                'night-fade': 'linear-gradient(45deg, #a18cd1 0%, #fbc2eb 100%)',
                'spring-warmth': 'linear-gradient(45deg, #fad0c4 0%, #ffd1ff 100%)',
                'juicy-peach': 'linear-gradient(45deg, #ffecd2 0%, #fcb69f 100%)',
                'young-passion': 'linear-gradient(45deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)',
                'lady-lips': 'linear-gradient(45deg, #ff9a9e 0%, #f6416c 100%)',
                'sunny-morning': 'linear-gradient(45deg, #f6d365 0%, #fda085 100%)',
                'rainy-ashville': 'linear-gradient(45deg, #fbc2eb 0%, #a6c1ee 100%)'
            };
            
            if (this.settings.backgroundType === 'gradient' && gradients[this.settings.gradientStyle]) {
                this.previewContainer.style.background = gradients[this.settings.gradientStyle];
            } else if (this.settings.backgroundType === 'solid') {
                this.previewContainer.style.background = 'var(--accent-blue)';
            } else {
                this.previewContainer.style.background = 'transparent';
            }
        } catch (error) {
            console.error('Error applying background:', error);
        }
    }
    
    applyWindowStyles() {
        if (!this.codeWindow) {
            console.warn('Code window not ready for style application');
            return;
        }

        try {
            // Apply window frame visibility
            const header = this.codeWindow.querySelector('.window-header');
            if (header) {
                header.style.display = this.settings.showWindowFrame ? 'flex' : 'none';
            }

            // Apply shadow
            this.codeWindow.style.boxShadow = this.settings.showShadow ? 'var(--shadow-xl)' : 'none';

            // Apply width and border radius
            this.codeWindow.style.maxWidth = this.settings.width + 'px';
            this.codeWindow.style.borderRadius = this.settings.radius + 'px';

            // Apply reflection effect
            const reflectionDisplay = this.settings.showReflection ? 'block' : 'none';
            this.codeWindow.style.setProperty('--reflection-display', reflectionDisplay);
        } catch (error) {
            console.error('Error applying window styles:', error);
        }
    }
    
    getFontFamily() {
        const fontMap = {
            'jetbrains-mono': 'JetBrains Mono',
            'fira-code': 'Fira Code',
            'source-code-pro': 'Source Code Pro',
            'ibm-plex-mono': 'IBM Plex Mono',
            'space-mono': 'Space Mono',
            'ubuntu-mono': 'Ubuntu Mono',
            'roboto-mono': 'Roboto Mono',
            'inconsolata': 'Inconsolata',
            'cascadia-code': 'Cascadia Code',
            'monaco': 'Monaco',
            'consolas': 'Consolas'
        };
        return fontMap[this.settings.font] + ', monospace';
    }
    
    updateLineNumbers() {
        const lines = this.codeEditor.value.split('\n').length;
        let lineNumbersHTML = '';
        
        for (let i = 1; i <= lines; i++) {
            lineNumbersHTML += i + '\n';
        }
        
        this.lineNumbers.textContent = lineNumbersHTML.trim();
        this.lineNumbers.style.display = this.settings.showLineNumbers ? 'block' : 'none';
    }
    
    syncScroll() {
        this.lineNumbers.scrollTop = this.codeEditor.scrollTop;
    }
    
    updateFileName() {
        const lang = this.languages[this.settings.language];
        const filename = `main${lang.ext}`;
        this.fileName.textContent = filename;
        this.windowTitle.textContent = filename;
    }
    
    getDefaultCode() {
        const examples = {
            javascript: `function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Generate first 10 Fibonacci numbers
for (let i = 0; i < 10; i++) {
    console.log(\`F(\${i}) = \${fibonacci(i)}\`);
}`,
            typescript: `interface User {
    id: number;
    name: string;
    email: string;
}

class UserService {
    private users: User[] = [];
    
    addUser(user: User): void {
        this.users.push(user);
    }
    
    getUser(id: number): User | undefined {
        return this.users.find(user => user.id === id);
    }
}`,
            python: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Generate first 10 Fibonacci numbers
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")`,
            java: `public class Fibonacci {
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            System.out.println("F(" + i + ") = " + fibonacci(i));
        }
    }
}`,
            html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Web App</title>
</head>
<body>
    <main>
        <h1>Hello, World!</h1>
        <p>Welcome to the future of web development.</p>
    </main>
</body>
</html>`,
            css: `.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
}`
        };
        
        return examples[this.settings.language] || examples.javascript;
    }
    
    clearCode() {
        this.codeEditor.value = '';
        this.updatePreview();
        this.updateLineNumbers();
        this.showToast(this.t('code_cleared'), '🗑️');
    }
    
    formatCode() {
        const code = this.codeEditor.value;
        let formatted = code;
        
        try {
            if (this.settings.language === 'json') {
                formatted = JSON.stringify(JSON.parse(code), null, 2);
            } else if (this.settings.language === 'html') {
                // Basic HTML formatting
                formatted = code
                    .replace(/></g, '>\n<')
                    .replace(/^\s*\n/gm, '');
            } else if (this.settings.language === 'css') {
                // Basic CSS formatting
                formatted = code
                    .replace(/{\s*/g, ' {\n    ')
                    .replace(/;\s*/g, ';\n    ')
                    .replace(/}\s*/g, '\n}\n\n');
            }
            
            this.codeEditor.value = formatted;
            this.updatePreview();
            this.updateLineNumbers();
            this.showToast(this.t('code_formatted'), '✨');
        } catch (error) {
            this.showToast(this.t('format_error'), '❌');
        }
    }
    
    async downloadImage() {
        if (this.isProcessing) return;
        
        this.showLoading(true);
        this.isProcessing = true;
        
        try {
            // Try html2canvas first
            let canvas;
            try {
                canvas = await this.generateCanvas();
            } catch (html2canvasError) {
                console.warn('html2canvas failed, trying alternative method:', html2canvasError);
                // Fallback to SVG-based export
                canvas = await this.generateCanvasFallback();
            }
            
            const link = document.createElement('a');
            const filename = `code-snippet-${Date.now()}.png`;
            const dataUrl = canvas.toDataURL('image/png', 1.0);
            
            // Check if canvas is empty (white)
            if (this.isCanvasEmpty(canvas)) {
                throw new Error('Generated image is empty');
            }
            
            link.href = dataUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            this.showToast(this.t('image_downloaded'), '📥');
        } catch (error) {
            console.error('Download failed:', error);
            this.showToast(this.t('download_failed') + ' - ' + error.message, '❌');
        } finally {
            this.showLoading(false);
            this.isProcessing = false;
        }
    }
    
    isCanvasEmpty(canvas) {
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Check if all pixels are white or transparent
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];
            
            // If we find any non-white, non-transparent pixel, canvas is not empty
            if (!(r === 255 && g === 255 && b === 255) && a !== 0) {
                return false;
            }
        }
        return true;
    }
    
    async generateCanvasFallback() {
        // Alternative method using canvas drawing
        const element = this.codeWindow;
        const rect = element.getBoundingClientRect();
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Polyfill for roundRect if not available
        if (!ctx.roundRect) {
            ctx.roundRect = function(x, y, width, height, radii) {
                const radius = Array.isArray(radii) ? radii[0] : radii;
                this.beginPath();
                this.moveTo(x + radius, y);
                this.lineTo(x + width - radius, y);
                this.quadraticCurveTo(x + width, y, x + width, y + radius);
                this.lineTo(x + width, y + height - radius);
                this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
                this.lineTo(x + radius, y + height);
                this.quadraticCurveTo(x, y + height, x, y + height - radius);
                this.lineTo(x, y + radius);
                this.quadraticCurveTo(x, y, x + radius, y);
                this.closePath();
            };
        }
        
        // Set canvas size
        canvas.width = (rect.width + 80) * 2; // 2x for high DPI
        canvas.height = (rect.height + 80) * 2;
        
        // Scale for high DPI
        ctx.scale(2, 2);
        
        // Draw background
        const padding = 40;
        if (this.settings.backgroundType === 'gradient') {
            const gradient = ctx.createLinearGradient(0, 0, canvas.width / 2, canvas.height / 2);
            gradient.addColorStop(0, '#ff9a9e');
            gradient.addColorStop(1, '#fecfef');
            ctx.fillStyle = gradient;
        } else if (this.settings.backgroundType === 'solid') {
            ctx.fillStyle = '#0969da';
        } else {
            ctx.fillStyle = 'transparent';
        }
        
        if (this.settings.backgroundType !== 'transparent') {
            ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2);
        }
        
        // Draw window background
        const windowX = padding;
        const windowY = padding;
        const windowWidth = rect.width;
        const windowHeight = rect.height;
        
        // Window background
        ctx.fillStyle = this.themes[this.settings.theme].bg;
        ctx.roundRect(windowX, windowY, windowWidth, windowHeight, this.settings.radius);
        ctx.fill();
        
        // Window header if enabled
        if (this.settings.showWindowFrame) {
            ctx.fillStyle = this.themes[this.settings.theme].header;
            ctx.roundRect(windowX, windowY, windowWidth, 40, [this.settings.radius, this.settings.radius, 0, 0]);
            ctx.fill();
            
            // Window controls
            const controlY = windowY + 14;
            const controls = [
                { x: windowX + 16, color: '#ff5f56' },
                { x: windowX + 36, color: '#ffbd2e' },
                { x: windowX + 56, color: '#27ca3f' }
            ];
            
            controls.forEach(control => {
                ctx.beginPath();
                ctx.arc(control.x, controlY, 6, 0, 2 * Math.PI);
                ctx.fillStyle = control.color;
                ctx.fill();
            });
            
            // Window title
            ctx.fillStyle = this.themes[this.settings.theme].color;
            ctx.font = '12px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.windowTitle.textContent, windowX + windowWidth / 2, controlY + 4);
        }
        
        // Draw code content
        const codeY = windowY + (this.settings.showWindowFrame ? 50 : 10);
        const codeText = this.codeEditor.value || this.getDefaultCode();
        const lines = codeText.split('\n');
        
        ctx.fillStyle = this.themes[this.settings.theme].color;
        ctx.font = `${this.settings.fontSize}px monospace`;
        ctx.textAlign = 'left';
        
        lines.forEach((line, index) => {
            const lineY = codeY + (index * this.settings.fontSize * this.settings.lineHeight);
            ctx.fillText(line, windowX + this.settings.padding, lineY);
        });
        
        return canvas;
    }
    
    async copyToClipboard() {
        if (this.isProcessing) return;
        
        this.showLoading(true);
        this.isProcessing = true;
        
        try {
            if (navigator.clipboard && window.ClipboardItem) {
                // Try html2canvas first, fallback if needed
                let canvas;
                try {
                    canvas = await this.generateCanvas();
                } catch (html2canvasError) {
                    console.warn('html2canvas failed for copy, trying alternative method:', html2canvasError);
                    canvas = await this.generateCanvasFallback();
                }
                
                // Check if canvas is empty
                if (this.isCanvasEmpty(canvas)) {
                    throw new Error('Generated image is empty');
                }
                
                canvas.toBlob(async (blob) => {
                    try {
                        const item = new ClipboardItem({ 'image/png': blob });
                        await navigator.clipboard.write([item]);
                        this.showToast(this.t('image_copied'), '📋');
                    } catch (error) {
                        this.fallbackCopyText();
                    } finally {
                        this.showLoading(false);
                        this.isProcessing = false;
                    }
                });
            } else {
                this.fallbackCopyText();
                this.showLoading(false);
                this.isProcessing = false;
            }
        } catch (error) {
            console.error('Copy failed:', error);
            this.showToast(this.t('copy_failed') + ' - ' + error.message, '❌');
            this.showLoading(false);
            this.isProcessing = false;
        }
    }
    
    fallbackCopyText() {
        navigator.clipboard.writeText(this.codeEditor.value).then(() => {
            this.showToast(this.t('code_copied'), '📝');
        }).catch(() => {
            this.showToast(this.t('copy_failed'), '❌');
        });
    }
    
    shareCode() {
        const code = this.codeEditor.value;
        const shareData = {
            code,
            settings: this.settings
        };
        
        if (navigator.share) {
            navigator.share({
                title: 'Code Snippet',
                text: `Check out this ${this.languages[this.settings.language].name} code:\n\n${code}`,
            }).catch(console.error);
        } else {
            const shareUrl = `${window.location.origin}${window.location.pathname}?data=${btoa(JSON.stringify(shareData))}`;
            navigator.clipboard.writeText(shareUrl).then(() => {
                this.showToast(this.t('share_link_copied'), '🔗');
            }).catch(() => {
                this.showToast(this.t('copy_failed'), '❌');
            });
        }
    }
    
    async generateCanvas() {
        const element = this.codeWindow;
        
        // Ensure element is visible and has content
        if (!element || !element.offsetWidth || !element.offsetHeight) {
            throw new Error('Preview element not ready');
        }
        
        // Ensure html2canvas is loaded
        if (typeof html2canvas === 'undefined') {
            throw new Error('html2canvas library not loaded');
        }
        
        // Create a temporary container for clean capture
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '0';
        tempContainer.style.background = 'transparent';
        tempContainer.style.padding = '40px';
        
        // Clone the code window
        const clonedWindow = element.cloneNode(true);
        clonedWindow.style.transform = 'none';
        clonedWindow.style.transition = 'none';
        clonedWindow.style.position = 'static';
        clonedWindow.style.margin = '0';
        
        // Add background if gradient is selected
        if (this.settings.backgroundType === 'gradient') {
            const gradients = {
                'warm-flame': 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
                'night-fade': 'linear-gradient(45deg, #a18cd1 0%, #fbc2eb 100%)',
                'spring-warmth': 'linear-gradient(45deg, #fad0c4 0%, #ffd1ff 100%)',
                'juicy-peach': 'linear-gradient(45deg, #ffecd2 0%, #fcb69f 100%)',
                'young-passion': 'linear-gradient(45deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)',
                'lady-lips': 'linear-gradient(45deg, #ff9a9e 0%, #f6416c 100%)',
                'sunny-morning': 'linear-gradient(45deg, #f6d365 0%, #fda085 100%)',
                'rainy-ashville': 'linear-gradient(45deg, #fbc2eb 0%, #a6c1ee 100%)'
            };
            tempContainer.style.background = gradients[this.settings.gradientStyle] || gradients['warm-flame'];
        } else if (this.settings.backgroundType === 'solid') {
            tempContainer.style.background = '#0969da';
        }
        
        tempContainer.appendChild(clonedWindow);
        document.body.appendChild(tempContainer);
        
        const options = {
            backgroundColor: this.settings.backgroundType === 'transparent' ? null : 'transparent',
            scale: 2,
            useCORS: true,
            allowTaint: true,
            foreignObjectRendering: false,
            logging: false,
            width: tempContainer.offsetWidth,
            height: tempContainer.offsetHeight,
            x: 0,
            y: 0
        };
        
        try {
            const canvas = await html2canvas(tempContainer, options);
            document.body.removeChild(tempContainer);
            return canvas;
        } catch (error) {
            document.body.removeChild(tempContainer);
            throw error;
        }
    }
    
    openSettings() {
        this.loadSettingsToModal();
        this.settingsModal.classList.add('active');
    }
    
    closeSettings() {
        this.settingsModal.classList.remove('active');
    }
    
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
        
        this.updatePreview();
        this.updateLineNumbers();
        this.saveSettings();
        this.closeSettings();
        this.showToast(this.t('settings_applied'), '⚙️');
    }
    
    resetSettings() {
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
            showReflection: false
        };
        
        this.loadSettingsToModal();
        this.updatePreview();
        this.updateLineNumbers();
        this.initializeDropdowns();
        this.showToast(this.t('settings_reset'), '🔄');
    }
    
    updateRangeValue(type) {
        const range = this[type + 'Range'];
        const value = this[type + 'Value'];
        const unit = ['fontSize', 'padding', 'width', 'radius'].includes(type) ? 'px' : '';
        value.textContent = range.value + unit;
    }
    
    updateAllRangeValues() {
        this.updateRangeValue('fontSize');
        this.updateRangeValue('lineHeight');
        this.updateRangeValue('padding');
        this.updateRangeValue('width');
        this.updateRangeValue('radius');
    }
    
    saveSettings() {
        localStorage.setItem('codeToImage_settings', JSON.stringify(this.settings));
    }
    
    loadSettings() {
        const saved = localStorage.getItem('codeToImage_settings');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                this.settings = { ...this.settings, ...parsed };
            } catch (error) {
                console.warn('Failed to load settings:', error);
            }
        }
        
        // Update UI with loaded settings
        setTimeout(() => {
            this.updateAllDropdowns();
            this.updateFileName();
        }, 100);
    }
    
    updateAllDropdowns() {
        if (!this.languageDropdown || !this.themeDropdown || !this.backgroundDropdown || !this.gradientDropdown) {
            console.warn('Dropdown elements not ready yet');
            return;
        }
        
        try {
            this.updateDropdownButton('language', this.languageDropdown, this.languages);
            this.updateDropdownButton('theme', this.themeDropdown, this.themes);
            this.updateDropdownButton('backgroundType', this.backgroundDropdown, this.backgroundTypes);
            this.updateDropdownButton('gradientStyle', this.gradientDropdown, this.gradientStyles);
        } catch (error) {
            console.error('Error updating dropdowns:', error);
        }
    }
    
    handleKeyboard(event) {
        // Ctrl/Cmd + S: Download
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
            event.preventDefault();
            this.downloadImage();
        }
        
        // Ctrl/Cmd + C: Copy (when not in textarea)
        if ((event.ctrlKey || event.metaKey) && event.key === 'c' && event.target !== this.codeEditor) {
            event.preventDefault();
            this.copyToClipboard();
        }
        
        // Ctrl/Cmd + Shift + F: Format
        if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'F') {
            event.preventDefault();
            this.formatCode();
        }
        
        // Ctrl/Cmd + Shift + C: Clear
        if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'C') {
            event.preventDefault();
            this.clearCode();
        }
        
        // Escape: Close modal/dropdowns
        if (event.key === 'Escape') {
            this.closeSettings();
            this.closeAllDropdowns();
        }
        
        // Ctrl/Cmd + ,: Open settings
        if ((event.ctrlKey || event.metaKey) && event.key === ',') {
            event.preventDefault();
            this.openSettings();
        }
    }
    
    showToast(message, icon = '✅') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;
        
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            this.hideToast(toast);
        });
        
        this.toastContainer.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            this.hideToast(toast);
        }, 4000);
    }
    
    hideToast(toast) {
        if (toast && toast.parentNode) {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast && toast.parentNode) {
                    this.toastContainer.removeChild(toast);
                }
            }, 300);
        }
    }
    
    showLoading(show) {
        if (show) {
            this.loadingOverlay.classList.add('show');
        } else {
            this.loadingOverlay.classList.remove('show');
        }
    }
    
    // Initialize from URL parameters (for sharing)
    initializeFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const data = urlParams.get('data');
        
        if (data) {
            try {
                const decoded = JSON.parse(atob(data));
                
                if (decoded.code) {
                    this.codeEditor.value = decoded.code;
                }
                
                if (decoded.settings) {
                    this.settings = { ...this.settings, ...decoded.settings };
                    this.updateAllDropdowns();
                    this.updateFileName();
                }
                
                this.updatePreview();
                this.updateLineNumbers();
                
                // Clean URL
                window.history.replaceState({}, document.title, window.location.pathname);
                
                this.showToast(this.t('share_link_copied'), '🔗');
            } catch (error) {
                console.warn('Failed to parse URL data:', error);
            }
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    try {
        const converter = new CodeToImageConverter();
        
        // Make converter globally available
        window.codeConverter = converter;
        
        // Initialize from URL if shared (after a short delay)
        setTimeout(() => {
            converter.initializeFromURL();
        }, 500);
        
        // Service worker registration for PWA
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('ServiceWorker registered:', registration);
                })
                .catch(error => {
                    console.warn('ServiceWorker registration failed:', error);
                });
        }
        
        // Add loading animations
        const sections = document.querySelectorAll('.editor-section, .preview-section');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            setTimeout(() => {
                section.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200 + 800);
        });
        
        // Debug info
        console.log('Code to Image Converter initialized successfully');
        
    } catch (error) {
        console.error('Failed to initialize app:', error);
        document.body.innerHTML = '<div style="padding: 20px; text-align: center;">Failed to load application. Please refresh the page.</div>';
    }
});

// Utility functions
window.utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};