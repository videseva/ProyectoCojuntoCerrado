import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { categoria } from 'src/app/models/categoria';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.css']
})
export class CategoryAdminComponent  {
  //1° paso crear el formulario
  // Después e inicializo la variables
  categoryForm: FormGroup = new FormGroup({});
  nuevaCategoria = new categoria(0,"",0);

  //2° Paso colocar en el cosntructor private formBuilder: FormBuilder
  constructor(private formBuilder: FormBuilder) {}

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
  saveCategory() {
    if (this.categoryForm.valid) {
      const nuevaCategoria: categoria = {
        id: 0, 
        nombre: this.categoryForm.value.nombre,
        estado:1
      };
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
    //6° reinicio el formulario reactivo 
    this.categoryForm.reset();
      console.log(nuevaCategoria);
    } 
  }

  DeleteCategory() {
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
  }

}
