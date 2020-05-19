import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  emailSubmittion(emaildetails: string) {
    const detalis = {
      email: emaildetails
    };
    this.http.post<{id: string, token: string}>(environment.apiUrl + '/users/tokenCreation', detalis)
    .subscribe((result) => {
      console.log(result);
      localStorage.setItem('passwordVerification_token', result.token);
      localStorage.setItem('userIdforPasswordVerification', result.id);
      this.snackBar.open('Check your mail where we send a token and link for reset your password', 'Password Reset notification', {
        duration: 3000
      });
    });
  }
  updatePassword(id: string, password: string) {
    const details = {
      id,
      password
    };
    this.http.put<{status: string , message: string}>
    (environment.apiUrl + '/users/updatePassword/' + id, details)
    .subscribe((result) => {
      if (result.status === 'Success') {
        localStorage.removeItem('userIdforPasswordVerification');
        localStorage.removeItem('passwordVerification_token');
        this.snackBar.open('Your password is succesfully updated', 'Please login now', {
          duration: 2000
        });
      }
    });
  }
}
