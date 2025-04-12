
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  imports: [ CommonModule,MatToolbarModule,MatSidenav,MatSidenavModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  title = 'chat-demo';
  toggleSidenav() {
    this.sidenav.toggle();
  }
}
