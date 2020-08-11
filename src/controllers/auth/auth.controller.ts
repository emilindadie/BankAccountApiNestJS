import { Controller, Post, HttpCode, Body, Req, Res, Get, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { CreateUserDto } from 'src/models/user/user-create.model';
import { LoginUserDto } from 'src/models/user/user-login.model';
import { AuthService } from 'src/services/auth/auth.service';
import { ApiResponse, ApiBadRequestResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import {Response, Request} from 'express';
import { AuthGuard } from '@nestjs/passport';

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
    async logUser(@Body() userDto: LoginUserDto, @Res() response: Response) {
        try {
            const user =  await this.service.logUser(userDto.email, userDto.password);
            const tokenResponse =  await this.authService.createToken(user);
            const loginUserResponse = {accessToken: tokenResponse.accessToken, user: tokenResponse.user}
            const cookiesExpiration  = 24 * 60 * 60;
            response.cookie('refresh_token', tokenResponse.refreshToken,  
                { maxAge: cookiesExpiration,
                // You can't access these tokens in the client's javascript
                httpOnly: true,
                // Forces to use https in production
                secure: process.env.NODE_ENV === 'production'? true: false
            });
            response.send({ data: loginUserResponse});
        } catch (e) {
            return { error: { message: e.message } };
        }
    }

    @Get('newtoken')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'You get new token successfully'})
    @ApiBadRequestResponse({status: 424, description: 'Failed to get new token!'})
    async newToken(@Req() request: Request, @Res() response: Response) {       
        try {
            const refreshToken = request.cookies['refresh_token'];
            const tokenResponse =  await this.authService.createNewToken(refreshToken);
            const newTokenResponse = {accessToken: tokenResponse.accessToken}
            const cookiesExpiration  = 24 * 60 * 60;
            response.cookie('refresh_token', tokenResponse.refreshToken,  
                { maxAge: cookiesExpiration,
                // You can't access these tokens in the client's javascript
                httpOnly: true,
                // Forces to use https in production
                secure: process.env.NODE_ENV === 'production'? true: false
            });
            response.send({ data: newTokenResponse});
        } catch (e) {
            throw new UnauthorizedException({message: 'jwt expired' }, '401');
        }
    }

    @Get('current')
    @HttpCode(200)
    @UseGuards(AuthGuard())
    @ApiResponse({ status: 200, description: 'You get current user successfully'})
    @ApiBadRequestResponse({status: 424, description: 'Failed to get current user!'})
    async currentUser(@Req() request: Request, @Res() response: Response) {       
        try {
            const refreshToken = request.cookies['refresh_token'];
            const user =  await this.authService.getCurrentUserWithToken(refreshToken);
            response.send({ data: {user: user} });
        } catch (e) {
            throw new UnauthorizedException({message: 'jwt expired' }, '401');
        }
    }
}
