import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { reserva } from 'src/app/models/reserva';
import { usuario } from 'src/app/models/usuario';
import { ReserveService } from 'src/app/services/reserve.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent {

  //1° jennifer
  UserForm: FormGroup = new FormGroup({});
  nuevoUser = new usuario(0,"",0,0,"","");

  userConsult = new usuario(0,"",0,0,"","");
  listUser: usuario[] =[];
  totalUser : number= 0;

  constructor(private formBuilder: FormBuilder,private userService: UserService) {}
 
  ngOnInit() {
    
    //3° Paso inicializar el formulario
      this.inicializarFormulario();
    }

    private inicializarFormulario() {

      this.UserForm = this.formBuilder.group({
       
        nombre: ['', [Validators.required]],
        genero: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        correo: ['', [Validators.required]],
        direccion: ['', [Validators.required]]
      
      });
    }



  saveUser(){

    if (this.UserForm.valid) {
      const nuevaReserva: reserva = {
        id: 0, 
        nombre: this.UserForm.value.nombre,
        direccion: this.UserForm.value.direccion,
        descripcion: this.UserForm.value.descripcion,
        capacidad: this.UserForm.value.capacidad,
        horario: this.UserForm.value.horario,
        estado:1
      };


        // alerta
        this.userService.post(this.nuevoUser).subscribe(result => {
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
    this.UserForm.reset();
      console.log(nuevaReserva);
    } 

  }
  consultUser(){
    this.userService.get().subscribe(result => {
      this.listUser = result;
      this.totalUser =this.listUser.length;
    });

  }
  consultUserId(){
    this.userService.getId(this.nuevoUser.id).subscribe(result => {
      this.userConsult = result;
    }); 
  }
  updateUser() {
    this.userService.put(this.nuevoUser.id ,this.nuevoUser).subscribe(result => {
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
  deleteUser() {
    this.userService.delete(this.nuevoUser.id ,this.nuevoUser).subscribe(result => {
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
