import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConnectionOptions } from 'typeorm';
import { Configuration } from '../config/config.keys';

export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(_configService: ConfigService) {
            return {
                type: 'mysql',
                database: _configService.get(Configuration.DATABASE),
                host: _configService.get(Configuration.HOST),
                port: parseInt(_configService.get(Configuration.DATABASEPORT)),
                username: _configService.get(Configuration.USERNAME),
                password: _configService.get(Configuration.PASSWORD),
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/migrations/*{.ts,.js}']
            } as ConnectionOptions
        }
    })
];