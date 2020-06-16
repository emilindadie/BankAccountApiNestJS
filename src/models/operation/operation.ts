import { IsNumber } from 'class-validator';
export class OperationDto {
    @IsNumber()
    amount: number;
    @IsNumber()
    accountId: number;
}
