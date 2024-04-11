import {Component, OnInit} from '@angular/core';
import {GuestService} from "../../../../../service/guest_service/guest.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {User} from "../../../../models/User";
import {Router} from "@angular/router";
import {AdminService} from "../../../../../service/admin_service/admin.service";
import {UserService} from "../../../../../service/user_service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(
    private Service: GuestService,
    private router: Router,
    private ServiceAdmin: AdminService,
    private ServiceUser: UserService
  ) {}
  public loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginForm = new FormBuilder().group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.Service.loginUser(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value).subscribe((data: any) => {
        if (data!=null) {
          Swal.fire({
            title: 'Perfecto!',
            text: 'Usuario logueado con exito!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          //Guardare el user en el local storage
          localStorage.setItem('user', JSON.stringify(data));
          if(data.role=='admin'){
            this.router.navigate(['/admin']);
          }else if(data.role=='user'){
            this.Service.getBank(data.username).subscribe((data: any) => {
              if(data!=null){
                localStorage.setItem('bank', JSON.stringify(data));
                this.router.navigate(['/user']);;
                this.ServiceUser.setPantalla('')
                this.ServiceAdmin.setPantalla('')
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
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'El usuario no existe!',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
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

  public static setUser():User{
    let user=JSON.parse(localStorage.getItem('user')!);
    return new User(user.username, user.email, user.password, user.name, user.date_of_birth, user.description, user.profile_picture, user.role, user.gender, user.is_seller);
  }


}
