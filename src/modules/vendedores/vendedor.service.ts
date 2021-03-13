import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ReadVendedorDto, CreateVendedorDto, UpdateVendedorDto } from './dto';
import { Vendedor } from './vendedor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { VendedorRepository } from './vendedor.repository';
import { plainToClass } from 'class-transformer';
import { Estatus } from '../../shared/estatus.enum';

@Injectable()
export class VendedorService {

    constructor(
        @InjectRepository(VendedorRepository)
        private readonly _vendedorRepository: VendedorRepository
    ) { }

    async getVendedor(idVendedor: number): Promise<ReadVendedorDto> {

        if (!idVendedor || idVendedor === undefined) {
            throw new BadRequestException('El idVendedor no puede ser nulo');
        }

        const vendedor: Vendedor = await this._vendedorRepository.findOne(idVendedor);

        if (!vendedor || vendedor === undefined) {
            throw new NotFoundException('El vendedor no existe');
        }

        return plainToClass(ReadVendedorDto, vendedor);

    }

    async getVendedores(): Promise<ReadVendedorDto[]> {

        const vendedores: Vendedor[] = await this._vendedorRepository.find({ where: { estatus: Estatus.ACTIVO } });

        return vendedores.map((vendedor: Vendedor) => plainToClass(ReadVendedorDto, vendedor));

    }



    async createVendedor(vendedor: Partial<CreateVendedorDto>): Promise<ReadVendedorDto> {

        const createdVendedor: Vendedor = await this._vendedorRepository.save(vendedor);

        return plainToClass(ReadVendedorDto, createdVendedor);

    }

    async updateVendedor(idVendedor: number, vendedor: Partial<UpdateVendedorDto>): Promise<ReadVendedorDto> {

        const foundVendedor: Vendedor = await this._vendedorRepository.findOne(idVendedor);

        if (!foundVendedor || foundVendedor === undefined) {
            throw new NotFoundException('El vendedor no existe');
        }

        foundVendedor.nombre = vendedor.nombre;
        foundVendedor.apellidoPaterno = vendedor.apellidoPaterno;
        foundVendedor.apellidoMaterno = vendedor.apellidoMaterno;
        foundVendedor.telefono = vendedor.telefono;
        foundVendedor.correo = vendedor.correo;

        const updatedVendedor = await this._vendedorRepository.save(foundVendedor);

        return plainToClass(ReadVendedorDto, updatedVendedor);

    }


    async deleteVendedor(idUsuario: number): Promise<any> {

        const vendedorExists = await this._vendedorRepository.findOne(idUsuario);

        if (!vendedorExists || vendedorExists === undefined) {
            throw new NotFoundException('El usuario no existe');
        }

        vendedorExists.estatus = Estatus.ELIMINADO;
        vendedorExists.save();

        return { deleted: true };

    }

}
