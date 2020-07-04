import { MatSnackBar } from '@angular/material';
import { USER } from './../../admin/model/model';
import { Subscription } from 'rxjs';
import { UserProfileService } from './service/user-profile.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  id = 0;
 UserDatas: USER[] = [];
 userId: any;
 firstname: any;
 lastname: any;
 mobile: any;
 email: any;
 gender: any;
 private userDataObserver: Subscription;

 user = {
   name: '',
   email: '',
   message: ''
 };
  constructor(private profileService: UserProfileService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.profileService.getProfile();
    this.userDataObserver = this.profileService.getuserUpdateListner()
    .subscribe((userDatas: { user: USER[]}) => {
      this.UserDatas = userDatas.user;
      //(this.UserDatas);
      //(typeof this.UserDatas[0]);
      this.userId = this.UserDatas[0];
      this.firstname = this.UserDatas[1];
      this.lastname = this.UserDatas[2];
      this.mobile = this.UserDatas[3];
      this.email = this.UserDatas[4];
      this.gender = this.UserDatas[5];
    });

  }
  homeId() {
   this.id = 0;
  }
  Faq() {
    this.id = 1;
  }

  EditProfile() {
    this.id = 3;
  }
  order() {
    this.id = 4;
  }
  contact() {
    this.id = 5;
  }

  contacts() {
    //(this.user);
    this.profileService.contact(this.user)
    .subscribe((result) => {
      if (result.status === 'Success') {
        this.snackBar.open('Thank you for contacting us', '', {
          duration: 1000
        });
      }
    });
  }
  ngOnDestroy() {
    this.userDataObserver.unsubscribe();
  }
}
