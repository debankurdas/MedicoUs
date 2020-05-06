import { Product } from './../../model/model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDataModel } from 'src/app/common/service/userData.model';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
  private product: Product[] = [];
  private productUpdated = new Subject<{product: Product[], productCount: number}>();
  constructor(private http: HttpClient, private route: Router) {}

  addProduct(productName: string, categoryName: string, imageUrl: File | string, description: string,
             price: string) {
    const formData = new FormData();
    formData.append('image', imageUrl);
    formData.append('productName', productName);
    formData.append('categoryName', categoryName);
    formData.append('description', description);
    formData.append('price', price);
    this.http.post<{UserDataModel, product: Product}>(environment.apiUrl + '/products', formData)
    .subscribe(() => {
      this.route.navigate(['Admin/product']);
    });
  }
  getProduct(currentPage: number, pageSize: number) {
    const queryParams = `?pageSize=${pageSize}&currentPage=${currentPage}`;
    return this.http.get<{userData: UserDataModel , message: string, product: any, maxCount: number}>
    (environment.apiUrl + '/products' + queryParams)
    .pipe(map((productData) => {
         return {
           product: productData.product.map((product) => {
           return {
             id: product._id,
             productName: product.productName,
             categoryName: product.categoryName,
             description: product.description,
             price: product.price,
             imageUrl: product.imageUrl
           };
         }),
         count: productData.maxCount
       };
      }))
      .subscribe((transformProductData) => {
        console.log(transformProductData);
        this.product = transformProductData.product;
        this.productUpdated.next({ product: [...this.product], productCount: transformProductData.count });
      });
   }
   getProductUpdateListner() {
     return this.productUpdated.asObservable();
   }
   getProductById(id: string) {
     // tslint:disable-next-line: max-line-length
     return this.http.get<{_id: string, productName: string, description: string, imageUrl: File | string, price: string, categoryName: string}>(
      environment.apiUrl + '/products/' + id);
   }
   updateProduct(id: string, productName: string, categoryName: string, imageUrl: File | string,
                 description: string, price: string) {
                  let productData: Product | FormData;
                  console.log(typeof imageUrl);
                  if (typeof imageUrl === 'object') {
                    productData = new FormData();
                    productData.append('id', id);
                    productData.append('productName', productName);
                    productData.append('categoryName', categoryName);
                    productData.append('image', imageUrl, productName);
                    productData.append('description', description);
                    productData.append('price', price);
                  } else {
                    productData = {
                      id,
                      productName,
                      categoryName,
                      description,
                      price,
                      imageUrl
                    };
                  }
                  this.http.put<{message: string}>(environment.apiUrl + '/products/' + id, productData)
                  .subscribe(response => {
                    this.route.navigate(['Admin/product']);
                  } );

    }
   deleteProduct(productId: string) {
    return this.http.delete(environment.apiUrl + '/products/' + productId);
     // .subscribe(() => {
     //   const updatePost = this.posts.filter(post => post.id !== postId);
     //   this.posts = updatePost;
     //   this.postUpdated.next([...this.posts]);
     // });
   }
}
