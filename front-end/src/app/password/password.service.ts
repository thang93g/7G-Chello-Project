import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  
  private baseUrl = 'http://127.0.0.1:8000/api/changePassword';

  constructor(private http: HttpClient) { }

  
  // changePassword(id: number, value: any): Observable<Object> {
  //   return this.http.post(`${this.baseUrl}/${id}`, value);
  // }
  changePassword(id: any, oldPassword: string, newPassword:string, newPasswordConfirm:string): Observable<any> {
    // var reqHeader = new HttpHeaders({
    //   'Content-Type': 'application/json',
    // });
  
    var data = {
      "oldPassword": oldPassword,
      "newPassword": newPassword,
      "newPasswordConfirm": newPasswordConfirm
    };
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

}
