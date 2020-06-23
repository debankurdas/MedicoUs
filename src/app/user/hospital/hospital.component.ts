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
 locationData = [];
  constructor(private hospitalService: HospitalService, private snackBar: MatSnackBar) { }

  ngOnInit() {
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
      this.locationData.push(result.data);
      console.log(this.locationData);
      if (result.data.length < 1) {
        this.snackBar.open('No hospital is avilable in this region', 'Try another region', {
          duration: 2000
        });
      }
      this.locationData = [];
    });
  }
}
