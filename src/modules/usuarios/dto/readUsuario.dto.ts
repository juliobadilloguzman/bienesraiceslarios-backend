import { IsString, IsNumber, IsEmail } from "class-validator";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ReadUsuarioDto {

    @Expose()
    @IsNumber()
    readonly idUsuario: number;

    @Expose()
    @IsString()
    readonly nombre: string;

    @Expose()
    @IsString()
    readonly apellidoPaterno: string;

    @Expose()
    @IsString()
    readonly apellidoMaterno: string;

    @Expose()
    @IsString()
    readonly calle: string;

    @Expose()
    @IsString()
    readonly colonia: string;

    @Expose()
    @IsString()
    readonly municipio: string;

    @Expose()
    @IsString()
    readonly codigoPostal: string;

    @Expose()
    @IsString()
    readonly telefonoFijo: string;

    @Expose()
    @IsString()
    readonly telefonoCelular: string;

    @Expose()
    @IsEmail()
    readonlycorreo: string;

}