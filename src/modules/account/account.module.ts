import { Module } from '@nestjs/common';
import { AccountController } from 'src/controllers';
import { AccountService } from 'src/services/account/account';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities';


@Module({
    imports: [
        TypeOrmModule.forFeature([AccountEntity]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWTSECRET,
            signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIREIN }
        })
    ],
    controllers: [AccountController],
    providers: [AccountService]
})
export class AccountModule { }