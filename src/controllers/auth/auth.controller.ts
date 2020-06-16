import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { CreateUserDto } from 'src/models/user/user-create.model';
import { LoginUserDto } from 'src/models/user/user-login.model';
import { AuthService } from 'src/services/auth/auth.service';
import { ApiResponse, ApiBadRequestResponse, ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('/users')
@ApiTags('users')
export class AuthController {

    constructor(private service: UserService, private authService : AuthService) { 
    }

    @Post()
    @HttpCode(201)
    @ApiResponse({ status: 201, description: 'The user has been successfully created.'})
    @ApiBadRequestResponse({status: 424, description: 'Failed to create user!'})
    @ApiBody({ type: CreateUserDto , required: true})
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
    @ApiResponse({ status: 200, description: 'You are logged successfully'})
    @ApiBadRequestResponse({status: 424, description: 'Failed to login!'})
    @ApiBody({ type: LoginUserDto , required: true})
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
