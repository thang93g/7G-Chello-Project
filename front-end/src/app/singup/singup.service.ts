import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SingupService {

  private baseUrl = 'http://127.0.0.1:8000/api/register';


  constructor(private http: HttpClient) {
  }

  register(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, user);
  }

}
