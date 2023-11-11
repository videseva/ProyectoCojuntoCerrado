export class usuario {
    
    nombre: string;
    id: number;
    genero: number;
    numero: number;
    correo: string;
    direccion: string;

    constructor(
        nombre: string,
        id: number,
        genero: number,
        numero: number,
        correo: string,
        direccion: string
    
    ) {
        this.nombre = nombre || '';
        this.id = id || 0;
        this.genero = genero || 0;
        this.numero = numero || 0;
        this.correo = correo || '';
        this.direccion = direccion || '';
      
    }
}
