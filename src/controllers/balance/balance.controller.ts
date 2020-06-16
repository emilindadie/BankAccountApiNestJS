import { Controller, Query, Get, HttpCode, UseGuards } from "@nestjs/common";
import { BalanceService } from "src/services/balance/balance";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiResponse, ApiBadRequestResponse, ApiQuery, ApiTags } from "@nestjs/swagger";

@Controller('/balances')
@ApiTags('balances')
@ApiBearerAuth()
export class BalanceController {

    constructor(private service: BalanceService) { }

    @Get()
    @HttpCode(200)
    @UseGuards(AuthGuard())
    @ApiResponse({ status: 200, description: 'Balance has been successfully retreived'})
    @ApiBadRequestResponse({status: 424, description: 'failed to retreived balance!'})
    @ApiQuery({name : 'accountId', required: true})
    @ApiQuery({name : 'localDate', required: false})
    @ApiQuery({name : 'startDate', required: false})
    @ApiQuery({name : 'endDate', required: false})
    getBalanceByAccountId(@Query() query: any) {
        const accountId =  Number(query.accountId);
        const startDate = String(query.startDate); 
        const endDate = String(query.endDate);
        const localDate = String(query.localDate);

        try {
            if (startDate && endDate) {
                if (new Date(startDate) > new Date(endDate)) {
                    return { error: 'Date are invalid' };
                } else {
                    const balanceByAccountIdResponse  =  this.service.getBalanceByAccountId(accountId, new Date(startDate), new Date(endDate));
                    return {
                        data: balanceByAccountIdResponse,
                    };
                }
            } else {
                const balanceByAccountIdResponse  =  this.service.getBalanceByAccountId(accountId, null, null, new Date(localDate));
                return {
                    data: balanceByAccountIdResponse,
                };
            }
        } catch (e) {
            return { error: { message : e.message }};
        }
    }
}
