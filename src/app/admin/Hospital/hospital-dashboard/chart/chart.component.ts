import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
@Input() bedList: any;
modifyBedlist: any;
modBed = [];
  constructor() { }

  ngOnInit() {

  }
  display() {
    this.modifyBedlist = this.bedList;
    console.log(this.modifyBedlist);
    const general = [['general', 2 , 5 ], ['icu', 4 , 7 ], ['general',  1 , 6 ], ['general',  1 , 6 ]];
    console.log(general);

  }

    //  title = 'googleChartsApp';n
 // tslint:disable-next-line: member-ordering

 general = [['general', 2 , 5 ], ['icu', 4 , 7 ], ['general',  1 , 6 ], ['general',  1 , 6 ]];
 // tslint:disable-next-line: member-ordering
 title = 'Population (in millions)';
  // tslint:disable-next-line: member-ordering
  type = 'BarChart';
  // tslint:disable-next-line: member-ordering
  data = this.bedList ;
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
  // tslint:disable-next-line: member-ordering
  width = 500;
  // tslint:disable-next-line: member-ordering
  height = 300;

}
