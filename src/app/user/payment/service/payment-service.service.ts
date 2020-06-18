import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  orders = new BehaviorSubject<any>([]);
  cartIdArray = new BehaviorSubject<any>([]);
  constructor() { }

  addOrder(order: any, cartIdarray: any) {
    this.orders.next(order);
    this.cartIdArray.next(cartIdarray);
  }

  getOrder() {
    return this.orders.asObservable();
  }
  getCartId() {
    return this.cartIdArray.asObservable();
  }
}
