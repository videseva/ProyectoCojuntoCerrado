export class zonaComun {

    id: number;
    nombre: string;
    direccion: string;
    capacidad: number;
    categoria: number;
    estado: number;
    imagen: string;
    horaInicio: string;
    horaFin: string;
    
    constructor(
        id: number,
        nombre: string,
        direccion: string,
        capacidad: number,
        categoria: number,
        estado: number,
        imagen: string,
        horaInicio: string,
        horaFin: string
    ) {
        this.id = id || 0;
        this.nombre = nombre || '';
        this.direccion = direccion || '';
        this.capacidad = capacidad || 0;
        this.categoria = categoria || 0;
        this.estado = estado || 0;
        this.imagen = imagen || '';
        this.horaInicio = horaInicio || '';
        this.horaFin = horaFin || '';
      
    }
}
