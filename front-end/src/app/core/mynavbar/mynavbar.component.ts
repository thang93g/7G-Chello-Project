import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-mynavbar',
  templateUrl: './mynavbar.component.html',
  styleUrls: ['./mynavbar.component.css']
})
export class MynavbarComponent implements OnInit {
  user!: any;
  notis!: any;
  user_id!: any;

  constructor(
    private router: Router,
    private userService: UserService,
    ) { }

  ngOnInit(): void {
    this.user = new User();

    this.user_id = localStorage.getItem('id');

    this.userService.getNoti(this.user_id).subscribe(data => {
      this.notis = data;
    },error => console.log(error))

    this.userService.getUser(this.user_id).subscribe(data => {
      this.user = data;
    },error => console.log(error)
    )
  }


  getInfo() {
    this.router.navigate(['profile']);
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  goHome() {
    this.router.navigate(['board']);
  }
}
