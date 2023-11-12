import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';

import { zonaComun } from '../models/zona-comun';

@Injectable({
  providedIn: 'root'
})
export class ZoneCommonService {
  private apiUrl = 'http://localhost:8000';
  constructor(private http: HttpClient) { }

  post(zonaComun : zonaComun): Observable<zonaComun>{
    return this.http.post<zonaComun>(this.apiUrl+ '/zonaComun', zonaComun)
    .pipe(
      tap(_ => console.log('zonaComun registrado')),
      catchError(error =>{
          console.log(error)
          return of(error)
      })
    );
  }

  get(): Observable <zonaComun[]>{
    return this.http.get<zonaComun[]>(this.apiUrl +'api/zonaComun').pipe(
      tap(_ => console.log('Datos Encontrado')),
      catchError(error =>{
        console.log("error al buscar")
        return of(error as zonaComun[])
      })
      );
  }

  getId(id: number): Observable<zonaComun>{
    return this.http.get<zonaComun>(this.apiUrl + 'api/zonaComun/'+id)
    .pipe(
      tap(_ => console.log('consultado')),
      catchError(error =>{
        console.log(error)
        return of(error )
      })
    );
  }


  put(id: Number, zonaComun : zonaComun):Observable <zonaComun> {
    id =zonaComun.id;
    return this.http.put<zonaComun>(this.apiUrl +'api/zonaComun/'+id,zonaComun).pipe(
      tap(_ => console.log('Datos Encontrado')),
      catchError(error =>{
        console.log("error al buscar")
        return of(error as zonaComun)
      })
      );
  }
  delete(id: number, zonaComun:zonaComun): Observable<zonaComun> {
    return this.http.delete<zonaComun>(this.apiUrl + 'api/zonaComun/' + id).pipe(
      tap(_ => console.log('Datos Eliminados')),
      catchError(error => {
        console.log("Error al eliminar");
        return of(error as zonaComun);
      })
    );
  }



}
