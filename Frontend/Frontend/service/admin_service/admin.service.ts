import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly APIUrl:string='http://localhost:8000/api';
  private pantalla: string = '';

  constructor(
    private  HttpClient: HttpClient
  ) { }

  public getPantalla(){
    return this.pantalla;
  }

  public setPantalla(pantalla: string){
    this.pantalla = pantalla;
  }

  public obtenerAdmins(){
    return this.HttpClient.get(`${this.APIUrl}/admins`);

  }
}
