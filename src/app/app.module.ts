import { ErrorService } from './Errors/error.service';
import { MaterialModule } from './Shared/material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginLayoutComponent } from './Core/Layout/login-layout/login-layout.component';
import { HomeLayoutComponent } from './Core/Layout/home-layout/home-layout.component';
import { NavbarComponent } from './Core/Body/navbar/navbar.component';
import { FooterComponent } from './Core/Body/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpInterceptorService } from './HttpInterceptors/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginLayoutComponent,
    HomeLayoutComponent,
    NavbarComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [
    HttpClientModule,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }]
  ,


  bootstrap: [AppComponent],
})
export class AppModule {}
