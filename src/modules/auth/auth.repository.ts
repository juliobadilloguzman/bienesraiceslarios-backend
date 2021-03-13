import { Repository, EntityRepository, getConnection } from "typeorm";
import { Cuenta } from "../cuentas/cuenta.entity";
import { SignUpDto, UpdateAccountDto } from "./dto";
import { Rol } from "../roles/rol.entity";
import { Usuario } from "../usuarios/usuario.entity";
import { RoleType } from "../roles/roleType.enum";
import { genSalt, hash } from "bcryptjs";
import { UsuarioService } from "../usuarios/usuario.service";

@EntityRepository(Cuenta)
export class AuthRepository extends Repository<Cuenta>{


    async signUp(signUpDto: SignUpDto): Promise<any> {

        const { email, password, nombre, apellidoPaterno, apellidoMaterno, calle, numeroExterior, numeroInterior, colonia, municipio, codigoPostal, telefonoFijo, telefonoCelular, idRol } = signUpDto;

        const cuenta = new Cuenta();
        cuenta.email = email;

        const createdUsuario = new Usuario();
        createdUsuario.nombre = nombre;
        createdUsuario.apellidoPaterno = apellidoPaterno;
        createdUsuario.apellidoMaterno = apellidoMaterno;
        createdUsuario.calle = calle;
        createdUsuario.numeroExterior = numeroExterior;
        createdUsuario.numeroInterior = numeroInterior;
        createdUsuario.colonia = colonia;
        createdUsuario.municipio = municipio;
        createdUsuario.codigoPostal = codigoPostal;
        createdUsuario.telefonoFijo = telefonoFijo;
        createdUsuario.telefonoCelular = telefonoCelular;
        createdUsuario.correo = email;
        cuenta.usuario = createdUsuario;

        //Roles
        const repo = await getConnection().getRepository(Rol);
        const rol = await repo.findOne({ where: { idRol: idRol } });
        cuenta.roles = [rol];

        //Password
        const salt = await genSalt(10);
        cuenta.password = await hash(password, salt);

        await cuenta.save();

        return { created: true }

    }

    async updateAccountAndUser(idUsuario: number, updateAccountDto: UpdateAccountDto): Promise<any> {

        // console.log(idUsuario);
        // console.log(updateAccountDto);

        // const { email, password, nombre, apellidoPaterno, apellidoMaterno, calle, numeroExterior, numeroInterior, colonia, municipio, codigoPostal, telefonoFijo, telefonoCelular } = updateAccountDto;

        // var cuentaExists: Cuenta = await this._authRepository.findOne({
        //      where: { email },
        //  });

        // if (!cuenta || cuenta == undefined) {
        //     throw new NotFoundException('La cuenta no existe');
        // }

        // const cuenta = new Cuenta();
        // cuenta.email = email;

        // const createdUsuario = new Usuario();
        // createdUsuario.nombre = nombre;
        // createdUsuario.apellidoPaterno = apellidoPaterno;
        // createdUsuario.apellidoMaterno = apellidoMaterno;
        // createdUsuario.calle = calle;
        // createdUsuario.numeroExterior = numeroExterior;
        // createdUsuario.numeroInterior = numeroInterior;
        // createdUsuario.colonia = colonia;
        // createdUsuario.municipio = municipio;
        // createdUsuario.codigoPostal = codigoPostal;
        // createdUsuario.telefonoFijo = telefonoFijo;
        // createdUsuario.telefonoCelular = telefonoCelular;
        // createdUsuario.correo = email;
        // cuenta.usuario = createdUsuario;

        // //Roles
        // const repo = await getConnection().getRepository(Rol);
        // const rol = await repo.findOne({ where: { idRol: idRol } });
        // cuenta.roles = [rol];

        // //Password
        // const salt = await genSalt(10);
        // cuenta.password = await hash(password, salt);

        // await cuenta.save();

        // return { created: true }

    }

}