import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../service/user_service/user.service";
import {Category} from "../../../models/Category";
import {AdminService} from "../../../../service/admin_service/admin.service";
import Swal from "sweetalert2";
import {MatSelectChange} from "@angular/material/select";
import {Publication} from "../../../models/Publication";
import {User} from "../../../models/User";
import {PublicationType} from "../../../models/PublicationType";
import {GuestService} from "../../../../service/guest_service/guest.service";

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit{
  public user:User= JSON.parse(localStorage.getItem('user') || '{}');
  public new_publication:boolean = false;
  public edit_publication:boolean = false;
  public categorias: Category[] = [];
  array_tipo_publicacion!: PublicationType[];
  tipo_publicacion: string = '1';
  public imagen_seleccionada: string = '';
  public publication_a_editar!: Publication;
  public publicacion_editada!: Publication;
  public my_publications_aux: Publication[] = [];
  public my_publications: Publication[] = [
    {
      id: 1,
      title: "Publication 1",
      description: "Description 1",
      date: "2021-01-01",
      status: "Published",
      username: "User 1",
      foto: "https://www.w3schools.com/howto/img_avatar.png",
      total_cost: 100,
      publication_type_id: 1,
      category: "3",
      unit_price: 100,
      quantity: 1
    },
    {
      id: 2,
      title: "Publication 2",
      description: "Description 2",
      date: "2021-01-02",
      status: "Published",
      username: "User 2",
      foto: "https://www.w3schools.com/howto/img_avatar2.png",
      total_cost: 200,
      publication_type_id: 2,
      category: "2",
      unit_price: 200,
      quantity: 1
    }
  ];
  public form_new_publication!:FormGroup;
  public form_edit_publication!:FormGroup;
  constructor(
      private Service: UserService,
      private ServiceAdmin: AdminService,
      private ServiceGuest: GuestService
    ) {}

    ngOnInit(): void {
      this.form_new_publication = new FormBuilder().group({
        title: [null, Validators.required],
        description: [null, Validators.required],
        foto: [''],
        unit_price: [0, [Validators.required,Validators.pattern('[0-9]+')]],
        quantity: [1, [Validators.required,Validators.pattern('[0-9]+')]],
        type: [null, Validators.required],
        category: [null, Validators.required]
      });
      this.obtenerCategorias();
      this.obtenerTiposPublicacion();
      this.obtenerMisPublicaciones();
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

  editPublication(publication: Publication){
    this.edit_publication = true;
    this.new_publication = true;
    this.publication_a_editar = publication;
    this.form_new_publication.get('title')?.setValue(publication.title);
    this.form_new_publication.get('description')?.setValue(publication.description);
    this.form_new_publication.get('unit_price')?.setValue(publication.unit_price);
    this.form_new_publication.get('quantity')?.setValue(publication.quantity);
    this.form_new_publication.get('type')?.setValue(publication.publication_type_id);
    this.form_new_publication.get('category')?.setValue(this.retornarCategoriaId(publication.category));
    this.imagen_seleccionada = publication.foto;
    this.tipo_publicacion = publication.publication_type_id.toString();
  }

  guardarEdicion(){
    if (this.form_new_publication.valid) {
      this.publicacion_editada = this.comprobarType(this.form_new_publication.get('type')?.value);
      this.publicacion_editada.id = this.publication_a_editar.id;
      if(this.comprobarDineroEdicion(this.publication_a_editar,this.publicacion_editada)) {
        this.Service.updatePublication(this.publicacion_editada).subscribe((data: any) => {
          if (data != null) {
            Swal.fire({
              title: 'Perfecto!',
              text: 'Publicacion editada con exito!',
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then((result) => {
              this.actualizarBank();
              this.edit_publication = false;
              this.form_new_publication.reset();
              this.imagen_seleccionada = '';
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'Error al editar la publicacion',
              icon: 'error',
              confirmButtonText: 'Ok'
            }).then((result) => {
              this.edit_publication = false;
              this.form_new_publication.reset();
              this.imagen_seleccionada = '';
            });
          }
        });
      }else{
        Swal.fire({
          title: 'Error!',
          text: 'No tienes suficiente dinero para publicar',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    }
  }

  comprobarDineroEdicion(publication_ant:Publication, publicacion_now:Publication): boolean {
    console.log('publicacion ant:');
    console.log(publication_ant);
    console.log('publicacion now:');
    console.log(publicacion_now);
    if(publication_ant.publication_type_id==1 || publication_ant.publication_type_id==3){
      if(publicacion_now.publication_type_id ==2 || publicacion_now.publication_type_id ==4){
        //TODO: Se devuelve el dinero total de la publicacion anterior al usuario
        let bank= JSON.parse(localStorage.getItem('bank') || '{}');
        bank.aplication_currency += publication_ant.total_cost;
        this.Service.updateAplicationCurrency(this.user.username,bank.aplication_currency).subscribe((data: any) => {
          if(data!=null){
            Swal.fire({
              title: 'Perfecto!',
              text: 'Dinero devuelto con exito!',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
          }else{
            Swal.fire({
              title: 'Error!',
              text: 'Error al devolver el dinero',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        });
        return true;
      }else{
        //TODO: Aqui va la logica para ver si el nuevo costo es mayor al anterior y ver si se le devuelve la diferencia al usuario
        let nuevo_total = publicacion_now.total_cost-publication_ant.total_cost;
        if(nuevo_total>0){
          let bank= JSON.parse(localStorage.getItem('bank') || '{}');
          bank.aplication_currency -= nuevo_total;
          this.Service.updateAplicationCurrency(this.user.username,bank.aplication_currency).subscribe((data: any) => {
            if(data!=null){
              Swal.fire({
                title: 'Perfecto!',
                text: 'Dinero devuelto con exito!',
                icon: 'success',
                confirmButtonText: 'Ok'
              });
            }else{
              Swal.fire({
                title: 'Error!',
                text: 'Error al devolver el dinero',
                icon: 'error',
                confirmButtonText: 'Ok'
              });
            }
          });
        }else if(nuevo_total<0){
          let bank= JSON.parse(localStorage.getItem('bank') || '{}');
          if(bank.aplication_currency >= Math.abs(nuevo_total)){
            bank.aplication_currency -= nuevo_total;
            this.Service.updateAplicationCurrency(this.user.username, bank.aplication_currency).subscribe((data: any) => {
              if (data != null) {
                Swal.fire({
                  title: 'Perfecto!',
                  text: 'Se ha descontado el nuevo total!',
                  icon: 'success',
                  confirmButtonText: 'Ok'
                });
              } else {
                Swal.fire({
                  title: 'Error!',
                  text: 'Error al devolver el dinero',
                  icon: 'error',
                  confirmButtonText: 'Ok'
                });
              }
            });
          }
        }else{
          return true;
        }

        return true;
      }
    }else if(publication_ant.publication_type_id==2 || publication_ant.publication_type_id==4){
      if(publicacion_now.publication_type_id ==1 || publicacion_now.publication_type_id ==3){
        //Aqui va la logica para devolver el dinero total de la publicacion anterior al usuario
        let bank= JSON.parse(localStorage.getItem('bank') || '{}');
        bank.aplication_currency -= publicacion_now.total_cost;
        console.log('bank: '+ bank.aplication_currency);
        this.Service.updateAplicationCurrency(this.user.username,bank.aplication_currency).subscribe((data: any) => {
          if(data!=null){
            Swal.fire({
              title: 'Perfecto!',
              text: 'Dinero devuelto con exito!',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
          }else{
            Swal.fire({
              title: 'Error!',
              text: 'Error al devolver el dinero',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        });
        return true;
      }else{
        return true;
      }
    }
    return false;
  }

  retornarCategoriaId(category_name: string): number {
    for (let i = 0; i < this.categorias.length; i++) {
      if (this.categorias[i].category_name == category_name) {
        return this.categorias[i].id;
      }
    }
    return 0;
  }

  deletePublication(id_publication: number){
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podras revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.Service.updateStatusPublication(id_publication, 'inactive').subscribe((data: any) => {
          if(data!=null){
            Swal.fire(
              'Eliminado!',
              'Tu publicacion ha sido eliminada. id: '+data.title.toUpperCase(),
              'success'
            ).then((result) => {
              //volvere el dinero al usuario si es venta o voluntariado
              if(data.publication_type_id==1 || data.publication_type_id==3){
                let bank= JSON.parse(localStorage.getItem('bank') || '{}');
                bank.aplication_currency += data.total_cost;
                this.Service.updateAplicationCurrency(this.user.username,bank.aplication_currency).subscribe((data: any) => {
                  if(data!=null){
                    Swal.fire({
                      title: 'Perfecto!',
                      text: 'Dinero devuelto con exito!',
                      icon: 'success',
                      confirmButtonText: 'Ok'
                    }).then((result) => {
                      this.obtenerMisPublicaciones();
                      this.actualizarBank();
                    });
                  }else{
                    Swal.fire({
                      title: 'Error!',
                      text: 'Error al devolver el dinero',
                      icon: 'error',
                      confirmButtonText: 'Ok'
                    });
                  }
                });
              }else{
                Swal.fire({
                  title: 'Perfecto!',
                  text: 'Publicacion eliminada con exito!',
                  icon: 'success',
                  confirmButtonText: 'Ok'
                }).then((result) => {
                  this.obtenerMisPublicaciones();
                });
              }
            });
          }else{
            Swal.fire({
              title: 'Error!',
              text: 'Error al eliminar la publicacion',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        });
      }
    });
  }



  nuevoPublication(){
    this.new_publication = true;
  }

  closePublication(){
    this.edit_publication = false;
    this.new_publication = false;
  }
  closeditPublication(){
    this.edit_publication = false;
  }

  onSubmitedPublication(){
    if(this.imagen_seleccionada == ''){
      Swal.fire({
        title: 'Error!',
        text: 'Por favor seleccione una imagen',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }
    if (this.form_new_publication.valid) {
      let publication = this.comprobarType(this.form_new_publication.get('type')?.value);
      if(this.comprobarDinero(publication)) {
        this.Service.addPublication(publication).subscribe((data: any) => {
          if (data != null) {
            Swal.fire({
              title: 'Perfecto!',
              text: 'Publicacion creada con exito!',
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then((result) => {
              this.actualizarBank();
              this.new_publication = false;
              this.form_new_publication.reset();
              this.imagen_seleccionada = '';
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'Error al crear la publicacion',
              icon: 'error',
              confirmButtonText: 'Ok'
            }).then((result) => {
              this.new_publication = false;
              this.form_new_publication.reset();
              this.imagen_seleccionada = '';
            });
          }
        });
      }else{
        Swal.fire({
          title: 'Error!',
          text: 'No tienes suficiente dinero para publicar',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }

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

  public obtenerTiposPublicacion(){
    this.Service.getPublicationsType().subscribe((data: any) => {
      if(data!=null){
        this.array_tipo_publicacion = data;
      }else{
        Swal.fire({
          title: 'Error!',
          text: 'Error al obtener los tipos de publicacion',
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

  comprobarDinero(publication:Publication): boolean {
    if(publication.publication_type_id==1 || publication.publication_type_id==2 || publication.publication_type_id==4){
      return true;
    }
    let bank= JSON.parse(localStorage.getItem('bank') || '{}');
    if(bank.aplication_currency >= publication.total_cost){
      return true;
    }
    return false;
  }

  comprobarType(type:number):Publication {
    if(type==1){
      return this.generateVenta();
    }else if (type==2){
      return this.generateCompra();
    }else if(type==4){
      return this.generateServicio();
    }else{
      return this.generateVolunter();
    }

  }

  generateVenta():Publication {
    return new Publication(0, this.form_new_publication.get('title')?.value,
      this.form_new_publication.get('description')?.value, this.formatearFechaParaMySQL(new Date()),
      'pending', this.user.username, this.imagen_seleccionada,
      this.form_new_publication.get('unit_price')?.value * this.form_new_publication.get('quantity')?.value,
      this.array_tipo_publicacion[0].id, this.regresarNameCategory(this.form_new_publication.get('category')?.value),
      this.form_new_publication.get('unit_price')?.value, this.form_new_publication.get('quantity')?.value);
  }

  generateCompra():Publication {
    return new Publication(0, this.form_new_publication.get('title')?.value,
      this.form_new_publication.get('description')?.value, this.formatearFechaParaMySQL(new Date()),
      'pending', this.user.username, this.imagen_seleccionada,
      this.form_new_publication.get('unit_price')?.value,
      this.array_tipo_publicacion[1].id, this.regresarNameCategory(this.form_new_publication.get('category')?.value),
      this.form_new_publication.get('unit_price')?.value,1);
  }

  generateServicio():Publication {
    return new Publication(0, this.form_new_publication.get('title')?.value,
      this.form_new_publication.get('description')?.value, this.formatearFechaParaMySQL(new Date()),
      'pending', this.user.username, this.imagen_seleccionada,
      this.form_new_publication.get('unit_price')?.value,
      this.array_tipo_publicacion[3].id, this.regresarNameCategory(this.form_new_publication.get('category')?.value),
      this.form_new_publication.get('unit_price')?.value,1);
  }

  generateVolunter():Publication {
    return new Publication(0, this.form_new_publication.get('title')?.value,
      this.form_new_publication.get('description')?.value, this.formatearFechaParaMySQL(new Date()),
      'pending', this.user.username, this.imagen_seleccionada,
      this.form_new_publication.get('unit_price')?.value * this.form_new_publication.get('quantity')?.value,
      this.array_tipo_publicacion[2].id, this.regresarNameCategory(this.form_new_publication.get('category')?.value),
      this.form_new_publication.get('unit_price')?.value, this.form_new_publication.get('quantity')?.value);
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
          window.location.reload();
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

  regresarNameCategory(id_category: number): string {
    for (let i = 0; i < this.categorias.length; i++) {
      if (this.categorias[i].id == id_category) {
        console.log('categoria retornando: '+this.categorias[i].category_name);
        return this.categorias[i].category_name;
      }
    }
    return '';
  }

  obtenerMisPublicaciones(){
    this.Service.getMyPublications(this.user.username).subscribe((data: any) => {
      if(data!=null){
        this.my_publications = data;
        this.my_publications_aux = data;
      }else{
        Swal.fire({
          title: 'Error!',
          text: 'Error al obtener las publicaciones',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }
  obtenerEstadoPublicacion(estado: string): string {
    if (estado == 'active') {
      return 'Aceptada';
    } else if (estado == 'inactive') {
      return 'Inactiva';
    } else if(estado == 'pending') {
      return 'Pendiente';
    }else if (estado == 'rejected') {
      return 'Rechazada';
    }else{
      return 'Completa';
    }
  }

  reenviarPublicacion(publication_id: number){
    this.Service.reenviarPublication(publication_id).subscribe((data: any) => {
      if(data!=null){
        Swal.fire({
          title: 'Perfecto!',
          text: 'Publicacion reenviada con exito!',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) => {
          this.obtenerMisPublicaciones();
        });
      }else{
        Swal.fire({
          title: 'Error!',
          text: 'Error al reenviar la publicacion',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }
  retornarTipoPublicacion(id: number) {
    switch (id) {
      case 1:
        return "Venta";
      case 2:
        return "Compra";
      case 4:
        return "Servicio";
      default:
        return "Voluntariado";
    }
  }

  activarPublicacion(id_publication: number){
    this.Service.updateStatusPublication(id_publication, 'pending').subscribe((data: any) => {
      if(data!=null){
        Swal.fire({
          title: 'Perfecto!',
          text: 'Publicacion activada con exito!, espera a que sea aceptada por un administrador',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) => {
          this.obtenerMisPublicaciones();
          //Actucalizar el banco
          if(data.publication_type_id==1 || data.publication_type_id==3){
            let bank= JSON.parse(localStorage.getItem('bank') || '{}');
            bank.aplication_currency -= data.total_cost;
            this.Service.updateAplicationCurrency(this.user.username,bank.aplication_currency).subscribe((data: any) => {
              if(data!=null){
                Swal.fire({
                  title: 'Perfecto!',
                  text: 'Dinero descontado con exito!',
                  icon: 'success',
                  confirmButtonText: 'Ok'
                }).then(
                  (result) => {
                    this.actualizarBank();
                  }
                );
              }else{
                Swal.fire({
                  title: 'Error!',
                  text: 'Error al descontar el dinero',
                  icon: 'error',
                  confirmButtonText: 'Ok'
                });
              }
            });
          }
        });
      }else{
        Swal.fire({
          title: 'Error!',
          text: 'Error al activar la publicacion',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  getPubliPending(){
    let publications_aux= this.my_publications_aux.filter(publication => publication.status == 'pending');
    if(publications_aux!=null){
      this.my_publications = publications_aux
    }else{
      Swal.fire({
        title: 'Done!',
        text: 'No hay publicaciones pendientes',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      }
  }

  getPubliActive(){
    let publications_aux= this.my_publications_aux.filter(publication => publication.status == 'active');
    if(publications_aux!=null){
      this.my_publications = publications_aux;
    }else{
      Swal.fire({
        title: 'Done!',
        text: 'No hay publicaciones activas',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      }
  }

  getPubliInactive(){
    let publications_aux=this.my_publications_aux.filter(publication => publication.status == 'rejected');
    if(publications_aux!=null){
      this.my_publications = publications_aux;
    }else{
      Swal.fire({
        title: 'Done!',
        text: 'No hay publicaciones inactivas',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      }
  }

  getAllMyPublications(){
    this.my_publications = this.my_publications_aux;
  }

  getPublicVentas(){
    let publications_aux=this.my_publications_aux.filter(publication => publication.publication_type_id == 1);
    if(publications_aux!=null){
      this.my_publications = publications_aux;
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
    let publications_aux=this.my_publications_aux.filter(publication => publication.publication_type_id == 2);
    if(publications_aux!=null){
      this.my_publications = publications_aux;
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
    let publications_aux=this.my_publications_aux.filter(publication => publication.publication_type_id == 3);
    if(publications_aux!=null){
      this.my_publications = publications_aux;
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
    let publications_aux=this.my_publications_aux.filter(publication => publication.publication_type_id == 4);
    if(publications_aux!=null){
      this.my_publications = publications_aux;
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
