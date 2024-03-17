import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TestService {
private readonly APIUrl:string='http://localhost:8000/api';
  constructor(private HttpClient:HttpClient) { }

  public getTest(){
    console.log("I stay here, service!")
    return this.HttpClient.get(this.APIUrl+'/test');
  }
}
