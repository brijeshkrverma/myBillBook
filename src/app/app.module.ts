import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { RegisteredComponent } from './public/registered/registered.component';
import { DashboardComponent } from './public/dashboard/dashboard.component';
import { SidenavComponent } from './public/sidenav/sidenav.component';
import { ContentComponent } from './public/content/content.component';
import { PartiesComponent } from './public/parties/parties.component';
import { AddPartyComponent } from './public/add-party/add-party.component';
import { ItemsComponent } from './public/items/items.component';
import {LoginComponent} from './public/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PartyDetailComponent } from './public/party-detail/party-detail.component';
import { PartyDetailSideComponent } from './public/party-detail-side/party-detail-side.component';
import { CreateItemComponent } from './items/create-item/create-item.component';
import { PurchaseInvoicesComponent } from './purchases/purchase-invoices/purchase-invoices.component';
import { ItemDialogComponent } from './public/item-dialog/item-dialog.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EditItemComponent } from './items/edit-item/edit-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisteredComponent,
    DashboardComponent,
    SidenavComponent,
    ContentComponent,
    PartiesComponent,
    AddPartyComponent,
    ItemsComponent,
    PartyDetailComponent,
    PartyDetailSideComponent,
    CreateItemComponent,
    PurchaseInvoicesComponent,
    ItemDialogComponent,
    EditItemComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
