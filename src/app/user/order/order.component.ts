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
      // console.log(result);
      this.orderDatas.push(result);
      console.log(this.orderDatas);
      // result.data.forEach((fetchData: any) => {
      //   // console.log(fetchData);
      //   this.orderData.push(fetchData);
      //   console.log(this.orderData);
      //   console.log(fetchData.products.productName);
      //   const a = fetchData.products.length;
      //   let b = 0;
      //   this.i = -1;
      //   while (b < a) {
      //     this.i++;
      //     this.indexNumber.push(this.i);
      //     b++;
      //   }
      //   console.log('Index nUmbeer', this.indexNumber);

      //   // this.orderData.forEach((productData) => {
      //   //   this.productData.push(productData);
      //   //   console.log('Product', this.productData);
      //   // });
      //   // for (const index in this.orderData.length) {

      //   //   if (index) {
      //   //     console.log(index);
      //   //     console.log('FetchData', fetchData[index]);
      //   //     this.productData.push(fetchData[index]);
      //   //   }
      //   // }
      //   // console.log('Product Data', this.productData);
      //   // this.shippingAddress.push(this.orderData.shippingAddress);
      //   // console.log(this.shippingAddress);
      //   // this.status = this.orderData.status;
      //   // console.log('Status', this.status);
      //   // this.total = this.orderData.total;
      //   // console.log('Total', this.total);
      //   // this.orderData.products.forEach((data) => {
      //   //   this.productData.push(data)
      //   //   console.log(this.productData);
      //   // });
      // });
    });
  }

}
