import { BloodGroup } from './../../../model/model';
import { BloodGroupService } from './../services/blood-group.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BloodBankService } from '../../services/blood-bank.service';

@Component({
  selector: 'app-blood-group-add',
  templateUrl: './blood-group-add.component.html',
  styleUrls: ['./blood-group-add.component.css']
})
export class BloodGroupAddComponent implements OnInit {
  form: FormGroup;
  constructor(private bloodGroupService: BloodGroupService, private route: ActivatedRoute,
              private fb: FormBuilder, private bloodBankService: BloodBankService ) { }
  //  isLoading = false;
  private mode = 'create';
  bloodBankId: string;
  bloodGroupDetails: BloodGroup;
  bloodGroupId: string;
  bloodBankName: string;
  date: Date;
   ngOnInit() {
     this.form = this.fb.group({
       quantity: new FormControl('', Validators.required),
       existingBloodQuantity: new FormControl('', Validators.required),
       bloodGroup: new FormControl('', Validators.required)
     });
     this.route.paramMap.subscribe((paramMaps: ParamMap) => {
      if (paramMaps.has('bloodBankId')) {
        this.bloodBankId = paramMaps.get('bloodBankId');
        console.log(this.bloodBankId);
        this.bloodBankService.getbloodBankById(this.bloodBankId)
        .subscribe((result) => {
          this.bloodBankName = result.bloodBankName;
        });
      }
     });
     this.route.paramMap.subscribe((paramMaps: ParamMap) => {
        if (paramMaps.has('bloodGroupId')) {
         this.mode = 'edit';
         this.bloodGroupId = paramMaps.get('bloodGroupId');
        //  this.isLoading = true;
         this.bloodGroupService.getbloodGroupById(this.bloodGroupId)
         .subscribe((bloodGroupData) => {
          //  this.isLoading = false;
           this.bloodGroupDetails = {
             id: bloodGroupData.data._id,
             bloodBankId: bloodGroupData.data.bloodBankId,
             quantity: bloodGroupData.data.quantity,
             existingBloodQuantity: bloodGroupData.data.existingBloodQuantity,
             bloodBankName: bloodGroupData.data.bloodBankName,
             bloodGroup: bloodGroupData.data.bloodGroup,
             date: bloodGroupData.data.date
           };
           this.form.setValue({
             quantity: this.bloodGroupDetails.quantity,
             existingBloodQuantity: this.bloodGroupDetails.existingBloodQuantity,
             bloodGroup: this.bloodGroupDetails.bloodGroup});
         });
       } else {
         this.mode = 'create';
         this.bloodGroupId = null;
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
       console.log(this.bloodBankId);
       this.bloodGroupService.addbloodGroup(this.bloodBankId, this.bloodBankName, this.form.value.bloodGroup, this.form.value.quantity,
          this.form.value.existingBloodQuantity,  this.date);
     } else  {
       this.bloodGroupService.updatebloodGroupData(this.bloodGroupId, this.bloodBankId, this.bloodBankName, this.form.value.bloodGroup,
        this.form.value.quantity, this.form.value.existingBloodQuantity,  this.date);
     }
     this.form.reset();
   }
}
