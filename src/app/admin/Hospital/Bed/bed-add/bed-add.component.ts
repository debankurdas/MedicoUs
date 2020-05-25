import { Bed } from './../../../model/model';
import { HospitalService } from './../../services/hospital.service';
import { BedService } from './../services/bed.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-bed-add',
  templateUrl: './bed-add.component.html',
  styleUrls: ['./bed-add.component.css']
})
export class BedAddComponent implements OnInit {
form: FormGroup;
filetoUpload: File;
constructor(private bedService: BedService, private route: ActivatedRoute,
            private fb: FormBuilder, private hospitalService: HospitalService ) { }
//  isLoading = false;
private mode = 'create';
hospitalId: string;
bedDetails: Bed;
bedId: string;
hospitalName: string;
date: Date;
 ngOnInit() {
   this.form = this.fb.group({
     cost: new FormControl('', Validators.required),
     ward: new FormControl('', Validators.required),
     quantity: new FormControl('', Validators.required),
     existingBed: new FormControl('', Validators.required),
     bedType: new FormControl('', Validators.required)
   });
   this.route.paramMap.subscribe((paramMaps: ParamMap) => {
    if (paramMaps.has('hospitalId')) {
      this.hospitalId = paramMaps.get('hospitalId');
      console.log(this.hospitalId);
      this.hospitalService.getHospitalById(this.hospitalId)
      .subscribe((result) => {
        this.hospitalName = result.hospitalName;
      });
    }
   });
   this.route.paramMap.subscribe((paramMaps: ParamMap) => {
      if (paramMaps.has('bedId')) {
       this.mode = 'edit';
       this.bedId = paramMaps.get('bedId');
      //  this.isLoading = true;
       this.bedService.getBedById(this.bedId)
       .subscribe((bedData) => {
        //  this.isLoading = false;
         this.bedDetails = {
           id: bedData.data._id,
           ward: bedData.data.ward,
           cost: bedData.data.cost,
           hospitalId: bedData.data.hospitalId,
           quantity: bedData.data.quantity,
           existingBed: bedData.data.existingBed,
           hospitalName: bedData.data.hospitalName,
           bedType: bedData.data.bedType,
           date: bedData.data.date
         };
         this.form.setValue({
           ward: this.bedDetails.ward,
           cost: this.bedDetails.cost,
           quantity: this.bedDetails.quantity,
           existingBed: this.bedDetails.existingBed,
           bedType: this.bedDetails.bedType});
       });
     } else {
       this.mode = 'create';
       this.bedId = null;
     }
   });
   console.log(this.mode);
 }
onSavePost() {
   if (this.form.invalid) {
     return;
   }
   if (this.mode === 'create') {
     // this.isLoading = true;
     console.log(this.hospitalId);
     this.bedService.addBed(this.hospitalId, this.hospitalName, this.form.value.ward, this.form.value.quantity,
       this.form.value.cost, this.form.value.existingBed, this.form.value.bedType, this.date);
   } else  {
     this.bedService.updatebedData(this.bedId, this.hospitalId, this.hospitalName, this.form.value.ward, this.form.value.quantity,
      this.form.value.cost, this.form.value.existingBed, this.form.value.bedType, this.date);
   }
   this.form.reset();
 }

}
