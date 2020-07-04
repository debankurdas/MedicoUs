import { CategoryService } from './../../../common/service/category.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  displayedColumns = ['_id', 'categoryName', 'isLive'];
  @Input() categoryList: any;
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }

  // clickLive(str: string) {

  // }



}
