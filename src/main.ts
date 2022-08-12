import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { readFileSync } from 'fs';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Main');

  const httpsOptions = {
    key: readFileSync('./cert/localhost+2-key.pem'),
    cert: readFileSync('./cert/localhost+2.pem'),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors({
    origin: '*',
  });
  await app
    .listen(8443)
    .then(() => logger.log('Listening on https://localhost:8443'));
}
bootstrap();
