import { IsString, IsNumber, IsNotEmpty, IsDate } from "class-validator";

export class CreateMensualidadDto {

    @IsNumber()
    readonly idMensualidad: number;

    @IsNotEmpty()
    @IsNumber()
    readonly numeroMensualidad: number;

    @IsNotEmpty()
    @IsDate()
    readonly fechaPago: Date;

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
    readonly estatus: string;

    @IsNotEmpty()
    @IsNumber()
    readonly terrenoIdTerreno: number;

}