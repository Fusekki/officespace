import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LegalCasesComponent } from './components/legalcases/legalcases.component';
import { LegalcaseDetailComponent } from './components/legalcase-detail/legalcase-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LegalcaseFilesComponent } from './components/legalcase-files/legalcase-files.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: LegalcaseDetailComponent },
  { path: 'legalcases', component: LegalCasesComponent },
  { path: 'files/:id', component: LegalcaseFilesComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
