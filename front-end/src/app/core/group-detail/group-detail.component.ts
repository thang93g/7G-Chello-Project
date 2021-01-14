import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Group } from 'src/app/group/group';
import { GroupService } from 'src/app/group/group.service';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css'],
})
export class GroupDetailComponent implements OnInit {
  id!: number;
  group!: any;
  members!: any;
  user!: any;

  constructor(
    private groupService: GroupService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
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
    this.id = this.route.snapshot.params['id'];
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
      (error: any) => {
        console.log(error)
        this.toastr.error('Thêm thành viên không thành công !');
      }
    );
  }

  openDialogDeleteGroup(){
    const dialogRef = this.dialog.open(DeleteGrouppDialog, {
      width: '250px',
      data: {id: this.id}
    });

    dialogRef.afterClosed().subscribe(result => {
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
export class DeleteGrouppDialog {

  constructor(
    private groupService: GroupService,
    private toastr: ToastrService,
    private router: Router,
    public dialogRef: MatDialogRef<DeleteGrouppDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteGroup(id: number) {
      this.groupService.deleteGroup(id).subscribe((data) => {
        this.dialogRef.close();
        this.router.navigate(['board']);
        this.toastr.success('Xóa dự án thành công !');
      });
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
