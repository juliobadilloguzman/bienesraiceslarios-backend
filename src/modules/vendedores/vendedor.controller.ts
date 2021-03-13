import { Controller, Param, ParseIntPipe, Get, Post, Body, Delete, Patch } from '@nestjs/common';
import { ReadVendedorDto, CreateVendedorDto, UpdateVendedorDto } from './dto';
import { VendedorService } from './vendedor.service';
import { UpdateCuentaDto } from '../cuentas/dto';

@Controller('vendedores')
export class VendedorController {

    constructor(private readonly _vendedorService: VendedorService) { }

    @Get(':idVendedor')
    getVendedor(@Param('idVendedor', ParseIntPipe) idVendedor: number): Promise<ReadVendedorDto> {
        return this._vendedorService.getVendedor(idVendedor);
    }

    @Get()
    getVendedores(): Promise<ReadVendedorDto[]> {
        return this._vendedorService.getVendedores();
    }

    @Post()
    createVendedor(@Body() vendedor: Partial<CreateVendedorDto>): Promise<ReadVendedorDto> {
        return this._vendedorService.createVendedor(vendedor);
    }

    @Patch(':idVendedor')
    updateVendedor(@Param('idVendedor', ParseIntPipe) idVendedor: number, @Body() vendedor: Partial<UpdateVendedorDto>): Promise<ReadVendedorDto> {
        return this._vendedorService.updateVendedor(idVendedor, vendedor);
    }

    @Delete(':idVendedor')
    deleteUsuario(@Param('idVendedor', ParseIntPipe) idVendedor: number): Promise<any> {
        return this._vendedorService.deleteVendedor(idVendedor);
    }

}
