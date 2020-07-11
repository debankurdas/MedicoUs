import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-lists',
  templateUrl: './product-lists.component.html',
  styleUrls: ['./product-lists.component.css']
})
export class ProductListsComponent implements OnInit {

  @Input() productLists: any;
  @Input() categoryName: string;
  @Input() productCount: number;
  constructor(private productService: ProductService) { }

  ngOnInit() {

  }
  au()
  {
    let audio = new Audio();
    audio.src = '../../../../assets/click.mp3';
    audio.load();
    audio.play();
  }
}
