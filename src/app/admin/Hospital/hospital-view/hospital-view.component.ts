import { HospitalService } from './../services/hospital.service';
import { Hospital } from './../../model/model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/common/service/login.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-hospital-view',
  templateUrl: './hospital-view.component.html',
  styleUrls: ['./hospital-view.component.css']
})
export class HospitalViewComponent implements OnInit, OnDestroy {
//   displayedColumns = ['_id', 'categoryName', 'productName', 'price', 'outOfStock'];
// @Input() productList: any;
tokenAuthentication = false;
 hospital: Hospital[] = [];
 status: string;
 hospitalLength = 0;
 hospitalPerpage = 3;
 hospitalPerpageOption = [1, 2, 5, 10];
 currentPage = 1;
 catList: any;
 isLoading = false;
 private hospitalsub: Subscription;
//  private tokenListner: Subscription;
  constructor(private adminHospitalService: HospitalService,
              private loginService: LoginService
              ) { }

  ngOnInit() {
    this.adminHospitalService.getHospital(this.currentPage, this.hospitalPerpage);
    this.hospitalsub = this.adminHospitalService.getHospitalUpdateListner()
    .subscribe((hospitalData: { hospital: Hospital[] , hospitalCount: number}) => {
      this.hospital = hospitalData.hospital;
      this.hospitalLength = hospitalData.hospitalCount;
    });
    console.log(this.hospital);

  }
  onDelete( hospitalId: string) {
    this.isLoading = true;
    this.adminHospitalService.deleteHospital(hospitalId)
    .subscribe(() => {
      this.adminHospitalService.getHospital(this.currentPage, this.hospitalPerpage);
    }, () => {
      this.isLoading = false;
    });
  }

  onChange(pageData: PageEvent) {
    this.currentPage = (pageData.pageIndex + 1);
    this.hospitalPerpage = pageData.pageSize;
    this.adminHospitalService.getHospital(this.currentPage, this.hospitalPerpage);

  }
  ngOnDestroy() {
    this.hospitalsub.unsubscribe();
    // this.tokenListner.unsubscribe();
  }
}
