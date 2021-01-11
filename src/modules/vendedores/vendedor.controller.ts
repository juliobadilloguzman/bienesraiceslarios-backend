import { Controller, Param, ParseIntPipe, Get, Post, Body } from '@nestjs/common';
import { ReadVendedorDto, CreateVendedorDto } from './dto';
import { VendedorService } from './vendedor.service';

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

}
