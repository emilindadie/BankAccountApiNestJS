import { OperationService } from "src/services/operation/operation";
import { Controller, HttpCode, Post, Body, Get, Param, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { OperationDto } from "src/models/operation/operation";

@Controller('/operations')
export class OperationController {

    constructor(private service: OperationService) { }

    @Post()
    @HttpCode(201)
    @UseGuards(AuthGuard())
    async createOperation(@Body() operationDto: OperationDto) {
        try {
            const createOperationResponse = await this.service.createOperation(operationDto.accountId, operationDto.amount);
            return { data: createOperationResponse };
        } catch (e) {
            return { error: { message : e.message }};
        }
    }


    @Get(':id')
    @HttpCode(200)
    @UseGuards(AuthGuard())
    async getOperationById(@Param() params) {
        try {
            const operationByIdResponse  =  await this.service.getOperationById(params.id);
            return { data: operationByIdResponse };
        } catch (e) {
            return { error: { message : e.message }};
        }
    }

    @Get()
    @HttpCode(200)
    @UseGuards(AuthGuard())
    async getOperationByAccountId(@Query() query: any) {
        const accountId = Number(query.accountId);
        const startDate = query.startDate;
        const endDate =  query.endDate;
        try {
            if (startDate && endDate) {
                if (new Date(startDate) > new Date(endDate)) {
                    return { error: 'Invalid date' };
                } else {
                    const operationByAccountIdResponse = await this.service.getOperationByAccountId(accountId, new Date(startDate), new Date(endDate));
                    return {
                        data: operationByAccountIdResponse,
                    };
                }
            } else {
                const localDate = query.localDate;
                const operationByAccountIdResponse  = await this.service.getOperationByAccountId(accountId, null, null, new Date(localDate));
                return {
                    data: operationByAccountIdResponse,
                };
            }
        } catch (e) {
            return { error: { message : e.message }};
        }
    }

    @Get('last')
    @HttpCode(200)
    @UseGuards(AuthGuard())
    public async getLastOperationByAccountId(@Query() query: any) {
        const accountId = Number(query.accountId);
        try {
            const lastOperationByAccountIdResponse = await this.service.getLastOperationByAccountId(accountId);
            return {
                data: lastOperationByAccountIdResponse,
            };
        } catch (e) {
            return {
                error: { message : e.message }
            };
        }
    }
}