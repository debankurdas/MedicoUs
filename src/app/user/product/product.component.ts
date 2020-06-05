import { Component, OnInit } from '@angular/core';
import { ProductService } from './service/product.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: any;
  category: string;
  productCount: number;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParamMap.pipe(
      map(params => params.get('categoryName'))).
      subscribe((data) => {
        if (data != null) {
          this.category = data;
          this.productService.getProductByCategory(data).subscribe((result) => {
            this.product = result.data;
            this.productCount = result.count;
          });
        } else {
          this.category = 'All Products';
          this.productService.getAllProducts().subscribe((result) => {
            this.product = result.data;
            console.log(this.product);
            this.productCount = result.data.length;
            console.log('Length' + this.productCount);
          });
        }
      });
  }
}
