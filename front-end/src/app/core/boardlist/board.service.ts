import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private baseURL = "http://127.0.0.1:8000/api/boards"

  constructor(private http: HttpClient) { }

  createBoard(id: number,value: any){
    return this.http.post(`${this.baseURL}/${id}`,value);
  }
}
