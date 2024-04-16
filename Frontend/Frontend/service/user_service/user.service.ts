import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RequestSeller} from "../../src/models/RequestSeller";
import {Publication} from "../../src/models/Publication";
import {Tarjet} from "../../src/models/Tarjet";
import {AccountBank} from "../../src/models/AccountBank";
import {RecordRecharge} from "../../src/models/RecordRecharge";
import {RecordBuyPack} from "../../src/models/RecordBuyPack";
import {PublicationCopy} from "../../src/models/PublicationCopy";
import {ReportPublication} from "../../src/models/ReportPublication";
import {Chat} from "../../src/models/Chat";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly APIUrl:string='http://localhost:8000/api';
  private pantalla: string = '';
  private current_aplication_money: number = 0;
  constructor(
    private HttpClient: HttpClient
  ) { }

  public setPantalla(pantalla: string){
    this.pantalla = pantalla;
  }

  public getPantalla(){
    return this.pantalla;
  }

  public setCurrentAplicationMoney(current_aplication_money: number){
    this.current_aplication_money = current_aplication_money;
  }

  public getCurrentAplicationMoney(){
    return this.current_aplication_money;
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

  getNumberPublicationsUser(username:string){
    return this.HttpClient.get(`${this.APIUrl}/publicationsUser/${username}`);
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

  /*FROM SELL*/

  public comprarProducto(publicacion_a_vender: PublicationCopy){
    console.log('El producto a vender es: ', publicacion_a_vender);
    return this.HttpClient.post(`${this.APIUrl}/sellPublication`, publicacion_a_vender);
  }

  public venderProducto(publicacion_vendida: Publication){
    return this.HttpClient.post(`${this.APIUrl}/sellPublication`, publicacion_vendida);
  }

  getPublicationsBuyed(username:string){
    return this.HttpClient.get<PublicationCopy[]>(`${this.APIUrl}/publicationsBuyed/${username}`);
  }

  reportPublication(report:ReportPublication){
    return this.HttpClient.post(`${this.APIUrl}/reportPublication`, report);
  }

  getInfoPublicBloked(id_publication:number){
    return this.HttpClient.get(`${this.APIUrl}/publicationsInfoBlock/${id_publication}`);
  }

  getChatUser(username:string){
    return this.HttpClient.get(`${this.APIUrl}/chats/${username}`);
  }

  saveNewChat(chat:Chat){
    return this.HttpClient.post(`${this.APIUrl}/chats`, chat);
  }

  getChatMessages(id_chat:number){
    return this.HttpClient.get(`${this.APIUrl}/messages/${id_chat}`);
  }

  saveNewMessage(message:any){
    return this.HttpClient.post(`${this.APIUrl}/messages`, message);
  }

  verificarChat(username_sender:string, username_receiver:string){
    return this.HttpClient.post(`${this.APIUrl}/chatsS`, {username_sender, username_receiver});
  }

  transferir(username_sender:string, username_receiver:string, amount:number,date:string){
    return this.HttpClient.post(`${this.APIUrl}/transfer`, {username_sender, username_receiver, amount,date });
  }

  getHistoryTranfer(username:string){
    return this.HttpClient.get(`${this.APIUrl}/transfer/${username}`);
  }

  getHistoryTranfer2(username:string){
    return this.HttpClient.get(`${this.APIUrl}/transferS/${username}`);
  }
}
