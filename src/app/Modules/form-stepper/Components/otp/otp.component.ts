import { ComparisonService } from './../../Services/comparison.service';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import * as Mydatas from '../../../../app-config.json';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtpComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl: any = this.AppConfig.ApiUrl;
  public ApiUrl2: any = this.AppConfig.ApiUrl2;
  public ApiUrl3: any = this.AppConfig.ApiUrl3;
  public otpDetails:any;
  public GetQuoteDetails: any;
  public otpForm!:FormGroup
  otpSuccess = new EventEmitter();
  config: CountdownConfig = {
    leftTime: 60 * 1,
    formatDate: ({ date }) => `${date / 1000}`,
  };
  public count: boolean = true;
  @ViewChild('cd', { static: false })
  private countdown!: CountdownComponent;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private comparisonService: ComparisonService,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<OtpComponent>

  ) {}

  ngOnInit(): void {
    this.onCreateFormControl();
    this.onGetOpt();
  }

  onEvent($event: any): void {
    if ($event.left == 0) {
      this.count = false;
    } else {
      this.count = true;
    }
  }

  onCreateFormControl(){
    this.otpForm = this._formBuilder.group({
      otp: ['', Validators.required],
    });
  }

  onSendOtp() {
    this.countdown.restart();
  }

  async onGetOpt() {
    let response =
      (await this.comparisonService.onGetOpt(this.dialogData)) || {};
      this.otpDetails = response;
    let arr = [
      `${this.ApiUrl2}sms/send`,
      `${this.ApiUrl2}mail/send`,
      `${this.ApiUrl2}whatsApp/send`,
    ];
    console.log(response);

    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      this.comparisonService.onSendOtp(response, this.dialogData, element);
    }
  }

  onVerifyOtp() {
    this.GetQuoteDetails = JSON.parse(
      sessionStorage.getItem('GetQuoteDetails') || '{}'
    );
    let ReqObj = {
      ProductId: '65',
      Otp: this.otpForm.controls['otp'].value,
      RequestReferenceNo: this.dialogData.RequestReferenceNo,
      MobileNo: this.GetQuoteDetails.MobileNo,
      OtpId: this.otpDetails.OtpId,
    };
    let UrlLink=`${this.ApiUrl2}notification/validateotp`;
    this.comparisonService.onOtpPostMethodSync(UrlLink, ReqObj).subscribe(
      (data: any) => {
        if (data) {
          if(data?.OTPValidationStatus== "Success"){
            this.dialogRef.close();
              this.otpSuccess.emit("Success")
          }
        }
      },
      (err) => {}
    );
  }
}
