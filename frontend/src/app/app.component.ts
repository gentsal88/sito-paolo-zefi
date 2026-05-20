import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LanguageService } from '@core/services/language.service';
import { FaviconService } from '@core/services/favicon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <!-- Preloader con aquila albanese -->
    <div class="preloader" id="preloader">
      <div class="preloader-content">
        <img src="assets/icons/aquilla_gold.png" alt="Aquila" class="preloader-crest" />
        <div class="preloader-bar"><span></span></div>
      </div>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  title = 'Sito Paulo Zefi';

  constructor(
    private languageService: LanguageService,
    private router: Router,
    private favicon: FaviconService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    // --- Preloader: hide after 2.8s ---
    setTimeout(() => {
      const preloader = this.document.getElementById('preloader');
      if (preloader) preloader.classList.add('hidden');
    }, 2800);

    // --- Navbar scroll class ---
    const header = this.document.getElementById('main-header');
    if (header) {
      this.document.defaultView?.addEventListener('scroll', () => {
        if ((this.document.defaultView?.scrollY ?? 0) > 60) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }, { passive: true });
    }

    // --- Scroll-reveal via IntersectionObserver ---
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    // Observe after a tick so components are rendered
    setTimeout(() => {
      this.document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        observer.observe(el);
      });
    }, 300);

    // --- Dynamic favicon for memorial pages ---
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((ev) => {
        const url = (ev.urlAfterRedirects || ev.url).toLowerCase();
        if (url.includes('memorial') || url.includes('memoriale') || url.includes('gusto')) {
          this.favicon.setFavicon('assets/icons/aquilla_gold.png', 'image/png');
        } else {
          this.favicon.resetFavicon();
        }
      });
  }
}

