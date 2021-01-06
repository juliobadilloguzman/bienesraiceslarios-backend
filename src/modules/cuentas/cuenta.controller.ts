import { Controller, Get, Param, Post, Body, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { CuentaService } from './cuenta.service';
import { Cuenta } from './cuenta.entity';

@Controller('cuentas')
export class CuentaController {

    constructor(private readonly _cuentaService: CuentaService) { }

    @Get(':idCuenta')
    async getCuenta(@Param('idCuenta', ParseIntPipe) idCuenta: number): Promise<Cuenta> {
        const cuenta = await this._cuentaService.getCuenta(idCuenta);
        return cuenta;
    }

    @Get()
    async getCuentas(): Promise<Cuenta[]> {
        const cuentas = await this._cuentaService.getCuentas();
        return cuentas;
    }

    @Post()
    async createCuenta(@Body() cuenta: Cuenta): Promise<Cuenta> {
        const createdCuenta = await this._cuentaService.createCuenta(cuenta);
        return createdCuenta;
    }

    @Patch(':idCuenta')
    async updateCuenta(@Param('idCuenta', ParseIntPipe) idCuenta: number, @Body() cuenta: Cuenta): Promise<void> {
        await this._cuentaService.updateCuenta(idCuenta, cuenta);
    }

    @Delete(':idCuenta')
    async deleteCuenta(@Param('idCuenta', ParseIntPipe) idCuenta: number): Promise<void> {
        await this._cuentaService.deleteCuenta(idCuenta);
    }

}
