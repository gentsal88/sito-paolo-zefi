import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ContentService, Biography, TimelineItem } from '@core/services/content.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-biografia',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './biografia.component.html',
    styleUrls: ['./biografia.component.scss'],
})
export class BiografiaComponent implements OnInit, AfterViewChecked {
  timelineItems: TimelineItem[] = [];
  portraitUrl = 'assets/images/paolo-id.png';
  stats: any[] = [];
  // Timeline display control
  showAllTimeline = false;
  timelinePreviewCount = 3;
  private lastLineHeight = -1;

  @ViewChild('timelineContainer') private timelineContainer?: ElementRef<HTMLElement>;
  @ViewChild('timelineLine') private timelineLine?: ElementRef<HTMLElement>;

  constructor(private contentService: ContentService, private translate: TranslateService) {}

  ngOnInit() {
    this.contentService.getBiography().subscribe({
      next: (bio: Biography) => {
        this.portraitUrl = bio.portraitUrl;
        const items = (bio.timelineItems && bio.timelineItems.length) ? bio.timelineItems : this.getLocaleFallback();
        this.timelineItems = items;
        this.stats = bio.stats;
      },
      error: (err: any) => {
        console.error('Error loading biography:', err);
        this.timelineItems = this.getLocaleFallback();
      },
    });
  }

  get visibleTimelineItems(): TimelineItem[] {
    return this.showAllTimeline ? this.timelineItems : this.timelineItems.slice(0, this.timelinePreviewCount);
  }

  toggleTimeline() {
    this.showAllTimeline = !this.showAllTimeline;
  }

  ngAfterViewChecked(): void {
    this.updateLineHeight();
  }

  private updateLineHeight(): void {
    try {
      if (!this.timelineContainer || !this.timelineLine) return;
      const containerEl = this.timelineContainer.nativeElement as HTMLElement;
      const items = containerEl.querySelectorAll('.timeline-item');
      if (!items || items.length === 0) {
        this.timelineLine.nativeElement.style.height = '0px';
        return;
      }
      const lastItem = items[items.length - 1] as HTMLElement;
      const containerRect = containerEl.getBoundingClientRect();
      const lastRect = lastItem.getBoundingClientRect();
      const height = (lastRect.top + lastRect.height / 2) - containerRect.top;
      const h = Math.max(0, Math.round(height));
      if (this.lastLineHeight !== h) {
        this.timelineLine.nativeElement.style.height = h + 'px';
        this.lastLineHeight = h;
      }
    } catch (err) {
      // silent
    }
  }

  private getLocaleFallback(): TimelineItem[] {
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'it';
    return lang.startsWith('en') ? this.englishFallbackTimelineItems : this.fallbackTimelineItems;
  }

  // Fallback data
  fallbackTimelineItems: TimelineItem[] = [
    { id: 't1', year: '1965', title: 'Nascita a Lezha', description: 'Paulin Zefi nasce nella storica città di Lezha, in una famiglia che custodisce da generazioni la tradizione orale albanese.' },
    { id: 't2', year: '1989', title: 'Laurea in Storia Medievale', description: 'Si laurea all\'Università di Tirana con una tesi sulla Lega di Alessio e sulla resistenza albanese del XV secolo.' },
    { id: 't3', year: '1995', title: 'Primi Studi sul Castello di Lezha', description: 'Avvia un progetto di ricerca decennale sulle fortificazioni medievali di Lezha e sulla loro evoluzione storica.' },
    { id: 't4', year: '2005', title: 'Conservatore del Memoriale di Skanderbeg', description: 'Assume il ruolo di consulente storico per la conservazione del Memoriale di Skanderbeg presso la Chiesa di San Nicola.' },
    { id: 't5', year: '2015', title: 'Riconoscimento Internazionale', description: 'Le sue ricerche ottengono visibilità internazionale, con collaborazioni con università italiane, austriache e turche.' },
    { id: 't6', year: '2024', title: 'Custode della Memoria', description: 'Continua la sua opera di divulgazione, lezioni pubbliche e mentorship di giovani storici albanesi.' }
  ];

  englishFallbackTimelineItems: TimelineItem[] = [
    { id: 't1', year: '1965', title: 'Birth in Lezha', description: 'Paulin Zefi is born in the historic town of Lezha, into a family that has preserved oral traditions for generations.' },
    { id: 't2', year: '1989', title: 'Degree in Medieval History', description: 'He graduates from the University of Tirana with a thesis on the League of Alessio and the 15th-century Albanian resistance.' },
    { id: 't3', year: '1995', title: 'Early Studies on Lezha Castle', description: 'He begins a decade-long research project on Lezha\'s medieval fortifications and their historical evolution.' },
    { id: 't4', year: '2005', title: 'Curator of the Skanderbeg Memorial', description: 'He takes on the role of historical consultant for the conservation of the Skanderbeg Memorial at the Church of Saint Nicholas.' },
    { id: 't5', year: '2015', title: 'International Recognition', description: 'His research gains international visibility, with collaborations across Italian, Austrian and Turkish universities.' },
    { id: 't6', year: '2024', title: 'Keeper of Memory', description: 'He continues his outreach work, public lectures and mentorship of young Albanian historians.' }
  ];
}

