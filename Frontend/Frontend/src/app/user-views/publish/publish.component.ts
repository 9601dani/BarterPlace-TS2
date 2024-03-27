import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../service/user_service/user.service";
import {Category} from "../../../models/Category";
import {AdminService} from "../../../../service/admin_service/admin.service";
import Swal from "sweetalert2";
import {MatSelectChange} from "@angular/material/select";
import {Publication} from "../../../models/Publication";
import {User} from "../../../models/User";

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit{
  public user:User= JSON.parse(localStorage.getItem('user') || '{}');
  public new_publication:boolean = false;
  public categorias: Category[] = [];
  array_tipo_publicacion: string[]= ['Venta', 'Voluntariado', 'Compra'];
  tipo_publicacion: string = 'Venta';
  public imagen_seleccionada: string = '';
  public my_publications: any[] = [
    {
      id: 1,
      title: "Publication 1",
      description: "Description 1",
      date: "2021-01-01",
      status: "Published",
      username: "User 1",
      foto: ["https://www.w3schools.com/howto/img_avatar.png"],
      cost: 100,
      type: "Venta",
      category: "Category 1"
    },
    {
      id: 2,
      title: "Publication 2",
      description: "Description 2",
      date: "2021-01-02",
      status: "Published",
      username: "User 2",
      foto: ["https://www.w3schools.com/howto/img_avatar2.png"],
      likes: 20,
      dislikes: 3,
      cost: 200,
      type: "Volunter",
      category: "Category 2"
    },
    {
      id: 3,
      title: "Publication 3",
      description: "Description 3",
      date: "2021-01-03",
      status: "Published",
      username: "User 3",
      foto:["https://www.w3schools.com/howto/img_avatar.png"],
      likes: 30,
      dislikes: 4,
      cost: 300,
      type: "Venta",
      category: "Category 3"
    }
  ];
  public form_new_publication!:FormGroup;
    constructor(
      private Service: UserService,
      private ServiceAdmin: AdminService
    ) {}

    ngOnInit(): void {
      this.form_new_publication = new FormBuilder().group({
        title: [null, Validators.required],
        description: [null, Validators.required],
        foto: [null],
        cost: [null, Validators.required],
        type: [null, Validators.required],
        category: [null, Validators.required]
      });
      this.obtenerCategorias();
    }

    selectPublication(id_publication: number){
      console.log("Publication selected: ", id_publication);
    }
  currentIndex = 0;

  previousImage() {
    this.currentIndex = (this.currentIndex === 0) ? this.my_publications.length - 1 : this.currentIndex - 1;
  }

  nextImage() {
    this.currentIndex = (this.currentIndex === this.my_publications.length - 1) ? 0 : this.currentIndex + 1;
  }

  editPublication(id_publication: number){
    console.log("Publication edited: ", id_publication);
  }

  deletePublication(id_publication: number){
    console.log("Publication deleted: ", id_publication);
  }

  nuevoPublication(){
    this.new_publication = true;
  }

  closePublication(){
    this.new_publication = false;
  }

  onSubmitedPublication(){
    if (this.form_new_publication.valid) {
      let publication = new Publication(
        0,
        this.form_new_publication.get('title')?.value,
        this.form_new_publication.get('description')?.value,
        this.formatearFechaParaMySQL(new Date()),
        'Pending',
        this.user.username,
        [this.imagen_seleccionada],
        this.form_new_publication.get('cost')?.value,
        this.form_new_publication.get('type')?.value,
        this.form_new_publication.get('category')?.value
      );
      console.log(publication);
      //this.new_publication = false;
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'Por favor complete todos los campos',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }

  public obtenerCategorias(){
    this.ServiceAdmin.getCategories().subscribe((data: any) => {
      if(data!=null){
        this.categorias = data;
      }else{
        Swal.fire({
          title: 'Error!',
          text: 'Error al obtener las categorias',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        }
    });
  }

  onTipoSeleccionado(event: MatSelectChange): void {
    const tipoSeleccionado = event.value;
    this.tipo_publicacion = tipoSeleccionado;
  }

  onFileSelected($event: any){
    if($event.target.files && $event.target.files[0]){
      const file = $event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imagen_seleccionada = reader.result as string
      reader.readAsDataURL(file!);
    }
  }

  formatearFechaParaMySQL(fecha: Date): string {
    const año = fecha.getFullYear();
    const mes = ("0" + (fecha.getMonth() + 1)).slice(-2); // Los meses van de 0 a 11, por lo que se suma 1
    const dia = ("0" + fecha.getDate()).slice(-2); // Añade un cero adelante si es necesario y toma los últimos 2 dígitos
    return `${año}-${mes}-${dia}`;
  }

}
