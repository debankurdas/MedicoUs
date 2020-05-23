import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BedService {

  constructor(private http: HttpClient, private route: Router, private snackBar: MatSnackBar) { }

addBed(hospitalId: string, hospitalName: string, ward: string, quantity: number,
       cost: number, existingBed: string) {
       const details = {
        hospitalId,
        hospitalName,
        ward,
        quantity,
        cost,
        existingBed
        };
       this.http.post<{ status: string, data: any}>(environment.apiUrl + '/bed/bedAddition', details)
        .subscribe(() => {
          this.snackBar.open('Succesfully added', 'done', {
          duration: 1000
          });
        });
    }

}
