import { MatSnackBar } from '@angular/material';
import { Hospital } from './../../model/model';
import { HospitalService } from './../services/hospital.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-hospital-add',
  templateUrl: './hospital-add.component.html',
  styleUrls: ['./hospital-add.component.css']
})
export class HospitalAddComponent implements OnInit {

catList: any;
form: FormGroup;
filetoUpload: File;
result: any;
constructor(public hospitalService: HospitalService , private route: ActivatedRoute,
            private fb: FormBuilder, private snackBar: MatSnackBar) { }
//  isLoading = false;
imagePreview: string;
hospitalDetails: Hospital;
private mode = 'create';
private hospitalId: string;
 ngOnInit() {
   this.form = this.fb.group({
     hospitalName: new FormControl('', Validators.required),
     branchName: new FormControl('', Validators.required),
     speciality: new FormControl('', Validators.required),
     status: new FormControl('', Validators.required),
     description: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
     imageUrl: new FormControl('', Validators.required),
     address: new FormControl('', Validators.required)
   });
   this.route.paramMap.subscribe((paramMap: ParamMap) => {
     if (paramMap.has('hospitalId')) {
       this.mode = 'edit';
       this.hospitalId = paramMap.get('hospitalId');
       // this.isLoading = true;
       this.hospitalService.getHospitalById(this.hospitalId)
       .subscribe((hospitalData) => {
         // this.isLoading = false;
         this.hospitalDetails = {
           id: hospitalData._id,
           hospitalName: hospitalData.hospitalName,
           branchName: hospitalData.branchName,
           adminId: hospitalData.adminId,
           imageUrl: hospitalData.imageUrl,
           description: hospitalData.description,
           speciality: hospitalData.speciality,
           status: hospitalData.status,
           address: hospitalData.address
         };
         this.form.setValue({
          hospitalName: this.hospitalDetails.hospitalName,
          branchName: this.hospitalDetails.branchName,
          imageUrl: this.hospitalDetails.imageUrl,
          description: this.hospitalDetails.description,
          speciality: this.hospitalDetails.speciality,
          status: this.hospitalDetails.status,
          address: this.hospitalDetails.address});
       });
     } else {
       this.mode = 'create';
       this.hospitalId = null;
     }
   });
   console.log(this.mode);
  //  this.hospitalService.gethospitalNameFromAdmin()
  //  .subscribe((result) => {
  //    this.result = result;
  //    console.log(this.result.data.hospitalName);
  //  });
 }
 // handelFileInput(file: FileList) {
 //   this.filetoUpload = file.item(0);
 // }
 filegetter(event: Event) {
   const file = (event.target as HTMLInputElement).files[0];
   this.form.patchValue({imageUrl: file});
   this.form.get('imageUrl').updateValueAndValidity();
   const reader = new FileReader();
   reader.onload = () => {
     // tslint:disable-next-line: no-unused-expression
     this.imagePreview = reader.result as string;
   };
   reader.readAsDataURL(file);
 }
 onSavePost() {
   if (this.form.invalid) {
     return;
   }
   if (this.mode === 'create') {
     // this.isLoading = true;
       this.hospitalService.addHospitalDetails(this.form.value.hospitalName, this.form.value.branchName,
        this.form.value.imageUrl, this.form.value.speciality, this.form.value.status ,
        this.form.value.description, this.form.value.address);
   } else  {
     // tslint:disable-next-line: max-line-length
     this.hospitalService.updateHospitalData(this.hospitalId, this.form.value.hospitalName,  this.form.value.branchName, this.hospitalDetails.adminId,
       this.form.value.imageUrl, this.form.value.speciality, this.form.value.status, this.form.value.description, this.form.value.address);
   }
   this.form.reset();
 }
}
