import { CartListService } from './../../common/service/cart-list.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  @ViewChild('cartTable', {static: false}) cartTable: MatTable<any>;
  productSize = [];
  id: any;
  id1: any;
  userCart = [];
  orderCart = [];
  displayedColumns: string[] = ['imageUrl', 'productName', 'quantity', 'price', 'total', 'actions'];
  constructor(private cartService: CartListService,
              private router: Router) { }

  ngOnInit() {
    console.log("hi");
    console.log(this.id1);
    if (this.id1 === undefined) {
      this.fetchData();
    } else {
      this.delete(this.id);
    }
  }
  fetchData() {
    this.cartService.getcartList()
      .subscribe(result => {
        console.log(result.data);
        if (result.data === null) {
          this.productSize = [];
          console.log(this.productSize.length);
        } else {
          this.productSize = result.data;
        }
        result.data.forEach((cart: any) => {
          this.id = cart._id;
          cart.UserCartList[0].quantity = cart.quantity;
          this.userCart.push(cart.UserCartList[0]);
          console.log('Usercart' , this.userCart);
          this.orderCart.push(this.id);
          console.log('hhhh', this.orderCart);
        });
        this.cartTable.dataSource = this.userCart;
        this.cartTable.renderRows();
      });

  }

  checkOut() {
    this.cartService.addProductForCheckOut(this.userCart);
    this.cartService.addcartIdForCheckOut(this.orderCart);
    this.router.navigate(['/user/payment']);
  }

  delete( cartId: string) {
    this.id1 = cartId;
    // this.isLoading = true;
    this.cartService.deleteProduct(this.id1)
    .subscribe(() => {
      this.userCart = [];
      this.fetchData();
    });
  }
  // ngOnDestroy() {
  //   this.productSub.unsubscribe();
  // }

}
