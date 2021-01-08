import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  title = 'cloudsSorage';
  selectedFile!: any;
  downloadURL!: Observable<string>;
  user!: any;
  id!: any;

  constructor(
    private storage: AngularFireStorage,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
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
            }
            console.log(this.user.image);
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
        alert("Cập nhật thông tin thành công")
        this.user = new User();
        window.location.reload();
      }, error => console.log(error));
  }

  back() {
    this.router.navigate(['board'])
  }

  changePassword() {
    this.router.navigate(['password']);
  }
}
