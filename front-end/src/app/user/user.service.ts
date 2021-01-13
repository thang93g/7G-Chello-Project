import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = "http://127.0.0.1:8000/api/users";

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<object>{
    return this.http.get(`${this.baseURL}/${id}`);
  }

  update(id: number , value: any): Observable<object>{

    return this.http.put(`${this.baseURL}/${id}`,value)
  }

  getAllUser(): Observable<any>{

    return this.http.get(`${this.baseURL}`);
  }

  getNoti(user_id: number){
    return this.http.get(`http://127.0.0.1:8000/api/notifications/${user_id}`);
  }

  createNoti(value: any){
    return this.http.post(`http://127.0.0.1:8000/api/notifications`,value);
  }
}
