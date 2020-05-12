import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDataModel } from 'src/app/common/service/userData.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: HttpClient) { }
  getAllOrders() {
    return this.http.get<UserDataModel>(environment.apiUrl + '/orders/admin');
  }
}
