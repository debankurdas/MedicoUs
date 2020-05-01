import { UserDataModel } from 'src/app/common/service/userData.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

getAllProducts() {
return this.http.get<UserDataModel>( environment.apiUrl + '/products');
}

getProductByCategory(category: string) {
return this.http.post<UserDataModel>(
  environment.apiUrl  + '/products/getProductByCategory', { categoryName: category });
}
getProductById(id: any) {
return this.http.get<UserDataModel>( environment.apiUrl + '/products/' + id);
}
}
