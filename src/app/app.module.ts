import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './PanelAdministrativo/sidebar/sidebar.component';
import { HeaderComponent } from './PanelAdministrativo/header/header.component';
import { LoginComponent } from './Pageweb/login/login.component';
import { RegisterUserComponent } from './Pageweb/register-user/register-user.component';
import { PageWebComponent } from './Pageweb/page-web/page-web.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './PanelAdministrativo/home/home.component';
import { ZoneResidentComponent } from './PanelAdministrativo/zone-resident/zone-resident.component';
import { ReserveComponent } from './PanelAdministrativo/reserve/reserve.component';
import { ReserverAdminComponent } from './PanelAdministrativo/reserver-admin/reserver-admin.component';
import { UsersAdminComponent } from './PanelAdministrativo/users-admin/users-admin.component';
import { ZoneAdminComponent } from './PanelAdministrativo/zone-admin/zone-admin.component';
import { CategoryAdminComponent } from './PanelAdministrativo/category-admin/category-admin.component';
import { AccountComponent } from './PanelAdministrativo/account/account.component';
import { ProfileComponent } from './PanelAdministrativo/profile/profile.component';
import { HomeSadminComponent } from './PanelAdministrativo/home-sadmin/home-sadmin.component';
import { HomeAdminComponent } from './PanelAdministrativo/home-admin/home-admin.component';
import { AccountSadminComponent } from './PanelAdministrativo/account-sadmin/account-sadmin.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    LoginComponent,
    RegisterUserComponent,
    PageWebComponent,
    HomeComponent,
    ZoneResidentComponent,
    ReserveComponent,
    ReserverAdminComponent,
    UsersAdminComponent,
    ZoneAdminComponent,
    CategoryAdminComponent,
    AccountComponent,
    ProfileComponent,
    HomeSadminComponent,
    HomeAdminComponent,
    AccountSadminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
