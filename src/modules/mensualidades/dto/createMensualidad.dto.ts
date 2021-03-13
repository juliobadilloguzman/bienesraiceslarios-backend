import { IsString, IsNumber, IsNotEmpty, IsDate, IsOptional } from "class-validator";

export class CreateMensualidadDto {

    @IsNumber()
    readonly idMensualidad: number;

    @IsNotEmpty()
    @IsNumber()
    readonly numeroMensualidad: number;

    @IsNotEmpty()
    readonly numeroRecibo: string;

    @IsNotEmpty()
    @IsDate()
    readonly fechaPago: string;

    @IsNotEmpty()
    @IsNumber()
    readonly monto: number;

    @IsString()
    readonly cantidadConLetra: string;

    @IsNotEmpty()
    @IsString()
    readonly mes: string;

    @IsNotEmpty()
    @IsString()
    readonly formaPago: string;

    @IsNotEmpty()
    @IsString()
    readonly estatusPago: string;

    @IsNotEmpty()
    @IsString()
    readonly estatus: string;

    @IsOptional()
    @IsNumber()
    readonly interes: number;

    @IsOptional()
    @IsString()
    readonly estatusInteres: string;

    @IsNotEmpty()
    @IsNumber()
    readonly terrenoIdTerreno: number;

}