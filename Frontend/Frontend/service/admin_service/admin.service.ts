import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../src/models/User";
import {PackMoney} from "../../src/models/PackMoney";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly APIUrl:string='http://localhost:8000/api';
  private pantalla: string = '';
  private _globalVariableLimitMinPublication: number = 10;


  constructor(
    private  HttpClient: HttpClient
  ) { }

  public getGlobalVariableLimitMinPublication(){
    return this._globalVariableLimitMinPublication;
  }

  public setGlobalVariableLimitMinPublication(limit: number){
    this._globalVariableLimitMinPublication = limit;
  }

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

  public getPackageMoney(){
    return this.HttpClient.get(`${this.APIUrl}/packmoney`);
  }

  public addPackageMoney(packmoney: PackMoney){
    return this.HttpClient.post(`${this.APIUrl}/packmoney`, packmoney);
  }

  public updatePackageMoney(packmoney: PackMoney){
    return this.HttpClient.put(`${this.APIUrl}/packmoney/${packmoney.id}`, packmoney);
  }

  public deletePackageMoney(id: number){
    return this.HttpClient.delete(`${this.APIUrl}/packmoney/${id}`);
  }

  public getPublicationsUser(username: string){
    return this.HttpClient.get(`${this.APIUrl}/publicationsUser/${username}`);
  }

}
