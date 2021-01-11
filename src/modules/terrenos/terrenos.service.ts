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

        const terrenos: Terreno[] = await this._terrenoRepository.find();

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
        createdTerreno.costoTotal = terreno.costoTotal;
        createdTerreno.saldo = terreno.saldo;
        createdTerreno.fechaVenta = terreno.fechaVenta;
        createdTerreno.noMensualidades = terreno.noMensualidades;
        createdTerreno.montoMensualidad = terreno.montoMensualidad;
        createdTerreno.diaPagoDel = terreno.diaPagoDel;
        createdTerreno.diaPagoAl = terreno.diaPagoAl;
        createdTerreno.pagoDeslinde = terreno.pagoDeslinde;
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

}
