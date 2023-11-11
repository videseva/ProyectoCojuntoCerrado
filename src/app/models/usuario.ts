export class usuario {
    
    id: number;
    nombre: string;
    genero: number;
    numero: number;
    correo: string;
    direccion: string;

    constructor(
        id: number,
        nombre: string,
        genero: number,
        numero: number,
        correo: string,
        direccion: string
    
    ) {
        this.id = id || 0;
        this.nombre = nombre || '';
        this.genero = genero || 0;
        this.numero = numero || 0;
        this.correo = correo || '';
        this.direccion = direccion || '';
      
    }
}
