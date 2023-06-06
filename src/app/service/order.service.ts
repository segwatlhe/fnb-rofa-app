import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../model/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:8081/api/fnb';

  constructor(private http: HttpClient) {
  }

  createOrder(order: Order): Observable<any> {
    return this.http.post(`${this.baseUrl}/order/save`, order);
  }

  getOrdersByUserId(userId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/order/find/${userId}`);
  }

  getInvoice(userId: number | undefined) {
    return this.http.get(`${this.baseUrl}/order/invoice/${userId}`);
  }
}
