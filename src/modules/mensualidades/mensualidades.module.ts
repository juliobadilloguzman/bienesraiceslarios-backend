import { Module } from '@nestjs/common';
import { MensualidadController } from './mensualidad.controller';
import { MensualidadService } from './mensualidad.service';
import { MensualidadRepository } from './mensualidad.repository';
import { TerrenoRepository } from '../terrenos/terreno.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRepository } from '../usuarios/usuario.repository';
import { FraccionamientoRepository } from '../fraccionamientos/fraccionamiento.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MensualidadRepository, TerrenoRepository, UsuarioRepository])],
  controllers: [MensualidadController],
  providers: [MensualidadService]
})
export class MensualidadesModule { }
