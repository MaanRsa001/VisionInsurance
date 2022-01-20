import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-stepper',
  templateUrl: './form-stepper.component.html',
  styleUrls: ['./form-stepper.component.css'],
})
export class FormStepperComponent implements OnInit {
  vehicleInfoForm!: FormGroup;
  comparisonForm!: FormGroup;
  personalForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.vehicleInfoForm = this._formBuilder.group({
      plateNo: ['', Validators.required],
    });
    this.comparisonForm = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.personalForm = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
}
