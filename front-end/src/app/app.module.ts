import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BoardpageComponent } from './core/boardpage/boardpage.component';
import { NavbarComponent } from './core/homepage/navbar.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';


import { ProfileComponent } from './core/profile/profile/profile.component';
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BoardpageComponent,
    NavbarComponent,
    LoginComponent,
    SingupComponent,
    ProfileComponent
  ],

  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatBadgeModule,
    MatToolbarModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
