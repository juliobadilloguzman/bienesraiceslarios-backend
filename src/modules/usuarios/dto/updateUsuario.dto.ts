import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class UpdateUsuarioDto {

    @IsString()
    readonly nombre: string;

    @IsString()
    readonly apellidoPaterno: string;

    @IsString()
    readonly apellidoMaterno: string;

    @IsString()
    readonly calle: string;

    @IsString()
    readonly colonia: string;

    @IsString()
    readonly numeroExterior: string;

    @IsString()
    readonly numeroInterior: string;

    @IsString()
    readonly municipio: string;

    @IsString()
    readonly codigoPostal: string;

    @IsString()
    readonly telefonoFijo: string;

    @IsString()
    readonly telefonoCelular: string;

    @IsEmail()
    readonly correo: string;

}