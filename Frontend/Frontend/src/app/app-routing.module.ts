import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GuestViewComponent} from "./guest-view/guest-view.component";
import {HomeAdminComponent} from "./admin-views/home-admin/home-admin.component";

const routes: Routes = [
  {
    path: '',
    component: GuestViewComponent
  },
  {
    path: 'admin',
    component: HomeAdminComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
