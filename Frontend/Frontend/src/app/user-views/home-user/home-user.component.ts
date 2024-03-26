import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../../models/User";
import {UserService} from "../../../../service/user_service/user.service";
import {Bank} from "../../../models/Bank";
import Swal from "sweetalert2";

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit{
  public user!:User;
  public bank_user!:Bank;
  constructor(
    private router: Router,
    private Service:UserService
  ) {
    this.bank_user = JSON.parse(localStorage.getItem('bank') || '{}');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  ngOnInit(): void {
    this.validarSesion();
  }

  public cerrarSesion(){
    localStorage.removeItem('user');
    localStorage.removeItem('bank');
    this.router.navigate(['/']);
  }

  public validarSesion(){
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user.username==null){
      this.router.navigate(['/']);
    }
  }

  public changePantalla(pantalla: string){
    this.Service.setPantalla(pantalla);
  }

  public getPantalla(){
    return this.Service.getPantalla();
  }

  verificarSeller(){
    if(this.user.is_seller){
      this.Service.setPantalla('publish');
    }else{
      Swal.fire({
        title: 'Info!',
        text: 'No tienes permisos para publicar productos, ¿Quieres mandar una solicitud?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: `Si, Enviar`,
        cancelButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.Service.findRequestSeller(this.user.username).subscribe((data)=>{
            if(data==null){
              this.Service.sendRequestSeller(this.user.username).subscribe((data)=>{
                Swal.fire('Solicitud enviada', '', 'success');
              });
            }else{
              Swal.fire('Ya has enviado una solicitud, Se te notificara cuando este aprobada', '', 'info');
            }
          });
        }
      });
    }
  }


}
