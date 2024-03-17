import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  constructor() {}
  //Hare el form Group
  public registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerForm = new FormBuilder().group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      email: [null, Validators.required]
    });
  }
  register(){
    console.log("Registrado");
  }

  cancel(){
    console.log("Cancelado");
  }

  login(){
    console.log("Login");
  }
  onSubmit(){
    if (this.registerForm.valid) {
      Swal.fire({
        title: 'Perfecto!',
        text: 'Usuario registrado con exito!',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      console.log("Registrado");
      console.log(this.registerForm.value);

    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, rellene todos los campos!',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }

}
