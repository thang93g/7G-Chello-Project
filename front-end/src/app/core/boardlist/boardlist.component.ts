import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Group } from 'src/app/group/group';
import { GroupService } from 'src/app/group/group.service';
import { LoginService } from 'src/app/login/login.service';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { Board } from './board';
import { BoardService } from './board.service';

export interface DialogData {
  group_id: any;
  group: any;
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
  email!: string;
  password !: string;



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
    this.getToken();
   
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {
        board_id: id,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadData();
    });
  }

  getToken() {
    if(localStorage.getItem('token')){
      this.router.navigate(['board']);
    }else{
      this.router.navigate(['error']);
    }
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
      height: '300px',
      data: {
        group_id : id,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
     this.loadData();
    });
  }

  openGroupDetailDialog(group_id:any) {
    const dialogRef = this.dialog.open(GroupDetaiDialog, {
      width: "500px",
      height: "500px",
      data : { group_id: group_id }
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
  backgrounds = [
    {link: 'https://firebasestorage.googleapis.com/v0/b/chello-7a341.appspot.com/o/RoomsImages%2F1610443462895?alt=media&token=5d06bf78-b4a3-456c-9522-f1cd4d9ef56f'},
    {link: 'https://firebasestorage.googleapis.com/v0/b/chello-7a341.appspot.com/o/RoomsImages%2F1610443505011?alt=media&token=847a2021-14d6-4438-8f77-9145b29fb6ee'},
    {link: 'https://firebasestorage.googleapis.com/v0/b/chello-7a341.appspot.com/o/RoomsImages%2F1610443531939?alt=media&token=0203a5db-945d-4dca-8d46-ee162ac0a53e'},
    {link: 'https://firebasestorage.googleapis.com/v0/b/chello-7a341.appspot.com/o/RoomsImages%2F1610443553865?alt=media&token=70c908a1-6d04-48ec-8920-b569d643849f'},
    {link: 'https://firebasestorage.googleapis.com/v0/b/chello-7a341.appspot.com/o/RoomsImages%2F1610443575009?alt=media&token=d0feb2b9-e7c5-4e4a-ae18-6aad7958ddc8'},
  ];

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

@Component({
  selector: 'dialog-groupdetail',
  templateUrl: 'dialog-groupdetail.html',
})
export class GroupDetaiDialog  implements OnInit{
  id!: number;
  group!: any;
  members!: any;
  user!: any;
  add_member: boolean = false;

  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private groupService: GroupService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.id = this.data.group_id;
    this.loadData();


    // this.getToken();
  }
  getToken() {
    if(localStorage.getItem('token')){
      this.router.navigate(['group/:id']);
    }else{
      this.router.navigate(['error']);
    }
  }

  loadData() {
    this.user = new User();
    this.group = new Group();
    this.groupService.getGroup(this.id).subscribe(
      (data) => {
        this.group = data;
      },
      (error) => console.log(error)
    );

    

    this.groupService.getMember(this.id).subscribe(
      (data) => {
        this.members = data;
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    this.groupService.addMember(this.id, this.user).subscribe(
      (data) => {
        this.user = new User();
        this.loadData();
        this.toastr.success('Thêm thành viên thành công !');
      },
      error => {
        console.log(error);
        this.toastr.error('Thêm thành viên không thành công !');
      }
    );
  }

  addMember() {
    this.add_member = true;
  }

  cancelAddMember() {
    this.add_member = false;
  }

  openDialogDeleteGroup(){
    const dialogRef = this.dialog.open(DeleteGrouppDialog, {
      width: '250px',
      data: {id: this.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialog.closeAll();
      this.loadData();
    });
  }

  openDialogDeleteMember(id: number,group_id: number){
    const dialogRef = this.dialog.open(DeleteMemberDialog, {
      width: '250px',
      data: {id: id,group_id: group_id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }  
}

@Component({
  selector: 'delete-group-dialog',
  templateUrl: 'delete-group.html',
})
export class DeleteGrouppDialog implements OnInit {

  user_id!: any;
  group!: any;

  constructor(
    private groupService: GroupService,
    private toastr: ToastrService,
    private router: Router,
    public dialogRef: MatDialogRef<DeleteGrouppDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


  ngOnInit(): void {
    this.user_id = localStorage.getItem('id');
    this.group = new Group();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteGroup(id: number) {
      this.groupService.deleteGroup(id).subscribe((data) => {
        this.dialogRef.close();
        this.toastr.success('Xóa dự án thành công !');
        // this.loadData();
        window.location.reload();
      });
    }

  loadData(){
    this.groupService.getBoardList(this.user_id).subscribe(
      data => {
        this.group = data;
      }, 
      error => console.log(error)
    );
  }
}

@Component({
  selector: 'delete-member-dialog',
  templateUrl: 'delete-member.html',
})
export class DeleteMemberDialog {

  constructor(
    private groupService: GroupService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<DeleteGrouppDialog>,
    @Inject(MAT_DIALOG_DATA) public data: MemberData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


  deleteMember() {
    console.log(this.data)
    this.groupService.deleteMember(this.data.group_id,this.data.id).subscribe((data) => {
      this.dialogRef.close();
      this.toastr.success('Xóa thành viên thành công !');
    });
}
}

export interface MemberData {
  id: number;
  group_id: number;
}

export interface DialogData {
  id: number;
}