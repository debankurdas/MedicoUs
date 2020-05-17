import { Router } from '@angular/router';
import { UserRegistrationModel } from './../../service/userRegistraion.model';
import { RegistrationService } from './../../service/registration.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verif-yemail',
  templateUrl: './verif-yemail.component.html',
  styleUrls: ['./verif-yemail.component.css']
})
export class VerifYEmailComponent implements OnInit {
  user: UserRegistrationModel;
  resultToken: string;
  status: string;
  id: string;
  userToken = {
    token: ''
  };
  constructor(private registrationService: RegistrationService, private router: Router) { }

  ngOnInit() {

      this.resultToken = localStorage.getItem('temp_token');
      console.log(this.resultToken);
      this.id = localStorage.getItem('id');
  }

  verifyMail() {
    if ( this.userToken.token === this.resultToken) {
      this.status = 'true';
      }
    console.log(this.id);
    console.log(this.status);
    this.registrationService.verifyEmail(this.id, this.status);
    localStorage.removeItem('temp_token');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
    }

}
