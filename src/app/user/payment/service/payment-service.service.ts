import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  orders = new BehaviorSubject<any>([]);
  constructor() { }

  addOrder(order: any) {
    this.orders.next(order);
  }

  getOrder() {
    return this.orders.asObservable();
  }
}
