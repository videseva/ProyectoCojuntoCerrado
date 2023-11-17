import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria';
import { zonaComun } from 'src/app/models/zona-comun';
import { CategoryService } from 'src/app/services/category.service';
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
  items: zonaComun[] = [];
  itemsCategory: Categoria[] = [];
  totalZone = 0;
  filtroBusqueda: string = '';
  //2° paso dos inicializar constructor
  constructor(private formBuilder: FormBuilder, private zoneCommonService: ZoneCommonService, private categoryService: CategoryService) { }

  ngOnInit() {
    //3° Paso inicializar el formulario
    this.inicializarFormulario();
    this.consultZone();
    this.consultCategoryCuenta();
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
  saveZona() {

    if (this.zonaForm.valid) {
      const nuevoZona: zonaComun = {
        id: 0,
        idCuenta: 0,
        nombre: this.zonaForm.value.nombre,
        capacidad: this.zonaForm.value.capacidad,
        idCategoria: this.zonaForm.value.idCategoria,
        estado: 0,
        foto: this.zonaForm.value.foto,
        descripcion: this.zonaForm.value.descripcion,
        disponibilidad: "",
        noPermitido: "",
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
  consultZone() {
    this.zoneCommonService.get().subscribe(result => {
      this.items = result;
      this.totalZone = this.items.length;
    });
  }
  deleteZone(item: any) {
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
  filtrarItems() {
    return this.items.filter(item =>
      item.nombre.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
      item.id.toString().includes(this.filtroBusqueda.toLowerCase())
    );
  }

  consultCategoryCuenta() {
    this.categoryService.get().subscribe(result => {
      this.itemsCategory = result;
      console.log(this.itemsCategory)
    });
  }
}
