import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfig } from './Config/dbConfig';
import 'dotenv/config';
import { UserModule } from './modules';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRootAsync({ useClass: DbConfig }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
