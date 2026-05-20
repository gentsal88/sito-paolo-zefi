import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { signal } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface Story {
  id: number;
  icon: string;
  era: string;
  title: string;
  description: string;
  articleUrl?: string;
  downloadUrl?: string;
  content?: string;
}

export interface Biography {
  id: string;
  portraitUrl: string;
  bioText: string;
  stats: Array<{ label: string; value: string }>;
  timelineItems: TimelineItem[];
}

export interface ContentData {
  biography: Biography;
  stories: Story[];
}

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private apiUrl = `${environment.apiUrl}/content`;
  biography = signal<Biography | null>(null);
  stories = signal<Story[]>([]);

  constructor(private http: HttpClient) {
    this.loadContent();
  }

  loadContent(): void {
    this.http.get<ContentData>(`${this.apiUrl}`).subscribe({
      next: (data) => {
        this.biography.set(data.biography);
        this.stories.set(data.stories);
      },
      error: (err) => console.error('Error loading content:', err),
    });
  }

  getContent(): Observable<ContentData> {
    return this.http.get<ContentData>(this.apiUrl);
  }

  getBiography(): Observable<Biography> {
    return this.http.get<Biography>(`${this.apiUrl}/biography`);
  }

  getStories(): Observable<Story[]> {
    return this.http.get<Story[]>(`${this.apiUrl}/stories`);
  }

  getStory(id: string | number): Observable<Story> {
    return this.http.get<Story>(`${this.apiUrl}/stories/${id}`);
  }

  getTimeline(): Observable<TimelineItem[]> {
    return this.http.get<TimelineItem[]>(`${this.apiUrl}/timeline`);
  }
}
