import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LegalCasesComponent } from './components/legalcases/legalcases.component';
import { LegalcaseDetailComponent } from './components/legalcase-detail/legalcase-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LegalfilesComponent } from './components/legalfiles/legalfiles.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
import { CompanyDashboardComponent } from './components/company-dashboard/company-dashboard.component';
import { WatercoolerComponent } from './components/watercooler/watercooler.component';
import { WcmessageComponent } from './components/wc-message/wc-message.component';
import { ReportsComponent } from './components/reports/reports.component';
import { MessageBoardComponent } from './components/message-board/message-board.component';
import { MbMessageInputComponent } from './components/mb-message-input/mb-message-input.component';
import { MbMessageWrapperComponent } from './components/mb-message-wrapper/mb-message-wrapper.component';
import { MbMessageDraftComponent } from './components/mb-message-draft/mb-message-draft.component';
import { MbDraftsComponent } from './components/mb-drafts/mb-drafts.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: ':id/projects', component: ProjectsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: LegalcaseDetailComponent },
  { path: 'legalcases', component: LegalCasesComponent },
  { path: 'people', component: LegalCasesComponent },
  { path: 'files/:id', component: LegalfilesComponent },
  { path: ':id/projects', component: ProjectsComponent },
  { path: 'teams/:id', component: TeamDetailComponent },
  { path: ':id/companies/:co', component: CompanyDashboardComponent },
  { path: ':id/companies/:co/watercoolers/:wa', component: WatercoolerComponent },
  { path: 'wcmessages/:id', component: WcmessageComponent },
  { path: 'reports/:id', component: ReportsComponent },
  { path: 'messageboards/:id', component: MessageBoardComponent },
  { path: 'messages/:id/new', component: MbMessageWrapperComponent },
  { path: 'messages/drafts/user/:id', component: MbDraftsComponent },
  { path: 'messages/drafts/:ab/:id', component: MbMessageDraftComponent }


  // { path: 'file/:id', component: LegalfileDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
