import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

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
    AppRoutingModule,
    HttpClientModule
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
