import { Controller, Query, Get, HttpCode, UseGuards } from "@nestjs/common";
import { BalanceService } from "src/services/balance/balance";
import { AuthGuard } from "@nestjs/passport";

@Controller('/balances')
export class BalanceController {

    constructor(private service: BalanceService) { }

    @Get()
    @HttpCode(200)
    @UseGuards(AuthGuard())
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
