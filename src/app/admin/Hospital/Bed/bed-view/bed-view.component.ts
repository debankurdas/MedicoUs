import { HospitalService } from './../../services/hospital.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Bed } from 'src/app/admin/model/model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BedService } from '../services/bed.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-bed-view',
  templateUrl: './bed-view.component.html',
  styleUrls: ['./bed-view.component.css']
})
export class BedViewComponent implements OnInit, OnDestroy {

 bed: Bed[] = [];
 status: string;
 date: Date;
 bedLength = 0;
 bedPerpage = 3;
 bedPerpageOption = [1, 2, 5, 10];
 currentPage = 1;
 isLoading = false;
 hospitalId: string;
 private bedsub: Subscription;
//  private tokenListner: Subscription;
  constructor(private adminbedService: BedService, private route: ActivatedRoute,
              private hospitalService: HospitalService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMaps: ParamMap) => {
      if (paramMaps.has('hospitalId')) {
        this.hospitalId = paramMaps.get('hospitalId');
      }
     });
    this.adminbedService.getbed(this.currentPage, this.bedPerpage, this.hospitalId);
    this.bedsub = this.adminbedService.getbedUpdateListner()
    .subscribe((bedData: { bed: Bed[] , bedCount: number, date: Date}) => {
      this.bed = bedData.bed;
      this.bedLength = bedData.bedCount;
      this.date = bedData.date;
    });
    //(this.bed);

  }
  onDelete( bedId: string) {
    this.isLoading = true;
    this.adminbedService.deletebed(bedId)
    .subscribe(() => {
      this.adminbedService.getbed(this.currentPage, this.bedPerpage, this.hospitalId);
    }, () => {
      this.isLoading = false;
    });
  }

  onChange(pageData: PageEvent) {
    this.currentPage = (pageData.pageIndex + 1);
    this.bedPerpage = pageData.pageSize;
    this.adminbedService.getbed(this.currentPage, this.bedPerpage, this.hospitalId);

  }
  ngOnDestroy() {
    this.bedsub.unsubscribe();
  }

}
