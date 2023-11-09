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

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    LoginComponent,
    RegisterUserComponent,
    PageWebComponent,
    HomeComponent
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
