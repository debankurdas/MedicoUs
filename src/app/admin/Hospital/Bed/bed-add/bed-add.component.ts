import { BedService } from './../services/bed.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bed-add',
  templateUrl: './bed-add.component.html',
  styleUrls: ['./bed-add.component.css']
})
export class BedAddComponent implements OnInit {
form: FormGroup;
filetoUpload: File;
constructor(private bedService: BedService, private route: ActivatedRoute,
            private fb: FormBuilder) { }
//  isLoading = false;
private mode = 'create';

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
       this.catList = result.data;
     });
 }
 onSavePost() {
   if (this.form.invalid) {
     return;
   }
   if (this.mode === 'create') {
     // this.isLoading = true;
     this.productService.addProduct(this.form.value.productName, this.form.value.categoryName,
       this.form.value.imageUrl, this.form.value.description, this.form.value.price);
   } else  {
     this.productService.updateProduct(this.productId, this.form.value.productName, this.form.value.categoryName,
       this.form.value.imageUrl, this.form.value.description, this.form.value.price);
   }
   this.form.reset();
 }

}
