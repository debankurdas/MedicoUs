import { BedService } from './../Bed/services/bed.service';
import { Subscription } from 'rxjs';
import { HospitalService } from './../services/hospital.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-hospital-dashboard',
  templateUrl: './hospital-dashboard.component.html',
  styleUrls: ['./hospital-dashboard.component.css']
})
export class HospitalDashboardComponent implements OnInit, OnDestroy {

  constructor(private adminHospitalService: HospitalService, private fb: FormBuilder,
              private bedService: BedService) { }
  form: FormGroup;
  hospital = [];
  ultimateResult: any;
  hospitalId: string;
  bedModifyListner: Subscription;
  ngOnInit() {

  }

  branch(branchName: any) {
    this.adminHospitalService.getDataBranch(branchName)
    .subscribe((result) => {
      this.hospitalId = result.data[0]._id;
      console.log(this.hospitalId);
      this.bedService.getBedDatabyhospitalId(this.hospitalId);
      this.bedModifyListner = this.bedService.getbedModifyListner()
      .subscribe((results) => {
        this.ultimateResult = results;
        console.log(this.ultimateResult);
      });
    });
  }

  // general = [['general', 2 , 5 ], ['icu', 4 , 7 ], ['general',  1 , 6 ], ['general',  1 , 6 ]];

  // tslint:disable-next-line: member-ordering
  title1 = 'Browser market shares at a specific website, 2014';
  // tslint:disable-next-line: member-ordering
  type1 = 'PieChart';
  // tslint:disable-next-line: member-ordering
  data1 = [
     ['Firefox', 45.0],
     ['IE', 26.8],
     ['Chrome', 12.8],
     ['Safari', 8.5],
     ['Opera', 6.2],
     ['Others', 0.7]
  ];
  // tslint:disable-next-line: member-ordering
  columnNames1 = ['Browser', 'Percentage'];
  // tslint:disable-next-line: member-ordering
  options1 = {
  };
  // tslint:disable-next-line: member-ordering
  width1 = 250;
  // tslint:disable-next-line: member-ordering
  height1 = 250;

ngOnDestroy() {
  this.bedModifyListner.unsubscribe();
}

}
