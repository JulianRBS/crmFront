import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CampaniaComponent } from './campania/campania.component';
import {ApiService} from "../services/api.service";
import {HttpClientModule} from "@angular/common/http";
import {UrlService} from "../services/url.service";
import { ContactoComponent } from './contacto/contacto.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CampaniaComponent,
    ContactoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiService,UrlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
