import { IAccount } from "../account";

export interface IOperation {
    id: number;
    type: string;
    amount: number;
    date: Date;
    account: IAccount;
}
