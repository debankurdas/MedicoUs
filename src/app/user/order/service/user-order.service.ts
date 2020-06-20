import { UserDataModel } from './../../../common/service/userData.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { PaymentService } from './../../payment/service/payment-service.service';
import { CartListService } from './../../../common/service/cart-list.service';

@Injectable({
  providedIn: 'root'
})
export class UserOrderService {
 cartIdArray = [];
  constructor(private http: HttpClient, private route: Router, private paymentService: PaymentService,
              private cartService: CartListService) { }
  placeOrder(order: any) {
   const orderData = {
      order,
      paymentToken: 'Cash On Delivery'
    };
   return this.http.post<UserDataModel>(environment.apiUrl + '/orders', orderData);
  }
  placeOrderbyCard(order: any, token: any) {
    const orderData = {
      order,
      token
    };
    console.log('hi', orderData);
    this.http.post<{status: any}>(environment.apiUrl + '/orders/payWithCard', orderData)
    .subscribe((result) => {
      if (result.status === 'success') {
        this.paymentService.getCartId()
        .subscribe((listOfcartId) => {
            this.cartIdArray = listOfcartId;
            this.cartIdArray.forEach((cart: any) => {
            this.cartService.deleteProduct(cart)
            .subscribe((message) => {
            console.log(message.message);
            });
          });
            console.log(listOfcartId);
        });
        this.route.navigate(['/user/orders']);
      }
    });
  }
  getUserOrders() {
    return this.http.get<UserDataModel>(environment.apiUrl + '/orders');
  }

  getOrderDetails(orderId: any) {
    return this.http.get<UserDataModel>(environment.apiUrl + '/orders/' + orderId );
  }
}
