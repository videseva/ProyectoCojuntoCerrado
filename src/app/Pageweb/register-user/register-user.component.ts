import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { cuenta } from 'src/app/models/cuenta';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  // services cuenta y user 
cuentaFrom : FormGroup = new FormGroup({});
nuevaCuenta = new cuenta();

totalAccounts: number = 0;
items:cuenta[]=[];


constructor(private formBuilder: FormBuilder, private accountService: AccountService) { }
ngOnInit() {

  //3° Paso inicializar el formulario
  
}
private inicializarFormulario() {
  this.cuentaFrom = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    correo: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    // Agrega más campos según tus necesidades
  });
}

saveCategory() {
  if (this.cuentaFrom.valid) {
        this.nuevaCuenta.nombre = this.cuentaFrom.value.nombre,
        this.nuevaCuenta.telefono= this.cuentaFrom.value.telefono,
        this.nuevaCuenta.correo= this.cuentaFrom.value.correo,
        this.nuevaCuenta.direccion= this.cuentaFrom.value.direccion,
        this.nuevaCuenta.estado= 1,
        this.nuevaCuenta.date= '',

    this.accountService.post(this.nuevaCuenta).subscribe((result) => {
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
