import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PublicationsService } from '@core/services/publications.service';

@Component({
  selector: 'app-pubblicazioni',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './pubblicazioni.component.html',
  styleUrls: ['./pubblicazioni.component.scss'],
})
export class PubblicazioniComponent implements OnInit {
  filter = 'all';
  publications: any[] = [];

  constructor(private publicationsService: PublicationsService) {}

  ngOnInit() {
    this.publicationsService.getPublications().subscribe({
      next: (pubs) => (this.publications = pubs),
      error: (err) => console.error('Error loading publications:', err),
    });
  }

  fallbackPublications = [
    { icon: 'fa-solid fa-book', type: 'Libro', title: 'Skanderbeg e la Lega di Alessio', description: 'Un\'approfondita ricerca su Gjergj Kastrioti e la resistenza albanese del XV secolo.', year: 2020 },
    { icon: 'fa-solid fa-scroll', type: 'Articolo', title: 'Fortificazioni medievali di Lezha', description: 'Studio archeologico delle mura e delle strutture difensive.', year: 2019 },
    { icon: 'fa-solid fa-book', type: 'Libro', title: 'La Memoria di Lezha', description: 'Raccolta di documenti storici inediti da archivi europei.', year: 2018 },
    { icon: 'fa-solid fa-file', type: 'Ricerca', title: 'Il Castello sotto il Dominio Veneziano', description: 'Analisi cartografica e archivistica del periodo 1393-1479.', year: 2017 },
    { icon: 'fa-solid fa-scroll', type: 'Articolo', title: 'Manoscritti della Lega di Alessio', description: 'Catalogazione e trascrizione di documenti diplomatici.', year: 2016 },
    { icon: 'fa-solid fa-book', type: 'Libro', title: 'La Chiesa di San Nicola', description: 'Storia e conservazione del memoriale di Skanderbeg.', year: 2015 }
  ];
}
