import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../../config/config.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '../../config/config.module';
import { Configuration } from '../../config/config.keys';
import { UsuarioRepository } from '../usuarios/usuario.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRepository, UsuarioRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(_configService: ConfigService) {
        return {
          secret: _configService.get(Configuration.JWT_SECRET),
          signOptions: {
            expiresIn: 3600
          }
        }
      }
    })
  ],
  providers: [AuthService, ConfigService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule { }
