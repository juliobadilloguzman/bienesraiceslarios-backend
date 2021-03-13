import { Module } from '@nestjs/common';
import { FraccionamientoController } from './fraccionamiento.controller';
import { FraccionamientoService } from './fraccionamiento.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FraccionamientoRepository } from './fraccionamiento.repository';
import { MensualidadRepository } from '../mensualidades/mensualidad.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FraccionamientoRepository, MensualidadRepository])],
  controllers: [FraccionamientoController],
  providers: [FraccionamientoService]
})
export class FraccionamientosModule { }
