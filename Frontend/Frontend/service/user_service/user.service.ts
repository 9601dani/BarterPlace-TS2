import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RequestSeller} from "../../src/models/RequestSeller";
import {Publication} from "../../src/models/Publication";

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
    return this.HttpClient.put(`${this.APIUrl}/request/sellers/${username}`, {status});
  }

  public getPublicationsType(){
    return this.HttpClient.get(`${this.APIUrl}/publications/types`);
  }

  public addPublication(publicacion:Publication){
    return this.HttpClient.post(`${this.APIUrl}/publications`, publicacion);
  }

  public getMyPublications(username:string){
    return this.HttpClient.get(`${this.APIUrl}/publications/${username}`);
  }

  public getPublicationsPending(){
    return this.HttpClient.get<Publication[]>(`${this.APIUrl}/publicationsP`);
  }

  public updateStatusPublication(id:number, status:string){
    return this.HttpClient.put(`${this.APIUrl}/publicationsS/${id}`, {status});
  }

  public reenviarPublication(id:number){
    return this.HttpClient.put(`${this.APIUrl}/publicationsReSend/${id}`, {});
  }
}
