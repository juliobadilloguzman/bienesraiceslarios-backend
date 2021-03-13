import { IsString, IsNumber, IsEmail, IsNotEmpty } from "class-validator";

export class UpdateVendedorDto {

    @IsNumber()
    readonly idVendedor: number;

    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString()
    readonly nombre: string;

    @IsString()
    readonly apellidoPaterno: string;

    @IsString()
    readonly apellidoMaterno: string;

    @IsString()
    readonly telefono: string;

    @IsEmail()
    readonly correo: string;

}