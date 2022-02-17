import { GridsComponent } from './Modules/grids/grids.component';
import { GridsRoutingModule } from './Modules/grids/grids-routing.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './Core/Layout/home-layout/home-layout.component';
import { LoginLayoutComponent } from './Core/Layout/login-layout/login-layout.component';
import { ExistQuoteComponent } from './Modules/grids/Components/Quotes/exist-quote/exist-quote.component';

const routes: Routes = [
  { path: '', redirectTo: 'Motor', pathMatch: 'full' },
  {
    path: 'Motor',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'GetQuote',
        pathMatch: 'full',
      },
      {
        path: 'GetQuote',
        loadChildren: () =>
          import('./Modules/form-stepper/form-stepper.module').then(
            (n) => n.FormStepperModule
          ),
      },

      {
        path: 'Grid',
        loadChildren: () =>
          import('./Modules/grids/grids.module').then((n) => n.GridsModule),

      },
    ],
  },

  {
    path: 'Login',
    component: LoginLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
