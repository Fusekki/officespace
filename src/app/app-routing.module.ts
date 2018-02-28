import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LegalCasesComponent } from './components/legalcases/legalcases.component';
import { LegalCaseItemComponent } from './components/legalcase-item/legalcase-item.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: LegalCaseItemComponent },
  { path: 'legalcases', component: LegalCasesComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
