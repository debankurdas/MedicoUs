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
  loginStatus$ = false;
  role$: any;
  constructor(
    private loginService: LoginService, private route: Router) {}

  ngOnInit() {
    if (this.loginStatus$ === false) {
      this.loginStatus$ = this.loginService.getLoginStatus();
    }
    if (this.loginStatus$ === true) {
      this.route.navigate(['/user/product']);
    }

  }
  login() {
    this.loginService.login(this.user);
  }
  au()
  {
    let audio = new Audio();
    audio.src = '../../../assets/click.mp3';
    audio.load();
    audio.play();
  }

}
