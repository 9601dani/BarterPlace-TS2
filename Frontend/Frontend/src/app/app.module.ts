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
import { HomeUserComponent } from './user-views/home-user/home-user.component';
import { ManagementUserComponent } from './admin-views/management-user/management-user.component';
import { MyProfileComponent } from './admin-views/my-profile/my-profile.component';
import { CreateUserComponent } from './admin-views/create-user/create-user.component';
import { ReportUsersComponent } from './admin-views/report-users/report-users.component';
import { RequestPublishComponent } from './admin-views/request-publish/request-publish.component';
import {MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    GuestViewComponent,
    MainComponent,
    RegisterComponent,
    LoginComponent,
    HomeAdminComponent,
    HomeUserComponent,
    ManagementUserComponent,
    MyProfileComponent,
    CreateUserComponent,
    ReportUsersComponent,
    RequestPublishComponent
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
    MatGridListModule,
    MatTableModule,
    MatSelectModule,
  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
