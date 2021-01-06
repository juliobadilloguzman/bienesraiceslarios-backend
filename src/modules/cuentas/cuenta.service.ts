import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CuentaRepository } from './cuenta.repository';
import { CuentaDto } from './dto/cuenta.dto';
import { Cuenta } from './cuenta.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { getConnection } from 'typeorm';
import { Rol } from '../roles/rol.entity';

@Injectable()
export class CuentaService {

    constructor(
        @InjectRepository(CuentaRepository)
        private readonly _cuentaRepository: CuentaRepository
    ) { }

    async getCuenta(idCuenta: number): Promise<Cuenta> {

        if (!idCuenta) {
            throw new BadRequestException('idCuenta must be sent');
        }

        const cuenta: Cuenta = await this._cuentaRepository.findOne(idCuenta, { where: { estatus: "ACTIVO" } });

        if (!cuenta) {
            throw new NotFoundException();
        }

        return cuenta;

    }

    async getCuentas(): Promise<Cuenta[]> {

        const cuentas: Cuenta[] = await this._cuentaRepository.find({ where: { estatus: "ACTIVO" } });

        return cuentas;

    }

    async createCuenta(cuenta: Cuenta): Promise<Cuenta> {

        const usuario = new Usuario();
        usuario.idUsuario = 1;
        usuario.nombre = 'Julio';
        cuenta.usuario = usuario;

        const repo = await getConnection().getRepository(Rol);
        const defaultRole = await repo.findOne({ where: { nombre: 'CAPTURISTA' } });
        cuenta.roles = [defaultRole];

        const createdCuenta: Cuenta = await this._cuentaRepository.save(cuenta);

        return createdCuenta;

    }

    async updateCuenta(idCuenta: number, cuenta: Cuenta): Promise<void> {
        await this._cuentaRepository.update(idCuenta, cuenta);
    }

    async deleteCuenta(idCuenta: number): Promise<void> {

        const cuentaExists = await this._cuentaRepository.findOne(idCuenta, { where: { estatus: 'ACTIVO' } });

        if (!cuentaExists) {
            throw new NotFoundException();
        }

        this._cuentaRepository.update(idCuenta, { estatus: 'INACTIVO' });

    }

}
