import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './classes/in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';
import { LegalCaseItemComponent } from './components/legalcase-item/legalcase-item.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LegalCasesComponent } from './components/legalcases/legalcases.component';
import { MessageService } from './services/message.service';
import { LegalcaseService } from './services/legalcase.service';


@NgModule({
  declarations: [
    AppComponent,
    LegalCaseItemComponent,
    HeaderComponent,
    DashboardComponent,
    LegalCasesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
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
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [
    LegalcaseService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
