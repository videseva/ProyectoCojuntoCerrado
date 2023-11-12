export class usuario {
    
    id: number;
    nombre: string;
    genero: number;
    numero: number;
    correo: string;
    direccion: string;
    tipoUsuario: number;

    constructor(
        id: number,
        nombre: string,
        genero: number,
        numero: number,
        correo: string,
        direccion: string,
        tipoUsuario: number
    
    ) {
        this.id = id || 0;
        this.nombre = nombre || '';
        this.genero = genero || 0;
        this.numero = numero || 0;
        this.correo = correo || '';
        this.direccion = direccion || '';
        this.tipoUsuario = tipoUsuario || 0;
      
    }
}
