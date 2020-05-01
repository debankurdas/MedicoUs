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
  private productUpdated = new Subject<{product: Product[]}>();
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
  getProduct() {
    return this.http.get<{userData: UserDataModel , message: string, product: any}>(environment.apiUrl + '/products')
    .pipe(map((productData) => {
         return{ product: productData.product.map((product) => {
           return {
             id: product._id,
             productName: product.productName,
             categoryName: product.categoryName,
             description: product.description,
             price: product.price,
             imageUrl: product.imageUrl
           };
         })
       };
      }))
      .subscribe((transformPostData) => {
        console.log(transformPostData);
        this.product = transformPostData.product;
        this.productUpdated.next({ product: [...this.product]});
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
      productData.append('description', description);
      productData.append('imageUrl', imageUrl, productName);
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
     console.log(productData);
     this.http.put<{message: string}>(environment.apiUrl + '/products/' + id, productData)
     .subscribe(response => {
       // const updatedPost = [...this.posts];
       // const oldIndex = updatedPost.findIndex(p => p.id === id);
       // const post: Post = {
       //   id,
       //   title,
       //   content,
       //   imagePath,
       //   creator
       // };
       // console.log(post);
       // updatedPost[oldIndex] = post;
       // this.posts = updatedPost;
       // console.log(response);
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
