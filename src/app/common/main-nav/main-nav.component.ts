import { CartListService } from './../service/cart-list.service';
import { UserDataModel } from './../service/userData.model';
import { Router } from '@angular/router';
import { Component, Optional, OnInit, OnDestroy } from '@angular/core';
// import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from '../service/login.service';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, OnDestroy {
  loginStatus$ = false;
  loginObservableStatus: Subscription;
  role$: string;
  roleObservable: Subscription;
  // cartCountObservable: Subscription;
  // cart$: Observable<UserDataModel>;
  categories: any;
  loginStatus: any;
  role: any;
  cartCount: number;
  constructor(private router: Router,
              // private breakpointObserver: BreakpointObserver,
              private loginService: LoginService,
              private cartService: CartListService,
              private categoryService: CategoryService,
             ) {}
             ngOnInit() {
              console.log(this.role$);
              this.loginObservableStatus = this.loginService.getLoggedIntoken()
              .subscribe((result) => {

                this.loginStatus$ = result;
                console.log('loginStatus when login' + this.loginStatus$);
              });
              this.roleObservable = this.loginService.getUserRole()
              .subscribe((result) => {
                this.role$ = result;
                console.log('role when login' + this.role$);
                if (this.role$ === 'User') {
                  this.getCategories();
                }

              });

              if (this.loginStatus$ === false && this.role$ === undefined) {
                  this.loginStatus$ = this.loginService.getLoginStatus();
                  this.role$ = this.loginService.getUserBasedRole();
                }

              console.log('after refresh' + this.loginStatus$);
              console.log('after role' + this.role$);
              if (this.loginStatus$ === true && this.role$ === 'User') {
                this.getCategories();
                this.getCartList();
              }
            }
  getCategories() {
    this.categoryService.getCategory().subscribe((result) => {
      console.log(result.data);
      this.categories = result.data;
    });
  }
  // getCartList() {
  //   this.cartService.getcartList()
  //   .subscribe((result) => {
  //     if (result.status === 'Success') {
  //       this.cartCount = result.data.length;
  //       console.log('Cart number', this.cartCount);
  //     }
  //   });
  // }
  getCartList() {
    this.cartService.getcartList()
    .subscribe((result) => {
      if (result.status === 'Success') {
        this.cartCount = result.data.length;
      }
    });
  }

  logout() {
    this.loginStatus$ = false;
    this.role$ = undefined;
    this.loginService.removeAuth();

  }

  getProduct(category: string) {
    this.router.navigate(['/user/product'], { queryParams: { categoryName: category } });
  }

  ngOnDestroy() {
    this.loginObservableStatus.unsubscribe();
    this.roleObservable.unsubscribe();
    // this.cartCountObservable.unsubscribe();
  }

}
