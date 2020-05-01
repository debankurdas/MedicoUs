import { MatSnackBar } from '@angular/material';
import { CategoryService } from './../../common/service/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService, private snackBar: MatSnackBar) { }
   catlist: any;
  ngOnInit() {
    this.getCategoryList();
  }

  saveCategory(category: any) {
    this.categoryService.addCategory(category)
    .subscribe((result) => {
      if (result.status === 'Success') {
        this.snackBar.open('Category is added', 'category', {
          duration: 1000
        });
      }
      this.getCategoryList();
    });
  }

  getCategoryList() {
   this.categoryService.getCategory()
   .subscribe((result) => {
     if (result.status === 'Success') {
       this.catlist = result.data;
     }
   });
  }



}
