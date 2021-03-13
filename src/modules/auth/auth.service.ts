import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto, LoginDto, UpdateAccountDto, UpdatePasswordDto } from './dto';
import { Cuenta } from '../cuentas/cuenta.entity';
import { compare } from 'bcryptjs';
import { IJwtPayload } from './jwt-payload.interface';
import { RoleType } from '../roles/roleType.enum';
import { Usuario } from '../usuarios/usuario.entity';
import { UsuarioRepository } from '../usuarios/usuario.repository';
import { genSalt, hash } from "bcryptjs";
import { Rol } from '../roles/rol.entity';
import { Estatus } from '../../shared/estatus.enum';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository,
        @InjectRepository(UsuarioRepository)
        private readonly _usuarioRepository: UsuarioRepository,
        private readonly _jwtService: JwtService
    ) { }

    async signUp(signupDto: SignUpDto): Promise<void> {

        const { email } = signupDto;

        const emailExists = await this._authRepository.findOne({
            where: { email }
        });

        if (emailExists) {
            throw new ConflictException('El email ya tiene asociada una cuenta');
        }

        return this._authRepository.signUp(signupDto);

    }

    async login(loginDto: LoginDto): Promise<{ idCuenta: number, idUsuario: number, email: string, roles: Rol[], token: string, expiresIn: number }> {

        const { email, password } = loginDto;

        const cuenta: Cuenta = await this._authRepository.findOne({
            where: { email },
        });

        if (!cuenta || cuenta == undefined) {
            throw new NotFoundException('La cuenta no existe');
        }

        const isMatch = await compare(password, cuenta.password);

        if (!isMatch) {
            throw new UnauthorizedException('Las credenciales no son validas');
        }

        const payload: IJwtPayload = {
            idCuenta: cuenta.idCuenta,
            email: cuenta.email,
            roles: cuenta.roles.map(r => r.nombre as RoleType),
        };

        const token = await this._jwtService.sign(payload);

        return { idCuenta: cuenta.idCuenta, idUsuario: cuenta.usuario.idUsuario, roles: cuenta.roles, email, token, expiresIn: 7200 };
    }

    async updateAccountAndUser(idUsuario: number, updateAccountDto: UpdateAccountDto): Promise<any> {

        const { oldEmail, email, password, nombre, apellidoPaterno, apellidoMaterno, calle, numeroExterior, numeroInterior, colonia, municipio, codigoPostal, telefonoFijo, telefonoCelular } = updateAccountDto;

        const cuentaExists: Cuenta = await this._authRepository.findOne({
            where: { email: oldEmail },
        });

        if (!cuentaExists || cuentaExists == undefined) {
            throw new NotFoundException('La cuenta no existe');
        }

        const usuarioExists: Usuario = await this._usuarioRepository.findOne({
            where: { idUsuario },
        });

        if (!usuarioExists || usuarioExists == undefined) {
            throw new NotFoundException('El usuario no existe');
        }

        //Update values

        //Update emails in both objects
        cuentaExists.email = email;
        usuarioExists.correo = email;

        //Update password
        if (password != null) {
            const salt = await genSalt(10);
            cuentaExists.password = await hash(password, salt);
        }

        usuarioExists.nombre = nombre;
        usuarioExists.apellidoPaterno = apellidoPaterno;
        usuarioExists.apellidoMaterno = apellidoMaterno;
        usuarioExists.calle = calle;
        usuarioExists.numeroExterior = numeroExterior;
        usuarioExists.numeroInterior = numeroInterior;
        usuarioExists.colonia = colonia;
        usuarioExists.municipio = municipio;
        usuarioExists.codigoPostal = codigoPostal;
        usuarioExists.telefonoFijo = telefonoFijo;
        usuarioExists.telefonoCelular = telefonoCelular;

        await cuentaExists.save();
        await usuarioExists.save();

        return { updated: true }

    }

    async updatePassword(idCuenta: number, updatePasswordDto: UpdatePasswordDto): Promise<any> {

        const { password } = updatePasswordDto;

        const cuentaExists: Cuenta = await this._authRepository.findOne({
            where: { idCuenta: idCuenta },
        });

        if (!cuentaExists || cuentaExists == undefined) {
            throw new NotFoundException('La cuenta no existe');
        }

        if (password != null) {
            const salt = await genSalt(10);
            cuentaExists.password = await hash(password, salt);
        }

        await cuentaExists.save();

        return { updated: true }
    }

    async deleteAccount(idUsuario: number): Promise<any> {

        const usuarioExists = await this._usuarioRepository.findOne({ where: { idUsuario: idUsuario } });

        console.log(usuarioExists);

        if (!usuarioExists || usuarioExists === undefined) {
            throw new NotFoundException('El usuario no existe');
        }

        const cuentaExists = await this._authRepository.findOne({ where: { usuario: usuarioExists } });

        if (!cuentaExists || cuentaExists === undefined) {
            throw new NotFoundException('La cuenta no existe');
        }

        usuarioExists.estatus = Estatus.ELIMINADO
        cuentaExists.estatus = Estatus.ELIMINADO;
        cuentaExists.save();
        usuarioExists.save();

        return { deleted: true };

    }

}
