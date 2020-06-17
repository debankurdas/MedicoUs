import { Component, OnInit } from '@angular/core';
import { PaymentService } from './../service/payment-service.service';

@Component({
  selector: 'app-stride',
  templateUrl: './stride.component.html',
  styleUrls: ['./stride.component.css']
})
export class StrideComponent implements OnInit {

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    this.paymentService.getOrder()
  .subscribe((data) => {
    console.log(data);
    console.log("hello");
  });
  }

}
