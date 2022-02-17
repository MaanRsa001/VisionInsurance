import { DatePipe } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  EventEmitter,
  Output,
  SimpleChange,
} from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorService } from 'src/app/Errors/error.service';
import { FormStepperService } from '../../form-stepper.service';
import { VehicleInformService } from '../../Services/vehicle-inform.service';
import * as Mydatas from '../../../../app-config.json';

@Component({
  selector: 'app-vehicle-inform',
  templateUrl: './vehicle-inform.component.html',
  styleUrls: ['./vehicle-inform.component.css'],
})
export class VehicleInformComponent implements OnInit, OnChanges {
  @Input('vehicleInfoForm') vehicleInfoForm!: FormGroup;
  @Input('personalForm') personalForm!: FormGroup;

  @Input('vehicleInformation') vehicleInformation: any;
  @Input('GetQuoteDetailsResponse') GetQuoteDetailsResponse: any;
  @Input('licenseInformation') licenseInformation: any;

  @Input('NcdList') NcdList: any[]=[];
  @Input('isLightVehicle') isLightVehicle: boolean = false;
  @Input('isHeavyVehicle') isHeavyVehicle: boolean = false;
  @Input('flowType') flowType: boolean = false;


  public purchaseType: any = 'Foreign';
  public trimList: any[] = [];
  public importedCountry: any[] = [];
  public claimAmountList: any[] = [];
  public visaStatusList: any[] = [];
  public vehicleUsageList: any[] = [];
  @Output('premiumResponse') premiumResponse = new EventEmitter();
  @Output('isGetQuote') isGetQuote = new EventEmitter();

  public geoGraphiclaList: any[] = [];
  public occupationList: any[] = [];
  public TonneList: any[] = [];

  public pleaseSelect = {
    'Code': '',
    'Description_en': '-Select-'
  }

  autoTicks = false;
  disabled = false;
  invert = false;
  max = 0;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  yourSumInsured = 0;
  vertical = false;
  tickInterval = 1;
  selectedCity: any;
  public GetQuoteDetails: any;
  public changeIncrement:number=0;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl: any = this.AppConfig.ApiUrl;
  public ApiUrl2: any = this.AppConfig.ApiUrl2;
  public ApiUrl3: any = this.AppConfig.ApiUrl3;
  constructor(
    private formStepperService: FormStepperService,
    private vehicleInformService: VehicleInformService,
    private errorService: ErrorService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) {
    this.geoGraphiclaList.unshift(this.pleaseSelect);
    this.trimList.unshift(this.pleaseSelect);
    this.importedCountry.unshift(this.pleaseSelect);
    this.vehicleUsageList.unshift(this.pleaseSelect);
    this.TonneList.unshift(this.pleaseSelect);







  }

