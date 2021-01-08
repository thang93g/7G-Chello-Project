import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private baseUrl = "http://127.0.0.1:8000/api/groups";

  constructor(private http: HttpClient) { }

  getBoardList(id: number){
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getGroup(id: number){
    return this.http.get(`${this.baseUrl}/detail/${id}`);
  }

  getMember(id: number){
    return this.http.get(`${this.baseUrl}/member/${id}`);
  }

  addMember(id: number,data: any){
    return this.http.post(`${this.baseUrl}/${id}`,data);
  }
}
