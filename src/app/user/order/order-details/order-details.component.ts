import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  constructor() { }

  //  title = 'googleChartsApp';n

profileForm = new FormGroup({
  firstName: new FormControl(''),
  lastName: new FormControl(''),

});





  ngOnInit() {

  }




  onSubmit() {
    console.warn(this.profileForm.value);
    console.log(this.profileForm.get('x1').value);
  }

}
