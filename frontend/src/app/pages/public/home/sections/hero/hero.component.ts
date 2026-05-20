import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AudioService } from '@core/services/audio.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface Particle {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  size: number; opacity: number;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('atmosphereCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('heroBgImage') bgImageRef!: ElementRef<HTMLDivElement>;

  titleAnimated = false;

  private animFrame: number | null = null;
  private particles: Particle[] = [];
  private mouseX = 0;
  private mouseY = 0;
  private scrollListener!: () => void;
  private mouseMoveListener!: (e: MouseEvent) => void;
  private resizeListener!: () => void;

  // Audio handled by AudioService

  constructor(@Inject(DOCUMENT) private document: Document, public audio: AudioService) {}

  ngAfterViewInit(): void {
    // Trigger title animation after short delay (mirrors preloader callback)
    setTimeout(() => { this.titleAnimated = true; }, 400);

    this.initParticles();
    this.initParallax();
  }

  // ---- Golden particles (Canvas 2D, same visual as Three.js version) ----
  private initParticles(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Build particles
    const COUNT = 250;
    this.particles = Array.from({ length: COUNT }, () => ({
      x:  (Math.random() - 0.5) * canvas.width,
      y:  Math.random() * canvas.height,
      z:  Math.random(),
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.4 + 0.1),   // float upward
      vz: 0,
      size:    Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.7 + 0.1,
    }));

    // Pre-build radial gradient texture for performance
    const makeGradient = (r: number) => {
      const offscreen = this.document.createElement('canvas');
      offscreen.width  = r * 2;
      offscreen.height = r * 2;
      const oc = offscreen.getContext('2d')!;
      const g  = oc.createRadialGradient(r, r, 0, r, r, r);
      g.addColorStop(0,   'rgba(244,210,122,1)');
      g.addColorStop(0.4, 'rgba(184,134,11,0.6)');
      g.addColorStop(1,   'rgba(184,134,11,0)');
      oc.fillStyle = g;
      oc.beginPath();
      oc.arc(r, r, r, 0, Math.PI * 2);
      oc.fill();
      return offscreen;
    };
    const tex = makeGradient(32);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle mouse parallax shift
      const shiftX = this.mouseX * 15;
      const shiftY = this.mouseY * 10;

      for (const p of this.particles) {
        // Move
        p.x += p.vx + shiftX * 0.0005;
        p.y += p.vy + shiftY * 0.0005;

        // Wrap
        if (p.y < -10) { p.y = canvas.height + 10; p.x = (Math.random() - 0.5) * canvas.width; }
        if (p.x >  canvas.width  / 2 + 30) p.x = -canvas.width  / 2 - 30;
        if (p.x < -canvas.width  / 2 - 30) p.x =  canvas.width  / 2 + 30;

        const drawSize = p.size * 2 * (0.5 + p.z * 0.5);
        ctx.globalAlpha = p.opacity * (0.5 + p.z * 0.5);
        ctx.drawImage(
          tex,
          canvas.width  / 2 + p.x - drawSize,
          canvas.height / 2 + p.y - drawSize,
          drawSize * 2,
          drawSize * 2
        );
      }

      ctx.globalAlpha = 1;
      this.animFrame = requestAnimationFrame(draw);
    };

    draw();

    this.mouseMoveListener = (e: MouseEvent) => {
      this.mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      this.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    this.resizeListener = () => { resize(); };

    window.addEventListener('mousemove', this.mouseMoveListener, { passive: true });
    window.addEventListener('resize',    this.resizeListener,    { passive: true });
  }

  // ---- Parallax scroll on hero background ----
  private initParallax(): void {
    this.scrollListener = () => {
      const sc = window.scrollY;
      const bgEl = this.bgImageRef?.nativeElement;
      if (bgEl && sc < window.innerHeight) {
        bgEl.style.transform = `scale(1.05) translateY(${sc * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  // ---- Audio ambient (Web Audio API, medieval drone) ----
  toggleAudio(): void {
    // Try to resume context if needed on first user gesture
    this.audio.resumeIfSuspended();
    this.audio.toggle();
  }

  ngOnDestroy(): void {
    if (this.animFrame !== null) cancelAnimationFrame(this.animFrame);
    if (this.scrollListener) window.removeEventListener('scroll',    this.scrollListener);
    if (this.mouseMoveListener) window.removeEventListener('mousemove', this.mouseMoveListener);
    if (this.resizeListener)  window.removeEventListener('resize',    this.resizeListener);
    // ensure audio stopped when component destroyed
    this.audio.stop();
  }
}

