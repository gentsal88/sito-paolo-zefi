import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService, SupportedLanguage } from '@core/services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="language-switcher">
      <button
        class="language-toggle"
        (click)="toggleDropdown()"
        [attr.aria-label]="'common.language' | translate"
      >
        <span class="flag">{{ currentLanguageInfo()?.flag }}</span>
        <span class="code">{{ currentLanguage() | uppercase }}</span>
        <span class="icon" [class.open]="isDropdownOpen()">▼</span>
      </button>

      @if (isDropdownOpen()) {
        <div class="language-dropdown">
          @for (lang of supportedLanguages; track lang.code) {
            <button
              class="language-option"
              [class.active]="lang.code === currentLanguage()"
              (click)="selectLanguage(lang.code)"
              [title]="lang.nativeName"
            >
              <span class="flag">{{ lang.flag }}</span>
              <span class="name">{{ lang.nativeName }}</span>
              @if (lang.code === currentLanguage()) {
                <span class="checkmark">✓</span>
              }
            </button>
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
      .language-switcher {
        position: relative;
        display: inline-block;
      }

      .language-toggle {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 12px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        background-color: var(--color-surface, #fff);
        color: var(--color-text, #333);
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .language-toggle:hover {
        border-color: rgba(0, 0, 0, 0.2);
        background-color: var(--color-background, #f5f5f5);
      }

      .language-toggle:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        border-color: rgb(59, 130, 246);
      }

      .flag {
        font-size: 18px;
      }

      .code {
        font-size: 12px;
        font-weight: 600;
      }

      .icon {
        display: inline-flex;
        align-items: center;
        transition: transform 0.2s ease;
        font-size: 10px;
      }

      .icon.open {
        transform: rotate(180deg);
      }

      .language-dropdown {
        position: absolute;
        top: calc(100% + 4px);
        right: 0;
        background-color: var(--color-surface, #fff);
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        min-width: 160px;
        overflow: hidden;
        animation: slideDown 0.2s ease;
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .language-option {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 10px 16px;
        border: none;
        background-color: transparent;
        color: var(--color-text, #333);
        font-size: 14px;
        cursor: pointer;
        transition: background-color 0.15s ease;
        text-align: left;
      }

      .language-option:hover {
        background-color: var(--color-background, #f5f5f5);
      }

      .language-option.active {
        background-color: rgba(59, 130, 246, 0.1);
        color: rgb(59, 130, 246);
        font-weight: 600;
      }

      .language-option .flag {
        font-size: 20px;
      }

      .language-option .name {
        flex: 1;
      }

      .checkmark {
        font-weight: bold;
        color: rgb(59, 130, 246);
      }

      /* Dark theme support */
      :host-context([data-theme='dark']) .language-toggle {
        background-color: var(--color-surface-dark, #2d3748);
        color: var(--color-text-dark, #e2e8f0);
        border-color: rgba(255, 255, 255, 0.1);
      }

      :host-context([data-theme='dark']) .language-toggle:hover {
        background-color: var(--color-background-dark, #1a202c);
        border-color: rgba(255, 255, 255, 0.2);
      }

      :host-context([data-theme='dark']) .language-dropdown {
        background-color: var(--color-surface-dark, #2d3748);
        border-color: rgba(255, 255, 255, 0.1);
      }

      :host-context([data-theme='dark']) .language-option {
        color: var(--color-text-dark, #e2e8f0);
      }

      :host-context([data-theme='dark']) .language-option:hover {
        background-color: var(--color-background-dark, #1a202c);
      }

      :host-context([data-theme='dark']) .language-option.active {
        background-color: rgba(59, 130, 246, 0.2);
      }
    `,
  ],
})
export class LanguageSwitcherComponent implements OnInit {
  currentLanguage = signal<SupportedLanguage>('en');
  currentLanguageInfo = signal<any>(null);
  supportedLanguages: any[] = [];
  isDropdownOpen = signal(false);

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.supportedLanguages = this.languageService.getSupportedLanguages();
    this.currentLanguage.set(this.languageService.getCurrentLanguage());
    this.updateLanguageInfo();

    // Subscribe to language changes
    this.languageService.getCurrentLanguage$().subscribe((lang) => {
      this.currentLanguage.set(lang);
      this.updateLanguageInfo();
    });
  }

  selectLanguage(language: SupportedLanguage): void {
    this.languageService.setLanguage(language);
    this.isDropdownOpen.set(false);
  }

  toggleDropdown(): void {
    this.isDropdownOpen.update((open) => !open);
  }

  private updateLanguageInfo(): void {
    const info = this.languageService.getLanguageInfo(this.currentLanguage());
    this.currentLanguageInfo.set(info);
  }
}
