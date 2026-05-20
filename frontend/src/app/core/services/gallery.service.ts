import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { signal } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbUrl: string;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private apiUrl = `${environment.apiUrl}/gallery`;
  galleryItems = signal<GalleryItem[]>([]);

  constructor(private http: HttpClient) {
    this.loadGallery();
  }

  loadGallery(): void {
    this.http.get<GalleryItem[]>(this.apiUrl).subscribe({
      next: (data) => this.galleryItems.set(data),
      error: (err) => console.error('Error loading gallery:', err),
    });
  }

  getGallery(): Observable<GalleryItem[]> {
    return this.http.get<GalleryItem[]>(this.apiUrl);
  }

  getGalleryItemById(id: string): Observable<GalleryItem> {
    return this.http.get<GalleryItem>(`${this.apiUrl}/${id}`);
  }
}
