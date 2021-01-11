import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CuentaRepository } from './cuenta.repository';
import { Cuenta } from './cuenta.entity';
import { Estatus } from '../../shared/estatus.enum';
import { RolRepository } from '../roles/rol.repository';
import { ReadCuentaDto, UpdateCuentaDto } from './dto';
import { plainToClass } from 'class-transformer';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class CuentaService {

    constructor(
        @InjectRepository(CuentaRepository)
        private readonly _cuentaRepository: CuentaRepository,
        @InjectRepository(RolRepository)
        private readonly _rolRepository: RolRepository
    ) { }

    async getCuenta(idCuenta: number): Promise<ReadCuentaDto> {

        if (!idCuenta || idCuenta === undefined) {
            throw new BadRequestException('El idCuenta no puede ser nulo');
        }

        const cuenta: Cuenta = await this._cuentaRepository.findOne(idCuenta, { where: { estatus: Estatus.ACTIVO } });

        if (!cuenta || cuenta === undefined) {
            throw new NotFoundException('La cuenta no existe');
        }

        return plainToClass(ReadCuentaDto, cuenta);

    }

    async getCuentas(): Promise<ReadCuentaDto[]> {

        const cuentas: Cuenta[] = await this._cuentaRepository.find({ where: { estatus: Estatus.ACTIVO } });

        return cuentas.map((cuenta: Cuenta) => plainToClass(ReadCuentaDto, cuenta));

    }


    async updateCuenta(idCuenta: number, cuenta: UpdateCuentaDto): Promise<ReadCuentaDto> {

        const foundCuenta = await this._cuentaRepository.findOne(idCuenta, { where: { estatus: Estatus.ACTIVO } });

        if (!foundCuenta || foundCuenta === undefined) {
            throw new NotFoundException('La Cuenta no existe');
        }

        const foundEmailCuenta = await this._cuentaRepository.findOne(null, { where: { email: cuenta.email } });

        if (foundEmailCuenta) {
            throw new ConflictException('El correo ya esta en uso');
        }

        foundCuenta.email = cuenta.email;

        //Password
        const salt = await genSalt(10);
        foundCuenta.password = await hash(cuenta.password, salt);

        const updatedCuenta = await this._cuentaRepository.save(foundCuenta);

        return plainToClass(ReadCuentaDto, updatedCuenta);

    }

    async deleteCuenta(idCuenta: number): Promise<any> {

        const cuentaExists = await this._cuentaRepository.findOne(idCuenta, { where: { estatus: Estatus.ACTIVO } });

        if (!cuentaExists || cuentaExists === undefined) {
            throw new NotFoundException('La Cuenta no existe');
        }

        this._cuentaRepository.update(idCuenta, { estatus: Estatus.INACTIVO });

        return { deleted: true };

    }

    async setRoleToUser(idCuenta: number, idRol: number): Promise<any> {

        const cuentaExists = await this._cuentaRepository.findOne(idCuenta, {
            where: { estatus: Estatus.ACTIVO },
        });

        if (!cuentaExists || cuentaExists === undefined) {
            throw new NotFoundException('La Cuenta no existe');
        }

        const roleExist = await this._rolRepository.findOne(idRol);

        if (!roleExist || roleExist === undefined) {
            throw new NotFoundException('El rol no existe');
        }

        cuentaExists.roles.push(roleExist);
        await this._cuentaRepository.save(cuentaExists);

        return { updated: true };
    }

}
