import * as dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/.env` });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const options = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials": true
  };
  app.enableCors(options);
  await app.listen(3000);
}
bootstrap();
