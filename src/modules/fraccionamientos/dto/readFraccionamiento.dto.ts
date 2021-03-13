import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
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
    @IsNotEmpty()
    readonly regimen: string;

    @Expose()
    @IsOptional()
    readonly municipio: string;

    @Expose()
    @IsOptional()
    readonly estado: string;

    @Expose()
    @IsOptional()
    readonly ubicacionMaps: string;

    @Expose()
    readonly estatusFraccionamiento: string;

}