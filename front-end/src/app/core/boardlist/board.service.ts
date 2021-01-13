import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private baseURL = "http://127.0.0.1:8000/api/boards"

  constructor(private http: HttpClient) { }

  createBoard(id: number,value: any){
    const auth_token = localStorage.getItem('token');
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + auth_token
    });
    return this.http.post(`${this.baseURL}/${id}`,value, {headers: reqHeader});
  }

  getBoardDetail(id:number) {
    const auth_token = localStorage.getItem('token');
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + auth_token
    });
    return this.http.get(`${this.baseURL}/detail/${id}`, {headers: reqHeader});

  }

  deleteBoard(id: number){

    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
