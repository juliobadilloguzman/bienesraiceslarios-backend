import { IsString, IsEmail } from "class-validator";

export class UpdateCuentaDto {

    @IsEmail()
    readonly email: string;

    @IsString()
    readonly password: string;

}