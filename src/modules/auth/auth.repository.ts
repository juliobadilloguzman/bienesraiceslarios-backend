import { Repository, EntityRepository, getConnection } from "typeorm";
import { Cuenta } from "../cuentas/cuenta.entity";
import { SignUpDto } from "./dto";
import { Rol } from "../roles/rol.entity";
import { Usuario } from "../usuarios/usuario.entity";
import { RoleType } from "../roles/roleType.enum";
import { genSalt, hash } from "bcryptjs";
import { UsuarioService } from "../usuarios/usuario.service";

@EntityRepository(Cuenta)
export class AuthRepository extends Repository<Cuenta>{


    async signUp(signUpDto: SignUpDto): Promise<any> {

        const { email, password, nombre, apellidoPaterno, apellidoMaterno, calle, colonia, municipio, codigoPostal, telefonoFijo, telefonoCelular, correo } = signUpDto;

        const cuenta = new Cuenta();
        cuenta.email = email;

        const createdUsuario = new Usuario();
        createdUsuario.nombre = nombre;
        createdUsuario.apellidoPaterno = apellidoPaterno;
        createdUsuario.apellidoMaterno = apellidoMaterno;
        createdUsuario.calle = calle;
        createdUsuario.colonia = colonia;
        createdUsuario.municipio = municipio;
        createdUsuario.codigoPostal = codigoPostal;
        createdUsuario.telefonoFijo = telefonoFijo;
        createdUsuario.telefonoCelular = telefonoCelular;
        createdUsuario.correo = correo;
        cuenta.usuario = createdUsuario;

        //Roles
        const repo = await getConnection().getRepository(Rol);
        const defaultRole = await repo.findOne({ where: { nombre: RoleType.CAPTURISTA } });
        cuenta.roles = [defaultRole];

        //Password
        const salt = await genSalt(10);
        cuenta.password = await hash(password, salt);

        await cuenta.save();

        return { created: true }

    }

}