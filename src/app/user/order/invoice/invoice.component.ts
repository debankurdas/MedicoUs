import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { UserOrderService } from '../service/user-order.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor(private orderService: UserOrderService,  private route: ActivatedRoute) { }
  orderDatas = [];
  orderId: string;
  date: string;
  paymentMode: string;

  @ViewChild('invoice', {static: false}) content: ElementRef;
  ngOnInit() {
    this.getOrderService();
  }

  getOrderService() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.orderId = paramMap.get('id');
        this.orderService.getOrderDetails(this.orderId)
        .subscribe((result) => {
          this.orderDatas.push(result.data);
          this.date = new Date(result.data.createdOn).toUTCString();
          console.log(this.date);
          this.paymentMode = result.data.paymentToken;
          console.log(this.orderDatas);
        });
      }
    });
  }
  public SavePDF(): void {
    let content = this.content.nativeElement;
    let doc = new jsPDF();
    let _elementHandlers =
    {
      '#editor': function(element, renderer){
        return true;
      }
    };
    doc.fromHTML(content.innerHTML, 15, 15, {

      'width': 190,
      elementHandlers: _elementHandlers
    });
    const invoice = 'invoice_' + this.orderId + '.pdf';
    doc.save(invoice);
  }




}
