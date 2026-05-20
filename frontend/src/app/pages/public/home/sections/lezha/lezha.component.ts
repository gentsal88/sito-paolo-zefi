import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ContentService } from '@core/services/content.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lezha',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './lezha.component.html',
  styleUrl: './lezha.component.scss',
})
export class LezhaComponent implements OnInit {
  stories: any[] = [];
  timelinePoints: Array<{ year: string; label: string }> = [];

  constructor(private contentService: ContentService, private translate: TranslateService) {}

  ngOnInit() {
    this.contentService.getStories().subscribe({
      next: (stories) => (this.stories = stories),
      error: (err) => console.error('Error loading stories:', err),
    });

    // Try to load medieval timeline from backend, fallback to localized static data
    this.contentService.getTimeline().subscribe({
      next: (items) => {
        if (items && items.length) {
          this.timelinePoints = items.map((it: any) => ({ year: it.year, label: it.title || it.label || it.name }));
        } else {
          this.timelinePoints = this.getLocaleFallback();
        }
      },
      error: (err) => {
        console.error('Error loading medieval timeline:', err);
        this.timelinePoints = this.getLocaleFallback();
      }
    });
  }

  private getLocaleFallback() {
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'it';
    if (lang.startsWith('en')) return this.englishTimeline;
    return this.italianTimeline;
  }

  // Fallback data
  fallbackStories = [
    { id: 1, icon: 'fa-solid fa-fort-awesome', era: 'III sec. a.C.', title: 'Lissus, la Fortezza Illira', description: 'La città antica fondata dai Greci, fortezza strategica del Mare Adriatico' },
    { id: 2, icon: 'fa-solid fa-chess-rook', era: '1393', title: 'Il Dominio Veneziano', description: 'Lezha sotto il dominio della Repubblica di Venezia, centro di commercio e potere' },
    { id: 3, icon: 'fa-solid fa-khanda', era: '2 Marzo 1444', title: 'La Lega di Alessio', description: 'Il patto storico che unì i principi albanesi contro l\'Impero Ottomano' },
    { id: 4, icon: 'fa-solid fa-shield-halved', era: '1444-1468', title: 'L\'Era di Skanderbeg', description: 'La resistenza gloriosa guidata da Gjergj Kastrioti Skanderbeg contro gli Ottomani' },
    { id: 5, icon: 'fa-solid fa-cross', era: '17 Gennaio 1468', title: 'La Tomba dell\'Eroe', description: 'Il sepolcro di Skanderbeg nella chiesa di San Nicola, monumento della memoria' },
    { id: 6, icon: 'fa-solid fa-mountain-sun', era: 'Oggi', title: 'Il Castello di Lezha', description: 'Le rovine del castello raccontano storie di gloria, sacrificio e resilienza' }
  ];

  italianTimeline = [
    { year: '385 a.C.', label: 'Fondazione di Lissus' },
    { year: '1393', label: 'Dominio Veneziano' },
    { year: '1444', label: 'Lega di Alessio' },
    { year: '1468', label: 'Morte di Skanderbeg' },
    { year: '1912', label: 'Indipendenza Albanese' },
  ];

  englishTimeline = [
    { year: '385 BC', label: 'Foundation of Lissus' },
    { year: '1393', label: 'Venetian Dominion' },
    { year: '1444', label: 'League of Alessio' },
    { year: '1468', label: 'Death of Skanderbeg' },
    { year: '1912', label: 'Albanian Independence' },
  ];
}
