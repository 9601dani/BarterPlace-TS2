import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User";
import {AdminService} from "../../../../service/admin_service/admin.service";
import Swal from "sweetalert2";
import {elementAt} from "rxjs";

@Component({
  selector: 'app-management-user',
  templateUrl: './management-user.component.html',
  styleUrls: ['./management-user.component.css']
})
export class ManagementUserComponent implements OnInit {
  public admin_users: User[] = [];
  displayedColumns: string[] = ['username', 'name', 'role','gender', 'email', 'actions'];


  ngOnInit(): void {
    this.getUsers();
  }

  constructor(
    private adminService: AdminService
  ) {
  }

  // Function to get all users
  getUsers() {
    this.adminService.obtenerAdmins().subscribe(
      (data: User[]) => {
        this.admin_users = data;
      });
  }

  eliminarUsuario(username: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.eliminarAdmin(username).subscribe(
          data => {
            Swal.fire(
              'Borrado!',
              'El usuario ha sido eliminado.',
              'success'
            );
            this.getUsers();
          },
          error => {
            Swal.fire(
              'Error!',
              'Ha ocurrido un error.',
              'error'
            );
          }
        );
      }
    });
  }
}
