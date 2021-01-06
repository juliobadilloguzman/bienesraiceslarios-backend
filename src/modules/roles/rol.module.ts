import { Module } from '@nestjs/common';
import { RolRepository } from './rol.repository';
import { SharedModule } from '../../shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';

@Module({
    imports: [TypeOrmModule.forFeature([RolRepository]), SharedModule],
    providers: [RolService],
    controllers: [RolController]
})
export class RolModule { }
