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
  pin: string;
  state: string;
  city: string;
  idForBed: number;
  hospitalId: string;
  hospitalAddress: string;
  // modifyBedlist: any;
  // myBed = [];
  bedModifyListner: Subscription;
  ngOnInit() {

  }

  branch(branchName: any) {
    this.adminHospitalService.getDataBranch(branchName)
    .subscribe((result) => {
      console.log(result.data);
      this.hospitalId = result.data[0]._id;
      this.hospitalAddress = result.data[0].address;
      this.pin = result.data[0].pin;
      this.state = result.data[0].state;
      this.city = result.data[0].city;
      console.log(this.hospitalAddress);
      console.log(this.hospitalId);
      this.bedService.getBedDatabyhospitalId(this.hospitalId);
      this.bedModifyListner = this.bedService.getbedModifyListner()
      .subscribe((results) => {
        this.ultimateResult = results;
        console.log(this.ultimateResult);
        this.idForBed = 2;
      });
    });
  }




ngOnDestroy() {
  // this.bedModifyListner.unsubscribe();
}

}
