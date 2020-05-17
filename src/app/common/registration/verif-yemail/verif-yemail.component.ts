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
  status: boolean;
  email: string;
  userToken = {
    token: ''
  };
  constructor(private registrationService: RegistrationService) { }

  ngOnInit() {

      this.resultToken = sessionStorage.getItem('temp_token');
      this.email = sessionStorage.getItem('email');
  }

  verifyMail() {
    if ( this.userToken.token === this.resultToken) {
      this.status = true;
      }
    const details = {
        verifyEmail: this.status,
        email: this.email
      };

    this.registrationService.verifyEmail(details);
    }

}
