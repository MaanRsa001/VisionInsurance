import { OtpComponent } from './../otp/otp.component';
import { FormGroup } from '@angular/forms';
import { ComparisonService } from './../../Services/comparison.service';
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorService } from 'src/app/Errors/error.service';
import Swal from 'sweetalert2';
import { FormStepperService } from '../../form-stepper.service';
import { AddonCoversComponent } from '../addon-covers/addon-covers.component';
import * as Mydatas from '../../../../app-config.json';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit, OnChanges {

  public SelectedCover: any;
  public addonCoverDetails: any[] = [];
  public premiumList: any[] = [];
  @Input('offenseInformation') offenseInformation: any;
  @Input('licenseInformation') licenseInformation: any;
  @Input('premiumDetails') premiumDetails: any;
  @Input('GetQuoteDetailsResponse') GetQuoteDetailsResponse: any;
  @Input('claimInfoLicense') claimInfoLicense: any;
  @Input('claimInfoChassis') claimInfoChassis: any;
  @Output('buyPolicyResponse') buyPolicyResponse = new EventEmitter();
  @Input('vehicleInfoForm') vehicleInfoForm!: FormGroup;




  public QuoteNumber: any = '';
  public PolicyTypeId:any='';
  public buyAddonCovers:boolean=false;
  public isExistOtp:boolean=false;


  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl: any = this.AppConfig.ApiUrl;
  public ApiUrl2: any = this.AppConfig.ApiUrl2;
  public ApiUrl3: any = this.AppConfig.ApiUrl3;
 public sumInsured:any;
  constructor(
    private dialog: MatDialog,
    private formStepperService: FormStepperService,
    private comparisonService:ComparisonService,
    private spinner: NgxSpinnerService,
    private errorService: ErrorService,

  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.offenseInformation;
    this.licenseInformation;
    this.claimInfoLicense;
    this.GetQuoteDetailsResponse;
    this.premiumList = this.premiumDetails?.PolicyTypes || [];
    this.sumInsured = this.vehicleInfoForm?.controls['sumInsured'].value;
  }


  openDialog(data: any) {
    const dialogRef = this.dialog.open(AddonCoversComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal',
      data: data

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addonCoverDetails = result;
        this.buyAddonCovers=true;
        this.onGetOtp(this.SelectedCover);
      }
    });
  }

  onGetOtp(item:any){
    if(this.isExistOtp == false){
      const dialogRef = this.dialog.open(OtpComponent, {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%',
        panelClass: 'full-screen-modal',
        data:this.premiumDetails
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
      });
      dialogRef.componentInstance.otpSuccess.subscribe((data:any)=>{
        if(data=="Success"){
          this.isExistOtp=true;
          if(this.buyAddonCovers){
            this.onAddonSubmit();

          }else{
            this.onSubmit(item);

          }
        }
      })
    }else{
      if(this.buyAddonCovers){
        this.onAddonSubmit();

      }else{
        this.onSubmit(item);

      }
    }

  }




  onSubmit(cover: any) {
    console.log(cover)
    let selectedCovers = '';
    for (let index = 0; index < cover?.BenefitsWithPremium.length; index++) {
      const element = cover?.BenefitsWithPremium[index];
      selectedCovers += element.OpCoverId + "~"
    }
    for (let index = 0; index < cover?.Benefits.length; index++) {
      const element = cover?.Benefits[index];
      selectedCovers += element.OpCoverId + "~"
    }
    console.log(selectedCovers);
    let UrlLink = `${this.ApiUrl}quote/buypolicy`;
    let ReqObj = {
      "RequestRefNo": this.premiumDetails.RequestReferenceNo,
      "PolicyTypeId": cover?.PolicyTypeId,
      "OpCoverSelected": selectedCovers,
      "mcdRefno": this.premiumDetails.mcdRefno,
      "quoteno": "",
      "Finalize_Yn": "N",
      "EmiInstallmentYn": "N",
      "UserType": "User",
      "SubUserType": "77777",
      "Admin_LoginId": ""
    }
    return this.formStepperService.onPostMethodSync(UrlLink, ReqObj).subscribe(
      (data: any) => {
        if (data) {
          console.log(data);
          this.buyPolicyResponse.emit({ isAddon: false, data: data });
        }
      },
      (err) => {
        this.handleError(err);
      }
    );
  }

  onCoversCalcu(event: any) {
    let UrlLink = `${this.ApiUrl}quote/calcextraAddonCover`;
    let ReqObj = {
      "quoteno": event?.QuoteNo,
      "UserType": "User",
      "SubUserType": "77777",
      "extraaddon": this.addonCoverDetails
    }
    console.log(ReqObj);
    return this.comparisonService.onPostMethodSync(UrlLink, ReqObj).subscribe(
      (data: any) => {
        if (data){
          this.onInsertCover(event);
          this.buyPolicyResponse.emit({ isAddon: true, data: event, isAddonData: data });
        }
      },
      (err) => {
        this.handleError(err);
      }
    );
  }

  onInsertCover(event: any) {
    let UrlLink = `${this.ApiUrl}quote/insextraAddonCover`;
    let ReqObj = {
      "quoteno": event?.QuoteNo,
      "UserType": "User",
      "SubUserType": "77777",
      "extraaddon": this.addonCoverDetails
    }
    console.log(ReqObj);
    return this.comparisonService.onPostMethodSync(UrlLink, ReqObj).subscribe(
      (data: any) => {
        if (data){
          console.log(data);
        }
      },
      (err) => {
        this.handleError(err);
      }
    );
  }

  async onGetAddon(cover: any) {
    this.SelectedCover = cover;
    ;
    let UrlLink = `${this.ApiUrl}quote/getOpcoverDetails`;
    let ReqObj = {
      "RequestRefNo": this.premiumDetails.RequestReferenceNo,
      "PolicyTypeId": cover?.PolicyTypeId
    }
    return this.comparisonService.onPostMethodSync(UrlLink, ReqObj).subscribe(
      async (data: any) => {
        if (data){
          console.log(data);
          if (this.QuoteNumber != '' && this.PolicyTypeId == cover?.PolicyTypeId ) {
            let AddonEditData = await this.onAddonEdit();
            let obj = {data:data,AddonEditData:AddonEditData}
            await this.openDialog(obj);

          }else{
            let obj = {data:data,AddonEditData:''}
             await this.openDialog(obj);
          }
        }
      },
      (err) => {
        this.handleError(err);
      }
    );
  }

  async onAddonEdit() {
    ;
    let UrlLink = `${this.ApiUrl}quote/editextraAddonCover`;
    let ReqObj = {
      "QuoteNo": this.QuoteNumber,
      "UserType": "User",
      "SubUserType": "77777"
    }
    let response = (
      await this.comparisonService.onPostMethodAsync(UrlLink, ReqObj)
    )
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        this.handleError(err);
      })
      .finally(() => { this.spinner.hide();});
    return response;
  }

  onAddonSubmit() {
    let cover = this.SelectedCover;
    let selectedCovers = '';
    for (let index = 0; index < cover?.BenefitsWithPremium.length; index++) {
      const element = cover?.BenefitsWithPremium[index];
      selectedCovers += element.OpCoverId + "~"
    }
    for (let index = 0; index < cover?.Benefits.length; index++) {
      const element = cover?.Benefits[index];
      selectedCovers += element.OpCoverId + "~"
    }
    console.log(selectedCovers);

    ;
    let UrlLink = `${this.ApiUrl}quote/buypolicy`;
    let ReqObj = {
      "RequestRefNo": this.premiumDetails.RequestReferenceNo,
      "PolicyTypeId": cover?.PolicyTypeId,
      "OpCoverSelected": selectedCovers,
      "mcdRefno": this.premiumDetails.mcdRefno,
      "quoteno": "",
      "Finalize_Yn": "N",
      "EmiInstallmentYn": "N",
      "UserType": "User",
      "SubUserType": "77777",
      "Admin_LoginId": ""
    }
    return this.comparisonService.onPostMethodSync(UrlLink, ReqObj).subscribe(
      (data: any) => {
        if (data){
          console.log(data);
          this.onCoversCalcu(data)
          this.QuoteNumber = data.QuoteNo;
          this.PolicyTypeId = cover?.PolicyTypeId
        }
      },
      (err) => {
        this.handleError(err);
      }
    );
  }

  CompanyWillContact() {
    Swal.fire(
      `Underwriter Will Contact You`,
      `Vision Insurance`,
      'info'
    )
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
