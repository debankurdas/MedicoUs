import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDataModel } from 'src/app/common/service/userData.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BloodBank } from '../../model/model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BloodBankService {
  private bloodBank: BloodBank[] = [];
  private bloodBankUpdated = new Subject<{bloodBank: BloodBank[], bloodBankCount: number}>();
  constructor(private http: HttpClient, private router: Router) { }

  getbloodBank(currentPage: number, pageSize: number) {
    const queryParams = `?pageSize=${pageSize}&currentPage=${currentPage}`;
    return this.http.get<{userData: UserDataModel , message: string, bloodBank: any, maxCount: number}>
    (environment.apiUrl + '/bloodBank' + queryParams)
    .pipe(map((bloodBankData) => {
         return {
           bloodBank: bloodBankData.bloodBank.map((bloodBank) => {
           return {
             id: bloodBank._id,
             bloodBankName: bloodBank.bloodBankName,
             adminId: bloodBank.adminId,
             description: bloodBank.description,
             imageUrl: bloodBank.imageUrl,
             status: bloodBank.status,
             state: bloodBank.state,
             city: bloodBank.city,
             branchArea: bloodBank.branchArea,
             address: bloodBank.address,
             pin: bloodBank.pin,
             email: bloodBank.email,
             mobileno: bloodBank.mobileno,
           };
         }),
         count: bloodBankData.maxCount
       };
      }))
      .subscribe((transformbloodBankData) => {
        //(transformbloodBankData);
        this.bloodBank = transformbloodBankData.bloodBank;
        this.bloodBankUpdated.next({ bloodBank: [...this.bloodBank], bloodBankCount: transformbloodBankData.count });
      });
   }
   getbloodBankUpdateListner() {
    return this.bloodBankUpdated.asObservable();
  }

  addbloodBankDetails(bloodBankName: string, imageUrl: File | string, status: string, state: string,
                      city: string, branchArea: string, description: string, email: string, mobileno: string,
                      address: string, pin: string) {
    const formData = new FormData();
    formData.append('image', imageUrl);
    formData.append('bloodBankName', bloodBankName);
    formData.append('status', status);
    formData.append('description', description);
    formData.append('email', email);
    formData.append('mobileno', mobileno);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('branchArea', branchArea);
    formData.append('address', address);
    formData.append('pin', pin);
    this.http.post<{status: string, bloodBank: BloodBank}>(environment.apiUrl + '/bloodBank/addBloodBank', formData)
    .subscribe(() => {
      this.router.navigate(['Admin/BloodBankView']);
    });
  }
  getbloodBankById(id: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<{_id: string, bloodBankName: string, adminId: string, imageUrl: File | string,
      status: string, description: string,email: string, mobileno: string, state: string, city: string, branchArea: string,
      address: string, pin: string}>(
     environment.apiUrl + '/bloodBank/' + id);
  }
  updatebloodBankData(id: string, bloodBankName: string, adminId: string, imageUrl: File | string,
                      status: string, state: string, city: string, branchArea: string,
                      description: string, email: string, mobileno: string, address: string, pin: string) {
     let bloodBankData: BloodBank | FormData;
     //(typeof imageUrl);
     if (typeof imageUrl === 'object') {
       bloodBankData = new FormData();
       bloodBankData.append('id', id);
       bloodBankData.append('bloodBankName', bloodBankName);
       bloodBankData.append('adminId', adminId);
       bloodBankData.append('image', imageUrl, bloodBankName);
       bloodBankData.append('description', description);
       bloodBankData.append('email', email);
       bloodBankData.append('mobileno', mobileno);
       bloodBankData.append('state', state);
       bloodBankData.append('city', city);
       bloodBankData.append('branchArea', branchArea);
       bloodBankData.append('status', status);
       bloodBankData.append('address', address);
       bloodBankData.append('pin', pin);
     } else {
       bloodBankData = {
         id,
         bloodBankName,
         adminId,
         description,
         email,
         mobileno,
         status,
         imageUrl,
         state,
         city,
         branchArea,
         address,
         pin
       };
     }
     this.http.put<{message: string}>(environment.apiUrl + '/bloodBank/' + id, bloodBankData)
     .subscribe(response => {
       this.router.navigate(['Admin/BloodBankView']);
     } );

  }
  deletebloodBank(bloodBankId: string) {
    return this.http.delete(environment.apiUrl + '/bloodBank/' + bloodBankId);
   }

   getbloodBankbranch() {
    return this.http.get<{data: any}>(environment.apiUrl + '/bloodBank');
   }

   getDataBranch(branch: string) {
    const  branches = {
       branchArea: branch
      };
    return this.http.post<{data: any}>(environment.apiUrl + '/bloodBank/getData', branches);
    }

    getBloodBankbyLocation(state: string, city: string, area: string) {
      const locationData = {
        state,
        city,
        area
      };
      //(locationData);
      return this.http.post<{data: any}>(environment.apiUrl + '/bloodBank/location', locationData);
    }

    getBloodBankBySearch(bloodBankName: string) {
      const bloodBankData = {
        bloodBankName
      };
      return this.http.post<{data: any}>(environment.apiUrl + '/bloodBank/bloodBankSearch', bloodBankData);
    }
}
