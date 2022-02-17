import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorService } from 'src/app/Errors/error.service';
import { FormStepperService } from '../../form-stepper.service';

@Component({
  selector: 'app-addon-covers',
  templateUrl: './addon-covers.component.html',
  styleUrls: ['./addon-covers.component.css'],
})
export class AddonCoversComponent implements OnInit {
  public coversDetails: any[] = [];
  public choosedCovers: any[] = [];

  public showIcon: any = {};
  public choosed: any = {};

  public addonDetails: any;
  public addonDetailsEdit: any;


  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formStepperService: FormStepperService,
    private spinner: NgxSpinnerService,
    private errorService: ErrorService,
    public dialogRef: MatDialogRef<AddonCoversComponent>,

  ) {
    this.coversDetails = [];
  }
  public SelectedDays: any = {};
  ngOnInit(): void {
    this.addonDetails = this.dialogData?.data;
    this.addonDetailsEdit = this.dialogData?.AddonEditData;

    this.onSetIconDefault();


  }

  onSetIconDefault() {
    for (let index = 0; index < this.addonDetails.length; index++) {
      const element = this.addonDetails[index];
      this.showIcon['plusAdd' + element.coverid] = false;
      if (element.is_selected == "Y") {
        this.showIcon['plusAdd' + element.coverid] = true;
        this.AddCovers(element);
        console.log(element.is_selected);
      }
      if (element?.splituplist) {
        for (let index = 0; index < element?.splituplist.length; index++) {
          const element1 = element.splituplist[index];
          if (index == 0) {
            console.log(element1.splitupid)
            this.choosed['spliId' + element?.coverid] = element1.splitupid;
          }
        }
      }
    }
    if (this.addonDetailsEdit && this.addonDetailsEdit != '') {
      console.log(this.addonDetailsEdit)
      this.onEditAddonCovers(this.addonDetailsEdit.extraaddon)
    }
  }

  onEditAddonCovers(extraaddon: any) {
    for (let index = 0; index < extraaddon.length; index++) {
      const element = extraaddon[index];
      console.log(element)
      this.AddCovers(element);
      this.showIcon['plusAdd' + element.coverid] = true;
      this.choosed['spliId' + element?.coverid] = element.splitupid;
    }
  }







  AddCovers(item: any) {

    let exist = this.choosedCovers.some((obj: any) => obj.coverid == item.coverid);
    let Index = this.choosedCovers.findIndex((obj: any) => obj.coverid == item.coverid);

    if (!exist) {
      let id = '';
      if (item.splituplist?.length == 0 || item.splitupid != "") {
        id = item.splitupid
      } else {
        id = this.choosed['spliId' + item?.coverid];
      }

      let obj = {
        ...item,
        splitupid: id
      }
      this.choosedCovers.push(obj);
    } else {
      let isSelected = this.addonDetails.find((ele: any) => ele.coverid == item?.coverid);
      console.log(isSelected);
      if (isSelected.is_selected == 'N') {
        this.choosedCovers.splice(Index, 1);
        this.showIcon['plusAdd' + item?.coverid] = false;
      }


    }

    for (let index = 0; index < this.choosedCovers.length; index++) {
      const element = this.choosedCovers[index];
      this.showIcon['plusAdd' + element?.coverid] = true;
    }

    console.log(this.choosedCovers);
  }

  onProccedToPremium() {
    let extraaddon = [];

    for (let index = 0; index < this.choosedCovers.length; index++) {
      const element = this.choosedCovers[index];
      let id = '';
      let obj = this.addonDetails.find((ele: any) => ele.coverid == element.coverid);
      if (obj && obj.splituplist?.length > 0) {
        id = this.choosed['spliId' + obj?.coverid];
      } else {
        id = obj.splitupid;
      }
      let Obj = {
        "covername": null,
        "shortcovername": null,
        "policytype": null,
        "coverid": element.coverid,
        "amount": null,
        "splitupid": id,
        "is_selected": null,
        "is_addon": null,
        "desccoverlist": null,
        "splituplist": null
      }
      extraaddon.push(Obj);
      if (index === this.choosedCovers.length - 1) {
        this.dialogRef.close(extraaddon);

      }
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
