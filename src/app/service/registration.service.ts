import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseUrl = 'http://localhost:6050/api/fnb';

  constructor(private http: HttpClient) {
  }

  registerUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/save`, user);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/list`);
  }

}
