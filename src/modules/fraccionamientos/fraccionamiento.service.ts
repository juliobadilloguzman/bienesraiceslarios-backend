import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { FraccionamientoRepository } from './fraccionamiento.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadFraccionamientoDto } from './dto/readFraccionamiento.dto';
import { Fraccionamiento } from './fraccionamiento.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class FraccionamientoService {

    constructor(
        @InjectRepository(FraccionamientoRepository)
        private readonly _fraccionamientoRepository: FraccionamientoRepository
    ) { }

    async getFraccionamiento(idFraccionamiento: number): Promise<ReadFraccionamientoDto> {

        if (!idFraccionamiento || idFraccionamiento === undefined) {
            throw new BadRequestException('El idFraccionamiento no puede ser nulo');
        }

        const fraccionamiento: Fraccionamiento = await this._fraccionamientoRepository.findOne(idFraccionamiento);

        console.log(fraccionamiento);

        if (!idFraccionamiento || fraccionamiento === undefined) {
            throw new NotFoundException('El fraccionamiento no existe');
        }

        return plainToClass(ReadFraccionamientoDto, fraccionamiento);

    }

    async getFraccionamientos(): Promise<ReadFraccionamientoDto[]> {

        const fraccionamientos: Fraccionamiento[] = await this._fraccionamientoRepository.find();

        return fraccionamientos.map((fraccionamiento: Fraccionamiento) => plainToClass(ReadFraccionamientoDto, fraccionamiento));

    }

    async createFraccionamiento(fraccionamiento: Fraccionamiento): Promise<ReadFraccionamientoDto> {

        const foundFraccionamiento = await this._fraccionamientoRepository.findOne(null, { where: { nombre: fraccionamiento.nombre } });

        if (foundFraccionamiento) {
            throw new ConflictException('El nombre del fraccionamiento ya existe');
        }

        const createdFraccionamiento: Fraccionamiento = await this._fraccionamientoRepository.save(fraccionamiento);

        return plainToClass(ReadFraccionamientoDto, createdFraccionamiento);

    }

    async updateFraccionamiento(idFraccionamiento: number, fraccionamiento: Fraccionamiento): Promise<ReadFraccionamientoDto> {

        const foundFraccionamiento: Fraccionamiento = await this._fraccionamientoRepository.findOne(idFraccionamiento);

        if (!foundFraccionamiento || foundFraccionamiento === undefined) {
            throw new NotFoundException('El fraccionamiento no existe');
        }

        foundFraccionamiento.nombre = fraccionamiento.nombre;

        const updatedFraccionamiento = await this._fraccionamientoRepository.save(foundFraccionamiento);

        return plainToClass(ReadFraccionamientoDto, updatedFraccionamiento);

    }

    async deleteFraccionamiento(idFraccionamiento: number): Promise<any> {

        const fraccionamientoExists = await this._fraccionamientoRepository.findOne(idFraccionamiento);

        if (!fraccionamientoExists || fraccionamientoExists === undefined) {
            throw new NotFoundException('El fraccionamiento no existe');
        }

        this._fraccionamientoRepository.remove(fraccionamientoExists);

        return { deleted: true };

    }

}
