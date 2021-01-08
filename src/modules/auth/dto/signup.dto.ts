import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUsuarioDto } from 'src/modules/usuarios/dto/createUsuario.dto';

export class SignUpDto {

    //Cuenta
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

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