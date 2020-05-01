import { UserDataModel } from './../../../common/service/userData.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserOrderService {

  constructor(private http: HttpClient) { }
  placeOrder(order: any) {
    return this.http.post<UserDataModel>(environment.apiUrl + '/orders', order);
  }

  getUserOrders() {
    return this.http.get<UserDataModel>(environment.apiUrl + '/orders');
  }

  getOrderDetails(orderId: any) {
    return this.http.get<UserDataModel>(environment.apiUrl + '/orders/' + orderId );
  }
}
