import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ReadVendedorDto, CreateVendedorDto } from './dto';
import { Vendedor } from './vendedor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { VendedorRepository } from './vendedor.repository';
import { plainToClass } from 'class-transformer';

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

        const vendedores: Vendedor[] = await this._vendedorRepository.find();

        return vendedores.map((vendedor: Vendedor) => plainToClass(ReadVendedorDto, vendedor));

    }

    async createVendedor(vendedor: Partial<CreateVendedorDto>): Promise<ReadVendedorDto> {

        const createdVendedor: Vendedor = await this._vendedorRepository.save(vendedor);

        return plainToClass(ReadVendedorDto, createdVendedor);

    }

    async deleteVendedor(idUsuario: number): Promise<any> {

        const vendedorExists = await this._vendedorRepository.findOne(idUsuario);

        if (!vendedorExists || vendedorExists === undefined) {
            throw new NotFoundException('El usuario no existe');
        }

        this._vendedorRepository.remove(vendedorExists);

        return { deleted: true };

    }

}
