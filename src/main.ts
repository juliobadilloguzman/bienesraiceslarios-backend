import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const fs = require('fs');

async function bootstrap() {

  const keyFile  = fs.readFileSync(__dirname + '/../../server.key');
  const certFile = fs.readFileSync(__dirname + '/../../cert_chain.crt');

  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    }});

  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(AppModule.port);
}
bootstrap();
