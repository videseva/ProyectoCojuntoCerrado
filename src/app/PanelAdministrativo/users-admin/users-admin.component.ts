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
  userUpdate = new usuario();

  userConsult = new usuario();
  listUser: usuario[] = [];
  totalUser: number = 0;

  filtroBusqueda: string = '';
  items : usuario[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    //3° Paso inicializar el formulario
    this.inicializarFormulario();
    this.consultUser();
  }

  private inicializarFormulario() {
    this.UserForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
    });
  }

  saveUser() {
    if (this.UserForm.valid) {
     
        
        this.nuevoUser.idCuenta= 1,
        this.nuevoUser.nombre = this.UserForm.value.nombre,
        this.nuevoUser.genero= this.UserForm.value.genero,
        this.nuevoUser.telefono= this.UserForm.value.telefono,
        this.nuevoUser.correo= this.UserForm.value.correo,
        this.nuevoUser.direccion= this.UserForm.value.direccion,
        this.nuevoUser.tipoUsuario= 3,
        this.nuevoUser.estado= 1,
        this.nuevoUser.date= '',
      

      // alerta
      this.userService.post(this.nuevoUser).subscribe((result) => {
        if (result != null) {
          this.consultUser();
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
      console.log(this.nuevoUser);
    }
  }
  consultUser() {
    this.userService.get().subscribe(result => {
      this.items = result;
      
      this.totalUser = this.items.length;
    });
  }
  consultUserId() {
    this.userService.getId(this.nuevoUser.id).subscribe(result => {
      this.userConsult = result;
    });
  }
  verUsers(item:any){
    this.userUpdate = item;
  }
  updateUser() {
    this.userService
      .put(this.userUpdate.id, this.userUpdate)
      .subscribe(result => {
        this.userUpdate = result;
        this.consultUser();
       
        
  });
}
  deleteUser(item: any) {
    this.nuevoUser = item;
    
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
              this.userService.delete(this.nuevoUser.id, this.nuevoUser).subscribe(result => {
                this.consultUser();
              });
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
