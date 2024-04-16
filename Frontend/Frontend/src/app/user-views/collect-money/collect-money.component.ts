import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {AdminService} from "../../../../service/admin_service/admin.service";
import {UserService} from "../../../../service/user_service/user.service";
import {Tarjet} from "../../../models/Tarjet";
import {AccountBank} from "../../../models/AccountBank";
import {GuestService} from "../../../../service/guest_service/guest.service";
import {PackMoney} from "../../../models/PackMoney";
import {RecordBuyPack} from "../../../models/RecordBuyPack";

@Component({
  selector: 'app-collect-money',
  templateUrl: './collect-money.component.html',
  styleUrls: ['./collect-money.component.css']
})
export class CollectMoneyComponent implements OnInit{
  public user= JSON.parse(localStorage.getItem('user') || '{}');
  public tarjet_or_account: string = 'tarjet';
  public tarjets: any = [
    {
      id: 1,
      number: '1234 5678 1234 5678',
      name: 'Jhon Doe',
      date: '12/23',
      cvv: '123',
      username: 'jhondoe'
    },
    {
      id: 2,
      number: '1234 5678 1234 5679',
      name: 'Jhon Doe',
      date: '12/23',
      cvv: '123',
      username: 'jhondoe'
    }
    ]
  public accounts: any = [
    {
      id: 1,
      number: '1234567890',
      name: 'Jhon Doe',
      bank: 'Banco Industrial',
      type: 'Ahorro',
      username: 'jhondoe'
    },
    {
      id: 2,
      number: '1234567891',
      name: 'Jhon Doe',
      bank: 'Banrural',
      type: 'Monetaria',
      username: 'jhondoe'
    }]

  public combos_para_comprar: any = [
    {
      id: 1,
      name: 'Combo 1',
      price: 100,
      description: 'Combo 1',
      coins: 100
    },
    {
      id: 2,
      name: 'Combo 2',
      price: 200,
      description: 'Combo 2',
      coins: 200
    }
    ]

  public historial_recargas: any = [
    {
      id: 1,
      date: '12/12/2021',
      amount: 100,
      type: 'Tarjet',
      number: '1234 5678 1234 5678',
      username: 'jhondoe'
    },
    {
      id: 2,
      date: '12/12/2021',
      amount: 200,
      type: 'Account',
      number: '1234567890',
      username: 'jhondoe'
    }
    ]

  public record_pack_money: any = [
    {
      id: 1,
      date: '12/12/2021',
      combo_name: 'Combo 1',
      price: 100,
      coins: 100,
      username: 'jhondoe'
    },
    {
      id: 2,
      date: '12/12/2021',
      combo_name: 'Combo 2',
      price: 200,
      coins: 200,
      username: 'jhondoe'
    }
  ]
  public form_add_tarjet!:FormGroup;
  public form_add_account!:FormGroup;
  public form_recargar_money!:FormGroup;
  public id_seleccionado: number =0;
  opcion_seleccionada: string = '1';
  edit_card: boolean = false;
  edit_account: boolean = false;


  constructor(
    private Service: AdminService,
    private ServiceUser: UserService,
    private GuestService: GuestService
  ) {

  }

