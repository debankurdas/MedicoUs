import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { BedService } from './../../admin/Hospital/Bed/services/bed.service';
import { HospitalService } from './../../admin/Hospital/services/hospital.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hospital-display',
  templateUrl: './hospital-display.component.html',
  styleUrls: ['./hospital-display.component.css']
})
export class HospitalDisplayComponent implements OnInit {

  constructor(private route: ActivatedRoute, private adminService: HospitalService,
              private bedService: BedService, private sanitizer: DomSanitizer) { }
  hospitalData =  [];
  address: any;
  email: any;
  contact: any;
  hospitalAddress: any;
  // bedDetailObservable: Subscription;

  bedDetails: any;
  ngOnInit() {

    this.route.paramMap
    .subscribe((data) => {
      this.adminService.getHospitalById(data.get('id'))
      .subscribe((result) => {

        this.hospitalData.push(result);
        this.hospitalAddress = this.hospitalData[0].address;
        this.email = this.hospitalData[0].email;
        this.contact = this.hospitalData[0].contact;
        console.log(this.hospitalAddress);
        this.address = this.sanitizer.bypassSecurityTrustResourceUrl
        ('https://maps.google.com/maps?q=' + this.hospitalAddress + '&t=&z=13&ie=UTF8&iwloc=&output=embed');
        console.log(this.address);
        console.log(this.hospitalData);

        this.bedService.getBedsDatabyhospitalId(data.get('id'))
        .subscribe((results) => {

          this.bedDetails = results.data;
          console.log(this.bedDetails);
        });

        // this.bedDetailObservable = this.bedService.getbedModifyListner()
        // .subscribe((results) => {
        //   this.bedDetails.push(results);
        //   console.log(this.bedDetails);
        // });
      });
    });
  }

  // ngOnDestroy() {
  //   this.bedDetailObservable.unsubscribe();
  // }

}
