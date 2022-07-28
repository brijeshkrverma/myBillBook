import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPartyComponent } from './public/add-party/add-party.component';
import { ContentComponent } from './public/content/content.component';
import { DashboardComponent } from './public/dashboard/dashboard.component';
import { LoginComponent } from './public/login/login.component';
import { PartiesComponent } from './public/parties/parties.component';
import {ItemsComponent} from './public/items/items.component';
import { RegisteredComponent } from './public/registered/registered.component';
import { PartyDetailComponent } from './public/party-detail/party-detail.component';
import { PartyDetailSideComponent } from './public/party-detail-side/party-detail-side.component';
import { CreateItemComponent } from './items/create-item/create-item.component';
import { PurchaseInvoicesComponent } from './purchases/purchase-invoices/purchase-invoices.component';
import {EditItemComponent} from './items/edit-item/edit-item.component';

const routes: Routes = [
  {path:'',redirectTo:'home', pathMatch:'full'},
  {path:'home',component:RegisteredComponent},
  {path:'login', component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'parties', component:PartiesComponent},
  {path:'partyies/:id',component:PartiesComponent},
  {path:'content',component:ContentComponent, outlet: "content"},
  {path:'add-party', component:AddPartyComponent},
  {path:'items',component:ItemsComponent},
  {path:'party-detail/:id',component:PartyDetailComponent},
  {path:'party-detail/partys/:id', component:PartyDetailComponent},
  {path:'add-item',component:CreateItemComponent},
  {path:'purchase-invoice/:id', component:PurchaseInvoicesComponent},
  {path:'edit-item/:id',component:EditItemComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
