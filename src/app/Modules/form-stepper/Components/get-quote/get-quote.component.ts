import { GetQuoteService } from './../../Services/get-quote.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormStepperService } from './../../form-stepper.service';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, Renderer2, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/Errors/error.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-get-quote',
  templateUrl: './get-quote.component.html',
  styleUrls: ['./get-quote.component.css'],
})
export class GetQuoteComponent implements OnInit, OnChanges,OnDestroy {
  public getQuoteForm!: FormGroup;
  public platecharList: any[] = [];
  public driverTypeList: any[] = [];
  public GetQuoteDetails: any;
  public pleaseSelect = {
    'Code': '',
    'Description_en': '-Select-'
  }
  @Output('GetQuoteResponse') GetQuoteResponse = new EventEmitter();
  @Input('browserRefresh') browserRefresh: any;
  submitted = false;

  constructor(
    private _formBuilder: FormBuilder,
    private formStepperService: FormStepperService,
    private errorService: ErrorService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private getQuoteService: GetQuoteService,
    // private recaptchaV3Service: ReCaptchaV3Service,
    private renderer: Renderer2,
  ) {
    this.platecharList.unshift(this.pleaseSelect);
    this.driverTypeList.unshift(this.pleaseSelect);

  }

  ngOnInit(): void {
    this.onCreateFormControl();
    this.onInitialFetchData();
    this.GetQuoteDetails = JSON.parse(sessionStorage.getItem('GetQuoteDetails') || '{}');
    if (this.browserRefresh == true && Object.keys(this.GetQuoteDetails).length != 0) {
      this.getQuoteForm.controls['plateChar'].setValue(this.GetQuoteDetails?.PlatCode);
      this.getQuoteForm.controls['plateNumber'].setValue(this.GetQuoteDetails?.PlateNo);
      this.getQuoteForm.controls['driverType'].setValue(this.GetQuoteDetails?.TypeOfDriver);
      this.getQuoteForm.controls['drivCivilCrNo'].setValue(this.GetQuoteDetails?.drivCivilCrNo);
      this.getQuoteForm.controls['MobileNo'].setValue(this.GetQuoteDetails?.MobileNo);
    }
    // this.renderer.addClass(document.body, 'recaptcha');
  }

  // public executeImportantAction(): void {
  //   this.recaptchaV3Service.execute('importantAction')
  //     .subscribe((token) => console.log(token));
  // }

  ngOnChanges(changes: SimpleChanges): void {

  }
  ngOnDestroy(): void {
    // this.renderer.removeClass(document.body, 'recaptcha');
  }
  onCreateFormControl() {
    this.getQuoteForm = this._formBuilder.group({
      plateChar: ['', Validators.required],
      plateNumber: ['', Validators.required],
      driverType: ['', Validators.required],
      drivCivilCrNo: ['', Validators.required],
      MobileNo: ['',
      [
        Validators.required,
        Validators.pattern(/^[97]\d*$/)
      ]
      ],
      recaptchaReactive: [null,Validators.required]
    });
  }


  async onInitialFetchData() {
    this.platecharList = await this.getQuoteService.onGetPlateCharList() || [];
    this.driverTypeList = await this.getQuoteService.onGetTypeOfDriver() || [];
    console.log(this.platecharList, this.driverTypeList);

  }
  get f() { return this.getQuoteForm.controls; }
  async onFormSubmit() {
    let response:any = await this.getQuoteService.onFormSubmit(this.getQuoteForm);
    this.submitted = true;
    console.log(response);
    if(response?.chassisnumber == null){
      this.getQuoteForm.controls['plateChar'].setErrors({message: 'Invalid Plate Char' });
      this.getQuoteForm.controls['plateNumber'].setErrors({message: 'Invalid Plate Number' });


    }

    if (response != "isError") {
      let GetQuoteDetails = {
        PlateNo: this.getQuoteForm.controls['plateNumber'].value,
        PlatCode: this.getQuoteForm.controls['plateChar'].value,
        TypeOfDriver: this.getQuoteForm.controls['driverType'].value,
        drivCivilCrNo: this.getQuoteForm.controls['drivCivilCrNo'].value,
        MobileNo: this.getQuoteForm.controls['MobileNo'].value,
      };
      this.GetQuoteResponse.emit({ data: response, GetQuoteDetails: GetQuoteDetails })
      sessionStorage.setItem(
        'GetQuoteDetails',
        JSON.stringify(GetQuoteDetails)
      );

    }

  }

  public addTokenLog(message: string, token: string | null) {
    console.log(message);
  }

  handleError(error: any) {
    let errorMessage: any = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = { ErrorCode: error.status, Message: error.message };
      this.errorService.showError(error, errorMessage);
    }
  }
}
