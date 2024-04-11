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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import { PublishComponent } from './user-views/publish/publish.component';
import { StoreComponent } from './user-views/store/store.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { RequestSellerComponent } from './admin-views/request-seller/request-seller.component';
import { CategoryAddComponent } from './admin-views/category-add/category-add.component';
import { CollectMoneyComponent } from './user-views/collect-money/collect-money.component';
import {MatRadioModule} from "@angular/material/radio";
import { PackageMoneyAddComponent } from './admin-views/package-money-add/package-money-add.component';
import { RecordsPayComponent } from './user-views/records-pay/records-pay.component';
import {MatSortModule} from "@angular/material/sort";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { RecordsBuyedComponent } from './user-views/records-buyed/records-buyed.component';
import { ReportPublishComponent } from './admin-views/report-publish/report-publish.component';
import { ChatFrontendComponent } from './user-views/chat-frontend/chat-frontend.component';

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
    RequestPublishComponent,
    PublishComponent,
    StoreComponent,
    RequestSellerComponent,
    CategoryAddComponent,
    CollectMoneyComponent,
    PackageMoneyAddComponent,
    RecordsPayComponent,
    RecordsBuyedComponent,
    ReportPublishComponent,
    ChatFrontendComponent
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
        MatTooltipModule,
        FormsModule,
        MatRadioModule,
        MatSortModule,
        MatDividerModule,
        MatButtonToggleModule,
    ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
