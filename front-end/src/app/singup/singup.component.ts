import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { SingupService } from './singup.service';


@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  user: User = new User();
  submitted = false;
  

  constructor(private UserService: SingupService,
    private router : Router) { }

  ngOnInit(): void {
  }

  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }
  save() {
    this.UserService
      .register(this.user).subscribe((data: any) => {
        console.log(data)
        this.user = new User();
        // this.gotoList();
      },
        (error: any) => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
  
  

}