  ngOnInit(): void {
    this.form_add_tarjet = new FormBuilder().group({
      number: ['',[Validators.required,Validators.minLength(16),Validators.maxLength(16)]],
      name: ['',Validators.required],
      date_expiration: ['',[Validators.required,Validators.pattern('^(0[1-9]|1[0-2])\\/([0-9]{2})$')]],
      cod_seg: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(3)]],
      username: [this.user.username]
    });

    this.form_add_account = new FormBuilder().group({
      number: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(10)]],
      name: ['',Validators.required],
      bank: ['',Validators.required],
      type: ['Monetaria',Validators.required],
      username: [this.user.username]
    });

    this.form_recargar_money = new FormBuilder().group({
      amount: ['',Validators.required],
    });

    this.getPacksMoney();
    this.getMyTarjets();
    this.getMyAccountBank();
  }

  getMyTarjets(){
    this.ServiceUser.getTarjets(this.user.username).subscribe((data: any)=>{
      if(data!=null){
        this.tarjets = data;
        console.log(this.tarjets);
      }else{
        this.tarjets = [];
      }
    });
  }

  getMyAccountBank(){
    this.ServiceUser.getMyAccountBank(this.user.username).subscribe((data: any)=>{
      if(data!=null){
        this.accounts = data;
        console.log(this.accounts);
      }
    });
  }

  changeTarjetOrAccount(tarjet_or_account: string){
    this.tarjet_or_account = tarjet_or_account;
  }

  deleteTarjeta(tarjeta: Tarjet){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ServiceUser.deleteTarjet(tarjeta.id).subscribe((data: any)=>{
          if(data!=null){
            Swal.fire(
              'Eliminado!',
              'Tu tarjeta ha sido eliminada.',
              'success'
            );
            this.getMyTarjets();
          }
        });
      }
    });
  }

  deleteAccount(account: AccountBank){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ServiceUser.deleteAccountBank(account.id).subscribe((data: any)=>{
          if(data!=null){
            Swal.fire(
              'Eliminado!',
              'Tu cuenta ha sido eliminada.',
              'success'
            );
            this.getMyAccountBank();
          }
        });
      }
    });
  }

  addMoney(){
  }
  addTarjet(){
    if(this.form_add_tarjet.valid) {
      let tarjet= new Tarjet(
        0,
        this.form_add_tarjet.value.number,
        this.form_add_tarjet.value.name.toUpperCase(),
        this.form_add_tarjet.value.date_expiration,
        this.form_add_tarjet.value.cod_seg,
        this.user.username
      )
      this.ServiceUser.addTarjet(tarjet).subscribe((data: any)=>{
        if(data!=null){
          Swal.fire({
            icon: 'success',
            title: 'Tarjeta agregada',
            showConfirmButton: false,
            timer: 1500
          });
          this.tarjets.push(tarjet);
          this.form_add_tarjet.reset();
        }
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algunos campos no son validos',
      });
      }
    }

  addAccount(){
    if(this.form_add_account.valid) {
      let account_bank= new AccountBank(
        0,
        this.form_add_account.value.number,
        this.form_add_account.value.name.toUpperCase(),
        this.formatoPrimeraLetraMayuscula(this.form_add_account.value.bank),
        this.form_add_account.value.type,
        this.user.username
      )
      this.ServiceUser.addAccountBank(account_bank).subscribe((data: any)=> {
        if (data != null) {
          Swal.fire({
            icon: 'success',
            title: 'Cuenta agregada',
            showConfirmButton: false,
            timer: 1500
          });
          this.accounts.push(account_bank);
          this.form_add_account.reset();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hemos detectado un problema',
          });
        }
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algunos campos no son validos',
      });
      }
  }

  recargarMoneyTarjet(tarjeta: Tarjet){
    Swal.fire({
      title: '¿Cuanto quieres recargar (numero entero)?',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Recargar',
      showLoaderOnConfirm: true,
      preConfirm: (amount) => {
        if(amount.match(/^[0-9]+$/)){
          return amount;
        }else{
          Swal.showValidationMessage('Debe ser un numero entero');
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        let record_recharge = {
          id: 0,
          date: new Date().toLocaleDateString(),
          amount: result.value,
          type: 'Tarjet',
          number: tarjeta.number,
          username: this.user.username
        }
       this.ServiceUser.addRecordRecharge(record_recharge).subscribe((data: any)=>{
         if(data!=null){
           Swal.fire({
             icon: 'success',
             title: 'Recarga exitosa',
             showConfirmButton: true,
           }).then((result) => {
             this.GuestService.getBank(this.user.username).subscribe((data: any)=>{
               if(data!=null) {
                 //seteo el bank al localstorage
                 localStorage.setItem('bank', JSON.stringify(data));
                 this.jalarBankYActualizarVariableDeServicio();
                 this.recargarBankVariable();
               }
             });
           }).then((result) => {
           });
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Hemos detectado un problema',
            });
          }
       });
      }
    })
  }

  recargarMoneyAccount(account: AccountBank){
    Swal.fire({
      title: '¿Cuanto quieres recargar (numero entero)?',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Recargar',
      showLoaderOnConfirm: true,
      preConfirm: (amount) => {
        if(amount.match(/^[0-9]+$/)){
          return amount;
        }else{
          Swal.showValidationMessage('Debe ser un numero entero');
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        let record_recharge = {
          id: 0,
          date: new Date().toLocaleDateString(),
          amount: result.value,
          type: 'Account',
          number: account.number,
          username: this.user.username
        }
        this.ServiceUser.addRecordRecharge(record_recharge).subscribe((data: any)=>{
          if(data!=null){
            Swal.fire({
              icon: 'success',
              title: 'Recarga exitosa',
              showConfirmButton: true,
            }).then((result) => {
              this.GuestService.getBank(this.user.username).subscribe((data: any)=>{
                if(data!=null) {
                //seteo el bank al localstorage
                  localStorage.setItem('bank', JSON.stringify(data));
                  this.jalarBankYActualizarVariableDeServicio();
                  this.recargarBankVariable();
                }
              });
            }).then((result) => {
            });
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Hemos detectado un problema',
            });
          }
        });
      }
    });
  }

  getPacksMoney(){
    this.Service.getPackageMoney().subscribe((data: any)=>{
      if(data!=null){
        this.combos_para_comprar = data;
      }
    });
  }

  formatoPrimeraLetraMayuscula(string: string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  formatCardNumber(value: string){
    return value.toString().match(/.{1,4}/g)?.join(' ');
  }

  editTarjeta(tarjeta: Tarjet){
    this.edit_card = true;
    this.id_seleccionado = tarjeta.id;
    this.opcion_seleccionada = '1';
    this.form_add_tarjet.setValue({
      number: tarjeta.number,
      name: tarjeta.name,
      date_expiration: tarjeta.expiration,
      cod_seg: tarjeta.cvv,
      username: tarjeta.username
    });
  }

  cancelEditTarjeta(){
    this.edit_card = false;
    this.form_add_tarjet.reset();
  }

  editAccount(account: AccountBank){
    this.edit_account = true;
    this.id_seleccionado = account.id;
    this.opcion_seleccionada = '2';
    this.form_add_account.setValue({
      number: account.number,
      name: account.name,
      bank: account.bank,
      type: account.type,
      username: account.username
    });
    }

    cancelEditAccount(){
      this.edit_account = false;
      this.form_add_account.reset();
      this.form_add_account.get('type')?.setValue('Monetaria');
    }

  saveEditAccount(){
    if(this.form_add_account.valid) {
      let account_bank= new AccountBank(
        this.id_seleccionado,
        this.form_add_account.value.number,
        this.form_add_account.value.name.toUpperCase(),
        this.formatoPrimeraLetraMayuscula(this.form_add_account.value.bank),
        this.form_add_account.value.type,
        this.user.username
      )
      this.ServiceUser.updateAccountBank(account_bank).subscribe((data: any)=> {
        if (data != null) {
          Swal.fire({
            icon: 'success',
            title: 'Cuenta actualizada',
            showConfirmButton: false,
            timer: 1500
          });
          this.getMyAccountBank();
          this.cancelEditAccount();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hemos detectado un problema',
          });
        }
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algunos campos no son validos',
      });
    }

  }

  saveEditTarjeta() {
    if (this.form_add_tarjet.valid) {
      let tarjet = new Tarjet(
        this.id_seleccionado,
        this.form_add_tarjet.value.number,
        this.form_add_tarjet.value.name.toUpperCase(),
        this.form_add_tarjet.value.date_expiration,
        this.form_add_tarjet.value.cod_seg,
        this.user.username
      )
      this.ServiceUser.updateTarjet(tarjet).subscribe((data: any) => {
        if (data != null) {
          Swal.fire({
            icon: 'success',
            title: 'Tarjeta actualizada',
            showConfirmButton: false,
            timer: 1500
          });
          this.getMyTarjets();
          this.cancelEditTarjeta();
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algunos campos no son validos',
      });

    }
  }

  buyPackMoney(pack: PackMoney){
    Swal.fire({
      title: '¿Estas seguro de comprar este combo?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Comprar'
    }).then((result) => {
      if (result.isConfirmed) {
        let bank = JSON.parse(localStorage.getItem('bank') || '{}');
        if(pack.price > bank.money){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No tienes suficiente dinero',
          });
          return;
        }
        let record_pack_money = new RecordBuyPack(
          0,
          new Date().toLocaleDateString(),
          pack.name,
          pack.price,
          pack.coins,
          this.user.username
        )
        this.ServiceUser.addRecordPackMoney(record_pack_money).subscribe((data: any)=>{
          if(data!=null){
            Swal.fire({
              icon: 'success',
              title: 'Compra exitosa',
              showConfirmButton: true,
            }).then((result) => {
              this.GuestService.getBank(this.user.username).subscribe((data: any)=>{
                if(data!=null) {
                  //seteo el bank al localstorage
                  localStorage.setItem('bank', JSON.stringify(data));
                  this.jalarBankYActualizarVariableDeServicio();
                  this.recargarBankVariable();
                }
              });
            }).then((result) => {

            });
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Hemos detectado un problema',
            });
          }
        });
      }
    });
  }
  jalarBankYActualizarVariableDeServicio(){
    let bank = JSON.parse(localStorage.getItem('bank') || '{}');
    this.ServiceUser.setCurrentAplicationMoney(bank.volunteer_currency+bank.aplication_currency);
  }

  recargarBankVariable(){
    let bank = JSON.parse(localStorage.getItem('bank') || '{}');
    this.ServiceUser.setCurrentMoney(bank.money);
  }
}
