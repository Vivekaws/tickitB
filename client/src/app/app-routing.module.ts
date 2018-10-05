import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeatsComponent } from './seats/seats.component';
import { SuccessComponent } from './success/success.component';
import { FailureComponent } from './failure/failure.component';
import { PaymentComponent } from './payment/payment.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { paths } from './Strings/Strings';


const routes: Routes = [
  { path: "", redirectTo: "/" + paths.firstPagePath, pathMatch: "full" },
  { path: paths.firstPagePath, component: FirstPageComponent },
  { path: paths.seatPath, component: SeatsComponent },
  { path: paths.paymentPath, component: PaymentComponent },
  { path: paths.successPath, component: SuccessComponent },
  { path: paths.failurePath, component: FailureComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),


  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
export const components = [FirstPageComponent,
  SeatsComponent,
  PaymentComponent,
  SuccessComponent,
  FailureComponent
];
