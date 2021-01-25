import {LoginService} from './login.service';
import {User} from '../user/user';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  result!: Observable<any>;
  email !: string;
  password !: string;

  constructor(private loginService: LoginService,
              private router: Router,
              private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    // this.getToken();
  }


  getToken() {
    this.loginService.login(this.email, this.password).subscribe(
      data => {
        if (data === null) {
          this.toastr.error("Tài khoản hoặc mật khẩu không đúng")
        } else {
          localStorage.setItem('token', data[1]);
          localStorage.setItem('id', data[0].id);
          this.router.navigate(['board']);
        }
      },
      error => console.log(error));
  }

  gotoSingup() {
    this.router.navigate(['singup'])
  }

  gobackHomePage() {
    this.router.navigate([''])
  }


}



