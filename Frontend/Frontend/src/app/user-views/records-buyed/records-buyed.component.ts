import {Component, OnInit} from '@angular/core';
import {PublicationCopy} from "../../../models/PublicationCopy";
import {UserService} from "../../../../service/user_service/user.service";
import {User} from "../../../models/User";
import Swal from "sweetalert2";

@Component({
  selector: 'app-records-buyed',
  templateUrl: './records-buyed.component.html',
  styleUrls: ['./records-buyed.component.css']
})
export class RecordsBuyedComponent implements OnInit{
  public publications_all:PublicationCopy[] = [];
  public publications_buy:PublicationCopy[] = [
    {
      id: 1,
      title: 'Titulo 1',
      description: 'Descripcion 1',
      date_sell: '2021-10-12',
      username_seller: 'vendedor1',
      username_buyer: 'comprador1',
      foto: 'https://www.google.com',
      total_cost: 100,
      publication_type_id: 1,
      category: 'categoria1',
      unit_price: 10,
      quantity: 10
    }
  ]
  publications_volunter:PublicationCopy[] = [
    {
      id: 1,
      title: 'Titulo 1',
      description: 'Descripcion 1',
      date_sell: '2021-10-11',
      username_seller: 'vendedor1',
      username_buyer: 'comprador1',
      foto: 'https://www.google.com',
      total_cost: 100,
      publication_type_id: 3,
      category: 'categoria1',
      unit_price: 10,
      quantity: 10
    }
  ]



  total_gastado_publications: number = 0;
  total_obtenido_volunter: number = 0;

  public displayedColumns: string[] = ['id', 'date_sell', 'title', 'username_seller', 'total_cost', 'quantity'];
  public displayedColumnsVolunter: string[] = ['id', 'date_sell', 'title', 'username_seller', 'total_cost'];
  user!:User;
  constructor(
    private Service: UserService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getPublicationsBuyed();
  }

  getFormartDate(date: string){
    const parts: string[] = date.split("-");

    // Reorganizar los componentes en el nuevo formato
    const newDateFormat: string = `${parts[1]}/${parts[2]}/${parts[0]}`; // DD/mm/YYYY

    return newDateFormat;
  }

  getPublicationsBuyed(){
    this.Service.getPublicationsBuyed(this.user.username).subscribe((data: PublicationCopy[]) => {
      if(data.length > 0){
        this.publications_all = data;
        this.separarPublications();
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se encontraron publicaciones compradas por ti!',
        });
        this.publications_all = [];
        this.publications_volunter = [];
        this.publications_buy = [];
      }
    });
  }
  getUser(){
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  separarPublications(){
    this.publications_volunter = [];
    this.publications_buy = [];
    this.publications_all.forEach((publication: PublicationCopy) => {
      if(publication.publication_type_id == 1){
        this.publications_buy.push(publication);
        this.total_gastado_publications += publication.total_cost;
      }else{
        this.publications_volunter.push(publication);
        this.total_obtenido_volunter += publication.total_cost;
      }
    });

  }
}
