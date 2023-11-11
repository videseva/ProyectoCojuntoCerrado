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
      this.listReserver = result;
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
    this.reserverService.delete(this.nuevaReserva.id).subscribe(result => {
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


}

