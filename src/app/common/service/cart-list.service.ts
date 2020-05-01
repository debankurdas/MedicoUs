import { Cart } from './../../admin/model/model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDataModel } from './userData.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartListService {
  cartProduct: Cart[] = [];
  products = new BehaviorSubject<any>([]);
 cartProductObserver = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) { }
  // getcartList1() {
  //   this.http.get<{UserDataModel, data: any}>(environment.apiUrl + '/cartLists')
  //   .pipe(map(cartData) => {cart})
  // }
  // getcartList1() {
  //   return this.http.get<{UserDataModel, data: any}>(environment.apiUrl + '/cartLists')
  //   .pipe(map((cartData) => {
  //     return { data: cartData.data.map((actualData) => {
  //       return {
  //         id: actualData._id,
  //         status: actualData.status,
  //         createOn: actualData.createdOn,
  //         productId: actualData.productId,
  //         uId: actualData.uId,
  //         quantity: actualData.quantity,
  //         __v: actualData.__v,
  //         UserCartList: [
  //           {
  //             id: actualData.UserCartList[0],
  //             outOfStock: actualData.UserCartList[1],
  //             productName: actualData.UserCartList[2],
  //             categoryName: actualData.UserCartList[3],
  //             description: actualData.UserCartList[4],
  //             imageUrl: actualData.UserCartList[5],
  //             price: actualData.UserCartList[6],
  //             __v: actualData.UserCartList[7]
  //           }
  //         ]
  //       };
  //     })};
  //   }))
  //   .subscribe((transFormData) => {
  //     this.cartProduct = transFormData.data;
  //     this.cartProductObserver.next({cartProduct: [...this.cartProduct]});
  //   });
  //  }
  getcartList() {
    return this.http.get<{UserDataModel, data: any}>(environment.apiUrl + '/cartLists');
  }
  getCartProductListner() {
    return this.cartProductObserver.asObservable();
  }

  addProductTocartList(product: any) {
    return this.http.post<UserDataModel>(environment.apiUrl + '/cartLists', product);
  }
  addProductForCheckOut(product: any) {
    this.products.next(product);
  }

  getProductForCheckOut() {
    return this.products.asObservable();
  }
  deleteProduct(productId: string) {
    return this.http.delete(environment.apiUrl + '/cartLists/' + productId);
   }
}
