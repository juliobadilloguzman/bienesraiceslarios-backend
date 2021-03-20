import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TerrenoRepository } from './terreno.repository';
import { ReadTerrenoDto } from './dto';
import { Terreno } from './terreno.entity';
import { plainToClass } from 'class-transformer';
import { CreateTerrenoDto } from './dto/createTerreno.dto';
import { UsuarioRepository } from '../usuarios/usuario.repository';
import { FraccionamientoRepository } from '../fraccionamientos/fraccionamiento.repository';
import { VendedorRepository } from '../vendedores/vendedor.repository';
import { Usuario } from '../usuarios/usuario.entity';
import { Estatus } from '../../shared/estatus.enum';
import { Mensualidad } from '../mensualidades/mensualidad.entity';
import { UpdateTerrenoDto } from './dto/updateTerreno.dto';
import { Fraccionamiento } from '../fraccionamientos/fraccionamiento.entity';

@Injectable()
export class TerrenosService {

    constructor(
        @InjectRepository(TerrenoRepository)
        private readonly _terrenoRepository: TerrenoRepository,
        @InjectRepository(UsuarioRepository)
        private readonly _usuarioRepository: UsuarioRepository,
        @InjectRepository(FraccionamientoRepository)
        private readonly _fraccionamientoRepository: FraccionamientoRepository,
        @InjectRepository(VendedorRepository)
        private readonly _vendedorRepository: VendedorRepository
    ) { }

    async getTerreno(idTerreno: number): Promise<ReadTerrenoDto> {

        if (!idTerreno || idTerreno === undefined) {
            throw new BadRequestException('idTerreno no puede ser nulo');
        }

        const terreno: Terreno = await this._terrenoRepository.findOne(idTerreno);

        if (!terreno || terreno === undefined) {
            throw new NotFoundException('El terreno no existe');
        }

        return plainToClass(ReadTerrenoDto, terreno);

    }

    async getTerrenos(): Promise<ReadTerrenoDto[]> {

        const terrenos: Terreno[] = await this._terrenoRepository.find({where: {estatus: Estatus.ACTIVO}});

        return terrenos.map((terreno: Terreno) => plainToClass(ReadTerrenoDto, terreno));

    }

    async getTerrenosFromUser(idUsuario: number): Promise<ReadTerrenoDto[]> {

        const usuario: Usuario = await this._usuarioRepository.findOne({where: {idUsuario: idUsuario, estatus: Estatus.ACTIVO}});

        if (!usuario || usuario === undefined) {
            throw new NotFoundException('El usuario no existe');
        }

        const terrenos: Terreno[] = await this._terrenoRepository.find({ where: { usuario: usuario } });

        return terrenos.map((terreno: Terreno) => plainToClass(ReadTerrenoDto, terreno));

    }

    async createTerreno(terreno: CreateTerrenoDto): Promise<ReadTerrenoDto> {

        if (!terreno.fraccionamientoIdFraccionamiento || terreno.fraccionamientoIdFraccionamiento === undefined) {
            throw new BadRequestException('idFraccionamiento no puede ser nulo');
        }

        if (!terreno.usuarioIdUsuario || terreno.usuarioIdUsuario === undefined) {
            throw new BadRequestException('idUsuario no puede ser nulo');
        }

        const createdTerreno = new Terreno();

        createdTerreno.noManzana = terreno.noManzana;
        createdTerreno.noLote = terreno.noLote;
        createdTerreno.superficie = terreno.superficie;
        createdTerreno.costoM2 = terreno.costoM2;
        createdTerreno.formaPagoEnganche = terreno.formaPagoEnganche;
        createdTerreno.pagoAlContado = terreno.pagoAlContado;
        createdTerreno.enganche = terreno.enganche;
        createdTerreno.costoTotal = terreno.costoTotal;
        createdTerreno.saldo = terreno.saldo;
        createdTerreno.fechaVenta = terreno.fechaVenta;
        createdTerreno.noMensualidades = terreno.noMensualidades;
        createdTerreno.montoMensualidad = terreno.montoMensualidad;
        createdTerreno.diaPagoDel = terreno.diaPagoDel;
        createdTerreno.diaPagoAl = terreno.diaPagoAl;
        createdTerreno.pagoDeslinde = terreno.pagoDeslinde;
        createdTerreno.fechaPagoDeslinde = terreno.fechaPagoDeslinde;
        createdTerreno.montoDeslinde = terreno.montoDeslinde;
        createdTerreno.fechaPrimeraMensualidad = terreno.fechaPrimeraMensualidad;
        createdTerreno.comentariosAdicionales = terreno.comentariosAdicionales;
        createdTerreno.estatus = terreno.estatus;

        //Fraccionamiento
        const fraccionamiento = await this._fraccionamientoRepository.findOne({ where: { idFraccionamiento: terreno.fraccionamientoIdFraccionamiento } });

        if (!fraccionamiento || fraccionamiento === undefined) {
            throw new NotFoundException('El fraccionamiento no existe');
        }

        createdTerreno.fraccionamiento = fraccionamiento;

        //Usuario
        const usuario = await this._usuarioRepository.findOne({ where: { idUsuario: terreno.usuarioIdUsuario } });

        if (!usuario || usuario === undefined) {
            throw new NotFoundException('El usuario no existe');
        }

        createdTerreno.usuario = usuario;

        //Vendedores
        createdTerreno.vendedores = terreno.vendedores;

        await createdTerreno.save();

        return plainToClass(ReadTerrenoDto, createdTerreno);

    }

