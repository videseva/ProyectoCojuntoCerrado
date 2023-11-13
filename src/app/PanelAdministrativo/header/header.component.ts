import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
constructor(private authService: AuthService,private router: Router){}



  logout(): void {
    this.authService.logout();
    // Puedes redirigir a la página de inicio o a donde desees después de cerrar sesión
    this.router.navigate(['/page-web.component']);
  }

}
