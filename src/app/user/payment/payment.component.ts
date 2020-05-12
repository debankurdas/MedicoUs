// import { environment } from 'src/environments/environment';
import { UserOrderService } from './../order/service/user-order.service';
import { CartListService } from './../../common/service/cart-list.service';
import { Component, OnInit } from '@angular/core';
import {PayPalConfig, PayPalIntegrationType, PayPalEnvironment, } from 'ngx-paypal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  products = [];
  cartIdArray = [];
  total: number;
  shippingAddress: FormGroup;
  displayedColumns: string[] = ['imageUrl', 'productName', 'quantity', 'price', 'total'];
  public payPalConfig?: PayPalConfig;
  constructor(private cartService: CartListService,
              private orderService: UserOrderService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {

    this.shippingAddress = this.fb.group({
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
      pin: ['', Validators.required],
    });
    this.cartService.getProductForCheckOut().subscribe((productList) => {
      this.products = productList;
      this.total = productList.map(p => p.quantity * p.price).reduce((total: any, price: any) =>
        total + price, 0
      );
    });
    this.cartService.getcartIdForCheckOut().subscribe((cartId) => {
      console.log('cartId', cartId);
      this.cartIdArray = cartId;
      console.log(this.cartIdArray);
    });
    // this.initConfig();
  }
  // private initConfig(): void {
  //   this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
  //     commit: true,
  //     client: {
  //       sandbox: 'AVDkkPvR8kNeED_YTyTVFofaoJT_zBn9YPjiMnzT-ZrxvCb1Crew1Ooo3bInv0o76n-sp1B4Ri_OnWRI'
  //     },
  //     button: {
  //       label: 'paypal',
  //     },
  //     onPaymentComplete: (paymentInfo, actions) => {
  //       console.log('OnPaymentComplete');
  //       console.log(paymentInfo);
  //       console.log(actions);
  //       this.placeOrder(paymentInfo);
  //     },
  //     onCancel: (data, actions) => {
  //       console.log('OnCancel');
  //     },
  //     onError: (err) => {
  //       console.log('OnError');
  //       console.log(err);
  //     },
  //     transactions: [{
  //       amount: {
  //         currency: 'INR',
  //         total: this.total
  //       }
  //     }]
  //   });
  // }
  // paymentData: any
  placeOrder() {

    const paymentData = {
      paymentToken: 'done'
    };
    const order = {
      products: this.products,
      shippingAddress: this.shippingAddress.getRawValue(),
      paymentInfo: paymentData,
      total: this.total
    };
    this.cartIdArray.forEach((cart: any) => {
      this.cartService.deleteProduct(cart)
      .subscribe((message) => {
        console.log(message.message);
      });
    });
    this.orderService.placeOrder(order).subscribe((result) => {
      this.router.navigate(['/user/orders']);
    });
  }

}