  ngOnInit(): void {
    this.onTrimChange();
    this.onCheckIsVehicleImported();
    this.onCheckVisaStatus();
    this.onChangeNCD();
    this.onCheckIsPromoCode();
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }): void {
    let change: SimpleChange = changes['GetQuoteDetailsResponse'];
    if (this.GetQuoteDetailsResponse && this.changeIncrement ==0) {
      ++this.changeIncrement;
      console.log(this.GetQuoteDetailsResponse)
      this.onSetDefaultValue(this.GetQuoteDetailsResponse);
    }
  }

  async onSetDefaultValue(vehicleInformation: any) {
    this.vehicleInfoForm.controls['seatingCapacity'].setValue(vehicleInformation.seatingcapcity);
    this.trimList = (await this.vehicleInformService.onGetTrimList(vehicleInformation)) || [];
    this.importedCountry = await this.vehicleInformService.onGetCountryList() || [];
    this.claimAmountList = (await this.vehicleInformService.onGetClaimAmountList()) || [];
    this.visaStatusList = (await this.vehicleInformService.onGetVisiaStatusList()) || [];
    this.vehicleUsageList = (await this.vehicleInformService.onGetVehicleUsage()) || [];
    this.geoGraphiclaList = (await this.vehicleInformService.onGetGeoGraphical()) || [];
    this.TonneList = (await this.vehicleInformService.onGetTonneList()) || [];
  }
  async onTrimChange() {
    let SumInsured: any = await this.vehicleInformService.onGetSumInsured(this.GetQuoteDetailsResponse, this.vehicleInfoForm);
    let setDefaultVal = Math.round((80 / 100) * SumInsured?.cal_sum_insured || 0);
    this.max = SumInsured?.cal_sum_insured || 0;
    this.min=SumInsured?.min_cal_sum_insured || 0;
    this.vehicleInfoForm.controls['sumInsured'].setValue(setDefaultVal);

  }

  onCheckIsPromoCode() {
    const promocode = this.vehicleInfoForm.get('promocode')!;
    const membershipNo = this.vehicleInfoForm.get('membershipNo')!;
    let val = this.vehicleInfoForm.controls['HavePromoYN'].value;
    if (val == 'Y') {
      promocode.setValidators([Validators.required]);
      membershipNo.setValidators([Validators.required]);
    } else {
      promocode.setValidators(null);
      membershipNo.setValidators(null);
    }
    promocode.updateValueAndValidity();
    membershipNo.updateValueAndValidity();

  }




  onCheckIsVehicleImported() {
    const ImportedCountry = this.vehicleInfoForm.get('ImportedCountry')!;
    if (this.vehicleInfoForm.controls['isVehicleImported'].value == 'Y') {
      ImportedCountry.setValidators([Validators.required]);
    } else {
      ImportedCountry.setValidators(null);

    }
    ImportedCountry.updateValueAndValidity();

  }
  onCheckVisaStatus() {
    const noOfYears = this.vehicleInfoForm.get('noOfYears')!;
    if (this.vehicleInfoForm.controls['visaStatus'].value == 'Y') {
      noOfYears.setValidators([Validators.required]);
    } else {
      noOfYears.setValidators(null);

    }
    noOfYears.updateValueAndValidity();
  }
  onChangeNCD() {
    let ncdValue = this.vehicleInfoForm.controls['ncd'].value;
    const claimAmount = this.vehicleInfoForm.get('claimAmount')!;
    if (ncdValue == -1) {
      claimAmount.setValidators([Validators.required]);
    } else {
      claimAmount.setValidators(null);
    }
    claimAmount.updateValueAndValidity();

  }
  onChangeGeoGraphical() {
    let geoGraphicalExtension = this.vehicleInfoForm.controls['geoGraphicalExtension'].value;
    const orangeCard = this.personalForm.get('orangeCard')!;
    if (geoGraphicalExtension == 2) {
      orangeCard.setValidators([Validators.required]);
    } else {
      orangeCard.setValidators(null);
    }
    orangeCard.updateValueAndValidity();

  }

  onCreateQuote() {
    console.log(this.GetQuoteDetailsResponse)
    this.GetQuoteDetails = JSON.parse(
      sessionStorage.getItem('GetQuoteDetails') || '{}'
    );


    ;
    let UrlLink = `${this.ApiUrl}quote/createquote`;
    let ReqObj = {
      Admin_LoginId: '',
      AgencyCode: '90016',
      ApplicationId: '1',
      ApplicationNo: '',
      BranchCode: '01',
      BrokerCode: '90016',
      ChannelList: 'Y',
      CustomerCode: '1',
      CustomerId: '',
      Customer_CodeName: '1',
      ErrorKey: '',
      ExecutiveId: '',
      Finalize_Yn: 'N',
      ImgRefno: '',
      InsuranceCompanyCode: '72',
      InterestedinCompYN: '',
      LoginId: 'viconline',
      PolicyNumber: '',
      QuoteNo: '',
      RequestReferenceNo: '',
      SourceType: '1',
      Status: 'Y',
      StillWantCompYN: '',
      StillWantToProceed: '',
      SubUserType: '77777',
      UserType: 'User',
      customerInfo: {
        CivilId: this.GetQuoteDetails?.drivCivilCrNo,
        Custdob: this.licenseInformation?.dateofbirth,
        DrivingType: this.GetQuoteDetails?.TypeOfDriver,
        DrivingTypeDesc: '',
        Email: '',
        Gender: this.vehicleInfoForm.controls['isVehicleOwned'].value == 'Y' ? '3' : '1',
        JointName:
          this.vehicleInformation?.insured_last_name == null
            ? '.'
            : this.vehicleInformation?.insured_last_name,
        MobileCode: '968',
        MobileNo: this.GetQuoteDetails?.MobileNo,
        Nationality: '1',
        Occupation: '99999',
        OccupationDesc: '',
        Other_Occupation: 'Former',
        OwnerAsDriver: 'Y',
        OwnerName: '.',
        Title: 'Mr',
        Visa: this.vehicleInfoForm.controls['visaStatus'].value,
        VisaDesc: '',
        WhatsApCode: '968',
        WhatsAppno: this.GetQuoteDetails?.MobileNo,
        Wilayat: '28',
        WilayatDesc: '',
      },
      driverDetail: [
        {
          DriverDob: this.licenseInformation?.dateofbirth,
          DriverId: this.GetQuoteDetails?.drivCivilCrNo,
          DriverName:
            this.vehicleInformation?.insured_name == null
              ? '.'
              : this.vehicleInformation?.insured_name +
                this.vehicleInformation?.insured_last_name ==
                null
                ? '.'
                : this.vehicleInformation?.insured_last_name,
          LicenseClass: '1',
          LicenseIssueDate: this.licenseInformation?.datefirstissued,
          driverGender: this.vehicleInfoForm.controls['isVehicleOwned'].value == 'Y' ? '3' : '1',
        },
      ],
      vehicleDetail: {
        BodyDesc: '',
        ChassisNo: this.GetQuoteDetailsResponse?.chassisnumber,
        ClaimBonusDesc: '',
        ClaimLoading: '1',
        ClaimRation: '',
        ClaimYn: '',
        CurrYearMileage: '1',
        CustomsId: '',
        Cylinder: '',
        Driveresc: '',
        EngineNo: this.GetQuoteDetailsResponse?.enginenumber,
        Excess: '',
        GeoGraphical:
          this.vehicleInfoForm.controls['geoGraphicalExtension'].value,
        GeographicalDesc: '',
        GreyImportYN: '',
        HavePromoYN: 'N',
        ImportCout: this.vehicleInfoForm.controls['ImportedCountry'].value,
        ImportYN: this.vehicleInfoForm.controls['isVehicleImported'].value,
        IsCommercial: this.GetQuoteDetailsResponse?.registraiontype,
        LoyalFlag: '',
        LoyaltyPercent: '4',
        MakeName: this.GetQuoteDetailsResponse?.vehiclemakeid,
        ManufactureYear: this.GetQuoteDetailsResponse?.makeyear,
        ModelName: this.GetQuoteDetailsResponse?.vehiclemodelid,
        Model_Name: '1',
        MotorRegistrationDate: `01/01/${this.GetQuoteDetailsResponse?.makeyear}`,
        NcdValue: this.vehicleInfoForm.controls['ncd'].value,
        NoOfClaims: '',
        NoOfDays: '',
        NoOfDrivers: '1',
        Nooflicenseyear:
          this.vehicleInfoForm.controls['visaStatus'].value == '1'
            ? '1'
            : this.vehicleInfoForm.controls['noOfYears'].value,
        PhNcb: '',
        PlateNationalty: '1',
        PlateNo: this.GetQuoteDetails.PlateNo,
        Platechar: this.GetQuoteDetails.PlatCode,
        PolicyEndDate: this.datePipe.transform(
          this.onGetPloicyEndDate(
            this.GetQuoteDetailsResponse?.insurancestartdate
          ),
          'dd/MM/yyyy'
        ),
        PolicyStartDate: this.datePipe.transform(
          this.onGetPloicyStartDate(
            this.GetQuoteDetailsResponse?.insuranceenddate
          ),
          'dd/MM/yyyy'
        ),
        PolicyType: '',
        PromoCode: this.vehicleInfoForm.controls['promocode'].value,
        PromoCodeRefNo: '',
        QuoteType: 'SQ',
        Seats: this.vehicleInfoForm.controls['seatingCapacity'].value,
        SumInsured: this.vehicleInfoForm.controls['sumInsured'].value,
        Tonnage: this.vehicleInfoForm.controls['tonnAge'].value,
        Trim: this.vehicleInfoForm.controls['trim'].value,
        VechicleUsage: this.vehicleInfoForm.controls['VechicleUsage'].value,
        VehicleCondition: '',
        VehicleCtgry: this.GetQuoteDetailsResponse?.vehicletypeid,
        VehicleManifContry: '',
        VehicleMileage: '10000',
        VehicleParkingType: '',
        VehicleType: this.GetQuoteDetailsResponse?.registraiontype,
        VolumeDiscount: '4',
        vehicleWeight: '',
      },
    };
    return this.vehicleInformService.onPostMethodSync(UrlLink, ReqObj).subscribe(
      (data: any) => {
        if (data){
          console.log(data);
          this.premiumResponse.emit(data);
        }
      },
      (err) => {
        this.handleError(err);
      }
    );
  }

  onGetPloicyStartDate(policyEndDate: any) {
    var date = new Date();
    return date.setDate(date.getDate() + 1);
  }
  onGetPloicyEndDate(policyStartDate: any) {
    var date = new Date();
    return date.setDate(date.getDate() + 365);
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
