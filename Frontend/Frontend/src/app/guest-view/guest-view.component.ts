import {Component, OnInit} from '@angular/core';
import {GuestService} from "../../../service/guest_service/guest.service";

@Component({
  selector: 'app-guest-view',
  templateUrl: './guest-view.component.html',
  styleUrls: ['./guest-view.component.css']
})
export class GuestViewComponent implements OnInit{
  constructor(private GuestService:GuestService) {}

  ngOnInit(): void {}

  getPantalla(){
    return this.GuestService.getPantalla();
  }
  
  changePantalla(pantalla: string){
    this.GuestService.setPantalla(pantalla);
  }



}
