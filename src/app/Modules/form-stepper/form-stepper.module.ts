import { ErrorService } from './../../Errors/error.service';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MaterialModule } from 'src/app/Shared/material/material.module';
import { FormStepperRoutingModule } from './form-stepper-routing.module';
import { FormStepperComponent } from './form-stepper.component';
import { VehicleInformComponent } from './Components/vehicle-inform/vehicle-inform.component';
import { ComparisonComponent } from './Components/comparison/comparison.component';
import { PersonalInformComponent } from './Components/personal-inform/personal-inform.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormStepperService } from './form-stepper.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GetQuoteComponent } from './Components/get-quote/get-quote.component';
import { AddonCoversComponent } from './Components/addon-covers/addon-covers.component';
import { VeiwCoverDetailsComponent } from './Components/veiw-cover-details/veiw-cover-details.component';
import { UploadDocumentComponent } from './Components/upload-document/upload-document.component';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DirectivesModule } from 'src/app/Shared/Directives/directives.module';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { IconsModule } from 'src/app/Shared/Icons/icons.module';
import { HttpInterceptorService } from 'src/app/HttpInterceptors/http-interceptor.service';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { OtpComponent } from './Components/otp/otp.component';
import { CountdownModule } from 'ngx-countdown';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, ReCaptchaV3Service, RECAPTCHA_SETTINGS, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';

const RECAPTCHA_V3_STACKBLITZ_KEY = '6LfXcnkeAAAAAJhgAw9BYiNl-HZXnzEaSDCRkiaB';
const RECAPTCHA_V2_DUMMY_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

@NgModule({
  declarations: [
    FormStepperComponent,
    VehicleInformComponent,
    ComparisonComponent,
    PersonalInformComponent,
    GetQuoteComponent,
    AddonCoversComponent,
    VeiwCoverDetailsComponent,
    UploadDocumentComponent,
    OtpComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FormStepperRoutingModule,
    NgSelectModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    DirectivesModule,
    DigitOnlyModule,
    IconsModule,
    ToastNotificationsModule.forRoot({duration: 6000, type: 'primary',position:'top-right'}),
    CountdownModule,
    RecaptchaModule,
    RecaptchaFormsModule
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
    // { provide: RECAPTCHA_V3_SITE_KEY, useValue: RECAPTCHA_V3_STACKBLITZ_KEY },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: RECAPTCHA_V3_STACKBLITZ_KEY,
      } as RecaptchaSettings,
    },
    ],
  bootstrap: [FormStepperComponent],
})
export class FormStepperModule {}
