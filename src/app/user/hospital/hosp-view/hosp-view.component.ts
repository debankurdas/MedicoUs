import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hosp-view',
  templateUrl: './hosp-view.component.html',
  styleUrls: ['./hosp-view.component.css']
})
export class HospViewComponent implements OnInit {
@Input() hospitalData: any;
  constructor() { }

  ngOnInit() {
  }

display() {
  console.log(this.hospitalData);
}

}
