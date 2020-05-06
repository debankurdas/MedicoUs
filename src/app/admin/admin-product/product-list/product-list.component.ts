import { CategoryService } from './../../../common/service/category.service';
import { LoginService } from './../../../common/service/login.service';
import { AdminProductService } from './../service/admin-product.service';
import { Product } from './../../model/model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy  {
//   displayedColumns = ['_id', 'categoryName', 'productName', 'price', 'outOfStock'];
// @Input() productList: any;
tokenAuthentication = false;
 products: Product[] = [];
 productLength = 0;
 productPerpage = 3;
 productPerpageOption = [1, 2, 5, 10];
 currentPage = 1;
 catList: any;
 isLoading = false;
 private productSub: Subscription;
//  private tokenListner: Subscription;
  constructor(private adminProductService: AdminProductService,
              private loginService: LoginService,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.adminProductService.getProduct(this.currentPage, this.productPerpage);
    this.productSub = this.adminProductService.getProductUpdateListner()
    .subscribe((productData: { product: Product[] , productCount: number}) => {
      this.products = productData.product;
      this.productLength = productData.productCount;
      console.log(this.products);
    });

    // this.tokenAuthentication = this.loginService.getTokenAuth();
    // this.tokenListner = this.loginService.getLoggedIntoken()
    // .subscribe((result) => {
    //   this.tokenAuthentication = result;
    // });
  }
  onDelete( productId: string) {
    this.isLoading = true;
    this.adminProductService.deleteProduct(productId)
    .subscribe(() => {
      this.adminProductService.getProduct(this.currentPage, this.productPerpage);
    }, () => {
      this.isLoading = false;
    });
  }
  getCategories() {
    this.categoryService.getCategory()
      .subscribe((result) => {
        console.log(result);
        if (result.status === 'Success') {
          this.catList = result.data;

        }
      });
  }

  onChange(pageData: PageEvent) {
    this.currentPage = (pageData.pageIndex + 1);
    this.productPerpage = pageData.pageSize;
    this.adminProductService.getProduct(this.currentPage, this.productPerpage);

  }
  ngOnDestroy() {
    this.productSub.unsubscribe();
    // this.tokenListner.unsubscribe();
  }

}
