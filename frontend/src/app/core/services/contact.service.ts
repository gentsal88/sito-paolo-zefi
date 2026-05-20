import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ContactMessage {
  nome: string;
  email: string;
  oggetto: string;
  messaggio: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/contacts`;

  constructor(private http: HttpClient) {}

  sendMessage(data: ContactMessage): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(`${this.apiUrl}`, data);
  }
}
