/**
 * Advanced Dark Mode Controller
 * Features:
 * - System preference detection
 * - Local storage persistence
 * - UI controls integration
 * - Smooth transitions
 * - Accessibility considerations
 * - Theme extensions
 * - Developer API
 */

class DarkModeController {
    constructor(options = {}) {
      // Configuration defaults
      const defaults = {
        storageKey: 'darkMode',
        uiSelector: '[data-theme-toggle]',
        animationDuration: 300,
        applyTo: 'html',
        classes: {
          dark: 'dark',
          light: 'light',
          changing: 'theme-changing'
        },
        themes: {
          dark: {
            '--bg-primary': '#1a1a1a',
            '--text-primary': '#ffffff'
          },
          light: {
            '--bg-primary': '#ffffff',
            '--text-primary': '#1a1a1a'
          }
        }
      };
  
      this.config = { ...defaults, ...options };
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.isChanging = false;
      this.currentTheme = null;
  
      this.init();
    }
  
    init() {
      this.setupEventListeners();
      this.applyInitialTheme();
      this.injectStyles();
      this.setupUI();
    }
  
    setupEventListeners() {
      // System preference changes
      this.mediaQuery.addEventListener('change', (e) => {
        if (!this.hasUserPreference()) {
          this.setTheme(e.matches ? 'dark' : 'light', false);
        }
      });
  
      // Storage event from other tabs
      window.addEventListener('storage', (e) => {
        if (e.key === this.config.storageKey) {
          this.setTheme(e.newValue === 'true' ? 'dark' : 'light');
        }
      });
    }
  
    setupUI() {
      // Create UI controls if they don't exist
      if (!document.querySelector(this.config.uiSelector)) {
        this.createThemeToggle();
      }
  
      // Bind existing controls
      document.querySelectorAll(this.config.uiSelector).forEach(el => {
        el.addEventListener('click', () => this.toggleTheme());
        this.updateUIControls();
      });
    }
  
