import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { provideAnimations } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(), 
    provideAnimationsAsync(),     
    provideAnimations(), // Required for Material    
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(MatDialogModule),
    importProvidersFrom(MatSnackBarModule),
    importProvidersFrom(MatTooltipModule),
    importProvidersFrom(MatButtonModule),
    importProvidersFrom(MatCardModule),
    importProvidersFrom(MatSidenavModule),
    importProvidersFrom(MatToolbarModule),
    importProvidersFrom(MatProgressSpinnerModule), provideAnimationsAsync()
  ]
};
