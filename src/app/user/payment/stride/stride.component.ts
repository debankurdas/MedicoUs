import { Component, OnInit } from '@angular/core';
import { PaymentService } from './../service/payment-service.service';
import { UserOrderService } from './../../order/service/user-order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';
@Component({
  selector: 'app-stride',
  templateUrl: './stride.component.html',
  styleUrls: ['./stride.component.css']
})
export class StrideComponent implements OnInit {
 Key = 'pk_test_jTsalbzdqlt6fKmlCGHhSM0z';
 actualData: any;
total: any;
  constructor(private paymentService: PaymentService, private orderService: UserOrderService,
              private fb: FormBuilder, private stripeService: StripeService) { }
              elements: Elements;
              card: StripeElement;
              // optional parameters
              elementsOptions: ElementsOptions = {
                locale: 'es'
              };
              stripeTest: FormGroup;
  ngOnInit() {
    this.paymentService.getOrder()
    .subscribe((data) => {
      this.actualData = data;
      this.total = data.total;
      //(this.actualData);
  });
    this.stripeTest = this.fb.group({
      cardHoldername: ['', [Validators.required]]
    });
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          //('hello');
          this.card = this.elements.create('card', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0'
                }
              }
            }
          });
          this.card.mount('#card-element');
        }
      });
  }
  buy() {
    const name = this.stripeTest.get('cardHoldername').value;

    this.stripeService
      .createToken(this.card, { name })
      .subscribe(obj => {
        if (obj) {
          const token = obj.token.id;
          //('Token is --> ', token);



          this.orderService.placeOrderbyCard(this.actualData, token);

        }
      });
  }


}
