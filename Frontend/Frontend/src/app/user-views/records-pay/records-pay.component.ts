import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RecordBuyPack} from "../../../models/RecordBuyPack";
import {RecordRecharge} from "../../../models/RecordRecharge";
import {UserService} from "../../../../service/user_service/user.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-records-pay',
  templateUrl: './records-pay.component.html',
  styleUrls: ['./records-pay.component.css']
})
export class RecordsPayComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  public records_pay:RecordBuyPack[] = [
    {
      id: 1,
      date: '2021-09-01',
      combo_name: 'Combo 1',
      price: 10,
      coins: 100,
      username: 'user1'
    },
    {
      id: 2,
      date: '2021-09-02',
      combo_name: 'Combo 2',
      price: 20,
      coins: 200,
      username: 'user1'
    }
  ];

  public recargas:RecordRecharge [] = [
    {
      id: 1,
      date: '2021-09-01',
      amount: 10,
      type: 'Tarjet',
      number: '1234123412341234',
      username: 'user1'
    },
    {
      id: 2,
      date: '2021-09-02',
      amount: 20,
      type: 'Account',
      number: '123456789',
      username: 'user1'
    }
  ];

  public displayedColumns: string[] = ['id', 'date', 'amount', 'type', 'number'];
  public displayedColumns2: string[] = ['id', 'date', 'combo_name', 'price', 'coins'];

  public total_recargado: number = 0;
  public total_coins: number = 0;
  public total_gastado: number = 0;
  constructor(
    private Service: UserService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getMyRecordsPay();
    this.getMyRecordsBuyPack();
  }

  public returnNameTipo(tipo: string): string{
    if(tipo === 'Tarjet'){
      return 'Tarjeta';
    }else{
      return 'Cuenta';
    }
  }

  getMyRecordsPay(){
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    this.Service.getMyRecordRecharge(user.username).subscribe((data:any) => {
      if(data.length > 0){
        this.recargas = data;
        this.calcularTotalRechange();
      }else{
        this.recargas = [];
      }
    });
  }

  getMyRecordsBuyPack(){
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    this.Service.getMyRecordPackMoney(user.username).subscribe((data:any) => {
      if(data.length > 0){
        this.records_pay = data;
        this.calcularTotalBuyPack();
      }else{
        this.records_pay = [];
      }
    });
  }


  calcularTotalRechange(){
    this.total_recargado = 0;
    this.recargas.forEach((recarga: RecordRecharge) => {
      this.total_recargado += recarga.amount;
    });
  }

  calcularTotalBuyPack(){
    this.total_gastado = 0;
    this.total_coins = 0;
    this.records_pay.forEach((record: RecordBuyPack) => {
      this.total_gastado += record.price;
      this.total_coins += record.coins;
    });
  }

  calcularMasUsado(){
    //recarga type es string
    let tipo = '';
    let cantidad = 0;
    let cantidad2 = 0;
    this.recargas.forEach((recarga: RecordRecharge) => {
      if(recarga.type === 'Tarjet'){
        cantidad += 1;
      }else{
        cantidad2 += 1;
      }
    });
    if(cantidad > cantidad2){
      tipo = 'Tarjeta';
    }else{
      tipo = 'Cuenta';
    }
    return tipo;
  }

  ordenarPorCantidad(){
    console.log('Ordenar por cantidad');
    let recarga = this.recargas;
    recarga.sort((a: RecordRecharge, b: RecordRecharge) => {
      if(a.amount > b.amount){
        return 1;
      }else{
        return -1;
      }
    });
    this.recargas = recarga;
   this.dataSource.data = recarga;
   this.cdr.detectChanges();
  }
}
