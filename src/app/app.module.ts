import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox'


import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './classes/in-memory-data.service';

import { OrderModule } from 'ngx-order-pipe';

import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LegalCasesComponent } from './components/legalcases/legalcases.component';
import { ReportService } from './services/report.service';
import { LegalcaseService } from './services/legalcase.service';
import { LegalcaseDetailComponent } from './components/legalcase-detail/legalcase-detail.component';
import { LegalfilesComponent } from './components/legalfiles/legalfiles.component';
import { LegalfileService } from './services/legalfile.service';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectService } from './services/project.service';
// import { ProjectService } from './services/project.service';
import { UserService } from './services/user.service';
import { TeamService } from './services/team.service';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
import { ProjectDashboardComponent } from './components/project-dashboard/project-dashboard.component';
import { NaviComponent } from './components/navi/navi.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { WatercoolerComponent } from './components/watercooler/watercooler.component';
import { WatercoolerService } from './services/watercooler.service';
import { WcmessageService } from './services/wc-message.service';
import { WcmessageComponent } from './components/wc-message/wc-message.component';
import { ReportsComponent } from './components/reports/reports.component';
import { MessageBoardComponent } from './components/message-board/message-board.component';
import { MessageBoardService } from './services/message-board.service';
import { MbPostService } from './services/mb-post.service';
import { MbMessagesComponent } from './components/mb-messages/mb-messages.component';
import { MbMessageInputComponent } from './components/mb-message-input/mb-message-input.component';
import { MbHeaderComponent } from './components/mb-header/mb-header.component';
import { MbMessageWrapperComponent } from './components/mb-message-wrapper/mb-message-wrapper.component';
import { MbMessageDraftComponent } from './components/mb-message-draft/mb-message-draft.component';
import { MbDraftsComponent } from './components/mb-drafts/mb-drafts.component';
import { HomeComponent } from './components/home/home.component';
import { MbMessageEditComponent } from './components/mb-message-edit/mb-message-edit.component';
import { MbMessageThreadComponent } from './components/mb-message-thread/mb-message-thread.component';
import { MbMessageSubscribersComponent } from './components/mb-message-subscribers/mb-message-subscribers.component';
import { ToDosComponent } from './components/todos/todos.component';
import { ToDoService } from './services/todo.service';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    LegalCasesComponent,
    LegalcaseDetailComponent,
    LegalfilesComponent,
    ProjectsComponent,
    TeamDetailComponent,
    ProjectDashboardComponent,
    NaviComponent,
    WatercoolerComponent,
    WcmessageComponent,
    ReportsComponent,
    MessageBoardComponent,
    MbMessagesComponent,
    MbMessageInputComponent,
    MbHeaderComponent,
    MbMessageWrapperComponent,
    MbMessageDraftComponent,
    MbDraftsComponent,
    HomeComponent,
    MbMessageEditComponent,
    MbMessageThreadComponent,
    MbMessageSubscribersComponent,
    ToDosComponent,
    TodoInputComponent,
    TodosListComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    OrderModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatRadioModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    AppRoutingModule
  ],
  exports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OrderModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatTooltipModule,
    MatSelectModule,
    MatListModule
  ],
  providers: [
    LegalcaseService,
    LegalfileService,
    ReportService,
    ProjectService,
    // ProjectService,
    ToDoService,
    TeamService,
    UserService,
    WatercoolerService,
    WcmessageService,
    MessageBoardService,
    MbPostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
