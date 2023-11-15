import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { usuario } from 'src/app/models/usuario';

import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css'],
})
export class UsersAdminComponent {
  //1° jennifer
  UserForm: FormGroup = new FormGroup({});
  nuevoUser = new usuario();

  userConsult = new usuario();
  listUser: usuario[] = [];
  totalUser: number = 0;

  filtroBusqueda: string = '';
  items = [
    {
      id: 1,
      nombre: 'manuel',
      genero: 1,
      numero: 31244,
      correo: 'manuel@gmail.com',
      direccion: 'mz 6 casa 2',
      tipoUsuario: 1,
    },
    {
      id: 2,
      nombre: 'camila',
      genero: 2,
      numero: 31232,
      correo: 'camila@gmail.com',
      direccion: 'mz f casa 1',
      tipoUsuario: 2,
    },
    {
      id: 3,
      nombre: 'stefanny',
      genero: 2,
      numero: 31145,
      correo: 'stefanny@gmail.com',
      direccion: 'carrera 6 #4a-2',
      tipoUsuario: 3,
    },
    // ... otros elementos
  ];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

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
      direccion: ['', [Validators.required]],
    });
  }

  saveUser() {
    if (this.UserForm.valid) {
      const nuevoUser: usuario = {
        id: 0,
        idCuenta: 1,
        nombre: this.UserForm.value.nombre,
        genero: this.UserForm.value.genero,
        telefono: this.UserForm.value.telefono,
        correo: this.UserForm.value.correo,
        direccion: this.UserForm.value.direccion,
        tipoUsuario: 3,
        estado: 1,
        date: '',
      };

      // alerta
      this.userService.post(this.nuevoUser).subscribe((result) => {
        if (result != null) {
          // alerta
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully',
          });
        }
      });
      //6° reinicio el formulario reactivo
      this.UserForm.reset();
      console.log(nuevoUser);
    }
  }
  consultUser() {
    this.userService.get().subscribe((result) => {
      this.listUser = result;
      this.totalUser = this.listUser.length;
    });
  }
  consultUserId() {
    this.userService.getId(this.nuevoUser.id).subscribe((result) => {
      this.userConsult = result;
    });
  }
  updateUser() {
    this.userService
      .put(this.nuevoUser.id, this.nuevoUser)
      .subscribe((result) => {
        //Se colcoa la alerta
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger',
          },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons
          .fire({
            title: 'Estás Seguro?',
            text: 'No Podrás Revertir Esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'No, Cancelar!',
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire({
                title: 'Eliminado!',
                text: 'Su Archivo se ha Eliminado.',
                icon: 'success',
              });
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: 'Cancelado',
                text: 'Tu Archivo está a salvo :)',
                icon: 'error',
              });
            }
          });
      });
  }
  deleteUser() {
    this.userService
      .delete(this.nuevoUser.id, this.nuevoUser)
      .subscribe((result) => {
        //Se colcoa la alerta
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger',
          },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons
          .fire({
            title: 'Estás Seguro?',
            text: 'No Podrás Revertir Esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'No, Cancelar!',
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire({
                title: 'Eliminado!',
                text: 'Su Archivo se ha Eliminado.',
                icon: 'success',
              });
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: 'Cancelado',
                text: 'Tu Archivo está a salvo :)',
                icon: 'error',
              });
            }
          });
      });
  }

  filtrarItems() {
    return this.items.filter(
      (item) =>
        item.nombre.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
        item.id.toString().includes(this.filtroBusqueda.toLowerCase()) ||
        item.tipoUsuario.toString().includes(this.filtroBusqueda.toLowerCase())
    );
  }
}
