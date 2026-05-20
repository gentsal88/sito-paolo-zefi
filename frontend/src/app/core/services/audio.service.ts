import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AudioService {
  isPlaying = signal<boolean>(this.readInitial());

  private audioCtx: AudioContext | null = null;
  private audioNodes: any[] = [];

  private readInitial(): boolean {
    try {
      return localStorage.getItem('pz-audio') === '1';
    } catch (e) {
      return false;
    }
  }

  toggle(): void {
    if (this.isPlaying()) {
      this.stop();
    } else {
      this.start();
    }
  }

  start(): void {
    if (this.isPlaying()) return;
    try {
      this.audioCtx = this.audioCtx || new (window.AudioContext || (window as any).webkitAudioContext)();
      const master = this.audioCtx.createGain();
      master.gain.value = 0.12;
      master.connect(this.audioCtx.destination);

      [73.42, 110.0, 146.83, 220.0].forEach((freq: number, i: number) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.value = freq;
        gain.gain.value = 0;
        gain.gain.linearRampToValueAtTime(0.25 / (i + 1), this.audioCtx!.currentTime + 2);

        const lfo = this.audioCtx!.createOscillator();
        const lfoGain = this.audioCtx!.createGain();
        lfo.frequency.value = 0.1 + i * 0.05;
        lfoGain.gain.value = 0.5;
        lfo.connect(lfoGain);
        lfoGain.connect((osc as any).frequency);
        lfo.start();

        osc.connect(gain);
        gain.connect(master);
        osc.start();

        this.audioNodes.push({ osc, gain, lfo, lfoGain });
      });
      this.audioNodes.push({ master });
      this.isPlaying.set(true);
      try { localStorage.setItem('pz-audio', '1'); } catch (e) {}
    } catch (e) {
      console.warn('Audio not available', e);
      this.isPlaying.set(false);
    }
  }

  stop(): void {
    this.audioNodes.forEach(n => {
      try { n.osc && n.osc.stop && n.osc.stop(); } catch (e) {}
      try { n.lfo && n.lfo.stop && n.lfo.stop(); } catch (e) {}
      try { n.osc && n.osc.disconnect && n.osc.disconnect(); } catch (e) {}
      try { n.gain && n.gain.disconnect && n.gain.disconnect(); } catch (e) {}
      try { n.lfoGain && n.lfoGain.disconnect && n.lfoGain.disconnect(); } catch (e) {}
    });
    this.audioNodes = [];
    try { this.audioCtx && this.audioCtx.close(); } catch (e) {}
    this.audioCtx = null;
    this.isPlaying.set(false);
    try { localStorage.removeItem('pz-audio'); } catch (e) {}
  }

  // attempt to resume an existing AudioContext after a user gesture
  resumeIfSuspended(): void {
    try {
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    } catch (e) {}
  }
}
