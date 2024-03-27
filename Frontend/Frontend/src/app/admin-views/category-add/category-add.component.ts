import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../../../service/admin_service/admin.service";
import Swal from "sweetalert2";
import {Category} from "../../../models/Category";

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
public categoryForm!: FormGroup;
public categories: Category[] = [];
  displayedColumns: string[] = ['id','category_name'];
  constructor(
    private Service: AdminService
  ) {}

  ngOnInit(): void {
    this.categoryForm = new FormBuilder().group({
      categoryName: [null, Validators.required]
    });
    this.getAllCategories();
  }


  addCategory() {
    if(this.categoryForm.valid) {
      let categoryName = this.formatCapitalize(this.categoryForm.get('categoryName')?.value);
      //Verifico que no exista la categoria
      this.Service.findCategory(categoryName).subscribe((data: any) => {
        if (data!=null) {
          Swal.fire({
            title: 'Error!',
            text: 'La categoria ya existe!',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        } else {
          this.Service.addCategory(categoryName).subscribe((data: any) => {
            Swal.fire({
              title: 'Perfecto!',
              text: 'Categoria creada con exito!',
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then((result) => {
              this.getAllCategories();
              this.categoryForm.reset();
            });
          });
        }
      });
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, rellene todos los campos!',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }


  getAllCategories(){
    this.Service.getCategories().subscribe((data: any) => {
      if(data != null){
        this.categories = data;
      }
    });
  }

  formatCapitalize(text: string){
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}
