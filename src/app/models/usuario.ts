export class Usuario {
    id: number;
    nombre: string;
    fechaNacimiento: Date;
    cedula: string;
    telefono: string;
    correo: string;
    foto: string;

    constructor(
        id: number,
        nombre: string,
        fechaNacimiento: Date,
        cedula: string,
        telefono: string,
        correo: string,
        foto: string
    ) {
        this.id = id || 0;
        this.nombre = nombre || '';
        this.fechaNacimiento = fechaNacimiento || new Date();
        this.cedula = cedula || '';
        this.telefono = telefono || '';
        this.correo = correo || '';
        this.foto = foto || '';
    }
}
