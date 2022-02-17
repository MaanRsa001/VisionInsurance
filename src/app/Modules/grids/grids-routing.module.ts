import { CancelPolicyComponent } from './Components/Policy/cancel-policy/cancel-policy.component';
import { PendingPolicyComponent } from './Components/Policy/pending-policy/pending-policy.component';
import { ActivePolicyComponent } from './Components/Policy/active-policy/active-policy.component';
import { CustomerRequoteComponent } from './Components/Customer/customer-requote/customer-requote.component';
import { CustomerPendingComponent } from './Components/Customer/customer-pending/customer-pending.component';
import { CustomerRejectedComponent } from './Components/Customer/customer-rejected/customer-rejected.component';
import { CustomerApprovedComponent } from './Components/Customer/customer-approved/customer-approved.component';
import { RejectedReferalComponent } from './Components/Referral/rejected-referal/rejected-referal.component';
import { ApprovedReferalComponent } from './Components/Referral/approved-referal/approved-referal.component';
import { GridsComponent } from './grids.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExistQuoteComponent } from './Components/Quotes/exist-quote/exist-quote.component';
import { ExistQuoteWqComponent } from './Components/Quotes/exist-quote-wq/exist-quote-wq.component';
import { ExpireQuoteComponent } from './Components/Quotes/expire-quote/expire-quote.component';
import { RejectedQuoteComponent } from './Components/Quotes/rejected-quote/rejected-quote.component';
import { PendingReferalComponent } from './Components/Referral/pending-referal/pending-referal.component';

const routes: Routes = [
  {
    path: '',
    component: GridsComponent,
  },
  {
    path: 'ExistQuote',
    component: ExistQuoteComponent,
  },
  {
    path: 'ExistQuoteWQ',
    component: ExistQuoteWqComponent,
  },
  {
    path: 'ExpireQuote',
    component: ExpireQuoteComponent,
  },
  {
    path: 'RejectedQuote',
    component: RejectedQuoteComponent,
  },
  {
    path: 'ReferralPending',
    component: PendingReferalComponent,
  },
  {
    path: 'ApprovedReferral',
    component: ApprovedReferalComponent,
  },
  {
    path: 'RejectedReferral',
    component: RejectedReferalComponent,
  },
  {
    path: 'CustomerApproved',
    component: CustomerApprovedComponent,
  },
  {
    path: 'CustomerRejected',
    component: CustomerRejectedComponent,
  },
  {
    path: 'CustomerPending',
    component: CustomerPendingComponent,
  },
  {
    path: 'CustomerRequote',
    component: CustomerRequoteComponent,
  },
  {
    path: 'ActivePolicy',
    component: ActivePolicyComponent,
  },
  {
    path: 'PendingPolicy',
    component: PendingPolicyComponent,
  },
  {
    path: 'CancelPolicy',
    component: CancelPolicyComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GridsRoutingModule {}
