import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RequestSeller} from "../../src/models/RequestSeller";
import {Publication} from "../../src/models/Publication";
import {Tarjet} from "../../src/models/Tarjet";
import {AccountBank} from "../../src/models/AccountBank";
import {RecordRecharge} from "../../src/models/RecordRecharge";
import {RecordBuyPack} from "../../src/models/RecordBuyPack";

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


  public getAllPublications(){
    return this.HttpClient.get<Publication[]>(`${this.APIUrl}/publications`);
  }

  public getAllPublicationsNoUser(username:string){
    return this.HttpClient.get<Publication[]>(`${this.APIUrl}/publicationsNotUser/${username}`);
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

  public updatePublication(publicacion:Publication){
    return this.HttpClient.put(`${this.APIUrl}/publications/${publicacion.id}`, publicacion);
  }

  public updateAplicationCurrency (username:string,aplication_currency:number){
    return this.HttpClient.put(`${this.APIUrl}/bankApliCurrency/${username}`, {aplication_currency});
  }

  public addTarjet(tarjet:Tarjet){
    return this.HttpClient.post(`${this.APIUrl}/tarjet`, tarjet);
  }

  public getTarjets(username:string){
    return this.HttpClient.get(`${this.APIUrl}/tarjet/${username}`);
  }

  public updateTarjet(tarjet:Tarjet){
    return this.HttpClient.put(`${this.APIUrl}/tarjet/${tarjet.id}`, tarjet);
  }

  public deleteTarjet(id:number){
    return this.HttpClient.delete(`${this.APIUrl}/tarjet/${id}`);
  }

  public getMyAccountBank(username:string){
    return this.HttpClient.get(`${this.APIUrl}/account_bank/${username}`);
  }

  public addAccountBank(account:AccountBank){
    return this.HttpClient.post(`${this.APIUrl}/account_bank`, account);
  }

  public updateAccountBank(account:AccountBank){
    return this.HttpClient.put(`${this.APIUrl}/account_bank/${account.id}`, account);
  }

  public deleteAccountBank(id:number){
    return this.HttpClient.delete(`${this.APIUrl}/account_bank/${id}`);
  }

  public addRecordRecharge(recordRecharge:RecordRecharge){
    return this.HttpClient.post(`${this.APIUrl}/record_recharge`, recordRecharge);
  }

  public getMyRecordRecharge(username:string){
    return this.HttpClient.get(`${this.APIUrl}/record_recharge/${username}`);
  }

  public addRecordPackMoney(recordPackMoney:RecordBuyPack){
    return this.HttpClient.post(`${this.APIUrl}/record_buy_pack`, recordPackMoney);
  }

  public getMyRecordPackMoney(username:string){
    return this.HttpClient.get(`${this.APIUrl}/record_buy_pack/${username}`);
  }
}
