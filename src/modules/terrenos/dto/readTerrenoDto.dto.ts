import { IsString, IsNumber, IsDate } from "class-validator";
import { Exclude, Expose, Type } from "class-transformer";
import { ReadFraccionamientoDto } from "src/modules/fraccionamientos/dto";
import { ReadUsuarioCuentaDto } from "src/modules/cuentas/dto";
import { Vendedor } from "src/modules/vendedores/vendedor.entity";
import { ReadVendedorDto } from "src/modules/vendedores/dto";

@Exclude()
export class ReadTerrenoDto {

    @Expose()
    @IsNumber()
    readonly idTerreno: number;

    @Expose()
    @IsNumber()
    readonly noManzana: number;

    @Expose()
    @IsNumber()
    readonly noLote: number;

    @Expose()
    @IsNumber()
    readonly superficie: number;

    @Expose()
    @IsNumber()
    readonly costoM2: number;

    @Expose()
    @IsNumber()
    readonly enganche: number;

    @Expose()
    @IsString()
    readonly formaPagoEnganche: string;

    @Expose()
    @IsNumber()
    readonly pagoAlContado: number;

    @Expose()
    @IsNumber()
    readonly costoTotal: number;

    @Expose()
    @IsNumber()
    readonly saldo: number;

    @Expose()
    @IsDate()
    readonly fechaVenta: Date;

    @Expose()
    @IsNumber()
    readonly noMensualidades: number;

    @Expose()
    @IsNumber()
    readonly montoMensualidad: number;

    @Expose()
    @IsNumber()
    readonly diaPagoDel: number;

    @Expose()
    @IsNumber()
    readonly diaPagoAl: number;

    @Expose()
    @IsNumber()
    readonly pagoDeslinde: number;

    @Expose()
    @IsDate()
    readonly fechaPrimeraMensualidad: Date;

    @Expose()
    @IsString()
    readonly comentariosAdicionales: string;

    @Expose()
    @IsString()
    readonly estatus: string;

    @Expose()
    @Type(type => ReadFraccionamientoDto)
    readonly fraccionamiento: ReadFraccionamientoDto;

    @Expose()
    @Type(type => ReadUsuarioCuentaDto)
    readonly usuario: ReadUsuarioCuentaDto;

    @Expose()
    @Type(type => ReadVendedorDto)
    readonly vendedores: Vendedor[];

}
