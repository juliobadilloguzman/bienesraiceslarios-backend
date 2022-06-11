import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const fs = require('fs');

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {cors: true});

  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(AppModule.port);
}
bootstrap();
