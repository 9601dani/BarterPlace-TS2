import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../service/user_service/user.service";
import {AdminService} from "../../../../service/admin_service/admin.service";
import {Category} from "../../../models/Category";
import {Publication} from "../../../models/Publication";
import Swal from "sweetalert2";
import {User} from "../../../models/User";
import {Bank} from "../../../models/Bank";
import {PublicationCopy} from "../../../models/PublicationCopy";
import {GuestService} from "../../../../service/guest_service/guest.service";
import {ReportPublication} from "../../../models/ReportPublication";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  public publications:Publication[] = [];
  public publication_aux:Publication[] = [];
  public categories:Category[] = [];
  categorie_selected: string = '';
  public name_find: string = '';
  user!:User;
  bank!:Bank;
  constructor(
    private Service: UserService,
    private ServiceAdmin: AdminService,
    private ServiceGuest: GuestService
  ) { }

  ngOnInit(): void {
    this.getAllPublications();
    this.getCategories();
  }

  getAllPublications(){
   this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.Service.getAllPublicationsNoUser(this.user.username).subscribe((data: Publication[]) => {
      if(data.length > 0){
        this.publications = data;
        this.publication_aux = data;
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No hay publicaciones disponibles'
        });
      }
    });
  }

  getCategories(){
    this.ServiceAdmin.getCategories().subscribe((data: any) => {
      if(data.length > 0){
        this.categories = data;
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No hay categorias disponibles'
        });
      }
    });
  }

  findAll(){
    this.getAllPublications();
    this.name_find = '';
    this.categorie_selected = '';
  }

  findCategory(){
    this.name_find = '';
    if(this.categorie_selected === ''){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Selecciona una categoria'
      });
    }else{
      this.publications = this.publication_aux.filter((publication: Publication) => publication.category === this.categorie_selected);
    }
  }

  findName(){
    this.categorie_selected = '';
    if(this.name_find === ''){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingresa un nombre'
      });
    }else{
      this.publications = this.publication_aux.filter((publication: Publication) => publication.title.includes(this.name_find));
    }
  }

  getAllMyPublications(){
    this.publications = this.publication_aux;
  }

  getPublicVentas(){
    let publications_aux=this.publication_aux.filter(publication => publication.publication_type_id == 1);
    if(publications_aux!=null){
      this.publications = publications_aux;
    }else{
      Swal.fire({
        title: 'Done!',
        text: 'No hay publicaciones de venta',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    }
  }

  getPublicCompras(){
    let publications_aux=this.publication_aux.filter(publication => publication.publication_type_id == 2);
    if(publications_aux!=null){
      this.publications = publications_aux;
    }else{
      Swal.fire({
        title: 'Done!',
        text: 'No hay publicaciones de compra',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    }
  }

  getPublicVoluntariado(){
    let publications_aux=this.publication_aux.filter(publication => publication.publication_type_id == 3);
    if(publications_aux!=null){
      this.publications = publications_aux;
    }else{
      Swal.fire({
        title: 'Done!',
        text: 'No hay publicaciones de voluntariado',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    }
  }

  getPublicServicios(){
    let publications_aux=this.publication_aux.filter(publication => publication.publication_type_id == 4);
    if(publications_aux!=null){
      this.publications = publications_aux;
    }else{
      Swal.fire({
        title: 'Done!',
        text: 'No hay publicaciones de servicios',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    }
  }

  comprarPublication(publication: Publication){
    Swal.fire({
      title: '¿Estas seguro de comprar esta publicacion?',
      text: "No podras revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Comprar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cuanto deseas comprar?',
          input: 'number',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Comprar',
          showLoaderOnConfirm: true,
          preConfirm: (amount) => {
            if(amount > 0 && amount <= publication.quantity_stock){
              let i_can_buy = this.comprobarDinero(publication, amount);
              if(i_can_buy){
                let publicationCopy= new PublicationCopy(
                  publication.id,
                  publication.title,
                  publication.description,
                  this.formatearFechaParaMySQL(new Date()),
                  publication.username,
                  this.user.username,
                  publication.foto,
                  publication.unit_price * amount,
                  publication.publication_type_id,
                  publication.category,
                  publication.unit_price,
                  amount
                )
                /*LLAMAR SERVICIO Y SEGUIR VIENDO LA LOGICA*/
                this.Service.comprarProducto(publicationCopy).subscribe((data: any) => {
                  if(data){
                    Swal.fire({
                      title: 'Comprado!',
                      text: 'La publicacion ha sido comprada',
                      icon: 'success',
                      confirmButtonText: 'Ok'
                    }).then((result) => {
                        if(publication.quantity_stock - amount > 0) {
                          publication.quantity_stock = publication.quantity_stock - amount;
                          this.Service.updatePublication(publication).subscribe((data: any) => {
                            if(!data){
                              Swal.fire({
                                title: 'Error!',
                                text: 'Hubo un error en la venta',
                                icon: 'error',
                                confirmButtonText: 'Ok'
                              });
                            }
                          });
                        }else{
                          publication.quantity_stock = 0;
                          publication.status = 'completed';
                          this.Service.updatePublication(publication).subscribe((data: any) => {
                            if(!data){
                              Swal.fire({
                                title: 'Error!',
                                text: 'La publicacion no ha sido actualizada',
                                icon: 'error',
                                confirmButtonText: 'Ok'
                              });
                            }
                          });
                        }
                    }).then((result) => {
                      this.getAllPublications();
                      this.actualizarBank();
                    });
                  }else{
                    Swal.fire({
                      title: 'Error!',
                      text: 'La publicacion no ha sido comprada',
                      icon: 'error',
                      confirmButtonText: 'Ok'
                    });
                  }
                });
              }else{
                Swal.fire({
                  title: 'No tienes suficiente dinero',
                  text: 'No puedes comprar esta publicacion',
                  icon: 'error',
                  confirmButtonText: 'Ok'
                });
              }
            }else{
              Swal.showValidationMessage(
                `La cantidad debe ser mayor a 0 y menor o igual a ${publication.quantity_stock}`
              );
            }
          }
        });
      }else if (result.isDismissed) {
        Swal.fire({
          title: 'Cancelado',
          text: 'No se ha comprado la publicacion',
          icon: 'info',
          confirmButtonText: 'Ok'
        });
      }
    });

  }

  ofertarPublication(publication: Publication){
    console.log('Quiero ofertar la publicacion: ', publication);
  }

  voluntariarPublication(publication: Publication){
    console.log('Quiero voluntariar la publicacion: ', publication);
  }

  contactarPublication(publication: Publication){
    console.log('Quiero contactar al vendedor de la publicacion: ', publication);
  }


  comprobarDinero(publication: Publication, amount: number){
    this.bank = JSON.parse(localStorage.getItem('bank') || '{}');
    let my_bank_currency = this.bank.aplication_currency+this.bank.volunteer_currency;
    if(my_bank_currency >= amount*publication.unit_price){
      return true;
    }
    return false;
  }

  formatearFechaParaMySQL(fecha: Date): string {
    const año = fecha.getFullYear();
    const mes = ("0" + (fecha.getMonth() + 1)).slice(-2); // Los meses van de 0 a 11, por lo que se suma 1
    const dia = ("0" + fecha.getDate()).slice(-2); // Añade un cero adelante si es necesario y toma los últimos 2 dígitos
    return `${año}-${mes}-${dia}`;
  }

  actualizarBank(){
    this.ServiceGuest.getBank(this.user.username).subscribe((data: any) => {
      if(data!=null){
        Swal.fire({
          title: 'Perfecto!',
          text: 'Cuenta bancaria cargada con exito!',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) => {
          localStorage.setItem('bank', JSON.stringify(data));
          this.jalarBankYActualizarVariableDeServicio();
        });
      }else{
        Swal.fire({
          title: 'Error!',
          text: 'Error al cargar la cuenta bancaria!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  reportarPublication(publication: Publication){
    Swal.fire({
      title: 'Por que deseas reportar esta publicacion?',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Reportar',
      showLoaderOnConfirm: true,
      preConfirm: (reason) => {
        if(reason.length > 0){
          /*LLAMAR SERVICIO Y SEGUIR VIENDO LA LOGICA*/
          let n_report = new ReportPublication(
            0,
            publication.id,
            publication.title,
            publication.description,
            publication.foto,
            publication.category,
            publication.unit_price,
            publication.username,
            reason,
            this.formatearFechaParaMySQL(new Date()),
            'active',
            this.user.username
          )
          this.Service.reportPublication(n_report).subscribe((data: any) => {
            if(data){
              Swal.fire({
                title: 'Reportado!',
                text: 'La publicacion ha sido reportada',
                icon: 'success',
                confirmButtonText: 'Ok'
              });
            }
          });
        }else{
          Swal.showValidationMessage(
            `Debes ingresar una razon para reportar la publicacion`
          );
        }
      }
    });
  }
  jalarBankYActualizarVariableDeServicio(){
    let bank = JSON.parse(localStorage.getItem('bank') || '{}');
    this.Service.setCurrentAplicationMoney(bank.volunteer_currency+bank.aplication_currency);
  }
}
