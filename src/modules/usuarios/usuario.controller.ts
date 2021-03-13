import { Controller, ParseIntPipe, Param, Get, Post, Body, Patch, Delete, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { ReadUsuarioDto } from './dto/readUsuario.dto';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto';
import { ReadCuentaDto } from '../cuentas/dto';

@Controller('usuarios')
export class UsuarioController {

    constructor(private readonly _usuarioService: UsuarioService) { }

    @Get(':idUsuario')
    getUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number): Promise<ReadUsuarioDto> {
        return this._usuarioService.getUsuario(idUsuario);
    }

    // @Get()
    // getUsuarios(): Promise<ReadUsuarioDto[]> {
    //     return this._usuarioService.getUsuarios();
    // }

    @Get()
    getUsuarios(@Query() rol?): Promise<ReadUsuarioDto[]> {

        if (JSON.stringify(rol) === '{}') {
            return this._usuarioService.getUsuarios();
        } else if (rol.rol == 'clientes') {
            return this._usuarioService.getClientes();
        } else if (rol.rol == 'administradores') {
            return this._usuarioService.getAdministradores();
        } else if (rol.rol == 'capturistas') {
            return this._usuarioService.getCapturistas();
        }

    }

    @Post()
    createUsuario(@Body() usuario: Partial<CreateUsuarioDto>): Promise<ReadUsuarioDto> {
        return this._usuarioService.createUsuario(usuario);
    }

    @Patch(':idUsuario')
    updateUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number, @Body() usuario: Partial<UpdateUsuarioDto>): Promise<ReadUsuarioDto> {
        return this._usuarioService.updateUsuario(idUsuario, usuario);
    }

    @Delete(':idUsuario')
    deleteUsuario(@Param('idUsuario', ParseIntPipe) idUsuario: number): Promise<any> {
        return this._usuarioService.deleteUsuario(idUsuario);
    }

}
