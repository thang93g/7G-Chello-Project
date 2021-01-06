import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BoardpageComponent } from './core/boardpage/boardpage.component';

import { NavbarComponent } from './core/homepage/navbar.component';
import { ProfileComponent } from './core/profile/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardpageComponent,
    NavbarComponent,
    ProfileComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatBadgeModule,
    MatToolbarModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
