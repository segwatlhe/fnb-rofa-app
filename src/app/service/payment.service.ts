import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'http://localhost:8084/api/fnb';

  constructor(private http: HttpClient) {
  }

  makePayment(payment: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/payment/save`, payment);
  }

  settleAccount(payment: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/payment/account/settlement`, payment);
  }

  getPaymentByUserId(userId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/payment/find/${userId}`);
  }

}
