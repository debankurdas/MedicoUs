import { Injectable } from '@angular/core';
import { BloodGroup } from 'src/app/admin/model/model';
import { Subject } from 'rxjs';
import { UserDataModel } from 'src/app/common/service/userData.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BloodGroupService {
  private bloodGroup: BloodGroup[] = [];
  private bloodGroupUpdated = new Subject<{bloodGroup: BloodGroup[], bloodGroupCount: number}>();
  constructor(private http: HttpClient, private route: Router, private snackBar: MatSnackBar) { }

  getbloodGroup(currentPage: number, pageSize: number, bloodBankId: string) {

    const queryParams = `?pageSize=${pageSize}&currentPage=${currentPage}&bloodBankId=${bloodBankId}`;
    return this.http.get<{userData: UserDataModel , message: string, bloodGroup: any, maxCount: number}>
    (environment.apiUrl + '/bloodGroup' + queryParams)
    .pipe(map((bloodGroupData) => {
         return {
           bloodGroup: bloodGroupData.bloodGroup.map((bloodGroup) => {
           return {
             id: bloodGroup._id,
             bloodBankId: bloodGroup.bloodBankId,
             bloodBankName: bloodGroup.bloodBankName,
             quantity: bloodGroup.quantity,
             existingBloodQuantity: bloodGroup.existingBloodQuantity,
             bloodGroup: bloodGroup.bloodGroup,
             date: bloodGroup.date
           };
         }),
         count: bloodGroupData.maxCount
       };
      }))
      .subscribe((transformbloodGroupData) => {
        console.log(transformbloodGroupData);
        this.bloodGroup = transformbloodGroupData.bloodGroup;
        this.bloodGroupUpdated.next({ bloodGroup: [...this.bloodGroup], bloodGroupCount: transformbloodGroupData.count });
      });
   }
   getbloodGroupUpdateListner() {
    return this.bloodGroupUpdated.asObservable();
  }


  addbloodGroup(bloodBankId: string, bloodBankName: string, bloodGroup: string, quantity: number,
                existingBloodQuantity: number, date: Date) {
          const details = {
          bloodBankId,
          bloodBankName,
          bloodGroup,
          quantity,
          existingBloodQuantity,
          date
          };
          console.log(details);
          this.http.post<{ status: string, data: any}>(environment.apiUrl + '/bloodGroup/bloodGroupAddition', details)
          .subscribe(() => {
            this.snackBar.open('bloodGroup information is succesfully added', 'Check it', {
              duration: 2000
            });
          });
  }
    getbloodGroupById(id: string) {
      // tslint:disable-next-line: max-line-length
      return this.http.get<{data: any}>(
       environment.apiUrl + '/bloodGroup/' + id);
    }
    updatebloodGroupData(id: string, bloodBankId: string, bloodBankName: string, bloodGroup: string, quantity: number,
                         existingBloodQuantity: number, date: Date) {
                  let bloodGroupData: BloodGroup;
                  bloodGroupData = {
                  id,
                  bloodBankName,
                  bloodBankId,
                  bloodGroup,
                  existingBloodQuantity,
                  quantity,
                  date
                  };
                  this.http.put<{message: string}>(environment.apiUrl + '/bloodGroup/' + id, bloodGroupData)
                  .subscribe(response => {
                    this.route.navigate(['Admin/BloodBankView']);
                  } );
      }
    deletebloodGroup(bloodGroupId: string) {
      return this.http.delete(environment.apiUrl + '/bloodGroup/' + bloodGroupId);
     }

}
