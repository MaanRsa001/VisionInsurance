import { Router } from '@angular/router';
import { UploadDocumentComponent } from './../upload-document/upload-document.component';
import { VeiwCoverDetailsComponent } from './../veiw-cover-details/veiw-cover-details.component';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
  AfterViewInit,
  AfterContentInit,
} from '@angular/core';
import { Form, FormArray, FormGroup, Validators } from '@angular/forms';
import { FormStepperService } from '../../form-stepper.service';
import { ErrorService } from 'src/app/Errors/error.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { PersonalInformService } from '../../Services/personal-inform.service';
import * as Mydatas from '../../../../app-config.json';
import * as _ from 'lodash';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-personal-inform',
  templateUrl: './personal-inform.component.html',
  styleUrls: ['./personal-inform.component.css'],
})
export class PersonalInformComponent implements OnInit, OnChanges,AfterContentInit {
  @Input('personalForm') personalForm!: FormGroup;
  @Input('vehicleInfoForm') vehicleInfoForm!: FormGroup;
  submitted = false;
  @Output('addDriverForm') addDriverForm = new EventEmitter();
  @Output('deleteDriverForm') deleteDriverForm = new EventEmitter();

  @Input('GetQuoteDetailsResponse') GetQuoteDetailsResponse: any;
  @Input('buyPolicyDetails') buyPolicyDetails: any;

  public AdditionDriversArray!: any[];
  public AdditionDriverObj: any = {};
  public gender: any = '1';
  public nationalityList: any[] = [];
  public cityList: any[] = [];
  public orangeCardList: any[] = [];
  public TitleList: any[] = [];
  public documentList: any = {};
  public wilayatList: any[] = [];
  public coverageDetails: any;
  public GetQuoteDetails: any;

  public policyInfo: any;
  public isAddon: boolean = false;
  public isAddonData: any;
  public bsValue = new Date();
  public bsRangeValue!: Date[];
  public maxDate = new Date();
  public minDate = new Date();

