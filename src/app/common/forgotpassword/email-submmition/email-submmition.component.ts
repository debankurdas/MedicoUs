import { ForgotPasswordService } from './../service/forgot-password.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-submmition',
  templateUrl: './email-submmition.component.html',
  styleUrls: ['./email-submmition.component.css']
})
export class EmailSubmmitionComponent implements OnInit {
  user = {
   email: ''
 };
  constructor(private forgotPasswordService: ForgotPasswordService) { }

  ngOnInit() {
  }
  emailSubmit() {
    //(this.user.email);
    this.forgotPasswordService.emailSubmittion(this.user.email);

  }

}
