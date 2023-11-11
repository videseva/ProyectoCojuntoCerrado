import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';

import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000';
  constructor(private http: HttpClient) { }

  post(user : Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.apiUrl+ '/users', user)
    .pipe(
      tap(_ => console.log('Usuario registrado')),
      catchError(error =>{
          console.log(error)
          return of(error)
      })
    );
  }

  get(): Observable <Usuario[]>{
    return this.http.get<Usuario[]>(this.apiUrl +'api/users').pipe(
      tap(_ => console.log('Datos Encontrado')),
      catchError(error =>{
        console.log("error al buscar")
        return of(error as Usuario[])
      })
      );
  }

  getId(id: number): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.apiUrl + 'api/Oferta/'+id)
    .pipe(
      tap(_ => console.log('consultado')),
      catchError(error =>{
        console.log("error al consultar")
        return of(error as Usuario[])
      })
    );
  }


  put(id: Number, usuario : Usuario):Observable <Usuario> {
    id =usuario.id;
    return this.http.put<Usuario>(this.apiUrl +'api/users/'+id,usuario).pipe(
      tap(_ => console.log('Datos Encontrado')),
      catchError(error =>{
        console.log("error al buscar")
        return of(error as Usuario)
      })
      );
  }
  delete(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(this.apiUrl + 'api/users/' + id).pipe(
      tap(_ => console.log('Datos Eliminados')),
      catchError(error => {
        console.log("Error al eliminar");
        return of(error as Usuario);
      })
    );
  }
  


}
