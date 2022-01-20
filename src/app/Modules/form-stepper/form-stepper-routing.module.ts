import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormStepperComponent } from './form-stepper.component';

const routes: Routes = [
  {
    path: '',
    component: FormStepperComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormStepperRoutingModule {}
