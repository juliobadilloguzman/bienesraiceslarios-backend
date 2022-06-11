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
import { UpdateTerrenoDto } from './dto/updateTerreno.dto';
import { Fraccionamiento } from '../fraccionamientos/fraccionamiento.entity';

@Injectable()
export class TerrenosService {
    
    /**
     * Creates an instance of TerrenosService.
     * 
     * @param {TerrenoRepository} terrenoRepository
     * @param {UsuarioRepository} usuarioRepository
     * @param {FraccionamientoRepository} fraccionamientoRepository
     * @param {VendedorRepository} vendedorRepository
     * @memberof TerrenosService
     */
    constructor(@InjectRepository(TerrenoRepository)
                private readonly terrenoRepository: TerrenoRepository,
                @InjectRepository(UsuarioRepository)
                private readonly usuarioRepository: UsuarioRepository,
                @InjectRepository(FraccionamientoRepository)
                private readonly fraccionamientoRepository: FraccionamientoRepository,
                @InjectRepository(VendedorRepository)
                private readonly vendedorRepository: VendedorRepository
    ) { }

    /**
     * Gets a Terreno by its uuid.
     *
     * @param {string} uuidTerreno
     * @return {*}  {Promise<ReadTerrenoDto>}
     * @memberof TerrenosService
     */
    async getTerreno(uuidTerreno: string): Promise<ReadTerrenoDto> {

        if (uuidTerreno == null) {
            throw new BadRequestException('uuidTerreno no puede ser nulo');
        }

        const terreno: Terreno = await this.terrenoRepository.findOne({ where: { uuid: uuidTerreno } });

        if (terreno == null) {
            throw new NotFoundException(`El terreno con uuid ${uuidTerreno} no existe`);
        }

        return plainToClass(ReadTerrenoDto, terreno);

    }

    /**
     * Get all the Terrenos with Active Status.
     *
     * @return {*}  {Promise<ReadTerrenoDto[]>}
     * @memberof TerrenosService
     */
    async getTerrenos(): Promise<ReadTerrenoDto[]> {

        const terrenos: Terreno[] = await this.terrenoRepository.find({ where: { estatus: Estatus.ACTIVO } });

        return terrenos.map((terreno: Terreno) => plainToClass(ReadTerrenoDto, terreno));

    }

    /**
     * Gets all the Terrenos from a User.
     *
     * @param {number} idUsuario
     * @return {*}  {Promise<ReadTerrenoDto[]>}
     * @memberof TerrenosService
     */
    async getTerrenosFromUser(idUsuario: number): Promise<ReadTerrenoDto[]> {

        const usuario: Usuario = await this.usuarioRepository.findOne({where: {idUsuario: idUsuario, estatus: Estatus.ACTIVO}});

        if (usuario == null) {
            throw new NotFoundException(`El usuario con id ${idUsuario} no existe`);
        }

        const terrenos: Terreno[] = await this.terrenoRepository.find({ where: { usuario: usuario } });

        return terrenos.map((terreno: Terreno) => plainToClass(ReadTerrenoDto, terreno));

    }

    /**
     * Creates a Terreno.
     *
     * @param {CreateTerrenoDto} terreno
     * @return {*}  {Promise<ReadTerrenoDto>}
     * @memberof TerrenosService
     */
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
        const fraccionamiento: Fraccionamiento = await this.fraccionamientoRepository.findOne({ where: { idFraccionamiento: terreno.fraccionamientoIdFraccionamiento } });

        if (!fraccionamiento || fraccionamiento === undefined) {
            throw new NotFoundException('El fraccionamiento no existe');
        }

        createdTerreno.fraccionamiento = fraccionamiento;

        //Usuario
        const usuario: Usuario = await this.usuarioRepository.findOne({ where: { idUsuario: terreno.usuarioIdUsuario } });

        if (!usuario || usuario === undefined) {
            throw new NotFoundException('El usuario no existe');
        }

        createdTerreno.usuario = usuario;

        //Vendedores
        createdTerreno.vendedores = terreno.vendedores;

        await createdTerreno.save();

        return plainToClass(ReadTerrenoDto, createdTerreno);

    }

    /**
     * Updates a Terreno.
     *
     * @param {number} idTerreno
     * @param {UpdateTerrenoDto} terreno
     * @return {*}  {Promise<ReadTerrenoDto>}
     * @memberof TerrenosService
     */
    async updateTerreno(idTerreno: number, terreno: UpdateTerrenoDto): Promise<ReadTerrenoDto> {

        const foundTerreno: Terreno = await this.terrenoRepository.findOne(idTerreno);

        if (foundTerreno == null) {
            throw new NotFoundException(`El terreno con id ${idTerreno} no existe.`);
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

        const foundFraccionamiento: Fraccionamiento = await this.fraccionamientoRepository.findOne(terreno.fraccionamientoIdFraccionamiento);

        if (foundFraccionamiento == null) {
            throw new NotFoundException('El fraccionamiento no existe');
        }
            
        foundTerreno.fraccionamiento = foundFraccionamiento;

        const foundUsuario: Usuario = await this.usuarioRepository.findOne(terreno.usuarioIdUsuario);

        if (foundUsuario == null) {
            throw new NotFoundException('El usuario no existe');
        }

        foundTerreno.usuario = foundUsuario;
        foundTerreno.vendedores = terreno.vendedores;

        await this.terrenoRepository.save(foundTerreno);

        return plainToClass(ReadTerrenoDto, foundTerreno);

    }

    /**
     * Deletes a Terreno.
     *
     * @param {number} idTerreno
     * @return {*}  {Promise<any>}
     * @memberof TerrenosService
     */
    async deleteTerreno(idTerreno: number): Promise<any> {

        const terrenoExists = await this.terrenoRepository.findOne(idTerreno);

        if (!terrenoExists || terrenoExists === undefined) {
            throw new NotFoundException('El terreno no existe');
        }

        terrenoExists.estatus = Estatus.CANCELADO;
        terrenoExists.save();

        return { deleted: true };

    }

    /**
     * Verify is a Terreno is duplicated.
     *
     * @param {*} information
     * @return {*}  {Promise<any>}
     * @memberof TerrenosService
     */
    async isDuplicated(information: any): Promise<any>{

        const foundFraccionamiento: Fraccionamiento = await this.fraccionamientoRepository.findOne({where: {idFraccionamiento: information.idFraccionamiento}});

        const terreno: Terreno = await this.terrenoRepository.findOne({where: { noManzana: information.noManzana, noLote: information.noLote, fraccionamiento: foundFraccionamiento, estatus: Estatus.ACTIVO }});

        if(terreno == null){
            return false;
        }

        return true;

    }

    async changeStatus(idTerreno: number, data: any): Promise<any>{

        const foundTerreno = await this.terrenoRepository.findOne({where: {idTerreno: idTerreno}});

        foundTerreno.estatusTerreno = data.estatusTerreno;

        await this.terrenoRepository.save(foundTerreno);

        return {updated: true};


    }

}
