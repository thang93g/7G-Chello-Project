import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/group/group.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-boardlist',
  templateUrl: './boardlist.component.html',
  styleUrls: ['./boardlist.component.css'],
})
export class BoardlistComponent implements OnInit {
  user_id!: any;
  user!: any;
  groups!: any;

  constructor(
    private router: Router,
    private groupService: GroupService,
    private userService: UserService,
    ) {}

  ngOnInit(): void {
    this.user_id = localStorage.getItem('id');

    this.groupService.getBoardList(this.user_id).subscribe(data => {
      this.groups = data;
    },error => console.log(error));

    this.userService.getUser(this.user_id).subscribe(data => {
      this.user = data;
    },error => console.log(error)
    )
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  getInfo() {
    this.router.navigate(['profile']);
  }
}
