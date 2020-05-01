import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../error/error.component';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}
 public errorMessage: string;
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorMessage = 'An unknown error ocuured';
        if (error.error.message) {
          this.errorMessage = error.error.message;
        }
        this.dialog.open(ErrorComponent, {data: {message: this.errorMessage}});
        return throwError(error);
      })
    );
  }
}
