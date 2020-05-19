import { MatSnackBar } from '@angular/material';
import { ForgotPasswordService } from './service/forgot-password.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
 user = {
   token: '',
   password: ''
 };
 actualToken: string;
 id: string;
  constructor(private passwordVerification: ForgotPasswordService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  passwordUpdate() {
    this.actualToken = localStorage.getItem('passwordVerification_token');
    this.id = localStorage.getItem('userIdforPasswordVerification');
    if ( this.user.token === this.actualToken) {
      this.passwordVerification.updatePassword(this.id, this.user.password);
    } else {
      this.snackBar.open('Token is not valid', 'Try again!', {
        duration: 2000
      });
    }
  }
}
