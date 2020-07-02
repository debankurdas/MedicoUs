import { BloodGroupService } from './../../admin/BloodBank/BloodGroup/services/blood-group.service';
import { MatSnackBar } from '@angular/material';
import { BloodBankService } from './../../admin/BloodBank/services/blood-bank.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blood-bank',
  templateUrl: './blood-bank.component.html',
  styleUrls: ['./blood-bank.component.css']
})
export class BloodBankComponent implements OnInit {

  constructor(private bloodBankService: BloodBankService, private snackBar: MatSnackBar,
              private bloodGroupService: BloodGroupService) { }
  state: string;
  city: string;
  area: string;
  speciality: string;
  bloodBankByData = [];
  ngOnInit() {
    this.bloodBankService.getbloodBankbranch()
    .subscribe((result) => {
      this.bloodBankByData = [];
      this.bloodBankByData.push(result.data);
      if (this.bloodBankByData.length < 0) {
        this.snackBar.open('No Hospital is Found in this location', 'Try another one', {
          duration: 2000
        });
      }
      console.log('h', this.bloodBankByData);
    });
  }

  State(state: string) {
    this.state = state;
  }
  City(city: string) {
    this.city = city;
  }
  Area(area: string) {
    this.area = area;
    this.location();
  }

  location() {
    this.bloodBankService.getBloodBankbyLocation(this.state, this.city, this.area)
    .subscribe((result) => {
      this.bloodBankByData = [];
      this.bloodBankByData.push(result.data);
      console.log('By location', this.bloodBankByData);
      if (result.data.length < 1) {
        this.snackBar.open('No hospital is avilable in this region', 'Try another region', {
          duration: 2000
        });
      }

    });
  }

  // bloodBankbybloodType(bloodGroup: string) {
  //   console.log(bloodGroup);
  //   this.bloodGroupService.getbloodGroupDetailsbloodType(bloodGroup)
  //   .subscribe((result) => {
  //     console.log(result.data);
  //   });
  // }

  BloodBank(bloodBankName: string) {
    this.bloodBankService.getBloodBankBySearch(bloodBankName)
    .subscribe((result) => {
      this.bloodBankByData = [];
      this.bloodBankByData.push(result.data);
      console.log('By name', this.bloodBankByData);
    });
  }


}
