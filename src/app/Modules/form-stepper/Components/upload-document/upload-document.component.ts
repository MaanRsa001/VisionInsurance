import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorService } from 'src/app/Errors/error.service';
import { FormStepperService } from '../../form-stepper.service';
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { PersonalInformService } from '../../Services/personal-inform.service';
import * as Mydatas from '../../../../app-config.json';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {
  onRemove = new EventEmitter();
  public documentList: any = {};
  public upLoadedDocument: any = {};
  public dialogData: any;
  public policyInfo: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl: any = this.AppConfig.ApiUrl;
  public ApiUrl2: any = this.AppConfig.ApiUrl2;
  public ApiUrl3: any = this.AppConfig.ApiUrl3;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formStepperService: FormStepperService,
    private personalInformService: PersonalInformService,
    private spinner: NgxSpinnerService,
    private errorService: ErrorService,
    private toaster: Toaster

  ) {
    this.dialogData = this.data.documentList;
    this.policyInfo = this.data.policyInfo;
  }

  ngOnInit(): void {
  }



  onDeleteImg(event: any) {
    let UrlLink = `${this.ApiUrl2}document/deletedocdet`;
    let ReqObj = {
      "QuoteNo": this.dialogData.QuoteNo,
      "ProductId": "65",
      "DocumentUploadDetails": [
        {
          "FilePathName": event.FilePathName
        }
      ]
    }
    this.personalInformService.onDocPostMethodSync(UrlLink, ReqObj).subscribe(
      async (data: any) => {

        if(data.Response=="Deleted Successfully"){

         await this.onRefreshDocument();
          this.toaster.open({
            text: 'Deleted Successfully',
            caption: 'Documents',
            type: 'success',
          });
        console.log(data);

        }
      },
      (err) => {
        this.handleError(err);
      }
    );
  }

  async onRefreshDocument() {
    this.documentList = (await this.personalInformService.onGetDocumentList(this.policyInfo)) || {};
    this.upLoadedDocument = (await this.personalInformService.onGetUploadDocument(this.policyInfo)) || {};
    console.log(this.upLoadedDocument?.DocumentUploadDetails, this.documentList?.DocumentUploadDetails);
    if (this.upLoadedDocument?.DocumentUploadDetails.length != 0) {
      let merge = [...this.upLoadedDocument?.DocumentUploadDetails, ...this.documentList?.DocumentUploadDetails];
      this.dialogData.DocumentUploadDetails = merge;
    }else{
      this.dialogData=this.documentList;
    }
  }


  onUploadDocument(event: any, item: any) {
    console.log(event, item)

    let UrlLink = "document/uploadbase64"
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    var filename = event.target.files[0].name;
    let imageUrl: any;
    reader.onload = (event: any) => {
      imageUrl = event.target.result;
      this.onSetBackGroundImage(imageUrl, item);
      let ReqObj = {
        "files": imageUrl,
        "QuoteNo": this.dialogData?.QuoteNo,
        "ProductId": "65",
        "DocTypeId": item?.DocId,
        "Description": "",
        "FileName": filename,
        "Uploadtype": "POLICY",
        "DocId": item?.DocId
      }
      console.log(ReqObj)
      return this.formStepperService.onUploadDocument(UrlLink, ReqObj).subscribe(
        async (data: any) => {

          if (data) {
            console.log(data);
           await this.onRefreshDocument();
            this.showSuccess(data)
          }
        },
        (err) => {
          this.handleError(err);
        }
      );

    }
  }
  onSetBackGroundImage(imageUrl: any, item: any) {
    if (item) {
      let Id = this.dialogData.DocumentUploadDetails.findIndex((ele: any) => ele.DocId == item.DocId);
      this.dialogData.DocumentUploadDetails[Id].Base64url = imageUrl;
    }

  }

  onFileDropped(event: any, item: any) {
    console.log(event, item)
    let UrlLink = "document/uploadbase64"
    var reader = new FileReader();
    reader.readAsDataURL(event['0']);
    var filename = event['0'].name;
    let imageUrl: any;
    reader.onload = (event: any) => {
      imageUrl = event.target.result;
      this.onSetBackGroundImage(imageUrl, item);
      let ReqObj = {
        "files": imageUrl,
        "QuoteNo": item?.QuoteNo,
        "ProductId": "65",
        "DocTypeId": item?.DocId,
        "Description": "",
        "FileName": filename,
        "Uploadtype": "POLICY",
        "DocId": item?.DocId
      }
      console.log(ReqObj)
      return this.formStepperService.onUploadDocument(UrlLink, ReqObj).subscribe(
        (data: any) => {
          if (data) {
            console.log(data);
            this.showSuccess(data)
          }
        },
        (err) => {
          this.handleError(err);
        }
      );

    }
  }

  showSuccess(data: any) {
    if (data.Messeage == 'Inserted Successfully') {
      this.toaster.open({
        text: 'Uploaded Successfully',
        caption: 'Documents',
        type: 'success',
      });

    }
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
