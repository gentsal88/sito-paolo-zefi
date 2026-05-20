import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { GalleryService } from '@core/services/gallery.service';

@Component({
  selector: 'app-galleria',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './galleria.component.html',
  styleUrls: ['./galleria.component.scss'],
})
export class GalleriaComponent implements OnInit {
  lightboxOpen = signal(false);
  selectedItem = signal<any>(null);
  galleryItems = signal<any[]>([]);

  constructor(private galleryService: GalleryService) {}

  ngOnInit() {
    this.galleryService.getGallery().subscribe({
      next: (items) => this.galleryItems.set(items),
      error: (err) => console.error('Error loading gallery:', err),
    });
  }

  fallbackGalleryItems = [
    { id: 1, image: 'https://via.placeholder.com/400x400', title: 'Castello di Lezha', description: 'Le rovine medievali del castello che dominano la città' },
    { id: 2, image: 'https://via.placeholder.com/400x400', title: 'Memoriale di Skanderbeg', description: 'Il monumento dedicato al grande eroe albanese' },
    { id: 3, image: 'https://via.placeholder.com/400x400', title: 'Archivi Storici', description: 'Documenti antichi conservati negli archivi di Lezha' },
    { id: 4, image: 'https://via.placeholder.com/400x400', title: 'Veduta Lezha', description: 'Panoramica della città dal castello' },
    { id: 5, image: 'https://via.placeholder.com/400x400', title: 'Monete Antiche', description: 'Reperti numismatici dal periodo bizantino e veneziano' },
    { id: 6, image: 'https://via.placeholder.com/400x400', title: 'Manoscritti', description: 'Manoscritti inediti della Lega di Alessio' }
  ];

  openLightbox(item: any) {
    this.selectedItem.set(item);
    this.lightboxOpen.set(true);
  }

  closeLightbox() {
    this.lightboxOpen.set(false);
  }
}
