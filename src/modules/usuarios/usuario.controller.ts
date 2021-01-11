import { Controller, ParseIntPipe, Param, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { ReadUsuarioDto } from './dto/readUsuario.dto';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto';

@Controller('usuarios')
export class UsuarioController {

    constructor(private readonly _usuarioService: UsuarioService) { }

    @Get(':idUsuario')
    getUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number): Promise<ReadUsuarioDto> {
        return this._usuarioService.getUsuario(idUsuario);
    }

    @Get()
    getUsuarios(): Promise<ReadUsuarioDto[]> {
        return this._usuarioService.getUsuarios();
    }

    @Post()
    createUsuario(@Body() usuario: Partial<CreateUsuarioDto>): Promise<ReadUsuarioDto> {
        return this._usuarioService.createUsuario(usuario);
    }

    @Patch(':idUsuario')
    updateRol(@Param('idUsuario', ParseIntPipe) idUsuario: number, @Body() usuario: Partial<UpdateUsuarioDto>): Promise<ReadUsuarioDto> {
        return this._usuarioService.updateUsuario(idUsuario, usuario);
    }

    @Delete(':idUsuario')
    deleteRol(@Param('idUsuario', ParseIntPipe) idUsuario: number): Promise<any> {
        return this._usuarioService.deleteUsuario(idUsuario);
    }

}
