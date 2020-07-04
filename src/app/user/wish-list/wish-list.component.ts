import { WishListService } from './../../common/service/wish-list.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

   @ViewChild ('wishListTable', {static: false}) wishListTable: MatTable<any>;
  wishList = [];
  displayedColumns: string[] = ['imageUrl', 'productName', 'price', 'actions'];
  constructor(private wishListService: WishListService) { }

  ngOnInit() {
    this.wishListService.getWishList()
      .subscribe(result => {
        //(result);
        result.data.forEach((product: any) => {
          this.wishList.push(product.UserWishList[0]);
        });
        this.wishListTable.dataSource = this.wishList;
        this.wishListTable.renderRows();
      });
  }


}
