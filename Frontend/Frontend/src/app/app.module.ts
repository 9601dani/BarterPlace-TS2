import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule} from "@angular/material/slide-toggle";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {TestService} from "../../service/test_service/test.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatInputModule} from "@angular/material/input";
import { GuestViewComponent } from './guest-view/guest-view.component';
import { MainComponent } from './guest-view/views-guest/main/main.component';
import { RegisterComponent } from './guest-view/views-guest/register/register.component';
import { LoginComponent } from './guest-view/views-guest/login/login.component';
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatGridListModule} from "@angular/material/grid-list";
import { HomeAdminComponent } from './admin-views/home-admin/home-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    GuestViewComponent,
    MainComponent,
    RegisterComponent,
    LoginComponent,
    HomeAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatGridListModule
  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
