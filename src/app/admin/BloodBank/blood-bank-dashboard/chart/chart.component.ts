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

    const arr1: Array<any> = [];
    arr1.push(element.bloodGroup);
    arr1.push(element.existingBloodQuantity);
    this.myBedForPiChart.push(arr1);
    this.width1 = 500;
    this.height1 = 250;

    const arr3: Array<any> = [];
    arr3.push(element.bloodGroup);
    arr3.push(element.existingBloodQuantity);
    this.myBedForDonutChart.push(arr3);
    this.width4 = 800;
    this.height4 = 250;


    this.id = 1;
    });


    this.address = this.sanitizer.bypassSecurityTrustResourceUrl
    ('https://maps.google.com/maps?q=' + this.hospitalAddress + this.city + this.state + this.pin + '&t=&z=13&ie=UTF8&iwloc=&output=embed');
    console.log(this.address);
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




// ----------------------------Pie Chart ------------------
    // tslint:disable-next-line: member-ordering
    title1 = 'Blood Details';
    // tslint:disable-next-line: member-ordering
    type1 = 'PieChart';
    // tslint:disable-next-line: member-ordering
    data1 = this.myBedForPiChart;
    // tslint:disable-next-line: member-ordering
    columnNames1 = ['BloodGroup', 'Available'];
    // tslint:disable-next-line: member-ordering
    options1 = {
    };
    // tslint:disable-next-line: member-ordering
    width1: number;
    // tslint:disable-next-line: member-ordering
    height1: number;



    title4 = 'Blood Details';
    type4 = 'PieChart';
    data4 = this.myBedForDonutChart;
    columnNames4 = ['BloodGroup', 'Available'];
    options4 = {
      pieHole:0.4
    };
    width4: number;
    height4: number;


}
