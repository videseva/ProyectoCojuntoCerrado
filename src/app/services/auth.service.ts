import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  userType: number = 0;

  constructor() { 
    const userTypeFromStorage = sessionStorage.getItem('userType');
    this.userType = userTypeFromStorage !== null ? parseInt(userTypeFromStorage) : 0;
    this.isAuthenticated = this.userType !== 0;
  
  }
  private users = [
    { username: 'superAdmin', password: '000', userType: 1 },
    { username: 'admin', password: '111', userType: 2 },
    { username: 'residente', password: '222', userType: 3 }
  ];
 
  login(username: string, password: string, userType: number): boolean {

    const misUser = this.users.find(user => user.username === username && user.password === password && user.userType === userType);
    console.log('Matched User:', misUser);

    if (misUser) {
      this.isAuthenticated = true;
      this.userType = userType;

       // Almacenar información en sessionStorage o localStorage
    sessionStorage.setItem('userType', userType.toString())


      return true;
    } else {
      this.isAuthenticated = false;
      this.userType = 0;
      sessionStorage.removeItem('userType');
      return false;
    }
  }

  logout(): void {
    // Limpiar la información almacenada en sessionStorage o localStorage
  
  
    this.isAuthenticated = false;
    this.userType = 0;
    sessionStorage.removeItem('userType');

  }
  isSuperAdmin(): boolean {
    console.log('isSuperAdmin', this.isAuthenticated, this.userType);

    return this.isAuthenticated && this.userType === 1;
  }
  isAdmin(): boolean {
    console.log('isAdmin', this.isAuthenticated, this.userType);

    return this.isAuthenticated && this.userType === 2;
  }

  isResidente(): boolean {
    console.log('isResidente', this.isAuthenticated, this.userType);

    return this.isAuthenticated && this.userType === 3;
  }
}


