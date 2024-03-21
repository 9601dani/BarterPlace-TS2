import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {AdminService} from "../../../../service/admin_service/admin.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit{
  user!:User ;
  public myProfileForm!:FormGroup;

  constructor(
    private Service: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerDatosMyProfile();
    this.myProfileForm = new FormBuilder().group({
      username: [this.user.username, Validators.required],
      password: [this.user.password,Validators.required],
      email: [this.user.email, Validators.required],
      name: [this.user.name, Validators.required],
      birthdate: [this.user.date_of_birth, Validators.required],
      description: [this.user.description, Validators.required],
      profileImage: [this.user.profile_picture],
      role: [this.user.role],
      gender: [this.user.gender, Validators.required],
      isSeller: [this.user.is_seller]
    });
  }

  public obtenerDatosMyProfile(){
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  public onSubmit(){
    if (this.myProfileForm.valid) {
      this.user = new User(
        this.myProfileForm.get('username')?.value,
        this.myProfileForm.get('email')?.value,
        this.myProfileForm.get('password')?.value,
        this.myProfileForm.get('name')?.value,
        this.myProfileForm.get('birthdate')?.value,
        this.myProfileForm.get('description')?.value,
        this.user.profile_picture,
        this.myProfileForm.get('role')?.value,
        this.myProfileForm.get('gender')?.value,
        this.myProfileForm.get('isSeller')?.value
      )
      this.Service.updateUser(this.user).subscribe((data: any) => {
        if(data!=null){
          Swal.fire({
            title: 'Perfecto!',
            text: 'Usuario actualizado con exito!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          localStorage.setItem('user', JSON.stringify(this.user));
        }else {
          Swal.fire({
            title: 'Error!',
            text: 'No se pudo actualizar el usuario!',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    }else {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor llene todos los campos!',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }

  cambiarFoto(){
    // Mostrar SweetAlert con un campo de entrada de archivo
    Swal.fire({
      title: 'Subir Imagen',
      input: 'file',
      inputAttributes: {
        accept: 'image/*',
        'aria-label': 'Subir imagen'
      },
      showCancelButton: true,
      confirmButtonText: 'Subir',
      showLoaderOnConfirm: true,
      preConfirm: (file) => {
        // Procesar la imagen seleccionada
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            if(e.target==null){
              Swal.fire({
                title: 'Error!',
                text: 'No se pudo subir la imagen!',
                icon: 'error',
                confirmButtonText: 'Ok'
              });
            }else{
              const imageData = e.target.result as string;
                this.user.profile_picture = imageData;
                localStorage.setItem('user', JSON.stringify(this.user));
                this.actualizarImagenBD();
            }
          };
          reader.readAsDataURL(file);
        }else{
          Swal.fire({
            title: 'Error!',
            text: 'No se selecciono ninguna imagen!',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    });



  }

  public actualizarImagenBD(){
    console.log('actualizare la imagen en la BD');
    this.Service.updateImage(this.user).subscribe((data: any) => {
      if(data){
        Swal.fire({
          title: 'Perfecto!',
          text: 'Imagen subida con exito!',
          icon: 'success',
          confirmButtonText: 'Ok'

        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      }else{
        Swal.fire({
          title: 'Error!',
          text: 'No se pudo subir la imagen!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

}
