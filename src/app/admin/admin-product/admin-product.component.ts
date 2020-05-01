import { MatSnackBar } from '@angular/material';
import { AdminProductService } from './service/admin-product.service';
import { CategoryService } from './../../common/service/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
catList: any;
prodList: any;
  constructor() { }

  ngOnInit() {}

}
