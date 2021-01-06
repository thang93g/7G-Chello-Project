
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingupComponent } from './singup/singup.component';


import { LoginComponent } from './login/login.component'
import { NavbarComponent } from './core/homepage/navbar.component';

const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: NavbarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'singup', component: SingupComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }