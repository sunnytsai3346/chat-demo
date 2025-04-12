import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  //private dialogflowUrl = 'https://dialogflow.googleapis.com/v2/projects/your-project-id/agent/sessions/session-id:detectIntent';
  //private rasaApiUrl = 'http://localhost:5055/webhooks/rest/webhook';
  private rasaApiUrl = 'http://localhost:5005/webhooks/rest/webhook';

  constructor(private http: HttpClient) {}

  sendMessage(message: string) {
    const payload = { message: message, sender: 'user' };
    return this.http.post(this.rasaApiUrl, payload);
  }
}