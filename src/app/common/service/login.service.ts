import { EncdecService } from './../encryption/encdec.service';
import { Router } from '@angular/router';
import { UserDataModel } from './userData.model';
import { environment } from './../../../environments/environment';
import { LoginUser } from './user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

 private loggedIn = new Subject<boolean>();
 private tokenAuth = false;
 private roleAuth: string;
 private role = new Subject<string>();
 public isUserLogedIn = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private encService: EncdecService,
    private router: Router) { }
    getTokenAuth() {
      return this.tokenAuth;
     }
     getUserAuth() {
       return this.roleAuth;
     }
     getLoggedIntoken() {
      return this.loggedIn.asObservable();
    }
    getLoginStatus() {
      const token = localStorage.getItem('token');
      if (token) {

        return true;
      } else {
        return false;
      }
    }
    getUserBasedRole() {
      const role = this.encService.decrypt(localStorage.getItem('role'), '');
      return role;
    }
    getUserRole() {
      return this.role.asObservable();
    }
 login(user: LoginUser) {
   this.http.post<UserDataModel>(environment.apiUrl + '/users/login', user)
   .subscribe((response) => {
       this.tokenAuth = true;
       this.roleAuth = response.role;
       this.loggedIn.next(this.tokenAuth);
       this.role.next(this.roleAuth);
       if (response.status === 'success') {
          const role = this.encService.encrypt(response.role, '');
          localStorage.setItem('role', role);
          localStorage.setItem('token', response.token);
          this.navigate(response.role);
          this.isUserLogedIn.next(true);
      }
   });
 }

 navigate(role: string) {
  switch (role) {
    case 'User':
      this.router.navigate(['/user/product']);
      break;
    case 'Admin_M':
      this.router.navigate(['/Admin/Medicine_dashboard']);
      break;
    case 'Admin_R':
      this.router.navigate(['/Admin/Root']);
      break;
    case 'Admin_H':
      this.router.navigate(['/Admin/Hospital']);
      break;
    case 'Admin_B':
      this.router.navigate(['/Admin/BloodBank']);
      break;
    default:
      this.snackBar.open('User donot have valid role ', 'login', {
        duration: 1000
      });
  }
}
userRole() {
  if (localStorage.getItem('role')) {
    const currentRole = this.encService.decrypt(localStorage.getItem('role'), '');
    if (!currentRole) {
      return;
    }
    return {
      currentRole
    };
  }

}
removeAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  this.isUserLogedIn.next(false);
  this.router.navigate(['/login']);
}

}
