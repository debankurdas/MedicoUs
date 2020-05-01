import { environment } from 'src/environments/environment';
import { UserDataModel } from 'src/app/common/service/userData.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private http: HttpClient) { }

  getWishList() {
    return this.http.get<UserDataModel>(environment.apiUrl + '/wishLists');
  }

  addProductToWishList(product: string) {
    return this.http.post<UserDataModel>(environment.apiUrl + '/wishLists', { productId: product });
  }
}
