import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const baseURL = 'http://127.0.0.1:8000/api/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  readAll(): Observable<any> {

    return this.httpClient.get(baseURL);
  }

  read(id: number): Observable<any> {

    return this.httpClient.get(`${baseURL}/${id}`);
  }

  create(data: any): Observable<any> {

    return this.httpClient.post(`${baseURL}/create`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.httpClient.post(`${baseURL}/update/${id}`, data);
  }

  delete(id: number): Observable<any> {

    return this.httpClient.delete(`${baseURL}/${id}`);
  }

  deleteAll(): Observable<any> {

    return this.httpClient.delete(baseURL);
  }

  searchByName(name: any): Observable<any> {

    return this.httpClient.get(`${baseURL}?name=${name}`);
  }

  swapTask(id: number,order: number){
    return this.httpClient.get(`${baseURL}/swap/${id}/${order}`);
  }

  dropTask(id: number,column_id: number){
    return this.httpClient.get(`${baseURL}/drop/${id}/${column_id}`);
  }

  getTaskById(id: any) {
    return this.httpClient.get(`${baseURL}/get/${id}`);
  }

  updateTaskLabel(id: any, data:any) {
    return this.httpClient.post(`${baseURL}/update/label/${id}`, data);
  }
}
