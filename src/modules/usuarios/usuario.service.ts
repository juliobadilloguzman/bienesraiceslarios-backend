import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadUsuarioDto } from './dto/readUsuario.dto';
import { Usuario } from './usuario.entity';
import { plainToClass } from 'class-transformer';
import { CreateUsuarioDto } from './dto/createUsuario.dto';
import { UpdateUsuarioDto } from './dto/updateUsuario.dto';
import { Cuenta } from '../cuentas/cuenta.entity';
import { CuentaRepository } from '../cuentas/cuenta.repository';
import { Estatus } from '../../shared/estatus.enum';
import { ReadCuentaDto } from '../cuentas/dto';
import { In } from 'typeorm';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioRepository)
        private readonly _usuarioRepository: UsuarioRepository,
        @InjectRepository(CuentaRepository)
        private readonly _cuentaRepository: CuentaRepository
    ) { }

    async getUsuario(idUsuario: number): Promise<ReadUsuarioDto> {

        if (!idUsuario || idUsuario === undefined) {
            throw new BadRequestException('idUsuario no puede ser nulo');
        }

        const usuario: Usuario = await this._usuarioRepository.findOne(idUsuario);

        if (!usuario || usuario === undefined) {
            throw new NotFoundException('El usuario no existe');
        }

        return plainToClass(ReadUsuarioDto, usuario);

    }

    async getUsuarios(): Promise<ReadUsuarioDto[]> {

        const usuarios: Usuario[] = await this._usuarioRepository.find();

        return usuarios.map((usuario: Usuario) => plainToClass(ReadUsuarioDto, usuario));

    }

    async getClientes(): Promise<any> {

        const cuentas = await this
            ._cuentaRepository
            .createQueryBuilder('cuentas')
            .innerJoin(
                'cuentas.roles',
                'roles',
                'roles.nombre = :nombre',
                { nombre: 'CLIENTE' }
            ).getMany();


        const usuarios: any[] = [];

        for (const element of cuentas) {
            let user = await this._usuarioRepository.find({ where: { correo: element.email } });
            usuarios.push(user[0]);
        }

        return usuarios.map((cuenta: Usuario) => plainToClass(ReadUsuarioDto, cuenta));

    }

    async getAdministradores(): Promise<any> {

        const cuentas = await this
            ._cuentaRepository
            .createQueryBuilder('cuentas')
            .innerJoin(
                'cuentas.roles',
                'roles',
                'roles.nombre = :nombre',
                { nombre: 'ADMINISTRADOR' }
            ).getMany();


        const usuarios: any[] = [];

        for (const element of cuentas) {
            let user = await this._usuarioRepository.find({ where: { correo: element.email } });
            usuarios.push(user[0]);
        }

        return usuarios.map((cuenta: Usuario) => plainToClass(ReadUsuarioDto, cuenta));

    }

    async getCapturistas(): Promise<any> {

        const cuentas = await this
            ._cuentaRepository
            .createQueryBuilder('cuentas')
            .innerJoin(
                'cuentas.roles',
                'roles',
                'roles.nombre = :nombre',
                { nombre: 'CAPTURISTA' }
            ).getMany();


        const usuarios: any[] = [];

        for (const element of cuentas) {
            let user = await this._usuarioRepository.find({ where: { correo: element.email } });
            usuarios.push(user[0]);
        }

        return usuarios.map((cuenta: Usuario) => plainToClass(ReadUsuarioDto, cuenta));

    }

    async createUsuario(usuario: Partial<CreateUsuarioDto>): Promise<ReadUsuarioDto> {

        const createdUsuario: Usuario = await this._usuarioRepository.save(usuario);

        return plainToClass(ReadUsuarioDto, createdUsuario);

    }

    async updateUsuario(idUsuario: number, usuario: Partial<UpdateUsuarioDto>): Promise<ReadUsuarioDto> {

        const foundUsuario: Usuario = await this._usuarioRepository.findOne(idUsuario);

        if (!foundUsuario || foundUsuario === undefined) {
            throw new NotFoundException('El usuario no existe');
        }

        foundUsuario.nombre = usuario.nombre;
        foundUsuario.apellidoPaterno = usuario.apellidoPaterno;
        foundUsuario.apellidoMaterno = usuario.apellidoMaterno;
        foundUsuario.calle = usuario.calle;
        foundUsuario.colonia = usuario.colonia;
        foundUsuario.municipio = usuario.municipio;
        foundUsuario.codigoPostal = usuario.codigoPostal;
        foundUsuario.telefonoFijo = usuario.telefonoFijo;
        foundUsuario.telefonoCelular = usuario.telefonoCelular;
        foundUsuario.correo = usuario.correo;

        const updatedUsuario = await this._usuarioRepository.save(foundUsuario);

        return plainToClass(ReadUsuarioDto, updatedUsuario);

    }

    async deleteUsuario(idUsuario: number): Promise<any> {

        const usuarioExists = await this._usuarioRepository.findOne(idUsuario);

        if (!usuarioExists || usuarioExists === undefined) {
            throw new NotFoundException('El usuario no existe');
        }

        this._usuarioRepository.remove(usuarioExists);

        return { deleted: true };

    }

}
