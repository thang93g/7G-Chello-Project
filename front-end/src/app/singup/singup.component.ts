import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { SingupService } from './singup.service';


@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  user: User = new User();
  submitted = false;
  newPasswordConfirm!:any;
  hide : true | undefined;
  hide2 : true | undefined;

  constructor(private UserService: SingupService,
    private router : Router) { }

  ngOnInit(): void {
  }

  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }
  save() {
    this.UserService
      .register(this.user).subscribe((data: any) => {
        if(data) {
          alert("Đăng ký thành công")
        this.user = new User();
        this.gotoLogin();
      } 
      },
        (error: any) => alert("Đăng ký thất bại, tài khoản đã tồn tại"));
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoLogin() {
    this.router.navigate(['login'])
  }
  gobackHomePage() {
    this.router.navigate([''])
  }
  
  

}
