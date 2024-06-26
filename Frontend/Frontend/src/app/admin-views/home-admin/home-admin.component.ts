import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User";
import {Router} from "@angular/router";
import {AdminService} from "../../../../service/admin_service/admin.service";

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit{
  public user_admin!:User;
  constructor(
    private router: Router,
    private Service: AdminService
  ) {
    this.user_admin = JSON.parse(localStorage.getItem('user') || '{}');
  }

  ngOnInit(): void {
    this.validarSesion();
  }

  public cerrarSesion(){
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  public validarSesion(){
    if(this.user_admin.username==null){
      this.router.navigate(['/']);
    }
  }

  public changePantalla(pantalla: string){
    this.Service.setPantalla(pantalla);
  }

  public getPantalla(){
    return this.Service.getPantalla();
  }

}
