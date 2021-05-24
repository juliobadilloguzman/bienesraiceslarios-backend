import { IsString, IsNumber, IsEmail, IsDate } from "class-validator";
import { Exclude, Expose, Type } from "class-transformer";
import { ReadFraccionamientoDto } from "src/modules/fraccionamientos/dto";
import { ReadUsuarioDto } from "src/modules/usuarios/dto";
import { ReadUsuarioCuentaDto } from "src/modules/cuentas/dto";
import { Vendedor } from "src/modules/vendedores/vendedor.entity";
import { ReadVendedorDto } from "src/modules/vendedores/dto";
import { ReadTerrenoDto } from "src/modules/terrenos/dto";

@Exclude()
export class ReadMensualidadDto {

    @Expose()
    @IsNumber()
    readonly idMensualidad: number;

    @Expose()
    @IsNumber()
    readonly numeroMensualidad: number;

    @Expose()
    @IsString()
    readonly numeroRecibo: string;

    @Expose()
    @IsDate()
    readonly fechaPago: string;

    @Expose()
    @IsNumber()
    readonly monto: number;

    @Expose()
    @IsString()
    readonly cantidadConLetra: string;

    @Expose()
    @IsString()
    readonly mes: string;

    @IsString()
    readonly year: string;

    @Expose()
    @IsString()
    readonly formaPago: string;

    @Expose()
    @IsString()
    readonly estatusPago: string;

    @Expose()
    @IsString()
    readonly estatus: string;

    @Expose()
    @IsNumber()
    readonly interes: string;

    @Expose()
    @IsString()
    readonly estatusInteres: string;

    @Expose()
    @Type(type => ReadUsuarioCuentaDto)
    readonly usuario: ReadUsuarioCuentaDto;

    @Expose()
    @Type(type => ReadTerrenoDto)
    readonly terreno: ReadTerrenoDto;

}