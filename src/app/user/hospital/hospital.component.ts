import { MatSnackBar } from '@angular/material';
import { HospitalService } from './../../admin/Hospital/services/hospital.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {
 state: string;
 city: string;
 area: string;
 hospitalByData = [];
  constructor(private hospitalService: HospitalService, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.hospitalService.getHospitalData()
    .subscribe((result) => {
      this.hospitalByData.push(result.data);
      console.log(this.hospitalByData);
    });
  }

  State(state: string) {
    console.log(state);
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
    this.hospitalService.getHospitalByLocation(this.state, this.city, this.area)
    .subscribe((result) => {
      this.hospitalByData = [];
      this.hospitalByData.push(result.data);
      console.log('By location', this.hospitalByData);
      if (result.data.length < 1) {
        this.snackBar.open('No hospital is avilable in this region', 'Try another region', {
          duration: 2000
        });
      }
      this.hospitalByData = [];
    });
  }
  Hospital(hospitalName: string) {
    this.hospitalService.getHospitalByHospitalSearch(hospitalName)
    .subscribe((result) => {
      this.hospitalByData = [];
      this.hospitalByData.push(result.data);
      console.log('By name', this.hospitalByData);
    });
  }
}
