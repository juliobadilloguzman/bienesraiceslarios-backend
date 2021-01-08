import { IsString, IsNotEmpty, MaxLength, IsNumber } from "class-validator";

export class CreateFraccionamienoDto {

    @IsNumber()
    readonly idFraccionamiento: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20, { message: "El fraccionamiento excede los limites de caracteres" })
    readonly nombre: string;

}