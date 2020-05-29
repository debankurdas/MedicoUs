import { Subscription } from 'rxjs';
import { UserProfileService } from './../user-profile/service/user-profile.service';
// import { environment } from 'src/environments/environment';
import { UserOrderService } from './../order/service/user-order.service';
import { CartListService } from './../../common/service/cart-list.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {PayPalConfig, PayPalIntegrationType, PayPalEnvironment, } from 'ngx-paypal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { USER } from 'src/app/admin/model/model';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {

  products = [];
  id = 1;
  cartIdArray = [];
  total: number;
  email: any;
  userDataObserver: Subscription;
  shippingAddress: FormGroup;
  // displayedColumns: string[] = ['imageUrl', 'productName', 'quantity', 'price', 'total'];
  public payPalConfig?: PayPalConfig;
  UserDatas: USER[];
  cartCount: number;
  constructor(private cartService: CartListService,
              private orderService: UserOrderService,
              private fb: FormBuilder,
              private router: Router,
              private profileService: UserProfileService) { }

  ngOnInit() {

    this.shippingAddress = this.fb.group({
      userName: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      pin: ['', Validators.required],
    });
    this.cartService.getProductForCheckOut().subscribe((productList) => {
      this.products = productList;
      console.log(this.products);
      this.total = productList.map(p => p.quantity * p.price).reduce((total: any, price: any) =>
        total + price, 0
      );
    });
    this.profileService.getProfile();
    this.userDataObserver = this.profileService.getuserUpdateListner()
    .subscribe((userDatas: { user: USER[]}) => {
      this.UserDatas = userDatas.user;
      console.log(this.UserDatas);
      this.email = this.UserDatas[4];
    });
    this.cartService.getcartIdForCheckOut().subscribe((cartId) => {
      this.cartIdArray = cartId;
    });
    this.getCartList();
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
      emailAddress: this.email,
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

  getCartList() {
    this.cartService.getcartList()
    .subscribe((result) => {
      if (result.status === 'Success') {
        this.cartCount = result.data.length;

      }
    });
  }

  idChangeforCredit() {
  this.id = 1;
  }
  idChange() {
    this.id = 0;
  }
   ngOnDestroy() {
     this.userDataObserver.unsubscribe();
   }

}