  public occupationList: any[] = [];
  public upLoadedDocument:any={};
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl: any = this.AppConfig.ApiUrl;
  public ApiUrl2: any = this.AppConfig.ApiUrl2;
  public ApiUrl3: any = this.AppConfig.ApiUrl3;
  public isAdditionalDriver: any = 'Y';
  public isDownloadForm: boolean = false;
  public pleaseSelect = {
    'Code': '',
    'Description_en': '-Select-'
  }
  constructor(
    private formStepperService: FormStepperService,
    private personalInformService: PersonalInformService,
    private spinner: NgxSpinnerService,
    private errorService: ErrorService,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private router: Router
  ) {






    this.AdditionDriversArray = [0];
    console.log(this.personalForm);
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 1);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.personalForm;
    this.policyInfo = this.buyPolicyDetails?.data;
    this.isAddon = this.buyPolicyDetails?.isAddon;
    this.isAddonData = this.buyPolicyDetails?.isAddonData;
    this.onCheckisAdditionalDriver();
    // this.TitleList.unshift(this.pleaseSelect);
    // this.occupationList.push(this.pleaseSelect);
    // this.wilayatList.push(this.pleaseSelect);
    // this.nationalityList.push(this.pleaseSelect);
    // this.cityList.push(this.pleaseSelect);
    // this.orangeCardList.push(this.pleaseSelect);
    // console.log(this.TitleList,this.occupationList);
  }
  ngOnInit(): void {
    this.onInitialFetchData();
    this.onChangeOccupation();
    this.onCheckisAdditionalDriver();

  }
  get formData() {
    return <FormArray>this.personalForm.get('driverdetails');
  }
  driverForm() {
    return (<FormArray>this.personalForm.get('driverdetails')).controls;
  }

  async onInitialFetchData() {
    this.occupationList = (await this.personalInformService.onGetOccupationList()) || [];
    this.nationalityList = (await this.personalInformService.onGetNationalityList()) || [];
    this.orangeCardList = (await this.personalInformService.onGetOrangeCardList()) || [];
    this.wilayatList = (await this.personalInformService.onGetWilayatList()) || [];
    this.TitleList = [
      { Code: '', Description_en: '-Select-' },
      { Code: '1', Description_en: 'Mr' },
      { Code: '2', Description_en: 'Ms' },
      { Code: '3', Description_en: 'M/s' },
    ];

  }
  ngAfterContentInit(): void {

  }


  async onNationalityChange(event: any) {
    this.cityList = (await this.personalInformService.onGetCityList(event)) || [];
  }

  get f() { return this.personalForm.controls; }



  onChangeOccupation() {
    let occupation = this.personalForm.controls['occupation'].value;
    const otherOccupation = this.personalForm.get('otherOccupation')!;
    if (occupation == 99999) {
      otherOccupation.setValidators([Validators.required]);
    } else {
      otherOccupation.setValidators(null);
    }
    otherOccupation.updateValueAndValidity();

  }
  onCheckisAdditionalDriver() {
    let isAdditionalDriver = this.personalForm.controls['isAdditionalDriver'].value;
    let driverArray = this.formData.controls;
    console.log(isAdditionalDriver)

    if (isAdditionalDriver == 'Y') {
      for (let index = 0; index < driverArray.length; index++) {
        const element: any = driverArray[index];
        const DriverName = element.get('DriverName')!;
        const LastName = element.get('LastName')!;
        DriverName.setValidators([Validators.required]);
        LastName.setValidators([Validators.required]);
        DriverName.updateValueAndValidity();
        LastName.updateValueAndValidity();
      }
    } else {
      for (let index = 0; index < driverArray.length; index++) {
        const element: any = driverArray[index];
        const DriverName = element.get('DriverName')!;
        const LastName = element.get('LastName')!;
        DriverName.setValidators(null);
        LastName.setValidators(null);
        DriverName.updateValueAndValidity();
        LastName.updateValueAndValidity();
      }

    }


  }

  onGenderChange(val:any){

    const Title = this.personalForm.get('Title')!;
    const gender = this.personalForm.get('gender')!;

     if(val == '1'){
       Title.setValue('1');
       gender.setValue('1');
     }
     if(val == '2'){
      Title.setValue('2');
      gender.setValue('2');
    }
  }


  onInsertPersonalDetails() {
    this.submitted = true;

    if (this.personalForm.valid) {
      console.log('valid')

      this.GetQuoteDetails = JSON.parse(sessionStorage.getItem('GetQuoteDetails') || '{}');
      let UrlLink = `${this.ApiUrl}quote/updateforpersonalinfoforb2c`;
      let firstDriver = {
        DriverDob: "",
        DriverId: this.GetQuoteDetails?.drivCivilCrNo,
        DriverName: this.personalForm.controls['firstName'].value,
        LastName: this.personalForm.controls['lastName'].value,
        LicenceClass: "",
        LicenceIssueDate: "",
        MiddleName: "",
        DriverGender: "",
      }
      let driverArray = [firstDriver, ...this.personalForm.value.driverdetails]
      let ReqObj = {
        QuoteNumber: this.policyInfo?.QuoteNo,
        Address1: this.personalForm.controls['address1'].value,
        Address2: this.personalForm.controls['address2'].value,
        City: this.personalForm.controls['City'].value,
        LastName: this.personalForm.controls['lastName'].value,
        FirstName: this.personalForm.controls['firstName'].value,
        PostalCode: '',
        PostBox: '',
        AdditionalDriver: this.isAdditionalDriver,
        Title: this.personalForm.controls['Title'].value,
        Nationality: this.personalForm.controls['Nationality'].value,
        PolicyStartDate: this.datePipe.transform(this.personalForm.controls['policyDate'].value, 'dd/MM/yyyy'),
        QuoteType: 'SQ',
        PlateCharId: this.GetQuoteDetailsResponse?.platecode,
        ChassisNo: this.GetQuoteDetailsResponse?.chassisnumber,
        PlateNo: this.GetQuoteDetailsResponse?.platenumber,
        EmiInstallmentYn: 'N',
        BrokerEmiInstallmentYn: 'N',
        CollectionBranchCode: this.personalForm.controls['orangeCard'].value,
        EmiDescription: '',
        FullPlateNo: '',
        CdGender: this.personalForm.controls['gender'].value,
        LicenceExpDate: '',
        DriverDetails: driverArray,
        Occupation: this.personalForm.controls['occupation'].value,
        MobileNo: this.personalForm.controls['whatsappNumber'].value,
        DOB: this.personalForm.controls['dateOfBirth'].value,
        OtherOccupation: this.personalForm.controls['otherOccupation'].value,
        Wilayat: this.personalForm.controls['wilayat'].value,
        PlateDetails: [],
      };
      console.log(ReqObj);
      this.personalInformService.onPostMethodSync(UrlLink, ReqObj).subscribe(
        async (data: any) => {
          console.log(data);
          if (data?.QuoteNo) {
            if (this.isDownloadForm) {
              this.onDownloadProposalForm(data);
              this.isDownloadForm = false;
            } else {
              await this.onMakePayment(data);

            }
          }
        },
        (err) => {
          this.handleError(err);
        }
      );
    }
    else {
      alert('Form is Invalid');
    }

  }
  onAddNewDriver() {
    this.AdditionDriversArray.push(this.AdditionDriversArray.length);
    console.log(this.AdditionDriversArray);
  }

  async onVeiwCoverage() {
    this.coverageDetails = await this.personalInformService.onGetCoveraDetails(this.policyInfo);
    const dialogRef = this.dialog.open(VeiwCoverDetailsComponent, {
      width: '100%',
      panelClass: 'full-screen-modal',
      data: { coverageDetails: this.coverageDetails, buyPolicyDetails: this.policyInfo },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      console.log(`Dialog result: ${result}`);
    });
  }



  async onDocument() {
    this.documentList = (await this.personalInformService.onGetDocumentList(this.policyInfo)) || {};
    this.upLoadedDocument = (await this.personalInformService.onGetUploadDocument(this.policyInfo)) || {};
    if(this.upLoadedDocument?.DocumentUploadDetails.length !=0){
      console.log(this.upLoadedDocument?.DocumentUploadDetails,this.documentList?.DocumentUploadDetails);
    let merge =[...this.upLoadedDocument?.DocumentUploadDetails,...this.documentList?.DocumentUploadDetails];
      this.documentList.DocumentUploadDetails = merge;
    }
    const dialogRef = this.dialog.open(UploadDocumentComponent, {
      width: '100%',
      panelClass: 'full-screen-modal',
      data: {policyInfo:this.policyInfo,documentList:this.documentList},
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      console.log(`Dialog result: ${result}`);
    });



  }





  onDownloadProposalForm(data: any) {
    let UrlLink = `${this.ApiUrl}pdf/proposalpdf`;
    let ReqObj = {
      "BranchCode": "01",
      "QuoteNo": data?.QuoteNo
    }
    return this.personalInformService.onPostMethodSync(UrlLink, ReqObj).subscribe(
      async (data: any) => {
        console.log(data);

        if(data.PdfOutFilePath != null){
          downloadBase64File(data,'ProposalForm')
        }else{
           alert("Form Not Availabel");
        }
      },
      (err) => {
        this.handleError(err);
      }
    );
  }



  async onMakePayment(res: any) {
    let createCode = `quoteNo=${res.QuoteNo}~~paymentType=visionPay~~productId=65~~brokertype=b2b`;
    let UrlLink = `${this.ApiUrl}hash/encrypt/${createCode}`;
    let ReqObj;
    console.log(UrlLink);
    let response = (await this.personalInformService.onPostMethodAsync(UrlLink, ReqObj))
      .toPromise()
      .then((res: any) => {
        console.log(res);
        let RedirectLink = `http://192.168.1.55:4040/URL2PAY/LoginvisionPay.do?e=${res?.key}`;
        window.location.href = RedirectLink;
        return res;
      })
      .catch((err) => { });

    return response;

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

function downloadBase64File(base64Data: any, fileName: string) {
  const linkSource = `${base64Data.PdfOutFilePath}`;
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.download = `${fileName}`;
  downloadLink.click();
}
