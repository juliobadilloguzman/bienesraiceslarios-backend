import { IsString, IsNotEmpty, MaxLength, IsNumber, IsOptional } from "class-validator";

export class CreateFraccionamientoDto {

    @IsNumber()
    readonly idFraccionamiento: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100, { message: "El fraccionamiento excede los limites de caracteres" })
    readonly nombre: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    readonly regimen: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    readonly municipio: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    readonly estado: string;

    @IsOptional()
    @IsString()
    readonly ubicacionMaps: string;

}