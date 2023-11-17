import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  userType: number = 0;
  username: string = '';
  private apiUrl = 'http://localhost:4000/api/';
  constructor(private http: HttpClient) { 
// Recuperar el nombre de usuario de localStorage
this.username = localStorage.getItem('username') || '';

  
  
  }


  post(login: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'login', login)
      .pipe(
        tap((result) => {
          console.log('Respuesta del servidor después del login:', result);

          
          this.userType = result.user.tipoUser;
          this.isAuthenticated = true;

          // me toca guaradr el tipo de usuario , por lo que tenemos que la pagina se recarga 
          localStorage.setItem('userType', this.userType.toString());
          localStorage.setItem('user_nombre',result.user.nombre);
          localStorage.setItem('isAuthenticated', 'true');
        }),
        catchError(error => {
          console.log('Error en la autenticación:', error);
          return of(error);
        })
      );
  }

  obtenerLocalStorage() {
    const userTypeString = localStorage.getItem('userType');
   
    if (userTypeString) {
      this.userType = +userTypeString; 
      
    }

    const isAuthenticatedString = localStorage.getItem('isAuthenticated');
    if (isAuthenticatedString) {
      this.isAuthenticated = JSON.parse(isAuthenticatedString);
    }
    
  }

 
  isSuperAdmin(): boolean {
    return this.isAuthenticated && this.userType === 1; // Ajusta según la estructura real de tus tipos de usuario
  }
  isAdmin(): boolean {
    return this.isAuthenticated && this.userType === 2; // Ajusta según la estructura real de tus tipos de usuario
  }

  isResidente(): boolean {
    return this.isAuthenticated && this.userType === 3; // Ajusta según la estructura real de tus tipos de usuario
  }

  logout(): void {
    // Restablecer variables de autenticación
    this.isAuthenticated = false;
    this.userType = 0;

    // Limpiar información en localStorage
    localStorage.removeItem('userType');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user_nombre');
    localStorage.removeItem('username');

    // Redirigir a la página de inicio de sesión o a la página deseada
    // Aquí deberías usar el router de Angular para navegar a la página de inicio de sesión.
    // Puedes inyectar el Router en tu servicio o redirigir desde un componente que haya inyectado el Router.
  }

}


