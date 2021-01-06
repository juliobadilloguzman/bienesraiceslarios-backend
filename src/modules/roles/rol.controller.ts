import { Controller, Get, Param, Post, Body, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { RolService } from './rol.service';
import { Rol } from './rol.entity';


@Controller('roles')
export class RolController {

    constructor(private readonly _rolService: RolService) { }

    @Get(':idRol')
    async getRol(@Param('idRol', ParseIntPipe) idRol: number): Promise<Rol> {
        const rol = await this._rolService.getRol(idRol);
        return rol;
    }

    @Get()
    async getRoles(): Promise<Rol[]> {
        const roles = await this._rolService.getRoles();
        return roles;
    }

    @Post()
    async createRol(@Body() rol: Rol): Promise<Rol> {
        const createdRol = await this._rolService.createRol(rol);
        return createdRol;
    }

    @Patch(':idRol')
    async updateRol(@Param('idRol', ParseIntPipe) idRol: number, @Body() rol: Rol): Promise<any> {
        await this._rolService.updateRol(idRol, rol);
        return { updated: true };
    }

    @Delete(':idRol')
    async deleteRol(@Param('idRol', ParseIntPipe) idRol: number): Promise<any> {
        await this._rolService.deleteRol(idRol);
        return { deleted: true };
    }

}
