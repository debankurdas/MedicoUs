import { Component, OnInit, Input } from '@angular/core';
import { BedModify } from './../../../model/model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
@Input() bedList: any;
modifyBedlist : any;
myBed = [];
  constructor() { }

  ngOnInit() {

  }
  display() {

        this.modifyBedlist = JSON.parse(JSON.stringify(this.bedList));
        console.log(this.modifyBedlist);
        this.modifyBedlist.bedModify.forEach(element => {
          console.log(typeof(element));
          let arr: Array<any>=[];
          arr.push(element.bedType);
          arr.push(element.existingBed);
          arr.push(element.quantity);
          this.myBed.push(arr) ;
        }); 
        console.log( this.myBed,"he");
  }

    //  title = 'googleChartsApp';n
 // tslint:disable-next-line: member-ordering

 general = [['general', 2 , 5 ], ['icu', 4 , 7 ], ['general',  1 , 6 ], ['general',  1 , 6 ]];
 // tslint:disable-next-line: member-ordering
  

 title = 'Population (in millions)';
  // tslint:disable-next-line: member-ordering
  type = 'BarChart';
  // tslint:disable-next-line: member-ordering
  // data = [[this.myBed['bedtype'],this.myBed['existingBed'],this.myBed['quantity']  ] ;
  // tslint:disable-next-line: member-ordering
  columnNames = ['Year', 'Occupied', 'Free'];
  // tslint:disable-next-line: member-ordering
  options = {
     hAxis: {
        title: 'Year'
     },
     vAxis: {
        minValue: 0
     },
     isStacked: true
  };
  data=this.myBed;
 
  // tslint:disable-next-line: member-ordering
  width = 500;
  // tslint:disable-next-line: member-ordering
  height = 300;

}
