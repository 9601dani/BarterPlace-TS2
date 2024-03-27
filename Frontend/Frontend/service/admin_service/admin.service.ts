import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../src/models/User";

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
    return this.HttpClient.get<User[]>(`${this.APIUrl}/admins`);
  }
  public eliminarAdmin(username: string){
    return this.HttpClient.delete(`${this.APIUrl}/admins/${username}`);
  }

  public updateUser(user: User){
    return this.HttpClient.put(`${this.APIUrl}/admins`, user);
  }
  public updateImage(user: User){
    return this.HttpClient.put(`${this.APIUrl}/admins/image`, user);
  }

  public addCategory(category_name: string){
    return this.HttpClient.post(`${this.APIUrl}/categories`,{category_name});
  }

  public getCategories(){
    return this.HttpClient.get(`${this.APIUrl}/categories`);
  }

  public findCategory(categoryName: string){
    return this.HttpClient.get(`${this.APIUrl}/categories/${categoryName}`);
  }
}
