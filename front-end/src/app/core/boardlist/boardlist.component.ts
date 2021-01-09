import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from 'src/app/group/group';
import { GroupService } from 'src/app/group/group.service';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { Board } from './board';
import { BoardService } from './board.service';

@Component({
  selector: 'app-boardlist',
  templateUrl: './boardlist.component.html',
  styleUrls: ['./boardlist.component.css'],
})
export class BoardlistComponent implements OnInit {
  user_id!: any;
  user!: any;
  group!: any;
  groups!: any;
  board: Board = new Board();

  constructor(
    private router: Router,
    private groupService: GroupService,
    private userService: UserService,
    private boardService: BoardService,
    ) {}

  ngOnInit(): void {
    this.user = new User();

    this.group = new Group();

    this.user_id = localStorage.getItem('id');
    this.group.user_id = this.user_id;

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

  goHome() {
    this.router.navigate(['board']);
  }

  getInfo() {
    this.router.navigate(['profile']);
  }

  onSubmit(id: number){
    this.boardService.createBoard(id,this.board).subscribe((data: any) =>{
      this.board = new Board();
      document.location.reload();
    },(error: any) => console.log(error) )
  }

  viewGroup(id: number){
    this.router.navigate(['group',id]);
  }

  createGroup(){
    this.groupService.createGroup(this.group).subscribe(
      data => {
        console.log(this.group)
        this.group = new Group();
        document.location.reload();
      },error => console.log(error)
    )
  }
}
