import { BedModify } from './../../../model/model';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bed } from 'src/app/admin/model/model';
import { Subject } from 'rxjs';
import { UserDataModel } from 'src/app/common/service/userData.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BedService {
  private bed: Bed[] = [];
  private bedModify: BedModify[] = [];
  private bedUpdated = new Subject<{bed: Bed[], bedCount: number}>();
  private bedDetailsModify = new Subject<{bedModify: BedModify[]}>();

  constructor(private http: HttpClient, private route: Router, private snackBar: MatSnackBar) { }

  getbed(currentPage: number, pageSize: number, hospitalId: string) {

    const queryParams = `?pageSize=${pageSize}&currentPage=${currentPage}&hospitalId=${hospitalId}`;
    return this.http.get<{userData: UserDataModel , message: string, bed: any, maxCount: number}>
    (environment.apiUrl + '/bed' + queryParams)
    .pipe(map((bedData) => {
         return {
           bed: bedData.bed.map((bed) => {
           return {
             id: bed._id,
             hospitalId: bed.hospitalId,
             hospitalName: bed.hospitalName,
             quantity: bed.quantity,
             existingBed: bed.existingBed,
             ward: bed.ward,
             cost: bed.cost,
             bedType: bed.bedType,
             date: bed.date
           };
         }),
         count: bedData.maxCount
       };
      }))
      .subscribe((transformbedData) => {
        console.log(transformbedData);
        this.bed = transformbedData.bed;
        this.bedUpdated.next({ bed: [...this.bed], bedCount: transformbedData.count });
      });
   }
   getbedUpdateListner() {
    return this.bedUpdated.asObservable();
  }


  addBed(hospitalId: string, hospitalName: string, ward: string, quantity: number, cost: number,
         existingBed: number, bedType: string, date: Date) {
          const details = {
          hospitalId,
          hospitalName,
          ward,
          quantity,
          cost,
          existingBed,
          bedType,
          date
          };
          console.log(details);
          this.http.post<{ status: string, data: any}>(environment.apiUrl + '/bed/bedAddition', details)
          .subscribe(() => {
            this.snackBar.open('Bed information is succesfully added', 'Check it', {
              duration: 2000
            });
          });
  }
    getBedById(id: string) {
      // tslint:disable-next-line: max-line-length
      return this.http.get<{data: any}>(
       environment.apiUrl + '/bed/' + id);
    }
    updatebedData(id: string, hospitalId: string, hospitalName: string,
                  ward: string, quantity: number, cost: number,
                  existingBed: number, bedType: string, date: Date) {
                  let bedData: Bed;
                  bedData = {
                  id,
                  hospitalName,
                  hospitalId,
                  ward,
                  cost,
                  existingBed,
                  quantity,
                  bedType,
                  date
                  };
                  this.http.put<{message: string}>(environment.apiUrl + '/bed/' + id, bedData)
                  .subscribe(response => {
                    this.route.navigate(['Admin/HospitalBranchView']);
                  } );
      }
    deletebed(bedId: string) {
      return this.http.delete(environment.apiUrl + '/bed/' + bedId);
     }

     getBedsDatabyhospitalId(hospitalId: string) {
      const hospId = {
         hospitalId
       };
      return this.http.post<{data: any}>(environment.apiUrl + '/bed/getData', hospId);
     }

     getBedDatabyhospitalId(hospitalId: string) {
      const hospId = {
         hospitalId
       };
      this.http.post<{data: any}>(environment.apiUrl + '/bed/getData', hospId)
      .pipe(map((bedData) => {
        return {
          bed: bedData.data.map((bed) => {
          return {
            cost: bed.cost,
            quantity: bed.quantity,
            existingBed: bed.existingBed,
            bedType: bed.bedType,
          };
        })
      };
     }))
     .subscribe((transformbedData) => {
       this.bedModify = transformbedData.bed;
       this.bedDetailsModify.next({ bedModify: [...this.bedModify]});
     });
     }
     getbedModifyListner() {
      return this.bedDetailsModify.asObservable();
    }

}
