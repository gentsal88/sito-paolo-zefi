import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { signal } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface Publication {
  id: string;
  title: string;
  type: 'libro' | 'articolo' | 'ricerca';
  description: string;
  year: number;
  icon: string;
}

@Injectable({
  providedIn: 'root',
})
export class PublicationsService {
  private apiUrl = `${environment.apiUrl}/publications`;
  publications = signal<Publication[]>([]);

  constructor(private http: HttpClient) {
    this.loadPublications();
  }

  loadPublications(): void {
    this.http.get<Publication[]>(this.apiUrl).subscribe({
      next: (data) => this.publications.set(data),
      error: (err) => console.error('Error loading publications:', err),
    });
  }

  getPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.apiUrl);
  }

  getPublicationById(id: string): Observable<Publication> {
    return this.http.get<Publication>(`${this.apiUrl}/${id}`);
  }
}
