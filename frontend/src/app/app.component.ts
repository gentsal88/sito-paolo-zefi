import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LanguageService } from '@core/services/language.service';
import { AudioService } from '@core/services/audio.service';
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
    private audio: AudioService,
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

    // --- Stat counters: animate numbers when visible ---
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset['target'] || '0', 10) || 0;
          const duration = 1200;
          const start = performance.now();
          const from = 0;
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const val = Math.floor(from + (target - from) * t);
            el.textContent = String(val);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    setTimeout(() => {
      this.document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));
    }, 500);

    // --- Cursor glow effect (desktop) ---
    try {
      if (window.matchMedia && window.matchMedia('(hover: hover)').matches && window.innerWidth > 1024) {
        const glow = this.document.createElement('div');
        glow.className = 'cursor-glow';
        glow.style.cssText = `position:fixed;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(184,134,11,0.08) 0%,transparent 60%);pointer-events:none;z-index:2;transform:translate(-50%,-50%);transition:opacity 0.3s;mix-blend-mode:screen;`;
        this.document.body.appendChild(glow);
        this.document.addEventListener('mousemove', (e: MouseEvent) => {
          glow.style.left = e.clientX + 'px';
          glow.style.top = e.clientY + 'px';
        });
      }
    } catch (e) {
      // noop
    }

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

    // If user previously enabled audio, start on first user gesture
    try {
      if (this.audio && this.audio.isPlaying && this.audio.isPlaying()) {
        const resume = () => {
          try { this.audio.start(); } catch (e) {}
          document.removeEventListener('pointerdown', resume as EventListener);
        };
        document.addEventListener('pointerdown', resume as EventListener, { passive: true });
      }
    } catch (e) {
      // noop
    }
  }
}

