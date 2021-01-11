import { IsString, IsNumber, IsEmail, IsNotEmpty } from "class-validator";

export class CreateVendedorDto {

    @IsNumber()
    readonly idVendedor: number;

    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString()
    readonly nombre: string;

    @IsString()
    readonly apellidoPaterno: string;

    @IsString()
    readonly apellidoMaterno: string;

    @IsEmail()
    readonly correo: string;

}