import { IsString, IsNotEmpty, MaxLength, IsNumber } from "class-validator";
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadRoleDto {

    @Expose()
    @IsNumber()
    readonly idRol: number;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @MaxLength(20, { message: "El rol excede los limites de caracteres" })
    readonly nombre: string;

}