import { BloodGroupService } from './../../../admin/BloodBank/BloodGroup/services/blood-group.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BloodBankService } from './../../../admin/BloodBank/services/blood-bank.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blood-details',
  templateUrl: './blood-details.component.html',
  styleUrls: ['./blood-details.component.css']
})
export class BloodDetailsComponent implements OnInit {

  constructor(private router: ActivatedRoute, private adminService: BloodBankService,
              private sanitizer: DomSanitizer, private bloodService: BloodGroupService) { }
  bloodBankData = [];
  bloodBankAddress: string;
  city: string;
  state: string;
  address: any;
  bloodBankName: string;
  bloodGroup = [];
  imageUrl = [];
  percentage: any;
  perc: string;
  pin: string;
  ngOnInit() {
    this.router.paramMap.subscribe((result) => {
      this.adminService.getbloodBankById(result.get('id'))
      .subscribe((data) => {
        this.bloodBankData.push(data._id, data.address, data.bloodBankName, data.imageUrl, data.city, data.state, data.pin);
        this.bloodBankAddress = this.bloodBankData[1];
        this.bloodBankName = this.bloodBankData[2];
        this.imageUrl = this.bloodBankData[3];
        this.pin = this.bloodBankData[6];
        console.log(this.bloodBankAddress);
        console.log(this.bloodBankData);

        this.address = this.sanitizer.bypassSecurityTrustResourceUrl
        ('https://maps.google.com/maps?q=' + this.bloodBankAddress + this.city + this.state + '&t=&z=13&ie=UTF8&iwloc=&output=embed');
        console.log(this.address);

        this.bloodService.getBloodGroupbyBloodBankId(result.get('id'))
        .subscribe((res) => {
          console.log(res.data);
          res.data.forEach( (element: { bloodGroup: any; quantity: any; existingBloodQuantity: any  }) => {
            this.percentage = (element.existingBloodQuantity / element.quantity) * 100 ;
            // tslint:disable-next-line: radix
            this.percentage = parseInt(this.percentage);
            console.log(this.percentage);
            this.perc = this.percentage + '%';
            this.bloodGroup.push([element.bloodGroup, element.quantity, element.existingBloodQuantity, this.percentage, this.perc]);
            console.log(this.bloodGroup);
          });
        });

      });
    });

  }

}
