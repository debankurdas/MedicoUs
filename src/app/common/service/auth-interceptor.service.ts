import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req.clone();
    if (localStorage.getItem('token') != null) {
      const header = new HttpHeaders().set('access-token', localStorage.getItem('token'));
      request = req.clone({headers: header});
    }
    return next.handle(request).pipe
    (map((event: HttpEvent<any>) => {
      return event;
    }), catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        this.router.navigate(['/index']);
      }
      return throwError(error);
    })
    );
  }
}
