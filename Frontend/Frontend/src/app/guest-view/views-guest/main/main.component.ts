import {Component, OnInit} from '@angular/core';
import {GuestService} from "../../../../../service/guest_service/guest.service";
import Swal from "sweetalert2";
import {Publication} from "../../../../models/Publication";
import {UserService} from "../../../../../service/user_service/user.service";
import {Category} from "../../../../models/Category";
import {AdminService} from "../../../../../service/admin_service/admin.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  public publications:Publication[] = [];
  public publication_aux:Publication[] = [];
  public categories:Category[] = [];
  categorie_selected: string = '';
  public name_find: string = '';
  constructor(
    private GuestService: GuestService,
    private Service: UserService,
    private ServiceAdmin: AdminService
  ) { }

  ngOnInit(): void {
    this.getAllPublications();
    this.getCategories();
  }

  changePantalla() {
    Swal.fire({
      title: 'Debes iniciar sesión o registrarte para continuar',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Iniciar sesión`,
      denyButtonText: `Registrarse`,
      cancelButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.GuestService.setPantalla('login');
      } else if (result.isDenied) {
        this.GuestService.setPantalla('register');
      } else if (result.isDismissed) {
        this.GuestService.setPantalla('main');
      }
      ;
    });
  }

  getAllPublications(){
    this.Service.getAllPublications().subscribe((data: Publication[]) => {
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

  findCategory(){
    this.name_find = '';
    if(this.categorie_selected != ''){
      this.GuestService.getPubliByCategory(this.categorie_selected).subscribe((data: Publication[]) => {
        if(data.length > 0){
          this.publications = data;
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay publicaciones disponibles con la categoria * '+this.categorie_selected+' *'
          }).then((result) => {
            if (result.isConfirmed) {
              this.publications = this.publication_aux;
              this.categorie_selected = '';
            }
          });
        }
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes ingresar un nombre a buscar'
      });
    }
  }

    findAll(){
      this.getAllPublications();
      this.name_find = '';
      this.categorie_selected = '';
    }

    findName(){
      this.categorie_selected = '';
      if(this.name_find != ''){
        this.publications = this.publication_aux.filter((publication) => publication.title.includes(this.name_find));
        if(this.publications.length > 0){
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay publicaciones disponibles con el nombre * '+this.name_find+' *'
          }).then((result) => {
            if (result.isConfirmed) {
              this.publications = this.publication_aux;
              this.name_find = '';
            }
          });
        }
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Debes ingresar un nombre a buscar'
        });
      }

    }
}
