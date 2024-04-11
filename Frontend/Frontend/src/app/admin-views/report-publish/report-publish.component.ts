import {Component, OnInit} from '@angular/core';
import {Publication} from "../../../models/Publication";
import {UserService} from "../../../../service/user_service/user.service";
import {AdminService} from "../../../../service/admin_service/admin.service";
import Swal from "sweetalert2";
import {ReportPublication} from "../../../models/ReportPublication";

@Component({
  selector: 'app-report-publish',
  templateUrl: './report-publish.component.html',
  styleUrls: ['./report-publish.component.css']
})
export class ReportPublishComponent implements OnInit {
  public selected!: Publication;
  public reportes: any[] = [
    {
      id: 1,
      publication_id: 1,
      title: "Publication 1",
      description: "Description 1",
      foto: "https://www.w3schools.com/howto/img_avatar.png",
      category: "Bebes",
      unit_price: 100,
      username_publication: "User 1",
      comment: "Report 1",
      date: "2021-01-01",
      username_report: "User 2"
    },
    {
      id: 2,
      publication_id: 2,
      title: "Publication 2",
      description: "Description 2",
      foto: "https://www.w3schools.com/howto/img_avatar2.png",
      category: "Hogar",
      unit_price: 200,
      username_publication: "User 2",
      comment: "Report 2",
      date: "2021-01-02",
      username_report: "User 1"
    }
    ]
  constructor(
    private Service: UserService,
    private ServiceAdmin: AdminService
  ) { }

  ngOnInit(): void {
    this.getReportes();
  }

  getReportes(){
    this.ServiceAdmin.getReportPublications().subscribe((data: any) => {
      if(data){
        this.reportes = data;
      }else{
        this.reportes = [];
        Swal.fire({
          icon: 'success',
          title: 'Enhorabuena!',
          text: 'No se encontraron reportes'
        });
      }
      });
  }

  rechazarReporte(reporte:ReportPublication){
    this.ServiceAdmin.reportPublicationUpdate(reporte.id, 'disable').subscribe((data: any) => {
      if(data){
        Swal.fire({
          icon: 'success',
          title: 'Enhorabuena!',
          text: 'Reporte rechazado, la publicacion seguira activa'
        });
        this.getReportes();
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo rechazar el reporte'
        });
      }
    });
  }

  bloquearPublicacion(reporte:ReportPublication){
    this.ServiceAdmin.bloquearPublicacion(reporte.id).subscribe((data: any) => {
      if(data){
        Swal.fire({
          icon: 'success',
          title: 'Enhorabuena!',
          text: 'Publicacion bloqueada'
        });
        this.getReportes();
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo bloquear la publicacion'
        });
      }
    });
  }

}
