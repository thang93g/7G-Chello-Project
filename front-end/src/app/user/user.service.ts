import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = "http://127.0.0.1:8000/api/users";

  constructor() { }

  getUser(id: number){

  }
}
