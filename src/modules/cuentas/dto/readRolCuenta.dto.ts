import { IsString, IsNotEmpty, IsNumber } from "class-validator";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ReadRolCuentaDto {

    @Expose()
    @IsNumber()
    @IsNotEmpty()
    readonly idRol: number;

    @Expose()
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

}