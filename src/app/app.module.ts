import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegistrationModalComponent } from './home/registration-modal/registration-modal.component';
import { HomeComponent } from './home/home.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {AppRoutingModule} from "./app-routing.module";
import {MatDialogModule} from "@angular/material/dialog";
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";
import { OrderModalComponent } from './home/order-modal/order-modal.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { InvoiceModalComponent } from './home/invoice-modal/invoice-modal.component';
import { PaymentModalComponent } from './home/payment-modal/payment-modal.component';
import { SettleAccountModalComponent } from './home/settle-account-modal/settle-account-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationModalComponent,
    HomeComponent,
    OrderModalComponent,
    InvoiceModalComponent,
    PaymentModalComponent,
    SettleAccountModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    RouterLinkActive,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    AppRoutingModule,
    MatDialogModule,
    HttpClientModule,
    NgxPaginationModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
