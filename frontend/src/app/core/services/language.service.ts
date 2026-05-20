import { Injectable, effect, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type SupportedLanguage = 'en' | 'it' | 'fr' | 'es' | 'sq';

interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly STORAGE_KEY = 'app_language';
  private readonly DEFAULT_LANGUAGE: SupportedLanguage = 'en';
  private readonly SUPPORTED_LANGUAGES: LanguageInfo[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'sq', name: 'Albanian', nativeName: 'Shqiptar', flag: '🇦🇱' },
  ];

  private currentLanguage = signal<SupportedLanguage>(this.DEFAULT_LANGUAGE);
  private languageChanged$ = new BehaviorSubject<SupportedLanguage>(
    this.DEFAULT_LANGUAGE
  );

  constructor(private translate: TranslateService) {
    this.initializeLanguage();
  }

  /**
   * Initialize language from localStorage or browser locale
   */
  private initializeLanguage(): void {
    const savedLanguage = this.getSavedLanguage();
    const detectedLanguage = this.detectBrowserLanguage();
    const initialLanguage = savedLanguage || detectedLanguage;

    this.setLanguage(initialLanguage);
  }

  /**
   * Set the current language
   */
  setLanguage(language: SupportedLanguage | string): void {
    const lang = this.validateLanguage(language as SupportedLanguage);

    this.currentLanguage.set(lang);
    this.translate.use(lang);
    localStorage.setItem(this.STORAGE_KEY, lang);
    this.languageChanged$.next(lang);

    // Set document language attribute
    document.documentElement.lang = lang;
  }

  /**
   * Get the current language
   */
  getCurrentLanguage(): SupportedLanguage {
    return this.currentLanguage();
  }

  /**
   * Get current language as Observable
   */
  getCurrentLanguage$(): Observable<SupportedLanguage> {
    return this.languageChanged$.asObservable();
  }

  /**
   * Get all supported languages
   */
  getSupportedLanguages(): LanguageInfo[] {
    return this.SUPPORTED_LANGUAGES;
  }

  /**
   * Get language info by code
   */
  getLanguageInfo(code: SupportedLanguage): LanguageInfo | undefined {
    return this.SUPPORTED_LANGUAGES.find((lang) => lang.code === code);
  }

  /**
   * Check if language is supported
   */
  isSupportedLanguage(language: string): language is SupportedLanguage {
    return this.SUPPORTED_LANGUAGES.some((lang) => lang.code === language);
  }

  /**
   * Get saved language from localStorage
   */
  private getSavedLanguage(): SupportedLanguage | null {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved && this.isSupportedLanguage(saved)) {
      return saved as SupportedLanguage;
    }
    return null;
  }

  /**
   * Detect browser language
   */
  private detectBrowserLanguage(): SupportedLanguage {
    const browserLang = this.translate.getBrowserLang();
    if (browserLang && this.isSupportedLanguage(browserLang)) {
      return browserLang;
    }

    // Try to match partial language code (e.g., 'en-US' -> 'en')
    const partialLang = browserLang?.split('-')[0];
    if (partialLang && this.isSupportedLanguage(partialLang)) {
      return partialLang;
    }

    return this.DEFAULT_LANGUAGE;
  }

  /**
   * Validate language code
   */
  private validateLanguage(language: SupportedLanguage): SupportedLanguage {
    return this.isSupportedLanguage(language) ? language : this.DEFAULT_LANGUAGE;
  }

  /**
   * Reset to default language
   */
  resetToDefault(): void {
    this.setLanguage(this.DEFAULT_LANGUAGE);
  }
}
