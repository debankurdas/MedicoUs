import { UserDataModel } from './userData.model';
import {UserRegistrationModel } from './userRegistraion.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient ) {}

  register(user: UserRegistrationModel) {
    return this.http.post<{status: string , data: any, token: string}>(environment.apiUrl + '/users/registration', user);
  }
  verifyEmail(details: any) {
    return this.http.put(environment.apiUrl + '/users/verifyEmail', details);
  }
}
