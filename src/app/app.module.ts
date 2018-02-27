import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CaseItemComponent } from './components/case-item/case-item.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { CasesComponent } from './components/cases/cases.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CaseItemComponent,
    HeaderComponent,
    DashboardComponent,
    CasesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
