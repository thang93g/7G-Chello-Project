import { Component, OnInit } from '@angular/core';
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

  deleteMember(user_id: number) {
    if (window.confirm('Bạn thực sự muốn xóa ?')) {
      this.groupService.deleteMember(this.id, user_id).subscribe((data) => {
        this.loadData();
        this.toastr.success('Xóa thành viên thành công !');
      });
    }
  }

  deleteGroup() {
    if (window.confirm('Bạn thực sự muốn xóa ?')) {
      this.groupService.deleteGroup(this.id).subscribe((data) => {
        this.router.navigate(['board']);
        this.toastr.success('Xóa dự án thành công !');
      });
    }
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  getInfo() {
    this.router.navigate(['profile']);
  }

  combackBoardList() {
    this.router.navigate(['board']);
  }
}
