import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { categoria } from 'src/app/models/categoria';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.css']
})
export class CategoryAdminComponent {
  //1° paso crear el formulario
  // Después e inicializo la variables
  categoryForm: FormGroup = new FormGroup({});
  nuevaCategoria = new categoria(0, "", 0);

  //Gley 1° paso declara ñas variables que vas usar
  categoriaConsult = new categoria(0, "", 0);
  listCategory: categoria[] =[];
  totalCategory : number= 0;
  item: categoria[] =[];

  //Eva
  filtroBusqueda: string = '';
  items = [
    { id: 1, nombre: 'Ejecutiva' ,estado : 1},
    { id: 4, nombre: 'Ejecutivamosnis' ,estado : 1},
    { id: 2, nombre: 'Recreacional' ,estado : 1},
    { id: 3, nombre: 'Clasica',estado : 2}
    // ... otros elementos
  ];


  //2° Paso colocar en el cosntructor private formBuilder: FormBuilder
  //Gley coloca en el consturctor el services que vas utilizar
  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService) { }
  ngOnInit() {

    //3° Paso inicializar el formulario
    this.inicializarFormulario();
  }

  //4° crear el formulario reactivo 
  private inicializarFormulario() {
    this.categoryForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      // Agrega más campos según tus necesidades
    });
  }

  //5° crear el formulario reactivo 
  //Gley 3° paso modifica el metood guardar
  saveCategory() {
    if (this.categoryForm.valid) {
      const nuevaCategoria: categoria = {
        id: 0,
        nombre: this.categoryForm.value.nombre,
        estado: 1
      };

      //Para Glrey: 2 paso metodo guardar
      this.categoryService.post(this.nuevaCategoria).subscribe(result => {
        if (result != null) {
          
          // alerta
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Signed in successfully"
          });
        }
      });
      //6° reinicio el formulario reactivo 
      this.categoryForm.reset();
      console.log(nuevaCategoria);
    }
  }
 //Gley 4° paso crea el metodo consultar
  consultCategory(){
    this.categoryService.get().subscribe(result => {
      this.listCategory = result;
      this.totalCategory =this.listCategory.length;
    });

  }
//Gley 5° paso crea el metodo consultar por id
  consultCategoryId(){
    this.categoryService.getId(this.nuevaCategoria.id).subscribe(result => {
      this.categoriaConsult = result;
    }); 
  }
//Gley 6° paso crea el metodo actualizar 
  updateCategory() {
    this.categoryService.put(this.nuevaCategoria.id ,this.nuevaCategoria).subscribe(result => {
      //Se colcoa la alerta 
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Estás Seguro?",
        text: "No Podrás Revertir Esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, Eliminar!",
        cancelButtonText: "No, Cancelar!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Eliminado!",
            text: "Su Archivo se ha Eliminado.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "Tu Archivo está a salvo :)",
            icon: "error"
          });
        }
      });
    });
  }
//Gley 7° paso crea el metodo actualizar 
  deleteCategory() {
    this.categoryService.delete(this.nuevaCategoria.id ,this.nuevaCategoria).subscribe(result => {
      //Se colcoa la alerta 
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Estás Seguro?",
        text: "No Podrás Revertir Esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, Eliminar!",
        cancelButtonText: "No, Cancelar!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Eliminado!",
            text: "Su Archivo se ha Eliminado.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "Tu Archivo está a salvo :)",
            icon: "error"
          });
        }
      });
    });
  }

  filtrarItems() {
    return this.items.filter(item =>
      item.nombre.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) || 
      item.id.toString().includes(this.filtroBusqueda.toLowerCase())
    );
  }

}
