import { CategoryService } from 'src/app/common/service/category.service';
import { Product } from './../../model/model';
import { AdminProductService } from './../service/admin-product.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
//  @Input() catList: any;
//  @Output() addProduct = new EventEmitter<any>();
 catList: any;
 form: FormGroup;
 filetoUpload: File;
 constructor(public productService: AdminProductService , private route: ActivatedRoute,
             private fb: FormBuilder, private categoryService: CategoryService) { }
//  isLoading = false;
 imagePreview: string;
 products: Product;
 private mode = 'create';
 private productId: string;

  ngOnInit() {
    this.getCategories();
    this.form = this.fb.group({
      categoryName: new FormControl('', Validators.required),
      productName: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
      imageUrl: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
      // quantity: new FormControl('', Validators.required)
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('productId')) {
        this.mode = 'edit';
        this.productId = paramMap.get('productId');
        // this.isLoading = true;
        this.productService.getProductById(this.productId)
        .subscribe((productData) => {
          // this.isLoading = false;
          this.products = {
            id: productData._id,
            productName: productData.productName,
            categoryName: productData.categoryName,
            imageUrl: productData.imageUrl,
            description: productData.description,
            price: productData.price
          };
          console.log(this.products);
          this.form.setValue({
            productName: this.products.productName,
            categoryName: this.products.categoryName,
            imageUrl: this.products.imageUrl,
            description: this.products.description,
            price: this.products.price});
        });
      } else {
        this.mode = 'create';
        this.productId = null;
      }
    });
    console.log(this.mode);
  }
  // handelFileInput(file: FileList) {
  //   this.filetoUpload = file.item(0);
  // }
  filegetter(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({imageUrl: file});
    this.form.get('imageUrl').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      // tslint:disable-next-line: no-unused-expression
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  getCategories() {
    this.categoryService.getCategory().subscribe((result) => {
        console.log(result.status);
        this.catList = result.data;
        console.log(this.catList);
      });
  }
  onSavePost() {
    if (this.form.invalid) {
      return;
    }

    if (this.mode === 'create') {
      // this.isLoading = true;
      console.log(this.form.value.productName, this.form.value.categoryName,
        this.form.value.imageUrl, this.form.value.description, this.form.value.price);
      this.productService.addProduct(this.form.value.productName, this.form.value.categoryName,
        this.form.value.imageUrl, this.form.value.description, this.form.value.price);
    } else  {
      this.productService.updateProduct(this.productId, this.form.value.productName, this.form.value.categoryName,
        this.form.value.imageUrl, this.form.value.description, this.form.value.price);
    }
    this.form.reset();
  }
}
