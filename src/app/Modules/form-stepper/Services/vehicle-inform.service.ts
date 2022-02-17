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
export class VehicleInformService {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl: any = this.AppConfig.ApiUrl;
  public ApiUrl2: any = this.AppConfig.ApiUrl2;
  public ApiUrl3: any = this.AppConfig.ApiUrl3;


  public Token: any;
  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return 'dmlzaW9ubW90b3I6dmlzaW9ubW90b3JAMTIzIw==';
  }





  async onGetTrimList(vehicleInformation: any) {
    let MakeId = vehicleInformation.vehiclemakeid;
    let ModelId = vehicleInformation.vehiclemodelid;
    let UrlLink = `${this.ApiUrl}dropdown/trim/${MakeId}/${ModelId}`;
    let response = (await this.onGetMethodAsync(UrlLink))
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => { })
    return response;
  }

  async onGetCountryList() {
    let UrlLink = `${this.ApiUrl}dropdown/importcountry`;
    let response = (await this.onGetMethodAsync(UrlLink))
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => { })
    return response;
  }
  async onGetClaimAmountList() {
    let UrlLink = `${this.ApiUrl}dropdown/claimloadlist`;
    let response = (await this.onGetMethodAsync(UrlLink))
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => { })
    return response;
  }

  async onGetVisiaStatusList() {
    let UrlLink = `${this.ApiUrl}dropdown/visa`;
    let response = (await this.onGetMethodAsync(UrlLink))
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => { })
    return response;
  }
  async onGetVehicleUsage() {
    let UrlLink = `${this.ApiUrl}dropdown/b2cvehiclusagelist`;
    let response = (await this.onGetMethodAsync(UrlLink))
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => { })
    return response;
  }
  async onGetGeoGraphical() {
    let UrlLink = `${this.ApiUrl}dropdown/geographical`;
    let response = (await this.onGetMethodAsync(UrlLink))
    .toPromise()
    .then((res) => {
      return res;
    })
    .catch((err) => { })
  return response;
  }
  async onGetTonneList() {
    let UrlLink = `${this.ApiUrl}dropdown/tonnage`;
    let response = (await this.onGetMethodAsync(UrlLink))
    .toPromise()
    .then((res) => {
      return res;
    })
    .catch((err) => { })
  return response;
  }



  async onGetSumInsured(GetQuoteDetailsResponse:any,vehicleInfoForm:FormGroup) {
    let ReqObj = {
      flag: 'P',
      manufacture_year: GetQuoteDetailsResponse?.makeyear,
      new_sum_insured: '0',
      make_model_id: GetQuoteDetailsResponse?.vehiclemodelid,
      make_id: GetQuoteDetailsResponse?.vehiclemakeid,
      model_id: GetQuoteDetailsResponse?.vehiclemodelid,
      trim_id: vehicleInfoForm.controls['trim'].value,
      prod_code: '1006WB',
      chassisno : GetQuoteDetailsResponse?.chassisnumber

    };
    let UrlLink = `${this.ApiUrl}quote/getsuminsurerange`;
    let response = (await this.onPostMethodAsync(UrlLink, ReqObj))
    .toPromise()
    .then(res => {
        return res;
    })
    .catch((err:HttpErrorResponse) => {});
    return response;


  }


















































































































































































































  async onPostMethodAsync(UrlLink: any, ReqObj: any): Promise<Observable<any[]>> {
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
