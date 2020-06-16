import { IAccount } from "../account";

export interface IUser {
    id: number;
    name: string;
    email: string;
    address: string;
    accounts: IAccount[];
}
