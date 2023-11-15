import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { zonaComun } from 'src/app/models/zona-comun';
import { ZoneCommonService } from 'src/app/services/zone-common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-zone-admin',
  templateUrl: './zone-admin.component.html',
  styleUrls: ['./zone-admin.component.css']
})
export class ZoneAdminComponent {

   //1° jennifer
   zonaForm: FormGroup = new FormGroup({});
   nuevoZona = new zonaComun();
   zonaUpdate = new zonaComun();
    
   //2° paso dos inicializar constructor
   constructor(private formBuilder: FormBuilder,private zoneCommonService: ZoneCommonService) {}
 
   ngOnInit() {
     
     //3° Paso inicializar el formulario
       this.inicializarFormulario();
     }
 
     private inicializarFormulario() {
       this.zonaForm = this.formBuilder.group({
         nombre: ['', [Validators.required]],
         capacidad: ['', [Validators.required]],
         idCategoria: ['', [Validators.required]],
         foto: ['mi foto', [Validators.required]],
         descripcion: ['', [Validators.required]],
       });
     }
 

  saveZona(){

    if (this.zonaForm.valid) {
      const nuevoZona: zonaComun = {
        id:0,
        idCuenta: 1,
        nombre: this.zonaForm.value.nombre,
        capacidad: this.zonaForm.value.capacidad,
        idCategoria: this.zonaForm.value.idCategoria,
        estado:1,
        foto: this.zonaForm.value.foto,
        descripcion: this.zonaForm.value.descripcion,
        date: ""

      };
        // alerta
        this.zoneCommonService.post(this.nuevoZona).subscribe(result => {
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
    this.zonaForm.reset();
      console.log(nuevoZona);
    } 

  }


  deletezone(){
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

  zonaCategory(){}

}
