import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GuestViewComponent} from "./guest-view/guest-view.component";

const routes: Routes = [
  {
    path: '',
    component: GuestViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
