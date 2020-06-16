import { Controller, Post, HttpCode, Body, UseGuards, Query, Get } from "@nestjs/common";
import { AccountService } from "src/services/account/account";
import { CreateAccountDto } from "src/models/account";
import { AuthGuard } from "@nestjs/passport";


@Controller('/accounts')
export class AccountController {

    constructor(private service: AccountService) { }

    @Post()
    @UseGuards(AuthGuard())
    @HttpCode(201)
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
    async getAccountByUserId(@Query('userId') userId) {
        try {
            const accountByUserIdResponse  =  await this.service.getAccountByUserId(userId);
            return { data: accountByUserIdResponse};
        } catch (e) {
            return { error: { message : e.message }};
        }
    }
}
