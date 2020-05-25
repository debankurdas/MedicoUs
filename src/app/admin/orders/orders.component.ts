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
export class OrdersComponent implements OnInit, OnDestroy {
 orderStatus: Subscription;
  constructor(private orderService: AdminServiceService, private snackBar: MatSnackBar,
              private router: Router) { }
orderDatas = [];
  ngOnInit() {
    this.orderService.getAllOrders();
    this.orderStatus = this.orderService.statusUpdateListner()
    .subscribe((result) => {
      this.orderDatas.push(result);
    });
  }

  sendStatusPlaced(id: string) {
    const status = 'Placed';
    this.orderService.statusChange(id, status)
    .subscribe((result) => {
      if (result.status === 'Success') {
        this.snackBar.open('You scuessfully approved this order', 'Thank you!', {
          duration: 2000
        });
      }

    });

  }
  ngOnDestroy() {
    this.orderStatus.unsubscribe();
  }


}
