import { Router } from '@angular/router';
import { Hospital } from './../../model/model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient, private router: Router) { }

  addHospitalDetails(hospitalName: string, imageUrl: File | string, speciality: string,
                     status: string, description: string) {
    const formData = new FormData();
    formData.append('image', imageUrl);
    formData.append('hospitalName', hospitalName);
    formData.append('speciality', speciality);
    formData.append('status', status);
    formData.append('description', description);
    this.http.post<{status: string, hospital: Hospital}>(environment.apiUrl + '/hospital/addHospital', formData)
    .subscribe(() => {
      this.router.navigate(['Admin/HospitalBranchView']);
    });
  }
  getHospitalById(id: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<{_id: string, hospitalName: string, adminId: string, imageUrl: File | string, speciality: string,
      status: string, description: string}>(
     environment.apiUrl + '/hospital/' + id);
  }
  updateHospitalData(id: string, hospitalName: string, adminId: string, imageUrl: File | string, speciality: string,
                     status: string, description: string) {
     let hospitalData: Hospital | FormData;
     console.log(typeof imageUrl);
     if (typeof imageUrl === 'object') {
       hospitalData = new FormData();
       hospitalData.append('id', id);
       hospitalData.append('hospitalName', hospitalName);
       hospitalData.append('adminId', adminId);
       hospitalData.append('image', imageUrl, hospitalName);
       hospitalData.append('description', description);
       hospitalData.append('speciality', speciality);
       hospitalData.append('status', status);
     } else {
       hospitalData = {
         id,
         hospitalName,
         adminId,
         description,
         speciality,
         status,
         imageUrl
       };
     }
     this.http.put<{message: string}>(environment.apiUrl + '/hospital/' + id, hospitalData)
     .subscribe(response => {
       this.router.navigate(['Admin/HospitalBranchView']);
     } );

  }
}

