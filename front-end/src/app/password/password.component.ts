import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';
import { NotificationService } from '../notice/notice.service';
import { UserService } from '../user/user.service';
import { PasswordService } from './password.service';


@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  user!: any;
  id!: any;
  oldPassword!: any;
  newPassword!: any;
  newPasswordConfirm!: any;
  value!: any
  hide = true;
  hide2 = true;
  hide3 = true ;

  constructor(private router: Router,
    private passwordService: PasswordService,
    private userService: UserService,
    private toastr: ToastrService,
   ) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("id");
    this.user = this.userService.getUser(this.id);
    this.getToken();
  }
  getToken() {
    if(localStorage.getItem('token')){
      this.router.navigate(['password']);
    }else{
      this.router.navigate(['error']);
    }
  }

  updatePassword() {
    this.passwordService.changePassword(this.id, this.oldPassword, this.newPassword, this.newPasswordConfirm).subscribe(
      data => {
       this.toastr.success('Đổi mật khẩu thành công');
       this.router.navigate(['/profile']);
      });
  }

  back() {
    this.router.navigate(['/profile']);
  }

  goHome(){
    this.router.navigate(['board'])
  }

}
