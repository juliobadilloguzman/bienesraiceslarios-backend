import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { DatabaseModule } from './database/database.module';
import { CuentaModule } from './modules/cuentas/cuenta.module';
import { UsuarioModule } from './modules/usuarios/usuario.module';
import { RolModule } from './modules/roles/rol.module';

@Module({
  imports: [ConfigModule, DatabaseModule, CuentaModule, UsuarioModule, RolModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }

}
