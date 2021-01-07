import { IsString, IsNumber, IsEmail } from "class-validator";
import { ReadUsuarioCuentaDto } from "./readUsuarioCuenta.dto";
import { Type, Exclude, Expose } from "class-transformer";
import { ReadRolCuentaDto } from "./readRolCuenta.dto";

@Exclude()
export class ReadCuentaDto {

    @Expose()
    @IsNumber()
    readonly idCuenta: number;

    @Expose()
    @IsEmail()
    readonly email: string;

    @Expose()
    @IsString()
    readonly estatus: string;

    @Expose()
    @Type(type => ReadUsuarioCuentaDto)
    readonly usuario: ReadUsuarioCuentaDto;

    @Expose()
    @Type(type => ReadRolCuentaDto)
    readonly roles: ReadRolCuentaDto[];

}