import { IsString, IsNumber, IsEmail } from "class-validator";
import { Exclude, Expose, Type } from "class-transformer";
import { ReadTerrenoDto } from "src/modules/terrenos/dto";
import { Terreno } from "../../terrenos/terreno.entity";

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
    @IsString()
    readonly telefono: string;

    @Expose()
    @IsEmail()
    readonly correo: string;

}