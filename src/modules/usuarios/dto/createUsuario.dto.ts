import { IsString, IsNumber, IsEmail, IsNotEmpty } from "class-validator";
import { Exclude, Expose } from "class-transformer";

export class CreateUsuarioDto {

    @IsNumber()
    readonly idUsuario: number;

    @IsNotEmpty()
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