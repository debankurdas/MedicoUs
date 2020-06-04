import { Component, OnInit, OnDestroy } from '@angular/core';
import { BloodBank } from '../../model/model';
import { Subscription } from 'rxjs';
import { BloodBankService } from '../services/blood-bank.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-blood-bank-view',
  templateUrl: './blood-bank-view.component.html',
  styleUrls: ['./blood-bank-view.component.css']
})
export class BloodBankViewComponent implements OnInit, OnDestroy {

tokenAuthentication = false;
 bloodBank: BloodBank[] = [];
 status: string;
 bloodBankLength = 0;
 bloodBankPerpage = 3;
 bloodBankPerpageOption = [1, 2, 5, 10];
 currentPage = 1;
 catList: any;
 isLoading = false;
 private bloodBanksub: Subscription;

  constructor(private adminbloodBankService: BloodBankService) { }

  ngOnInit() {
    this.adminbloodBankService.getbloodBank(this.currentPage, this.bloodBankPerpage);
    this.bloodBanksub = this.adminbloodBankService.getbloodBankUpdateListner()
    .subscribe((bloodBankData: { bloodBank: BloodBank[] , bloodBankCount: number}) => {
      this.bloodBank = bloodBankData.bloodBank;
      this.bloodBankLength = bloodBankData.bloodBankCount;
    });
    console.log(this.bloodBank);

  }
  onDelete( bloodBankId: string) {
    this.isLoading = true;
    this.adminbloodBankService.deletebloodBank(bloodBankId)
    .subscribe(() => {
      this.adminbloodBankService.getbloodBank(this.currentPage, this.bloodBankPerpage);
    }, () => {
      this.isLoading = false;
    });
  }

  onChange(pageData: PageEvent) {
    this.currentPage = (pageData.pageIndex + 1);
    this.bloodBankPerpage = pageData.pageSize;
    this.adminbloodBankService.getbloodBank(this.currentPage, this.bloodBankPerpage);

  }
  ngOnDestroy() {
    this.bloodBanksub.unsubscribe();
    // this.tokenListner.unsubscribe();
  }

}