    async updateTerreno(idTerreno: number, terreno: UpdateTerrenoDto): Promise<ReadTerrenoDto> {

        const foundTerreno: Terreno = await this._terrenoRepository.findOne(idTerreno);

        if (!foundTerreno || foundTerreno === undefined) {
            throw new NotFoundException('El terreno no existe');
        }

        foundTerreno.noManzana = terreno.noManzana;
        foundTerreno.noLote = terreno.noLote;
        foundTerreno.superficie = terreno.superficie;
        foundTerreno.costoM2 = terreno.costoM2;
        foundTerreno.enganche = terreno.enganche;
        foundTerreno.formaPagoEnganche = terreno.formaPagoEnganche;
        foundTerreno.pagoAlContado = terreno.pagoAlContado;
        foundTerreno.costoTotal = terreno.costoTotal;
        foundTerreno.saldo = terreno.saldo;
        foundTerreno.fechaVenta = terreno.fechaVenta;
        foundTerreno.noMensualidades = terreno.noMensualidades;
        foundTerreno.montoMensualidad = terreno.montoMensualidad;
        foundTerreno.diaPagoDel = terreno.diaPagoDel
        foundTerreno.diaPagoAl = terreno.diaPagoAl;
        foundTerreno.pagoDeslinde = terreno.pagoDeslinde;
        foundTerreno.fechaPagoDeslinde = terreno.fechaPagoDeslinde;
        foundTerreno.montoDeslinde = terreno.montoDeslinde;
        foundTerreno.fechaPrimeraMensualidad = terreno.fechaPrimeraMensualidad;
        foundTerreno.comentariosAdicionales = terreno.comentariosAdicionales;

        const foundFraccionamiento: Fraccionamiento = await this._fraccionamientoRepository.findOne(terreno.fraccionamientoIdFraccionamiento);

        if (!foundFraccionamiento || foundFraccionamiento === undefined) {
            throw new NotFoundException('El fraccionamiento no existe');
        }
            
        foundTerreno.fraccionamiento = foundFraccionamiento;

        const foundUsuario: Usuario = await this._usuarioRepository.findOne(terreno.usuarioIdUsuario);

        if (!foundUsuario || foundUsuario === undefined) {
            throw new NotFoundException('El usuario no existe');
        }

        foundTerreno.usuario = foundUsuario;
        foundTerreno.vendedores = terreno.vendedores;

        await this._terrenoRepository.save(foundTerreno);

        return plainToClass(ReadTerrenoDto, foundTerreno);

    }

    async deleteTerreno(idTerreno: number): Promise<any> {

        const terrenoExists = await this._terrenoRepository.findOne(idTerreno);

        if (!terrenoExists || terrenoExists === undefined) {
            throw new NotFoundException('El terreno no existe');
        }

        terrenoExists.estatus = Estatus.CANCELADO;
        terrenoExists.save();

        return { deleted: true };

    }

    async isDuplicated(information: any): Promise<any>{

        const foundFraccionamiento = await this._fraccionamientoRepository.findOne({where: {idFraccionamiento: information.idFraccionamiento}});

        const terreno = await this._terrenoRepository.findOne({where: {noManzana: information.noManzana, noLote: information.noLote, fraccionamiento: foundFraccionamiento, estatus: Estatus.ACTIVO}});

        if(terreno){
            return true;
        }

        return false;

    }

    async changeStatus(idTerreno: number, data: any): Promise<any>{

        const foundTerreno = await this._terrenoRepository.findOne({where: {idTerreno: idTerreno}});

        foundTerreno.estatusTerreno = data.estatusTerreno;

        await this._terrenoRepository.save(foundTerreno);

        return {updated: true};


    }

}
