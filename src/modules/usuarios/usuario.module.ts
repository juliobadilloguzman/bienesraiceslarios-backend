import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { CuentaRepository } from '../cuentas/cuenta.repository';
import { CuentaService } from '../cuentas/cuenta.service';
import { RolRepository } from '../roles/rol.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioRepository, CuentaRepository, RolRepository])],
    providers: [UsuarioService, CuentaService],
    controllers: [UsuarioController]
})
export class UsuarioModule { }
