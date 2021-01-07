import { Controller, ParseIntPipe, Param, Get, Post, Body } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { ReadUsuarioDto } from './dto/readUsuario';
import { Cuenta } from '../cuentas/cuenta.entity';
import { Usuario } from './usuario.entity';

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
    createRol(@Body() usuario: Usuario): Promise<ReadUsuarioDto> {
        return this._usuarioService.createUsuario(usuario);
    }

}
