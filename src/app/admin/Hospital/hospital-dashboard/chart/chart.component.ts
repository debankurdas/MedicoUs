import { Component, OnInit, Input,  Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})


export class ChartComponent implements OnInit {
@Input() bedList: any;
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
    this.modifyBedlist = JSON.parse(JSON.stringify(this.bedList));
    console.log(this.modifyBedlist);
    this.modifyBedlist.bedModify.forEach((element: { bedType: any; existingBed: number; quantity: number; }) => {
      console.log(typeof(element));
      const arr: Array<any> = [];
      arr.push(element.bedType);
      arr.push(element.existingBed);
      arr.push(element.quantity - element.existingBed);
      this.myBed.push(arr) ;
      this.width = 300;
      this.height = 250;

      const arr1: Array<any> = [];
      arr1.push(element.bedType);
      arr1.push(100 * (element.existingBed / element.quantity));
      this.myBedForPiChart.push(arr1);
      this.width1 = 350;
      this.height1 = 250;

      const arr2: Array<any> = [];
      arr2.push(element.bedType);
      arr2.push(element.existingBed);
      this.myBedForColumnChart.push(arr2);
      this.width3 = 250;
      this.height3 = 250;

      const arr3: Array<any> = [];
      arr3.push(element.bedType);
      arr3.push(100 * (element.existingBed / element.quantity));
      this.myBedForDonutChart.push(arr3);
      this.width4 = 250;
      this.height4 = 250;

      this.id = 1;
    });

    console.log(this.address);
    console.log( this.myBed, 'he');
    this.myBed = [];
    this.myBedForColumnChart = [];
    this.myBedForDonutChart = [];
    this.myBedForPiChart = [];
    // this.live = this.bedList;
    // console.log(this.live);
    this.address = this.sanitizer.bypassSecurityTrustResourceUrl
    ('https://maps.google.com/maps?q=' + this.hospitalAddress + this.city + this.state + this.pin + '&t=&z=13&ie=UTF8&iwloc=&output=embed');
    console.log(this.address);
  }
  // tslint:disable-next-line: member-ordering
  title = 'Bed Details';
  // tslint:disable-next-line: member-ordering
  type = 'BarChart';
  // tslint:disable-next-line: member-ordering

  // tslint:disable-next-line: member-ordering
  columnNames = ['Bed', 'Free', 'Occupied'];
  // tslint:disable-next-line: member-ordering
  options = {
     hAxis: {
        title: 'Bed Details'
     },
     vAxis: {
        minValue: 0
     },
     isStacked: true
  };
  // tslint:disable-next-line: member-ordering
  data = this.myBed;
  // tslint:disable-next-line: member-ordering
  width: number;
  // tslint:disable-next-line: member-ordering
  height: number;



// ----------------------------Pie Chart ------------------
    // tslint:disable-next-line: member-ordering
    title1 = 'Bed Details';
    // tslint:disable-next-line: member-ordering
    type1 = 'PieChart';
    // tslint:disable-next-line: member-ordering
    data1 = this.myBedForPiChart;
    // tslint:disable-next-line: member-ordering
    columnNames1 = ['Bed Free', 'Percentage'];
    // tslint:disable-next-line: member-ordering
    options1 = {
    };
    // tslint:disable-next-line: member-ordering
    width1: number;
    // tslint:disable-next-line: member-ordering
    height1: number;

// -------------- ColumnChart ----------------

    // tslint:disable-next-line: member-ordering
    title3 = 'Population (in millions)';
    type3 = 'ColumnChart';
    data3 = this.myBedForColumnChart;
    // tslint:disable-next-line: member-ordering
    columnNames3 = ['Bed Details', 'Free'];
    options3 = {};
    // tslint:disable-next-line: member-ordering
    width3 : number;
    height3: number;

// -------------- Donut Chart --------------

title4 = 'Bed Details';
type4 = 'PieChart';
data4 = this.myBedForDonutChart;
columnNames4 = ['Bed Free', 'Percentage'];
options4 = {
   pieHole:0.4
};
width4: number;
height4: number;
}