    createThemeToggle() {
      const toggle = document.createElement('button');
      toggle.setAttribute('data-theme-toggle', '');
      toggle.setAttribute('aria-label', 'Toggle dark mode');
      toggle.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path class="sun" d="M12 16a4 4 0 100-8 4 4 0 000 8z"/>
          <path class="moon" d="M12 3v1m0 16v1m-9-9h1m16 0h1m-2.636-6.364l-.707.707M6.343 17.657l-.707.707M4 12a8 8 0 1016 0 8 8 0 00-16 0z"/>
        </svg>
      `;
      document.body.appendChild(toggle);
    }
  
    updateUIControls() {
      document.querySelectorAll(this.config.uiSelector).forEach(el => {
        el.setAttribute('aria-pressed', this.isDark());
        el.classList.toggle('active', this.isDark());
      });
    }
  
    applyInitialTheme() {
      const storedPreference = localStorage.getItem(this.config.storageKey);
      let theme;
  
      if (storedPreference !== null) {
        theme = storedPreference === 'true' ? 'dark' : 'light';
      } else {
        theme = this.mediaQuery.matches ? 'dark' : 'light';
      }
  
      this.setTheme(theme, false, true);
    }
  
    setTheme(theme, isUserAction = true, initialLoad = false) {
      if (this.isChanging) return;
      
      const isDark = theme === 'dark';
      const targetElement = document.querySelector(this.config.applyTo) || document.documentElement;
  
      // Skip if already in the correct theme
      if (!initialLoad && this.currentTheme === theme) return;
  
      this.isChanging = true;
      this.currentTheme = theme;
  
      // Add changing class for transitions
      targetElement.classList.add(this.config.classes.changing);
  
      // Store user preference
      if (isUserAction) {
        localStorage.setItem(this.config.storageKey, isDark.toString());
      }
  
      // Apply theme classes
      targetElement.classList.toggle(this.config.classes.dark, isDark);
      targetElement.classList.toggle(this.config.classes.light, !isDark);
  
      // Update CSS variables
      this.applyCSSVariables(theme);
  
      // Update UI controls
      this.updateUIControls();
  
      // Dispatch custom event
      this.dispatchThemeChangeEvent(theme);
  
      // Remove changing class after animation
      setTimeout(() => {
        targetElement.classList.remove(this.config.classes.changing);
        this.isChanging = false;
      }, this.config.animationDuration);
    }
  
    applyCSSVariables(theme) {
      const styleTarget = document.querySelector(this.config.applyTo) || document.documentElement;
      const variables = this.config.themes[theme];
  
      Object.entries(variables).forEach(([key, value]) => {
        styleTarget.style.setProperty(key, value);
      });
    }
  
    toggleTheme() {
      this.setTheme(this.isDark() ? 'light' : 'dark');
    }
  
    isDark() {
      const targetElement = document.querySelector(this.config.applyTo) || document.documentElement;
      return targetElement.classList.contains(this.config.classes.dark);
    }
  
    hasUserPreference() {
      return localStorage.getItem(this.config.storageKey) !== null;
    }
  
    dispatchThemeChangeEvent(theme) {
      window.dispatchEvent(new CustomEvent('themeChange', {
        detail: {
          theme,
          isDark: theme === 'dark',
          isLight: theme === 'light',
          isSystem: !this.hasUserPreference()
        }
      }));
    }
  
    injectStyles() {
      const styleId = 'dark-mode-transition-styles';
      if (document.getElementById(styleId)) return;
  
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .${this.config.classes.changing} {
          transition: color ${this.config.animationDuration}ms, background-color ${this.config.animationDuration}ms;
        }
        [data-theme-toggle] {
          cursor: pointer;
          background: transparent;
          border: none;
          padding: 8px;
          border-radius: 50%;
        }
        [data-theme-toggle]:hover {
          background: rgba(0,0,0,0.1);
        }
        [data-theme-toggle].active .sun {
          display: none;
        }
        [data-theme-toggle]:not(.active) .moon {
          display: none;
        }
      `;
      document.head.appendChild(style);
    }
  
    // Public API
    getCurrentTheme() {
      return this.currentTheme;
    }
  
    getUserPreference() {
      return this.hasUserPreference() ? 
        (localStorage.getItem(this.config.storageKey) === 'true' ? 'dark' : 'light') : 
        'system';
    }
  
    resetToSystem() {
      localStorage.removeItem(this.config.storageKey);
      this.setTheme(this.mediaQuery.matches ? 'dark' : 'light', false);
    }
  }
  
  // Initialize with default configuration
  const darkMode = new DarkModeController();
  
  // Optional: Make available globally
  window.DarkMode = darkMode;
  
  // Example of using the themeChange event
  window.addEventListener('themeChange', (e) => {
    console.log(`Theme changed to ${e.detail.theme}`);
  });
  
  // Example of extending with additional themes
  darkMode.config.themes.dark['--accent-color'] = '#4f8cff';
  darkMode.config.themes.light['--accent-color'] = '#0066cc';

// Integrate with existing theme toggle button
window.addEventListener('DOMContentLoaded', function() {
  // Use the existing button if present
  var btn = document.getElementById('theme-toggle');
  if (btn) {
    // Remove any previous listeners
    btn.onclick = null;
    // Create controller
    window.darkModeController = new DarkModeController({
      uiSelector: '#theme-toggle',
      applyTo: 'body',
      classes: { dark: 'dark', light: '', changing: 'theme-changing' }
    });
    btn.addEventListener('click', function() {
      window.darkModeController.toggleTheme();
    });
    // Sync button state on theme change
    window.addEventListener('themeChange', function(e) {
      btn.setAttribute('aria-pressed', e.detail.isDark);
      btn.textContent = e.detail.isDark ? '☀️' : '🌙';
    });
  } else {
    // Fallback: auto-init
    window.darkModeController = new DarkModeController({ applyTo: 'body', classes: { dark: 'dark', light: '', changing: 'theme-changing' } });
  }
});