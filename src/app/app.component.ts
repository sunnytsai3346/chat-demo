
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from './chatbot.service';

@Component({
  selector: 'app-root',
  imports: [ CommonModule,MatToolbarModule,MatSidenav,MatSidenavModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild('scrollMe') private chatContainer!: ElementRef;
  messages: { sender: string, text: string }[] = [];
  userMessage: string = '';

  constructor(private chatbotService: ChatbotService) {}
  
  sendMessage() {
    if (!this.userMessage.trim()) return;

    // Add user's message
    this.messages.push({ sender: 'user', text: this.userMessage });
    // Send message to Rasa API

    this.chatbotService.sendMessage(this.userMessage).subscribe((response: any) => {
      response.forEach((msg: any) => {
        console.log("msg");
        this.messages.push({ sender: 'bot', text: msg.text });
      });
    });

    // // Simulate bot response
    // setTimeout(() => {
    //   this.messages.push({ sender: 'bot', text: 'echo ' +this.userMessage });
    // }, 1000);

    this.userMessage = '';
  }


  title = 'chat-demo';
  toggleSidenav() {
    this.sidenav.toggle();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

  clearMessages() {
    this.messages = [];
  }
}
