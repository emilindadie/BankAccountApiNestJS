import { OperationService } from '../operation/operation';
import { IOperation } from '../../models/operation';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BalanceService {

    constructor(private operationService: OperationService) {
    }

    async getBalanceByAccountId(accountId: number, startDate?: Date, endDate?: Date, localDate?: Date): Promise<number> {
        const operations: IOperation[] = await this.operationService.getOperationByAccountId(accountId, startDate, endDate, localDate);
        if (operations.length === 1) {
            return operations[0].amount;
        }
        if (operations.length >= 2) {
            const balance = (operations.map(operation => operation.amount).reduce((a, b) => a + b));
            return balance;
        }
        return 0;
    }
}
