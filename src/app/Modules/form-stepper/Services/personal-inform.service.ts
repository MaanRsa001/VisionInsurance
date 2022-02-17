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
export class PersonalInformService {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl: any = this.AppConfig.ApiUrl;
  public ApiUrl2: any = this.AppConfig.ApiUrl2;
  public ApiUrl3: any = this.AppConfig.ApiUrl3;


  public Token: any;
  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return 'dmlzaW9ubW90b3I6dmlzaW9ubW90b3JAMTIzIw==';
  }




  async onGetOccupationList() {
    let UrlLink = `${this.ApiUrl}dropdown/occupation`;
    let response = (await this.onGetMethodAsync(UrlLink))
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => { })
    return response;
  }

  async onGetNationalityList() {
    let UrlLink = `${this.ApiUrl}dropdown/nationality`;
    let response = (await this.onGetMethodAsync(UrlLink))
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => { })
    return response;
  }

  async onGetCityList(event: any) {
    let UrlLink = `${this.ApiUrl}dropdown/citymaster/${event?.Code}`;
    let response = (await this.onGetMethodAsync(UrlLink))
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => { })
    return response;
  }

  async onGetOrangeCardList() {
    let ReqObj = {
      branchcode: '01',
      productId: '65',
      LoginId: 'maanissuer',
      type: 'BrokerList',
    };
    let UrlLink = `${this.ApiUrl2}dropdown/branchlist`;
    let response = ( await this.onCallOrangeCardList(UrlLink, ReqObj) )
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => { })
    return response;
  }

  async onGetWilayatList() {
    let UrlLink = `${this.ApiUrl}dropdown/wilayat`;
    let response = (await this.onGetMethodAsync(UrlLink))
    .toPromise()
    .then((res) => {
      return res;
    })
    .catch((err) => { })
  return response;
  }
  async onGetCoveraDetails(policyInfo:any) {
    let UrlLink = `${this.ApiUrl}quote/coveragedetail/${policyInfo.QuoteNo}`;
    let response = (await this.onGetMethodAsync(UrlLink))
    .toPromise()
    .then((res) => {
      return res;
    })
    .catch((err) => { })
  return response;
  }

  async onGetDocumentList(policyInfo:any) {
    let UrlLink = `${this.ApiUrl2}document/showdocdet`;
    let ReqObj = {
      AgencyCode: '',
      QuoteNo: policyInfo?.QuoteNo,
      ProductId: '65',
    };
    let response = (await this.onCallDocumentList(UrlLink, ReqObj))
    .toPromise()
    .then((res) => {
      return res;
    })
    .catch((err) => { })
  return response;
  }

  async onGetUploadDocument(policyInfo:any) {
    let UrlLink = `${this.ApiUrl2}document/uploadeddocdetbase64`;
    let ReqObj = {
      AgencyCode: '',
      QuoteNo: policyInfo?.QuoteNo,
      ProductId: '65',
    };
    let response = (await this.onCallDocumentList(UrlLink, ReqObj))
    .toPromise()
    .then((res) => {
      return res;
    })
    .catch((err) => { })
  return response;
  }













































































































































































































  async onGetMethodAsync(UrlLink: any): Promise<Observable<any[]>> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + this.getToken());
    return await this.http
      .get<any>(UrlLink, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }
  async onPostMethodAsync(UrlLink: any, ReqObj: any): Promise<Observable<any[]>> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + this.getToken());
    return await this.http
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

  onPostMethodSync(UrlLink: string, ReqObj: any): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + this.getToken());
    return this.http
      .post<any>(UrlLink, ReqObj, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }
  onDocPostMethodSync(UrlLink: string, ReqObj: any): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + 'dmlzaW9uOnZpc2lvbkAxMjMj');
    return this.http
      .post<any>(UrlLink, ReqObj, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  async onCallOrangeCardList(UrlLink: any, ReqObj: any): Promise<Observable<any[]>> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + 'dmlzaW9uOnZpc2lvbkAxMjMj');
    return await this.http
      .post<any>(UrlLink, ReqObj, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  async onCallDocumentList( UrlLink: any,ReqObj: any): Promise<Observable<any[]>> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + 'dmlzaW9uOnZpc2lvbkAxMjMj');
    return await this.http
      .post<any>(UrlLink, ReqObj, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }


  // Error handling
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
