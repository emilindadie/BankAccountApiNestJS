import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {
  const port = process.env.APP_PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(Number(port), '0.0.0.0');
  Logger.log(`App listening on port ${port}!`)

}
bootstrap();
