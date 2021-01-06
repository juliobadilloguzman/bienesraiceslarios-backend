import { IsNotEmpty, isNotEmpty } from 'class-validator'
import { RoleType } from '../../roles/roleType.enum';
import { Usuario } from '../../usuarios/usuario.entity';

export class UsuarioDto {

    @IsNotEmpty()
    idUsuario: number;

    @IsNotEmpty()
    nombre: string;

    apellidoPaterno: string;

    apellidoMaterno: string;

    calle: string;

    colonia: string;

    municipio: string;

    codigoPostal: string;

    telefonoFijo: string;

    telefonoCelular: string;

    correo: string;

}