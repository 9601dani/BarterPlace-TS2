import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private pantalla: string = '';
  constructor() { }

  public setPantalla(pantalla: string){
    this.pantalla = pantalla;
  }

  public getPantalla(){
    return this.pantalla;
  }
}
