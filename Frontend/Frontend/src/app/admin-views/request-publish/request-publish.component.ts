import {Component, OnInit} from '@angular/core';
import {Publication} from "../../../models/Publication";
import {Category} from "../../../models/Category";
import {PublicationType} from "../../../models/PublicationType";
import {UserService} from "../../../../service/user_service/user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-request-publish',
  templateUrl: './request-publish.component.html',
  styleUrls: ['./request-publish.component.css']
})
export class RequestPublishComponent implements OnInit {
  public categorias: Category[] = [];
  public array_tipo_publicacion!: PublicationType[];
  public my_publications: Publication[] = [
    {
      id: 1,
      title: "Publication 1",
      description: "Description 1",
      date: "2021-01-01",
      status: "pending",
      username: "User 1",
      foto: "https://www.w3schools.com/howto/img_avatar.png",
      total_cost: 100,
      publication_type_id: 1,
      category: "Deportes",
      unit_price: 100,
      quantity: 1,
      quantity_stock: 1
    },
    {
      id: 2,
      title: "Publication 2",
      description: "Description 2",
      date: "2021-01-02",
      status: "pending",
      username: "User 2",
      foto: "https://www.w3schools.com/howto/img_avatar2.png",
      total_cost: 200,
      publication_type_id: 2,
      category: "Bebés",
      unit_price: 200,
      quantity: 1,
      quantity_stock: 1
    }
  ];
  constructor(
    private Service: UserService
  ) {
  }

  ngOnInit(): void {
    this.getPublicationPending();
  }

  aceptar(publication: Publication){
    console.log("Aceptando publicación: "+publication.id);
    this.Service.updateStatusPublication(publication.id, 'active').subscribe(
      (data: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Publicación aceptada',
          showConfirmButton: false,
          timer: 1500
        });
        this.getPublicationPending();
      });
  }

  rechazar(publication: Publication){
    this.Service.updateStatusPublication(publication.id, 'rejected').subscribe(
      (data: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Publicación rechazada',
          showConfirmButton: false,
          timer: 1500
        });
        this.getPublicationPending();
      });
  }

  retornarTipoPublicacion(id: number){
    switch(id){
      case 1:
        return "Venta";
      case 2:
        return "Compra";
      default:
        return "Voluntariado";
    }
  }

  getPublicationPending(){
    this.Service.getPublicationsPending().subscribe(
      (data: Publication[]) => {
        if(data.length == 0){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay publicaciones pendientes',
          });
          this.my_publications = [];
        }else{
          this.my_publications = data;
        }
      });
  }

}
