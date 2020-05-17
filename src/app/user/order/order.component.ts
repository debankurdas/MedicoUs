import { UserOrderService } from './service/user-order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  constructor(private orderService: UserOrderService) { }
  orderDatas = [];
  productData = [];
  indexNumber = [];
  shippingAddress = [];
  status: string;
  total: number;
  i: number;
  x: number;
  ngOnInit() {
    this.getOrderService();
  }
  getOrderService() {
    this.orderService.getUserOrders()
    .subscribe((result) => {
      this.orderDatas.push(result);
      console.log(this.orderDatas);
    });
  }

}
