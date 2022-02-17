import { FormStepperService } from './form-stepper.service';
import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ErrorService } from 'src/app/Errors/error.service';
import { browserRefresh } from '../../app.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatStepper } from '@angular/material/stepper';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-form-stepper',
  templateUrl: './form-stepper.component.html',
  styleUrls: ['./form-stepper.component.css'],
})
export class FormStepperComponent implements OnInit, OnChanges {
  public vehicleInfoForm!: FormGroup;
  public comparisonForm!: FormGroup;
  public personalForm!: FormGroup;
  public premiumDetails: any;
  public buyPolicyDetails: any;

  public NcdList: any[]=[];
  public GetQuoteDetails: any;
  public GetQuoteDetailsResponse: any;

  public offenseInformation: any;
  public licenseInformation: any;
  public claimInfoLicense: any;
  public claimInfoChassis: any;
  public vehicleInformation: any;

  public flowType:boolean=false;
  public isLightVehicle: boolean = false;
  public isHeavyVehicle: boolean = false;
  public browserRefresh!: boolean;
  public isGetQuote: boolean = true;
  public driverId: number = 0;

  @ViewChild('stepper') private myStepper!: MatStepper;
  public pleaseSelect = {
    'Code': '',
    'Description_en': '-Select-'
  }
  constructor(
    private _formBuilder: FormBuilder,
    private formStepperService: FormStepperService,
    private errorService: ErrorService,
    private spinner: NgxSpinnerService
  ) {
    this.NcdList.unshift(this.pleaseSelect);

  }

