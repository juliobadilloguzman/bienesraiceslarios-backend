import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolRepository } from './rol.repository';
import { Rol } from './rol.entity';
import { ReadRoleDto, CreateRoleDto } from './dto';
import { plainToClass } from 'class-transformer';


@Injectable()
export class RolService {

    constructor(
        @InjectRepository(RolRepository)
        private readonly _rolRepository: RolRepository
    ) { }

    async getRol(idRol: number): Promise<ReadRoleDto> {

        if (!idRol) {
            throw new BadRequestException('idRol must be sent');
        }

        const rol: Rol = await this._rolRepository.findOne(idRol);

        if (!rol) {
            throw new NotFoundException();
        }

        return plainToClass(ReadRoleDto, rol);

    }

    async getRoles(): Promise<ReadRoleDto[]> {

        const roles: Rol[] = await this._rolRepository.find();

        return roles.map((rol: Rol) => plainToClass(ReadRoleDto, rol));

    }

    async createRol(rol: Rol): Promise<ReadRoleDto> {

        const createdRol: Rol = await this._rolRepository.save(rol);

        return plainToClass(ReadRoleDto, createdRol);

    }

    async updateRol(idRol: number, rol: Rol): Promise<ReadRoleDto> {

        const foundRole: Rol = await this._rolRepository.findOne(idRol);

        if (!foundRole) {
            throw new NotFoundException('El rol no existe');
        }

        foundRole.nombre = rol.nombre;

        const updatedRole = await this._rolRepository.save(foundRole);

        return plainToClass(ReadRoleDto, updatedRole);

    }

    async deleteRol(idRol: number): Promise<any> {

        const roleExists = await this._rolRepository.findOne(idRol);

        if (!roleExists) {
            throw new NotFoundException('El rol no existe');
        }

        this._rolRepository.remove(roleExists);

        return { deleted: true };

    }

}
