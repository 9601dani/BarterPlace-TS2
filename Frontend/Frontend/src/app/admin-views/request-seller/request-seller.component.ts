import {Component, OnInit} from '@angular/core';
import {RequestSeller} from "../../../models/RequestSeller";
import {UserService} from "../../../../service/user_service/user.service";
import {GuestService} from "../../../../service/guest_service/guest.service";
import {User} from "../../../models/User";
import Swal from "sweetalert2";

@Component({
  selector: 'app-request-seller',
  templateUrl: './request-seller.component.html',
  styleUrls: ['./request-seller.component.css']
})
export class RequestSellerComponent implements OnInit {
  public array_request_seller: RequestSeller[] = [];
  public users:User[] = [];
    constructor(
      private Service:UserService,
      private ServiceGuest:GuestService
    ) { }

    ngOnInit(): void {
      this.getRequestSeller();
    }

    public getUser(username:string){
      this.ServiceGuest.getUser(username).subscribe(
        (data) => {
          //paso la data a una variable nueva usuario
          let usuario:User = JSON.parse(JSON.stringify(data));
          //agrego el usuario a la lista de usuarios
          this.users.push(usuario);
        });
    }

    getRequestSeller(){
      this.Service.getRequestsSeller().subscribe(
        (data) => {
          if(data.length>0){
            this.array_request_seller = data;
            for(let i = 0; i < this.array_request_seller.length; i++){
              this.getUser(this.array_request_seller[i].username);
            }
          }
        }
      );
    }

    public cuestionOfAccepted(username:string){
      Swal.fire({
        title: 'Info!',
        text: 'Acepta o rechaza la solicitud de: '+username+'?',
        icon: 'info',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Aceptar`,
        denyButtonText: `Rechazar`,
        cancelButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.Service.respondentRequestSeller(username, 'accepted').subscribe(
            (data) => {
              Swal.fire('Solicitud aceptada', '', 'success').then((result) => {
                window.location.reload();
              });
              this.getRequestSeller();
            });
        }else if (result.isDenied) {
          this.Service.respondentRequestSeller(username, 'rejected').subscribe(
            (data) => {
              Swal.fire('Solicitud rechazada', '', 'success').then((result) => {
                window.location.reload();
              });
              this.getRequestSeller();
            });
        }
      });
    }

  protected readonly User = User;
}
