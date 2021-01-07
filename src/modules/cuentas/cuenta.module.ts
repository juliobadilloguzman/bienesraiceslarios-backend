import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuentaRepository } from './cuenta.repository';
import { CuentaService } from './cuenta.service';
import { CuentaController } from './cuenta.controller';
import { AuthModule } from '../auth/auth.module';
import { RolRepository } from '../roles/rol.repository';

@Module({
    imports: [TypeOrmModule.forFeature([CuentaRepository, RolRepository]), AuthModule],
    providers: [CuentaService],
    controllers: [CuentaController]
})
export class CuentaModule { }
