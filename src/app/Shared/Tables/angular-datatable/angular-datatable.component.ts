import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
declare var $: any;
declare var jquery: any;
@Component({
  selector: 'app-angular-datatable',
  templateUrl: './angular-datatable.component.html',
  styleUrls: ['./angular-datatable.component.css'],
})
export class AngularDatatableComponent implements OnInit, OnChanges {
  @Input('tableData') tableData: any;
  dtOptions: any = {};
  constructor() {}

  ngOnInit(): void {
    this.onLoadDataTable(this.tableData);

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onLoadDataTable(this.tableData);
  }

  onLoadDataTable(data:any) {
    this.dtOptions = {
      data: data,
      columns: [
        {
          title: 'Quote No',
          data: 'quote_no',
        },
        {
          title: 'Customer Name',
          data: 'customer_name',
        },
        {
          title: 'Reference No',
          data: 'reference_no',
        },
        {
          title: 'VehicleType',
          data: 'vehicletype',
        },
        {
          title: 'Quote Date',
          data: 'quotation_date',
        },
      ],
      language: {
        lengthMenu: '_MENU_ bản ghi trên trang',
        search: '<i class="fa fa-search"></i>',
        searchPlaceholder: 'search',
        paginate: {
          first: '<i class="bx bx-chevrons-left"></i>',
          last: '<i class="bx bx-chevrons-right"></i>',
          previous: '<i class="bx bx-chevron-left"></i>',
          next: '<i class="bx bx-chevron-right"></i>',
        },
      },
      pagingType: 'full_numbers',
      pageLength: 5,
      searching: true,
      lengthChange: false,
      responsive: true,
    };
  }
}
