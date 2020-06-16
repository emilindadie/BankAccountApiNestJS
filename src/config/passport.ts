import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../services/auth/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import 'dotenv/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWTSECRET,
        });
    }

    async validate(payload: any) {
       const user = await this.authService.validateUser(payload.id);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}