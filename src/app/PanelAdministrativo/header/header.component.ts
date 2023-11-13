import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
constructor(public authService: AuthService,private router: Router){}
  username: string = '';


  ngOnInit(): void {
    // Obtener el nombre de usuario almacenado en localStorage
    const storedUsername = localStorage.getItem('username');
    this.username = storedUsername || '';  // Si no hay nombre de usuario almacenado, establece una cadena vacía
  }



  logout(): void {

    this.authService.logout();
    // Puedes redirigir a la página de inicio o a donde desees después de cerrar sesión
    this.router.navigate(['/page-web.component']);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Se",
      showConfirmButton: false,
      timer: 1500
    });
  }

  

}
