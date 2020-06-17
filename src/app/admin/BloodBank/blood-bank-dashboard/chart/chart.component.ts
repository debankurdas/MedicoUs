import { Component, OnInit, Input,  Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-blood-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class BloodChartComponent implements OnInit {
  @Input() bloods: any;
  @Input() id2: any;
  @Input() hospitalAddress: any;
  @Input() state: string;
  @Input() city: string;
  @Input() pin: string;
address: any;
modifyBedlist: any;
myBed = [];
myBedForPiChart = [];
myBedForDonutChart = [];
myBedForColumnChart = [];
id: number;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }
  display() {
    this.modifyBedlist = JSON.parse(JSON.stringify(this.bloods));
    console.log(this.modifyBedlist);
    this.modifyBedlist.blooGroupModify.forEach((element: { quantity: number; existingBloodQuantity: number; bloodGroup: any; }) => {
    console.log(typeof(element));
    const arr: Array<any> = [];
    //arr.push(element. quantity);
    arr.push(element.bloodGroup)
    arr.push(element.existingBloodQuantity);
    //arr.push(element.quantity - element.existingBed);
    this.myBed.push(arr) ;
    this.width = 500;
    this.height = 250;
    this.id = 1;
    });
  }
  // tslint:disable-next-line: member-ordering
  title = 'Blood Available';
  // tslint:disable-next-line: member-ordering
  type = 'ColumnChart';
  // tslint:disable-next-line: member-ordering

  // tslint:disable-next-line: member-ordering
  columnNames = ['BloodGroup', 'Available'];
  // tslint:disable-next-line: member-ordering
  options = {

  };
  // tslint:disable-next-line: member-ordering
  data = this.myBed;
  // tslint:disable-next-line: member-ordering
  width: number;
  // tslint:disable-next-line: member-ordering
  height: number;


}
