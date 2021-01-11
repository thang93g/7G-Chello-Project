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

    this.loadData();
  }

  loadData(){
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
      this.loadData();
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
        this.loadData();
      },error => console.log(error)
    )
  }

  gotoBoard(id: number){
    this.router.navigate(['board',id]);
  }

  deleteBoard(id: number){
    if(window.confirm('Bạn chắc chắn muốn xóa ? ')){
      this.boardService.deleteBoard(id).subscribe(
        data => {
          this.loadData();
        }, error => console.log(error)
      )
    }
  }
}
