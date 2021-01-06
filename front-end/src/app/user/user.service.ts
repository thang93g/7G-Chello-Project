import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = "http://127.0.0.1:8000/api/users";
<<<<<<< HEAD

  constructor(private http: HttpClient) { }
=======
  
  constructor() { }
>>>>>>> a1fd3b3ca8b61d8818b05fce111f54a84967e721

  getUser(id: number){
    return this.http.get(`${this.baseURL}/${id}`);
  }

  update(id: number , value: any): Observable<object>{
    return this.http.put(`${this.baseURL}/${id}`,value)
  }
}
