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
  // cartProduct: Cart[] = [];
  products = new BehaviorSubject<any>([]);
  cartIds = new BehaviorSubject<any>([]);
//  cartcountObserver = new BehaviorSubject<any>([]);
 cartCount: number;
  constructor(private http: HttpClient) { }
  getcartList() {
    return this.http.get<{UserDataModel, data: any, status: string}>(environment.apiUrl + '/cartLists');

  }
  // getCartcountListner() {
  //   return this.cartcountObserver.asObservable();
  // }

  addProductTocartList(product: any) {
    return this.http.post<UserDataModel>(environment.apiUrl + '/cartLists', product);
  }
  addProductForCheckOut(product: any) {
    this.products.next(product);
  }
  addcartIdForCheckOut(cartId: any) {
    this.cartIds.next(cartId);
  }

  getProductForCheckOut() {
    return this.products.asObservable();
  }
  getcartIdForCheckOut() {
    return this.cartIds.asObservable();
  }
  deleteProduct(productId: string) {
    return this.http.delete<{message: string}>(environment.apiUrl + '/cartLists/' + productId);
   }
}
