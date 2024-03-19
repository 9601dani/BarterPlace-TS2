import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GuestViewComponent} from "./guest-view/guest-view.component";
import {HomeAdminComponent} from "./admin-views/home-admin/home-admin.component";
import {HomeUserComponent} from "./user-views/home-user/home-user.component";

const routes: Routes = [
  {
    path: '',
    component: GuestViewComponent
  },
  {
    path: 'admin',
    component: HomeAdminComponent
  },
  {
    path: 'user',
    component: HomeUserComponent

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
