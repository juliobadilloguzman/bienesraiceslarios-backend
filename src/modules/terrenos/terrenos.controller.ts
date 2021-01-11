import { Controller, Get, Param, ParseIntPipe, Body, Post } from '@nestjs/common';
import { TerrenosService } from './terrenos.service';
import { ReadTerrenoDto, CreateTerrenoDto } from './dto';

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

    @Post()
    createTerreno(@Body() terreno: CreateTerrenoDto): Promise<ReadTerrenoDto> {
        return this._terrenoService.createTerreno(terreno);
    }

    // @Patch(':idUsuario')
    // updateRol(@Param('idUsuario', ParseIntPipe) idUsuario: number, @Body() usuario: Partial<UpdateUsuarioDto>): Promise<ReadUsuarioDto> {
    //     return this._usuarioService.updateUsuario(idUsuario, usuario);
    // }

    // @Delete(':idUsuario')
    // deleteRol(@Param('idUsuario', ParseIntPipe) idUsuario: number): Promise<any> {
    //     return this._usuarioService.deleteUsuario(idUsuario);
    // }

}
