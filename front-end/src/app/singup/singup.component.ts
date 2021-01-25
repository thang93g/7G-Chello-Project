import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../user/user';
import {UserService} from '../user/user.service';
import {SingupService} from './singup.service';
import {ToastrService} from 'ngx-toastr'


@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  user: User = new User();
  submitted = false;
  newPasswordConfirm!: any;
  hide = true;
  hide2 = true;

  constructor(private UserService: SingupService,
              private router: Router,
              private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
  }

  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }

  save() {
    this.UserService
      .register(this.user).subscribe((data: any) => {
        if (data) {
          this.toastr.success("Đăng ký thành công")
          this.user = new User();
          this.gotoLogin();
        }
      },
      (error: any) => this.toastr.error("Đăng ký thất bại, tài khoản đã tồn tại"));
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
