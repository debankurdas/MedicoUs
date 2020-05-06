import { USER } from './../../../admin/model/model';
import { UserProfileService } from './../service/user-profile.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {
  catList: any;
  form: FormGroup;
  constructor(public userService: UserProfileService , private route: ActivatedRoute,
              private fb: FormBuilder) { }
 //  isLoading = false;
  user: USER;
  private mode = '';
  private userId: string;

   ngOnInit() {
     this.form = this.fb.group({
       lastname: new FormControl('', Validators.required),
       firstname: new FormControl('', Validators.required),
       mobile: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
       email: new FormControl('', [Validators.required, Validators.email])
       // quantity: new FormControl('', Validators.required)
     });
     this.route.paramMap.subscribe((paramMap: ParamMap) => {
       if (paramMap.has('userId')) {
         this.mode = 'edit';
         this.userId = paramMap.get('userId');
         // this.isLoading = true;
         this.userService.getProfileById(this.userId)
         .subscribe((userData) => {
           // this.isLoading = false;
           this.user = {
             _id: userData._id,
             firstname: userData.firstname,
             lastname: userData.lastname,
             mobile: userData.mobile,
             email: userData.email
           };
           this.form.setValue({
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            mobile: this.user.mobile,
            email: this.user.email});
         });
       }
     });
   }
   onSavePost() {
     if (this.form.invalid) {
       return;
     }
     if (this.mode === 'edit') {
       // this.isLoading = true;
       this.userService.updateUserData(this.userId, this.form.value.firstname, this.form.value.lastname,
         this.form.value.mobile, this.form.value.email);
     }
     this.form.reset();
   }
 }
