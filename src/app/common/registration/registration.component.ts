import { Router } from '@angular/router';
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
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.registration = this.fb.group({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required),
    }, {validators: [CustomValidation.validatorPassword], updateOn: 'change'});
  }

  register() {
    if (this.registration.invalid) {
      return;
    }
    this.registerService.register(this.registration.value)
    .subscribe((result) => {
      console.log(result);
      if (result.status === 'Success') {
        localStorage.setItem('id', result.data._id);
        localStorage.setItem('temp_token', result.token);
        this.snackBar.open('Please verify your mailId through the link which is provided in your mail', 'Register',
        {
          duration: 3000
        });

      }
      this.registration.reset();
    });
  }

}
