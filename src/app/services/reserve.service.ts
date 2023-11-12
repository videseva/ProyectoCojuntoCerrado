import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';

import { reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {
  private apiUrl = 'http://localhost:8000';
  constructor(private http: HttpClient) { }

  post(reserva : reserva): Observable<reserva>{
    return this.http.post<reserva>(this.apiUrl+ '/reservas', reserva)
    .pipe(
      tap(_ => console.log('Reserva registrada')),
      catchError(error =>{
          console.log(error)
          return of(error)
      })
    );
  }

  get(): Observable <reserva[]>{
    return this.http.get<reserva[]>(this.apiUrl +'api/reservas').pipe(
      tap(_ => console.log('Datos Encontrado')),
      catchError(error =>{
        console.log("error al buscar")
        return of(error as reserva[])
      })
      );
  }

  getId(id: number): Observable<reserva>{
    return this.http.get<reserva>(this.apiUrl + 'api/reservas/'+id)
    .pipe(
      tap(_ => console.log('consultado')),
      catchError(error =>{
        console.log(error)
        return of(error )
      })
    );
  }

  put(id: Number, reserva : reserva):Observable <reserva> {
    id =reserva.id;
    return this.http.put<reserva>(this.apiUrl +'api/reservas/'+id,reserva).pipe(
      tap(_ => console.log('Datos Encontrado')),
      catchError(error =>{
        console.log("error al buscar")
        return of(error as reserva)
      })
      );
  }

  delete(id: number,reserva: reserva): Observable<reserva> {
    return this.http.delete<reserva>(this.apiUrl + 'api/reservas/' + id).pipe(
      tap(_ => console.log('Datos Eliminados')),
      catchError(error => {
        console.log("Error al eliminar");
        return of(error as reserva);
      })
    );
  }


}