  ngOnInit() {
    this.onCreateFormControl();
    this.browserRefresh = browserRefresh;
    console.log('Refresh:', this.browserRefresh);
  }
  ngOnChanges(changes: SimpleChanges): void { }
  onCreateFormControl() {
    this.vehicleInfoForm = this._formBuilder.group({
      trim: ['99999', Validators.required],
      seatingCapacity: ['', Validators.required],
      geoGraphicalExtension: ['', Validators.required],
      ImportedCountry: ['', Validators.required],
      noOfYears: ['', Validators.required],
      ncd: ['', Validators.required],
      claimAmount: ['', Validators.required],
      tonnAge: ['', Validators.required],
      sumInsured: ['0', Validators.required],
      VechicleUsage: ['', Validators.required],
      HavePromoYN:['N'],
      promocode:['',Validators.required],
      membershipNo:['',Validators.required],
      visaStatus:['1'],
      isVehicleOwned:['N'],
      isVehicleImported:['N']
    });

    this.comparisonForm = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

    this.personalForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['1', Validators.required],
      occupation: ['', Validators.required],
      otherOccupation: ['', Validators.required],
      whatsappNumber: ['', [Validators.required]],
      whatsappCode: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      wilayat: ['28', Validators.required],
      policyDate: ['', Validators.required],
      orangeCard: ['', Validators.required],
      City: ['', Validators.required],
      Title: ['', Validators.required],
      Nationality: ['', Validators.required],
      isAdditionalDriver:['N'],
      driverdetails: this._formBuilder.array([this.createDriverForm()]),
    });
    this.personalForm.controls['dateOfBirth'].disable();
  }

  private createDriverForm(): FormGroup {
    ++this.driverId;
    return new FormGroup({
      DriverDob: new FormControl(''),
      DriverId: new FormControl(this.driverId),
      DriverName: new FormControl('',[Validators.required]),
      LastName: new FormControl('',[Validators.required]),
      LicenceClass: new FormControl(''),
      LicenceIssueDate: new FormControl(''),
      MiddleName: new FormControl(''),
      DriverGender: new FormControl(''),
    });
  }



  public addDriverForm() {
    const drivers = this.personalForm.get('driverdetails') as FormArray;
    drivers.push(this.createDriverForm());
  }

  public removeDriverForm(i: number) {
    const drivers = this.personalForm.get('driverdetails') as FormArray;
    if (drivers.length > 1) {
      drivers.removeAt(i);
    } else {
      drivers.reset();
    }
  }

  async onGetQuoteInformation(event: any) {
    if (Object.keys(event).length != 0) {
      this.GetQuoteDetails = event;
    } else {
      this.GetQuoteDetails = JSON.parse(sessionStorage.getItem('GetQuoteDetails') || '{}');
    }

    if (Object.keys(this.GetQuoteDetails).length != 0 || this.GetQuoteDetailsResponse != undefined) {
      console.log(this.GetQuoteDetails);
      this.onParallelCall();
    this.NcdList = await this.formStepperService.onGetNcdList(this.GetQuoteDetailsResponse)||[];

    }
  }


   onParallelCall() {
    let offenseInformation = this.formStepperService.onGetOffenseInfo(this.GetQuoteDetails);
    let licenseInformation = this.formStepperService.onGetLicenseInfo(this.GetQuoteDetails);
    let claimInfoLicense = this.formStepperService.onGetClaimInfoByLicense(this.GetQuoteDetails);
    let claimInfoChassis = this.formStepperService.onGetClaimInfoByChassis(this.GetQuoteDetailsResponse);
    let vehicleInformation = this.formStepperService.onGetVehicleInformation(this.GetQuoteDetailsResponse);

    const arr = [
      offenseInformation,
      licenseInformation,
      claimInfoLicense,
      claimInfoChassis,
      vehicleInformation,
    ];
    let parallelCall = forkJoin(arr);
    parallelCall.subscribe(
      (data: any) => {
        this.spinner.hide();
        this.offenseInformation=data[0];
        this.licenseInformation=data[1];
        this.claimInfoLicense=data[2];
        this.claimInfoChassis=data[3];
        this.vehicleInformation=data[4];
        this.personalForm.controls['dateOfBirth'].setValue(this.licenseInformation.dateofbirth);

        console.log("OffenseInformation",data[0]);
        console.log("LicenseInformation",data[1]);
        console.log("ClaimInfoLicense",data[2]);
        console.log("ClaimInfoChassis",data[3]);
        console.log("ChassisnoDet",data[4]);

      },
      (err) => { },
      () => console.log('done')
    );
  }

  goBack() {
    this.myStepper.previous();
  }

  goForward() {
    this.myStepper.next();
  }

  onGoBack(event: any) {
    console.log(event);
    this.isGetQuote = event;
  }

  async onGetQuoteResponse(event: any) {
    if (event.data?.registraiontype != null) {
      this.onCreateFormControl();
      this.isGetQuote = false;
      this.GetQuoteDetailsResponse = event.data;
      this.onGetQuoteInformation(event.GetQuoteDetails);
      this.onCheckIsLightVehicle(event);
      this.onCheckIsHeavyVehicle(event);
    }
  }

  onCheckIsLightVehicle(event: any) {
    const VechicleUsage = this.vehicleInfoForm.get('VechicleUsage')!;
    if (
      // event?.data?.registraiontype != 1 && event?.data?.vehicletypeid == 1
      event?.data?.registraiontype != 1 && (event?.data?.vehicletypeid <= 6 ||
      event?.data?.vehicletypeid >= 95)
      ) {
      this.isLightVehicle = true;
      VechicleUsage.setValidators([Validators.required]);
      VechicleUsage.setValue(event?.data?.vehicletypeid);
    } else {
      this.isLightVehicle = false;
      VechicleUsage.setValidators(null);
    }
    VechicleUsage.updateValueAndValidity();
    console.log("LightVehicle",this.isLightVehicle)
  }
  onCheckIsHeavyVehicle(event: any) {
    const tonnAge = this.vehicleInfoForm.get('tonnAge')!;
    if (
      event?.data?.registraiontype != 1 &&
      event?.data?.vehicletypeid > 6 &&
      event?.data?.vehicletypeid < 95
    )

    {
      this.isHeavyVehicle = true;
      tonnAge.setValidators([Validators.required]);
      tonnAge.setValue(event?.data?.vehicletypeid);

    } else {
      this.isHeavyVehicle = false;
      tonnAge.setValidators(null);
    }
    tonnAge.updateValueAndValidity();
    console.log("HeavyVehicle",this.isHeavyVehicle)
  }

  onGetPremiumResponse(event: any) {
    this.premiumDetails = event;
    if (this.premiumDetails) {
      this.goForward();
    }
  }
  onGetBuyPolicyResponse(event: any) {
    this.buyPolicyDetails = event;
    if (this.buyPolicyDetails) {
      this.goForward();
    }
  }

  handleError(error: any) {
    let errorMessage: any = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = { ErrorCode: error.status, Message: error.message };
    }
  }
}
function phoneStart(control: AbstractControl): ValidationErrors | null {

  const regex = new RegExp('^[789]\d{9}$');
  const valid = regex.test(control.value);
  return valid ? null : { invalidNumber: true };

}
