import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';

import { categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8000';
  constructor(private http: HttpClient) { }

  
  post(user : categoria): Observable<categoria>{
    return this.http.post<categoria>(this.apiUrl+ '/categorys', categoria)
    .pipe(
      tap(_ => console.log('categoria registrado')),
      catchError(error =>{
          console.log(error)
          return of(error)
      })
    );
  }

  get(): Observable <categoria[]>{
    return this.http.get<categoria[]>(this.apiUrl +'api/categorys').pipe(
      tap(_ => console.log('Datos Encontrado')),
      catchError(error =>{
        console.log("error al buscar")
        return of(error as categoria[])
      })
      );
  }

  getId(id: number): Observable<categoria[]>{
    return this.http.get<categoria[]>(this.apiUrl + 'api/categorys/'+id)
    .pipe(
      tap(_ => console.log('consultado')),
      catchError(error =>{
        console.log("error al consultar")
        return of(error as categoria[])
      })
    );
  }


  put(id: Number, categoria : categoria):Observable <categoria> {
    id =categoria.id;
    return this.http.put<categoria>(this.apiUrl +'api/categorys/'+id,categoria).pipe(
      tap(_ => console.log('Datos Encontrado')),
      catchError(error =>{
        console.log("error al buscar")
        return of(error as categoria)
      })
      );
  }
  delete(id: number): Observable<categoria> {
    return this.http.delete<categoria>(this.apiUrl + 'api/categorys/' + id).pipe(
      tap(_ => console.log('Datos Eliminados')),
      catchError(error => {
        console.log("Error al eliminar");
        return of(error as categoria);
      })
    );
  }
  

}
