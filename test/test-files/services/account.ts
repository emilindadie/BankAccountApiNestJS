import { UserEntity, AccountEntity } from "../../../src/entities";
import { CreateAccountDto, IAccount } from "../../../src/models/account";


export const createAccountDto = new CreateAccountDto();
createAccountDto.name = 'Compte A';

export const account: AccountEntity = {
    id: 1,
    hasId: () => true,
    recover: () =>Promise.resolve(new AccountEntity()),
    softRemove: () => Promise.resolve(new AccountEntity()),
    save: () => Promise.resolve(new AccountEntity()),
    remove: () => Promise.resolve(new AccountEntity()),
    reload: () => Promise.resolve(),
    name: 'Compte A',
    solde: 400,
    user: new UserEntity(),
};

export const accountMock: IAccount = {
    id: 1,
    name: 'Compte A',
    solde: 400,
    user: {
        id: 1,
        name: 'toto',
        email: 'dadie.emilin@gmail.com',
        address: '14 rue de Mulhouse',
        accounts: [],
    },
};

export const allAccountMock: IAccount[] = [
    {
        id: 1,
        name: 'Compte A',
        solde: 400,
        user: {
            id: 1,
            name: 'toto',
            email: 'dadie.emilin@gmail.com',
            address: '14 rue de Mulhouse',
            accounts: [],

        },
    },
];
