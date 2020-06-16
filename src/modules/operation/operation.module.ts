import { Module } from '@nestjs/common';
import { OperationController } from 'src/controllers/operation/operation.controller';
import { OperationService } from 'src/services/operation/operation';
import { BalanceController } from 'src/controllers/balance/balance.controller';
import { BalanceService } from 'src/services/balance/balance';
import { AccountService } from 'src/services/account/account';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationEntity, AccountEntity } from 'src/entities';

@Module({
    imports: [
        TypeOrmModule.forFeature([AccountEntity, OperationEntity]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWTSECRET,
            signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIREIN }
        })
    ],
    controllers: [OperationController, BalanceController],
    providers: [AccountService, OperationService, BalanceService]
})
export class OperationModule { }