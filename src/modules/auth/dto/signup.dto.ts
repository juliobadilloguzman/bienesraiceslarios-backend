import { IsNotEmpty, IsString, IsEmail, IsOptional, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUsuarioDto } from 'src/modules/usuarios/dto/createUsuario.dto';

export class SignUpDto {

    //Cuenta
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(6)
    @IsString()
    readonly password: string;

    //Usuario
    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsOptional()
    readonly apellidoPaterno: string;

    @IsOptional()
    readonly apellidoMaterno: string;

    @IsOptional()
    readonly calle: string;

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
    @IsEmail()
    readonly correo: string;


}