import { IAccount } from "../account";

export class CreateOperationDto {
    type: string;
    amount: number;
    date: Date;
    account: IAccount;
}
