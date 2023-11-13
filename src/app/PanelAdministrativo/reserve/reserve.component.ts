import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { reserva } from 'src/app/models/reserva';
import { ReserveService } from 'src/app/services/reserve.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent {

  reserveFrom: FormGroup = new FormGroup({});
  nuevaReserva = new reserva(0,"","","",0,"",0);

  reserveConsult =  new reserva(0,"","","",0,"",0);
  listReserver: reserva[] =[];
  totalReserver : number= 0;

  filtroBusqueda: string = '';
  items = [
    { id: 1, nombre: 'cumpleaños' , direccion: 'calle 4 #5c-9', descripcion: 'reserva de salon social para cumpleaño de un niño', capacidad: 40, horario:'9:00 am', estado : 1},
    { id: 2, nombre: 'Baustizo' , direccion: 'mz 4 casa 6', descripcion: 'reserva salon social para el festejo de un baustizo de una niña ', capacidad: 50, horario:'3:00 pm', estado : 2},
    { id: 3, nombre: 'Primera comunion' , direccion: 'mz f casa 9', descripcion: 'reserva salon social', capacidad: 60, horario:'10:00 am', estado : 2},
    { id: 4, nombre: 'Primera comunion' , direccion: 'mz f casa 9', descripcion: 'reserva salon social', capacidad: 60, horario:'10:00 am', estado : 3}

    // ... otros elementos
  ];


  constructor(private formBuilder: FormBuilder,private reserverService: ReserveService) {}

  ngOnInit() {
    

    //3° Paso inicializar el formulario
      this.inicializarFormulario();
    }

    
   //4° crear el formulario reactivo 
  private inicializarFormulario() {
    this.reserveFrom = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      capacidad: ['', [Validators.required]],
      horario: ['', [Validators.required]]
      // Agrega más campos según tus necesidades
    });
  }


  saveReserver(){

    if (this.reserveFrom.valid) {
      const nuevaReserva: reserva = {
        id: 0, 
        nombre: this.reserveFrom.value.nombre,
        direccion: this.reserveFrom.value.direccion,
        descripcion: this.reserveFrom.value.descripcion,
        capacidad: this.reserveFrom.value.capacidad,
        horario: this.reserveFrom.value.horario,
        estado:1
      };


        // alerta
        this.reserverService.post(this.nuevaReserva).subscribe(result => {
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
    this.reserveFrom.reset();
      console.log(nuevaReserva);
    } 
    
  }

  consultReserver(){
    this.reserverService.get().subscribe(result => {
      this.listReserver= result;
      this.totalReserver =this.listReserver.length;
    });

  }

  consultReserverId(){
    this.reserverService.getId(this.nuevaReserva.id).subscribe(result => {
      this.reserveConsult= result;
    }); 
  }
  updateReserver() {
    this.reserverService.put(this.nuevaReserva.id ,this.nuevaReserva).subscribe(result => {
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
  deleteReserver() {
    this.reserverService.delete(this.nuevaReserva.id, this.nuevaReserva).subscribe(result => {
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
      item.id.toString().includes(this.filtroBusqueda.toLowerCase())||
      item.estado.toString().includes(this.filtroBusqueda.toLowerCase())
    );
  }

}

