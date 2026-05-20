import { Injectable } from '@nestjs/common';

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbUrl: string;
  category: string;
}

@Injectable()
export class GalleryService {
  private galleryItems: GalleryItem[] = [
    {
      id: '1',
      title: 'Castello di Lezha',
      description: 'Vista panoramica della fortezza medievale',
      imageUrl: '/assets/gallery/castello.jpg',
      thumbUrl: '/assets/gallery/castello-thumb.jpg',
      category: 'fortezze',
    },
    {
      id: '2',
      title: 'Memoriale di San Nicola',
      description: 'Il sepolcro di Skanderbeg e la chiesa commemorativa',
      imageUrl: '/assets/gallery/memoriale.jpg',
      thumbUrl: '/assets/gallery/memoriale-thumb.jpg',
      category: 'monumenti',
    },
    {
      id: '3',
      title: 'Archivi Storici',
      description: 'Collezione di manoscritti e documenti storici',
      imageUrl: '/assets/gallery/archivi.jpg',
      thumbUrl: '/assets/gallery/archivi-thumb.jpg',
      category: 'archivi',
    },
    {
      id: '4',
      title: 'Veduta della Città',
      description: 'Panorama di Lezha dal castello',
      imageUrl: '/assets/gallery/veduta.jpg',
      thumbUrl: '/assets/gallery/veduta-thumb.jpg',
      category: 'paesaggi',
    },
    {
      id: '5',
      title: 'Testimonianze Culturali',
      description: 'Oggetti e manufatti del patrimonio albanese',
      imageUrl: '/assets/gallery/cultura.jpg',
      thumbUrl: '/assets/gallery/cultura-thumb.jpg',
      category: 'cultura',
    },
    {
      id: '6',
      title: 'Mappe Storiche',
      description: 'Cartografia dell\'Albania nel XV secolo',
      imageUrl: '/assets/gallery/mappe.jpg',
      thumbUrl: '/assets/gallery/mappe-thumb.jpg',
      category: 'mappe',
    },
  ];

  async findAll(): Promise<GalleryItem[]> {
    return this.galleryItems;
  }

  async findById(id: string): Promise<GalleryItem | undefined> {
    return this.galleryItems.find((item) => item.id === id);
  }
}
