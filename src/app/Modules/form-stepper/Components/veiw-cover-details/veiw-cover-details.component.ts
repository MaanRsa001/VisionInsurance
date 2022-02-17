import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorService } from 'src/app/Errors/error.service';
import { FormStepperService } from '../../form-stepper.service';

@Component({
  selector: 'app-veiw-cover-details',
  templateUrl: './veiw-cover-details.component.html',
  styleUrls: ['./veiw-cover-details.component.css']
})
export class VeiwCoverDetailsComponent implements OnInit {
  public coverageDetails:any;
  public buyPolicyDetails:any;
  constructor(
    private formStepperService:FormStepperService,
    private spinner:NgxSpinnerService,
    private errorService:ErrorService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) { }

  ngOnInit(): void {
    this.coverageDetails = this.dialogData.coverageDetails;
    this.buyPolicyDetails = this.dialogData.buyPolicyDetails;
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
