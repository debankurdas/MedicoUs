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
  idForBed: number;
  hospitalId: string;
  // modifyBedlist: any;
  // myBed = [];
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
        this.idForBed = 2;
        // this.modifyBedlist = JSON.parse(JSON.stringify(this.ultimateResult));
        // console.log(this.modifyBedlist);
        // this.modifyBedlist.bedModify.forEach(element => {
        //   console.log(typeof(element));
        //   let arr: Array<any> = [];
        //   arr.push(element.bedType);
        //   arr.push(element.existingBed);
        //   arr.push(element.quantity);
        //   this.myBed.push(arr) ;
        // });
        // console.log( this.myBed, 'he');
      });
    });
  }

  // general = [['general', 2 , 5 ], ['icu', 4 , 7 ], ['general',  1 , 6 ], ['general',  1 , 6 ]];



ngOnDestroy() {
  this.bedModifyListner.unsubscribe();
}

}
