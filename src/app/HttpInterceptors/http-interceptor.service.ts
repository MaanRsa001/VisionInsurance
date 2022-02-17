import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorService } from '../Errors/error.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  service_count = 0;
  constructor(
    public router: Router,
    private errorService: ErrorService,
    private spinner: NgxSpinnerService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.service_count++;
    this.spinner.show();
    return next.handle(req).pipe(
      finalize(() => {
        this.service_count--;
        if (this.service_count === 0) {
          this.spinner.hide();
        }
      }),
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          this.errorService.APIError(error);
        }
        return throwError(error.message);
      })
    );
  }
}
