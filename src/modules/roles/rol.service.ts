import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolRepository } from './rol.repository';
import { Rol } from './rol.entity';


@Injectable()
export class RolService {

    constructor(
        @InjectRepository(RolRepository)
        private readonly _rolRepository: RolRepository
    ) { }

    async getRol(idRol: number): Promise<Rol> {

        if (!idRol) {
            throw new BadRequestException('idRol must be sent');
        }

        const rol: Rol = await this._rolRepository.findOne(idRol);

        if (!rol) {
            throw new NotFoundException();
        }

        return rol;

    }

    async getRoles(): Promise<Rol[]> {

        const roles: Rol[] = await this._rolRepository.find();

        return roles;

    }

    async createRol(rol: Rol): Promise<Rol> {

        const createdRol: Rol = await this._rolRepository.save(rol);

        return createdRol;

    }

    async updateRol(idRol: number, rol: Rol): Promise<void> {
        await this._rolRepository.update(idRol, rol);
    }

    async deleteRol(idRol: number): Promise<void> {

        const rolExists = await this._rolRepository.findOne(idRol);

        if (!rolExists) {
            throw new NotFoundException();
        }

        this._rolRepository.remove(rolExists);

    }

}
