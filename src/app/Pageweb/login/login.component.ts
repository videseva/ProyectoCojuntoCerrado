import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      userType: [] // Valor predeterminado para el tipo de usuario
    });
   
  }
  onSubmit() {
    this.authService.logout();
    if (this.loginForm.valid) {
      console.log('Formulario válido:', this.loginForm.valid);
      const { username, password, userType } = this.loginForm.value;
      console.log('Valores del formulario:', username, password, userType);
      const calculatedUserType = this.calculateUserType(username);
      console.log('Calculated userType:', calculatedUserType);

      if (this.authService.login(username, password, calculatedUserType)) {
        console.log('Inicio de sesión exitoso');
        console.log('AuthService isAuthenticated:', this.authService.isAuthenticated);
console.log('AuthService userType:', this.authService.userType);
        this.router.navigate(['/home']); 
      } else {
        // Manejar error de inicio de sesión
        this.errorMessage = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
      }
    } else {

      this.errorMessage = 'Por favor, completa todos los campos.';
    }
  }
 
  private calculateUserType(username: string): number {
    if (username === 'superAdmin') {
      return 1;
    } else if (username === 'admin') {
      return 2;
    } else if (username === 'residente') {
      return 3;
    } else {
      return 0; // Valor predeterminado o manejar el caso de usuario no reconocido
    }
  }
  
  

}







