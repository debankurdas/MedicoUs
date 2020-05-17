import { AdminServiceService } from './../service/admin-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private orderService: AdminServiceService) { }

  ngOnInit() {
  }
  getOrders() {
    this.orderService.getAllOrders()
    .subscribe((result) => {
      console.log(result);
    });
  }

}
