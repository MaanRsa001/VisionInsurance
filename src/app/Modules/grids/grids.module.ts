import { GridsComponent } from './grids.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MaterialModule } from 'src/app/Shared/material/material.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DirectivesModule } from 'src/app/Shared/Directives/directives.module';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { IconsModule } from 'src/app/Shared/Icons/icons.module';
import { HttpInterceptorService } from 'src/app/HttpInterceptors/http-interceptor.service';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { CountdownModule } from 'ngx-countdown';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, ReCaptchaV3Service, RECAPTCHA_SETTINGS, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { GridsRoutingModule } from './grids-routing.module';
import { TablesModule } from 'src/app/Shared/Tables/tables.module';
import { ExpireQuoteComponent } from './Components/Quotes/expire-quote/expire-quote.component';
import { RejectedQuoteComponent } from './Components/Quotes/rejected-quote/rejected-quote.component';
import { ExistQuoteWqComponent } from './Components/Quotes/exist-quote-wq/exist-quote-wq.component';
import { ExistQuoteComponent } from './Components/Quotes/exist-quote/exist-quote.component';
import { GridNavbarComponent } from './Components/grid-navbar/grid-navbar.component';
import { ApprovedReferalComponent } from './Components/Referral/approved-referal/approved-referal.component';
import { RejectedReferalComponent } from './Components/Referral/rejected-referal/rejected-referal.component';
import { PendingReferalComponent } from './Components/Referral/pending-referal/pending-referal.component';
import { CustomerApprovedComponent } from './Components/Customer/customer-approved/customer-approved.component';
import { CustomerRejectedComponent } from './Components/Customer/customer-rejected/customer-rejected.component';
import { CustomerPendingComponent } from './Components/Customer/customer-pending/customer-pending.component';
import { CustomerRequoteComponent } from './Components/Customer/customer-requote/customer-requote.component';
import { ActivePolicyComponent } from './Components/Policy/active-policy/active-policy.component';
import { PendingPolicyComponent } from './Components/Policy/pending-policy/pending-policy.component';
import { CancelPolicyComponent } from './Components/Policy/cancel-policy/cancel-policy.component';

@NgModule({
  declarations: [
    GridsComponent,
    ExpireQuoteComponent,
    RejectedQuoteComponent,
    ExistQuoteWqComponent,
    ExistQuoteComponent,
    GridNavbarComponent,
    ApprovedReferalComponent,
    RejectedReferalComponent,
    PendingReferalComponent,
    CustomerApprovedComponent,
    CustomerRejectedComponent,
    CustomerPendingComponent,
    CustomerRequoteComponent,
    ActivePolicyComponent,
    PendingPolicyComponent,
    CancelPolicyComponent
  ],
  imports: [
    GridsRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgSelectModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    DirectivesModule,
    DigitOnlyModule,
    IconsModule,
    ToastNotificationsModule.forRoot({duration: 6000, type: 'primary',position:'top-right'}),
    CountdownModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    TablesModule
  ],

  providers: [
    ReCaptchaV3Service,
    HttpClientModule,DatePipe,
     { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
     BsDatepickerConfig,
     {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },

    ],
  bootstrap: [GridsComponent],
})
export class GridsModule {}
