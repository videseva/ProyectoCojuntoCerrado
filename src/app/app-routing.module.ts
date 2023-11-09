import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageWebComponent } from './Pageweb/page-web/page-web.component';
import { LoginComponent } from './Pageweb/login/login.component';
import { RegisterUserComponent } from './Pageweb/register-user/register-user.component';
import { HeaderComponent } from './PanelAdministrativo/header/header.component';
import { HomeComponent } from './PanelAdministrativo/home/home.component';
import { ReserveComponent } from './PanelAdministrativo/reserve/reserve.component';
import { ZoneResidentComponent } from './PanelAdministrativo/zone-resident/zone-resident.component';
import { ReserverAdminComponent } from './PanelAdministrativo/reserver-admin/reserver-admin.component';
import { UsersAdminComponent } from './PanelAdministrativo/users-admin/users-admin.component';
import { ZoneAdminComponent } from './PanelAdministrativo/zone-admin/zone-admin.component';
import { CategoryAdminComponent } from './PanelAdministrativo/category-admin/category-admin.component';
import { AccountComponent } from './PanelAdministrativo/account/account.component';
import { ProfileComponent } from './PanelAdministrativo/profile/profile.component';
import { AccountSadminComponent } from './PanelAdministrativo/account-sadmin/account-sadmin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // PagesWeb
  { path: 'pageWeb/pagewebHome', component: PageWebComponent },
  { path: 'pageWeb/login', component: LoginComponent },
  { path: 'pageWeb/registrarUser', component: RegisterUserComponent },
  //PanelAdministrativo
  { path: 'home', component: HomeComponent },
  { path: 'reserve', component: ReserveComponent },
  { path: 'zoneResident', component: ZoneResidentComponent },
  { path: 'reserverAdmin', component: ReserverAdminComponent},
  { path: 'usersAdmin', component:UsersAdminComponent},
  { path: 'zoneAdmin', component:ZoneAdminComponent},
  { path: 'category-admin', component: CategoryAdminComponent},
  { path: 'account', component:AccountComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'homeSadmin', component: HomeComponent},
  { path: 'accountSadmin', component: AccountSadminComponent},
  { path: 'homeAdmin', component: HomeComponent},

  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
