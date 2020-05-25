import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDataModel } from 'src/app/common/service/userData.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
orderDatas = [];
private orderStatusUpdated = new Subject<{}>();
  constructor(private http: HttpClient) { }
  getAllOrders() {
    return this.http.get<{UserDataModel, data: any}>(environment.apiUrl + '/orders/admin')
    .subscribe((result) => {
      this.orderDatas.push(result);
      this.orderStatusUpdated.next(this.orderDatas);
     });
  }
  statusChange(id: string, status: string) {
   const details = {
      id,
      status
    };
   return this.http.put<{status: string, data: any}>(environment.apiUrl + '/orders/statusChange', details);

  }
  statusUpdateListner() {
    return this.orderStatusUpdated.asObservable();
  }
}
