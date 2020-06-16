import { OperationService } from "src/services/operation/operation";
import { Controller, HttpCode, Post, Body, Get, Param, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { OperationDto } from "src/models/operation/operation";
import { ApiBody, ApiBadRequestResponse, ApiBearerAuth, ApiResponse, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";

@Controller('/operations')
@ApiTags('operations')
@ApiBearerAuth()
export class OperationController {

    constructor(private service: OperationService) { }

    @Post()
    @HttpCode(201)
    @UseGuards(AuthGuard())
    @ApiResponse({ status: 201, description: 'Operation has been successfully created'})
    @ApiBadRequestResponse({status: 424, description: 'failed to create operation!'})
    @ApiBody({ type: OperationDto , required: true})
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
    @ApiResponse({ status: 200, description: 'Operation has been successfully retreived'})
    @ApiBadRequestResponse({status: 424, description: 'failed to retreive operation!'})
    @ApiParam({name: 'id'})
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
    @ApiResponse({ status: 200, description: 'Account operations has been successfully retreived'})
    @ApiBadRequestResponse({status: 424, description: 'failed to retreive account operations!'})
    @ApiQuery({name : 'accountId', required: true})
    @ApiQuery({name : 'startDate', required: true})
    @ApiQuery({name : 'endDate', required: true})
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
    @ApiResponse({ status: 200, description: 'last account operation has been successfully retreived'})
    @ApiBadRequestResponse({status: 424, description: 'failed to retreive last account operation!'})
    @ApiQuery({name : 'accountId', required: true})
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