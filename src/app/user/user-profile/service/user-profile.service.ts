import { Router } from '@angular/router';
import { USER } from './../../../admin/model/model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserDataModel } from 'src/app/common/service/userData.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private user: USER [] = [];
  private userUpdated = new Subject<{user: USER []}>();
  constructor(private http: HttpClient, private route: Router) { }
  getProfile() {
    this.http.get<{userData: UserDataModel, data: any}>
    (environment.apiUrl + '/users')
      .pipe(map((userData) => {
        return {
          id: userData.data._id,
          firstname: userData.data.firstname,
          lastname: userData.data.lastname,
          mobile: userData.data.mobile,
          email: userData.data.email,
          gender: userData.data.gender
        };
      }))
        .subscribe((transformPostData) => {
          this.user[0] = transformPostData.id;
          this.user[1] = transformPostData.firstname;
          this.user[2] = transformPostData.lastname;
          this.user[3] = transformPostData.mobile;
          this.user[4] = transformPostData.email;
          this.user[5] = transformPostData.gender;
          this.userUpdated.next({ user: [...this.user]});
        });
  }
  getuserUpdateListner() {
    return this.userUpdated.asObservable();
  }
  getProfileById(userId: string) {
   return this.http.get
   <{_id: string, firstname: string, lastname: string, mobile: number, email: string, gender: string}>
   (environment.apiUrl + '/users/' + userId);
  }
  updateUserData(id: string, firstname: string, lastname: string, mobile: number, email: string, gender: string) {
     let userData: USER;
     userData = {
         _id: id,
         firstname,
         lastname,
         mobile,
         email,
         gender
       };
     this.http.put(environment.apiUrl + '/users/' + id, userData)
     .subscribe(response => {
       this.route.navigate(['user/profile']);
     } );

}

contact(user: any) {
  console.log(user);
 return this.http.post<{status: string}>(environment.apiUrl + '/contact', user);
}

}
