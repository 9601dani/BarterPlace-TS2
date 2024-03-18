import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../src/models/User";
@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private readonly APIUrl:string='http://localhost:8000/api';
  private pantalla: string = "main";
  constructor(private HttpClient:HttpClient) { }

  public getPantalla(){
    return this.pantalla;
  }

  public setPantalla(pantalla: string){
    this.pantalla = pantalla;
  }

  public saveUser(user:User){
    return this.HttpClient.post(this.APIUrl+'/users', user);
  }
  public getUser(username:string){
    return this.HttpClient.get(`${this.APIUrl}/users/${username}`);
  }
  public loginUser(username:string, password:string){
    return this.HttpClient.post(`${this.APIUrl}/auth`, {username, password});
  }

}
