import { Controller, Get, Param, ParseIntPipe, Body, Post, Patch, Delete } from '@nestjs/common';
import { TerrenosService } from './terrenos.service';
import { ReadTerrenoDto, CreateTerrenoDto, UpdateTerrenoDto } from './dto';

@Controller('terrenos')
export class TerrenosController {

    constructor(private readonly terrenoService: TerrenosService) { }

    @Get(':idTerreno')
    getTerreno(@Param('idTerreno', ParseIntPipe) idTerreno: number): Promise<ReadTerrenoDto> {
        return this.terrenoService.getTerreno(idTerreno);
    }

    @Get()
    getTerrenos(): Promise<ReadTerrenoDto[]> {
        return this.terrenoService.getTerrenos();
    }

    @Post('isDuplicated')
    isDuplicated(@Body() information: any): Promise<any[]> {
        return this.terrenoService.isDuplicated(information);
    }

    @Get('usuario/:idUsuario')
    getTerrenosFromUser(@Param('idUsuario', ParseIntPipe) idUsuario: number): Promise<ReadTerrenoDto[]> {
        return this.terrenoService.getTerrenosFromUser(idUsuario);
    }

    @Post()
    createTerreno(@Body() terreno: CreateTerrenoDto): Promise<ReadTerrenoDto> {
        return this.terrenoService.createTerreno(terreno);
    }

    @Patch(':idTerreno')
    updateRol(@Param('idTerreno', ParseIntPipe) idTerreno: number, @Body() terreno: UpdateTerrenoDto): Promise<ReadTerrenoDto> {
        return this.terrenoService.updateTerreno(idTerreno, terreno);
    }

    @Patch('changeStatus/:idTerreno')
    changeStatus(@Param('idTerreno', ParseIntPipe) idTerreno: number, @Body() estatus: any): Promise<any> {
        return this.terrenoService.changeStatus(idTerreno, estatus);
    }

    @Delete(':idTerreno')
    deleteRol(@Param('idTerreno', ParseIntPipe) idTerreno: number): Promise<any> {
        return this.terrenoService.deleteTerreno(idTerreno);
    }

}
