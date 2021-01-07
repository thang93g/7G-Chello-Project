
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingupComponent } from './singup/singup.component';


import { LoginComponent } from './login/login.component'
import { NavbarComponent } from './core/homepage/navbar.component';
import { BoardpageComponent } from './core/boardpage/boardpage.component';
import { BoardlistComponent } from './core/boardlist/boardlist.component';
import { ProfileComponent } from './core/profile/profile/profile.component';

const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: NavbarComponent },
  { path: 'board', component: BoardlistComponent },
  { path: 'column', component: BoardpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'singup', component: SingupComponent },
  { path: 'profile', component: ProfileComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }