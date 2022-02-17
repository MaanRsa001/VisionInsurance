import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularDatatableComponent } from './angular-datatable/angular-datatable.component';
import { AngularMattableComponent } from './angular-mattable/angular-mattable.component';
import { DataTablesModule } from 'angular-datatables';




@NgModule({
  declarations: [
    AngularDatatableComponent,
    AngularMattableComponent,

  ],
  imports: [
    CommonModule,
    DataTablesModule

  ],
  exports: [
    AngularDatatableComponent,
    AngularMattableComponent,

  ],
})
export class TablesModule { }
