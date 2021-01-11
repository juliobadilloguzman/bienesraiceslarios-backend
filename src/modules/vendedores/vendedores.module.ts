import { Module } from '@nestjs/common';
import { VendedorController } from './vendedor.controller';
import { VendedorService } from './vendedor.service';
import { VendedorRepository } from './vendedor.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VendedorRepository])],
  controllers: [VendedorController],
  providers: [VendedorService]
})
export class VendedoresModule { }
