import { IsNotEmpty } from 'class-validator'

export class UsuarioDto {

    @IsNotEmpty()
    idUsuario: number;

    @IsNotEmpty()
    nombre: string;

    apellidoPaterno: string;

    apellidoMaterno: string;

    calle: string;

    colonia: string;

    municipio: string;

    codigoPostal: string;

    telefonoFijo: string;

    telefonoCelular: string;

    correo: string;

}