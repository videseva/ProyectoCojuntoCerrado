import { Data } from "@angular/router";

export class reserva {
   
    id: number;
    nombre: string;
    direccion: string;
    descripcion: string;
    capacidad: number;
    horario: string;
    estado: number;

    constructor(
        id: number,
        nombre: string,
        direccion: string,
        descripcion: string,
        capacidad: number,
        horario: string,
        estado: number
    ) {
       
        this.id = id || 0;
        this.nombre = nombre || '';
        this.direccion = direccion || '';
        this.descripcion = descripcion || '';
        this.capacidad = capacidad || 0;
        this.horario = horario || '';
        this.estado = estado || 0;
    }

}

