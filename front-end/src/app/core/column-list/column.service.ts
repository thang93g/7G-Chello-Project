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
    return this.http.get(`${this.baseUrl}/${board_id}`);
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
      console.log(value);
    return this.http.post(`${this.baseUrl}/comment`, value);
  }

  uploadOnTask(value : any, id: any) {
    return this.http.post(`${this.baseUrl}/${id}/upload`, value);}

  getUserComment(task_id: any) {
    return this.http.get(`${this.baseUrl}/comment/user/${task_id}`);
  }

  getUserUpload(task_id: any){
    return this.http.get(`${this.baseUrl}/files/${task_id}`)
  }
}
