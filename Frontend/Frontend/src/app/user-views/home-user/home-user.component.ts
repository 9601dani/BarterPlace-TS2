import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../../models/User";
import {UserService} from "../../../../service/user_service/user.service";

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit{
  public user!:User;
  constructor(
    private router: Router,
    private Service:UserService
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  ngOnInit(): void {
    this.validarSesion();
  }

  public cerrarSesion(){
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  public validarSesion(){
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user.username==null){
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
