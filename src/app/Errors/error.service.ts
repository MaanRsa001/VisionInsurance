import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private loggedToken: BehaviorSubject<any> = new BehaviorSubject<any>('');


  constructor(
    private spinner:NgxSpinnerService
  ) { }

  showError(error:any, errorMessage:any) {
    console.log(error);
    this.spinner.hide();
    if (error.status == 401 || error.status == 400 || error.status == 500 || error.status == 501 || error.status == 503){
      Swal.fire(
        `ErrorCode:${errorMessage.ErrorCode}`,
        `${errorMessage.Message}`,
        'error'
      )
    }

     if(error.status == 0){
      Swal.fire(
        `Server Currently Down`,
        `${errorMessage.Message}`,
        'error'
      )
     }
  }

  showValidateError(data:any) {
    console.log(data);
    this.spinner.hide();
    let element = '';
    for (let i = 0; i < data.length; i++) {
      element += '<div class="my-1"><i class="far fa-dot-circle text-danger p-1"></i>' + data[i].Message + "</div>";
    }
    Swal.fire(
      '<h4 style="display:none">Please Fill Valid Value</h4>',
      `${element}`,
      'error',
    )
  }

  showLossErrorList(ErrorList:any){
    console.log(ErrorList);
    let ErrorsList = '';

    for (let i = 0; i < ErrorList.length; i++) {
      ErrorsList += '<div class="my-1 losserrorlist"><i class="fas fa-arrow-right mx-2"></i>' + ErrorList[i].Title + "</div>";
      for (let index = 0; index < ErrorList[i].Errors.length; index++) {
        const element = ErrorList[i].Errors[index];
        console.log(element);
          ErrorsList += '<div class="my-1 childerrorlist"><i class="fas fa-circle mx-2"></i>' + element.Message + "</div>";

      }
    }
    Swal.fire(
      '<h4 style="display:none">Please Fill Valid Value</h4>',
      `${ErrorsList}`,
      'error',
    )
  }
}
