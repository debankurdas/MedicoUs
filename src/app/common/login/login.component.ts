import { LoginService } from './../service/login.service';
import { LoginUser } from './../service/user.model';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: LoginUser = {
    email: '',
    password: ''
  };
  constructor(
    private loginService: LoginService) {}

  ngOnInit() {
  }
  login() {
    this.loginService.login(this.user);
  }


}
