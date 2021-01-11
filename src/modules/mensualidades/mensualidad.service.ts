import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TerrenoRepository } from '../terrenos/terreno.repository';
import { MensualidadRepository } from './mensualidad.repository';
import { ReadMensualidadDto } from './dto/readMensualidad.dto';
import { Mensualidad } from './mensualidad.entity';
import { plainToClass } from 'class-transformer';
import { CreateMensualidadDto } from './dto/createMensualidad.dto';
import { UsuarioRepository } from '../usuarios/usuario.repository';

@Injectable()
export class MensualidadService {

    constructor(
        @InjectRepository(TerrenoRepository)
        private readonly _terrenoRepository: TerrenoRepository,
        @InjectRepository(MensualidadRepository)
        private readonly _mensualidadRepository: MensualidadRepository,
        @InjectRepository(UsuarioRepository)
        private readonly _usuarioRepository: UsuarioRepository
    ) { }

    async getMensualidad(idMensualidad: number): Promise<ReadMensualidadDto> {

        if (!idMensualidad || idMensualidad === undefined) {
            throw new BadRequestException('idMensualidad no puede ser nulo');
        }

        const mensualidad: Mensualidad = await this._mensualidadRepository.findOne(idMensualidad);

        if (!mensualidad || mensualidad === undefined) {
            throw new NotFoundException('La mensualidad no existe');
        }

        return plainToClass(ReadMensualidadDto, mensualidad);

    }

    async getMensualidades(): Promise<ReadMensualidadDto[]> {

        const mensualidades: Mensualidad[] = await this._mensualidadRepository.find();

        return mensualidades.map((mensualidad: Mensualidad) => plainToClass(ReadMensualidadDto, mensualidad));

    }

    async createMensualidad(mensualidad: CreateMensualidadDto): Promise<ReadMensualidadDto> {

        if (!mensualidad.terrenoIdTerreno || mensualidad.terrenoIdTerreno === undefined) {
            throw new BadRequestException('idTerreno no puede ser nulo');
        }

        const createdMensualidad = new Mensualidad();

        createdMensualidad.numeroMensualidad = mensualidad.numeroMensualidad;
        createdMensualidad.fechaPago = mensualidad.fechaPago;
        createdMensualidad.monto = mensualidad.monto;
        createdMensualidad.cantidadConLetra = mensualidad.cantidadConLetra;
        createdMensualidad.mes = mensualidad.mes;
        createdMensualidad.formaPago = mensualidad.formaPago;
        createdMensualidad.estatus = mensualidad.estatus;

        //Terreno
        const terreno = await this._terrenoRepository.findOne({ where: { idTerreno: mensualidad.terrenoIdTerreno } });

        if (!terreno || terreno === undefined) {
            throw new NotFoundException('El terreno no existe');
        }

        //Restar cantidad del monto al saldo del terreno
        terreno.saldo = terreno.saldo - mensualidad.monto;

        await terreno.save();

        createdMensualidad.terreno = terreno;

        //Usuario
        const usuario = await this._usuarioRepository.findOne({ where: { idUsuario: terreno.usuario.idUsuario } });

        if (!usuario || usuario === undefined) {
            throw new NotFoundException('El usuario no existe');
        }

        createdMensualidad.usuario = usuario;

        await createdMensualidad.save();

        return plainToClass(ReadMensualidadDto, createdMensualidad);

    }

}
