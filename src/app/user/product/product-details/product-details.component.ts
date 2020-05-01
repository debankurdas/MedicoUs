import { CartListService } from './../../../common/service/cart-list.service';
import { WishListService } from './../../../common/service/wish-list.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  quantity: FormControl;
  productDetails: any;
  constructor(private productService: ProductService,
              private wishListService: WishListService,
              private cartService: CartListService,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.quantity = new FormControl('1');
    this.route.paramMap.subscribe((data) => {
      this.productService.getProductById(data.get('id')).subscribe((result) => {
        console.log(result.data);
        this.productDetails = result.data;
      });
    });
  }

  addToCart(productDetails: any) {
    const productData = {
      productId: productDetails,
      quantity: this.quantity.value
    };
    this.cartService.addProductTocartList(productData).subscribe((result) => {
      this.snackBar.open('Product Added to Cart!', 'Product', {
        duration: 1000
      });
    });
  }

  addToWishlist(productId: any) {
    this.wishListService.addProductToWishList(productId).subscribe((result) => {
      this.snackBar.open('Product Added to WishList!', 'Product', {
        duration: 1000
      });
    });
  }
 }