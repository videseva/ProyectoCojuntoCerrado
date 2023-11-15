import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cuenta } from '../models/cuenta';
import { Observable, catchError, of, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:4000/api/';
  constructor(private http: HttpClient) { }

  post(cuenta : cuenta): Observable<cuenta>{
    return this.http.post<cuenta>(this.apiUrl+ 'store-account', cuenta)
    .pipe(
      tap(_ => console.log('cuenta registrado')),
      catchError(error =>{
          console.log(error)
          return of(error)
      })
    );
  }

  get(): Observable <cuenta[]>{
    return this.http.get<cuenta[]>(this.apiUrl +'list-account').pipe(
      tap(_ => console.log('Datos Encontrado')),
      catchError(error =>{
        console.log("error al buscar")
        return of(error as cuenta[])
      })
      );
  }

  getId(id: number): Observable<cuenta>{
    return this.http.get<cuenta>(this.apiUrl + 'account/'+id)
    .pipe(
      tap(_ => console.log('consultado')),
      catchError(error =>{
        console.log(error)
        return of(error)
      })
    );
  }

  put(id: Number, cuenta : cuenta):Observable <cuenta> {
    id =cuenta.id;
    return this.http.put<cuenta>(this.apiUrl +'edit-account/' +id ,cuenta).pipe(
      tap(_ => console.log('Datos Encontrado')),
      catchError(error =>{
        console.log("error al buscar")
        return of(error as cuenta)
      })
      );
  }

  delete(id: number, cuenta: cuenta): Observable<cuenta> {
    return this.http.delete<cuenta>(this.apiUrl + 'delete-account/' + id).pipe(
      tap(_ => console.log('Datos Eliminados')),
      catchError(error => {
        console.log("Error al eliminar");
        return of(error as cuenta);
      })
    );
  }



}
