import { FormStepperService } from './form-stepper.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/Errors/error.service';

@Component({
  selector: 'app-form-stepper',
  templateUrl: './form-stepper.component.html',
  styleUrls: ['./form-stepper.component.css'],
})
export class FormStepperComponent implements OnInit {
  vehicleInfoForm!: FormGroup;
  comparisonForm!: FormGroup;
  personalForm!: FormGroup;
  geoGraphiclaList:any;
  TonneList:any;
  NcdList:any;
  constructor(
    private _formBuilder: FormBuilder,
    private formStepperService: FormStepperService,
    private errorService:ErrorService

    ) {}

  ngOnInit() {
    this.vehicleInfoForm = this._formBuilder.group({
      plateNo: ['', Validators.required],
    });
    this.comparisonForm = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.personalForm = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.onInitialFetchData()
  }

 async onInitialFetchData(){
    this.geoGraphiclaList= await  this.onGetGeoGraphical();
    this.TonneList= await  this.onGetTonneList();
    this.NcdList= await  this.onGetNcdList();




    console.log(this.geoGraphiclaList);
  }

  async onGetGeoGraphical() {
    let UrlLink = `dropdown/geographical`;
    let response = (await this.formStepperService.onGetMethodAsync(UrlLink)).toPromise()
      .then(res => {
        return res;
      })
      .catch((err) => {
        this.handleError(err)
      })
      .finally(() => {
      });
    return response;
  }
  async onGetTonneList() {
    let UrlLink = `dropdown/tonnage`;
    let response = (await this.formStepperService.onGetMethodAsync(UrlLink)).toPromise()
      .then(res => {
        return res;
      })
      .catch((err) => {
        this.handleError(err)
      })
      .finally(() => {
      });
    return response;
  }
  async onGetNcdList() {
    let ReqObj={
      "PvParam1": "01/01/2010"
    }
    let UrlLink = `dropdown/claim/bonus`;
    let response = (await this.formStepperService.onPostMethodAsync(UrlLink,ReqObj)).toPromise()
      .then(res => {
        return res;
      })
      .catch((err) => {
        this.handleError(err)
      })
      .finally(() => {
      });
    return response;
  }

  handleError(error:any) {
    let errorMessage: any = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = { 'ErrorCode': error.status, 'Message': error.message };
      this.errorService.showError(error, errorMessage);
    }

  }
}
