import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../service/user_service/user.service";
import {AdminService} from "../../../../service/admin_service/admin.service";
import {Category} from "../../../models/Category";
import {Publication} from "../../../models/Publication";
import Swal from "sweetalert2";
import {User} from "../../../models/User";

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
  constructor(
    private Service: UserService,
    private ServiceAdmin: AdminService
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


}
