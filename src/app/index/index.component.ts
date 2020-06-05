import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
id: number;
  constructor(private router: Router) { }

  ngOnInit() {
    this.id = 0;
  }

  home() {
    this.id = 0;
    console.log(this.id);
  }
  contact() {
    this.id = 1;
    console.log(this.id);
  }
  team() {
    this.id = 2;
    console.log(this.id);
  }
  project() {
    this.id = 3;
    console.log(this.id);
  }

}
