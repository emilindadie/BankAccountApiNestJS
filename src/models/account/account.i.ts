import { IUser } from "..";

export interface IAccount {
    id: number;
    name: string;
    solde: number;
    user: IUser;
}
