import { Router } from '@angular/router';
import { Hospital, Product } from './../../model/model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserDataModel } from 'src/app/common/service/userData.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private hospital: Hospital[] = [];
  private hospitalUpdated = new Subject<{hospital: Hospital[], hospitalCount: number}>();
  constructor(private http: HttpClient, private router: Router) { }

  getHospital(currentPage: number, pageSize: number) {
    const queryParams = `?pageSize=${pageSize}&currentPage=${currentPage}`;
    return this.http.get<{userData: UserDataModel , message: string, hospital: any, maxCount: number}>
    (environment.apiUrl + '/hospital' + queryParams)
    .pipe(map((hospitalData) => {
         return {
           hospital: hospitalData.hospital.map((hospital) => {
           return {
             id: hospital._id,
             hospitalName: hospital.hospitalName,
             branchName: hospital.branchName,
             adminId: hospital.adminId,
             description: hospital.description,
             speciality: hospital.speciality,
             imageUrl: hospital.imageUrl,
             status: hospital.status,
             state: hospital.state,
             city: hospital.city,
             branchArea: hospital.branchArea,
             address: hospital.address,
             pin: hospital.pin,
             email: hospital.email,
             contact: hospital.contact
           };
         }),
         count: hospitalData.maxCount
       };
      }))
      .subscribe((transformhospitalData) => {
        console.log(transformhospitalData);
        this.hospital = transformhospitalData.hospital;
        this.hospitalUpdated.next({ hospital: [...this.hospital], hospitalCount: transformhospitalData.count });
      });
   }
   getHospitalUpdateListner() {
    return this.hospitalUpdated.asObservable();
  }

  addHospitalDetails(hospitalName: string, branchName: string, imageUrl: File | string, speciality: string,
                     status: string, description: string, state: string, city: string, branchArea: string, address: string , pin: string, email:string, contact: string) {
    const formData = new FormData();
    formData.append('image', imageUrl);
    formData.append('hospitalName', hospitalName);
    formData.append('branchName', branchName),
    formData.append('speciality', speciality);
    formData.append('status', status);
    formData.append('description', description);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('branchArea',branchArea);
    formData.append('address', address);
    formData.append('pin', pin);
    formData.append('email', email);
    formData.append('contact', contact);
    this.http.post<{status: string, hospital: Hospital}>(environment.apiUrl + '/hospital/addHospital', formData)
    .subscribe(() => {
      this.router.navigate(['Admin/HospitalBranchView']);
    });
  }
  getHospitalById(id: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<{_id: string, hospitalName: string, branchName: string, adminId: string, imageUrl: File | string, speciality: string,
      // tslint:disable-next-line:max-line-length
      status: string, description: string, state: string, city: string, branchArea: string, address: string, pin: string, email: string, contact:string}>(
     environment.apiUrl + '/hospital/' + id);
  }
  updateHospitalData(id: string, hospitalName: string, branchName: string, adminId: string, imageUrl: File | string, speciality: string,
                     // tslint:disable-next-line:max-line-length
                     status: string, description: string, state: string, city: string, branchArea: string, address: string, pin: string, email:string, contact: string) {
     let hospitalData: Hospital | FormData;
     console.log(typeof imageUrl);
     if (typeof imageUrl === 'object') {
       hospitalData = new FormData();
       hospitalData.append('id', id);
       hospitalData.append('hospitalName', hospitalName);
       hospitalData.append('branchName', branchName),
       hospitalData.append('adminId', adminId);
       hospitalData.append('image', imageUrl, hospitalName);
       hospitalData.append('description', description);
       hospitalData.append('speciality', speciality);
       hospitalData.append('status', status);
       hospitalData.append('state', state);
       hospitalData.append('city', city);
       hospitalData.append('branchArea', branchArea);
       hospitalData.append('address', address);
       hospitalData.append('pin', pin);
       hospitalData.append('email', email);
       hospitalData.append('contact', contact);
     } else {
       hospitalData = {
         id,
         hospitalName,
         branchName,
         adminId,
         description,
         speciality,
         status,
         imageUrl,
         state,
         city,
         branchArea,
         address,
         pin,
         email,
         contact,
       };
     }
     this.http.put<{message: string}>(environment.apiUrl + '/hospital/' + id, hospitalData)
     .subscribe(response => {
       this.router.navigate(['Admin/HospitalBranchView']);
     } );

  }
  deleteHospital(hospitalId: string) {
    return this.http.delete(environment.apiUrl + '/hospital/' + hospitalId);
   }

   gethospitalNameFromAdmin() {
    return this.http.get<{data: any}>(environment.apiUrl + '/users');
   }

   getHospitalData() {
    return this.http.get<{data: any}>(environment.apiUrl + '/hospital');
   }

  //  getHospitalDataByCity(city: string) {
  //    const cityData = {
  //      city
  //    };
  //    return this.http.post<{data: any}>(environment.apiUrl + '/hospital/city', cityData);
  //  }
  getHospitalByLocation(state: string, city: string, area: string) {
    const locationData = {
      state,
      city,
      area
    };
    console.log(locationData);
    return this.http.post<{data: any}>(environment.apiUrl + '/hospital/location', locationData);
  }
  getHospitalBySpeciality(state: string, speciality: string) {
    const hospData = {
      state,
      speciality
    };
    return this.http.post<{data: any}>(environment.apiUrl + '/hospital/speciality', hospData);
  }
  getHospitalByHospitalSearch(hospitalName: string) {
    const hospitalData = {
      hospitalName
    };
    return this.http.post<{data: any}>(environment.apiUrl + '/hospital/hospitalSearch', hospitalData);
  }

   getDataBranch(branch: string) {
   const  branches = {
      branchName: branch
     };
   return this.http.post<{data: any}>(environment.apiUrl + '/hospital/getData', branches);
   }
}

