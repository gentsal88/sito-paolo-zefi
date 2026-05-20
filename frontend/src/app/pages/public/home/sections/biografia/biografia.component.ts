import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ContentService, Biography, TimelineItem } from '@core/services/content.service';

@Component({
  selector: 'app-biografia',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './biografia.component.html',
  styleUrl: './biografia.component.scss',
})
export class BiografiaComponent implements OnInit {
  timelineItems: TimelineItem[] = [];
  portraitUrl = 'assets/images/paolo-id.png';
  stats: any[] = [];

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.contentService.getBiography().subscribe({
      next: (bio: Biography) => {
        this.portraitUrl = bio.portraitUrl;
        this.timelineItems = bio.timelineItems;
        this.stats = bio.stats;
      },
      error: (err: any) => console.error('Error loading biography:', err),
    });
  }

  // Fallback data
  fallbackTimelineItems = [
    { year: '1965', title: 'Nascita', description: 'Paulin Zefi nasce a Lezha' },
    { year: '1989', title: 'Laurea', description: 'Si laurea in Storia Medievale all\'Università di Tirana' },
    { year: '1995', title: 'Primi Studi', description: 'Pubblica i primi studi sui manoscritti della Lega di Alessio' },
    { year: '2005', title: 'Conservatore', description: 'Diventa Conservatore del Patrimonio Storico di Lezha' },
    { year: '2015', title: 'Riconoscimento', description: 'Riceve il riconoscimento internazionale per i suoi studi' },
    { year: '2024', title: 'Custode della Memoria', description: 'Dirige il progetto di conservazione digitale della memoria albanese' }
  ];
}

