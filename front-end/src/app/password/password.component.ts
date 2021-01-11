import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router,
    private passwordService: PasswordService,
    private userService: UserService,
   ) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("id");
    this.user = this.userService.getUser(this.id);
  }

  updatePassword() {
    this.passwordService.changePassword(this.id, this.oldPassword, this.newPassword, this.newPasswordConfirm).subscribe(
      data => {
       this.changePasswordSuccess(data);
      });
  }

  changePasswordSuccess(data:string) {
    if(data === "Đổi mật khẩu thành công") {
      alert(data)
    this.router.navigate(['/profile']);
  } else {
    alert(data);
  }
  }


  back() {
    this.router.navigate(['/profile']);
  }

  goHome(){
    this.router.navigate(['board'])
  }

}
