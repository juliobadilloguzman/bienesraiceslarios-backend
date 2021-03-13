import { IsNotEmpty, IsString, IsEmail, IsOptional, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUsuarioDto } from 'src/modules/usuarios/dto/createUsuario.dto';

export class UpdateAccountDto {

    //Cuenta
    @IsOptional()
    @IsEmail()
    readonly oldEmail: string;

    @IsOptional()
    @IsEmail()
    readonly email: string;

    @IsOptional()
    @MinLength(6)
    @IsString()
    readonly password: string;

    //Usuario
    @IsOptional()
    readonly idUsuario: string;

    @IsOptional()
    @IsString()
    readonly nombre: string;

    @IsOptional()
    readonly apellidoPaterno: string;

    @IsOptional()
    readonly apellidoMaterno: string;

    @IsOptional()
    readonly calle: string;

    @IsOptional()
    readonly numeroExterior: string;

    @IsOptional()
    readonly numeroInterior: string;

    @IsOptional()
    readonly colonia: string;

    @IsOptional()
    readonly municipio: string;

    @IsOptional()
    readonly codigoPostal: string;

    @IsOptional()
    readonly telefonoFijo: string;

    @IsOptional()
    readonly telefonoCelular: string;

    @IsOptional()
    readonly idRol: number;

}