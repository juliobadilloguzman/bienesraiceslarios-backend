import { IsNotEmpty } from 'class-validator'
import { RoleType } from '../../roles/roleType.enum';
import { Usuario } from '../../usuarios/usuario.entity';

export class CuentaDto {

    @IsNotEmpty()
    idCuenta: number;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    roles: RoleType[]

    @IsNotEmpty()
    usuario: Usuario;

}