import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { cuenta } from 'src/app/models/cuenta';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NEVER } from 'rxjs';
import { usuario } from 'src/app/models/usuario';
import { UserService } from 'src/app/services/user.service';
import { AlertaService } from 'src/app/services/alerta.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent   {

  // services cuenta y user 
cuentaFrom : FormGroup = new FormGroup({});
nuevaCuenta = new cuenta();
nuevouser = new usuario();


totalAccounts: number = 0;
items:cuenta[]=[];

filtroBusqueda: string = '';



constructor(private formBuilder: 
  FormBuilder, private accountService: AccountService, 
  private UserService: UserService,
  private alertaService: AlertaService 
  ) { }

  ngOnInit() {
    //3° Paso inicializar el formulario
    this.inicializarFormulario();
  }

private inicializarFormulario() {
  this.cuentaFrom = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    genero: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    correo: ['', [Validators.required]],
    contrasena: ['', [Validators.required]],
    

    // Agrega más campos según tus necesidades
  });
}

saveCuenta() {
  if (this.cuentaFrom.valid) {
    const commonData = {  
      nombre: this.cuentaFrom.value.nombre,
      telefono: this.cuentaFrom.value.telefono,
      correo: this.cuentaFrom.value.correo,
      direccion: this.cuentaFrom.value.direccion,
      estado: 1,
      date: '',
    };

    // Crear instancia de Cuenta
    this.nuevaCuenta = Object.assign(new cuenta(), commonData);

    console.log('Nueva Cuenta:', this.nuevaCuenta);

    // Crear instancia de Usuario
    this.nuevouser = Object.assign(new usuario(), commonData, {
      genero: this.cuentaFrom.value.genero,
      tipoUsuario: 2,
      contrasena: this.cuentaFrom.value.contrasena,
    });

    console.log('Nuevo Usuario:', this.nuevouser);

    // Llamar al servicio para guardar la cuenta
    this.accountService.post(this.nuevaCuenta).subscribe((result) => {
      if (result != null) {
       this.alertaService.alertaGuardar('Cuenta guardada exitosamente');
      }
    });

    // Llamar al servicio para guardar el usuario
    this.UserService.post(this.nuevouser).subscribe((result) => {
      if (result != null) {
      
        console.log("Usuario guardado exitosamente");
      }
    });

    // Reiniciar el formulario reactivo
    this.cuentaFrom.reset();

    console.log(this.nuevaCuenta);
  }
}

consultarCuenta() {
  this.accountService.get().subscribe(result => {
    this.items = result;
    console.log(this.items)
    this.totalAccounts = this.items.length;
  });

}

}
