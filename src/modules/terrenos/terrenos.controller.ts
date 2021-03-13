import { Controller, Get, Param, ParseIntPipe, Body, Post, Patch, Delete } from '@nestjs/common';
import { TerrenosService } from './terrenos.service';
import { ReadTerrenoDto, CreateTerrenoDto, UpdateTerrenoDto } from './dto';

@Controller('terrenos')
export class TerrenosController {

    constructor(private readonly _terrenoService: TerrenosService) { }

    @Get(':idTerreno')
    getTerreno(@Param('idTerreno', ParseIntPipe) idTerreno: number): Promise<ReadTerrenoDto> {
        return this._terrenoService.getTerreno(idTerreno);
    }

    @Get()
    getTerrenos(): Promise<ReadTerrenoDto[]> {
        return this._terrenoService.getTerrenos();
    }

    @Get('usuario/:idUsuario')
    getTerrenosFromUser(@Param('idUsuario', ParseIntPipe) idUsuario: number): Promise<ReadTerrenoDto[]> {
        return this._terrenoService.getTerrenosFromUser(idUsuario);
    }

    @Post()
    createTerreno(@Body() terreno: CreateTerrenoDto): Promise<ReadTerrenoDto> {
        return this._terrenoService.createTerreno(terreno);
    }

    @Patch(':idTerreno')
    updateRol(@Param('idTerreno', ParseIntPipe) idTerreno: number, @Body() terreno: UpdateTerrenoDto): Promise<ReadTerrenoDto> {
        return this._terrenoService.updateTerreno(idTerreno, terreno);
    }

    @Delete(':idTerreno')
    deleteRol(@Param('idTerreno', ParseIntPipe) idTerreno: number): Promise<any> {
        return this._terrenoService.deleteTerreno(idTerreno);
    }

}
