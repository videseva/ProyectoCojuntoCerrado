import { Data } from "@angular/router";

export class Reserva {
   
    nombre: string;
    direccion: string;
    descripcion: string;
    capacidad: number;
    horario: string;
    estado: number;

    constructor(
        nombre: string,
        direccion: string,
        descripcion: string,
        capacidad: number,
        horario: string,
        estado: number
    ) {
       
        this.nombre = nombre || '';
        this.direccion = direccion || '';
        this.descripcion = descripcion || '';
        this.capacidad = capacidad || 0;
        this.horario = horario || '';
        this.estado = estado || 0;
    }

}
