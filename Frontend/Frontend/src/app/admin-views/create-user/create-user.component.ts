import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/User";
import Swal from "sweetalert2";
import {GuestService} from "../../../../service/guest_service/guest.service";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit{
  public newAdminForm!: FormGroup;
    constructor(
      private Service: GuestService
    ) { }

    ngOnInit(): void {
      this.newAdminForm = new FormBuilder().group({
        username: [null, Validators.required],
        password: [null, Validators.required],
        email: [null, Validators.required]
      });
    }

  onSubmit(){
    if (this.newAdminForm.valid) {
      //Creo el objeto User
      let user: User = new User(
        this.newAdminForm.get('username')?.value,
        this.newAdminForm.get('email')?.value,
        this.newAdminForm.get('password')?.value,
        "","","","",'admin',"",false);
      //Aqui se debe llamar al servicio para ver si existe el usuario
      this.Service.getUser(user.username).subscribe((data: any) => {
        if (data!=null) {
          Swal.fire({
            title: 'Error!',
            text: 'El usuario ya existe!',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
          this.clearForm();
        } else {
          this.Service.saveUser(user).subscribe((data: any) => {
            Swal.fire({
              title: 'Perfecto!',
              text: 'Usuario Administrador creado con exito!',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
          });
          this.clearForm();
        }
      });

    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, rellene todos los campos!',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }

  public clearForm(){
    this.newAdminForm.get('username')?.setValue('');
    this.newAdminForm.get('password')?.setValue('');
    this.newAdminForm.get('email')?.setValue('');
  }

}
