import { Controller, Get, Param, Post, Body, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CuentaService } from './cuenta.service';
import { Cuenta } from './cuenta.entity';
import { AuthGuard } from '@nestjs/passport';
import { ReadCuentaDto } from './dto';

// @UseGuards(AuthGuard())
@Controller('cuentas')
export class CuentaController {

    constructor(private readonly _cuentaService: CuentaService) { }

    @Get(':idCuenta')
    getCuenta(@Param('idCuenta', ParseIntPipe) idCuenta: number): Promise<ReadCuentaDto> {
        return this._cuentaService.getCuenta(idCuenta);
    }

    @Get()
    getCuentas(): Promise<ReadCuentaDto[]> {
        return this._cuentaService.getCuentas();
    }

    @Patch(':idCuenta')
    updateCuenta(@Param('idCuenta', ParseIntPipe) idCuenta: number, @Body() cuenta: Cuenta): Promise<ReadCuentaDto> {
        return this._cuentaService.updateCuenta(idCuenta, cuenta);
    }

    @Delete(':idCuenta')
    deleteCuenta(@Param('idCuenta', ParseIntPipe) idCuenta: number): Promise<any> {
        return this._cuentaService.deleteCuenta(idCuenta);
    }

    @Post('setRole/:idCuenta/:idRol')
    setRoleToUser(
        @Param('idCuenta', ParseIntPipe) idCuenta: number,
        @Param('idRol', ParseIntPipe) idRol: number,
    ): Promise<any> {
        return this._cuentaService.setRoleToUser(idCuenta, idRol);
    }

}
