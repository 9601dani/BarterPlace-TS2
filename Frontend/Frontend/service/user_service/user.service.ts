import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RequestSeller} from "../../src/models/RequestSeller";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly APIUrl:string='http://localhost:8000/api';
  private pantalla: string = '';
  constructor(
    private HttpClient: HttpClient
  ) { }

  public setPantalla(pantalla: string){
    this.pantalla = pantalla;
  }

  public getPantalla(){
    return this.pantalla;
  }

  public sendRequestSeller(username:string){
    return this.HttpClient.post(`${this.APIUrl}/request/sellers`, {username, status: 'pending'});
  }

  public getRequestsSeller(){
    return this.HttpClient.get<RequestSeller[]>(`${this.APIUrl}/request/sellers`);
  }

  public findRequestSeller(username:string){
    return this.HttpClient.get(`${this.APIUrl}/request/sellers/${username}`);
  }

  public respondentRequestSeller(username:string, status:string){
    console.log(username);
    console.log(status);
    return this.HttpClient.put(`${this.APIUrl}/request/sellers/${username}`, {status});
  }
}
