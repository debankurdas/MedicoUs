import { BloodBankService } from './../services/blood-bank.service';
import { Component, OnInit } from '@angular/core';
import { BloodBank } from '../../model/model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-blood-bank-add',
  templateUrl: './blood-bank-add.component.html',
  styleUrls: ['./blood-bank-add.component.css']
})
export class BloodBankAddComponent implements OnInit {
  form: FormGroup;
  filetoUpload: File;
  result: any;

  constructor(private bloodBankService: BloodBankService, private route: ActivatedRoute,
              private fb: FormBuilder, private snackBar: MatSnackBar) { }

  imagePreview: string;
  bloodBankDetails: BloodBank;
  private mode = 'create';
  private bloodBankId: string;

   ngOnInit() {
     this.form = this.fb.group({
       bloodBankName: new FormControl('', Validators.required),
       status: new FormControl('', Validators.required),
       description: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
       imageUrl: new FormControl('', Validators.required),
       address: new FormControl('', Validators.required)
     });
     this.route.paramMap.subscribe((paramMap: ParamMap) => {
       if (paramMap.has('bloodBankId')) {
         this.mode = 'edit';
         this.bloodBankId = paramMap.get('bloodBankId');
         // this.isLoading = true;
         this.bloodBankService.getbloodBankById(this.bloodBankId)
         .subscribe((bloodBankData) => {
           // this.isLoading = false;
           this.bloodBankDetails = {
             id: bloodBankData._id,
             bloodBankName: bloodBankData.bloodBankName,
             adminId: bloodBankData.adminId,
             imageUrl: bloodBankData.imageUrl,
             description: bloodBankData.description,
             status: bloodBankData.status,
             address: bloodBankData.address
           };
           this.form.setValue({
            bloodBankName: this.bloodBankDetails.bloodBankName,
            imageUrl: this.bloodBankDetails.imageUrl,
            description: this.bloodBankDetails.description,
            status: this.bloodBankDetails.status,
            address: this.bloodBankDetails.address});
         });
       } else {
         this.mode = 'create';
         this.bloodBankId = null;
       }
     });
     console.log(this.mode);
     this.bloodBankService.getbloodBankNameFromAdmin()
     .subscribe((result) => {
       this.result = result;
       console.log(this.result.data.bloodBankName);
     });
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
       if (this.result.data.bloodBankName === this.form.value.bloodBankName) {
         this.bloodBankService.addbloodBankDetails(this.form.value.bloodBankName,
          this.form.value.imageUrl, this.form.value.status ,
          this.form.value.description, this.form.value.address);
       } else {
         this.snackBar.open('You have to enter the exact name as ' + this.result.data.bloodBankName, 'Try again', {
           duration: 3000
         });
       }
     } else  {
       this.bloodBankService.updatebloodBankData(this.bloodBankId, this.form.value.bloodBankName, this.bloodBankDetails.adminId,
         this.form.value.imageUrl, this.form.value.status, this.form.value.description, this.form.value.address);
     }
     this.form.reset();
   }

}
