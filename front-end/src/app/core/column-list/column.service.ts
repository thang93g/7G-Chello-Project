import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {
  private baseUrl = "http://127.0.0.1:8000/api/columns"

  constructor(private http: HttpClient) { }

  getColumnList(board_id: number){
    const auth_token = localStorage.getItem('token');
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + auth_token
    });
    return this.http.get(`${this.baseUrl}/${board_id}`, {headers: reqHeader});
  }

  getColumn(id: number){

    return this.http.get(`${this.baseUrl}/show/${id}`);
  }

  createColumn(value: any){

    return this.http.post(`${this.baseUrl}/create`,value);
  }

  swapColumn(id: number, orders: number){

    return this.http.get(`${this.baseUrl}/swap/${id}/${orders}`);
  }
  updateColumn(id: number ,value :any ){

    return this.http.put(`${this.baseUrl}/update/${id}`,value)
  }
  commentOnTask(value: any) {

    return this.http.post(`${this.baseUrl}/comment`, value);
  }
}
