import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RootAdminService {

  constructor(private http: HttpClient) { }

    register(user: any, verifyEmail: string) {
     const detalis = {
      user,
      verifyEmail
      };
     console.log('details', detalis);
     return this.http.post<{status: string, data: string}>(environment.apiUrl + '/users/adminAssign', detalis);
  }
}
