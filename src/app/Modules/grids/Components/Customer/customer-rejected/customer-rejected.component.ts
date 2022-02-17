import { Component, OnInit } from '@angular/core';
import * as Mydatas from '../../../../../app-config.json';
import { QuotesService } from '../../../Services/quotes.service';

@Component({
  selector: 'app-customer-rejected',
  templateUrl: './customer-rejected.component.html',
  styleUrls: ['./customer-rejected.component.css']
})
export class CustomerRejectedComponent implements OnInit {


  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl: any = this.AppConfig.ApiUrl;
  public ApiUrl2: any = this.AppConfig.ApiUrl2;
  public ApiUrl3: any = this.AppConfig.ApiUrl3;
  public tableData:any;
  dtOptions: any = {};
  constructor(
    private quotesService:QuotesService
  ) {}

  ngOnInit(): void {
    this.onGetQuotesList();
  }

  onGetQuotesList(){
    let UrlLink =`${this.ApiUrl2}nonapproveddata`;
    let ReqObj ={
      "applicationid": "1",
      "loginid": "95222222",
      "branchcode": "31",
      "subusertype": "",
      "usertype": "User",
      "productid": "65"
      };
    this.quotesService.onPostMethodSync(UrlLink, ReqObj).subscribe(
      async (data: any) => {
        console.log(data);
        this.tableData=data || [];
      },
      (err) => {
      }
    );
  }
}