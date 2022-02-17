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
export class FormStepperService {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl: any = this.AppConfig.ApiUrl;
  public ApiUrl2: any = this.AppConfig.ApiUrl2;
  public ApiUrl3: any = this.AppConfig.ApiUrl3;


  public Token: any;
  result: any[] = [];
  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return 'dmlzaW9ubW90b3I6dmlzaW9ubW90b3JAMTIzIw==';

  }



   onGetOffenseInfo(GetQuoteDetails: any) {
    let UrlLink = `${this.ApiUrl}offenseinfo/search/${GetQuoteDetails?.drivCivilCrNo}`;
    let ReqObj = {};
    return this.onParallelPostMethod(UrlLink, ReqObj);
  }

   onGetClaimInfoByLicense(GetQuoteDetails: any) {
    let UrlLink = `${this.ApiUrl}claiminfobylicence/${GetQuoteDetails?.drivCivilCrNo}`;
    let ReqObj = {};
    return this.onParallelPostMethod(UrlLink, ReqObj);
  }

   onGetClaimInfoByChassis(GetQuoteDetailsResponse: any) {
    let UrlLink = `${this.ApiUrl}claiminfobylicence/${GetQuoteDetailsResponse?.chassisnumber}`;
    let ReqObj = {};
    return this.onParallelPostMethod(UrlLink, ReqObj);
  }
   onGetVehicleInformation(GetQuoteDetailsResponse: any) {
    let UrlLink = `${this.ApiUrl}chassisnoDet/${GetQuoteDetailsResponse?.chassisnumber}`;
    return this.onParallelGetMethod(UrlLink,);
  }

   onGetLicenseInfo(GetQuoteDetails: any) {
    let UrlLink = `${this.ApiUrl}licenseinfo/search/${GetQuoteDetails?.drivCivilCrNo}`;
    let ReqObj = {};
    return this.onParallelPostMethod(UrlLink, ReqObj);
  }


  async onGetNcdList(GetQuoteDetailsResponse: any) {
    let ReqObj = {
      PvParam1: `01/01/${GetQuoteDetailsResponse?.makeyear}`,
    };
    let UrlLink = `${this.ApiUrl}dropdown/claim/bonus`;
    let response = (await this.onPostMethodAsync(UrlLink, ReqObj))
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => { })
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
      .pipe(map(data => { return data }), catchError(this.handleError));
  }







  onGetSumInsured(UrlLink: string, ReqObj: any): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + 'dmlzaW9ubW90b3I6dmlzaW9ubW90b3JAMTIzIw==');
    return this.http
      .post<any>(this.ApiUrl + UrlLink, ReqObj, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }


  onUploadDocument(UrlLink: string, ReqObj: any): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + 'dmlzaW9uOnZpc2lvbkAxMjMj');
    return this.http
      .post<any>(this.ApiUrl2 + UrlLink, ReqObj, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }








  onParallelPostMethod(UrlLink: string, ReqObj: any): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + this.getToken());
    return this.http
      .post<any>(UrlLink, ReqObj, { headers: headers })
      .pipe(map(data => { return data }), catchError(this.handleError));
  }
  onParallelGetMethod(UrlLink: string): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + this.getToken());
    return this.http
      .get<any>(UrlLink, { headers: headers })
      .pipe(map(data => { return data }), catchError(this.handleError));
  }

  // Error handling
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
