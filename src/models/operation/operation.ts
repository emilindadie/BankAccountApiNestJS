import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class OperationDto {
    @ApiProperty()
    @IsNumber()
    amount: number;
    @ApiProperty()
    @IsNumber()
    accountId: number;
}
