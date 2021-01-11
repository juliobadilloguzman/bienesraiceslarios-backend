import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
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

        if (!idRol || idRol === undefined) {
            throw new BadRequestException('El idRol no puede ser nulo');
        }

        const rol: Rol = await this._rolRepository.findOne(idRol);

        if (!rol || rol === undefined) {
            throw new NotFoundException('El rol no existe');
        }

        return plainToClass(ReadRoleDto, rol);

    }

    async getRoles(): Promise<ReadRoleDto[]> {

        const roles: Rol[] = await this._rolRepository.find();

        return roles.map((rol: Rol) => plainToClass(ReadRoleDto, rol));

    }

    async createRol(rol: Rol): Promise<ReadRoleDto> {

        const foundRol = await this._rolRepository.findOne(null, { where: { nombre: rol.nombre } });

        if (foundRol) {
            throw new ConflictException('El nombre del rol ya existe');
        }

        const createdRol: Rol = await this._rolRepository.save(rol);

        return plainToClass(ReadRoleDto, createdRol);

    }

    async updateRol(idRol: number, rol: Rol): Promise<ReadRoleDto> {

        const foundRole: Rol = await this._rolRepository.findOne(idRol);

        if (!foundRole || foundRole === undefined) {
            throw new NotFoundException('El rol no existe');
        }

        const rolNameExists: Rol = await this._rolRepository.findOne(null, { where: { nombre: rol.nombre } });

        if (rolNameExists) {
            throw new ConflictException('El nombre del rol ya existe');
        }

        foundRole.nombre = rol.nombre;

        const updatedRole = await this._rolRepository.save(foundRole);

        return plainToClass(ReadRoleDto, updatedRole);

    }

    async deleteRol(idRol: number): Promise<any> {

        const roleExists = await this._rolRepository.findOne(idRol);

        if (!roleExists || roleExists === undefined) {
            throw new NotFoundException('El rol no existe');
        }

        this._rolRepository.remove(roleExists);

        return { deleted: true };

    }

}
