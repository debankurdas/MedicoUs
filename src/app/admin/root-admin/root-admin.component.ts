import { RootAdminService } from './service/root-admin.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CustomValidation } from 'src/app/common/customValidation/customValidation';

@Component({
  selector: 'app-root-admin',
  templateUrl: './root-admin.component.html',
  styleUrls: ['./root-admin.component.css']
})
export class RootAdminComponent implements OnInit {
  registration: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private rootService: RootAdminService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.registration = this.fb.group({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      hospitalName: new FormControl('', Validators.required)
    }, {validators: [CustomValidation.validatorPassword], updateOn: 'change'});
  }
  register() {
    if (this.registration.invalid) {
      return;
    }
    const verifyEmail = 'true';
    this.rootService.register(this.registration.value, verifyEmail)
    .subscribe((result) => {
      console.log(result);
      if (result.status === 'Success') {
        this.snackBar.open('Admin is succesfully assigned', 'yeep!',
        {
          duration: 1000
        });

      }
      this.registration.reset();
    });
  }

}
