import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {
  const port = process.env.APP_PORT || 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(Number(port), '0.0.0.0');
  Logger.log(`App listening on port ${port}!`)

}
bootstrap();
