import { Component, OnInit, OnDestroy } from '@angular/core';
import { BloodGroup } from 'src/app/admin/model/model';
import { Subscription } from 'rxjs';
import { BloodGroupService } from '../services/blood-group.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-blood-group-view',
  templateUrl: './blood-group-view.component.html',
  styleUrls: ['./blood-group-view.component.css']
})
export class BloodGroupViewComponent implements OnInit, OnDestroy {
  bloodGroup: BloodGroup[] = [];
  status: string;
  date: Date;
  bloodGroupLength = 0;
  bloodGroupPerpage = 3;
  bloodGroupPerpageOption = [1, 2, 5, 10];
  currentPage = 1;
  isLoading = false;
  bloodBankId: string;
  private bloodGroupsub: Subscription;
 //  private tokenListner: Subscription;
   constructor(private adminbloodGroupService: BloodGroupService, private route: ActivatedRoute) { }

   ngOnInit() {
     this.route.paramMap.subscribe((paramMaps: ParamMap) => {
       if (paramMaps.has('bloodBankId')) {
         this.bloodBankId = paramMaps.get('bloodBankId');
       }
      });
     this.adminbloodGroupService.getbloodGroup(this.currentPage, this.bloodGroupPerpage, this.bloodBankId);
     this.bloodGroupsub = this.adminbloodGroupService.getbloodGroupUpdateListner()
     .subscribe((bloodGroupData: { bloodGroup: BloodGroup[] , bloodGroupCount: number, date: Date}) => {
       //(bloodGroupData);
       this.bloodGroup = bloodGroupData.bloodGroup;
       this.bloodGroupLength = bloodGroupData.bloodGroupCount;
       this.date = bloodGroupData.date;
     });
     //(this.bloodGroup);

   }
   onDelete( bloodGroupId: string) {
     this.isLoading = true;
     this.adminbloodGroupService.deletebloodGroup(bloodGroupId)
     .subscribe(() => {
       this.adminbloodGroupService.getbloodGroup(this.currentPage, this.bloodGroupPerpage, this.bloodBankId);
     }, () => {
       this.isLoading = false;
     });
   }

   onChange(pageData: PageEvent) {
     this.currentPage = (pageData.pageIndex + 1);
     this.bloodGroupPerpage = pageData.pageSize;
     this.adminbloodGroupService.getbloodGroup(this.currentPage, this.bloodGroupPerpage, this.bloodBankId);

   }
   ngOnDestroy() {
     this.bloodGroupsub.unsubscribe();
   }


}
