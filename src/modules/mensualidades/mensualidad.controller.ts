import { Controller, Get, Param, Post, Body, ParseIntPipe } from '@nestjs/common';
import { MensualidadService } from './mensualidad.service';
import { CreateMensualidadDto } from './dto/createMensualidad.dto';
import { ReadMensualidadDto } from './dto';

@Controller('mensualidades')
export class MensualidadController {

    constructor(private readonly _mensualidadService: MensualidadService) { }

    @Get(':idMensualidad')
    getMensualidad(@Param('idMensualidad', ParseIntPipe) idMensualidad: number): Promise<ReadMensualidadDto> {
        return this._mensualidadService.getMensualidad(idMensualidad);
    }

    @Get()
    getMensualidades(): Promise<ReadMensualidadDto[]> {
        return this._mensualidadService.getMensualidades();
    }

    @Post()
    createMensualidad(@Body() mensualidad: CreateMensualidadDto): Promise<ReadMensualidadDto> {
        return this._mensualidadService.createMensualidad(mensualidad);
    }

}
