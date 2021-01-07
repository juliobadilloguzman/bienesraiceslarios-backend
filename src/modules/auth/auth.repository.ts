import { Repository, EntityRepository, getConnection } from "typeorm";
import { Cuenta } from "../cuentas/cuenta.entity";
import { SignUpDto } from "./dto";
import { Rol } from "../roles/rol.entity";
import { Usuario } from "../usuarios/usuario.entity";
import { RoleType } from "../roles/roleType.enum";
import { genSalt, hash } from "bcryptjs";

@EntityRepository(Cuenta)
export class AuthRepository extends Repository<Cuenta>{

    async signUp(signUpDto: SignUpDto) {

        const { email, password } = signUpDto;

        const cuenta = new Cuenta();
        cuenta.email = email;

        //Usuario
        const usuario = new Usuario();
        usuario.nombre = 'Julio';
        cuenta.usuario = usuario;

        //Roles
        const repo = await getConnection().getRepository(Rol);
        const defaultRole = await repo.findOne({ where: { nombre: RoleType.CAPTURISTA } });
        cuenta.roles = [defaultRole];

        //Password
        const salt = await genSalt(10);
        cuenta.password = await hash(password, salt);

        await cuenta.save();

    }

}