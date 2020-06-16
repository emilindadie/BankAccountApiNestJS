import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import * as dotenv from 'dotenv';
import { CreateUserDto } from 'src/models/user/user-create.model';
import { LoginUserDto } from 'src/models/user/user-login.model';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('/users')
export class AuthController {

    constructor(private service: UserService, private authService : AuthService) { 
        dotenv.config();
    }

    @Post()
    @HttpCode(201)
    createUser(@Body() userDto: CreateUserDto) {
        try {
            const createUserResponse = this.service.createUser(userDto);
            return { data: createUserResponse };
        } catch (e) {
            return { error: { message: e.message } };
        }
    }

    @Post('login')
    @HttpCode(200)
    async logUser(@Body() userDto: LoginUserDto) {
        try {
            const user =  await this.service.logUser(userDto.email, userDto.password);
            const loginUserResponse =  await this.authService.createToken(user);
            return { data: loginUserResponse };
        } catch (e) {
            return { error: { message: e.message } };
        }
    }
}
