import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'http://localhost:5005/webhooks/rest/webhook'; // Adjust to your Rasa server URL

  constructor(private http: HttpClient) {}

  sendMessage(message: string, language: string): Observable<any> {
    const payload = {
      sender: 'user',
      message: message,
      language: language
    };
    return this.http.post(this.apiUrl, payload);
  }
}