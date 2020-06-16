import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './modules';
import { OperationModule } from './modules/operation';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, OperationEntity, AccountEntity } from './entities';
import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: `${process.env.HOST}`,
      port: Number(process.env.DB_PORT),
      username: `${process.env.USERNAME}`,
      password: `${process.env.PASSWORD}`,
      database: `${process.env.DATABASE}`,
      entities: [UserEntity, AccountEntity, OperationEntity],
      synchronize: true,
    }),
    AccountModule,
    AuthModule,
    OperationModule,    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
