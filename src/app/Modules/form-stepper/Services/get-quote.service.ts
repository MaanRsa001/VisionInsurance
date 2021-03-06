import { FormGroup } from '@angular/forms';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, take } from 'rxjs/operators';
import * as Mydatas from '../../../app-config.json';

@Injectable({
  providedIn: 'root',
})
export class GetQuoteService {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl: any = this.AppConfig.ApiUrl;
  public ApiUrl2: any = this.AppConfig.ApiUrl2;
  public ApiUrl3: any = this.AppConfig.ApiUrl3;


  public Token: any;
  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return 'dmlzaW9ubW90b3I6dmlzaW9ubW90b3JAMTIzIw==';
  }



  async onGetPlateCharList() {
    let UrlLink = `dropdown/platechar`;
    let response = (await this.onGetMethodAsync(UrlLink))
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {})
    return response;
  }

  async onGetTypeOfDriver() {
    let UrlLink = `dropdown/drivingLicense`;
    let response = (await this.onGetMethodAsync(UrlLink))
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {})
    return response;
  }


  onFormSubmit(getQuoteForm:FormGroup) {
    let PlateNo = getQuoteForm.controls['plateNumber'].value;
    let PlateCode = getQuoteForm.controls['plateChar'].value;
    let UrlLink = `vehicleplate/${PlateNo}/${PlateCode}`;
    let ReqObj = {};
    return this.onPostMethodSync(UrlLink, ReqObj)
    .toPromise()
    .then(res => {
        return res;
    })
    .catch((err:HttpErrorResponse) => {
      return 'isError';
    });

  }























































































































































































































  async onPostMethodAsync(UrlLink: any, ReqObj: any): Promise<Observable<any[]>> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + this.getToken());
    return await this.http
      .post<any>(this.ApiUrl + UrlLink, ReqObj, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }
  async onGetMethodAsync(UrlLink: any): Promise<Observable<any[]>> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + this.getToken());
    return await this.http
      .get<any>(this.ApiUrl + UrlLink, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  onPostMethodSync(UrlLink: string, ReqObj: any): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + this.getToken());
    return this.http
      .post<any>(this.ApiUrl + UrlLink, ReqObj, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  onGetMethodSync(UrlLink: string, ReqObj: any): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + this.getToken());
    return this.http
      .get<any>(this.ApiUrl + UrlLink, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }




  // Error handling
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
