import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from 'src/services/auth/auth.service';
import { JwtStrategy } from 'src/Config/passport';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
        secret: process.env.JWTSECRET,
        signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIREIN }
    })
],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}