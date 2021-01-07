import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private userService: UserService) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("id");
    this.user = this.userService.getUser(this.id)
  }

  updatePassword() {
    this.passwordService.changePassword(this.id, this.oldPassword, this.newPassword, this.newPasswordConfirm).subscribe(
      data => {
        console.log(data);
        this.back
      }
    );
  }

  back() {
    this.router.navigate(['/profile']);
  }

}
