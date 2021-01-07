import { IsString, IsNotEmpty, MaxLength } from "class-validator";

export class UpdateRoleDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(20, { message: "El rol excede los limites de caracteres" })
    readonly nombre: string;

}