import { Controller, Get, Param, Post, Body, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { RolService } from './rol.service';
import { Rol } from './rol.entity';
import { ReadRoleDto } from './dto';


@Controller('roles')
export class RolController {

    constructor(private readonly _rolService: RolService) { }

    @Get(':idRol')
    getRol(@Param('idRol', ParseIntPipe) idRol: number): Promise<ReadRoleDto> {
        return this._rolService.getRol(idRol);
    }

    @Get()
    getRoles(): Promise<ReadRoleDto[]> {
        return this._rolService.getRoles();
    }

    @Post()
    createRol(@Body() rol: Rol): Promise<ReadRoleDto> {
        return this._rolService.createRol(rol);
    }

    @Patch(':idRol')
    updateRol(@Param('idRol', ParseIntPipe) idRol: number, @Body() rol: Rol): Promise<ReadRoleDto> {
        return this._rolService.updateRol(idRol, rol);
    }

    @Delete(':idRol')
    deleteRol(@Param('idRol', ParseIntPipe) idRol: number): Promise<any> {
        return this._rolService.deleteRol(idRol);
    }

}
