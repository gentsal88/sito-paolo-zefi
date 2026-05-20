import { Component, HostListener, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { ThemeService } from '@core/services/theme.service';

interface NavLink {
  label: string;
  i18nKey: string;
  href: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, LanguageSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isScrolled = signal(false);
  menuOpen = signal(false);
  isDarkTheme = signal(false);

  navLinks: NavLink[] = [
    { label: '', i18nKey: 'header.biografia', href: '#biografia' },
    { label: '', i18nKey: 'header.lezha', href: '#lezha' },
    { label: '', i18nKey: 'header.galleria', href: '#galleria' },
    { label: '', i18nKey: 'header.pubblicazioni', href: '#pubblicazioni' },
    { label: '', i18nKey: 'header.video', href: '#video' },
    { label: '', i18nKey: 'header.contatti', href: '#contatti' },
  ];

  constructor(private translate: TranslateService, private theme: ThemeService) {}

  ngOnInit(): void {
    this.updateNavLabels();
    this.translate.onLangChange.subscribe(() => {
      this.updateNavLabels();
    });
    // initialize theme state from ThemeService
    this.isDarkTheme.set(this.theme.isDark());
  }

  private updateNavLabels(): void {
    this.navLinks.forEach((link) => {
      this.translate.get(link.i18nKey).subscribe((text: string) => {
        link.label = text;
      });
    });
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleTheme() {
    this.theme.toggle();
    this.isDarkTheme.set(this.theme.isDark());
  }

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  isAdmin(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  private getTheme(): string {
    try {
      const stored = localStorage.getItem('pz-theme') || localStorage.getItem('theme');
      if (stored) return stored;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    } catch (e) {
      return 'dark';
    }
  }
}
