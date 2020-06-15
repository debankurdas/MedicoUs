import { BloodGroupService } from './../BloodGroup/services/blood-group.service';
import { BloodBankService } from './../services/blood-bank.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blood-bank-dashboard',
  templateUrl: './blood-bank-dashboard.component.html',
  styleUrls: ['./blood-bank-dashboard.component.css']
})
export class BloodBankDashboardComponent implements OnInit, OnDestroy {

  constructor(private adminBloodBankService: BloodBankService, private bloodGroupService: BloodGroupService) { }
  form: FormGroup;
  BloodBank = [];
  ultimateResult: any;
  pin: string;
  state: string;
  city: string;
  idForBed: number;
  BloodBankId: string;
  BloodBankAddress: string;
  bloodGroupModifyListner: Subscription;
  ngOnInit() {

  }
  branch(branchName: any) {
    this.adminBloodBankService.getDataBranch(branchName)
    .subscribe((result) => {
      console.log(result.data);
      this.BloodBankId = result.data[0]._id;
      this.BloodBankAddress = result.data[0].address;
      this.pin = result.data[0].pin;
      this.state = result.data[0].state;
      this.city = result.data[0].city;
      console.log(this.BloodBankAddress);
      console.log(this.BloodBankId);
      this.bloodGroupService.getBloodGroupDatabyBloodBankId(this.BloodBankId);
      this.bloodGroupModifyListner = this.bloodGroupService.getBloodModifyListner()
      .subscribe((results) => {
        this.ultimateResult = results;
        console.log(this.ultimateResult);
        this.idForBed = 2;
      });
    });
  }
 ngOnDestroy() {
 }


}
