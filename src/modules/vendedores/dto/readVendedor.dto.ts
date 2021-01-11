import { IsString, IsNumber, IsEmail } from "class-validator";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ReadVendedorDto {

    @Expose()
    @IsNumber()
    readonly idVendedor: number;

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
    @IsEmail()
    readonly correo: string;

}