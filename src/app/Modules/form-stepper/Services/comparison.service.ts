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
export class ComparisonService {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl: any = this.AppConfig.ApiUrl;
  public ApiUrl2: any = this.AppConfig.ApiUrl2;
  public ApiUrl3: any = this.AppConfig.ApiUrl3;
  public GetQuoteDetails: any;

  public Token: any;
  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return 'dmlzaW9ubW90b3I6dmlzaW9ubW90b3JAMTIzIw==';
  }

  getOtpToken() {
    return 'dmlzaW9uOnZpc2lvbkAxMjMj';
  }

  async onGetOpt(data: any) {
    this.GetQuoteDetails = JSON.parse(
      sessionStorage.getItem('GetQuoteDetails') || '{}'
    );

    let ReqObj = {
      ProductId: '65',
      Type: 'GET_OTP_MOTOR',
      WhatsAppNo: this.GetQuoteDetails.MobileNo,
      MCode: '968',
      MobileNo: this.GetQuoteDetails.MobileNo,
      OtpId: '',
      RequestReferenceNo: data.RequestReferenceNo,
    };
    let UrlLink = `${this.ApiUrl2}notification/getotp`;
    let response = (await this.onOtpPostMethodAsync(UrlLink, ReqObj))
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err: HttpErrorResponse) => {});
    return response;
  }

  onSendOtp(data:any,premium:any,UrlLink: string) {
    let ReqObj = {
      Otp: data?.Otp,
      OtpId: data?.OtpId,
      ProductId: '65',
      QuoteNo: premium?.RequestReferenceNo,
      SubUserType: '77777',
      UserType: 'User',
      Type: 'GET_OTP_MOTOR',
      RequestReferenceNo: premium?.RequestReferenceNo,
    };


    this.onOtpPostMethodSync(UrlLink, ReqObj).subscribe(
      (data: any) => {
        if (data) {
          console.log(data);
          return data;
        }
      },
      (err) => {
        this.handleError(err);
      }
    );
  }

  async onOtpPostMethodAsync(
    UrlLink: any,
    ReqObj: any
  ): Promise<Observable<any[]>> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + this.getOtpToken());
    return await this.http
      .post<any>(UrlLink, ReqObj, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  onOtpPostMethodSync(UrlLink: string, ReqObj: any): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + this.getOtpToken());
    return this.http
      .post<any>(UrlLink, ReqObj, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  async onPostMethodAsync(
    UrlLink: any,
    ReqObj: any
  ): Promise<Observable<any[]>> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + this.getToken());
    return await this.http
      .post<any>(UrlLink, ReqObj, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }
  async onGetMethodAsync(UrlLink: any): Promise<Observable<any[]>> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + this.getToken());
    return await this.http
      .get<any>(UrlLink, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  onPostMethodSync(UrlLink: string, ReqObj: any): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + this.getToken());
    return this.http
      .post<any>(UrlLink, ReqObj, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  onGetMethodSync(UrlLink: string, ReqObj: any): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + this.getToken());
    return this.http
      .get<any>(UrlLink, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
