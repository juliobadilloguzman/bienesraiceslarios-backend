import { IsString, IsNotEmpty, IsNumber } from "class-validator";
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadFraccionamientoDto {

    @Expose()
    @IsNumber()
    readonly idFraccionamiento: number;

    @Expose()
    @IsNotEmpty()
    readonly nombre: string;

    @Expose()
    readonly estatus: string;

}