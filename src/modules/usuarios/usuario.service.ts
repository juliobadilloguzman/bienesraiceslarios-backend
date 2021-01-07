import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadUsuarioDto } from './dto/readUsuario';
import { Usuario } from './usuario.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioRepository)
        private readonly _usuarioRepository: UsuarioRepository
    ) { }

    async getUsuario(idUsuario: number): Promise<ReadUsuarioDto> {

        if (!idUsuario) {
            throw new BadRequestException('idUsuario no puede ser nulo');
        }

        const usuario: Usuario = await this._usuarioRepository.findOne(idUsuario);

        if (!usuario) {
            throw new NotFoundException('El usuario no existe');
        }

        return plainToClass(ReadUsuarioDto, usuario);

    }

    async getUsuarios(): Promise<ReadUsuarioDto[]> {

        const usuarios: Usuario[] = await this._usuarioRepository.find();

        return usuarios.map((usuario: Usuario) => plainToClass(ReadUsuarioDto, usuario));

    }

    async createUsuario(usuario: Usuario): Promise<ReadUsuarioDto> {

        const createdUsuario: Usuario = await this._usuarioRepository.save(usuario);

        return plainToClass(ReadUsuarioDto, createdUsuario);

    }

}
