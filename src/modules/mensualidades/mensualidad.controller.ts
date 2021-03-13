import { Controller, Get, Param, Post, Body, ParseIntPipe, Patch } from '@nestjs/common';
import { MensualidadService } from './mensualidad.service';
import { CreateMensualidadDto } from './dto/createMensualidad.dto';
import { ReadMensualidadDto, UpdateMensualidadDto } from './dto';

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

    @Get('terreno/:idTerreno')
    getMensualidadesFromTerreno(@Param('idTerreno', ParseIntPipe) idTerreno: number): Promise<ReadMensualidadDto[]> {
        return this._mensualidadService.getMensualidadesFromTerreno(idTerreno);
    }

    @Post()
    createMensualidad(@Body() mensualidad: CreateMensualidadDto): Promise<ReadMensualidadDto> {
        return this._mensualidadService.createMensualidad(mensualidad);
    }

    @Patch(':idMensualidad')
    updateMensualidad(@Param('idMensualidad', ParseIntPipe) idMensualidad: number, @Body() mensualidad: UpdateMensualidadDto): Promise<ReadMensualidadDto> {
        return this._mensualidadService.updateMensualidad(idMensualidad, mensualidad);
    }

}
