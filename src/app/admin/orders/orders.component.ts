import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { AdminServiceService } from './../service/admin-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  constructor(private orderService: AdminServiceService, private snackBar: MatSnackBar,
              private router: Router) { }
orderDatas = [];
  ngOnInit() {
    this.orderService.getAllOrders()
    .subscribe((result) => {
      this.orderDatas.push(result);
     });
  }

  sendStatusRejected(id: string) {
    const status = 'Rejected';
    this.orderService.statusChange(id, status)
    .subscribe((result) => {
      if (result.status === 'Success') {
        console.log(result.status);
        this.orderDatas = [];
        this.orderService.getAllOrders()
        .subscribe((result1) => {
          this.orderDatas.push(result1);
          console.log(this.orderDatas);
        });
        this.snackBar.open('You scuessfully reject this order', 'Thank you!', {
          duration: 2000
        });

      }


    });

  }
  sendStatusDelivered(id: string) {
    const status = 'Delivered';
    this.orderService.statusChange(id, status)
    .subscribe((result) => {
      if (result.status === 'Success') {
        console.log(result.status);
        this.orderDatas = [];
        this.orderService.getAllOrders()
        .subscribe((result1) => {
          this.orderDatas.push(result1);
          console.log(this.orderDatas);
        });
        this.snackBar.open('You confirmed this delivery of order', 'Thank you!', {
          duration: 2000
        });

      }


    });

  }
  sendStatusPlaced(id: string) {
    const status = 'Placed';
    this.orderService.statusChange(id, status)
    .subscribe((result) => {
      if (result.status === 'Success') {
        console.log(result.status);
        this.orderDatas = [];
        this.orderService.getAllOrders()
        .subscribe((result1) => {
          this.orderDatas.push(result1);
          console.log(this.orderDatas);
        });
        this.snackBar.open('You scuessfully approved this order', 'Thank you!', {
          duration: 2000
        });

      }


    });

  }

  filterStatusPlaced() {
    const status = 'Placed';
    this.orderService.filterOrderbyStatus(status)
    .subscribe((result) => {
      this.orderDatas = [];
      this.orderDatas.push(result);
    });
  }
  filterStatusRejected() {
    const status = 'Rejected';
    this.orderService.filterOrderbyStatus(status)
    .subscribe((result) => {
      this.orderDatas = [];
      this.orderDatas.push(result);
    });
  }
  filterStatusDelivered() {
    const status = 'Delivered';
    this.orderService.filterOrderbyStatus(status)
    .subscribe((result) => {
      this.orderDatas = [];
      this.orderDatas.push(result);
    });
  }
  filterStatusPending() {
    const status = 'Pending';
    this.orderService.filterOrderbyStatus(status)
    .subscribe((result) => {
      this.orderDatas = [];
      this.orderDatas.push(result);
    });
  }

  filterAllorders() {
    this.orderService.getAllOrders()
    .subscribe((result) => {
      this.orderDatas = [];
      this.orderDatas.push(result);
     });
  }


}
