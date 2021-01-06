import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuentaRepository } from './cuenta.repository';
import { CuentaService } from './cuenta.service';
import { SharedModule } from '../../shared/shared.module';
import { CuentaController } from './cuenta.controller';

@Module({
    imports: [TypeOrmModule.forFeature([CuentaRepository]), SharedModule],
    providers: [CuentaService],
    controllers: [CuentaController]
})
export class CuentaModule { }
