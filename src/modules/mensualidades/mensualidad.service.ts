import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TerrenoRepository } from '../terrenos/terreno.repository';
import { MensualidadRepository } from './mensualidad.repository';
import { ReadMensualidadDto } from './dto/readMensualidad.dto';
import { Mensualidad } from './mensualidad.entity';
import { plainToClass } from 'class-transformer';
import { CreateMensualidadDto } from './dto/createMensualidad.dto';
import { UsuarioRepository } from '../usuarios/usuario.repository';
import { Terreno } from '../terrenos/terreno.entity';
import { Fraccionamiento } from '../fraccionamientos/fraccionamiento.entity';
import { FraccionamientoRepository } from '../fraccionamientos/fraccionamiento.repository';
import { UpdateMensualidadDto } from './dto';
import { Estatus } from 'src/shared/estatus.enum';

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

    async getMensualidadesFromTerreno(idTerreno: number): Promise<ReadMensualidadDto[]> {

        if (!idTerreno || idTerreno === undefined) {
            throw new BadRequestException('idTerreno no puede ser nulo');
        }

        const terrenoExists: Terreno = await this._terrenoRepository.findOne(idTerreno);

        if (!terrenoExists || terrenoExists === undefined) {
            throw new NotFoundException('El terreno no existe');
        }

        const mensualidades: Mensualidad[] = await this._mensualidadRepository.find({ where: { terreno: terrenoExists } });

        return mensualidades.map((mensualidad: Mensualidad) => plainToClass(ReadMensualidadDto, mensualidad));


    }

    async createMensualidad(mensualidad: CreateMensualidadDto): Promise<ReadMensualidadDto> {

        if (!mensualidad.terrenoIdTerreno || mensualidad.terrenoIdTerreno === undefined) {
            throw new BadRequestException('idTerreno no puede ser nulo');
        }

        const createdMensualidad = new Mensualidad();

        createdMensualidad.numeroRecibo = mensualidad.numeroRecibo;
        createdMensualidad.numeroMensualidad = mensualidad.numeroMensualidad;
        createdMensualidad.fechaPago = mensualidad.fechaPago;
        createdMensualidad.monto = mensualidad.monto;
        createdMensualidad.cantidadConLetra = mensualidad.cantidadConLetra;
        createdMensualidad.mes = mensualidad.mes;
        createdMensualidad.formaPago = mensualidad.formaPago;
        createdMensualidad.estatusPago = mensualidad.estatusPago;
        createdMensualidad.interes = mensualidad.interes;
        createdMensualidad.estatusInteres = mensualidad.estatusInteres;

        //Terreno
        const terreno = await this._terrenoRepository.findOne({ where: { idTerreno: mensualidad.terrenoIdTerreno } });

        if (!terreno || terreno === undefined) {
            throw new NotFoundException('El terreno no existe');
        }

        //Restar cantidad del monto al saldo del terreno en caso de que sea pagada
        if (mensualidad.estatusPago == 'PAGADA') {
            terreno.saldo = terreno.saldo - mensualidad.monto;
        }

        //Si tiene interes, sumarle el saldo y actualizar el terreno a con intereses
        if (mensualidad.interes) {
            terreno.saldo = terreno.saldo + mensualidad.interes;
            terreno.estatusTerreno = Estatus.CON_INTERESES;
        }

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

    async updateMensualidad(idMensualidad: number, mensualidad: UpdateMensualidadDto): Promise<ReadMensualidadDto> {

        const foundMensualidad: Mensualidad = await this._mensualidadRepository.findOne(idMensualidad);

        if (!foundMensualidad || foundMensualidad === undefined) {
            throw new NotFoundException('La mensualidad no existe');
        }

        foundMensualidad.numeroMensualidad = mensualidad.numeroMensualidad;
        foundMensualidad.numeroRecibo = mensualidad.numeroRecibo;
        foundMensualidad.fechaPago = mensualidad.fechaPago;
        foundMensualidad.monto = mensualidad.monto;
        foundMensualidad.cantidadConLetra = mensualidad.cantidadConLetra;
        foundMensualidad.mes = mensualidad.mes;
        foundMensualidad.formaPago = mensualidad.formaPago;
        foundMensualidad.estatusPago = mensualidad.estatusPago;
        foundMensualidad.interes = mensualidad.interes;
        foundMensualidad.estatusInteres = mensualidad.estatusInteres;

        const foundTerreno: Terreno = await this._terrenoRepository.findOne({ where: { idTerreno: mensualidad.terrenoIdTerreno } });

        if (!foundTerreno || foundTerreno === undefined) {
            throw new NotFoundException('El terreno no existe');
        }

        //Descontar el interes del precio total del terreno
        if (mensualidad.estatusInteres == 'PAGADO') {

            foundTerreno.saldo = foundTerreno.saldo - foundMensualidad.interes;
            foundMensualidad.interes = 0;

        }else if(mensualidad.estatusInteres == 'NO PAGADO'){
            foundTerreno.estatusTerreno = Estatus.CON_INTERESES;
        }


        //Si ya la pago, restar el monto de la mensualidad al saldo del terreno
        if (mensualidad.estatusPago == 'PAGADA') {

            foundTerreno.saldo = foundTerreno.saldo - mensualidad.monto;

        }

        await this._terrenoRepository.save(foundTerreno);

        const updatedMensualidad = await this._mensualidadRepository.save(foundMensualidad);

        //Actualizar el estatus del terreno con base en los intereses
        if (mensualidad.estatusInteres == 'PAGADO') {

            const terrenoUpdated: Terreno = await this._terrenoRepository.findOne({ where: { idTerreno: mensualidad.terrenoIdTerreno } });

            //Buscar si tiene mas mensualidades sin intereses
            const mensualidades: Mensualidad[] = await this._mensualidadRepository.find({ where: { terreno: terrenoUpdated } });

            let hasMoreIntereses: boolean = false;

            for (let mensualidad of mensualidades) {
                if (mensualidad.estatusInteres == Estatus.NO_PAGADO) {
                    hasMoreIntereses = true;
                    break;
                }
            }

            if (!hasMoreIntereses) {
                terrenoUpdated.estatusTerreno = Estatus.AL_CORRIENTE;
                await this._terrenoRepository.save(terrenoUpdated);
            }

        }

        return plainToClass(ReadMensualidadDto, updatedMensualidad);


    }

}
