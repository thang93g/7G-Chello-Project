import { LoginService } from './login.service';
import { User } from '../user/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  result!: Observable<any>;
  // token = new Observable<any>();
  // token!: Observable<string>;
  email !: string;
  password !: string;

  constructor(private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    // this.getToken();
  }

  
  getToken() {
    console.log(this.email, this.password);
    this.loginService.login(this.email, this.password).subscribe(
      data => {
        console.log(data[0]);
        localStorage.setItem('token',data[1]);
        localStorage.setItem('id',data[0].id);
        this.router.navigate(['board']);
      },
      error => console.log(error));
  }
  gotoSingup(){
    this.router.navigate(['singup'])
  }

  gobackHomePage() {
    this.router.navigate([''])
  }

}