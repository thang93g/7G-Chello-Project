import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/user/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; 
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PasswordService } from 'src/app/password/password.service';
import { error } from 'protractor';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html', 
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  title = 'cloudsSorage';
  selectedFile!: any;
  downloadURL!: Observable<string>;
  user!: any;
  id!: any;
  userInfoFormGroup!: FormGroup;
  img_load: boolean = false;
  constructor(
    private storage: AngularFireStorage,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}
  

  ngOnInit() {
    this.loadData();
    this.getToken();
  }

  imgLoad() {
    this.img_load = true;
  }

  imgLoadDone() {
    this.img_load = false;
  }

  getToken() {
    if(localStorage.getItem('token')){
      this.router.navigate(['profile']);
    }else{
      this.router.navigate(['error']);
    }
  }

  loadData(){
    this.user = new User();

    this.id = localStorage.getItem('id');

    this.userService.getUser(this.id).subscribe(
      (data) => {
        this.user = data;
        if(this.user.image == null){
          this.user.image = "https://firebasestorage.googleapis.com/v0/b/chello-7a341.appspot.com/o/RoomsImages%2F1609947281357?alt=media&token=ce9b79aa-1033-4d18-8778-3eab36bf105e"
        }
      },
      (error) => console.log(error)
    );
  }

  onFileSelected(event: any) {
    this.imgLoad();
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.user.image = url;
              this.imgLoadDone();
            }
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          console.log(url);
        }
      });
  }

  

  updateUser() {
    this.userService.update(this.id, this.user)
      .subscribe(data => {
        console.log(data);
        this.user = new User();
        this.loadData();
        this.toastr.success("Cập nhật thông tin thành công");
      }, error => {this.toastr.error('Cập nhật thông tin không thành công')})
    }

  back() {
    this.router.navigate(['board'])
  }

  changePassword() {
    this.router.navigate(['password']);
  }

  openChangPasswordDialog() {
    this.dialog.open(ChangePasswordDialog,{
      width: "400px",
      height: "470px"
    });
  
}
}


@Component({
  selector: 'changepass-dialog',
  templateUrl: 'changepass-dialog.html',
})
export class ChangePasswordDialog implements OnInit {
  user!: any;
  id!: any;
  oldPassword!: any;
  newPassword!: any;
  newPasswordConfirm!: any;
  value!: any
  hide = true;
  hide2 = true;
  hide3 = true ;

  constructor(private router: Router,
    private passwordService: PasswordService,
    private userService: UserService,
    private toastr: ToastrService,
    public dialog: MatDialog
   ) { }

   ngOnInit(): void {
    this.id = localStorage.getItem("id");
    this.user = this.userService.getUser(this.id);
    this.getToken();
  }

   getToken() {
    if(localStorage.getItem('token')){
      this.router.navigate(['password']);
    }else{
      this.router.navigate(['error']);
    }
  }

  updatePassword() {
    this.passwordService.changePassword(this.id, this.oldPassword, this.newPassword, this.newPasswordConfirm).subscribe(
      data => {
       this.toastr.success('Đổi mật khẩu thành công');
       this.dialog.closeAll();
      },
      error => 
      this.toastr.error('Mật khẩu hiện tại không chính xác'));
  }
}
