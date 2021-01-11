import { Module } from '@nestjs/common';
import { TerrenosService } from './terrenos.service';
import { TerrenosController } from './terrenos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerrenoRepository } from './terreno.repository';
import { UsuarioRepository } from '../usuarios/usuario.repository';
import { FraccionamientoRepository } from '../fraccionamientos/fraccionamiento.repository';
import { VendedorRepository } from '../vendedores/vendedor.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TerrenoRepository, UsuarioRepository, FraccionamientoRepository, VendedorRepository])],
  providers: [TerrenosService],
  controllers: [TerrenosController]
})
export class TerrenosModule { }
