import { Controller, Get, Post, Patch, Delete, Body, ParseIntPipe, Param } from '@nestjs/common';
import { FraccionamientoService } from './fraccionamiento.service';
import { ReadFraccionamientoDto } from './dto/readFraccionamiento.dto';
import { Fraccionamiento } from './fraccionamiento.entity';

@Controller('fraccionamientos')
export class FraccionamientoController {

    constructor(private readonly _fraccionamientoService: FraccionamientoService) { }

    @Get(':idFraccionamiento')
    getFraccionamiento(@Param('idFraccionamiento', ParseIntPipe) idFraccionamiento: number): Promise<ReadFraccionamientoDto> {
        return this._fraccionamientoService.getFraccionamiento(idFraccionamiento);
    }

    @Get()
    getFraccionamientos(): Promise<ReadFraccionamientoDto[]> {
        return this._fraccionamientoService.getFraccionamientos();
    }

    @Post()
    createFraccionamiento(@Body() fraccionamiento: Fraccionamiento): Promise<ReadFraccionamientoDto> {
        return this._fraccionamientoService.createFraccionamiento(fraccionamiento);
    }

    @Patch(':idFraccionamiento')
    updateFraccionamiento(@Param('idFraccionamiento', ParseIntPipe) idFraccionamiento: number, @Body() fraccionamiento: Fraccionamiento): Promise<ReadFraccionamientoDto> {
        return this._fraccionamientoService.updateFraccionamiento(idFraccionamiento, fraccionamiento);
    }

    @Delete(':idFraccionamiento')
    deleteFraccionamiento(@Param('idFraccionamiento', ParseIntPipe) idFraccionamiento: number): Promise<any> {
        return this._fraccionamientoService.deleteFraccionamiento(idFraccionamiento);
    }

}
