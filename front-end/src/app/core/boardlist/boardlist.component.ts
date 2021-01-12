import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Group } from 'src/app/group/group';
import { GroupService } from 'src/app/group/group.service';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { Board } from './board';
import { BoardService } from './board.service';

export interface DialogData {
  group_id: any;
}

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
  show: boolean = true;

  constructor(
    private router: Router,
    private groupService: GroupService,
    private userService: UserService,
    private boardService: BoardService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    ) {}

  ngOnInit(): void {
    this.loadData();
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {board_id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadData();
    });
  }

  loadData(){
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

  showFormAddGroup() {
    this.show = false;
  }
  hideFormAddGroup() {
    this.show = true;
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
      this.toastr.success('Tạo mới bảng thành công !');
    },(error: any) => {
      console.log(error);
      this.toastr.error('Tạo mới bảng không thành công !')
    })
  }

  viewGroup(id: number){
    this.router.navigate(['group',id]);
  }

  createGroup(){
    this.groupService.createGroup(this.group).subscribe(
      (      data: any) => {
        this.group = new Group();
        this.loadData();
        this.toastr.success('Tạo dự án thành công !');
        this.show = true;
      },error => {
        console.log(error);
        this.toastr.error('Tạo dự án không thành công !');
      }
    )
  }

  gotoBoard(id: number){
    this.router.navigate(['board',id]);
  }

  openAddBoardDialog(id: number) {
    const dialogRef =  this.dialog.open(AddBoardDialog, {
      width: '300px',
      height: '250px',
      data: {group_id : id},
    });

    dialogRef.afterClosed().subscribe(result => {
     this.loadData();
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private boardService: BoardService,
    private toastr: ToastrService,
    public dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


  deleteBoard(id: number){
      this.boardService.deleteBoard(id).subscribe(
        data => {
          this.toastr.success('Xóa bảng thành công !');
          this.dialogRef.close();
        }, error => console.log(error)
      )
  }
}


@Component({
  selector: 'dialog-add-board',
  templateUrl: 'dialog-add-board.html',
})
export class AddBoardDialog implements OnInit {
  user_id!: any;
  user!: any;
  group!: any;
  groups!: any;
  group_id!: any;
  board: Board = new Board();

  constructor(
    private groupService: GroupService,
    private userService: UserService,
    private boardService: BoardService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogData>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

  ngOnInit(): void {
    this.loadData();
  }


  onSubmit(id: number){
    this.boardService.createBoard(id,this.board).subscribe((data: any) =>{
      this.board = new Board();
      this.loadData();
      this.toastr.success('Tạo mới bảng thành công !');
      this.dialogRef.close();
    },(error: any) => {
      console.log(error);
      this.toastr.error('Tạo mới bảng không thành công !')
    })
  }

  loadData(){
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
}

export interface DialogData {
  board_id: number,
}