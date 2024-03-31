import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {AdminService} from "../../../../service/admin_service/admin.service";
import {PackMoney} from "../../../models/PackMoney";

@Component({
  selector: 'app-package-money-add',
  templateUrl: './package-money-add.component.html',
  styleUrls: ['./package-money-add.component.css']
})
export class PackageMoneyAddComponent implements OnInit{
  public combos_para_comprar: any = [
    {
      id: 1,
      name: 'Combo 1',
      price: 100,
      description: 'Combo 1',
      coins: 100,
      image: ''
    },
    {
      id: 2,
      name: 'Combo 2',
      price: 200,
      description: 'Combo 2',
      coins: 200,
      image: ''
    }
  ]

  public form_combo!:FormGroup;
  public add_or_editar: string = 'Añadir';
  public combo_editar!:PackMoney;
  constructor(
    private ServiceAdmin: AdminService,
  ) { }
  ngOnInit(): void {
    this.form_combo = new FormBuilder().group({
      name: ['', Validators.required],
      price: ['',[Validators.required, Validators.pattern('[0-9]+')]],
      description: ['', Validators.required],
      coins: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    });
    this.getAllCombos();
  }

  getAllCombos(){
    this.ServiceAdmin.getPackageMoney().subscribe((data: any) => {
      if(data!=null){
        this.combos_para_comprar = data;
        this.form_combo.reset();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Parece que no hay combos'
          });
          this.combos_para_comprar = [];
      }
      }
    );
  }

  limpiaForm(){
    this.form_combo.reset();
    this.add_or_editar = 'Añadir';
  }

  editarCombo(combo: PackMoney){
    this.add_or_editar = 'Editar';
    this.combo_editar = combo;
    this.form_combo.setValue({
      name: combo.name,
      price: combo.price,
      description: combo.description,
      coins: combo.coins
    });
  }

  add_combo(){
    if(this.form_combo.valid){
      let combo= new PackMoney(
        0,
        this.form_combo.value.name,
        this.form_combo.value.price,
        this.form_combo.value.description,
        this.form_combo.value.coins
      );
      this.ServiceAdmin.addPackageMoney(combo).subscribe((data: any) => {
        if(data!=null){
          Swal.fire({
            icon: 'success',
            title: 'Combo',
            text: 'Combo añadido correctamente'
          });
          this.getAllCombos();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo añadir el combo'
          });
        }
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor llene todos los campos'
      });
      }
  }

  save_edit_combo(){
    if(this.form_combo.valid){
      let combo= new PackMoney(
        this.combo_editar.id,
        this.form_combo.value.name,
        this.form_combo.value.price,
        this.form_combo.value.description,
        this.form_combo.value.coins
      );
      this.ServiceAdmin.updatePackageMoney(combo).subscribe((data: any) => {
        if(data!=null){
          Swal.fire({
            icon: 'success',
            title: 'Combo',
            text: 'Combo editado correctamente'
          });
          this.getAllCombos();
          this.add_or_editar = 'Añadir';
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo editar el combo'
          });
        }
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor llene todos los campos'
      });
    }
  }

  deleteCombo(combo: PackMoney){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ServiceAdmin.deletePackageMoney(combo.id).subscribe((data: any) => {
          if(data!=null){
            Swal.fire(
              'Borrado!',
              'El combo ha sido eliminado.',
              'success'
            );
            this.getAllCombos();
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el combo'
            });
          }
        });
      }
    });
  }

}
