import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  
  gotoSingup(){
    this.route.navigate(['singup'])
  }

  gotoLogin() {
    this.route.navigate(['login'])
  }
  
}


