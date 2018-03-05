import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LegalCasesComponent } from './components/legalcases/legalcases.component';
import { LegalcaseDetailComponent } from './components/legalcase-detail/legalcase-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LegalfilesComponent } from './components/legalfiles/legalfiles.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
import { CompanyDashboardComponent } from './components/company-dashboard/company-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: LegalcaseDetailComponent },
  { path: 'legalcases', component: LegalCasesComponent },
  { path: 'people', component: LegalCasesComponent },
  { path: 'files/:id', component: LegalfilesComponent },
  { path: 'projects/:id', component: ProjectsComponent },
  { path: 'teams/:id', component: TeamDetailComponent },
  { path: 'companies/:id', component: CompanyDashboardComponent }
  // { path: 'file/:id', component: LegalfileDetailComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
