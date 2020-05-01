import { MatSnackBar } from '@angular/material';
import { CustomValidation } from './../customValidation/customValidation';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from '../service/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registration: FormGroup;
  constructor(
    private fb: FormBuilder,
    private registerService: RegistrationService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.registration = this.fb.group({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required)
    }, {validators: [CustomValidation.validatorPassword], updateOn: 'change'});
  }

  register() {
    this.registerService.register(this.registration.value)
    .subscribe((result) => {
      console.log(result);
      if (result.status === 'Success') {
        this.snackBar.open('User registraion is successfull,please login to access your account', 'Register', {
          duration: 2000
        });
      }
    });
  }

}
