import { IAccount } from "../account";
import { IsString, IsNumber, IsDate, IsNotEmpty } from 'class-validator';

export class CreateOperationDto {
    @IsString()
    @IsNotEmpty()
    type: string;
    @IsNumber()
    @IsNotEmpty()
    amount: number;
    @IsDate()
    @IsNotEmpty()
    date: Date;
    account: IAccount;
}
