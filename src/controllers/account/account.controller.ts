import { Controller, Post, HttpCode, Body, UseGuards, Query, Get } from "@nestjs/common";
import { AccountService } from "src/services/account/account";
import { CreateAccountDto } from "src/models/account";
import { AuthGuard } from "@nestjs/passport";
import { ApiResponse, ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";

@Controller('/accounts')
@ApiTags('accounts')
@ApiBearerAuth()
export class AccountController {

    constructor(private service: AccountService) { }

    @Post()
    @UseGuards(AuthGuard())
    @HttpCode(201)
    @ApiResponse({ status: 201, description: 'The account has been successfully created.'})
    @ApiBadRequestResponse({status: 424, description: 'Failed to create account!'})
    @ApiBody({ type: CreateAccountDto , required: true})
    async creacteAccount(@Body() accountDto: CreateAccountDto) {
        try {
            const createAccountResponse = await this.service.createAccount(accountDto);
            return { data: createAccountResponse };
        } catch (e) {
            return { error: { message : e.message }};
        }
    }

    @Get()
    @HttpCode(200)
    @UseGuards(AuthGuard())
    @ApiResponse({ status: 200, description: 'User accounts has been successfully retreived.'})
    @ApiBadRequestResponse({status: 424, description: 'Failed to retreived user accounts!'})
    @ApiQuery({name : 'userId', required: true})
    async getAccountByUserId(@Query('userId') userId) {
        try {
            const accountByUserIdResponse  =  await this.service.getAccountByUserId(userId);
            return { data: accountByUserIdResponse};
        } catch (e) {
            return { error: { message : e.message }};
        }
    }
}
