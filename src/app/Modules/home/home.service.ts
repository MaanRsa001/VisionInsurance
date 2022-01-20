import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, take } from 'rxjs/operators';
import * as Mydatas from '../../app-config.json';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl: any = this.AppConfig.ApiUrl;

  public Token: any;
  constructor(private http: HttpClient, private router: Router) {}

  getToken() {}

  async onGetLossType(UrlLink: any): Promise<Observable<any[]>> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.getToken());
    return await this.http
      .get<any>(this.ApiUrl + UrlLink, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }
  async onGetSurveyorList(UrlLink: any): Promise<Observable<any[]>> {
    console.log(UrlLink);
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.getToken());
    return await this.http
      .get<any>(this.ApiUrl + UrlLink, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  async onPostMethodAsync(
    UrlLink: any,
    ReqObj: any
  ): Promise<Observable<any[]>> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.getToken());
    return await this.http
      .post<any>(this.ApiUrl + UrlLink, ReqObj, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }
  async onGetMethodAsync(UrlLink: any): Promise<Observable<any[]>> {
    console.log(UrlLink);
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.getToken());
    return await this.http
      .get<any>(this.ApiUrl + UrlLink, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  onPostMethod(UrlLink: any, ReqObj: any): Observable<any[]> {
    console.log(ReqObj);
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.getToken());
    return this.http
      .post<any>(this.ApiUrl + UrlLink, ReqObj, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
