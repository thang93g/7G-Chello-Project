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
    const auth_token = localStorage.getItem('token');
      const reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth_token
      });
    return this.http.get(`${this.baseURL}/${id}`, {headers: reqHeader});
  }

  update(id: number , value: any): Observable<object>{

    return this.http.put(`${this.baseURL}/${id}`,value)
  }

  getAllUser(): Observable<any>{

    return this.http.get(`${this.baseURL}`);
  }
}
