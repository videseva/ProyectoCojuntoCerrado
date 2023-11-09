import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageWebComponent } from './Pageweb/page-web/page-web.component';
import { LoginComponent } from './Pageweb/login/login.component';
import { RegisterUserComponent } from './Pageweb/register-user/register-user.component';
import { HeaderComponent } from './PanelAdministrativo/header/header.component';
import { HomeComponent } from './PanelAdministrativo/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // PagesWeb
  { path: 'pageWeb/pagewebHome', component: PageWebComponent },
  { path: 'pageWeb/login', component: LoginComponent },
  { path: 'pageWeb/registrarUser', component: RegisterUserComponent },
  //PanelAdministrativo
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
