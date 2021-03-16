import { IsString, IsNumber, IsNotEmpty, IsDate } from "class-validator";
import { Vendedor } from "src/modules/vendedores/vendedor.entity";

export class CreateTerrenoDto {

    @IsNotEmpty({ message: 'El noManzana es obligatorio' })
    @IsNumber()
    readonly noManzana: number;

    @IsNotEmpty({ message: 'El noLote es obligatorio' })
    @IsNumber()
    readonly noLote: number;

    @IsNotEmpty({ message: 'La superficie es obligatoria' })
    @IsNumber()
    readonly superficie: number;

    @IsNotEmpty({ message: 'El costo x m2 es obligatorio' })
    @IsNumber()
    readonly costoM2: number;

    @IsNumber()
    readonly enganche: number;

    @IsString()
    readonly formaPagoEnganche: string;

    @IsNumber()
    readonly pagoAlContado: number;

    @IsNotEmpty({ message: 'El costo total es obligatorio' })
    @IsNumber()
    readonly costoTotal: number;

    @IsNotEmpty({ message: 'El saldo es obligatorio' })
    @IsNumber()
    readonly saldo: number;

    @IsDate()
    readonly fechaVenta: Date;

    @IsNumber()
    readonly noMensualidades: number;

    @IsNumber()
    readonly montoMensualidad: number;

    @IsNumber()
    readonly diaPagoDel: number;

    @IsNumber()
    readonly diaPagoAl: number;

    @IsNumber()
    readonly pagoDeslinde: number;

    @IsNumber()
    readonly fechaPagoDeslinde: string;

    @IsNumber()
    readonly montoDeslinde: number;

    @IsDate()
    readonly fechaPrimeraMensualidad: Date;

    @IsString()
    readonly comentariosAdicionales: string;

    @IsString()
    readonly estatus: string;

    @IsNotEmpty()
    @IsNumber()
    readonly fraccionamientoIdFraccionamiento: number;

    @IsNotEmpty()
    @IsNumber()
    readonly usuarioIdUsuario: number;

    readonly vendedores: Vendedor[];

}