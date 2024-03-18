import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from 'sweetalert2';
import {User} from "../../../../models/User";
import {GuestService} from "../../../../../service/guest_service/guest.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  constructor(
    private Service: GuestService
  ) {}
  //Hare el form Group
  public registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerForm = new FormBuilder().group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      email: [null, Validators.required]
    });
  }

  onSubmit(){
    if (this.registerForm.valid) {
      //Creo el objeto User
      let user: User = new User(
        this.registerForm.get('username')?.value,
        this.registerForm.get('email')?.value,
        this.registerForm.get('password')?.value,
        "","","","",'user',"");
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
              text: 'Usuario registrado con exito!',
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
    this.registerForm.reset();
  }
}
