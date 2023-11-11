export class categoria {
    id: number;
    nombre: string;
    estado: number;

    constructor(
        id: number,
        nombre: string,
        estado: number

    
    ) {
        this.id = id || 0;
        this.nombre = nombre || '';
        this.estado = estado || 0;
    }

  
}
