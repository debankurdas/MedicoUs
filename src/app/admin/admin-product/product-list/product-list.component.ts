import { CategoryService } from './../../../common/service/category.service';
import { LoginService } from './../../../common/service/login.service';
import { AdminProductService } from './../service/admin-product.service';
import { Product } from './../../model/model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

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
 catList: any;
 isLoading = false;
 private productSub: Subscription;
//  private tokenListner: Subscription;
  constructor(private adminProductService: AdminProductService,
              private loginService: LoginService,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.adminProductService.getProduct();
    this.productSub = this.adminProductService.getProductUpdateListner()
    .subscribe((productData: { product: Product[]}) => {
      this.products = productData.product;
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
      this.adminProductService.getProduct();
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
  ngOnDestroy() {
    this.productSub.unsubscribe();
    // this.tokenListner.unsubscribe();
  }

}
