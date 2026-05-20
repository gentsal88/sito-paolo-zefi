import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _theme = signal<string>(this.readInitialTheme());
  isDark = computed(() => this._theme() === 'dark');

  private readInitialTheme(): string {
    try {
      const stored = localStorage.getItem('pz-theme') || localStorage.getItem('theme');
      if (stored) return stored;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    } catch (e) {
      // noop
    }
    return 'light';
  }

  applyTheme(theme: string) {
    this._theme.set(theme);
    try { localStorage.setItem('pz-theme', theme); } catch (e) {}
    document.documentElement.setAttribute('data-theme', theme);
  }

  toggle() {
    this.applyTheme(this.isDark() ? 'light' : 'dark');
  }

  currentTheme() {
    return this._theme();
  }
}
