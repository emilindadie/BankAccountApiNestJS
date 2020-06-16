import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AuthModule } from './modules/auth/auth.module';
import { AccountModule } from './modules';
import { OperationModule } from './modules/operation';

async function bootstrap() {
  const port = process.env.APP_PORT || 3000;
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle('Bankaccount API')
  .setDescription('The bankaccount API description')
  .setVersion('1.0')
  .addTag('bankaccount')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [AuthModule, AccountModule, OperationModule],
  })

  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(Number(port), '0.0.0.0');
  Logger.log(`App listening on port ${port}!`)

}
bootstrap();
