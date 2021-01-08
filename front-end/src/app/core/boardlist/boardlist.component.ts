import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/group/group.service';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-boardlist',
  templateUrl: './boardlist.component.html',
  styleUrls: ['./boardlist.component.css'],
})
export class BoardlistComponent implements OnInit {
  user_id!: any;
  groups!: any;
  user!: any;

  constructor(
    private router: Router,
    private groupService: GroupService,
    private userService: UserService
    ) {}

  ngOnInit(): void {
    this.user = new User();
    this.userService.getUser(this.user_id).subscribe(u => {
      this.user = u;
      console.log(u)
;
    }, error => console.log(error))
    this.user_id = localStorage.getItem('id');
    this.groupService.getBoardList(this.user_id).subscribe(data => {
      this.groups = data;
    },error => console.log(error));
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  getInfo() {
    this.router.navigate(['profile']);
  }
}
