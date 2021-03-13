import { IsString, IsNotEmpty, IsNumber } from "class-validator";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ReadUsuarioCuentaDto {

    @Expose()
    @IsNumber()
    @IsNotEmpty()
    readonly idUsuario: number;

    @Expose()
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @Expose()
    @IsString()
    readonly apellidoPaterno: string;

    @Expose()
    @IsString()
    readonly apellidoMaterno: string;

    @Expose()
    @IsString()
    readonly correo: string;

    @Expose()
    @IsString()
    readonly telefono: string;

}