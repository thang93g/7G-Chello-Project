import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-mynavbar',
  templateUrl: './mynavbar.component.html',
  styleUrls: ['./mynavbar.component.css']
})
export class MynavbarComponent implements OnInit {
  user!: any;
  notis!: any;
  user_id!: any;
  items!: Item[];
  term!: string;


  constructor(
    private router: Router,
    private userService: UserService,
    private http: HttpClient

    ) { }

  ngOnInit(): void {
    this.http.get<Item[]>(`http://127.0.0.1:8000/api/boards/`)
    .subscribe((data: Item[]) => {
      this.items = data;
    });
    this.user = new User();

    this.user_id = localStorage.getItem('id');

    this.userService.getNoti(this.user_id).subscribe(data => {
      this.notis = data;
    },error => console.log(error))

    this.userService.getUser(this.user_id).subscribe(data => {
      this.user = data;
    },error => console.log(error)
    )
  }


  getInfo() {
    this.router.navigate(['profile']);
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  goHome() {
    this.router.navigate(['board']);
  }

  gotoBoard(id: number){
    this.router.navigate(['board',id]);
  }
}
interface Item {
  name: string;
  id: number;
  background: string;
  title: string;
  label: string;
}
