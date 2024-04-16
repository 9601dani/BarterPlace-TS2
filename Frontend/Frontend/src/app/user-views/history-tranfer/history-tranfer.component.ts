import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../service/user_service/user.service";
import Swal from "sweetalert2";
import {User} from "../../../models/User";

@Component({
  selector: 'app-history-tranfer',
  templateUrl: './history-tranfer.component.html',
  styleUrls: ['./history-tranfer.component.css']
})
export class HistoryTranferComponent implements OnInit {
  public user!:User

  public displayedColumns: string[]= ['id','username_receive','amount','date'];
  public displayedColumns2: string[]= ['id','username_sender','amount','date'];
  public historyTranfer: any[] = [
    {
      id: 1,
      username_receiver: 'user1',
      amount: 100,
      date: '2021-10-12'
    }
  ]

  public historyTranfer2: any[] = [
    {
      id: 1,
      username_sender: 'user1',
      amount: 100,
      date: '2021-10-12'
    }
  ]
  public total_transferidos: number = 0;
  public total_recibidos: number = 0;
  constructor(
    private Service: UserService
  ) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user') || '{}');
    this.getMyHistoryTranfer();
    this.getMyHistoryTranfer2();

  }

  getFormartDate(date: string){
    const fecha = new Date(date);
    const dia = fecha.getDate().toString().padStart(2, '0'); // Asegura dos dígitos
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // getMonth() es 0-indexado
    const anio = fecha.getFullYear();

    // Formatear y retornar la fecha como dd/mm/yyyy
    return `${dia}/${mes}/${anio}`;
  }

  getTotalTranferidos(){
    this.total_transferidos = 0;
    this.historyTranfer.forEach((element) => {
      this.total_transferidos += Number(element.amount);
    });
  }

  getTotalRecibidos(){
    this.total_recibidos = 0;
    this.historyTranfer2.forEach((element) => {
      this.total_recibidos += Number(element.amount);
    });
  }

  getMyHistoryTranfer(){
    this.Service.getHistoryTranfer(this.user.username).subscribe((data: any) => {
      if(data){
        this.historyTranfer = data;
        this.getTotalTranferidos();
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo obtener el historial de transferencias'
        });
        }
      });
    }

    getMyHistoryTranfer2(){
      this.Service.getHistoryTranfer2(this.user.username).subscribe((data: any) => {
        if(data){
          this.historyTranfer2 = data;
          this.getTotalRecibidos();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener el historial de transferencias'
          });
        }
      });
    }

}
